-- Add privacy_settings column to investor_profiles table
-- This allows users to control which fields are visible on their public profile

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
    "address_country": true,
    "city": true,
    "state": true,
    "zip_code": true,
    "address_phone_number": true,
    "address_phone_country_code": true,
    "date_of_birth": true,
    "ssn_encrypted": false,
    "initial_investment_amount": true,
    "recurring_investment_enabled": true,
    "recurring_frequency": true,
    "recurring_amount": true,
    "recurring_day_of_month": true
  },
  "basic_info": {
    "name": true,
    "email": true,
    "age": true,
    "organisation": true
  }
}'::JSONB;

-- Add comment for documentation
COMMENT ON COLUMN public.investor_profiles.privacy_settings IS 
'Controls which fields are visible on public profile. Default: all fields visible except SSN.';

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
    "address_country": true,
    "city": true,
    "state": true,
    "zip_code": true,
    "address_phone_number": true,
    "address_phone_country_code": true,
    "date_of_birth": true,
    "ssn_encrypted": false,
    "initial_investment_amount": true,
    "recurring_investment_enabled": true,
    "recurring_frequency": true,
    "recurring_amount": true,
    "recurring_day_of_month": true
  },
  "basic_info": {
    "name": true,
    "email": true,
    "age": true,
    "organisation": true
  }
}'::JSONB
WHERE privacy_settings IS NULL;
