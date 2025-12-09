# KYC A2A Network - Deployment Guide

## Overview

The **KYC A2A Network** is a privacy-preserving KYC verification system that allows banks and fintechs to verify user KYC status through the A2A (Agent-to-Agent) protocol. No raw documents are shared - only privacy-preserving attestations with status and risk bands.

## Architecture

```
┌─────────────────────┐         ┌─────────────────────┐
│   Bank KYC Copilot  │ ──A2A── │   Hushh KYC Agent   │
│   (Requesting Agent)│         │   (Verification)    │
└─────────────────────┘         └─────────────────────┘
         │                               │
         │                               │
         ▼                               ▼
┌─────────────────────┐         ┌─────────────────────┐
│   Bank's System     │         │   Supabase DB       │
│   - Policy Config   │         │   - kyc_attestations│
│   - Compliance      │         │   - kyc_policies    │
└─────────────────────┘         │   - kyc_check_logs  │
                                │   - kyc_consent     │
                                └─────────────────────┘
```

## Components Created

### 1. Database Schema
**File:** `supabase/migrations/20251209000000_create_kyc_tables.sql`

Tables:
- `kyc_attestations` - Stores verified KYC records from various providers
- `kyc_policies` - Bank-specific requirements for accepting KYC
- `kyc_check_logs` - Audit log of all verification requests
- `kyc_consent_tokens` - User consent management for KYC sharing

### 2. Edge Function
**Directory:** `supabase/functions/kyc-agent-a2a/`

Files:
- `index.ts` - Main A2A handler with JSON-RPC 2.0 support
- `deno.json` - Deno configuration

Endpoints:
- `GET /health` - Health check
- `GET /a2a/agent-card.json` - AgentCard for A2A discovery
- `POST /a2a/rpc` - JSON-RPC 2.0 endpoint for A2A calls
- `POST /check` - REST API for direct KYC check
- `GET /summary` - REST API for KYC summary
- `GET /policies` - List registered bank policies

RPC Methods:
- `CheckKYCStatus` - Verify user KYC against bank policy
- `GetKYCSummary` - Get aggregated KYC summary
- `ValidateConsent` - Validate user consent token
- `SendMessage` - Conversational A2A queries

### 3. UI Components
**Directory:** `src/components/kyc/`

- `AgentCollabStrip.tsx` - Visual representation of agent collaboration
- `AgentConversationLog.tsx` - Step-by-step A2A protocol log
- `KYCResultCard.tsx` - KYC verification result display

### 4. Demo Page
**File:** `src/pages/kyc-demo/index.tsx`
**Route:** `/kyc-demo`

Interactive demo showing:
- Bank/fintech selection
- User lookup simulation
- Real-time agent conversation visualization
- KYC result cards with all status types

## Deployment Steps

### Step 1: Apply Database Migration

```bash
# Option 1: Using Supabase CLI
supabase db push

# Option 2: Run SQL in Supabase Dashboard
# Copy contents of supabase/migrations/20251209000000_create_kyc_tables.sql
# Paste into SQL Editor and run
```

### Step 2: Deploy Edge Function

```bash
# Deploy the kyc-agent-a2a function
supabase functions deploy kyc-agent-a2a

# Verify deployment
curl https://[PROJECT_REF].supabase.co/functions/v1/kyc-agent-a2a/health
```

### Step 3: Verify Frontend

```bash
# Run development server
npm run dev

# Navigate to demo page
open http://localhost:5173/kyc-demo
```

## API Usage

### AgentCard Discovery

```bash
curl https://[PROJECT_REF].supabase.co/functions/v1/kyc-agent-a2a/a2a/agent-card.json
```

### CheckKYCStatus via JSON-RPC

```bash
curl -X POST https://[PROJECT_REF].supabase.co/functions/v1/kyc-agent-a2a/a2a/rpc \
  -H "Content-Type: application/json" \
  -H "x-bank-id: demo_bank_alpha" \
  -d '{
    "jsonrpc": "2.0",
    "method": "CheckKYCStatus",
    "params": {
      "userIdentifier": "user@example.com",
      "consentToken": "consent-token-123"
    },
    "id": 1
  }'
```

### REST API Check

```bash
curl -X POST https://[PROJECT_REF].supabase.co/functions/v1/kyc-agent-a2a/check \
  -H "Content-Type: application/json" \
  -H "x-bank-id: demo_bank_alpha" \
  -d '{
    "userIdentifier": "user@example.com"
  }'
```

## Response Statuses

| Status | Description |
|--------|-------------|
| `PASS` | User meets all verification requirements |
| `REVIEW` | Some requirements need manual verification |
| `FAIL` | User does not meet requirements |
| `NOT_FOUND` | No KYC records exist for user |
| `EXPIRED` | KYC is too old per bank policy |
| `CONSENT_DENIED` | User consent token invalid/missing |

## Risk Bands

| Band | Score Range | Description |
|------|-------------|-------------|
| `LOW` | 0-30 | Safe, auto-approve |
| `MEDIUM` | 31-60 | Review recommended |
| `HIGH` | 61-100 | High risk, require manual review |

## Demo Banks (Pre-seeded)

| Bank ID | Name | Type | Max Age | Required Attributes |
|---------|------|------|---------|---------------------|
| `demo_bank_alpha` | Alpha Bank | bank | 365 days | full_name, dob, national_id, address |
| `demo_fintech_beta` | Beta Fintech | fintech | 180 days | full_name, dob, phone |
| `demo_neobank_gamma` | Gamma Neobank | neobank | 365 days | full_name, dob |

## Testing the Demo

1. Navigate to `/kyc-demo`
2. Select a bank from the dropdown
3. Enter a test email:
   - `verified@example.com` → PASS
   - `review@example.com` → REVIEW
   - `failed@example.com` → FAIL
   - Any other email → Random result
4. Click "Run KYC Check"
5. Watch the agent conversation log and result card

## Security Features

- Row Level Security (RLS) on all tables
- Bank authentication via `x-bank-id` header
- User consent token validation
- Audit logging of all requests
- No raw PII shared - only attestations

## Files Summary

```
supabase/
├── migrations/
│   └── 20251209000000_create_kyc_tables.sql
└── functions/
    └── kyc-agent-a2a/
        ├── index.ts
        └── deno.json

src/
├── components/
│   └── kyc/
│       ├── AgentCollabStrip.tsx
│       ├── AgentConversationLog.tsx
│       └── KYCResultCard.tsx
└── pages/
    └── kyc-demo/
        └── index.tsx
```

## Next Steps

1. **Production Banks**: Register real bank policies in `kyc_policies` table
2. **User KYC**: Create attestations when users complete KYC verification
3. **Consent Flow**: Implement user-facing consent token generation
4. **Webhooks**: Add webhook notifications for bank integrations
5. **Analytics**: Build dashboard for KYC check analytics

## Contact

For questions or issues, contact the Hushh development team.
