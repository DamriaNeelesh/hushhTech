// Onboarding Type Definitions

export type AccountType = 'general' | 'retirement';

export type ReferralSource = 
  | 'podcast'
  | 'social_media_influencer'
  | 'social_media_ad'
  | 'yahoo_finance'
  | 'ai_tool'
  | 'website_blog_article'
  | 'penny_hoarder'
  | 'family_friend'
  | 'tv_radio'
  | 'other';

export type AccountStructure = 'individual' | 'other';

export type RecurringFrequency = 'weekly' | 'biweekly' | 'monthly' | 'bimonthly';

export interface OnboardingData {
  id: string;
  user_id: string;
  
  // Step 1: Account Type
  account_type?: AccountType;
  
  // Step 3: Fund Selection
  selected_fund?: string;
  
  // Step 4: Referral Source
  referral_source?: ReferralSource;
  referral_source_other?: string;
  
  // Step 6: Residence
  citizenship_country?: string;
  residence_country?: string;
  
  // Step 7: Account Structure
  account_structure?: AccountStructure;
  
  // Step 8: Phone Number
  phone_number?: string;
  phone_country_code?: string;
  
  // Step 9: Legal Name
  legal_first_name?: string;
  legal_last_name?: string;
  
  // Step 10: Address
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  address_phone_number?: string;
  
  // Step 11: Sensitive Info
  ssn_encrypted?: string;
  date_of_birth?: string;
  
  // Step 12: Initial Investment
  initial_investment_amount?: number;
  
  // Step 13: Recurring Investment
  recurring_investment_enabled?: boolean;
  recurring_frequency?: RecurringFrequency;
  recurring_amount?: number;
  recurring_day_of_month?: number;
  
  // Progress Tracking
  current_step: number;
  completed_steps: number[];
  is_completed: boolean;
  completed_at?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// Partial types for each step
export interface Step1Data {
  account_type: AccountType;
}

export interface Step3Data {
  selected_fund: string;
}

export interface Step4Data {
  referral_source: ReferralSource;
  referral_source_other?: string;
}

export interface Step6Data {
  citizenship_country: string;
  residence_country: string;
}

export interface Step7Data {
  account_structure: AccountStructure;
}

export interface Step8Data {
  phone_number: string;
  phone_country_code: string;
}

export interface Step9Data {
  legal_first_name: string;
  legal_last_name: string;
}

export interface Step10Data {
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  zip_code: string;
  address_phone_number: string;
}

export interface Step11Data {
  ssn_encrypted: string;
  date_of_birth: string;
}

export interface Step12Data {
  initial_investment_amount: number;
}

export interface Step13Data {
  recurring_investment_enabled: boolean;
  recurring_frequency?: RecurringFrequency;
  recurring_amount?: number;
  recurring_day_of_month?: number;
}

// Onboarding context/state type
export interface OnboardingState {
  data: Partial<OnboardingData>;
  currentStep: number;
  isLoading: boolean;
  error: string | null;
}

// API Response types
export interface OnboardingResponse {
  success: boolean;
  data?: OnboardingData;
  error?: string;
}

export interface OnboardingStepUpdate {
  step: number;
  data: Partial<OnboardingData>;
  markComplete?: boolean;
}
