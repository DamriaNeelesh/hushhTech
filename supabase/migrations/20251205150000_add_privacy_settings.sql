-- Add privacy_settings column to investor_profiles for granular field-level visibility control
-- All fields are public by default, except SSN which is private by default

ALTER TABLE public.investor_profiles 
ADD COLUMN IF NOT EXISTS privacy_settings JSONB DEFAULT '{
  "investor_profile": {
    "primary_goal": true,
    "investment_horizon_years": true,
    "risk_tolerance": true,
    "liquidity_need": true,
    "experience_level": true,
    "typical_ticket_size": true,
    "annual_investing_capacity": true,
    "asset_class_preference": true,
    "sector_preferences": true,
    "volatility_reaction": true,
    "sustainability_preference": true,
    "engagement_style": true
  },
  "onboarding_data": {
    "account_type": true,
    "selected_fund": true,
    "referral_source": true,
    "referral_source_other": true,
    "citizenship_country": true,
    "residence_country": true,
    "account_structure": true,
    "phone_number": true,
    "phone_country_code": true,
    "legal_first_name": true,
    "legal_last_name": true,
    "address_line_1": true,
    "address_line_2": true,
    "city": true,
    "state": true,
    "zip_code": true,
    "address_phone_number": true,
    "address_phone_country_code": true,
    "address_country": true,
    "ssn_encrypted": false,
    "date_of_birth": true,
    "initial_investment_amount": true,
    "recurring_investment_enabled": true,
    "recurring_frequency": true,
    "recurring_amount": true,
    "recurring_day_of_month": true
  }
}'::jsonb;

-- Add index for faster queries on privacy settings
CREATE INDEX IF NOT EXISTS idx_investor_profiles_privacy_settings 
ON public.investor_profiles USING gin (privacy_settings);

-- Add comment for documentation
COMMENT ON COLUMN public.investor_profiles.privacy_settings IS 
'Granular field-level privacy controls. Each field can be toggled ON (public) or OFF (private). All fields are public by default except ssn_encrypted which is private by default.';

-- Update existing rows to have the default privacy settings
UPDATE public.investor_profiles 
SET privacy_settings = '{
  "investor_profile": {
    "primary_goal": true,
    "investment_horizon_years": true,
    "risk_tolerance": true,
    "liquidity_need": true,
    "experience_level": true,
    "typical_ticket_size": true,
    "annual_investing_capacity": true,
    "asset_class_preference": true,
    "sector_preferences": true,
    "volatility_reaction": true,
    "sustainability_preference": true,
    "engagement_style": true
  },
  "onboarding_data": {
    "account_type": true,
    "selected_fund": true,
    "referral_source": true,
    "referral_source_other": true,
    "citizenship_country": true,
    "residence_country": true,
    "account_structure": true,
    "phone_number": true,
    "phone_country_code": true,
    "legal_first_name": true,
    "legal_last_name": true,
    "address_line_1": true,
    "address_line_2": true,
    "city": true,
    "state": true,
    "zip_code": true,
    "address_phone_number": true,
    "address_phone_country_code": true,
    "address_country": true,
    "ssn_encrypted": false,
    "date_of_birth": true,
    "initial_investment_amount": true,
    "recurring_investment_enabled": true,
    "recurring_frequency": true,
    "recurring_amount": true,
    "recurring_day_of_month": true
  }
}'::jsonb
WHERE privacy_settings IS NULL;
