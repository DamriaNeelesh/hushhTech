-- Create onboarding_data table for multi-step onboarding flow
CREATE TABLE IF NOT EXISTS public.onboarding_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Step 1: Account Type Selection
  account_type TEXT CHECK (account_type IN ('general', 'retirement')),
  
  -- Step 2: Portfolio intro (no data stored, just navigation)
  
  -- Step 3: Fund Selection
  selected_fund TEXT DEFAULT 'hushh_fund_a',
  
  -- Step 4: Referral Source
  referral_source TEXT CHECK (referral_source IN (
    'podcast', 'social_media_influencer', 'social_media_ad', 
    'yahoo_finance', 'ai_tool', 'website_blog_article', 
    'penny_hoarder', 'family_friend', 'tv_radio', 'other'
  )),
  referral_source_other TEXT,
  
  -- Step 5: Information intro (no data stored, just navigation)
  
  -- Step 6: Residence Confirmation
  citizenship_country TEXT DEFAULT 'united_states',
  residence_country TEXT DEFAULT 'united_states',
  
  -- Step 7: Account Structure Type
  account_structure TEXT CHECK (account_structure IN ('individual', 'other')),
  
  -- Step 8: Phone Number
  phone_number TEXT,
  phone_country_code TEXT DEFAULT '+1',
  
  -- Step 9: Legal Name
  legal_first_name TEXT,
  legal_last_name TEXT,
  
  -- Step 10: Address Details
  address_line_1 TEXT,
  address_line_2 TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  address_phone_number TEXT, -- Phone from address step
  
  -- Step 11: Sensitive Personal Information
  ssn_encrypted TEXT,  -- Store encrypted SSN
  date_of_birth TEXT,  -- Store as MM/DD/YYYY string
  
  -- Step 12: Finish up intro (no data stored, just navigation)
  
  -- Step 13: Initial Investment
  initial_investment_amount DECIMAL(12,2),
  
  -- Step 14: Recurring Investment Setup
  recurring_investment_enabled BOOLEAN DEFAULT false,
  recurring_frequency TEXT CHECK (recurring_frequency IN ('once_a_month', 'twice_a_month', 'weekly', 'every_other_week')),
  recurring_amount DECIMAL(12,2),
  recurring_day TEXT,  -- Stores values like '1st', '2nd', '15th', 'Last', etc.
  
  -- Progress Tracking
  current_step INTEGER DEFAULT 1 CHECK (current_step >= 1 AND current_step <= 14),
  completed_steps INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.onboarding_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can insert their own onboarding data"
  ON public.onboarding_data FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own onboarding data"
  ON public.onboarding_data FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding data"
  ON public.onboarding_data FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own onboarding data"
  ON public.onboarding_data FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_onboarding_data_user_id ON public.onboarding_data(user_id);
CREATE INDEX idx_onboarding_data_current_step ON public.onboarding_data(current_step);
CREATE INDEX idx_onboarding_data_is_completed ON public.onboarding_data(is_completed);
CREATE INDEX idx_onboarding_data_created_at ON public.onboarding_data(created_at);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_onboarding_data_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
CREATE TRIGGER set_timestamp_on_onboarding_data
  BEFORE UPDATE ON public.onboarding_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_onboarding_data_timestamp();

-- Grant permissions
GRANT ALL ON public.onboarding_data TO authenticated;
GRANT ALL ON public.onboarding_data TO service_role;

-- Add comment for documentation
COMMENT ON TABLE public.onboarding_data IS 'Stores multi-step onboarding data for new users. Data is migrated to investor_profiles upon completion.';
