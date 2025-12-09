-- KYC A2A Network Tables
-- Migration: 20251209000000_create_kyc_tables.sql
-- Description: Creates tables for KYC attestations, policies, and check logs

-- ============================================================================
-- KYC ATTESTATIONS TABLE
-- Stores verified KYC records from various providers (banks, hushh, etc.)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.kyc_attestations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Provider Information
  provider_id TEXT NOT NULL,
  provider_name TEXT NOT NULL,
  provider_type TEXT NOT NULL CHECK (provider_type IN ('hushh', 'bank', 'kyc_provider', 'government')),
  
  -- Verification Details
  verified_attributes TEXT[] NOT NULL DEFAULT ARRAY['full_name', 'dob'],
  verification_method TEXT, -- e.g., 'document_scan', 'biometric', 'video_kyc', 'in_person'
  verification_level TEXT DEFAULT 'standard' CHECK (verification_level IN ('basic', 'standard', 'enhanced', 'premium')),
  
  -- Risk Assessment
  risk_band TEXT CHECK (risk_band IN ('LOW', 'MEDIUM', 'HIGH')),
  risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
  risk_factors JSONB DEFAULT '{}', -- Detailed risk breakdown
  
  -- Compliance Checks
  sanctions_checked BOOLEAN DEFAULT false,
  sanctions_clear BOOLEAN,
  pep_checked BOOLEAN DEFAULT false,
  pep_status TEXT, -- 'clear', 'match', 'review'
  aml_score INTEGER,
  
  -- Status & Validity
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'revoked', 'suspended')),
  verified_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  revocation_reason TEXT,
  
  -- Metadata
  attestation_hash TEXT, -- Hash of attestation for verification
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast user lookups
CREATE INDEX idx_kyc_attestations_user_id ON public.kyc_attestations(user_id);
CREATE INDEX idx_kyc_attestations_status ON public.kyc_attestations(status);
CREATE INDEX idx_kyc_attestations_provider ON public.kyc_attestations(provider_id);
CREATE INDEX idx_kyc_attestations_expires_at ON public.kyc_attestations(expires_at);

-- ============================================================================
-- KYC POLICIES TABLE
-- Bank/fintech-specific requirements for accepting KYC attestations
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.kyc_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Bank/Institution Identity
  bank_id TEXT UNIQUE NOT NULL,
  bank_name TEXT NOT NULL,
  bank_country TEXT DEFAULT 'US',
  bank_type TEXT DEFAULT 'bank' CHECK (bank_type IN ('bank', 'fintech', 'neobank', 'broker', 'exchange')),
  
  -- Age & Freshness Requirements
  max_kyc_age_days INTEGER DEFAULT 365, -- How old can KYC be
  require_recent_verification BOOLEAN DEFAULT false,
  recent_verification_days INTEGER DEFAULT 90,
  
  -- Accepted Providers
  accepted_providers TEXT[] DEFAULT ARRAY['hushh'],
  accepted_provider_types TEXT[] DEFAULT ARRAY['hushh', 'bank', 'kyc_provider'],
  min_verification_level TEXT DEFAULT 'standard',
  
  -- Risk Tolerance
  min_risk_band TEXT DEFAULT 'HIGH' CHECK (min_risk_band IN ('LOW', 'MEDIUM', 'HIGH')),
  max_risk_score INTEGER DEFAULT 100,
  
  -- Required Attributes (what fields must be verified)
  required_attributes TEXT[] DEFAULT ARRAY['full_name', 'dob', 'national_id'],
  optional_attributes TEXT[] DEFAULT ARRAY['address', 'phone'],
  
  -- Compliance Requirements
  sanctions_check_required BOOLEAN DEFAULT true,
  pep_check_required BOOLEAN DEFAULT true,
  aml_check_required BOOLEAN DEFAULT false,
  require_biometric BOOLEAN DEFAULT false,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- API Configuration
  webhook_url TEXT,
  api_key_hash TEXT, -- Hashed API key for authentication
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast bank lookups
CREATE INDEX idx_kyc_policies_bank_id ON public.kyc_policies(bank_id);
CREATE INDEX idx_kyc_policies_is_active ON public.kyc_policies(is_active);

-- ============================================================================
-- KYC CHECK LOGS TABLE
-- Audit log of all KYC verification requests and responses
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.kyc_check_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Request Information
  requesting_bank_id TEXT NOT NULL,
  requesting_agent_id TEXT, -- A2A agent identifier
  user_identifier_hash TEXT NOT NULL, -- Hashed user identifier for privacy
  
  -- Consent
  consent_token TEXT, -- User consent token
  consent_granted_at TIMESTAMPTZ,
  consent_scope TEXT[], -- What was consented to
  
  -- Result
  kyc_status TEXT NOT NULL CHECK (kyc_status IN ('PASS', 'REVIEW', 'FAIL', 'NOT_FOUND', 'EXPIRED', 'CONSENT_DENIED')),
  risk_band TEXT,
  risk_score INTEGER,
  
  -- Matched Attestation
  matched_attestation_id UUID REFERENCES public.kyc_attestations(id),
  attestation_age_days INTEGER,
  
  -- Policy Evaluation
  policy_id UUID REFERENCES public.kyc_policies(id),
  policy_requirements_met BOOLEAN,
  missing_requirements TEXT[],
  additional_requirements TEXT[],
  
  -- Performance
  request_at TIMESTAMPTZ DEFAULT NOW(),
  response_at TIMESTAMPTZ,
  latency_ms INTEGER,
  
  -- Debug & Audit
  request_payload JSONB DEFAULT '{}',
  response_payload JSONB DEFAULT '{}',
  error_message TEXT,
  
  -- Metadata
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for analytics and lookups
CREATE INDEX idx_kyc_check_logs_bank ON public.kyc_check_logs(requesting_bank_id);
CREATE INDEX idx_kyc_check_logs_user_hash ON public.kyc_check_logs(user_identifier_hash);
CREATE INDEX idx_kyc_check_logs_status ON public.kyc_check_logs(kyc_status);
CREATE INDEX idx_kyc_check_logs_created_at ON public.kyc_check_logs(created_at);
CREATE INDEX idx_kyc_check_logs_attestation ON public.kyc_check_logs(matched_attestation_id);

-- ============================================================================
-- KYC CONSENT TOKENS TABLE
-- User consent management for KYC sharing
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.kyc_consent_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Token Details
  token TEXT UNIQUE NOT NULL,
  token_type TEXT DEFAULT 'one_time' CHECK (token_type IN ('one_time', 'recurring', 'permanent')),
  
  -- Scope & Permissions
  allowed_banks TEXT[] DEFAULT ARRAY[]::TEXT[], -- Empty = all registered banks
  allowed_attributes TEXT[] NOT NULL, -- What data can be shared
  share_risk_band BOOLEAN DEFAULT true,
  share_verification_level BOOLEAN DEFAULT true,
  
  -- Validity
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  
  -- Tracking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ
);

-- Index for token lookups
CREATE INDEX idx_kyc_consent_tokens_user_id ON public.kyc_consent_tokens(user_id);
CREATE INDEX idx_kyc_consent_tokens_token ON public.kyc_consent_tokens(token);
CREATE INDEX idx_kyc_consent_tokens_active ON public.kyc_consent_tokens(is_active);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.kyc_attestations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_check_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_consent_tokens ENABLE ROW LEVEL SECURITY;

-- KYC Attestations: Users can only see their own attestations
CREATE POLICY "Users can view own attestations" ON public.kyc_attestations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage attestations" ON public.kyc_attestations
  FOR ALL USING (auth.role() = 'service_role');

-- KYC Policies: Anyone can read active policies, only service role can modify
CREATE POLICY "Anyone can read active policies" ON public.kyc_policies
  FOR SELECT USING (is_active = true);

CREATE POLICY "Service role can manage policies" ON public.kyc_policies
  FOR ALL USING (auth.role() = 'service_role');

-- KYC Check Logs: Users can see logs about their own data, service role full access
CREATE POLICY "Service role can manage check logs" ON public.kyc_check_logs
  FOR ALL USING (auth.role() = 'service_role');

-- KYC Consent Tokens: Users can manage their own tokens
CREATE POLICY "Users can view own consent tokens" ON public.kyc_consent_tokens
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create consent tokens" ON public.kyc_consent_tokens
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own consent tokens" ON public.kyc_consent_tokens
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage consent tokens" ON public.kyc_consent_tokens
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- TRIGGER: Auto-update updated_at timestamp
-- ============================================================================
CREATE OR REPLACE FUNCTION update_kyc_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_kyc_attestations_updated_at
  BEFORE UPDATE ON public.kyc_attestations
  FOR EACH ROW EXECUTE FUNCTION update_kyc_updated_at();

CREATE TRIGGER update_kyc_policies_updated_at
  BEFORE UPDATE ON public.kyc_policies
  FOR EACH ROW EXECUTE FUNCTION update_kyc_updated_at();

-- ============================================================================
-- SEED DATA: Sample KYC Policies for Demo Banks
-- ============================================================================
INSERT INTO public.kyc_policies (bank_id, bank_name, bank_country, bank_type, max_kyc_age_days, accepted_providers, min_risk_band, required_attributes, sanctions_check_required)
VALUES 
  ('demo_bank_alpha', 'Alpha Bank', 'US', 'bank', 365, ARRAY['hushh', 'demo_bank_alpha'], 'MEDIUM', ARRAY['full_name', 'dob', 'national_id', 'address'], true),
  ('demo_fintech_beta', 'Beta Fintech', 'US', 'fintech', 180, ARRAY['hushh'], 'LOW', ARRAY['full_name', 'dob', 'phone'], false),
  ('demo_neobank_gamma', 'Gamma Neobank', 'UK', 'neobank', 365, ARRAY['hushh', 'government'], 'HIGH', ARRAY['full_name', 'dob'], true)
ON CONFLICT (bank_id) DO NOTHING;

-- ============================================================================
-- COMMENTS
-- ============================================================================
COMMENT ON TABLE public.kyc_attestations IS 'Stores verified KYC records from various providers';
COMMENT ON TABLE public.kyc_policies IS 'Bank-specific requirements for accepting KYC attestations';
COMMENT ON TABLE public.kyc_check_logs IS 'Audit log of all KYC verification requests';
COMMENT ON TABLE public.kyc_consent_tokens IS 'User consent tokens for KYC data sharing';

COMMENT ON COLUMN public.kyc_attestations.risk_band IS 'Risk classification: LOW (safe), MEDIUM (review), HIGH (risky)';
COMMENT ON COLUMN public.kyc_policies.min_risk_band IS 'Minimum acceptable risk - HIGH means only LOW risk users pass automatically';
COMMENT ON COLUMN public.kyc_check_logs.kyc_status IS 'Result: PASS (verified), REVIEW (manual check), FAIL (rejected), NOT_FOUND (no KYC), EXPIRED (outdated)';
