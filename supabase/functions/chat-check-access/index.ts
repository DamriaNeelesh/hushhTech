// Chat Access Verification Endpoint
// Checks if visitor can send messages (free tier or paid access)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

    // Get Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get or create access token
    let { data: token, error: fetchError } = await supabase
      .from('chat_access_tokens')
      .select('*')
      .eq('visitor_id', visitorId)
      .eq('profile_slug', slug)
      .single();

    // If token doesn't exist, create new free tier token
    if (fetchError || !token) {
      const { data: newToken, error: insertError } = await supabase
        .from('chat_access_tokens')
        .insert({
          visitor_id: visitorId,
          profile_slug: slug,
          payment_status: 'free_tier',
          access_type: 'free',
          messages_limit: 3,
          messages_sent_count: 0,
          ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
          user_agent: req.headers.get('user-agent')
        })
        .select()
        .single();

      if (insertError) {
        throw new Error(`Failed to create token: ${insertError.message}`);
      }

      token = newToken;
    }

    // Check if paid access has expired
    if (token.access_type === 'paid' && token.expires_at) {
      const now = new Date();
      const expiresAt = new Date(token.expires_at);
      
      if (now > expiresAt) {
        return new Response(
          JSON.stringify({
            canChat: false,
            needsPayment: true,
            accessType: 'expired',
            messagesRemaining: 0,
            message: 'Your 30-minute access has expired. Please pay again to continue.'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Check message limits for free tier
    if (token.access_type === 'free') {
      const remaining = token.messages_limit - token.messages_sent_count;
      
      if (remaining <= 0) {
        return new Response(
          JSON.stringify({
            canChat: false,
            needsPayment: true,
            accessType: 'free',
            messagesRemaining: 0,
            message: 'You have used all 3 free messages. Pay $1 for 30 minutes unlimited access.'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({
          canChat: true,
          needsPayment: false,
          accessType: 'free',
          messagesRemaining: remaining
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Paid access - check hourly rate limit (50 messages/hour to prevent abuse)
    if (token.access_type === 'paid') {
      const now = new Date();
      const hourlyReset = new Date(token.hourly_reset_at || now);
      
      // Reset hourly counter if expired
      if (now > hourlyReset) {
        await supabase
          .from('chat_access_tokens')
          .update({
            hourly_message_count: 0,
            hourly_reset_at: new Date(now.getTime() + 60 * 60 * 1000) // 1 hour from now
          })
          .eq('id', token.id);
        
        token.hourly_message_count = 0;
      }
      
      // Check rate limit
      if (token.hourly_message_count >= 50) {
        return new Response(
          JSON.stringify({
            canChat: false,
            needsPayment: false,
            accessType: 'paid',
            messagesRemaining: 'rate_limited',
            message: 'Rate limit reached (50 messages/hour). Please wait before sending more messages.'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Calculate time remaining
      const timeRemaining = Math.max(0, Math.floor((new Date(token.expires_at).getTime() - now.getTime()) / 1000 / 60));
      
      return new Response(
        JSON.stringify({
          canChat: true,
          needsPayment: false,
          accessType: 'paid',
          messagesRemaining: 'unlimited',
          timeRemaining: `${timeRemaining} minutes`
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fallback
    return new Response(
      JSON.stringify({
        canChat: false,
        needsPayment: true,
        accessType: 'unknown',
        messagesRemaining: 0
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Check access error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
