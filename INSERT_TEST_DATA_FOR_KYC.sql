-- ============================================================================
-- KYC TEST DATA - Run this in Supabase SQL Editor
-- ============================================================================
-- This creates test data so you can see a PASS result with real provider
-- from the database instead of NOT_FOUND
-- ============================================================================

-- Step 1: Create test user in auth.users
-- ============================================================================
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  aud,
  role,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change
)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'verified@example.com',
  crypt('TestPassword123!', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  'authenticated',
  'authenticated',
  '',
  '',
  '',
  ''
)
ON CONFLICT (email) DO UPDATE SET
  email_confirmed_at = NOW(),
  updated_at = NOW();

-- Step 2: Create investor profile (required for lookup)
-- ============================================================================
INSERT INTO public.investor_profiles (
  user_id,
  name,
  email,
  age,
  phone_country_code,
  phone_number,
  organisation,
  investor_profile,
  is_public,
  slug
)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Verified User',
  'verified@example.com',
  30,
  '+1',
  '5551234567',
  'Test Company',
  '{
    "risk_tolerance": "moderate",
    "investment_horizon_years": 10,
    "primary_goal": "wealth_growth",
    "experience_level": "intermediate"
  }'::jsonb,
  true,
  'verified-user-test'
)
ON CONFLICT (email) DO UPDATE SET
  name = 'Verified User',
  updated_at = NOW();

-- Step 3: Insert KYC Attestation (This is the key!)
-- ============================================================================
INSERT INTO public.kyc_attestations (
  user_id,
  provider_id,
  provider_name,
  provider_type,
  verified_attributes,
  verification_method,
  verification_level,
  risk_band,
  risk_score,
  risk_factors,
  sanctions_checked,
  sanctions_clear,
  pep_checked,
  pep_status,
  status,
  verified_at,
  expires_at,
  metadata
)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'demo_bank_alpha',
  'Alpha Bank',
  'bank',
  ARRAY['full_name', 'dob', 'national_id', 'address', 'phone'],
  'video_kyc',
  'standard',
  'LOW',
  15,
  '{
    "identity_verification": "passed",
    "address_verification": "passed",
    "document_quality": "high"
  }'::jsonb,
  true,
  true,
  true,
  'clear',
  'active',
  NOW() - INTERVAL '30 days',
  NOW() + INTERVAL '335 days',
  '{
    "verified_documents": ["passport", "utility_bill"],
    "verification_agent": "KYC-Agent-001",
    "biometric_match": true
  }'::jsonb
)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check if data was inserted successfully
SELECT 
  'User Created' as check_type,
  email,
  id
FROM auth.users 
WHERE email = 'verified@example.com';

SELECT 
  'Profile Created' as check_type,
  name,
  email,
  user_id
FROM investor_profiles 
WHERE email = 'verified@example.com';

SELECT 
  'Attestation Created' as check_type,
  provider_name,
  risk_band,
  risk_score,
  status,
  verified_at,
  verified_attributes
FROM kyc_attestations 
WHERE user_id = '00000000-0000-0000-0000-000000000001';

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Test data inserted successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '🧪 Now test the KYC flow:';
  RAISE NOTICE '1. Go to: http://localhost:5173/kyc-flow';
  RAISE NOTICE '2. Fill form with:';
  RAISE NOTICE '   - Email: verified@example.com';
  RAISE NOTICE '   - Full Name: Verified User';
  RAISE NOTICE '   - Any other details';
  RAISE NOTICE '3. Click "Verify with Hushh"';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Expected Result: KYC Verified! Provider: Alpha Bank, Risk: LOW';
  RAISE NOTICE '';
END $$;
