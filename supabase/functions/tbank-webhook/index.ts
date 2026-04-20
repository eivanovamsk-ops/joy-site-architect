import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/**
 * Проверка подписи webhook от Т-Кассы.
 * Алгоритм такой же как при Init:
 * 1. Все верхнеуровневые поля + Password.
 * 2. Сортировка по ключу.
 * 3. Конкатенация значений + SHA-256.
 */
async function verifyToken(
  payload: Record<string, unknown>,
  password: string,
): Promise<boolean> {
  const receivedToken = payload.Token as string | undefined;
  if (!receivedToken) return false;

  const tokenParams: Record<string, string> = { Password: password };

  for (const [key, value] of Object.entries(payload)) {
    if (key === "Token") continue;
    if (value === undefined || value === null) continue;
    if (typeof value === "object") continue;
    // Boolean → "true"/"false" в нижнем регистре
    if (typeof value === "boolean") {
      tokenParams[key] = value ? "true" : "false";
    } else {
      tokenParams[key] = String(value);
    }
  }

  const sortedKeys = Object.keys(tokenParams).sort();
  const concatenated = sortedKeys.map((k) => tokenParams[k]).join("");

  const encoder = new TextEncoder();
  const data = encoder.encode(concatenated);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const computed = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return computed === receivedToken;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PASSWORD = Deno.env.get("TBANK_PASSWORD");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get(
      "SUPABASE_SERVICE_ROLE_KEY",
    )!;

    if (!PASSWORD) {
      console.error("Missing TBANK_PASSWORD");
      return new Response("ERROR", { status: 500 });
    }

    const payload = await req.json();
    console.log("T-Bank webhook received:", JSON.stringify(payload));

    // Проверка подписи
    const isValid = await verifyToken(payload, PASSWORD);
    if (!isValid) {
      console.error("Invalid webhook signature");
      return new Response("ERROR", { status: 403 });
    }

    const orderId = payload.OrderId as string;
    const status = payload.Status as string;
    const paymentId = payload.PaymentId?.toString();
    const errorCode = payload.ErrorCode?.toString();
    const errorMessage = payload.Message as string | undefined;

    if (!orderId) {
      console.error("Missing OrderId in webhook");
      return new Response("ERROR", { status: 400 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Обновляем запись о платеже
    const { data: payment, error: updateError } = await supabase
      .from("payments")
      .update({
        status,
        tbank_payment_id: paymentId,
        error_code: errorCode || null,
        error_message: errorMessage || null,
        raw_response: payload,
      })
      .eq("tbank_order_id", orderId)
      .select()
      .maybeSingle();

    if (updateError) {
      console.error("Failed to update payment:", updateError);
      return new Response("ERROR", { status: 500 });
    }

    // Если платёж подтверждён — обновляем статус заявки на курс
    if (status === "CONFIRMED" && payment?.course_application_id) {
      await supabase
        .from("course_applications")
        .update({ status: "paid" })
        .eq("id", payment.course_application_id);

      console.log(
        "Course application marked as paid:",
        payment.course_application_id,
      );
    }

    // Т-Касса требует ответ "OK" на успешно обработанный webhook
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("tbank-webhook error:", err);
    return new Response("ERROR", { status: 500 });
  }
});
