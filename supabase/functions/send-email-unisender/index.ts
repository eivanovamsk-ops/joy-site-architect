import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface EmailRequest {
  to: string;
  subject: string;
  body: string;
  senderName?: string;
  senderEmail?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const UNISENDER_API_KEY = Deno.env.get("UNISENDER_API_KEY");
    if (!UNISENDER_API_KEY) {
      throw new Error("UNISENDER_API_KEY is not configured");
    }

    const { to, subject, body, senderName = "Articon", senderEmail = "noreply@articon.pro" }: EmailRequest = await req.json();

    // Validate required fields
    if (!to || !subject || !body) {
      throw new Error("Missing required fields: to, subject, body");
    }

    // Build form data for Unisender API
    const formData = new URLSearchParams();
    formData.append("format", "json");
    formData.append("api_key", UNISENDER_API_KEY);
    formData.append("email", to);
    formData.append("sender_name", senderName);
    formData.append("sender_email", senderEmail);
    formData.append("subject", subject);
    formData.append("body", body);
    formData.append("list_id", "1"); // Default list ID

    console.log(`Sending email to ${to} with subject: ${subject}`);

    const response = await fetch("https://api.unisender.com/ru/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const result = await response.json();
    console.log("Unisender API response:", JSON.stringify(result));

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
