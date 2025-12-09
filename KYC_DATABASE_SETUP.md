# KYC Database Setup - REQUIRED FOR A2A PLAYGROUND

## ⚠️ Current Issue
The A2A Playground was showing fake "KYC Verified" results because:
1. The frontend was using 100% hardcoded mock data
2. No KYC tables existed in Supabase

## ✅ What Has Been Fixed
1. **Updated `conversationGenerator.ts`** - Now calls the REAL Supabase API
2. **Results show actual database state** - Shows `NOT_FOUND` if no attestation exists
3. **Pushed to GitHub** - branch: `feature/a2a-kyc-playground`

## 🔧 REQUIRED: Deploy KYC Tables to Supabase

**You must run this SQL in Supabase Dashboard to enable proper KYC verification:**

### Step 1: Go to Supabase SQL Editor
https://supabase.com/dashboard/project/ibsisfnjxeowvdtvgzff/sql/new

### Step 2: Copy and run the SQL from:
`supabase/migrations/20251209000000_create_kyc_tables.sql`

This creates:
- `kyc_attestations` - Stores verified KYC records
- `kyc_policies` - Bank-specific requirements
- `kyc_check_logs` - Audit log of verification requests
- `kyc_consent_tokens` - User consent management

### Step 3: Verify Tables Created
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'kyc_%';
```

Expected output:
- kyc_attestations
- kyc_policies
- kyc_check_logs
- kyc_consent_tokens

## 📊 How It Works Now

### With NO attestation in database:
```
User: "Ankit Sharma"
Result: NOT_FOUND
Message: "No existing KYC attestation found. Full KYC required."
```

### With attestation in database:
```
User: "verified_user@example.com" (if exists in kyc_attestations)
Result: PASS
Message: "Attestation FOUND! Verified by [Provider]"
```

## 🧪 Testing After Database Setup

1. Run the A2A Playground with any user → Should show `NOT_FOUND`
2. Insert a test attestation:

```sql
-- First, get a user_id from auth.users
INSERT INTO public.kyc_attestations (
  user_id,
  provider_id, provider_name, provider_type,
  verified_attributes, verification_level,
  risk_band, risk_score,
  sanctions_checked, sanctions_clear,
  status, verified_at
) VALUES (
  'YOUR_USER_ID_HERE', -- Get from auth.users table
  'hushh', 'Hushh Internal', 'hushh',
  ARRAY['full_name', 'dob', 'phone', 'email', 'national_id'],
  'enhanced',
  'LOW', 15,
  true, true,
  'active', NOW()
);
```

3. Run the A2A Playground with that user → Should show `PASS`

## 📁 Files Changed
- `src/components/a2aPlayground/conversationGenerator.ts` - Now calls real API
- `supabase/migrations/20251209000000_create_kyc_tables.sql` - Database schema

## 🔗 PR Link
https://github.com/DamriaNeelesh/hushhTech/pull/new/feature/a2a-kyc-playground
