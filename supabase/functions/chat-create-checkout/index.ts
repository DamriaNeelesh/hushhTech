// Create Stripe Checkout Session for Chat Access
// Handles $1 payment for 30-minute unlimited chat access

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
    const { visitorId, slug } = await req.json();
    
    if (!visitorId || !slug) {
      return new Response(
        JSON.stringify({ error: 'Missing visitorId or slug' }),
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

    // Verify profile exists
    const { data: profile } = await supabase
      .from('investor_profiles')
      .select('name')
      .eq('slug', slug)
      .eq('is_public', true)
      .single();

    if (!profile) {
      return new Response(
        JSON.stringify({ error: 'Profile not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get current URL for success/cancel redirects
    const origin = req.headers.get('origin') || 'https://hushhtech.com';
    const successUrl = `${origin}/investor/${slug}?payment=success&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/investor/${slug}?payment=cancel`;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Chat Access - ${profile.name}`,
              description: '30 minutes unlimited chat access',
            },
            unit_amount: 100, // $1.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        visitor_id: visitorId,
        profile_slug: slug,
        access_duration: '30_minutes',
      },
    });

    // Update access token with pending payment
    await supabase
      .from('chat_access_tokens')
      .update({
        payment_status: 'pending',
        payment_intent_id: session.payment_intent as string,
      })
      .eq('visitor_id', visitorId)
      .eq('profile_slug', slug);

    return new Response(
      JSON.stringify({ 
        checkoutUrl: session.url,
        sessionId: session.id
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Create checkout error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
