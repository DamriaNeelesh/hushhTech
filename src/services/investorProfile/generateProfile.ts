import { InvestorProfile, InvestorProfileInput, DerivedContext } from "../../types/investorProfile";

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

function ensureProfileComplete(profile: Partial<InvestorProfile>): InvestorProfile {
  // Helper to pick a fallback value from schema options
  const pick = (field: keyof typeof PROFILE_SCHEMA) => {
    const options = PROFILE_SCHEMA[field].options as any[];
    return Array.isArray(options) ? options[0] : null;
  };

  const withDefault = <T extends keyof InvestorProfile>(
    field: T,
    isArray = false
  ): InvestorProfile[T] => {
    const existing = profile[field] as any;
    if (existing && existing.value && (isArray ? existing.value.length > 0 : true)) {
      return existing;
    }
    const fallback = pick(field as any);
    const value = isArray ? [fallback, (PROFILE_SCHEMA as any)[field].options?.[1]].filter(Boolean) : fallback;
    return {
      value,
      confidence: 0.4,
      rationale: "Filled by fallback due to missing value",
    } as any;
  };

  return {
    primary_goal: withDefault("primary_goal"),
    investment_horizon_years: withDefault("investment_horizon_years"),
    risk_tolerance: withDefault("risk_tolerance"),
    liquidity_need: withDefault("liquidity_need"),
    experience_level: withDefault("experience_level"),
    typical_ticket_size: withDefault("typical_ticket_size"),
    annual_investing_capacity: withDefault("annual_investing_capacity"),
    asset_class_preference: withDefault("asset_class_preference", true),
    sector_preferences: withDefault("sector_preferences", true),
    volatility_reaction: withDefault("volatility_reaction"),
    sustainability_preference: withDefault("sustainability_preference"),
    engagement_style: withDefault("engagement_style"),
  };
}

async function callOpenAIDirect(
  input: InvestorProfileInput,
  context: DerivedContext,
  apiKey: string
): Promise<InvestorProfile> {
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
    2
  );

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      max_tokens: 4096,
      temperature: 0.3,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI direct call failed (${response.status}): ${errorText || "Unknown error"}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from OpenAI");
  }

  // Strip markdown fences if present
  const cleaned = content
    .replace(/^```json/i, "")
    .replace(/^```/i, "")
    .replace(/```$/, "")
    .trim();

  const parsed = JSON.parse(cleaned);
  const profile = parsed.investor_profile || parsed;

  return ensureProfileComplete(profile as Partial<InvestorProfile>);
}

export async function generateInvestorProfile(
  input: InvestorProfileInput,
  context: DerivedContext
): Promise<InvestorProfile> {
  const apiKey =
    (import.meta as any).env.VITE_OPENAI_API_KEY ||
    (typeof window !== "undefined" ? (window as any).__OPENAI_API_KEY__ : undefined);

  if (!apiKey || (typeof apiKey === "string" && apiKey.trim().length === 0)) {
    throw new Error(
      "OpenAI API key is missing. Provide VITE_OPENAI_API_KEY in your .env.local or window.__OPENAI_API_KEY__ at runtime."
    );
  }

  return await callOpenAIDirect(input, context, apiKey.trim());
}
