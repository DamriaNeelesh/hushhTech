-- Create investor_profiles table
CREATE TABLE IF NOT EXISTS public.investor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Raw input
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 100),
  phone_country_code TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  organisation TEXT,
  
  -- Derived context (from enrichment)
  derived_context JSONB DEFAULT '{}'::jsonb,
  
  -- AI Generated Profile (12 fields with confidence)
  investor_profile JSONB NOT NULL,
  
  -- Metadata
  is_ai_prefilled BOOLEAN DEFAULT true,
  user_confirmed BOOLEAN DEFAULT false,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  CONSTRAINT investor_profiles_email_key UNIQUE (email),
  CONSTRAINT investor_profiles_phone_unique UNIQUE (phone_country_code, phone_number)
);

-- Enable RLS
ALTER TABLE public.investor_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can insert their own profile"
  ON public.investor_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own profile"
  ON public.investor_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.investor_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_investor_profiles_user_id ON public.investor_profiles(user_id);
CREATE INDEX idx_investor_profiles_email ON public.investor_profiles(email);
CREATE INDEX idx_investor_profiles_profile_gin ON public.investor_profiles USING gin(investor_profile);

-- Trigger for updated_at
CREATE TRIGGER set_timestamp_on_investor_profiles
  BEFORE UPDATE ON public.investor_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- Grant permissions
GRANT ALL ON public.investor_profiles TO authenticated;
GRANT ALL ON public.investor_profiles TO service_role;
