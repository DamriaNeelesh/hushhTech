# 🛡️ Hushh KYC Agent — Reusable KYC with Policy Control

> **For: Head of Digital / Head of Retail Banking / Compliance Officers**

---

## 🎯 The Problem

Every time a user opens an account at your bank, you run **full KYC** — even if they've already been verified by another trusted institution.

This means:
- **$15–50+** per customer for video KYC / manual checks
- **40–60% drop-off** during document upload flows
- **Days of waiting** for verification results
- Users get frustrated, abandon, go to competitors

---

## 💡 The Solution: Hushh KYC Agent

**One API call. Instant KYC reuse. User-consented. Policy-compliant.**

```
Your Bank → "Is this user already KYC'd and safe for me?"
     ↓
Hushh KYC Agent → Checks its privacy-preserving KYC graph
     ↓
Returns: PASS / REVIEW / NOT_FOUND (with risk band + details)
```

### Key Benefits:
| Metric | Before Hushh | After Hushh |
|--------|--------------|-------------|
| KYC Cost | $15–50/user | **$0.40/user** (reuse) |
| Drop-off Rate | 40–60% | **<15%** |
| Time to Account | 2–5 days | **Instant** (for PASS) |
| Compliance Risk | Manual checks | **Automated policy engine** |

---

## ⚙️ How It Works — Decision Logic

### Step 1: User Consent Check
```
Bank sends: consent_token + user identifiers
     ↓
If consent invalid/expired → Return CONSENT_INVALID
     ↓
If valid → Proceed to KYC check
```
**Why it matters:** User control = Hushh's core value. No consent = no data sharing.

---

### Step 2: Attestation Lookup
```
Map user identifiers → user_id
     ↓
Query kyc_attestations WHERE:
  - status = 'active'
  - expires_at > NOW()
     ↓
If no rows → Return NOT_FOUND (Path C: Full KYC)
If rows found → Pass to Policy Engine
```

---

### Step 3: Policy Engine (Your Rules, Our Enforcement)

For each attestation, we check YOUR bank's policy:

| Check | What We Verify |
|-------|----------------|
| `age_ok` | KYC not older than your max allowed (e.g., 365 days) |
| `provider_ok` | Provider type in your allowed list (bank, fintech, etc.) |
| `risk_ok` | Risk band ≤ your threshold (LOW, MEDIUM) |
| `level_ok` | Verification level ≥ your minimum (standard, enhanced) |
| `attrs_ok` | Required attributes verified (name, DOB, ID, address, etc.) |

---

### Step 4: Decision Mapping

```
┌─────────────────────────────────────────────────────────────┐
│                     HUSHH KYC AGENT                         │
│                                                             │
│   [Bank Request] ──► [Consent] ──► [Attestation] ──► [Policy Engine]
│                                                             │
│                              ▼                              │
│         ┌────────────┬─────────────┬─────────────┐         │
│         │    PASS    │   REVIEW    │  NOT_FOUND  │         │
│         │  Full Reuse│ Partial Reuse│  Full KYC  │         │
│         └────────────┴─────────────┴─────────────┘         │
│                              │                              │
│         ┌────────────┬─────────────┬─────────────┐         │
│   Fee:  │   $0.40    │    $0.15    │   $0.02     │         │
│         │  (max save)│  (some save)│  (lookup)   │         │
│         └────────────┴─────────────┴─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Three Outcome Paths

### ✅ PASS — Full Reuse (Screen 4A)

**Condition:** At least 1 attestation passes ALL policy checks

**API Response:**
```json
{
  "kyc_status": "PASS",
  "risk_band": "LOW",
  "risk_score": 15,
  "verified_attributes": ["full_name", "dob", "national_id", "address", "phone"],
  "verification_level": "enhanced",
  "attestation_age_days": 45,
  "provider_name": "Previous Bank",
  "additional_requirements": []
}
```

**User Experience:**
> ✅ "Your identity is verified"
> 
> "We reused an existing KYC from a trusted institution. No documents needed."

**Business Impact:**
- Bank saves **$15–50** per customer
- User onboards in **seconds, not days**
- Hushh earns **$0.40** per successful reuse

---

### 🟡 REVIEW — Partial Reuse (Screen 4B)

**Condition:** Attestation exists but missing 1–2 lightweight requirements

**API Response:**
```json
{
  "kyc_status": "REVIEW",
  "existing_reuse": true,
  "risk_band": "MEDIUM",
  "verified_attributes": ["full_name", "dob"],
  "missing_requirements": ["address_proof_recent"],
  "message": "KYC partially reused. One additional document needed."
}
```

**User Experience:**
> 🟡 "Almost done — we need one more thing"
> 
> - Existing KYC reused: ✅ Yes
> - We still need: Recent address proof (<3 months)
> 
> [Upload Document] →

**Business Impact:**
- Bank still saves effort (base KYC not repeated)
- User feels progress, not restart
- Hushh earns **$0.15** per partial reuse

---

### 🔴 NOT_FOUND — Full KYC Required (Screen 4C)

**Condition:** No usable attestation found OR all fail critical policy checks

**API Response:**
```json
{
  "kyc_status": "NOT_FOUND",
  "reason_code": "NO_ATTESTATION",
  "message": "No reusable KYC record found. Full verification required."
}
```

**User Experience:**
> 🔴 "We need to complete full KYC this time"
> 
> "We couldn't find a reusable KYC record that meets your bank's policy."
> 
> [Start Full KYC] →

**Business Impact:**
- Bank runs normal KYC flow
- Hushh charges minimal **$0.02** (lookup fee)
- Future: Bank can push completed KYC back to Hushh network

---

## 💰 Pricing Summary

| Decision | What Happens | Your Fee | Bank Savings |
|----------|-------------|----------|--------------|
| **PASS** | Full KYC reuse | $0.40 | $15–50+ |
| **REVIEW** | Partial reuse, 1 doc needed | $0.15 | $10–30 |
| **NOT_FOUND** | No reuse, full KYC | $0.02 | $0 |

### Volume Discounts Available
- 10K+ checks/month: 15% off
- 50K+ checks/month: 25% off
- 100K+ checks/month: Custom enterprise pricing

---

## 🔐 Security & Compliance

- **User Consent Required:** Every check requires valid consent token
- **Privacy-Preserving:** No raw documents shared — only attestation status + risk band
- **Audit Trail:** Every check logged in `kyc_check_logs` for compliance
- **Bank Policy Control:** You define rules, we enforce them
- **A2A Protocol:** Industry-standard Agent-to-Agent communication (Google/Linux Foundation spec)

---

## 🔌 Integration — It's One API Call

### REST Endpoint
```bash
POST https://api.hushh.ai/kyc-agent/check
Content-Type: application/json
x-bank-id: your_bank_id
x-api-key: your_api_key

{
  "consent_token": "user-consent-token",
  "user_identifier": "user@email.com",
  "requested_attributes": ["full_name", "dob", "national_id", "address"]
}
```

### JSON-RPC 2.0 (A2A Protocol)
```bash
POST https://api.hushh.ai/kyc-agent/a2a/rpc
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "method": "CheckKYCStatus",
  "params": {
    "consent_token": "...",
    "user_identifier": "...",
    "requested_attributes": [...]
  },
  "id": 1
}
```

### SDK Support
- JavaScript/TypeScript (npm package coming soon)
- Python (pip package coming soon)
- REST/GraphQL for any language

---

## 📊 Dashboard & Analytics

Every bank gets access to:
- Real-time KYC check volume
- PASS / REVIEW / NOT_FOUND breakdown
- Cost savings calculator
- Policy hit/miss analytics
- Compliance audit export

---

## 🚀 Getting Started

1. **Sign Agreement** — Standard data processing agreement
2. **Get API Keys** — Sandbox + Production credentials
3. **Configure Policy** — Define your KYC requirements
4. **Integrate** — One API endpoint, 2 hours of dev work
5. **Go Live** — Start saving on KYC costs

---

## 📞 Contact

**For Bank Partnerships:**
- Email: partnerships@hushh.ai
- Web: https://hushh.ai/kyc-agent

**Technical Integration:**
- Docs: https://docs.hushh.ai/kyc-agent
- Support: support@hushh.ai

---

## 🎯 Summary

> **As a bank**, you send Hushh a user's consent + minimal identifiers.
> 
> Hushh's KYC Agent checks your policy against its KYC graph.
> 
> If a valid attestation exists → **PASS** (skip all documents).
> If partially valid → **REVIEW** (ask for 1 doc).
> If nothing usable → **NOT_FOUND** (fall back to full KYC).
> 
> **You only pay more when we actually save you money.**

---

*Document Version: 1.0 | Last Updated: December 2025*
