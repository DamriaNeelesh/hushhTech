/**
 * Serverless function to generate investor profile using OpenAI GPT-4o API
 * This runs server-side to avoid CORS issues and keep API keys secure
 */

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

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { input, context } = req.body;

    // Validate input
    if (!input || !context) {
      return res.status(400).json({ error: 'Missing required fields: input and context' });
    }

    // Get OpenAI API key from environment
    // Hardcoded OpenAI key for now (requested)
    const apiKey =
      process.env.OPENAI_API_KEY ||
      "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";
    if (!apiKey) {
      console.error('OPENAI_API_KEY not configured');
      return res.status(500).json({ error: 'OpenAI API key not configured on server' });
    }

    // Prepare prompt for GPT-4o
    const userPrompt = JSON.stringify({
      raw_input: {
        name: input.name,
        email: input.email,
        age: input.age,
        phone_country_code: input.phone_country_code,
        phone_number: input.phone_number,
        organisation: input.organisation || null
      },
      derived_context: context,
      profile_schema: PROFILE_SCHEMA
    }, null, 2);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `OpenAI API failed: ${errorText}` 
      });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      console.error('Empty response from GPT-4o');
      return res.status(500).json({ error: 'Empty response from OpenAI GPT-4o' });
    }

    // Parse and validate response
    const parsed = JSON.parse(content);
    const profile = parsed.investor_profile || parsed;

    // Validate all required fields are present
    const requiredFields = Object.keys(PROFILE_SCHEMA);
    const missingFields = requiredFields.filter(field => !profile[field]);

    if (missingFields.length > 0) {
      console.error('Missing fields in AI response:', missingFields);
      return res.status(500).json({ 
        error: `Missing required fields in AI response: ${missingFields.join(', ')}` 
      });
    }

    // Return successful response
    return res.status(200).json({ 
      success: true,
      profile 
    });

  } catch (error) {
    console.error('Error generating investor profile:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to generate investor profile' 
    });
  }
}
