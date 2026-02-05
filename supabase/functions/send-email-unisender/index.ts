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
 
 interface EmailRequest {
   type: "order_confirmation" | "legacy";
   to?: string;
   subject?: string;
   body?: string;
   orderData?: OrderData;
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
     case "private_cash": return "Частное лицо — Наличными";
     case "private_transfer": return "Частное лицо — Безналичный расчёт";
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
 
       // 1. Send confirmation email to customer
       const customerEmailHtml = buildCustomerEmailHtml(order);
       const customerResult = await sendEmail(
         UNISENDER_API_KEY,
         order.customerEmail,
         `Заказ #${order.orderId.slice(0, 8).toUpperCase()} оформлен — Articon`,
         customerEmailHtml,
         senderName,
         senderEmail
       );
       results.push({ recipient: "customer", result: customerResult });
 
       // 2. Send notification to admin
       const adminEmailHtml = buildAdminEmailHtml(order);
       const adminResult = await sendEmail(
         UNISENDER_API_KEY,
         "moscow@articon.pro",
         `🛒 Новый заказ #${order.orderId.slice(0, 8).toUpperCase()} от ${order.customerName}`,
         adminEmailHtml,
         "Articon Shop",
         senderEmail
       );
       results.push({ recipient: "admin", result: adminResult });
 
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
