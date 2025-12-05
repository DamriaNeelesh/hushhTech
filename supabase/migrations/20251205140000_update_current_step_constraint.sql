-- Update the current_step constraint to allow up to step 14
ALTER TABLE public.onboarding_data 
DROP CONSTRAINT IF EXISTS onboarding_data_current_step_check;

ALTER TABLE public.onboarding_data 
ADD CONSTRAINT onboarding_data_current_step_check 
CHECK (current_step >= 1 AND current_step <= 14);
