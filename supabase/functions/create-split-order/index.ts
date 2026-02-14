import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const YANDEX_PAY_API_URL = "https://pay.yandex.ru/api/merchant/v1/orders";

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

    const { productId, productName, price, successUrl, errorUrl } = await req.json();

    if (!productId || !productName || !price) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: productId, productName, price' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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
        onSuccess: successUrl || "https://joy-site-architect.lovable.app/shop",
        onError: errorUrl || "https://joy-site-architect.lovable.app/shop",
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
      throw new Error(`Yandex Pay API error [${response.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(
      JSON.stringify({ paymentUrl: data.data?.paymentUrl, orderId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error creating split order:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
