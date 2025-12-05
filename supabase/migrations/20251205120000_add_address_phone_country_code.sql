-- Add country code field for address phone number in Step 10
ALTER TABLE public.onboarding_data 
ADD COLUMN IF NOT EXISTS address_phone_country_code TEXT DEFAULT '+1';

-- Add comment for documentation
COMMENT ON COLUMN public.onboarding_data.address_phone_country_code IS 'Country code for address phone number (Step 10)';
