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
  | "micro_<1m" 
  | "small_1m_10m" 
  | "medium_10m_50m" 
  | "large_>50m";

export type AnnualCapacity = 
  | "<5m" 
  | "5m_20m" 
  | "20m_100m" 
  | ">100m";

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

// Privacy Settings for controlling field visibility
export interface PrivacySettings {
  investor_profile: {
    [key in keyof InvestorProfile]: boolean;
  };
  onboarding_data: {
    account_type: boolean;
    selected_fund: boolean;
    referral_source: boolean;
    referral_source_other: boolean;
    citizenship_country: boolean;
    residence_country: boolean;
    account_structure: boolean;
    phone_number: boolean;
    phone_country_code: boolean;
    legal_first_name: boolean;
    legal_last_name: boolean;
    address_line_1: boolean;
    address_line_2: boolean;
    address_country: boolean;
    city: boolean;
    state: boolean;
    zip_code: boolean;
    address_phone_number: boolean;
    address_phone_country_code: boolean;
    date_of_birth: boolean;
    ssn_encrypted: boolean;
    initial_investment_amount: boolean;
    recurring_investment_enabled: boolean;
    recurring_frequency: boolean;
    recurring_amount: boolean;
    recurring_day_of_month: boolean;
  };
  basic_info: {
    name: boolean;
    email: boolean;
    age: boolean;
    organisation: boolean;
  };
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
  privacy_settings?: PrivacySettings;
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

// Field labels for onboarding data
export const ONBOARDING_FIELD_LABELS: Record<string, string> = {
  account_type: "Account Type",
  selected_fund: "Selected Fund",
  referral_source: "How Did You Hear About Us",
  referral_source_other: "Referral Details",
  citizenship_country: "Citizenship Country",
  residence_country: "Residence Country",
  account_structure: "Account Structure",
  phone_number: "Phone Number",
  phone_country_code: "Phone Country Code",
  legal_first_name: "Legal First Name",
  legal_last_name: "Legal Last Name",
  address_line_1: "Address Line 1",
  address_line_2: "Address Line 2",
  address_country: "Country",
  city: "City",
  state: "State",
  zip_code: "ZIP Code",
  address_phone_number: "Address Phone",
  address_phone_country_code: "Address Phone Country Code",
  date_of_birth: "Date of Birth",
  ssn_encrypted: "SSN",
  initial_investment_amount: "Initial Investment",
  recurring_investment_enabled: "Recurring Investment",
  recurring_frequency: "Recurring Frequency",
  recurring_amount: "Recurring Amount",
  recurring_day_of_month: "Recurring Day"
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
  
  // Ticket Size (millions)
  "micro_<1m": "Micro (< $1 million)",
  "small_1m_10m": "Small ($1 million - $10 million)",
  "medium_10m_50m": "Medium ($10 million - $50 million)",
  "large_>50m": "Large (> $50 million)",
  
  // Annual Capacity (millions)
  "<5m": "< $5 million",
  "5m_20m": "$5 million - $20 million",
  "20m_100m": "$20 million - $100 million",
  ">100m": "> $100 million",
  
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
  hands_on_active_trader: "Hands-on (Active Trader)",
  
  // Account Types
  general: "General Account",
  retirement: "Retirement Account",
  
  // Account Structure
  individual: "Individual",
  
  // Referral Sources
  podcast: "Podcast",
  social_media_influencer: "Social Media Influencer",
  social_media_ad: "Social Media Ad",
  yahoo_finance: "Yahoo Finance",
  ai_tool: "AI Tool",
  website_blog_article: "Website/Blog Article",
  penny_hoarder: "Penny Hoarder",
  family_friend: "Family/Friend",
  tv_radio: "TV/Radio",
  
  // Recurring Frequencies
  weekly: "Weekly",
  biweekly: "Bi-weekly",
  monthly: "Monthly",
  bimonthly: "Bi-monthly"
};

// Privacy Settings Interface
export interface PrivacySettings {
  investor_profile: {
    [K in keyof InvestorProfile]: boolean;
  };
  onboarding_data: {
    account_type: boolean;
    selected_fund: boolean;
    referral_source: boolean;
    referral_source_other: boolean;
    citizenship_country: boolean;
    residence_country: boolean;
    account_structure: boolean;
    phone_number: boolean;
    phone_country_code: boolean;
    legal_first_name: boolean;
    legal_last_name: boolean;
    address_line_1: boolean;
    address_line_2: boolean;
    city: boolean;
    state: boolean;
    zip_code: boolean;
    address_phone_number: boolean;
    address_phone_country_code: boolean;
    address_country: boolean;
    ssn_encrypted: boolean;
    date_of_birth: boolean;
    initial_investment_amount: boolean;
    recurring_investment_enabled: boolean;
    recurring_frequency: boolean;
    recurring_amount: boolean;
    recurring_day_of_month: boolean;
  };
}

// Onboarding Data Field Labels for UI
export const ONBOARDING_FIELD_LABELS: Record<string, string> = {
  // Basic Information
  account_type: "Account Type",
  selected_fund: "Selected Fund",
  referral_source: "How Did You Hear About Us?",
  referral_source_other: "Referral Source (Other)",
  
  // Citizenship & Residence
  citizenship_country: "Citizenship Country",
  residence_country: "Residence Country",
  account_structure: "Account Structure",
  
  // Contact Information
  phone_number: "Phone Number",
  phone_country_code: "Phone Country Code",
  
  // Legal Information
  legal_first_name: "Legal First Name",
  legal_last_name: "Legal Last Name",
  
  // Address
  address_line_1: "Address Line 1",
  address_line_2: "Address Line 2",
  city: "City",
  state: "State",
  zip_code: "ZIP Code",
  address_phone_number: "Address Phone Number",
  address_phone_country_code: "Address Phone Country Code",
  address_country: "Address Country",
  
  // Sensitive Information
  ssn_encrypted: "Social Security Number",
  date_of_birth: "Date of Birth",
  
  // Investment Details
  initial_investment_amount: "Initial Investment Amount",
  recurring_investment_enabled: "Recurring Investment Enabled",
  recurring_frequency: "Recurring Frequency",
  recurring_amount: "Recurring Amount",
  recurring_day_of_month: "Recurring Day of Month"
};
