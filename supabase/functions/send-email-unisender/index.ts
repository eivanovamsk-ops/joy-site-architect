import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  slug?: string;
}

interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  telegram?: string;
  items: OrderItem[];
  total: number;
  deliveryMethod: string;
  city: string;
  address?: string;
  paymentType: string;
  companyDetails?: string;
  notes?: string;
}

interface CourseEmailData {
  courseName: string;
  courseDate?: string;
  name: string;
  lastName: string;
  phone: string;
  telegram: string;
  city: string;
  specialization: string;
  email?: string;
  organization?: string;
  paymentType: string;
  isWebinar?: boolean;
  telegramChatUrl?: string;
}

interface OrderConfirmationRequest {
  type: "order_confirmation";
  orderId: string;
}

interface CourseApplicationRequest {
  type: "course_application";
  courseApplicationId: string;
  emailTemplate?: "zircon_webinar_2026";
  expectedCourseKeyword?: string;
}

interface FeedbackNotificationRequest {
  type: "feedback_notification";
  feedbackId: string;
  notifyEmail: string;
}

interface BundleRequestNotification {
  type: "bundle_request";
  bundleRequestId: string;
}

type EmailRequest =
  | OrderConfirmationRequest
  | CourseApplicationRequest
  | FeedbackNotificationRequest
  | BundleRequestNotification
  | { type: "legacy" };

interface AuthContext {
  userId: string;
  isAdmin: boolean;
}

interface JwtPayload {
  role?: string;
  sub?: string;
}

class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const FEEDBACK_RECIPIENTS = new Set([
  "info@articon.pro",
  "lab@articon.pro",
]);

const WEBINAR_CONFIGS: Record<string, { courseName: string; courseDate: string; telegramChatUrl?: string }> = {
  "Вебинар: Непрямая фиксация брекетов — 11 марта 2026": {
    courseName: "Вебинар: Непрямая фиксация брекетов",
    courseDate: "11 марта 2026, 17:00",
  },
  "Вебинар: Лайфхаки в работе с цирконом — 8 апреля 2026": {
    courseName: "Лайфхаки в работе с цирконом",
    courseDate: "8 апреля 2026, 16:00 МСК",
    telegramChatUrl: "https://t.me/+DDRGM-a1KrE3YzIy",
  },
};

const ZIRCON_WEBINAR_CONFIG = {
  courseName: "Лайфхаки в работе с цирконом",
  courseDate: "8 апреля 2026, 16:00 МСК",
  telegramChatUrl: "https://t.me/+DDRGM-a1KrE3YzIy",
};

const normalizeText = (value: string | undefined | null) => (value ?? "").trim().toLowerCase();

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
};

const getDeliveryMethodText = (method: string): string => {
  switch (method) {
    case "moscow_delivery":
      return "Доставка по Москве (курьером)";
    case "russia_delivery":
      return "Доставка по РФ (ТК)";
    case "pickup":
      return "Самовывоз (Москва, Варшавское ш., 33с12)";
    default:
      return method;
  }
};

const getPaymentTypeText = (type: string): string => {
  switch (type) {
    case "private_cash":
      return "Частное лицо (наличными или переводом на счёт)";
    case "private_transfer":
      return "Частное лицо (наличными или переводом на счёт)";
    case "company":
      return "Юридическое лицо (по счёту)";
    case "private":
      return "От частного лица";
    default:
      return type;
  }
};

const formatCourseDisplayName = (course: CourseEmailData): string => {
  return [course.name, course.lastName].filter(Boolean).join(" ").trim() || course.name;
};

const isUuid = (value: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
};

const parseJwtPayload = (token: string): JwtPayload | null => {
  try {
    const [, payload = ""] = token.split(".");
    if (!payload) return null;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
};

const buildCustomerEmailHtml = (order: OrderEmailData): string => {
  const itemsHtml = order.items
    .map(
      (item) => `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${formatPrice(item.price * item.quantity)}</td>
      </tr>`,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1a365d, #2563eb); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .order-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .order-table th { background: #f3f4f6; padding: 10px; text-align: left; }
        .total { font-size: 18px; font-weight: bold; text-align: right; padding: 15px 0; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">Спасибо за заказ!</h1>
        </div>
        <div class="content">
          <p>Уважаемый(ая) <strong>${order.customerName}</strong>,</p>
          <p>Ваш заказ <strong>#${order.orderId.slice(0, 8).toUpperCase()}</strong> успешно оформлен.</p>
          <p style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">
            📞 Наш менеджер свяжется с вами в ближайшее время для подтверждения заказа.
          </p>
          
          <h3>Состав заказа:</h3>
          <table class="order-table">
            <thead>
              <tr>
                <th>Товар</th>
                <th style="text-align: center;">Кол-во</th>
                <th style="text-align: right;">Сумма</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <div class="total">
            Итого: ${formatPrice(order.total)}
          </div>
          
          <p><strong>Способ доставки:</strong> ${getDeliveryMethodText(order.deliveryMethod)}</p>
          ${order.address ? `<p><strong>Адрес:</strong> ${order.city}, ${order.address}</p>` : ""}
          
          <p>Если у вас есть вопросы, свяжитесь с нами:</p>
          <p>📧 Email: moscow@articon.pro<br>
          📱 Телефон: +7 (495) 128-50-28</p>
        </div>
        <div class="footer">
          <p>С уважением,<br>Команда Articon</p>
          <p>articon.pro</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const buildAdminEmailHtml = (order: OrderEmailData): string => {
  const itemsHtml = order.items
    .map(
      (item) => `<tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${formatPrice(item.price)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${formatPrice(item.price * item.quantity)}</td>
      </tr>`,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 15px 20px; border-radius: 8px 8px 0 0; }
        .content { background: #fff; padding: 20px; border: 1px solid #e5e7eb; }
        .order-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        .order-table th { background: #f3f4f6; padding: 10px; text-align: left; border: 1px solid #ddd; }
        .total { font-size: 20px; font-weight: bold; color: #dc2626; }
        .info-block { background: #f9fafb; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .label { color: #6b7280; font-size: 12px; text-transform: uppercase; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">🛒 Новый заказ #${order.orderId.slice(0, 8).toUpperCase()}</h2>
        </div>
        <div class="content">
          <div class="info-block">
            <p class="label">Данные клиента</p>
            <p><strong>Имя:</strong> ${order.customerName}</p>
            <p><strong>Телефон:</strong> ${order.customerPhone}</p>
            <p><strong>Email:</strong> ${order.customerEmail}</p>
            ${order.telegram ? `<p><strong>Telegram:</strong> ${order.telegram}</p>` : ""}
          </div>
          
          <div class="info-block">
            <p class="label">Доставка и оплата</p>
            <p><strong>Способ доставки:</strong> ${getDeliveryMethodText(order.deliveryMethod)}</p>
            <p><strong>Город:</strong> ${order.city}</p>
            ${order.address ? `<p><strong>Адрес:</strong> ${order.address}</p>` : ""}
            <p><strong>Способ оплаты:</strong> ${getPaymentTypeText(order.paymentType)}</p>
            ${order.companyDetails ? `<p><strong>Реквизиты компании:</strong><br>${order.companyDetails.replace(/\n/g, "<br>")}</p>` : ""}
          </div>
          
          ${order.notes ? `
          <div class="info-block">
            <p class="label">Комментарий к заказу</p>
            <p>${order.notes}</p>
          </div>
          ` : ""}
          
          <h3>Состав заказа:</h3>
          <table class="order-table">
            <thead>
              <tr>
                <th>Товар</th>
                <th style="text-align: center;">Кол-во</th>
                <th style="text-align: right;">Цена</th>
                <th style="text-align: right;">Сумма</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <p class="total" style="text-align: right;">
            ИТОГО: ${formatPrice(order.total)}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const buildCourseAdminEmailHtml = (course: CourseEmailData): string => {
  const paymentText = course.paymentType === "company" ? "От компании" : "От частного лица";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1a365d, #2563eb); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .info-block { background: #fff; padding: 15px; margin: 10px 0; border-radius: 8px; border: 1px solid #e5e7eb; }
        .label { color: #6b7280; font-size: 12px; text-transform: uppercase; margin-bottom: 8px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">🎓 Новая заявка на курс</h2>
          <p style="margin: 5px 0 0; opacity: 0.9;">${course.courseName}</p>
        </div>
        <div class="content">
          ${course.courseDate ? `<p><strong>Дата курса:</strong> ${course.courseDate}</p>` : "<p><strong>Дата:</strong> Уточняется</p>"}

          <div class="info-block">
            <p class="label">Данные участника</p>
            <p><strong>Имя:</strong> ${course.name}</p>
            <p><strong>Фамилия:</strong> ${course.lastName}</p>
            <p><strong>Телефон:</strong> ${course.phone}</p>
            <p><strong>Telegram:</strong> ${course.telegram}</p>
            <p><strong>Город:</strong> ${course.city}</p>
            <p><strong>Специализация:</strong> ${course.specialization}</p>
            ${course.email ? `<p><strong>Email:</strong> ${course.email}</p>` : ""}
            ${course.organization ? `<p><strong>Организация:</strong> ${course.organization}</p>` : ""}
          </div>

          <div class="info-block">
            <p class="label">Оплата</p>
            <p><strong>${paymentText}</strong></p>
          </div>
        </div>
        <div class="footer">
          <p>Articon — Учебный центр</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const buildWebinarClientEmailHtml = (course: CourseEmailData): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1a365d, #2563eb); color: white; padding: 24px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; }
        .info-block { background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 15px 0; }
        .cta-btn { display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 10px 0; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 22px;">🎉 Регистрация подтверждена!</h1>
        </div>
        <div class="content">
          <p>Здравствуйте, <strong>${course.name}</strong>!</p>
          <p>Вы успешно зарегистрировались на бесплатный онлайн-вебинар <strong>«${course.courseName}»</strong>.</p>
          ${course.courseDate ? `<div class="info-block">📅 <strong>Дата:</strong> ${course.courseDate}</div>` : ""}
          <div class="info-block">🔗 <strong>Ссылка на вебинар:</strong> <a href="https://start.bizon365.ru/room/206008/8386800fae48" style="color: #2563eb;">https://start.bizon365.ru/room/206008/8386800fae48</a></div>
          <p>Чтобы не пропустить вебинар, вступите в <strong>Telegram-чат участников</strong>. Именно там мы напомним о начале.</p>
          <p style="text-align: center; margin: 20px 0;">
            <a href="${course.telegramChatUrl}" class="cta-btn">Перейти в чат участников</a>
          </p>
          <p>Если у вас возникнут вопросы — пишите нам: <a href="mailto:event@articon.pro">event@articon.pro</a></p>
        </div>
        <div class="footer">
          <p>Команда Articon</p>
          <p><a href="https://articon.pro" style="color: #2563eb; text-decoration: none;">articon.pro</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const buildStandardCourseClientEmailHtml = (course: CourseEmailData): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1a365d, #2563eb); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .info-block { background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 15px 0; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">Спасибо за запись!</h1>
        </div>
        <div class="content">
          <p>Уважаемый(ая) <strong>${formatCourseDisplayName(course)}</strong>,</p>
          <p>Ваша заявка на курс <strong>«${course.courseName}»</strong> успешно оформлена.</p>
          ${course.courseDate ? `<p><strong>Дата проведения:</strong> ${course.courseDate}</p>` : ""}
          <div class="info-block">
            📞 Куратор Учебного центра свяжется с вами в ближайшее время для подтверждения записи и уточнения деталей.
          </div>
          <p>Если у вас есть вопросы, свяжитесь с нами:</p>
          <p>📧 Email: event@articon.pro<br>
          📱 Телефон: +7 (906) 045-75-37</p>
        </div>
        <div class="footer">
          <p>С уважением,<br>Учебный центр Articon</p>
          <p>articon.pro</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const buildFeedbackEmailHtml = (feedback: { name: string; email: string; phone?: string | null; message: string }): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1a365d, #2563eb); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">📩 Новое сообщение с сайта</h2>
        </div>
        <div class="content">
          <div class="card">
            <p><strong>Имя:</strong> ${feedback.name}</p>
            <p><strong>Email:</strong> ${feedback.email}</p>
            ${feedback.phone ? `<p><strong>Телефон:</strong> ${feedback.phone}</p>` : ""}
            <p><strong>Сообщение:</strong></p>
            <p>${feedback.message}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

const buildBundleRequestEmailHtml = (bundle: { name: string; phone: string; created_at: string }): string => {
  const date = new Date(bundle.created_at).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1a365d, #2563eb); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-top: 16px; }
        .footer { text-align: center; padding: 15px; color: #6b7280; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">📦 Запрос стоимости CAD/CAM-комплекта UPCERA</h2>
        </div>
        <div class="content">
          <p>Новый лид с посадочной страницы комплекта UPCERA (A52 + GT1 Pro + R-412).</p>
          <div class="card">
            <p><strong>Имя:</strong> ${bundle.name}</p>
            <p><strong>Телефон:</strong> ${bundle.phone}</p>
            <p><strong>Дата заявки:</strong> ${date}</p>
          </div>
          <p style="margin-top: 16px; color: #6b7280; font-size: 13px;">Свяжитесь с клиентом в ближайшее время.</p>
        </div>
        <div class="footer">
          <p>Articon — articon.pro</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableEmailError = (error: unknown): boolean => {
  if (error instanceof HttpError) {
    return error.status >= 500 || error.status === 429;
  }

  return error instanceof TypeError;
};

const sendEmail = async (
  apiKey: string,
  to: string,
  subject: string,
  body: string,
  senderName = "Articon",
  senderEmail = "noreply@articon.pro",
): Promise<unknown> => {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const formData = new URLSearchParams();
      formData.append("format", "json");
      formData.append("api_key", apiKey);
      formData.append("email", to);
      formData.append("sender_name", senderName);
      formData.append("sender_email", senderEmail);
      formData.append("subject", subject);
      formData.append("body", body);
      formData.append("list_id", "1");

      console.log(`Sending email to ${to} with subject: ${subject}. Attempt ${attempt}/${maxAttempts}`);

      const response = await fetch("https://api.unisender.com/ru/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const rawResponse = await response.text();
      let result: Record<string, unknown> | null = null;

      try {
        result = JSON.parse(rawResponse);
      } catch {
        result = null;
      }

      if (!response.ok) {
        const statusMessage = `Unisender HTTP ${response.status}`;
        const details = result?.error || rawResponse || "No details";
        throw new HttpError(502, `${statusMessage}: ${String(details)}`);
      }

      console.log(`Unisender response for ${to}:`, result ? JSON.stringify(result) : rawResponse);

      if (result?.error) {
        throw new HttpError(502, `Unisender error: ${String(result.error)}`);
      }

      return result ?? { raw: rawResponse };
    } catch (error) {
      const isLastAttempt = attempt === maxAttempts;
      if (isLastAttempt || !isRetryableEmailError(error)) {
        throw error;
      }

      const delayMs = attempt * 700;
      console.warn(`Retrying email to ${to} in ${delayMs}ms due to temporary error`, error);
      await sleep(delayMs);
    }
  }

  throw new HttpError(500, "Unexpected email retry flow error");
};

const createServiceClient = () => {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceRoleKey) {
    throw new Error("Backend credentials are not configured");
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

const getAuthContext = async (req: Request, serviceClient: ReturnType<typeof createServiceClient>): Promise<AuthContext | null> => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.replace("Bearer ", "");
  const tokenPayload = parseJwtPayload(token);
  if (!tokenPayload) {
    return null;
  }

  // Public forms invoke this function with the publishable key token (role=anon, no sub).
  // This is not a user session and must be treated as unauthenticated, not as an error.
  if (!tokenPayload.sub && ["anon", "service_role"].includes(tokenPayload.role ?? "")) {
    return null;
  }

  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!url || !anonKey) {
    throw new Error("Public backend credentials are not configured");
  }

  const authClient = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: authHeader } },
  });

  const { data: claimData, error: claimsError } = await authClient.auth.getClaims(token);
  const userId = claimData?.claims?.sub;

  if (claimsError || typeof userId !== "string" || !isUuid(userId)) {
    return null;
  }

  const { data: profile } = await serviceClient
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  return {
    userId,
    isAdmin: profile?.role === "admin",
  };
};

const loadOrderEmailData = async (
  serviceClient: ReturnType<typeof createServiceClient>,
  orderId: string,
  authContext: AuthContext | null,
): Promise<OrderEmailData> => {
  const { data: order, error: orderError } = await serviceClient
    .from("orders")
    .select("id, user_id, guest_email, shipping_name, shipping_phone, telegram, delivery_method, city, shipping_address, payment_type, company_details, notes, total_amount, is_guest_order")
    .eq("id", orderId)
    .maybeSingle();

  if (orderError) {
    throw new HttpError(500, "Failed to load order");
  }

  if (!order) {
    throw new HttpError(404, "Order not found");
  }

  if (order.user_id) {
    if (!authContext) {
      throw new HttpError(401, "Unauthorized");
    }

    if (!authContext.isAdmin && authContext.userId !== order.user_id) {
      throw new HttpError(403, "Forbidden");
    }
  }

  const { data: items, error: itemsError } = await serviceClient
    .from("order_items")
    .select("product_name, product_slug, quantity, price_at_purchase")
    .eq("order_id", orderId);

  if (itemsError) {
    throw new HttpError(500, "Failed to load order items");
  }

  let customerEmail = order.guest_email ?? "";

  if (order.user_id) {
    const { data: profile, error: profileError } = await serviceClient
      .from("profiles")
      .select("email")
      .eq("id", order.user_id)
      .maybeSingle();

    if (profileError || !profile?.email) {
      throw new HttpError(500, "Order customer email not found");
    }

    customerEmail = profile.email;
  }

  if (!customerEmail) {
    throw new HttpError(400, "Order customer email not found");
  }

  return {
    orderId: order.id,
    customerName: order.shipping_name ?? "Клиент",
    customerPhone: order.shipping_phone ?? "",
    customerEmail,
    telegram: order.telegram ?? undefined,
    items: (items ?? []).map((item) => ({
      name: item.product_name,
      quantity: item.quantity,
      price: Number(item.price_at_purchase),
      slug: item.product_slug,
    })),
    total: Number(order.total_amount ?? 0),
    deliveryMethod: order.delivery_method ?? "delivery",
    city: order.city ?? "",
    address: order.shipping_address ?? undefined,
    paymentType: order.payment_type ?? "private_cash",
    companyDetails: order.company_details ?? undefined,
    notes: order.notes ?? undefined,
  };
};

const loadCourseEmailData = async (
  serviceClient: ReturnType<typeof createServiceClient>,
  courseApplicationId: string,
): Promise<CourseEmailData> => {
  const { data: application, error } = await serviceClient
    .from("course_applications")
    .select("course_name, course_date, name, last_name, phone, telegram, city, specialization, email, organization, payment_type")
    .eq("id", courseApplicationId)
    .maybeSingle();

  if (error) {
    throw new HttpError(500, "Failed to load course application");
  }

  if (!application) {
    throw new HttpError(404, "Course application not found");
  }

  const webinarConfig = WEBINAR_CONFIGS[application.course_name] ?? null;

  return {
    courseName: webinarConfig?.courseName ?? application.course_name,
    courseDate: webinarConfig?.courseDate ?? application.course_date ?? undefined,
    name: application.name,
    lastName: application.last_name ?? "",
    phone: application.phone ?? "",
    telegram: application.telegram ?? "",
    city: application.city ?? "",
    specialization: application.specialization ?? "",
    email: application.email ?? undefined,
    organization: application.organization ?? undefined,
    paymentType: application.payment_type ?? "private",
    isWebinar: Boolean(webinarConfig?.telegramChatUrl),
    telegramChatUrl: webinarConfig?.telegramChatUrl,
  };
};

const loadFeedbackData = async (
  serviceClient: ReturnType<typeof createServiceClient>,
  feedbackId: string,
) => {
  const { data: feedback, error } = await serviceClient
    .from("feedback")
    .select("name, email, phone, message")
    .eq("id", feedbackId)
    .maybeSingle();

  if (error) {
    throw new HttpError(500, "Failed to load feedback");
  }

  if (!feedback) {
    throw new HttpError(404, "Feedback not found");
  }

  return feedback;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const UNISENDER_API_KEY = Deno.env.get("UNISENDER_API_KEY");
    if (!UNISENDER_API_KEY) {
      throw new Error("UNISENDER_API_KEY is not configured");
    }

    const requestData = (await req.json()) as EmailRequest;
    const serviceClient = createServiceClient();
    const authContext = await getAuthContext(req, serviceClient);

    if (requestData.type === "order_confirmation") {
      if (!requestData.orderId || !isUuid(requestData.orderId)) {
        throw new HttpError(400, "A valid orderId is required");
      }

      const order = await loadOrderEmailData(serviceClient, requestData.orderId, authContext);
      const scannerSlugs = ["rundeer-3ds-v5", "rundeer-3ds-v6"];
      const hasScannerOnly = order.items.length > 0 && order.items.every((item) => item.slug && scannerSlugs.includes(item.slug));
      const adminEmail = hasScannerOnly ? "m.safonov@articon.pro" : "moscow@articon.pro";
      const fromEmail = "moscow@articon.pro";

      const customerEmailHtml = buildCustomerEmailHtml(order);
      const customerResult = await sendEmail(
        UNISENDER_API_KEY,
        order.customerEmail,
        `Заказ #${order.orderId.slice(0, 8).toUpperCase()} оформлен — Articon`,
        customerEmailHtml,
        "Articon Shop",
        fromEmail,
      );

      const adminEmailHtml = buildAdminEmailHtml(order);
      const adminResult = await sendEmail(
        UNISENDER_API_KEY,
        adminEmail,
        `🛒 Новый заказ #${order.orderId.slice(0, 8).toUpperCase()} от ${order.customerName}`,
        adminEmailHtml,
        "Articon Shop",
        fromEmail,
      );

      return new Response(JSON.stringify({ success: true, results: [{ recipient: "customer", result: customerResult }, { recipient: "admin", result: adminResult }] }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (requestData.type === "course_application") {
      if (!requestData.courseApplicationId || !isUuid(requestData.courseApplicationId)) {
        throw new HttpError(400, "A valid courseApplicationId is required");
      }

      let course = await loadCourseEmailData(serviceClient, requestData.courseApplicationId);

      const shouldForceZirconTemplate =
        requestData.emailTemplate === "zircon_webinar_2026" || normalizeText(course.courseName).includes("циркон");

      if (shouldForceZirconTemplate) {
        course = {
          ...course,
          courseName: ZIRCON_WEBINAR_CONFIG.courseName,
          courseDate: ZIRCON_WEBINAR_CONFIG.courseDate,
          isWebinar: true,
          telegramChatUrl: ZIRCON_WEBINAR_CONFIG.telegramChatUrl,
        };
      }

      if (requestData.expectedCourseKeyword) {
        const expected = normalizeText(requestData.expectedCourseKeyword);
        if (expected && !normalizeText(course.courseName).includes(expected)) {
          throw new HttpError(409, "Course mismatch for requested email template");
        }
      }

      const results: Array<{ recipient: string; result: unknown; error?: string }> = [];

      if (course.email) {
        const clientSubject = course.isWebinar
          ? `Вы успешно зарегистрировались на вебинар «${course.courseName}»`
          : `Запись на курс «${course.courseName}» подтверждена — Articon`;
        const clientHtml = course.isWebinar && course.telegramChatUrl
          ? buildWebinarClientEmailHtml(course)
          : buildStandardCourseClientEmailHtml(course);

        try {
          const clientResult = await sendEmail(
            UNISENDER_API_KEY,
            course.email,
            clientSubject,
            clientHtml,
            "Articon Education",
            "event@articon.pro",
          );
          results.push({ recipient: "client", result: clientResult });
        } catch (clientErr) {
          console.error(`Failed to send client email to ${course.email}:`, clientErr);
          results.push({ recipient: "client", result: null, error: clientErr instanceof Error ? clientErr.message : "Unknown error" });
        }
      }

      const adminEmails = ["event@articon.pro", "edu@articon.pro"];
      const adminSubject = `🎓 Заявка на курс: ${course.courseName} — ${formatCourseDisplayName(course)}`;
      const adminHtml = buildCourseAdminEmailHtml(course);

      for (const email of adminEmails) {
        try {
          const result = await sendEmail(
            UNISENDER_API_KEY,
            email,
            adminSubject,
            adminHtml,
            "Articon Education",
            "event@articon.pro",
          );
          results.push({ recipient: email, result });
        } catch (adminErr) {
          console.error(`Failed to send admin email to ${email}:`, adminErr);
          results.push({ recipient: email, result: null, error: adminErr instanceof Error ? adminErr.message : "Unknown error" });
        }
      }

      const anySuccess = results.some(r => !r.error);
      return new Response(JSON.stringify({ success: anySuccess, results }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (requestData.type === "feedback_notification") {
      if (!requestData.feedbackId || !isUuid(requestData.feedbackId)) {
        throw new HttpError(400, "A valid feedbackId is required");
      }

      if (!requestData.notifyEmail || !FEEDBACK_RECIPIENTS.has(requestData.notifyEmail)) {
        throw new HttpError(403, "Recipient is not allowed");
      }

      const feedback = await loadFeedbackData(serviceClient, requestData.feedbackId);
      const result = await sendEmail(
        UNISENDER_API_KEY,
        requestData.notifyEmail,
        `📩 Новое сообщение с сайта от ${feedback.name}`,
        buildFeedbackEmailHtml(feedback),
        "Articon",
        "info@articon.pro",
      );

      return new Response(JSON.stringify({ success: true, result }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (requestData.type === "bundle_request") {
      if (!requestData.bundleRequestId || !isUuid(requestData.bundleRequestId)) {
        throw new HttpError(400, "A valid bundleRequestId is required");
      }

      const { data: bundle, error: bundleError } = await serviceClient
        .from("bundle_requests")
        .select("name, phone, created_at")
        .eq("id", requestData.bundleRequestId)
        .maybeSingle();

      if (bundleError) {
        throw new HttpError(500, "Failed to load bundle request");
      }

      if (!bundle) {
        throw new HttpError(404, "Bundle request not found");
      }

      const result = await sendEmail(
        UNISENDER_API_KEY,
        "marketing@articon.pro",
        `📦 Запрос стоимости CAD/CAM-комплекта — ${bundle.name}`,
        buildBundleRequestEmailHtml(bundle),
        "Articon",
        "marketing@articon.pro",
      );

      return new Response(JSON.stringify({ success: true, result }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    throw new HttpError(410, "Legacy email mode is disabled");
  } catch (error: unknown) {
    console.error("Error in send-email-unisender function:", error);
    const status = error instanceof HttpError ? error.status : 500;
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
