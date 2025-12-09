# A2A Protocol Implementation - KYC Studio

## Overview

The KYC Studio has been transformed into a **truly agentic AI system** following the official A2A Protocol by Google/Linux Foundation.

## Live Endpoints

### Edge Function
```
https://qoeqfmeimagulpzjptbj.supabase.co/functions/v1/kyc-agent-a2a-protocol
```

### Available Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/agent-card.json` | GET | A2A Agent Card for discovery |
| `/sendMessage` | POST | Main A2A Protocol message endpoint |
| `/verify` | POST | Legacy verification endpoint |
| `/migrate/:task_id/:token` | GET | Secure migration link |

## A2A Protocol Message Types

The implementation follows the complete A2A Protocol message lifecycle:

1. **TASK_INIT** - External agent initiates KYC verification request
2. **TASK_NEGOTIATION** - Hushh agent acknowledges and confirms user found
3. **TASK_UPDATE** - Data collection progress updates
4. **TASK_STATUS** - Trust score and risk band calculation
5. **TASK_RESULT** - Full KYC result with all available data
6. **KEY_EXCHANGE** - Secure exchange for sensitive fields (SSN)
7. **TASK_COMPLETE** - Migration link provided, task completed

## Complete A2A Conversation JSON Example

```json
{
  "success": true,
  "task_id": "kyc_task_1749480945123_abc123",
  "status": "COMPLETED",
  "messages": [
    {
      "type": "TASK_INIT",
      "from": "external_agent",
      "to": "hushh_kyc_agent",
      "timestamp": "2025-06-09T15:35:45.123Z",
      "content": {
        "task_type": "kyc_verification",
        "query": {
          "name": "Ankit Kumar Singh"
        },
        "required_fields": ["full_name", "phone", "email", "address", "ssn"],
        "purpose": "identity_verification"
      }
    },
    {
      "type": "TASK_NEGOTIATION",
      "from": "hushh_kyc_agent",
      "to": "external_agent",
      "timestamp": "2025-06-09T15:35:45.234Z",
      "content": {
        "status": "USER_FOUND",
        "message": "User 'Ankit Kumar Singh' found in Hushh database. Proceeding with KYC verification.",
        "user_id": "user_uuid_12345",
        "available_fields": ["full_name", "phone", "email", "address", "ssn"],
        "consent_status": "GRANTED"
      }
    },
    {
      "type": "TASK_UPDATE",
      "from": "hushh_kyc_agent",
      "to": "external_agent",
      "timestamp": "2025-06-09T15:35:45.345Z",
      "content": {
        "progress": 25,
        "message": "Retrieving contact information...",
        "data_retrieved": {
          "phone": "+1 9999999999",
          "phone_country_code": "+1"
        }
      }
    },
    {
      "type": "TASK_UPDATE",
      "from": "hushh_kyc_agent",
      "to": "external_agent",
      "timestamp": "2025-06-09T15:35:45.456Z",
      "content": {
        "progress": 50,
        "message": "Retrieving address information...",
        "data_retrieved": {
          "address": "123 Main Street, San Francisco, CA 94105",
          "address_country": "US"
        }
      }
    },
    {
      "type": "TASK_UPDATE",
      "from": "hushh_kyc_agent",
      "to": "external_agent",
      "timestamp": "2025-06-09T15:35:45.567Z",
      "content": {
        "progress": 75,
        "message": "Calculating trust score and risk assessment...",
        "preliminary_trust_score": 0.85
      }
    },
    {
      "type": "TASK_STATUS",
      "from": "hushh_kyc_agent",
      "to": "external_agent",
      "timestamp": "2025-06-09T15:35:45.678Z",
      "content": {
        "status": "DATA_VERIFIED",
        "trust_score": 1.0,
        "risk_band": "LOW",
        "verification_level": "FULL_KYC",
        "fields_verified": ["full_name", "phone", "email", "address"],
        "fields_pending": ["ssn"]
      }
    },
    {
      "type": "TASK_RESULT",
      "from": "hushh_kyc_agent",
      "to": "external_agent",
      "timestamp": "2025-06-09T15:35:45.789Z",
      "content": {
        "kyc_result": {
          "full_name": "Ankit Kumar Singh",
          "phone": "+1 9999999999",
          "email": "ankit@example.com",
          "address": "123 Main Street, San Francisco, CA 94105",
          "ssn": "[PROTECTED - Key Exchange Required]"
        },
        "trust_score": 1.0,
        "risk_band": "LOW",
        "verification_timestamp": "2025-06-09T15:35:45.789Z"
      }
    },
    {
      "type": "KEY_EXCHANGE",
      "from": "external_agent",
      "to": "hushh_kyc_agent",
      "timestamp": "2025-06-09T15:35:45.890Z",
      "content": {
        "request": "SSN_UNLOCK",
        "public_key": "external_agent_public_key_base64",
        "purpose": "identity_verification",
        "consent_reference": "consent_token_xyz"
      }
    },
    {
      "type": "KEY_EXCHANGE",
      "from": "hushh_kyc_agent",
      "to": "external_agent",
      "timestamp": "2025-06-09T15:35:45.901Z",
      "content": {
        "response": "SSN_UNLOCKED",
        "encrypted_ssn": "encrypted_ssn_data_base64",
        "ssn_last_4": "6789",
        "encryption_algorithm": "AES-256-GCM",
        "key_id": "hushh_key_2025_06"
      }
    },
    {
      "type": "TASK_COMPLETE",
      "from": "hushh_kyc_agent",
      "to": "external_agent",
      "timestamp": "2025-06-09T15:35:46.012Z",
      "content": {
        "status": "COMPLETED",
        "summary": {
          "user_verified": true,
          "trust_score": 1.0,
          "risk_band": "LOW",
          "verification_level": "FULL_KYC",
          "fields_verified": ["full_name", "phone", "email", "address", "ssn"]
        },
        "migration_token": "mig_token_abc123xyz",
        "migration_link": "https://qoeqfmeimagulpzjptbj.supabase.co/functions/v1/kyc-agent-a2a-protocol/migrate/kyc_task_1749480945123_abc123/mig_token_abc123xyz",
        "expiry": "2025-06-09T16:35:46.012Z"
      }
    }
  ],
  "final_result": {
    "user_verified": true,
    "trust_score": 1.0,
    "risk_band": "LOW",
    "kyc_data": {
      "full_name": "Ankit Kumar Singh",
      "phone": "+1 9999999999",
      "email": "ankit@example.com",
      "address": "123 Main Street, San Francisco, CA 94105",
      "ssn_last_4": "6789"
    },
    "migration_link": "https://qoeqfmeimagulpzjptbj.supabase.co/functions/v1/kyc-agent-a2a-protocol/migrate/kyc_task_1749480945123_abc123/mig_token_abc123xyz"
  }
}
```

## Trust Score & Risk Band Calculation

### Trust Score (0-1 scale)
- **1.0 (100%)** - All fields verified, complete data
- **0.75-0.99** - Most fields verified, minor gaps
- **0.50-0.74** - Partial verification
- **0.25-0.49** - Limited verification
- **0-0.24** - Insufficient data

### Risk Bands
| Risk Band | Trust Score Range | Description |
|-----------|-------------------|-------------|
| LOW | ≥ 0.8 | Fully verified, safe to proceed |
| MEDIUM | 0.5 - 0.79 | Additional verification recommended |
| HIGH | 0.3 - 0.49 | Manual review required |
| CRITICAL | < 0.3 | Block transaction, escalate |

## Agent Card (/.well-known/agent-card.json)

```json
{
  "name": "Hushh KYC Agent",
  "version": "1.0.0",
  "description": "Hushh KYC verification agent implementing A2A Protocol",
  "endpoints": {
    "a2a": "/functions/v1/kyc-agent-a2a-protocol/sendMessage",
    "legacy": "/functions/v1/kyc-agent-a2a-protocol/verify"
  },
  "capabilities": [
    "kyc_verification",
    "identity_lookup",
    "trust_scoring",
    "key_exchange",
    "data_migration"
  ],
  "supported_message_types": [
    "TASK_INIT",
    "TASK_NEGOTIATION",
    "TASK_UPDATE",
    "TASK_STATUS",
    "TASK_RESULT",
    "KEY_EXCHANGE",
    "TASK_COMPLETE"
  ],
  "trust_framework": {
    "risk_bands": ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
    "trust_score_range": [0, 1]
  }
}
```

## React Integration

The `conversationGenerator.ts` converts A2A Protocol messages to human-readable conversation format:

```typescript
// src/components/a2aPlayground/conversationGenerator.ts

export async function* generateA2AConversation(
  scenario: A2AScenario
): AsyncGenerator<ConversationMessage> {
  // Calls the A2A Protocol endpoint
  const response = await fetch(
    'https://qoeqfmeimagulpzjptbj.supabase.co/functions/v1/kyc-agent-a2a-protocol/sendMessage',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: scenario.queryParams,
        agent: scenario.requesterAgent
      })
    }
  );
  
  // Converts A2A messages to ConversationMessage format
  // Streams with realistic delays for animation
}
```

## Testing

### Test via cURL
```bash
curl -X POST \
  'https://qoeqfmeimagulpzjptbj.supabase.co/functions/v1/kyc-agent-a2a-protocol/sendMessage' \
  -H 'Content-Type: application/json' \
  -d '{
    "query": {
      "name": "Ankit Kumar Singh"
    },
    "agent": "stripe_kyc_agent"
  }'
```

### Test in Browser
Visit: `https://your-domain.com/a2a-playground`

## Database Tables Used

- `onboarding_data` - Primary user data source
- `investor_profiles` - Fallback for investor data

## Files Modified

| File | Description |
|------|-------------|
| `supabase/functions/kyc-agent-a2a-protocol/index.ts` | Main A2A Protocol Edge Function |
| `supabase/functions/kyc-agent-a2a-protocol/deno.json` | Deno configuration |
| `src/components/a2aPlayground/conversationGenerator.ts` | React integration |
| `src/types/a2aPlayground.ts` | TypeScript types |

## Status

✅ **COMPLETE** - All components deployed and tested successfully.
