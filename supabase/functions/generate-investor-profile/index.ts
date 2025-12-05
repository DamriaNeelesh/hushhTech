// supabase/functions/generate-investor-profile/index.ts

/// <reference lib="deno.unstable" />

import OpenAI from "npm:openai@4.72.0";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // tighten to https://www.hushhtech.com later if needed
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are an assistant that PRE-FILLS an INVESTOR PROFILE from minimal information.

You are given:
- raw user inputs: name, phone (with country code), email, age, organisation
- derived_context: country, region, currency, email_type, company_industry, life_stage, org_type

GOALS:
1. For each of 12 profile fields, GUESS a reasonable default value based on general demographic and behavioral patterns of high-net-worth investors.
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
   - Investment sizes are in MILLIONS: micro_<1m means under $1 million, small_1m_10m means $1-10 million, etc.
   - Annual capacity is in MILLIONS: <5m means under $5 million per year, 5m_20m means $5-20 million per year, etc.
   - These are high-net-worth investor profiles with institutional-scale investment capacity

4. If you have no clear signal, choose the SAFEST neutral option and set confidence <= 0.3.

5. For multi-select fields (asset_class_preference, sector_preferences), return 2-4 relevant items.

OUTPUT REQUIREMENTS:
- Must be valid JSON only, no comments, no extra text
- Use option values EXACTLY as specified in the schema (with million-scale values like micro_<1m, small_1m_10m, etc.)
- All 12 fields must be present
- Each field must have: value, confidence, rationale
- Confidence must be between 0.0 and 1.0
- Return the profile under key "investor_profile"`;

const PROFILE_SCHEMA = {
  primary_goal: {
    options: [
      "capital_preservation",
      "steady_income",
      "long_term_growth",
      "aggressive_growth",
      "speculation",
    ],
  },
  investment_horizon_years: {
    options: ["<3_years", "3_5_years", "5_10_years", ">10_years"],
  },
  risk_tolerance: {
    options: ["very_low", "low", "moderate", "high", "very_high"],
  },
  liquidity_need: {
    options: ["low", "medium", "high"],
  },
  experience_level: {
    options: ["beginner", "intermediate", "advanced"],
  },
  typical_ticket_size: {
    options: ["micro_<1m", "small_1m_10m", "medium_10m_50m", "large_>50m"],
  },
  annual_investing_capacity: {
    options: ["<5m", "5m_20m", "20m_100m", ">100m"],
  },
  asset_class_preference: {
    options: [
      "public_equities",
      "mutual_funds_etfs",
      "fixed_income",
      "real_estate",
      "startups_private_equity",
      "crypto_digital_assets",
      "cash_equivalents",
    ],
  },
  sector_preferences: {
    options: [
      "technology",
      "consumer_internet",
      "fintech",
      "healthcare",
      "real_estate",
      "energy_climate",
      "industrial",
      "other",
    ],
  },
  volatility_reaction: {
    options: [
      "sell_to_avoid_more_loss",
      "hold_and_wait",
      "buy_more_at_lower_prices",
    ],
  },
  sustainability_preference: {
    options: ["not_important", "nice_to_have", "important", "very_important"],
  },
  engagement_style: {
    options: [
      "very_passive_just_updates",
      "collaborative_discuss_key_decisions",
      "hands_on_active_trader",
    ],
  },
};

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  try {
    // 1) Auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing authorization header",
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const token = authHeader.replace("Bearer ", "");

    // 2) Supabase client with auth context (RLS)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
      },
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error("Auth error:", authError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unauthorized - invalid token",
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // 3) OpenAI key
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      console.error("OPENAI_API_KEY not set");
      return new Response(
        JSON.stringify({
          success: false,
          error: "OpenAI API key not configured",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // 4) Parse input
    const { input, context } = await req.json();

    if (!input || !context) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing input or context",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const userPrompt = JSON.stringify(
      {
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
      },
      null,
      2,
    );

    // 5) Call OpenAI via official SDK
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using gpt-4o-mini for faster + cheaper responses
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Empty response from OpenAI",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error("JSON parse error:", e, "raw content:", content);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid JSON from OpenAI",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const profile = parsed.investor_profile ?? parsed;

    const required = Object.keys(PROFILE_SCHEMA);
    const missing = required.filter((f) => !profile[f]);
    if (missing.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Missing fields in profile: ${missing.join(", ")}`,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        profile,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error: any) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message ?? "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
