import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const TBANK_INIT_URL = "https://securepay.tinkoff.ru/v2/Init";

// SECURITY: server-side course catalog. Client-supplied amount is ignored.
// Only courses listed here with a future `validUntil` can be paid online.
// Keep in sync with src/data/courses.ts. For courses with several dates
// `validUntil` should be the latest scheduled day (inclusive).
interface TbankCourse {
  price: number;
  validUntil: string | null; // YYYY-MM-DD inclusive, or null = unavailable
}

const TBANK_COURSES: Record<string, TbankCourse> = {
  "Цифровое моделирование сплинтов и работа в виртуальном артикуляторе": { price: 20000, validUntil: "2026-07-21" },
  "Цифровое моделирование расширяющих несъёмных аппаратов": { price: 20000, validUntil: "2026-12-16" },
  "Цифровое планирование ортодонтических мини-имплантатов и моделирование аппаратов с кортикальной опорой": { price: 35000, validUntil: "2026-12-17" },
  "Планирование ортодонтических аппаратов на скелетной опоре (SARPE, MARPE)": { price: 40000, validUntil: "2026-10-13" },
  "Цвет и форма": { price: 25000, validUntil: "2026-07-07" },
  "Элайнеры | Maestro 3D V6 в практике врача-ортодонта и зубного техника": { price: 35000, validUntil: "2026-11-25" },
  "Непрямая фиксация брекетов": { price: 30000, validUntil: "2026-12-01" },
  "CAD/CAM PRO": { price: 90000, validUntil: "2026-10-07" },
  "Шестнадцать оттенков белого": { price: 7000, validUntil: "2026-11-13" },
  "CAD/CAM SCHOOL": { price: 70000, validUntil: "2026-09-18" },
  "V Конференция «Цифровая ортодонтия» 2027": { price: 15000, validUntil: "2027-06-03" },
  "Мастерство дисиликата лития: от CAD до идеальной реставрации": { price: 25000, validUntil: "2026-07-14" },
  "Виниры на рефракторе. Noritake CZR": { price: 70000, validUntil: "2026-09-26" },
  "Моделирование и карвинг циркониевых реставраций": { price: 90000, validUntil: "2026-11-22" },
  "ДЕЛО НЕ В ДИСКЕ": { price: 3000, validUntil: "2026-06-24" },
  "Скан без переделок": { price: 5000, validUntil: "2026-07-22" },
  "ПЕЧАТЬ. ДЕНЬГИ. ЛАБОРАТОРИЯ.": { price: 5000, validUntil: "2026-10-30" },
};

function getCoursePrice(courseName: string): number | null {
  const entry = TBANK_COURSES[courseName];
  if (!entry || !entry.validUntil) return null;
  // validUntil inclusive: allow payment up to end of that day (UTC)
  const cutoff = new Date(`${entry.validUntil}T23:59:59Z`).getTime();
  if (Number.isNaN(cutoff) || Date.now() > cutoff) return null;
  return entry.price;
}

const DEFAULT_SUCCESS_URL = "https://joy-site-architect.lovable.app/education/payment-success";
const DEFAULT_FAIL_URL = "https://joy-site-architect.lovable.app/education/payment-failed";

const isUuid = (value: unknown): value is string =>
  typeof value === "string" &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

// Only allow redirects back to our own domains
const safeRedirect = (raw: unknown, fallback: string): string => {
  if (typeof raw !== "string") return fallback;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return fallback;
    const host = url.hostname;
    if (
      host === "articon.pro" ||
      host.endsWith(".articon.pro") ||
      host.endsWith(".lovable.app")
    ) {
      return url.toString();
    }
  } catch {
    // ignore
  }
  return fallback;
};

interface InitRequest {
  courseApplicationId: string;
  successUrl?: string;
  failUrl?: string;
}

/**
 * Генерация подписи (Token) согласно документации Т-Кассы:
 * 1. Берём все верхнеуровневые параметры запроса (исключая Receipt, DATA, Token, Shops, Items).
 * 2. Добавляем поле Password.
 * 3. Сортируем по ключу в алфавитном порядке.
 * 4. Конкатенируем значения.
 * 5. SHA-256 от полученной строки.
 */
async function generateToken(
  params: Record<string, string | number>,
  password: string,
): Promise<string> {
  const tokenParams: Record<string, string> = { Password: password };

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (typeof value === "object") continue;
    tokenParams[key] = String(value);
  }

  const sortedKeys = Object.keys(tokenParams).sort();
  const concatenated = sortedKeys.map((k) => tokenParams[k]).join("");

  const encoder = new TextEncoder();
  const data = encoder.encode(concatenated);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TERMINAL_KEY = Deno.env.get("TBANK_TERMINAL_KEY");
    const PASSWORD = Deno.env.get("TBANK_PASSWORD");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get(
      "SUPABASE_SERVICE_ROLE_KEY",
    )!;

    if (!TERMINAL_KEY || !PASSWORD) {
      console.error("Missing TBANK credentials");
      return new Response(
        JSON.stringify({ error: "Платёжная система не настроена" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const body: InitRequest = await req.json();
    const { courseApplicationId } = body;

    // Валидация входных данных
    if (!isUuid(courseApplicationId)) {
      return new Response(
        JSON.stringify({ error: "Некорректные данные платежа" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // SECURITY: загружаем заявку из базы — имя, email, телефон и название курса
    // берём только из доверенного источника, а не из тела запроса.
    const { data: application, error: applicationError } = await supabase
      .from("course_applications")
      .select("id, course_name, name, last_name, email, phone")
      .eq("id", courseApplicationId)
      .maybeSingle();

    if (applicationError) {
      console.error("Failed to load course application:", applicationError);
      return new Response(
        JSON.stringify({ error: "Внутренняя ошибка сервера" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (!application) {
      return new Response(
        JSON.stringify({ error: "Заявка не найдена" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // SECURITY: цена определяется только серверным каталогом по названию курса.
    const courseName: string = application.course_name;
    const amount = TBANK_COURSE_PRICES[courseName];

    if (!amount || !application.email) {
      return new Response(
        JSON.stringify({ error: "Онлайн-оплата для этого курса недоступна" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const customerEmail: string = application.email;
    const customerPhone: string = application.phone ?? "";
    const customerName = [application.last_name, application.name]
      .filter(Boolean)
      .join(" ")
      .trim();

    const successUrl = safeRedirect(body.successUrl, DEFAULT_SUCCESS_URL);
    const failUrl = safeRedirect(body.failUrl, DEFAULT_FAIL_URL);

    // Уникальный OrderId — используем UUID
    const orderId = crypto.randomUUID();
    const amountInKopecks = Math.round(amount * 100);

    // Описание для Т-Кассы (макс. 250 символов).
    // Включаем ФИО, чтобы оно было видно в карточке платежа в ЛК Т-Банка.
    const customerLabel = customerName || customerEmail;
    const description = `${courseName} — ${customerLabel}`.slice(0, 250);

    // Параметры запроса Init
    const initParams: Record<string, string | number> = {
      TerminalKey: TERMINAL_KEY,
      Amount: amountInKopecks,
      OrderId: orderId,
      Description: description,
      SuccessURL: successUrl,
      FailURL: failUrl,
    };

    const token = await generateToken(initParams, PASSWORD);

    // Чек (54-ФЗ) — обязателен для боевого терминала Т-Кассы.
    const receipt = {
      Email: customerEmail,
      ...(customerPhone ? { Phone: customerPhone } : {}),
      Taxation: "osn",
      Items: [
        {
          Name: `Курс: ${courseName}`.slice(0, 128),
          Price: amountInKopecks,
          Quantity: 1,
          Amount: amountInKopecks,
          Tax: "vat22",
          PaymentMethod: "full_prepayment",
          PaymentObject: "service",
        },
      ],
    };

    // DATA — произвольные параметры, отображаются в ЛК Т-Банка
    // в разделе «Дополнительные параметры». Не показываются клиенту.
    // Ключи и значения — только латиница/цифры, до 20/100 символов.
    const dataParams: Record<string, string> = {
      Email: customerEmail,
      Phone: customerPhone || "",
      CourseApplicationId: courseApplicationId,
      CourseName: courseName.slice(0, 100),
    };
    if (customerName) {
      dataParams.CustomerName = customerName.slice(0, 100);
    }

    const requestBody = {
      ...initParams,
      Token: token,
      DATA: dataParams,
      Receipt: receipt,
    };

    console.log("Sending Init request to T-Bank for order:", orderId);

    const tbankResponse = await fetch(TBANK_INIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const tbankData = await tbankResponse.json();
    console.log("T-Bank Init response:", JSON.stringify(tbankData));

    // Сохраняем запись о платеже
    await supabase.from("payments").insert({
      course_application_id: courseApplicationId,
      tbank_payment_id: tbankData.PaymentId?.toString() || null,
      tbank_order_id: orderId,
      amount: amount,
      status: tbankData.Status || (tbankData.Success ? "NEW" : "REJECTED"),
      payment_url: tbankData.PaymentURL || null,
      customer_email: customerEmail,
      customer_phone: customerPhone || null,
      course_name: courseName,
      error_code: tbankData.ErrorCode || null,
      error_message: tbankData.Message || tbankData.Details || null,
      raw_response: tbankData,
    });

    if (!tbankData.Success || !tbankData.PaymentURL) {
      return new Response(
        JSON.stringify({
          error: tbankData.Message || "Не удалось создать платёж",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        paymentUrl: tbankData.PaymentURL,
        paymentId: tbankData.PaymentId,
        orderId,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("tbank-init-payment error:", err);
    return new Response(
      JSON.stringify({ error: "Внутренняя ошибка сервера" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
