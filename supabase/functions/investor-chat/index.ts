import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Public chat endpoint - no authentication required
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
    const { slug, message, history = [] } = await req.json();
    
    if (!slug || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing slug or message' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );
    
    // Fetch public investor profile
    const { data: profile, error: profileError } = await supabase
      .from('investor_profiles')
      .select('name, organisation, investor_profile, derived_context')
      .eq('slug', slug)
      .eq('is_public', true)
      .eq('user_confirmed', true)
      .single();
    
    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: 'Investor profile not found or not public' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build system prompt
    const systemPrompt = `You are a helpful AI assistant representing investor ${profile.name}${profile.organisation ? ` from ${profile.organisation}` : ''}.

Your role is to answer questions about their investment preferences and profile ONLY. Do not provide financial advice or make investment recommendations.

Investor Profile Context:
${JSON.stringify(profile.investor_profile, null, 2)}

Additional Context:
${JSON.stringify(profile.derived_context, null, 2)}

Guidelines:
- Be friendly and professional
- Only discuss information from the profile
- If asked about topics not in the profile, politely say you don't have that information
- Don't make up information
- Don't provide financial advice`;

    // Build messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-6), // Keep last 6 messages for context
      { role: 'user', content: message }
    ];

    // Call OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const data = await openaiResponse.json();
    const reply = data.choices[0].message.content;

    // Optional: Log message (async, don't wait)
    supabase.from('public_chat_messages').insert([
      { slug, role: 'user', content: message },
      { slug, role: 'assistant', content: reply }
    ]).then(() => {}).catch(console.error);

    return new Response(
      JSON.stringify({ reply }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
