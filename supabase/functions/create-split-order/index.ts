import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const YANDEX_PAY_API_URL = "https://pay.yandex.ru/api/merchant/v1/orders";

// SECURITY: server-side product catalog. The client-supplied price/name are ignored.
// Keep in sync with src/data/products.ts for the split-eligible products.
const SPLIT_PRODUCTS: Record<string, { name: string; price: number }> = {
  "rundeer-3ds-v5": { name: "Интраоральный сканер Rundeer 3DS V5", price: 365000 },
  "rundeer-3ds-v6": { name: "Интраоральный сканер Rundeer 3DS V6", price: 500000 },
};

const DEFAULT_REDIRECT = "https://joy-site-architect.lovable.app/shop";

// Only allow redirects back to our own domains
const isAllowedRedirect = (raw: unknown): raw is string => {
  if (typeof raw !== "string") return false;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return false;
    const host = url.hostname;
    return (
      host === "articon.pro" ||
      host.endsWith(".articon.pro") ||
      host.endsWith(".lovable.app")
    );
  } catch {
    return false;
  }
};

const sendAdminNotification = async (productName: string, price: number, orderId: string) => {
  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY for email notification");
      return;
    }

    const formatPrice = (p: number) => new Intl.NumberFormat("ru-RU").format(p) + " ₽";

    const emailBody = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #7c3aed; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="margin: 0;">💳 Оплата через Яндекс Сплит</h2>
          </div>
          <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
            <p style="background: #ede9fe; padding: 15px; border-radius: 8px; border-left: 4px solid #7c3aed;">
              Клиент оформил покупку через <strong>Яндекс Сплит</strong> (оплата частями).
            </p>
            <p><strong>Товар:</strong> ${productName}</p>
            <p><strong>Сумма:</strong> ${formatPrice(price)}</p>
            <p><strong>Оплата:</strong> 4 платежа по ${formatPrice(Math.ceil(price / 4))}</p>
            <p><strong>ID заказа:</strong> ${orderId}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #6b7280; font-size: 14px;">Свяжитесь с клиентом для уточнения деталей доставки.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await fetch(`${SUPABASE_URL}/functions/v1/send-email-unisender`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        type: "legacy",
        to: "noreply@articon.pro",
        subject: `💳 Сплит-заказ: ${productName} — ${formatPrice(price)}`,
        body: emailBody,
        senderName: "Articon Shop",
        senderEmail: "moscow@articon.pro",
      }),
    });

    console.log("Admin notification sent for split order:", orderId);
  } catch (e) {
    console.error("Failed to send admin notification:", e);
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const YANDEX_PAY_API_KEY = Deno.env.get('YANDEX_PAY_API_KEY');
    if (!YANDEX_PAY_API_KEY) {
      throw new Error('YANDEX_PAY_API_KEY is not configured');
    }

    const YANDEX_PAY_MERCHANT_ID = Deno.env.get('YANDEX_PAY_MERCHANT_ID');
    if (!YANDEX_PAY_MERCHANT_ID) {
      throw new Error('YANDEX_PAY_MERCHANT_ID is not configured');
    }

    const { productId, successUrl, errorUrl } = await req.json();

    if (typeof productId !== "string" || !productId) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: productId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // SECURITY: price and product name come from the server-side catalog only.
    const product = SPLIT_PRODUCTS[productId];
    if (!product) {
      return new Response(
        JSON.stringify({ error: 'Этот товар недоступен для оплаты через Сплит' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const productName = product.name;
    const price = product.price;

    const orderId = `split-${productId}-${Date.now()}`;

    const orderData = {
      orderId,
      merchantId: YANDEX_PAY_MERCHANT_ID,
      currencyCode: "RUB",
      cart: {
        items: [
          {
            productId: productId,
            title: productName,
            quantity: { count: "1" },
            total: String(price) + ".00",
          },
        ],
        total: {
          amount: String(price) + ".00",
        },
      },
      availablePaymentMethods: ["SPLIT"],
      redirectUrls: {
        onSuccess: isAllowedRedirect(successUrl) ? successUrl : DEFAULT_REDIRECT,
        onError: isAllowedRedirect(errorUrl) ? errorUrl : DEFAULT_REDIRECT,
      },
      ttl: 1800,
    };

    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", "Api-Key " + YANDEX_PAY_API_KEY.trim());

    const response = await fetch(YANDEX_PAY_API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Yandex Pay API error:", JSON.stringify(data));
      throw new Error(`Yandex Pay API error [${response.status}]`);
    }

    // Send admin notification (non-blocking)
    sendAdminNotification(productName, price, orderId);

    return new Response(
      JSON.stringify({ paymentUrl: data.data?.paymentUrl, orderId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error creating split order:", error);
    return new Response(
      JSON.stringify({ error: "Не удалось создать заказ. Попробуйте позже." }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
