-- =====================================================
-- KYC Auto-Attestation Trigger
-- When onboarding completes, automatically create a KYC attestation
-- =====================================================

-- Function to create KYC attestation when onboarding completes
CREATE OR REPLACE FUNCTION public.create_kyc_attestation_on_onboarding_complete()
RETURNS TRIGGER AS $$
DECLARE
  attestation_id UUID;
  user_email TEXT;
  verified_attrs JSONB;
  attestation_data JSONB;
  risk_score INTEGER;
BEGIN
  -- Only trigger when is_completed changes from false to true
  IF OLD.is_completed = false AND NEW.is_completed = true THEN
    
    -- Get user email from auth.users
    SELECT email INTO user_email
    FROM auth.users
    WHERE id = NEW.user_id;
    
    -- Build verified attributes based on what was provided in onboarding
    verified_attrs := '[]'::JSONB;
    
    -- Add verified attributes based on data presence
    IF NEW.legal_first_name IS NOT NULL AND NEW.legal_last_name IS NOT NULL THEN
      verified_attrs := verified_attrs || '["full_name"]'::JSONB;
    END IF;
    
    IF NEW.date_of_birth IS NOT NULL THEN
      verified_attrs := verified_attrs || '["dob"]'::JSONB;
    END IF;
    
    IF NEW.ssn_encrypted IS NOT NULL THEN
      verified_attrs := verified_attrs || '["national_id"]'::JSONB;
    END IF;
    
    IF NEW.address_line_1 IS NOT NULL AND NEW.city IS NOT NULL AND NEW.state IS NOT NULL AND NEW.zip_code IS NOT NULL THEN
      verified_attrs := verified_attrs || '["address"]'::JSONB;
    END IF;
    
    IF NEW.phone_number IS NOT NULL THEN
      verified_attrs := verified_attrs || '["phone"]'::JSONB;
    END IF;
    
    IF NEW.citizenship_country IS NOT NULL THEN
      verified_attrs := verified_attrs || '["citizenship"]'::JSONB;
    END IF;
    
    IF NEW.residence_country IS NOT NULL THEN
      verified_attrs := verified_attrs || '["residence"]'::JSONB;
    END IF;
    
    -- Calculate risk score based on completeness (lower is better)
    -- Start at 50, subtract for each verified attribute
    risk_score := 50;
    IF verified_attrs ? 'full_name' THEN risk_score := risk_score - 8; END IF;
    IF verified_attrs ? 'dob' THEN risk_score := risk_score - 8; END IF;
    IF verified_attrs ? 'national_id' THEN risk_score := risk_score - 10; END IF;
    IF verified_attrs ? 'address' THEN risk_score := risk_score - 8; END IF;
    IF verified_attrs ? 'phone' THEN risk_score := risk_score - 6; END IF;
    IF verified_attrs ? 'citizenship' THEN risk_score := risk_score - 5; END IF;
    IF verified_attrs ? 'residence' THEN risk_score := risk_score - 5; END IF;
    
    -- Ensure minimum score of 5
    IF risk_score < 5 THEN risk_score := 5; END IF;
    
    -- Build attestation data (no raw PII, just metadata)
    attestation_data := jsonb_build_object(
      'onboarding_id', NEW.id,
      'account_type', NEW.account_type,
      'account_structure', NEW.account_structure,
      'citizenship_country', NEW.citizenship_country,
      'residence_country', NEW.residence_country,
      'verification_method', 'self_attestation',
      'verification_source', 'hushh_onboarding_v1',
      'data_completeness', jsonb_array_length(verified_attrs)::TEXT || '/7 fields'
    );
    
    -- Insert the KYC attestation
    INSERT INTO public.kyc_attestations (
      user_id,
      user_identifier,
      attestation_type,
      verification_level,
      status,
      verified_attributes,
      risk_band,
      risk_score,
      attestation_data,
      provider_name,
      provider_reference,
      verified_at,
      expires_at
    ) VALUES (
      NEW.user_id,
      COALESCE(user_email, NEW.user_id::TEXT),
      'identity',
      CASE 
        WHEN jsonb_array_length(verified_attrs) >= 6 THEN 'enhanced'
        WHEN jsonb_array_length(verified_attrs) >= 4 THEN 'standard'
        ELSE 'basic'
      END,
      'active',
      verified_attrs,
      CASE 
        WHEN risk_score <= 15 THEN 'LOW'
        WHEN risk_score <= 35 THEN 'MEDIUM'
        ELSE 'HIGH'
      END,
      risk_score,
      attestation_data,
      'Hushh',
      'onboarding_' || NEW.id::TEXT,
      NOW(),
      NOW() + INTERVAL '365 days'
    )
    RETURNING id INTO attestation_id;
    
    -- Log the creation
    RAISE NOTICE 'Created KYC attestation % for user % with % verified attributes, risk score %', 
      attestation_id, NEW.user_id, jsonb_array_length(verified_attrs), risk_score;
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS trg_create_kyc_attestation_on_onboarding ON public.onboarding_data;
CREATE TRIGGER trg_create_kyc_attestation_on_onboarding
  AFTER UPDATE ON public.onboarding_data
  FOR EACH ROW
  EXECUTE FUNCTION public.create_kyc_attestation_on_onboarding_complete();

-- Also handle INSERT with is_completed = true (edge case)
CREATE OR REPLACE FUNCTION public.create_kyc_attestation_on_onboarding_insert()
RETURNS TRIGGER AS $$
DECLARE
  attestation_id UUID;
  user_email TEXT;
  verified_attrs JSONB;
  attestation_data JSONB;
  risk_score INTEGER;
BEGIN
  -- Only trigger if is_completed is true on insert
  IF NEW.is_completed = true THEN
    
    -- Get user email from auth.users
    SELECT email INTO user_email
    FROM auth.users
    WHERE id = NEW.user_id;
    
    -- Build verified attributes based on what was provided
    verified_attrs := '[]'::JSONB;
    
    IF NEW.legal_first_name IS NOT NULL AND NEW.legal_last_name IS NOT NULL THEN
      verified_attrs := verified_attrs || '["full_name"]'::JSONB;
    END IF;
    
    IF NEW.date_of_birth IS NOT NULL THEN
      verified_attrs := verified_attrs || '["dob"]'::JSONB;
    END IF;
    
    IF NEW.ssn_encrypted IS NOT NULL THEN
      verified_attrs := verified_attrs || '["national_id"]'::JSONB;
    END IF;
    
    IF NEW.address_line_1 IS NOT NULL AND NEW.city IS NOT NULL THEN
      verified_attrs := verified_attrs || '["address"]'::JSONB;
    END IF;
    
    IF NEW.phone_number IS NOT NULL THEN
      verified_attrs := verified_attrs || '["phone"]'::JSONB;
    END IF;
    
    IF NEW.citizenship_country IS NOT NULL THEN
      verified_attrs := verified_attrs || '["citizenship"]'::JSONB;
    END IF;
    
    IF NEW.residence_country IS NOT NULL THEN
      verified_attrs := verified_attrs || '["residence"]'::JSONB;
    END IF;
    
    risk_score := 50;
    IF verified_attrs ? 'full_name' THEN risk_score := risk_score - 8; END IF;
    IF verified_attrs ? 'dob' THEN risk_score := risk_score - 8; END IF;
    IF verified_attrs ? 'national_id' THEN risk_score := risk_score - 10; END IF;
    IF verified_attrs ? 'address' THEN risk_score := risk_score - 8; END IF;
    IF verified_attrs ? 'phone' THEN risk_score := risk_score - 6; END IF;
    IF verified_attrs ? 'citizenship' THEN risk_score := risk_score - 5; END IF;
    IF verified_attrs ? 'residence' THEN risk_score := risk_score - 5; END IF;
    IF risk_score < 5 THEN risk_score := 5; END IF;
    
    attestation_data := jsonb_build_object(
      'onboarding_id', NEW.id,
      'account_type', NEW.account_type,
      'verification_source', 'hushh_onboarding_v1'
    );
    
    INSERT INTO public.kyc_attestations (
      user_id,
      user_identifier,
      attestation_type,
      verification_level,
      status,
      verified_attributes,
      risk_band,
      risk_score,
      attestation_data,
      provider_name,
      provider_reference,
      verified_at,
      expires_at
    ) VALUES (
      NEW.user_id,
      COALESCE(user_email, NEW.user_id::TEXT),
      'identity',
      CASE 
        WHEN jsonb_array_length(verified_attrs) >= 6 THEN 'enhanced'
        WHEN jsonb_array_length(verified_attrs) >= 4 THEN 'standard'
        ELSE 'basic'
      END,
      'active',
      verified_attrs,
      CASE 
        WHEN risk_score <= 15 THEN 'LOW'
        WHEN risk_score <= 35 THEN 'MEDIUM'
        ELSE 'HIGH'
      END,
      risk_score,
      attestation_data,
      'Hushh',
      'onboarding_' || NEW.id::TEXT,
      NOW(),
      NOW() + INTERVAL '365 days'
    )
    RETURNING id INTO attestation_id;
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_create_kyc_attestation_on_onboarding_insert ON public.onboarding_data;
CREATE TRIGGER trg_create_kyc_attestation_on_onboarding_insert
  AFTER INSERT ON public.onboarding_data
  FOR EACH ROW
  EXECUTE FUNCTION public.create_kyc_attestation_on_onboarding_insert();

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.create_kyc_attestation_on_onboarding_complete() TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_kyc_attestation_on_onboarding_insert() TO authenticated;

-- Add helpful comment
COMMENT ON FUNCTION public.create_kyc_attestation_on_onboarding_complete() IS 
  'Automatically creates a KYC attestation when user completes onboarding. Maps onboarding data to verified attributes for A2A KYC Network.';

-- =====================================================
-- VERIFICATION QUERY (for testing)
-- Run this after onboarding completes to verify attestation was created:
-- 
-- SELECT ka.*, od.is_completed, od.completed_at
-- FROM kyc_attestations ka
-- JOIN onboarding_data od ON ka.user_id = od.user_id
-- WHERE od.is_completed = true
-- ORDER BY ka.created_at DESC;
-- =====================================================
