# A2A Playground Testing Guide

## Overview

The A2A (Agent-to-Agent) Playground is an interactive demo showcasing privacy-preserving KYC verification between a Bank Agent and Hushh KYC Agent.

**Route:** `/a2a-playground`

## Key Privacy Principles Demonstrated

1. ✅ **NO raw SSN sharing** - Only attestation-based verification (yes/no match)
2. ✅ **NO direct DB writes** - Hushh exports normalized JSON, bank ingests it
3. ✅ **Privacy-first pattern** - "We prove/verify, we don't dump raw secrets"

---

## Testing the 3 Screens

### Screen 1: Scenario Setup

**URL:** `/a2a-playground` (initial screen)

**What to test:**
1. ✅ Relying party dropdown works (DemoBank X, DemoBroker Y, Hushh Fund A)
2. ✅ User details form accepts input:
   - Full Name
   - Phone Country Code
   - Phone Number
   - Country
   - Email
   - SSN Last 4 (for VerifyFieldMatch demo)
3. ✅ Operation toggles work:
   - ☑️ Verify KYC Status (CheckKYCStatus)
   - ☑️ Confirm SSN Match (VerifyFieldMatch)
   - ☑️ Export Profile (ExportKYCProfile)
4. ✅ "Run Scenario" button is purple and starts the flow

### Screen 2: Live Conversation

**What to test:**
1. ✅ Agent cards display correctly:
   - Bank Agent (left) - blue styling
   - Hushh Agent (right) - purple styling
   - Animated connection line between them
2. ✅ Messages appear one-by-one with realistic delays (~600-900ms)
3. ✅ Auto-scroll follows latest message
4. ✅ Progress indicators show percentage (20%, 40%, 60%, 100%)
5. ✅ Status panel shows:
   - Current operation
   - Elapsed time
   - Status (Running → Complete)
6. ✅ "View Result" button appears when complete

### Screen 3: Result Summary

**What to test:**
1. ✅ Status banner shows correct decision:
   - PASS (green) / REVIEW (yellow) / NOT_FOUND (blue) / FAIL (red)
2. ✅ Verified Via shows provider name and type
3. ✅ Risk Band shows LOW/MEDIUM/HIGH
4. ✅ Verified Attributes count and badges
5. ✅ Data Export card shows:
   - Exported To (bank name)
   - Schema (standard_v1)
   - Fields Included (with ✓ badges)
   - Fields Excluded (with 🔒 badges)
   - Privacy Guarantee notice
6. ✅ Audit Trail card shows:
   - Check ID (truncated, copyable)
   - Timestamp
   - Relying Party
   - User
   - Operations Performed
7. ✅ Action buttons work:
   - "Run Another Scenario" → returns to Screen 1
   - "View Conversation" → returns to Screen 2
   - "Download Export" → downloads JSON file

---

## JSON-RPC Methods Demonstrated

| Method | Description | Demo |
|--------|-------------|------|
| `CheckKYCStatus` | Query attestation network for existing KYC | ✅ Shows attestation lookup flow |
| `VerifyFieldMatch` | Confirm SSN last-4 match (yes/no) | ✅ Privacy-safe, no raw SSN exposed |
| `ExportKYCProfile` | Return normalized JSON profile | ✅ Shows included/excluded fields |

---

## Local Testing

```bash
# Start dev server
npm run dev

# Open in browser
open http://localhost:5173/a2a-playground
```

---

## Files Created

| File | Purpose |
|------|---------|
| `src/types/a2aPlayground.ts` | TypeScript types |
| `src/components/a2aPlayground/A2AScenarioSetupScreen.tsx` | Screen 1 |
| `src/components/a2aPlayground/A2AConversationScreen.tsx` | Screen 2 |
| `src/components/a2aPlayground/A2AResultSummaryScreen.tsx` | Screen 3 |
| `src/components/a2aPlayground/A2APlaygroundContainer.tsx` | State machine |
| `src/components/a2aPlayground/conversationGenerator.ts` | Conversation logic |
| `src/components/a2aPlayground/index.ts` | Module exports |
| `src/pages/a2a-playground/index.tsx` | Page route |

---

## Privacy Message Examples

The demo explicitly shows privacy-preserving messages:

```
🛡️ Processing VerifyFieldMatch request. Note: Raw SSN is NEVER shared.

🔒 Comparing hashed SSN last-4 from attestation with bank's claim...

✅ MATCH CONFIRMED! SSN last-4 matches attestation record. No raw SSN exposed.

🔐 Applying privacy filters: Excluding raw SSN, including hashed identifiers...

✅ Profile export ready! Included: fullName, phone, email, SSN-last4 (masked). 
   Excluded: full SSN, DOB, address.
```

---

## Expected Conversation Flow

1. **INITIATE** - Bank requests KYC verification
2. **CHECKING** - Hushh searches attestation network (20% → 40% → 60%)
3. **ATTESTATION_FOUND** - Hushh finds existing attestation (100%)
4. **KEY_VERIFY_REQUEST** - Bank requests SSN last-4 verification
5. **KEY_VERIFY_RESULT** - Hushh confirms match without exposing SSN
6. **EXPORT_REQUEST** - Bank requests normalized profile
7. **EXPORT_PROGRESS** - Hushh prepares export (30% → 60%)
8. **EXPORT_COMPLETE** - Export ready with privacy filters applied
9. **BANK_CONFIRM** - Bank confirms successful onboarding

---

## Build Verification

```bash
# Verify build passes
npm run build

# Expected: ✓ built in ~11s
```

Build verified: ✅ Successfully built on 2025-12-09

---

## Responsive Design

- ✅ Desktop: Full 3-column layout on results
- ✅ Tablet: 2-column layout adjusts
- ✅ Mobile: Single column, stacked cards
