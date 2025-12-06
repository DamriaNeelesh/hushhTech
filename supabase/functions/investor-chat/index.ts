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
    const { slug, message, visitorId, history = [] } = await req.json();
    
    if (!slug || !message || !visitorId) {
      return new Response(
        JSON.stringify({ error: 'Missing slug, message, or visitorId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // ===== PAYMENT GATE: Verify Access =====
    const { data: token, error: tokenError } = await supabase
      .from('chat_access_tokens')
      .select('*')
      .eq('visitor_id', visitorId)
      .eq('profile_slug', slug)
      .single();

    if (tokenError || !token) {
      return new Response(
        JSON.stringify({ error: 'Access token not found. Please refresh the page.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if paid access expired
    if (token.access_type === 'paid' && token.expires_at) {
      const now = new Date();
      const expiresAt = new Date(token.expires_at);
      
      if (now > expiresAt) {
        return new Response(
          JSON.stringify({ 
            error: 'PAYMENT_REQUIRED',
            message: 'Your 30-minute access has expired. Please pay again.',
            needsPayment: true
          }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Check free tier message limit
    if (token.access_type === 'free') {
      if (token.messages_sent_count >= token.messages_limit) {
        return new Response(
          JSON.stringify({ 
            error: 'PAYMENT_REQUIRED',
            message: 'You have used all 3 free messages. Pay $1 for 30 minutes unlimited access.',
            needsPayment: true
          }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Check hourly rate limit for paid users (50 messages/hour)
    if (token.access_type === 'paid') {
      const now = new Date();
      const hourlyReset = new Date(token.hourly_reset_at || now);
      
      if (now > hourlyReset) {
        // Reset counter
        await supabase
          .from('chat_access_tokens')
          .update({
            hourly_message_count: 0,
            hourly_reset_at: new Date(now.getTime() + 60 * 60 * 1000)
          })
          .eq('id', token.id);
      } else if (token.hourly_message_count >= 50) {
        return new Response(
          JSON.stringify({ 
            error: 'Rate limit reached (50 messages/hour). Please wait before sending more messages.' 
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
    // ===== END PAYMENT GATE =====
    
    // Fetch public investor profile with ALL fields including privacy_settings and user_id
    const { data: profile, error: profileError } = await supabase
      .from('investor_profiles')
      .select('user_id, name, email, age, phone_country_code, phone_number, organisation, investor_profile, derived_context, privacy_settings')
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

    // Fetch onboarding_data for this user
    const { data: onboardingData, error: onboardingError } = await supabase
      .from('onboarding_data')
      .select('*')
      .eq('user_id', profile.user_id)
      .maybeSingle();
    
    if (onboardingError && onboardingError.code !== 'PGRST116') {
      console.error('Error fetching onboarding data:', onboardingError);
    }
    
    // Filter onboarding data based on privacy settings (more defensive)
    const privacySettings = profile.privacy_settings || {};
    const privacyData = privacySettings?.onboarding_data || {};
    const visibleOnboardingData: any = {};
    
    if (onboardingData) {
      console.log('DEBUG: Onboarding data exists for user:', profile.user_id);
      
      // Iterate through all onboarding data fields
      Object.keys(onboardingData).forEach(fieldName => {
        // Skip internal/system fields
        if (['id', 'user_id', 'created_at', 'updated_at', 'is_completed', 'current_step', 'completed_steps'].includes(fieldName)) {
          return;
        }
        
        // Check if field value exists (not null/undefined)
        if (onboardingData[fieldName] == null) {
          return;
        }
        
        // Check privacy (default to true if not specified, hide only if explicitly false)
        const isVisible = privacyData[fieldName] !== false;
        
        if (isVisible) {
          // Mask SSN even if visible
          if (fieldName === 'ssn_encrypted') {
            visibleOnboardingData[fieldName] = '***-**-****';
          } else if (fieldName === 'date_of_birth') {
            visibleOnboardingData[fieldName] = new Date(onboardingData[fieldName]).toLocaleDateString();
          } else {
            visibleOnboardingData[fieldName] = onboardingData[fieldName];
          }
        }
      });
      
      console.log('DEBUG: Visible onboarding fields:', Object.keys(visibleOnboardingData));
      console.log('DEBUG: Visible onboarding data:', JSON.stringify(visibleOnboardingData, null, 2));
    } else {
      console.log('DEBUG: No onboarding data found for user:', profile.user_id);
    }

    // Build comprehensive system prompt with ALL data
    let systemPrompt = `You are a helpful AI assistant representing investor ${profile.name}${profile.organisation ? ` from ${profile.organisation}` : ''}.

Your role is to answer questions about their investment preferences, profile, and onboarding information. Do not provide financial advice or make investment recommendations.

Investor Basic Information:
- Name: ${profile.name}
- Email: ${profile.email}
- Age: ${profile.age}
- Phone: ${profile.phone_country_code} ${profile.phone_number}
${profile.organisation ? `- Organisation: ${profile.organisation}` : ''}

Investment Profile:
${JSON.stringify(profile.investor_profile, null, 2)}

Additional Context:
${JSON.stringify(profile.derived_context, null, 2)}`;

    // Add onboarding data if available
    if (Object.keys(visibleOnboardingData).length > 0) {
      systemPrompt += `

Onboarding & Personal Information:
${JSON.stringify(visibleOnboardingData, null, 2)}`;
      
      console.log('DEBUG: Onboarding data added to system prompt');
    } else {
      console.log('DEBUG: No visible onboarding data to add to prompt');
    }

    systemPrompt += `

Guidelines:
- Be friendly and professional
- Answer questions about the investor's profile, preferences, onboarding details, and contact information
- If asked about topics not in the available data, politely say you don't have that information
- Don't make up information
- Don't provide financial advice or investment recommendations
- When asked about onboarding details (like address, city, state, zip code, legal name, etc.), use the information provided in the "Onboarding & Personal Information" section above`;

    console.log('DEBUG: System prompt length:', systemPrompt.length, 'characters');

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

    // Increment message counter and update rate limit
    const updates: any = {
      messages_sent_count: token.messages_sent_count + 1,
      last_message_at: new Date().toISOString()
    };

    if (token.access_type === 'paid') {
      updates.hourly_message_count = (token.hourly_message_count || 0) + 1;
    }

    await supabase
      .from('chat_access_tokens')
      .update(updates)
      .eq('id', token.id);

    // Optional: Log message (async, don't wait)
    supabase.from('public_chat_messages').insert([
      { slug, role: 'user', content: message },
      { slug, role: 'assistant', content: reply }
    ]).then(() => {}).catch(console.error);

    // Calculate remaining messages/time
    let accessInfo: any = {};
    if (token.access_type === 'free') {
      accessInfo.messagesRemaining = token.messages_limit - (token.messages_sent_count + 1);
      accessInfo.accessType = 'free';
    } else if (token.access_type === 'paid') {
      const timeRemaining = Math.max(0, Math.floor((new Date(token.expires_at).getTime() - Date.now()) / 1000 / 60));
      accessInfo.timeRemaining = `${timeRemaining} minutes`;
      accessInfo.accessType = 'paid';
    }

    return new Response(
      JSON.stringify({ reply, accessInfo }),
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
