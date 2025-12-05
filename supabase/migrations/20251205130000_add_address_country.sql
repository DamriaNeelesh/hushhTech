-- Add country field for address in Step 10
ALTER TABLE public.onboarding_data 
ADD COLUMN IF NOT EXISTS address_country TEXT DEFAULT 'United States';

-- Add comment for documentation
COMMENT ON COLUMN public.onboarding_data.address_country IS 'Country for address (Step 10)';
