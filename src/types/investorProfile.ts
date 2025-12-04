// 12 Investor Profile Field Types
export type PrimaryGoal = 
  | "capital_preservation" 
  | "steady_income" 
  | "long_term_growth" 
  | "aggressive_growth" 
  | "speculation";

export type InvestmentHorizon = 
  | "<3_years" 
  | "3_5_years" 
  | "5_10_years" 
  | ">10_years";

export type RiskTolerance = 
  | "very_low" 
  | "low" 
  | "moderate" 
  | "high" 
  | "very_high";

export type LiquidityNeed = "low" | "medium" | "high";

export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export type TicketSize = 
  | "micro_<1k" 
  | "small_1k_10k" 
  | "medium_10k_50k" 
  | "large_>50k";

export type AnnualCapacity = 
  | "<5k" 
  | "5k_20k" 
  | "20k_100k" 
  | ">100k";

export type AssetClass = 
  | "public_equities" 
  | "mutual_funds_etfs" 
  | "fixed_income" 
  | "real_estate" 
  | "startups_private_equity" 
  | "crypto_digital_assets" 
  | "cash_equivalents";

export type Sector = 
  | "technology" 
  | "consumer_internet" 
  | "fintech" 
  | "healthcare" 
  | "real_estate" 
  | "energy_climate" 
  | "industrial" 
  | "other";

export type VolatilityReaction = 
  | "sell_to_avoid_more_loss" 
  | "hold_and_wait" 
  | "buy_more_at_lower_prices";

export type SustainabilityPreference = 
  | "not_important" 
  | "nice_to_have" 
  | "important" 
  | "very_important";

export type EngagementStyle = 
  | "very_passive_just_updates" 
  | "collaborative_discuss_key_decisions" 
  | "hands_on_active_trader";

// Field with confidence and rationale
export interface InvestorProfileField<T> {
  value: T;
  confidence: number; // 0.0 to 1.0
  rationale: string;
}

// Complete Investor Profile (12 fields)
export interface InvestorProfile {
  primary_goal: InvestorProfileField<PrimaryGoal>;
  investment_horizon_years: InvestorProfileField<InvestmentHorizon>;
  risk_tolerance: InvestorProfileField<RiskTolerance>;
  liquidity_need: InvestorProfileField<LiquidityNeed>;
  experience_level: InvestorProfileField<ExperienceLevel>;
  typical_ticket_size: InvestorProfileField<TicketSize>;
  annual_investing_capacity: InvestorProfileField<AnnualCapacity>;
  asset_class_preference: InvestorProfileField<AssetClass[]>;
  sector_preferences: InvestorProfileField<Sector[]>;
  volatility_reaction: InvestorProfileField<VolatilityReaction>;
  sustainability_preference: InvestorProfileField<SustainabilityPreference>;
  engagement_style: InvestorProfileField<EngagementStyle>;
}

// Input from user form (5 fields)
export interface InvestorProfileInput {
  name: string;
  email: string;
  age: number;
  phone_country_code: string;
  phone_number: string;
  organisation?: string;
}

// Derived context from enrichment
export interface DerivedContext {
  country: string;
  region: string;
  currency: string;
  email_type: "personal" | "corporate";
  company_domain?: string;
  company_industry?: string;
  company_size_bucket?: string;
  life_stage: string;
  org_type?: string;
}

// Complete profile record from database
export interface InvestorProfileRecord {
  id: string;
  user_id: string;
  name: string;
  email: string;
  age: number;
  phone_country_code: string;
  phone_number: string;
  organisation?: string;
  slug?: string;
  is_public?: boolean;
  derived_context: DerivedContext;
  investor_profile: InvestorProfile;
  is_ai_prefilled: boolean;
  user_confirmed: boolean;
  confirmed_at?: string;
  created_at: string;
  updated_at: string;
}

// Field labels for UI
export const FIELD_LABELS: Record<keyof InvestorProfile, string> = {
  primary_goal: "Primary Investment Goal",
  investment_horizon_years: "Investment Time Horizon",
  risk_tolerance: "Risk Tolerance",
  liquidity_need: "Liquidity Need",
  experience_level: "Investment Experience",
  typical_ticket_size: "Typical Investment Size",
  annual_investing_capacity: "Annual Investing Capacity",
  asset_class_preference: "Asset Class Preferences",
  sector_preferences: "Sector Preferences",
  volatility_reaction: "Reaction to Market Volatility",
  sustainability_preference: "Sustainability/ESG Preference",
  engagement_style: "Engagement Style"
};

// Human-readable labels for enum values
export const VALUE_LABELS: Record<string, string> = {
  // Primary Goal
  capital_preservation: "Capital Preservation",
  steady_income: "Steady Income",
  long_term_growth: "Long-term Growth",
  aggressive_growth: "Aggressive Growth",
  speculation: "Speculation",
  
  // Investment Horizon
  "<3_years": "Less than 3 years",
  "3_5_years": "3-5 years",
  "5_10_years": "5-10 years",
  ">10_years": "More than 10 years",
  
  // Risk Tolerance
  very_low: "Very Low",
  low: "Low",
  moderate: "Moderate",
  high: "High",
  very_high: "Very High",
  
  // Experience Level
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  
  // Ticket Size
  "micro_<1k": "Micro (< $1K)",
  "small_1k_10k": "Small ($1K - $10K)",
  "medium_10k_50k": "Medium ($10K - $50K)",
  "large_>50k": "Large (> $50K)",
  
  // Annual Capacity
  "<5k": "< $5K",
  "5k_20k": "$5K - $20K",
  "20k_100k": "$20K - $100K",
  ">100k": "> $100K",
  
  // Asset Classes
  public_equities: "Public Equities",
  mutual_funds_etfs: "Mutual Funds / ETFs",
  fixed_income: "Fixed Income",
  real_estate: "Real Estate",
  startups_private_equity: "Startups / Private Equity",
  crypto_digital_assets: "Crypto / Digital Assets",
  cash_equivalents: "Cash Equivalents",
  
  // Sectors
  technology: "Technology",
  consumer_internet: "Consumer Internet",
  fintech: "Fintech",
  healthcare: "Healthcare",
  energy_climate: "Energy & Climate",
  industrial: "Industrial",
  other: "Other",
  
  // Volatility Reaction
  sell_to_avoid_more_loss: "Sell to Avoid More Loss",
  hold_and_wait: "Hold and Wait",
  buy_more_at_lower_prices: "Buy More at Lower Prices",
  
  // Sustainability
  not_important: "Not Important",
  nice_to_have: "Nice to Have",
  important: "Important",
  very_important: "Very Important",
  
  // Engagement Style
  very_passive_just_updates: "Very Passive (Just Updates)",
  collaborative_discuss_key_decisions: "Collaborative (Discuss Key Decisions)",
  hands_on_active_trader: "Hands-on (Active Trader)"
};
