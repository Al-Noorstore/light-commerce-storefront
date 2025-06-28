
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SubscriptionRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: SubscriptionRequest = await req.json();

    // Send confirmation email to customer
    await resend.emails.send({
      from: "Al-Noor Store <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Al-Noor Store Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f59e0b; text-align: center;">Welcome to Al-Noor Store!</h1>
          <p>Thank you for subscribing to our newsletter. You'll be the first to know about:</p>
          <ul>
            <li>✨ New product arrivals</li>
            <li>🎉 Exclusive discounts and offers</li>
            <li>🛍️ Special deals just for subscribers</li>
          </ul>
          <p>Stay tuned for amazing offers!</p>
          <p style="color: #6b7280;">Best regards,<br>Al-Noor Store Team</p>
          <p style="text-align: center; color: #9ca3af; font-size: 12px;">
            Contact us: +92 322 2520101 | alnoormall.pk@gmail.com
          </p>
        </div>
      `,
    });

    // Send notification email to store owner
    await resend.emails.send({
      from: "Al-Noor Store <onboarding@resend.dev>",
      to: ["alnoormall.pk@gmail.com"],
      subject: "New Newsletter Subscription",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f59e0b;">New Newsletter Subscription</h1>
          <p>A new customer has subscribed to your newsletter:</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <p>Don't forget to add them to your email marketing list!</p>
        </div>
      `,
    });

    console.log("Subscription emails sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-subscription-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
