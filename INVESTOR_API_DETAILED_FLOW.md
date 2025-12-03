# Investor Profile API - Complete Flow Documentation

## 📊 Complete Data Flow

```
User Input (5 fields)
    ↓
Context Enrichment (enrichContext.ts)
    ↓
API Request to /api/generate-investor-profile
    ↓
Claude AI Processing
    ↓
AI Response (12 investor fields)
    ↓
Save to Supabase
    ↓
Show to User for Review
```

---

## 1️⃣ User Input (Step 1: Form Submission)

**What User Enters:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul.sharma@google.com",
  "age": 32,
  "phone_country_code": "+91",
  "phone_number": "9876543210",
  "organisation": "Google India"
}
```

---

## 2️⃣ Context Enrichment (Automatic)

**Code runs enrichContext() function:**

```javascript
// From phone number
country: "India"
region: "APAC"
currency: "INR"

// From email domain
email_type: "corporate"
company_info: { name: "Google", industry: "Technology" }

// From age
life_stage: "mid_career"  // 30-45 years

// From organisation
org_type: "corporate"
company_industry: "Technology"
```

**Enriched Context:**
```json
{
  "country": "India",
  "region": "APAC",
  "currency": "INR",
  "email_type": "corporate",
  "company_industry": "Technology",
  "company_name": "Google",
  "life_stage": "mid_career",
  "org_type": "corporate"
}
```

---

## 3️⃣ API Request to Claude AI

**Our API Endpoint:** `/api/generate-investor-profile`

**What We Send to Claude:**

### System Prompt (Instructions for Claude):
```
You are an assistant that PRE-FILLS an INVESTOR PROFILE from minimal information.

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
- Return the profile under key "investor_profile"
```

### User Message (Data for Claude):
```json
{
  "raw_input": {
    "name": "Rahul Sharma",
    "email": "rahul.sharma@google.com",
    "age": 32,
    "phone_country_code": "+91",
    "phone_number": "9876543210",
    "organisation": "Google India"
  },
  "derived_context": {
    "country": "India",
    "region": "APAC",
    "currency": "INR",
    "email_type": "corporate",
    "company_industry": "Technology",
    "life_stage": "mid_career",
    "org_type": "corporate"
  },
  "profile_schema": {
    "primary_goal": {
      "options": ["capital_preservation", "steady_income", "long_term_growth", "aggressive_growth", "speculation"],
      "description": "Main investment objective"
    },
    "investment_horizon_years": {
      "options": ["<3_years", "3_5_years", "5_10_years", ">10_years"],
      "description": "Expected investment timeframe"
    },
    "risk_tolerance": {
      "options": ["very_low", "low", "moderate", "high", "very_high"],
      "description": "Comfort level with portfolio volatility"
    },
    "liquidity_need": {
      "options": ["low", "medium", "high"],
      "description": "Need for quick access to invested money"
    },
    "experience_level": {
      "options": ["beginner", "intermediate", "advanced"],
      "description": "Investing knowledge and experience"
    },
    "typical_ticket_size": {
      "options": ["micro_<1k", "small_1k_10k", "medium_10k_50k", "large_>50k"],
      "description": "Typical amount per investment"
    },
    "annual_investing_capacity": {
      "options": ["<5k", "5k_20k", "20k_100k", ">100k"],
      "description": "Annual new investment capacity"
    },
    "asset_class_preference": {
      "options": ["public_equities", "mutual_funds_etfs", "fixed_income", "real_estate", "startups_private_equity", "crypto_digital_assets", "cash_equivalents"],
      "description": "Preferred asset classes (multi-select)",
      "type": "array"
    },
    "sector_preferences": {
      "options": ["technology", "consumer_internet", "fintech", "healthcare", "real_estate", "energy_climate", "industrial", "other"],
      "description": "Preferred investment sectors (multi-select)",
      "type": "array"
    },
    "volatility_reaction": {
      "options": ["sell_to_avoid_more_loss", "hold_and_wait", "buy_more_at_lower_prices"],
      "description": "Behavior during 20% portfolio decline"
    },
    "sustainability_preference": {
      "options": ["not_important", "nice_to_have", "important", "very_important"],
      "description": "Importance of ESG/sustainability factors"
    },
    "engagement_style": {
      "options": ["very_passive_just_updates", "collaborative_discuss_key_decisions", "hands_on_active_trader"],
      "description": "Desired level of involvement"
    }
  }
}
```

**Full Claude API Request:**
```javascript
POST https://api.anthropic.com/v1/messages

Headers:
{
  "Content-Type": "application/json",
  "x-api-key": "YOUR_ANTHROPIC_API_KEY",
  "anthropic-version": "2023-06-01"
}

Body:
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 4096,
  "temperature": 0.3,
  "system": "You are an assistant that PRE-FILLS an INVESTOR PROFILE...",
  "messages": [
    {
      "role": "user",
      "content": "{...all the data above as JSON string...}"
    }
  ]
}
```

---

## 4️⃣ Claude AI Response

**What Claude Returns:**

```json
{
  "id": "msg_01XYZ...",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "{\"investor_profile\":{\"primary_goal\":{\"value\":\"long_term_growth\",\"confidence\":0.75,\"rationale\":\"Given the user works at Google India in tech at age 32 (mid-career), they likely prioritize building wealth over time rather than immediate income or capital preservation.\"},\"investment_horizon_years\":{\"value\":\"5_10_years\",\"confidence\":0.7,\"rationale\":\"Mid-career professionals in their early 30s typically have a medium to long-term outlook, balancing current obligations with retirement planning.\"},\"risk_tolerance\":{\"value\":\"moderate\",\"confidence\":0.65,\"rationale\":\"Tech professionals often understand volatility but working at an established company like Google suggests preference for balanced rather than aggressive risk.\"},\"liquidity_need\":{\"value\":\"medium\",\"confidence\":0.6,\"rationale\":\"Mid-career stage suggests some need for accessible funds for life events while still being able to lock up capital for growth.\"},\"experience_level\":{\"value\":\"intermediate\",\"confidence\":0.7,\"rationale\":\"Working at a major tech company typically correlates with financial sophistication and exposure to equity compensation, suggesting intermediate investing knowledge.\"},\"typical_ticket_size\":{\"value\":\"medium_10k_50k\",\"confidence\":0.6,\"rationale\":\"Google employees in India typically earn well above market rates, suggesting capacity for meaningful investments in the ₹8L-40L range (roughly $10K-50K USD equivalent).\"},\"annual_investing_capacity\":{\"value\":\"20k_100k\",\"confidence\":0.55,\"rationale\":\"Tech professionals at Google India in their 30s likely have annual savings capacity in the ₹15L-80L range, adjusted for purchasing power parity.\"},\"asset_class_preference\":{\"value\":[\"public_equities\",\"mutual_funds_etfs\",\"startups_private_equity\"],\"confidence\":0.7,\"rationale\":\"Tech professionals often prefer equity-based investments and have access to startup investment opportunities through their network.\"},\"sector_preferences\":{\"value\":[\"technology\",\"fintech\",\"consumer_internet\"],\"confidence\":0.75,\"rationale\":\"Given their work at Google, natural familiarity and interest in technology, fintech, and digital consumer sectors is highly likely.\"},\"volatility_reaction\":{\"value\":\"hold_and_wait\",\"confidence\":0.65,\"rationale\":\"Tech professionals with stable employment tend to adopt a patient, long-term approach rather than panic selling or aggressively buying dips.\"},\"sustainability_preference\":{\"value\":\"important\",\"confidence\":0.6,\"rationale\":\"Younger tech professionals, especially at progressive companies like Google, typically value ESG factors more than previous generations.\"},\"engagement_style\":{\"value\":\"collaborative_discuss_key_decisions\",\"confidence\":0.65,\"rationale\":\"Mid-career professionals at tech companies usually want to stay informed and participate in major decisions without day-to-day active trading.\"}}}"
    }
  ],
  "model": "claude-3-5-sonnet-20241022",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 1250,
    "output_tokens": 680
  }
}
```

**Parsed Claude Response (What We Extract):**

```json
{
  "investor_profile": {
    "primary_goal": {
      "value": "long_term_growth",
      "confidence": 0.75,
      "rationale": "Given the user works at Google India in tech at age 32 (mid-career), they likely prioritize building wealth over time rather than immediate income or capital preservation."
    },
    "investment_horizon_years": {
      "value": "5_10_years",
      "confidence": 0.7,
      "rationale": "Mid-career professionals in their early 30s typically have a medium to long-term outlook, balancing current obligations with retirement planning."
    },
    "risk_tolerance": {
      "value": "moderate",
      "confidence": 0.65,
      "rationale": "Tech professionals often understand volatility but working at an established company like Google suggests preference for balanced rather than aggressive risk."
    },
    "liquidity_need": {
      "value": "medium",
      "confidence": 0.6,
      "rationale": "Mid-career stage suggests some need for accessible funds for life events while still being able to lock up capital for growth."
    },
    "experience_level": {
      "value": "intermediate",
      "confidence": 0.7,
      "rationale": "Working at a major tech company typically correlates with financial sophistication and exposure to equity compensation, suggesting intermediate investing knowledge."
    },
    "typical_ticket_size": {
      "value": "medium_10k_50k",
      "confidence": 0.6,
      "rationale": "Google employees in India typically earn well above market rates, suggesting capacity for meaningful investments in the ₹8L-40L range (roughly $10K-50K USD equivalent)."
    },
    "annual_investing_capacity": {
      "value": "20k_100k",
      "confidence": 0.55,
      "rationale": "Tech professionals at Google India in their 30s likely have annual savings capacity in the ₹15L-80L range, adjusted for purchasing power parity."
    },
    "asset_class_preference": {
      "value": ["public_equities", "mutual_funds_etfs", "startups_private_equity"],
      "confidence": 0.7,
      "rationale": "Tech professionals often prefer equity-based investments and have access to startup investment opportunities through their network."
    },
    "sector_preferences": {
      "value": ["technology", "fintech", "consumer_internet"],
      "confidence": 0.75,
      "rationale": "Given their work at Google, natural familiarity and interest in technology, fintech, and digital consumer sectors is highly likely."
    },
    "volatility_reaction": {
      "value": "hold_and_wait",
      "confidence": 0.65,
      "rationale": "Tech professionals with stable employment tend to adopt a patient, long-term approach rather than panic selling or aggressively buying dips."
    },
    "sustainability_preference": {
      "value": "important",
      "confidence": 0.6,
      "rationale": "Younger tech professionals, especially at progressive companies like Google, typically value ESG factors more than previous generations."
    },
    "engagement_style": {
      "value": "collaborative_discuss_key_decisions",
      "confidence": 0.65,
      "rationale": "Mid-career professionals at tech companies usually want to stay informed and participate in major decisions without day-to-day active trading."
    }
  }
}
```

---

## 5️⃣ Our API Response to Frontend

**What `/api/generate-investor-profile` Returns:**

```json
{
  "success": true,
  "profile": {
    "primary_goal": {
      "value": "long_term_growth",
      "confidence": 0.75,
      "rationale": "Given the user works at Google India..."
    },
    "investment_horizon_years": { ... },
    "risk_tolerance": { ... },
    "liquidity_need": { ... },
    "experience_level": { ... },
    "typical_ticket_size": { ... },
    "annual_investing_capacity": { ... },
    "asset_class_preference": { ... },
    "sector_preferences": { ... },
    "volatility_reaction": { ... },
    "sustainability_preference": { ... },
    "engagement_style": { ... }
  }
}
```

---

## 6️⃣ Save to Supabase

**Database Insert:**

```sql
INSERT INTO investor_profiles (
  user_id,
  name,
  email,
  age,
  phone_country_code,
  phone_number,
  organisation,
  derived_context,
  investor_profile,
  is_ai_prefilled,
  user_confirmed
) VALUES (
  'auth-user-uuid',
  'Rahul Sharma',
  'rahul.sharma@google.com',
  32,
  '+91',
  '9876543210',
  'Google India',
  '{"country":"India","region":"APAC"...}',
  '{"primary_goal":{"value":"long_term_growth"...}',
  true,
  false
);
```

---

## 7️⃣ Show to User

**User Sees:**

```
✅ AI-Generated Profile (Review & Edit)

📍 Derived Context
• Country: India (🇮🇳)
• Region: APAC
• Currency: INR
• Life Stage: Mid Career

📊 Investment Profile

1. Primary Goal: Long-term Growth [75% confidence]
   Rationale: "Given the user works at Google India in tech at age 32..."
   [Edit ✏️]

2. Investment Horizon: 5-10 years [70% confidence]
   Rationale: "Mid-career professionals in their early 30s..."
   [Edit ✏️]

... (10 more fields)

[Confirm Profile] [Go Back]
```

---

## 📝 Claude AI's Intelligence

Claude analyzes:
1. **Age (32)** → Mid-career stage, longer investment horizon
2. **Company (Google)** → High income, tech-savvy, equity exposure
3. **Location (India)** → Adjusts investment amounts for purchasing power
4. **Industry (Tech)** → Higher risk tolerance, interest in tech sectors
5. **Life Stage** → Balanced needs (growth + some liquidity)

Result: **Smart, personalized defaults** that user can review and adjust!

---

## 🧪 Testing the API

### Test Request (cURL):
```bash
curl -X POST http://localhost:3000/api/generate-investor-profile \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "name": "Rahul Sharma",
      "email": "rahul.sharma@google.com",
      "age": 32,
      "phone_country_code": "+91",
      "phone_number": "9876543210",
      "organisation": "Google India"
    },
    "context": {
      "country": "India",
      "region": "APAC",
      "currency": "INR",
      "email_type": "corporate",
      "company_industry": "Technology",
      "life_stage": "mid_career",
      "org_type": "corporate"
    }
  }'
```

### Expected Response:
```json
{
  "success": true,
  "profile": {
    "primary_goal": { "value": "long_term_growth", "confidence": 0.75, "rationale": "..." },
    "investment_horizon_years": { "value": "5_10_years", "confidence": 0.7, "rationale": "..." },
    ...
  }
}
```

---

## 🔍 How Claude Makes Decisions

| Input Signal | Claude's Analysis | Output Field Affected |
|-------------|-------------------|----------------------|
| Age: 32 | Mid-career, ~15-20 years to retirement | Horizon: 5-10 years |
| Company: Google | High income, equity comp, tech-savvy | Experience: Intermediate, Sectors: Tech |
| Location: India | Adjust for PPP, currency: INR | Ticket size adjusted for INR |
| Industry: Tech | Higher risk tolerance, innovation exposure | Risk: Moderate, Assets: Equities/Startups |
| Email: @google.com | Corporate email, established company | Stability → Hold strategy |

---

## 🎯 Why This Approach Works

1. **Privacy-First** - Claude doesn't claim to know actual financial data
2. **Context-Aware** - Uses demographic patterns intelligently
3. **Transparent** - Shows confidence scores and rationale
4. **Editable** - User has final control
5. **Smart Defaults** - Reduces friction from 12 questions → 5 inputs

This is **1000x better** than asking users to manually fill 12 detailed investment questions! 🚀
