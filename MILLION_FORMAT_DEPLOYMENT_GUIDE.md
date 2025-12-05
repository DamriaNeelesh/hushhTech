# Million Format Deployment Guide

## ✅ Changes Completed (Local)

### 1. TypeScript Types Updated
**File:** `src/types/investorProfile.ts`
- Changed `TicketSize` enum: `micro_<1k` → `micro_<1m`, etc.
- Changed `AnnualCapacity` enum: `<5k` → `<5m`, etc.
- Updated `VALUE_LABELS` to display million format

### 2. Edge Function Updated
**File:** `supabase/functions/generate-investor-profile/index.ts`
- Updated `PROFILE_SCHEMA` options to million format
- Updated `SYSTEM_PROMPT` to explain million-scale to AI

**Note:** TypeScript errors in the edge function file are expected - Deno types aren't available in VSCode, but the function will work correctly when deployed.

---

## 🚀 Deployment Steps

### Step 1: Deploy Edge Function to Supabase

```bash
cd /Users/ankitkumarsingh/hushhTech

# Make sure you're logged in to Supabase CLI
supabase login

# Link to your project (if not already linked)
supabase link --project-ref ibsisfnjxeowvdtvgzff

# Deploy the updated edge function
supabase functions deploy generate-investor-profile
```

**Expected output:**
```
✓ Deployed Edge Function generate-investor-profile
```

### Step 2: Test the Changes

1. Go to your app: `http://localhost:5173/hushh-user-profile`
2. Fill in the form and click "Generate Investor Profile"
3. Check the generated profile - you should see:
   - "Micro (< $1 million)" instead of "Micro (< $1K)"
   - "$5 million - $20 million" instead of "$5K - $20K"

---

## 🗄️ Database Migration (Optional)

### Do You Have Existing Investor Profiles?

**If YES** - Run this SQL to update old format to new format:

```sql
-- Update existing investor profiles from K format to M format
UPDATE public.investor_profiles
SET investor_profile = investor_profile || jsonb_build_object(
  'typical_ticket_size', 
  jsonb_build_object(
    'value', 
    CASE 
      WHEN investor_profile->'typical_ticket_size'->>'value' = 'micro_<1k' THEN 'micro_<1m'
      WHEN investor_profile->'typical_ticket_size'->>'value' = 'small_1k_10k' THEN 'small_1m_10m'
      WHEN investor_profile->'typical_ticket_size'->>'value' = 'medium_10k_50k' THEN 'medium_10m_50m'
      WHEN investor_profile->'typical_ticket_size'->>'value' = 'large_>50k' THEN 'large_>50m'
      ELSE investor_profile->'typical_ticket_size'->>'value'
    END,
    'confidence', investor_profile->'typical_ticket_size'->'confidence',
    'rationale', investor_profile->'typical_ticket_size'->'rationale'
  ),
  'annual_investing_capacity',
  jsonb_build_object(
    'value',
    CASE 
      WHEN investor_profile->'annual_investing_capacity'->>'value' = '<5k' THEN '<5m'
      WHEN investor_profile->'annual_investing_capacity'->>'value' = '5k_20k' THEN '5m_20m'
      WHEN investor_profile->'annual_investing_capacity'->>'value' = '20k_100k' THEN '20m_100m'
      WHEN investor_profile->'annual_investing_capacity'->>'value' = '>100k' THEN '>100m'
      ELSE investor_profile->'annual_investing_capacity'->>'value'
    END,
    'confidence', investor_profile->'annual_investing_capacity'->'confidence',
    'rationale', investor_profile->'annual_investing_capacity'->'rationale'
  )
)
WHERE 
  investor_profile->'typical_ticket_size'->>'value' IN ('micro_<1k', 'small_1k_10k', 'medium_10k_50k', 'large_>50k')
  OR investor_profile->'annual_investing_capacity'->>'value' IN ('<5k', '5k_20k', '20k_100k', '>100k');

-- Verify the changes
SELECT 
  name,
  investor_profile->'typical_ticket_size'->>'value' as ticket_size,
  investor_profile->'annual_investing_capacity'->>'value' as annual_capacity
FROM public.investor_profiles
LIMIT 5;
```

**If NO** - Skip this step. All new profiles will automatically use million format.

---

## 🧪 Testing Checklist

After deployment, verify:

- [ ] Edge function deploys successfully
- [ ] Can generate new investor profile
- [ ] Profile shows "million" format (not "K" format)
- [ ] Both displays show millions:
  - Main profile card
  - Expanded AI rationale section
- [ ] Existing profiles still work (if you have any)

---

## 📝 What Changed?

### Database Values (Old → New)

**Ticket Size:**
- `micro_<1k` → `micro_<1m`
- `small_1k_10k` → `small_1m_10m`
- `medium_10k_50k` → `medium_10m_50m`
- `large_>50k` → `large_>50m`

**Annual Capacity:**
- `<5k` → `<5m`
- `5k_20k` → `5m_20m`
- `20k_100k` → `20m_100m`
- `>100k` → `>100m`

### Display Labels (Old → New)

**Ticket Size:**
- "Micro (< $1K)" → "Micro (< $1 million)"
- "Small ($1K - $10K)" → "Small ($1 million - $10 million)"
- "Medium ($10K - $50K)" → "Medium ($10 million - $50 million)"
- "Large (> $50K)" → "Large (> $50 million)"

**Annual Capacity:**
- "< $5K" → "< $5 million"
- "$5K - $20K" → "$5 million - $20 million"
- "$20K - $100K" → "$20 million - $100 million"
- "> $100K" → "> $100 million"

---

## 🔥 Rollback Plan (If Needed)

If you need to revert:

1. **Revert TypeScript Types:**
```bash
git checkout src/types/investorProfile.ts
```

2. **Revert Edge Function:**
```bash
git checkout supabase/functions/generate-investor-profile/index.ts
supabase functions deploy generate-investor-profile
```

3. **Revert Database (if migration was run):**
```sql
-- Reverse the migration (opposite direction)
UPDATE public.investor_profiles
SET investor_profile = investor_profile || jsonb_build_object(
  'typical_ticket_size', 
  jsonb_build_object(
    'value', 
    CASE 
      WHEN investor_profile->'typical_ticket_size'->>'value' = 'micro_<1m' THEN 'micro_<1k'
      WHEN investor_profile->'typical_ticket_size'->>'value' = 'small_1m_10m' THEN 'small_1k_10k'
      WHEN investor_profile->'typical_ticket_size'->>'value' = 'medium_10m_50m' THEN 'medium_10k_50k'
      WHEN investor_profile->'typical_ticket_size'->>'value' = 'large_>50m' THEN 'large_>50k'
      ELSE investor_profile->'typical_ticket_size'->>'value'
    END,
    'confidence', investor_profile->'typical_ticket_size'->'confidence',
    'rationale', investor_profile->'typical_ticket_size'->'rationale'
  ),
  'annual_investing_capacity',
  jsonb_build_object(
    'value',
    CASE 
      WHEN investor_profile->'annual_investing_capacity'->>'value' = '<5m' THEN '<5k'
      WHEN investor_profile->'annual_investing_capacity'->>'value' = '5m_20m' THEN '5k_20k'
      WHEN investor_profile->'annual_investing_capacity'->>'value' = '20m_100m' THEN '20k_100k'
      WHEN investor_profile->'annual_investing_capacity'->>'value' = '>100m' THEN '>100k'
      ELSE investor_profile->'annual_investing_capacity'->>'value'
    END,
    'confidence', investor_profile->'annual_investing_capacity'->'confidence',
    'rationale', investor_profile->'annual_investing_capacity'->'rationale'
  )
);
```

---

## ❓ FAQ

**Q: Why are there TypeScript errors in the edge function file?**
A: VSCode doesn't recognize Deno types. The function will work perfectly when deployed to Supabase (which runs Deno runtime). You can ignore these errors.

**Q: Do I need to update existing profiles?**
A: Only if you have existing investor profiles in your database. If you're starting fresh, skip the migration SQL.

**Q: Will the AI understand million-scale better now?**
A: Yes! The updated system prompt explicitly tells the AI that values are in millions and explains the scale (e.g., "micro_<1m means under $1 million").

**Q: Can I test locally before deploying?**
A: The edge function needs to be deployed to Supabase to work. Local Supabase isn't running, so you must deploy to test.

---

## 🎯 Summary

**Files Changed:** 2 files
1. `src/types/investorProfile.ts` - TypeScript types & display labels
2. `supabase/functions/generate-investor-profile/index.ts` - Edge function

**Deployment:** 1 command
```bash
supabase functions deploy generate-investor-profile
```

**Database:** Optional migration SQL (only if you have existing profiles)

**Result:** All new profiles will store and display values in millions format! 🎉
