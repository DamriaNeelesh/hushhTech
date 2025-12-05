-- Add phone number validation constraints
-- E.164 international standard: max 15 digits

-- Add CHECK constraints for phone_number fields in onboarding_data
ALTER TABLE public.onboarding_data
ADD CONSTRAINT phone_number_length_check 
CHECK (phone_number IS NULL OR (LENGTH(REGEXP_REPLACE(phone_number, '\D', '', 'g')) BETWEEN 1 AND 15));

ALTER TABLE public.onboarding_data
ADD CONSTRAINT address_phone_number_length_check 
CHECK (address_phone_number IS NULL OR (LENGTH(REGEXP_REPLACE(address_phone_number, '\D', '', 'g')) BETWEEN 1 AND 15));

-- Add CHECK constraints for phone_number field in investor_profiles
ALTER TABLE public.investor_profiles
ADD CONSTRAINT phone_number_length_check 
CHECK (phone_number IS NOT NULL AND (LENGTH(REGEXP_REPLACE(phone_number, '\D', '', 'g')) BETWEEN 1 AND 15));

-- Add CHECK constraints for phone_number field in members
ALTER TABLE public.members
ADD CONSTRAINT phone_number_length_check 
CHECK (phone_number IS NOT NULL AND (LENGTH(REGEXP_REPLACE(phone_number, '\D', '', 'g')) BETWEEN 1 AND 15));

-- Add comments to document the validation
COMMENT ON CONSTRAINT phone_number_length_check ON public.onboarding_data IS 
'Validates phone number length: 1-15 digits (E.164 standard)';

COMMENT ON CONSTRAINT address_phone_number_length_check ON public.onboarding_data IS 
'Validates address phone number length: 1-15 digits (E.164 standard)';

COMMENT ON CONSTRAINT phone_number_length_check ON public.investor_profiles IS 
'Validates phone number length: 1-15 digits (E.164 standard)';

COMMENT ON CONSTRAINT phone_number_length_check ON public.members IS 
'Validates phone number length: 1-15 digits (E.164 standard)';
