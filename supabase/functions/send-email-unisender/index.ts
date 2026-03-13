 import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
 
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
 
 interface OrderData {
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
 
 interface CourseApplicationData {
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

 interface EmailRequest {
   type: "order_confirmation" | "course_application" | "legacy";
   to?: string;
   subject?: string;
   body?: string;
   orderData?: OrderData;
   courseData?: CourseApplicationData;
   senderName?: string;
   senderEmail?: string;
 }
 
 const formatPrice = (price: number): string => {
   return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
 };
 
 const getDeliveryMethodText = (method: string): string => {
   switch (method) {
     case "moscow_delivery": return "Доставка по Москве (курьером)";
     case "russia_delivery": return "Доставка по РФ (ТК)";
     case "pickup": return "Самовывоз (Москва, Варшавское ш., 33с12)";
     default: return method;
   }
 };
 
 const getPaymentTypeText = (type: string): string => {
   switch (type) {
     case "private_cash": return "Частное лицо (наличными или переводом на счёт)";
     case "private_transfer": return "Частное лицо (наличными или переводом на счёт)";
     case "company": return "Юридическое лицо (по счёту)";
     default: return type;
   }
 };
 
 const buildCustomerEmailHtml = (order: OrderData): string => {
   const itemsHtml = order.items.map(item => 
     `<tr>
       <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
       <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
       <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${formatPrice(item.price * item.quantity)}</td>
     </tr>`
   ).join("");
 
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
 
 const buildAdminEmailHtml = (order: OrderData): string => {
   const itemsHtml = order.items.map(item => 
     `<tr>
       <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
       <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
       <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${formatPrice(item.price)}</td>
       <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${formatPrice(item.price * item.quantity)}</td>
     </tr>`
   ).join("");
 
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
 
 const sendEmail = async (
   apiKey: string,
   to: string,
   subject: string,
   body: string,
   senderName: string = "Articon",
   senderEmail: string = "moscow@articon.pro"
 ): Promise<any> => {
   const formData = new URLSearchParams();
   formData.append("format", "json");
   formData.append("api_key", apiKey);
   formData.append("email", to);
   formData.append("sender_name", senderName);
   formData.append("sender_email", senderEmail);
   formData.append("subject", subject);
   formData.append("body", body);
   formData.append("list_id", "1");
 
   console.log(`Sending email to ${to} with subject: ${subject}`);
 
   const response = await fetch("https://api.unisender.com/ru/api/sendEmail", {
     method: "POST",
     headers: {
       "Content-Type": "application/x-www-form-urlencoded",
     },
     body: formData.toString(),
   });
 
   const result = await response.json();
   console.log(`Unisender response for ${to}:`, JSON.stringify(result));
   
   return result;
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
 
     const requestData: EmailRequest = await req.json();
     const { type, senderName = "Articon", senderEmail = "moscow@articon.pro" } = requestData;
 
    // Handle new order confirmation type
    if (type === "order_confirmation" && requestData.orderData) {
      const order = requestData.orderData;
      const results: any[] = [];

       // Route scanner orders to m.safonov@articon.pro, all others to moscow@articon.pro
       const scannerSlugs = ["rundeer-3ds-v5", "rundeer-3ds-v6"];
       const hasScannerOnly = order.items.every(item => item.slug && scannerSlugs.includes(item.slug));
       const adminEmail = hasScannerOnly ? "m.safonov@articon.pro" : "moscow@articon.pro";
       const fromEmail = "moscow@articon.pro";

       // 1. Send confirmation email to customer
       const customerEmailHtml = buildCustomerEmailHtml(order);
       const customerResult = await sendEmail(
         UNISENDER_API_KEY,
         order.customerEmail,
         `Заказ #${order.orderId.slice(0, 8).toUpperCase()} оформлен — Articon`,
         customerEmailHtml,
         "Articon Shop",
         fromEmail
       );
       results.push({ recipient: "customer", result: customerResult });

       // 2. Send notification to admin
       const adminEmailHtml = buildAdminEmailHtml(order);
       const adminResult = await sendEmail(
         UNISENDER_API_KEY,
         adminEmail,
         `🛒 Новый заказ #${order.orderId.slice(0, 8).toUpperCase()} от ${order.customerName}`,
         adminEmailHtml,
         "Articon Shop",
         fromEmail
       );
       results.push({ recipient: "admin", result: adminResult });
 
       return new Response(JSON.stringify({ success: true, results }), {
         status: 200,
         headers: { "Content-Type": "application/json", ...corsHeaders },
       });
      }

     // Handle course application notification
     if (type === "course_application" && requestData.courseData) {
       const course = requestData.courseData;
       const results: any[] = [];
       const paymentText = course.paymentType === "company" ? "От компании" : "От частного лица";

       const emailHtml = `
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

        // Send confirmation to client if email provided
        if (course.email) {
          const clientEmailHtml = `
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
                  <p>Уважаемый(ая) <strong>${course.name} ${course.lastName}</strong>,</p>
                  <p>Ваша заявка на курс <strong>«${course.courseName}»</strong> успешно оформлена.</p>
                  ${course.courseDate ? `<p><strong>Дата проведения:</strong> ${course.courseDate}</p>` : ""}
                  <div class="info-block">
                    📞 Куратор Учебного центра свяжется с вами в ближайшее время для подтверждения записи и уточнения деталей.
                  </div>
                  <p>Если у вас есть вопросы, свяжитесь с нами:</p>
                  <p>📧 Email: event@articon.pro<br>
                  📱 Телефон: +7 (495) 128-50-28</p>
                </div>
                <div class="footer">
                  <p>С уважением,<br>Учебный центр Articon</p>
                  <p>articon.pro</p>
                </div>
              </div>
            </body>
            </html>
          `;

          const clientResult = await sendEmail(
            UNISENDER_API_KEY,
            course.email,
            `Запись на курс «${course.courseName}» подтверждена — Articon`,
            clientEmailHtml,
            "Articon Education",
            "event@articon.pro"
          );
          results.push({ recipient: "client", result: clientResult });
        }

        // Send notification to admins
        const adminEmails = ["event@articon.pro", "e.ivanova@articon.pro"];
        const subject = `🎓 Заявка на курс: ${course.courseName} — ${course.name} ${course.lastName}`;

        for (const email of adminEmails) {
          const result = await sendEmail(
            UNISENDER_API_KEY,
            email,
            subject,
            emailHtml,
            "Articon Education",
            "noreply@articon.pro"
          );
          results.push({ recipient: email, result });
        }

       return new Response(JSON.stringify({ success: true, results }), {
         status: 200,
         headers: { "Content-Type": "application/json", ...corsHeaders },
       });
     }
 
     // Legacy mode - simple email send
     const { to, subject, body } = requestData;
     if (!to || !subject || !body) {
       throw new Error("Missing required fields: to, subject, body");
     }
 
     const result = await sendEmail(UNISENDER_API_KEY, to, subject, body, senderName, senderEmail);
 
     if (result.error) {
       throw new Error(`Unisender error: ${result.error}`);
     }
 
     return new Response(JSON.stringify({ success: true, result }), {
       status: 200,
       headers: { "Content-Type": "application/json", ...corsHeaders },
     });
   } catch (error: unknown) {
     console.error("Error in send-email-unisender function:", error);
     const errorMessage = error instanceof Error ? error.message : "Unknown error";
     return new Response(
       JSON.stringify({ success: false, error: errorMessage }),
       {
         status: 500,
         headers: { "Content-Type": "application/json", ...corsHeaders },
       }
     );
   }
 };
 
 serve(handler);
