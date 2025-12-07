// Verify Stripe Payment and Grant Access
// Called after user returns from Stripe checkout

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.5.0?target=deno";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { sessionId, visitorId, slug } = await req.json();
    
    if (!sessionId || !visitorId || !slug) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-10-16',
    });

    // Get Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Retrieve Stripe session to verify payment
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Payment not completed',
          status: session.payment_status
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Payment successful - grant 30 minutes access
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now

    const { data: updated, error: updateError } = await supabase
      .from('chat_access_tokens')
      .update({
        payment_status: 'completed',
        access_type: 'paid',
        expires_at: expiresAt.toISOString(),
        payment_intent_id: session.payment_intent as string,
      })
      .eq('visitor_id', visitorId)
      .eq('profile_slug', slug)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Failed to update access: ${updateError.message}`);
    }

    // Fetch profile to get owner's email for notification
    const { data: profile } = await supabase
      .from('investor_profiles')
      .select('email, name')
      .eq('slug', slug)
      .single();

    // Send payment notification email via Vercel API (async, don't wait)
    if (profile) {
      fetch('https://hushhtech.com/api/send-email-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'payment_received',
          slug,
          profileOwnerEmail: profile.email,
          profileName: profile.name
        })
      }).catch(err => console.log('Email notification failed:', err));
    }

    return new Response(
      JSON.stringify({
        success: true,
        accessGranted: true,
        expiresAt: expiresAt.toISOString(),
        timeRemaining: '30 minutes'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Verify payment error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
