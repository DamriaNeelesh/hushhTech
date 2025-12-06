// Email Notification Service
// Sends instant emails for profile views and payments via Gmail

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { type, slug, details = {}, testEmail } = await req.json();
    
    // Test mode: Send email directly without profile lookup
    if (testEmail) {
      const client = new SMTPClient({
        connection: {
          hostname: "smtp.gmail.com",
          port: 587,
          tls: true,
          auth: {
            username: Deno.env.get('GMAIL_USER') ?? '',
            password: Deno.env.get('GMAIL_APP_PASSWORD') ?? '',
          },
        },
      });

      await client.send({
        from: `Hushh Notifications <${Deno.env.get('GMAIL_USER')}>`,
        to: testEmail,
        subject: '🧪 Test Email from Hushh',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>✅ Email System Working!</h2>
            <p>This is a test email from your Hushh notification system.</p>
            <p><strong>Gmail:</strong> ${Deno.env.get('GMAIL_USER')}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p>If you receive this, your email notifications are configured correctly! 🎉</p>
          </div>
        `,
      });

      await client.close();

      return new Response(
        JSON.stringify({ success: true, message: 'Test email sent!' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!type || !slug) {
      return new Response(
        JSON.stringify({ error: 'Missing type or slug' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch profile to get owner's email
    const { data: profile } = await supabase
      .from('investor_profiles')
      .select('name, email, user_id')
      .eq('slug', slug)
      .single();

    if (!profile) {
      return new Response(
        JSON.stringify({ error: 'Profile not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Configure SMTP client (Gmail)
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 587,
        tls: true,
        auth: {
          username: Deno.env.get('GMAIL_USER') ?? '',
          password: Deno.env.get('GMAIL_APP_PASSWORD') ?? '',
        },
      },
    });

    let subject = '';
    let html = '';

    // Build email based on type
    if (type === 'profile_view') {
      const viewTime = new Date().toLocaleString('en-US', { 
        dateStyle: 'medium', 
        timeStyle: 'short' 
      });
      
      subject = `👀 New Profile View - ${profile.name}`;
      html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A84FF;">👀 Someone is viewing your profile!</h2>
          
          <div style="background: #F8FAFC; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="margin: 8px 0;"><strong>Profile:</strong> ${profile.name}</p>
            <p style="margin: 8px 0;"><strong>Time:</strong> ${viewTime}</p>
            <p style="margin: 8px 0;"><strong>Visitor:</strong> Anonymous</p>
          </div>

          <a href="https://hushhtech.com/investor/${slug}" 
             style="display: inline-block; background: #0A84FF; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 8px; margin-top: 16px;">
            View Your Profile →
          </a>

          <p style="color: #6B7280; font-size: 14px; margin-top: 32px;">
            This is an instant notification. Someone is currently browsing your investor profile.
          </p>
        </div>
      `;
    } else if (type === 'payment_received') {
      const paymentTime = new Date().toLocaleString('en-US', { 
        dateStyle: 'medium', 
        timeStyle: 'short' 
      });
      
      // Get total payments today
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      
      const { data: todaysPayments } = await supabase
        .from('chat_access_tokens')
        .select('payment_amount')
        .eq('profile_slug', slug)
        .eq('payment_status', 'completed')
        .gte('created_at', startOfDay.toISOString());
      
      const todayCount = todaysPayments?.length || 0;
      const todayRevenue = todaysPayments?.reduce((sum, p) => sum + Number(p.payment_amount || 0), 0) || 0;
      
      subject = `💰 Payment Received - $1.00`;
      html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #34C759;">💰 Payment Received!</h2>
          
          <p style="font-size: 16px; color: #0B1120;">
            Great news! Someone just paid to unlock chat access with your profile.
          </p>

          <div style="background: #F0F9FF; border-left: 4px solid #0A84FF; padding: 20px; margin: 20px 0;">
            <p style="margin: 8px 0;"><strong>Amount:</strong> $1.00</p>
            <p style="margin: 8px 0;"><strong>Access:</strong> 30 minutes</p>
            <p style="margin: 8px 0;"><strong>Profile:</strong> ${profile.name}</p>
            <p style="margin: 8px 0;"><strong>Time:</strong> ${paymentTime}</p>
          </div>

          <div style="background: #ECFDF5; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0; color: #059669; font-weight: 500;">
              📊 Today's Revenue: $${todayRevenue.toFixed(2)} (${todayCount} ${todayCount === 1 ? 'payment' : 'payments'})
            </p>
          </div>

          <a href="https://hushhtech.com/investor/${slug}" 
             style="display: inline-block; background: #34C759; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 8px; margin-top: 16px;">
            View Your Profile →
          </a>

          <p style="color: #6B7280; font-size: 14px; margin-top: 32px;">
            Check your Stripe dashboard for payout details.
          </p>
        </div>
      `;
    }

    // Send email
    await client.send({
      from: `Hushh Notifications <${Deno.env.get('GMAIL_USER')}>`,
      to: profile.email,
      subject,
      content: html,
      html,
    });

    await client.close();

    return new Response(
      JSON.stringify({ success: true, emailSent: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Email notification error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to send email' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
