# Supabase Architecture Overview

## ✅ Database Status: ALL KYC TABLES DEPLOYED

Your schema shows these KYC tables are **already in the database**:
- ✅ `kyc_attestations` - Stores verified KYC records
- ✅ `kyc_policies` - Bank requirements for accepting KYC
- ✅ `kyc_check_logs` - Audit log of verification requests
- ✅ `kyc_consent_tokens` - User consent management

**This is good news!** The infrastructure is ready.

---

## Edge Functions Breakdown (12 Total)

### 1. **KYC System** (4 functions)
**Purpose**: Agent-to-Agent KYC verification network

- **kyc-agent-a2a** ✅ (44 min ago)
  - Main KYC verification endpoint
  - Uses JSON-RPC 2.0 protocol
  - Queries `kyc_attestations` table
  - **This is what we just fixed the UI to call!**

- **kyc-orchestrator** (4 hours ago)
  - Coordinates KYC verification workflows
  - Manages consent and policies

- **send-kyc-email** (18 hours ago)
  - Sends KYC verification emails
  - Notifications for KYC status changes

- **Database tables**: `kyc_attestations`, `kyc_policies`, `kyc_check_logs`, `kyc_consent_tokens`, `kyc_results`

---

### 2. **Investor Profile System** (4 functions)
**Purpose**: AI-powered investor profiling and chatbot

- **investor-agent-mcp** (3 days ago)
  - MCP (Model Context Protocol) agent
  - AI assistant for investor profiles
  - Handles public/private chat modes

- **investor-chat** (3 days ago)
  - Chat interface for investor profiles
  - Manages conversations with visitor paywall

- **generate-investor-profile** (4 days ago)
  - AI-generates investor profiles from questionnaire
  - Enriches context using Claude API

- **investor-og-image** (6 days ago)
  - Generates Open Graph images for profile sharing
  - Dynamic social media preview cards

- **Database tables**: `investor_profiles`, `investor_agents`, `investor_inquiries`, `agent_messages`, `agent_tasks`

---

### 3. **Chat Paywall System** (3 functions)
**Purpose**: Monetization for investor profile chats

- **chat-check-access** (3 days ago)
  - Checks if visitor can send messages
  - Enforces 3 free messages limit

- **chat-create-checkout** (3 days ago)
  - Creates Stripe checkout session
  - Handles payment for unlimited messaging

- **chat-verify-payment** (3 days ago)
  - Verifies Stripe payment completion
  - Grants unlimited access after payment

- **Database tables**: `chat_access_tokens`, `public_chat_messages`

---

### 4. **Utility Functions** (2 functions)

- **get-locations** (4 days ago)
  - Returns list of US states/countries for forms
  - Used in onboarding flow

- **send-email-notification** (3 days ago)
  - General email sending service
  - Used across various features

---

## System Architecture Map

```
┌─────────────────────────────────────────────────────┐
│                  HUSHH PLATFORM                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  1. KYC A2A Network                                 │
│     ├─ kyc-agent-a2a          [JSON-RPC 2.0]       │
│     ├─ kyc-orchestrator       [Workflow]           │
│     └─ send-kyc-email         [Notifications]      │
│     → Tables: kyc_attestations, kyc_policies        │
│                                                      │
│  2. Investor Profiles                               │
│     ├─ generate-investor-profile  [AI Generate]    │
│     ├─ investor-agent-mcp         [MCP Agent]      │
│     ├─ investor-chat              [Chat UI]        │
│     └─ investor-og-image          [Social Cards]   │
│     → Tables: investor_profiles, agent_messages     │
│                                                      │
│  3. Chat Monetization                               │
│     ├─ chat-check-access      [Rate Limit]         │
│     ├─ chat-create-checkout   [Stripe Session]     │
│     └─ chat-verify-payment    [Payment Confirm]    │
│     → Tables: chat_access_tokens                    │
│                                                      │
│  4. Onboarding & Members                            │
│     → Tables: onboarding_data, members              │
│                                                      │
│  5. Utilities                                       │
│     ├─ get-locations          [Form Data]          │
│     └─ send-email-notification [Emails]            │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## What The Fix Means

### Before (Broken):
```typescript
// UI code had fake data
if (name.includes('pass')) {
  return { provider: 'ICICI Bank' }; // FAKE!
}
```
- **Never called** `kyc-agent-a2a`
- **Never queried** `kyc_attestations` table
- Always showed fake results

### After (Fixed):
```typescript
// UI now calls real edge function
const response = await fetch(
  'https://auth.hushh.ai/functions/v1/kyc-agent-a2a/a2a/rpc',
  { method: 'POST', body: rpcRequest }
);
```
- ✅ **Calls** `kyc-agent-a2a` edge function
- ✅ **Queries** `kyc_attestations` table
- ✅ **Returns** honest results (NOT_FOUND if no data)

---

## Database Verification

Your schema confirms these KYC tables exist:
```sql
-- ✅ Verified in your schema
kyc_attestations       (stores KYC records)
kyc_policies          (bank requirements)
kyc_check_logs        (audit trail)
kyc_consent_tokens    (user consent)
```

The tables have:
- ✅ Proper foreign keys to `auth.users`
- ✅ Row Level Security enabled
- ✅ Indexes for performance
- ✅ Seed data for demo banks

---

## Summary

### What's Working:
✅ Database has all KYC tables
✅ Edge function `kyc-agent-a2a` is deployed (44 min ago)
✅ Infrastructure is complete
✅ UI now calls real API (just fixed!)

### Current State:
- Database tables are **empty** (no attestations yet)
- KYC checks will return `NOT_FOUND` (honest!)
- No more fake "ICICI Bank" or "HDFC Bank"

### To Get PASS Results:
You need to insert test data in `kyc_attestations` table
(See `KYC_REAL_API_FIX.md` for SQL example)

---

## Why So Many Edge Functions?

Each feature needs its own:
- **KYC A2A**: Privacy-safe verification network
- **Investor Profiles**: AI-powered profiling + chat
- **Chat Paywall**: Monetization via Stripe
- **Utilities**: Email, location data, etc.

This is **normal** for a full-featured platform. Each function is specialized and focused.
