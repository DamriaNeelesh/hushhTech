import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

const SYSTEM_PROMPT = `You are an assistant that PRE-FILLS an INVESTOR PROFILE from minimal information.

You are given:
- raw user inputs: name, phone (with country code), email, age, organisation
- derived_context: country, region, currency, email_type, company_industry, life_stage, org_type

GOALS:
1. For each of 12 profile fields, GUESS a reasonable default value based on general demographic and behavioral patterns of investors.
2. For each field, return:
   - value: the selected option (must match exactly from allowed values)
   - confidence: 0.0–1.0 (how confident you are in this guess)
   - rationale: 1-2 sentences explaining your reasoning

3. Be conservative and privacy-first:
   - Never claim to know actual income, net worth, or legal accreditation
   - Use only the provided context and typical statistical patterns
   - Younger investors (20s-30s) often have longer time horizons (>10 years)
   - Tech/finance roles often correlate with higher risk tolerance (moderate to high)
   - Life stage influences liquidity needs and investment capacity
   - Early career = lower capacity, mid/late career = higher capacity

4. If you have no clear signal, choose the SAFEST neutral option and set confidence <= 0.3.

5. For multi-select fields (asset_class_preference, sector_preferences), return 2-4 relevant items.

OUTPUT REQUIREMENTS:
- Must be valid JSON only, no comments, no extra text
- Use option values EXACTLY as specified in the schema
- All 12 fields must be present
- Each field must have: value, confidence, rationale
- Confidence must be between 0.0 and 1.0
- Return the profile under key "investor_profile"`;

const PROFILE_SCHEMA = {
  primary_goal: {
    options: ["capital_preservation", "steady_income", "long_term_growth", "aggressive_growth", "speculation"],
    description: "Main investment objective"
  },
  investment_horizon_years: {
    options: ["<3_years", "3_5_years", "5_10_years", ">10_years"],
    description: "Expected investment timeframe"
  },
  risk_tolerance: {
    options: ["very_low", "low", "moderate", "high", "very_high"],
    description: "Comfort level with portfolio volatility"
  },
  liquidity_need: {
    options: ["low", "medium", "high"],
    description: "Need for quick access to invested money"
  },
  experience_level: {
    options: ["beginner", "intermediate", "advanced"],
    description: "Investing knowledge and experience"
  },
  typical_ticket_size: {
    options: ["micro_<1k", "small_1k_10k", "medium_10k_50k", "large_>50k"],
    description: "Typical amount per investment (adjust for currency)"
  },
  annual_investing_capacity: {
    options: ["<5k", "5k_20k", "20k_100k", ">100k"],
    description: "Annual new investment capacity (adjust for currency)"
  },
  asset_class_preference: {
    options: ["public_equities", "mutual_funds_etfs", "fixed_income", "real_estate", "startups_private_equity", "crypto_digital_assets", "cash_equivalents"],
    description: "Preferred asset classes (multi-select, 2-4 items)",
    type: "array"
  },
  sector_preferences: {
    options: ["technology", "consumer_internet", "fintech", "healthcare", "real_estate", "energy_climate", "industrial", "other"],
    description: "Preferred investment sectors (multi-select, 2-4 items)",
    type: "array"
  },
  volatility_reaction: {
    options: ["sell_to_avoid_more_loss", "hold_and_wait", "buy_more_at_lower_prices"],
    description: "Behavior during 20% portfolio decline"
  },
  sustainability_preference: {
    options: ["not_important", "nice_to_have", "important", "very_important"],
    description: "Importance of ESG/sustainability factors"
  },
  engagement_style: {
    options: ["very_passive_just_updates", "collaborative_discuss_key_decisions", "hands_on_active_trader"],
    description: "Desired level of involvement in investment decisions"
  }
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Verify user with Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized - invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Check OpenAI API Key
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set in Supabase secrets');
      return new Response(
        JSON.stringify({ success: false, error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Parse request
    const { input, context } = await req.json();

    if (!input || !context) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing input or context' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 5. Build user prompt
    const userPrompt = JSON.stringify({
      raw_input: {
        name: input.name,
        email: input.email,
        age: input.age,
        phone_country_code: input.phone_country_code,
        phone_number: input.phone_number,
        organisation: input.organisation || null,
      },
      derived_context: context,
      profile_schema: PROFILE_SCHEMA,
    }, null, 2);

    // 6. Call OpenAI (SERVER-SIDE - API key secure)
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 4096,
        temperature: 0.3,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ]
      })
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('OpenAI API Error:', errorText);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `OpenAI API failed: ${openaiResponse.status}` 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openaiData = await openaiResponse.json();
    const content = openaiData?.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ success: false, error: 'Empty response from OpenAI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 7. Parse and clean response
    const cleaned = content
      .replace(/^```json/i, '')
      .replace(/^```/i, '')
      .replace(/```$/, '')
      .trim();

    let profile;
    try {
      const parsed = JSON.parse(cleaned);
      profile = parsed.investor_profile || parsed;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid JSON from OpenAI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 8. Return success
    return new Response(
      JSON.stringify({ 
        success: true, 
        profile 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
