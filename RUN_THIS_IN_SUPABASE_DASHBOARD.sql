-- Run this SQL in your Supabase Dashboard SQL Editor
-- Go to: https://supabase.com/dashboard/project/ibsisfnjxeowvdtvgzff/sql/new

-- Add address_country field for Step 10
ALTER TABLE public.onboarding_data 
ADD COLUMN IF NOT EXISTS address_country TEXT DEFAULT 'US';

-- Add comment for documentation
COMMENT ON COLUMN public.onboarding_data.address_country IS 'Country ISO code for address (Step 10)';

-- Verify the column was added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'onboarding_data' 
AND column_name = 'address_country';
