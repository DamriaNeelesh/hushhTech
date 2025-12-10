# PR: Phase 2 - Hushh KYC Agent + State Machine + Trust Scoring

## Create PR Here:
**https://github.com/DamriaNeelesh/hushhTech/compare/main...feature/a2a-kyc-playground**

---

## Title
🚀 Phase 2: Hushh KYC Agent + State Machine + Trust Scoring

## Description

### Summary
This PR implements Phase 2 of the A2A KYC Playground with the following major changes:

### 🏷️ Naming Standardization
- Renamed 'Hushh Identity Oracle' → **Hushh KYC Agent** across all components
- Updated frontend: MissionControlLayout, AgentThoughtLog, A2AConversationScreen
- Updated backend: prompts.ts system prompt

### 🧠 New Types & State Machine
- Added `KycConversationState` - The 'brain' shared across turns
- Added `A2AMessage` schema for A2A protocol communication
- Implemented 6-phase state machine:
  - INIT → HANDSHAKE → SUBJECT_IDENTIFICATION → RUNNING_CHECKS → READY_TO_DECIDE → READY_TO_MIGRATE → DONE
  - Plus BLOCKED and ERROR states

### 📊 Deterministic Trust Scoring
```typescript
calculateTrustScore(evidence): number
// Formula: 30*identity + 25*sanctions + 15*document + 15*recency + 15*behavior
// Risk bands: 80-100=LOW, 60-79=MEDIUM, 40-59=HIGH, 0-39=CRITICAL
```

### 🔒 Data Minimization
- Never output full SSN
- Prefer masked/derived values
- Privacy-first approach in system prompt

### Files Changed
- `supabase/functions/kyc-agent-a2a-protocol/prompts.ts` (complete rewrite - 600+ lines)
- `supabase/functions/kyc-agent-agentic/index.ts` (import updates)
- `src/components/a2aPlayground/MissionControlLayout.tsx`
- `src/components/a2aPlayground/AgentThoughtLog.tsx`
- `src/components/a2aPlayground/A2AConversationScreen.tsx`
- `PR_A2A_PLAYGROUND_ENHANCEMENT.md` (documentation)

### Testing
- ✅ Build successful
- Test at: `/a2a-playground`

### Next Steps After Merge
```bash
supabase functions deploy kyc-agent-agentic
```

---

## Key Implementation Details

### KycConversationState Type
```typescript
interface KycConversationState {
  subject: KycSubject | null;        // Who we're verifying
  request: KycRequest;               // What the verifier asked for
  policy: KycPolicy;                 // Our policies (consent, data minimization)
  evidence: EvidenceItem[];          // What we've gathered
  trust: TrustInfo;                  // Current trust score & risk band
  status: KycStatus;                 // Current state machine status
  progress_pct: number;              // 0-100 progress
  fields_requested: string[];        // What fields verifier needs
  fields_approved: string[];         // What user consented to
  fields_disclosed: string[];        // What we've actually sent
}
```

### Trust Score Formula
```
score = 0.30 * identity_factor 
      + 0.25 * sanctions_factor 
      + 0.15 * document_factor 
      + 0.15 * recency_factor 
      + 0.15 * behavior_factor

Risk Bands:
- 80-100: LOW risk
- 60-79: MEDIUM risk
- 40-59: HIGH risk
- 0-39: CRITICAL risk
```
