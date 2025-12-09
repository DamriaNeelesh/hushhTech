# KYC Flow UX Testing Guide

## Overview

This guide documents how to test the 5-screen KYC UX flow implementation.

## Components Created

### Screen Components (`src/components/kyc/screens/`)

| File | Description |
|------|-------------|
| `KycIntroScreen.tsx` | Screen 1 - Entry screen with trust messaging |
| `KycDetailsConsentScreen.tsx` | Screen 2 - Form + consent checkbox |
| `KycAgentsCollabScreen.tsx` | Screen 3 - Real-time A2A visualization (hero moment) |
| `KycResultPassScreen.tsx` | Screen 4A - Green success for PASS status |
| `KycResultReviewScreen.tsx` | Screen 4B - Yellow warning for REVIEW status |
| `KycResultFullKycScreen.tsx` | Screen 4C - Gray info for NOT_FOUND status |
| `KycAgentDetailModal.tsx` | Screen 5 - Optional detail modal with conversation log |
| `KycFlowContainer.tsx` | State machine managing flow + screen routing |

### Supporting Files

| File | Description |
|------|-------------|
| `src/types/kyc.ts` | TypeScript types for KYC flow |
| `src/pages/kyc-flow/index.tsx` | Page route for `/kyc-flow` |
| `src/components/kyc/index.ts` | Exports all KYC components |

---

## How to Test

### 1. Start Development Server

```bash
npm run dev
```

### 2. Access the KYC Flow

Navigate to: `http://localhost:5173/kyc-flow`

Or with parameters:
- `http://localhost:5173/kyc-flow?bankId=hdfc-bank&bankName=HDFC%20Bank`
- `http://localhost:5173/kyc-flow?demo=true`

---

## Testing All 3 Outcome Paths

The demo mode uses name patterns to determine the outcome:

### ✅ Test PASS Outcome (Green Success)

**How:** Enter a name containing "pass" or "john"

**Steps:**
1. Click "Continue" on intro screen
2. Fill form with name: `John Smith` or `Pass Test User`
3. Check consent checkbox
4. Click "Submit"
5. Watch agent collaboration animation
6. See GREEN success screen

**Expected Result:**
- ✓ Verified via ICICI Bank
- ✓ Last KYC check: 30 days ago
- ✓ Risk assessment: LOW

---

### ⚠️ Test REVIEW Outcome (Yellow Warning)

**How:** Enter a name containing "review" or "jane"

**Steps:**
1. Click "Continue" on intro screen
2. Fill form with name: `Jane Review` or `Review Pending User`
3. Check consent checkbox
4. Click "Submit"
5. Watch agent collaboration animation
6. See YELLOW warning screen

**Expected Result:**
- ✓ Existing KYC reused: Yes (partial)
- ✓ Verified via HDFC Bank
- ⚠️ We still need: Recent address proof

---

### ℹ️ Test NOT_FOUND Outcome (Gray Info)

**How:** Enter any other name (e.g., "Test User", "Demo Person")

**Steps:**
1. Click "Continue" on intro screen
2. Fill form with name: `New User` or `Demo Person`
3. Check consent checkbox
4. Click "Submit"
5. Watch agent collaboration animation
6. See GRAY info screen

**Expected Result:**
- ✗ Existing KYC reused: No
- ℹ️ Reason: No recent verified KYC found
- 🔮 Future benefit note

---

## Testing the Detail Modal

On PASS and REVIEW screens:
1. Click "View how our agents collaborated"
2. Modal opens showing step-by-step conversation log
3. Click close (X) or outside modal to dismiss

---

## Flow Diagram

```
┌─────────────┐
│    INTRO    │
└──────┬──────┘
       │ Continue
       ▼
┌─────────────────────┐
│  DETAILS + CONSENT  │
└──────────┬──────────┘
           │ Submit (API call)
           ▼
┌─────────────────────┐
│  AGENTS COLLAB      │ ← Animation + skeleton loading
│  (Loading...)       │
└──────────┬──────────┘
           │ Response received
           ▼
    ┌──────┼──────┐
    │      │      │
    ▼      ▼      ▼
┌──────┐ ┌──────┐ ┌──────┐
│ PASS │ │REVIEW│ │ FULL │
│ ✅   │ │  ⚠️  │ │  ℹ️  │
└──────┘ └──────┘ └──────┘
```

---

## Environment Variables

Located in `.env.local`:

```bash
# Enable demo mode (uses mock responses)
VITE_KYC_DEMO_MODE=true

# API endpoint for production
VITE_KYC_API_BASE=https://your-supabase-url.supabase.co/functions/v1/kyc-agent-a2a

# Environment mode
VITE_KYC_ENV=development
```

---

## Mobile Responsiveness Checklist

- [ ] Intro screen displays correctly on mobile
- [ ] Form inputs are touch-friendly (44px min tap targets)
- [ ] Consent checkbox is easily tappable
- [ ] Agent collaboration animation scales appropriately
- [ ] Result screens are readable on small screens
- [ ] Modal scrolls properly on mobile
- [ ] Buttons are full-width on mobile

---

## Browser Testing

Test in:
- [ ] Chrome (desktop + mobile emulator)
- [ ] Safari (desktop + iOS)
- [ ] Firefox
- [ ] Edge

---

## Accessibility Testing

- [ ] Tab navigation works through all form fields
- [ ] Screen reader announces form labels
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible
- [ ] Modal traps focus appropriately

---

## Files Summary

```
src/
├── components/kyc/
│   ├── index.ts                    # Exports all KYC components
│   └── screens/
│       ├── KycIntroScreen.tsx
│       ├── KycDetailsConsentScreen.tsx
│       ├── KycAgentsCollabScreen.tsx
│       ├── KycResultPassScreen.tsx
│       ├── KycResultReviewScreen.tsx
│       ├── KycResultFullKycScreen.tsx
│       ├── KycAgentDetailModal.tsx
│       └── KycFlowContainer.tsx
├── pages/kyc-flow/
│   └── index.tsx                   # Page route
└── types/
    └── kyc.ts                      # TypeScript types

App.tsx                             # Route registered here
```

---

## Next Steps

1. **Run dev server:** `npm run dev`
2. **Open:** `http://localhost:5173/kyc-flow`
3. **Test all 3 paths** using the name patterns above
4. **Verify mobile responsiveness** in browser DevTools
5. **Report any issues** using `/reportbug`
