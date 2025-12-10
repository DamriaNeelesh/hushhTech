# Solid Agentic Negotiation - KYC Agent v3.0

## Overview

This document describes the **Solid Agentic Negotiation** patterns implemented in the Hushh KYC Agent v3.0. The agent now implements 4 core agentic patterns that work together to create an intelligent, secure, and privacy-preserving verification system.

## The 4 Agentic Patterns

| Pattern | Name | Analogy | Purpose |
|---------|------|---------|---------|
| **1** | Reasoning (ReAct Loop) | "Show your work" | Step-by-step thinking with observable thoughts |
| **2** | Reflection (Evaluator-Optimizer) | "Double-check before sending" | Self-correction to prevent PII leaks |
| **3** | Guardrails (Input/Output Sanitization) | "Airport Security" | Block injection attacks + redact PII |
| **4** | Routing (Smart Receptionist) | "Who should handle this?" | Intent detection + request routing |

## Key Concept

> "Humans make mistakes. Agents should help fix them — without leaking sensitive data."

The agent now understands that a user might:
- Have a typo in their phone number
- Have an outdated phone on file
- Be a different person with a similar name

Instead of rejecting outright, the agent uses **TASK_CHALLENGE** to push back and request correction.

---

## Pattern 1: Reasoning (ReAct Loop)

**Location:** `fuzzyMatchUser()` function

The agent "thinks out loud" as it searches for matches, producing observable thoughts that can be displayed in the UI.

```typescript
const thoughts: string[] = [];
thoughts.push(`🔍 Searching for name: "${fullNameQuery}"`);
thoughts.push(`📊 Found ${candidates.length} potential candidate(s).`);
thoughts.push(`  - "John Smith": similarity 95.0%`);
thoughts.push(`✅ Strong name match found: 95.0% confidence.`);
thoughts.push(`❌ Phone number: MISMATCH (provided does not match our records)`);
thoughts.push(`⚠️ PARTIAL_MATCH: Name matches but identifier mismatch detected.`);
```

**What it does:**
1. Searches the database using fuzzy name matching (Levenshtein distance)
2. Logs each step of the reasoning process
3. Computes similarity scores for each candidate
4. Compares identifiers (phone/email) for the best match
5. Determines match type: PERFECT_MATCH, PARTIAL_MATCH, or NO_MATCH

---

## Pattern 2: Reflection (Evaluator-Optimizer)

**Location:** `reflectOnResponse()` function

Before sending any response (especially TASK_CHALLENGE), the agent "reflects" on whether the response is safe.

```typescript
const reflectOnResponse = (
  draftResponse: string,
  matchResult: MatchResult | null,
  providedPhone: string | undefined
): ReflectionResult => {
  const thoughts: string[] = [];
  thoughts.push('🤔 Reflection: Analyzing draft response for safety...');
  
  // Check 1: Are we about to reveal the correct phone number?
  // Check 2: Are we about to reveal the SSN?
  // Check 3: If phone was WRONG, are we hinting at the correct value?
  // Check 4: Run output guardrail as final safety net
  
  thoughts.push('🎯 Reflection complete: Response is SAFE to send.');
  // OR
  thoughts.push('🔧 Reflection complete: Response was REVISED for safety.');
};
```

**Safety checks performed:**
1. ❌ Don't reveal stored phone number
2. ❌ Don't reveal full SSN
3. ❌ Don't hint at correct phone format (first digit, area code, etc.)
4. ❌ Run output guardrail as final safety net

---

## Pattern 3: Guardrails (Input/Output Sanitization)

**Location:** `sanitizeInput()` and `sanitizeOutput()` functions

### Input Guardrail (Request Entry Point)
Blocks injection attacks before they can reach the agent logic.

```typescript
const INJECTION_PATTERNS = [
  /ignore\s+(previous|all|your)\s+instructions/i,
  /dump\s+(all|the)\s+(user|data|names)/i,
  /reveal\s+(the|all)\s+(secrets|passwords|ssn)/i,
  /system\s*prompt/i,
  /bypass\s+(security|verification)/i,
];
```

**Blocked if detected:**
```json
{
  "protocol": "A2A/1.0",
  "type": "TASK_ERROR",
  "error": "Request blocked by security guardrail",
  "reason": "Potentially harmful input patterns detected"
}
```

### Output Guardrail (Response Exit Point)
Redacts any PII that accidentally appears in responses.

```typescript
const PII_PATTERNS = {
  SSN_FULL: /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g,  // 123-45-6789
  PHONE_RAW: /\b\+?1?\s*\d{10,11}\b/g,            // Raw phones
  EMAIL_FULL: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
};
```

---

## Pattern 4: Routing (Smart Receptionist)

**Location:** `routeRequest()` function

Determines the intent of incoming requests and routes to appropriate handlers.

```typescript
type IntentType = 
  | 'VERIFY_USER'        // Standard KYC verification
  | 'MIGRATE_DATA'       // Data migration to another wallet
  | 'CHECK_STATUS'       // Query existing verification status
  | 'EXPLAIN_FAILURE'    // Why did verification fail?
  | 'UNKNOWN';
```

**Routing logic:**
1. Check explicit intent from request body
2. Parse natural language for intent signals
3. Default to VERIFY_USER if subject/userName provided
4. Return UNKNOWN if no intent can be determined

**Response includes routing metadata:**
```json
{
  "routing": {
    "detectedIntent": "VERIFY_USER",
    "confidence": 0.9
  }
}
```

## Message Types

### Extended A2A Protocol Messages

| Message Type | Description |
|-------------|-------------|
| `TASK_INIT` | Bank agent initiates verification request |
| `TASK_NEGOTIATION` | Hushh agent requests identifiers |
| `TASK_UPDATE` | Bank agent provides data |
| `TASK_STATUS` | Progress updates (15%, 45%, 75%, 90%) |
| `TASK_RESULT` | Final verification result |
| **`TASK_CHALLENGE`** | **NEW: Agentic pushback for partial matches** |
| `KEY_EXCHANGE` | Cryptographic key exchange for SSN |
| `TASK_COMPLETE` | Final success with migration link |
| `TASK_ERROR` | Error occurred |

### Match Result Types

| Type | Description | Agent Action |
|------|-------------|--------------|
| `PERFECT_MATCH` | Name + identifier verified | → TASK_RESULT (VERIFIED) |
| `PARTIAL_MATCH` | Name matches, identifier mismatch | → TASK_CHALLENGE |
| `NO_MATCH` | No record found | → TASK_RESULT (REJECTED) |

## Flow Diagram

```
┌─────────────────┐
│   TASK_INIT     │  Bank Agent: "Verify John Doe with phone 555-0199"
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Fuzzy Match   │  Agent: Search by name using Levenshtein distance
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
 [Match]   [No Match]
    │         │
    │         └──────────────────────────────────────────┐
    │                                                     │
    ▼                                                     ▼
┌─────────────────┐                              ┌─────────────────┐
│ Compare Phone   │                              │  TASK_RESULT    │
└────────┬────────┘                              │   (REJECTED)    │
         │                                        └─────────────────┘
    ┌────┴────┐
    │         │
    ▼         ▼
 [Match]   [Mismatch]
    │         │
    ▼         ▼
┌─────────────────┐                    ┌─────────────────────────────────────┐
│  TASK_RESULT    │                    │         TASK_CHALLENGE              │
│   (VERIFIED)    │                    │                                     │
└────────┬────────┘                    │  "I found a record for John Doe     │
         │                              │   with 85% confidence. However,     │
         ▼                              │   the phone number does not match.  │
┌─────────────────┐                    │   This could be:                    │
│  KEY_EXCHANGE   │                    │   • A typo in the phone number      │
└────────┬────────┘                    │   • An outdated phone on file       │
         │                              │   • A different person              │
         ▼                              │                                     │
┌─────────────────┐                    │   Please verify and try again."     │
│ TASK_COMPLETE   │                    └─────────────────────────────────────┘
└─────────────────┘
```

## Privacy-Safe Challenge

The **TASK_CHALLENGE** message is carefully designed to NEVER leak sensitive data:

### What We Share ✅
- Confirmation that a name match was found
- The confidence score (e.g., "85%")
- Which field categories matched (e.g., "name")
- Which field categories mismatched (e.g., "phone")
- What alternative identifiers could help

### What We NEVER Share ❌
- The correct phone number
- The email on file
- Any PII from the matched record
- Hints about what the correct value is

### Example Challenge Message

```
I found a KYC record for "John Doe" with 85% name confidence. 
However, the phone number you provided does not match our records. 
This could be due to:
• A typo in the phone number
• An outdated phone on file
• A different person with a similar name

Please verify the phone number and try again, or provide an 
alternative identifier (like the last 4 digits of SSN).
```

## Implementation Details

### Fuzzy Name Matching

We use **Levenshtein distance** for fuzzy name matching:

```typescript
const calculateNameSimilarity = (name1: string, name2: string): number => {
  const n1 = name1.toLowerCase().trim();
  const n2 = name2.toLowerCase().trim();
  
  if (n1 === n2) return 1.0;
  if (!n1 || !n2) return 0;
  
  const maxLen = Math.max(n1.length, n2.length);
  const distance = levenshteinDistance(n1, n2);
  
  return Math.max(0, 1 - (distance / maxLen));
};
```

- **Threshold**: 60% similarity required for a "strong match"
- Names like "Jon Doe" → "John Doe" would match with ~90% confidence

### Phone Comparison

We compare the last 10 digits of phone numbers (ignoring country codes):

```typescript
const providedLast10 = cleanProvidedPhone.slice(-10);
const storedLast10 = cleanStoredPhone.slice(-10);

if (providedLast10 === storedLast10) {
  matchedFields.push('phone');
} else {
  mismatchedFields.push('phone');
}
```

### TASK_CHALLENGE Payload

```typescript
{
  type: 'TASK_CHALLENGE',
  payload: {
    status: 'PARTIAL_MATCH',
    message: challengeMessage, // Privacy-safe message
    data: {
      confirmed_name: "John Doe",
      name_confidence: "85%",
      matched_fields: ["name"],
      mismatched_fields: ["phone"],
      required_to_proceed: [
        "Corrected phone number",
        "Alternative identifier (SSN last 4, email)"
      ]
    },
    log: agentThoughts.join('\n')
  }
}
```

## Test Scenarios

### Scenario 1: Perfect Match
```
Input:  Name="John Smith", Phone="5550123"
DB:     Name="John Smith", Phone="5550123"
Result: TASK_RESULT → VERIFIED ✅
```

### Scenario 2: Partial Match (Wrong Phone)
```
Input:  Name="John Smith", Phone="5550199"  
DB:     Name="John Smith", Phone="5550123"
Result: TASK_CHALLENGE → PARTIAL_MATCH ⚠️
```

### Scenario 3: No Match
```
Input:  Name="Jane Unknown", Phone="9999999"
DB:     (no record)
Result: TASK_RESULT → REJECTED ❌
```

### Scenario 4: Typo in Name (Still Matches)
```
Input:  Name="Jon Smith", Phone="5550123"
DB:     Name="John Smith", Phone="5550123"
Result: TASK_RESULT → VERIFIED ✅ (91% name similarity)
```

## Frontend Integration

The frontend `conversationGenerator.ts` handles TASK_CHALLENGE:

```typescript
if (msg.type === 'TASK_CHALLENGE') {
  content = `⚠️ [A2A TASK_CHALLENGE] PARTIAL MATCH DETECTED\n\n`;
  content += `${msg.payload.message}\n\n`;
  
  if (msg.payload.data) {
    const data = msg.payload.data;
    content += `📋 Match Details:\n`;
    content += `• Confirmed Name: ${data.confirmed_name}\n`;
    content += `• Name Confidence: ${data.name_confidence}\n`;
    content += `• ✅ Matched: ${data.matched_fields.join(', ')}\n`;
    content += `• ❌ Mismatched: ${data.mismatched_fields.join(', ')}\n`;
  }
}
```

## Deployment

Deploy the updated Edge Function:

```bash
npx supabase functions deploy kyc-agent-a2a-protocol --no-verify-jwt
```

## Future Enhancements

1. **Multi-turn Correction Flow**: Allow the bank agent to send TASK_UPDATE with corrected phone, triggering re-verification

2. **Alternative Identifier Support**: Accept SSN last 4 or email as alternative verification paths

3. **Confidence Thresholds**: Configurable thresholds for different risk levels

4. **Audit Logging**: Log all TASK_CHALLENGE events for compliance review

---

**Author**: Hushh Team  
**Version**: 3.0.0 - Agentic Patterns Edition  
**Protocol**: A2A/1.0

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 3.0.0 | Dec 2024 | Added 4 agentic patterns: Reasoning, Reflection, Guardrails, Routing |
| 2.0.0 | Dec 2024 | Added TASK_CHALLENGE and PARTIAL_MATCH support |
| 1.0.0 | Dec 2024 | Initial A2A Protocol implementation |
