# KYC A2A Network - End-to-End Test Guide

## Overview

This guide provides comprehensive end-to-end tests for the KYC A2A Network system, covering:
1. Auto-attestation trigger (onboarding → KYC attestation)
2. A2A API endpoints
3. Demo page functionality

---

## Test 1: Auto-Attestation Trigger Test

### Purpose
Verify that completing onboarding automatically creates a KYC attestation.

### Steps

**Step 1: Check existing attestations**
```sql
-- Run in Supabase SQL Editor
SELECT COUNT(*) as count FROM kyc_attestations;
```

**Step 2: Simulate onboarding completion (test user)**
```sql
-- Create a test user record (requires existing auth.users record)
-- Or update existing onboarding record:

UPDATE onboarding_data 
SET 
  is_completed = true,
  completed_at = NOW(),
  legal_first_name = 'Test',
  legal_last_name = 'User',
  date_of_birth = '01/15/1990',
  phone_number = '5551234567',
  address_line_1 = '123 Test Street',
  city = 'San Francisco',
  state = 'CA',
  zip_code = '94102',
  citizenship_country = 'united_states',
  residence_country = 'united_states'
WHERE user_id = 'YOUR_USER_ID' -- Replace with actual user_id
AND is_completed = false;
```

**Step 3: Verify attestation was created**
```sql
SELECT 
  ka.id,
  ka.user_identifier,
  ka.verification_level,
  ka.status,
  ka.verified_attributes,
  ka.risk_band,
  ka.risk_score,
  ka.provider_name,
  ka.created_at
FROM kyc_attestations ka
JOIN onboarding_data od ON ka.user_id = od.user_id
WHERE od.is_completed = true
ORDER BY ka.created_at DESC
LIMIT 5;
```

### Expected Result
- New row in `kyc_attestations` table
- `verified_attributes` contains: `["full_name", "dob", "national_id", "address", "phone", "citizenship", "residence"]`
- `verification_level` = 'enhanced' (if all fields provided)
- `risk_score` = 5-15 (LOW risk band)
- `status` = 'active'
- `provider_name` = 'Hushh'

---

## Test 2: A2A API Endpoints Test

### Test 2.1: Health Check
```bash
curl -X GET "https://ibsisfnjxeowvdtvgzff.supabase.co/functions/v1/kyc-agent-a2a/health"
```

**Expected Response:**
```json
{"status": "healthy", "timestamp": "..."}
```

### Test 2.2: AgentCard Discovery
```bash
curl -X GET "https://ibsisfnjxeowvdtvgzff.supabase.co/functions/v1/kyc-agent-a2a/a2a/agent-card.json"
```

**Expected Response:**
```json
{
  "name": "Hushh KYC Agent",
  "description": "Privacy-preserving KYC verification agent...",
  "protocolVersion": "1.0",
  "capabilities": ["CheckKYCStatus", "GetKYCSummary", "ValidateConsent"],
  "endpoints": {...}
}
```

### Test 2.3: CheckKYCStatus RPC (User NOT Found)
```bash
curl -X POST "https://ibsisfnjxeowvdtvgzff.supabase.co/functions/v1/kyc-agent-a2a/a2a/rpc" \
  -H "Content-Type: application/json" \
  -H "x-bank-id: demo_bank_alpha" \
  -d '{
    "jsonrpc": "2.0",
    "method": "CheckKYCStatus",
    "params": {
      "userIdentifier": "nonexistent@example.com",
      "requestedAttributes": ["full_name", "dob"]
    },
    "id": 1
  }'
```

**Expected Response:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "status": "NOT_FOUND",
    "additionalInfo": "No KYC attestations found for this user"
  }
}
```

### Test 2.4: CheckKYCStatus RPC (User FOUND - if attestation exists)
```bash
curl -X POST "https://ibsisfnjxeowvdtvgzff.supabase.co/functions/v1/kyc-agent-a2a/a2a/rpc" \
  -H "Content-Type: application/json" \
  -H "x-bank-id: demo_bank_alpha" \
  -d '{
    "jsonrpc": "2.0",
    "method": "CheckKYCStatus",
    "params": {
      "userIdentifier": "ACTUAL_USER_EMAIL@example.com",
      "requestedAttributes": ["full_name", "dob", "national_id"]
    },
    "id": 2
  }'
```

**Expected Response (if user has completed onboarding):**
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "status": "PASS",
    "riskBand": "LOW",
    "riskScore": 15,
    "verifiedAttributes": ["full_name", "dob", "national_id", "address", "phone"],
    "verificationLevel": "enhanced",
    "attestationAge": 0,
    "providerName": "Hushh"
  }
}
```

### Test 2.5: GetKYCSummary RPC
```bash
curl -X POST "https://ibsisfnjxeowvdtvgzff.supabase.co/functions/v1/kyc-agent-a2a/a2a/rpc" \
  -H "Content-Type: application/json" \
  -H "x-bank-id: demo_fintech_beta" \
  -d '{
    "jsonrpc": "2.0",
    "method": "GetKYCSummary",
    "params": {
      "userIdentifier": "ACTUAL_USER_EMAIL@example.com"
    },
    "id": 3
  }'
```

### Test 2.6: List Bank Policies
```bash
curl -X GET "https://ibsisfnjxeowvdtvgzff.supabase.co/functions/v1/kyc-agent-a2a/policies"
```

**Expected Response:**
```json
[
  {
    "bank_id": "demo_bank_alpha",
    "bank_name": "Alpha Bank",
    "bank_type": "bank",
    "country": "US",
    ...
  },
  ...
]
```

---

## Test 3: Demo Page UI Test

### Steps

1. **Start dev server:**
   ```bash
   cd /Users/ankitkumarsingh/hushhTech
   npm run dev
   ```

2. **Navigate to demo page:**
   Open browser to: `http://localhost:5173/kyc-demo`

3. **Test Agent Collaboration Strip:**
   - Verify bank name displays (Alpha Bank)
   - Verify status shows "Idle"
   - Verify animated icons for Hushh KYC Agent

4. **Test KYC Check Flow:**
   - Select "Alpha Bank" from dropdown
   - Enter email: `test@example.com`
   - Click "Run KYC Check"
   - Verify:
     - ✅ Status changes to "Connecting..." then "Checking..."
     - ✅ Conversation log shows real API calls
     - ✅ AgentCard payload is visible in log
     - ✅ RPC request/response appears in log
     - ✅ Result card displays with status
     - ✅ Latency shows real timing (should be 100-500ms)

5. **Test Different Banks:**
   - Switch to "Beta Fintech" and run check
   - Switch to "Gamma Neobank" and run check
   - Verify x-bank-id header changes in requests

6. **Test Reset:**
   - Click "Reset" button
   - Verify all state clears

---

## Test 4: Full Integration Test Flow

### Scenario: New User Onboarding → KYC Check

1. **User signs up** (create new auth.users record)

2. **User completes onboarding:**
   - Goes through all 14 steps
   - Provides: name, DOB, SSN, address, phone
   - Completes onboarding (is_completed = true)

3. **Trigger fires automatically:**
   - Creates KYC attestation with verified attributes
   - Calculates risk score based on data completeness

4. **Bank queries user KYC:**
   - Bank agent calls `/a2a/rpc` with user's email
   - Gets back PASS/REVIEW/FAIL status
   - Sees risk band and verified attributes

5. **No raw documents shared:**
   - ✅ Bank only sees status + risk band
   - ✅ No SSN, DOB, or address exposed
   - ✅ Privacy preserved!

---

## Verification Queries

### Check all attestations
```sql
SELECT 
  id,
  user_identifier,
  verification_level,
  status,
  risk_band,
  risk_score,
  jsonb_array_length(verified_attributes) as attr_count,
  created_at
FROM kyc_attestations
ORDER BY created_at DESC;
```

### Check KYC check logs
```sql
SELECT 
  id,
  bank_id,
  user_identifier,
  result_status,
  response_time_ms,
  created_at
FROM kyc_check_logs
ORDER BY created_at DESC
LIMIT 10;
```

### Verify trigger functions exist
```sql
SELECT 
  routine_name,
  routine_type 
FROM information_schema.routines 
WHERE routine_name LIKE '%kyc_attestation%';
```

---

## Troubleshooting

### Trigger not firing?
1. Check trigger exists:
   ```sql
   SELECT * FROM information_schema.triggers 
   WHERE trigger_name LIKE '%kyc_attestation%';
   ```

2. Check function exists:
   ```sql
   SELECT * FROM information_schema.routines 
   WHERE routine_name LIKE '%kyc_attestation%';
   ```

### API returning errors?
1. Check edge function logs in Supabase Dashboard
2. Verify service role key is correct
3. Check CORS headers for browser requests

### Demo not showing results?
1. Check browser console for errors
2. Verify API_BASE URL is correct
3. Check network tab for API responses

---

## Success Criteria

| Test | Expected Result | Status |
|------|-----------------|--------|
| Health endpoint | Returns `{"status": "healthy"}` | ✅ |
| AgentCard discovery | Returns valid agent card JSON | ✅ |
| RPC CheckKYCStatus | Returns valid result | ✅ |
| Auto-attestation trigger | Creates attestation on onboarding complete | ✅ |
| Demo page loads | No errors, UI renders | ✅ |
| Demo calls live API | Real latency in response | ✅ |
| Reset button works | Clears all state | ✅ |

---

## Live Endpoints

| Endpoint | URL |
|----------|-----|
| Health | `https://ibsisfnjxeowvdtvgzff.supabase.co/functions/v1/kyc-agent-a2a/health` |
| AgentCard | `https://ibsisfnjxeowvdtvgzff.supabase.co/functions/v1/kyc-agent-a2a/a2a/agent-card.json` |
| RPC | `https://ibsisfnjxeowvdtvgzff.supabase.co/functions/v1/kyc-agent-a2a/a2a/rpc` |
| Policies | `https://ibsisfnjxeowvdtvgzff.supabase.co/functions/v1/kyc-agent-a2a/policies` |

---

**Last Updated:** December 9, 2024
