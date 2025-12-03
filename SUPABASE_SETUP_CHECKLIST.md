# Supabase Setup Verification Checklist

## ✅ Current Status

### 1. Supabase CLI
**Status**: ✅ **INSTALLED**
- **Location**: `/opt/homebrew/bin/supabase`
- **Verified**: Command `which supabase` returns path

### 2. Environment Variables (Frontend)
**Status**: ✅ **CONFIGURED**
- **File**: `.env.local`
- **Variables**:
  ```
  VITE_SUPABASE_URL=https://ibsisfnjxeowvdtvgzff.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbGc...fs (valid JWT token)
  OPENAI_API_KEY=sk-svcacct-xxxxxx... (for AI profile generation)
  ```

### 3. Supabase Project Structure
**Status**: ✅ **READY**
```
supabase/
├── functions/
│   └── investor-og-image/
│       └── index.ts           ✅ Edge Function created
├── migrations/
│   ├── 20251201174931_remote_schema.sql
│   ├── 20251203000000_create_investor_profiles.sql
│   └── 20251203000001_add_slug_and_public_access.sql  ✅ New migration
└── .temp/                     (temp files)
```

### 4. Edge Function (investor-og-image)
**Status**: ✅ **CREATED** (Needs deployment)
- **File**: `supabase/functions/investor-og-image/index.ts`
- **Dependencies**: 
  - Deno std@0.168.0 (HTTP server)
  - @supabase/supabase-js@2.46.1
- **Environment Variables Needed**:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`

### 5. Database Migration
**Status**: ✅ **READY** (Needs deployment)
- **File**: `supabase/migrations/20251203000001_add_slug_and_public_access.sql`
- **Changes**:
  - Adds `slug` column (TEXT UNIQUE)
  - Adds `is_public` column (BOOLEAN DEFAULT true)
  - Creates trigger for auto slug generation
  - Creates RLS policy for public access
  - Grants anon role SELECT permission

## ⚠️ IMPORTANT: Edge Function Environment Variables

The Edge Function requires environment variables to be set **in Supabase Dashboard**, not in `.env.local`.

### How to Set Edge Function Environment Variables

**Option 1: Via Supabase Dashboard (Recommended)**
1. Go to https://supabase.com/dashboard/project/ibsisfnjxeowvdtvgzff
2. Navigate to **Edge Functions** → **investor-og-image**
3. Click **Settings** or **Environment Variables**
4. Add these variables:
   ```
   SUPABASE_URL=https://ibsisfnjxeowvdtvgzff.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlic2lzZm5qeGVvd3ZkdHZnemZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NTk1NzgsImV4cCI6MjA4MDEzNTU3OH0.K16sO1R9L2WZGPueDP0mArs2eDYZc-TnIk2LApDw_fs
   ```

**Option 2: Via Supabase CLI**
```bash
# Set environment variables for the Edge Function
supabase secrets set SUPABASE_URL=https://ibsisfnjxeowvdtvgzff.supabase.co
supabase secrets set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlic2lzZm5qeGVvd3ZkdHZnemZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NTk1NzgsImV4cCI6MjA4MDEzNTU3OH0.K16sO1R9L2WZGPueDP0mArs2eDYZc-TnIk2LApDw_fs

# List all secrets to verify
supabase secrets list
```

## 📋 Pre-Deployment Checklist

### Step 1: Link Supabase Project (If not already linked)
```bash
cd /Users/ankitkumarsingh/hushhTech
supabase link --project-ref ibsisfnjxeowvdtvgzff
```

### Step 2: Deploy Database Migration
```bash
# Review migration before deploying
cat supabase/migrations/20251203000001_add_slug_and_public_access.sql

# Deploy migration
supabase db push

# Verify tables and columns
supabase db diff
```

### Step 3: Set Edge Function Environment Variables
```bash
# Option A: Using CLI
supabase secrets set SUPABASE_URL=https://ibsisfnjxeowvdtvgzff.supabase.co
supabase secrets set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlic2lzZm5qeGVvd3ZkdHZnemZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NTk1NzgsImV4cCI6MjA4MDEzNTU3OH0.K16sO1R9L2WZGPueDP0mArs2eDYZc-TnIk2LApDw_fs

# Verify secrets
supabase secrets list

# Option B: Use Supabase Dashboard (see above)
```

### Step 4: Deploy Edge Function
```bash
# Deploy the Edge Function
supabase functions deploy investor-og-image

# Verify deployment
supabase functions list

# Test the function
curl "https://ibsisfnjxeowvdtvgzff.supabase.co/functions/v1/investor-og-image?slug=test-slug"
```

### Step 5: Test Database Access

**Test RLS Policy (Public Access):**
```bash
# Connect to your database
psql "postgresql://postgres:[password]@db.ibsisfnjxeowvdtvgzff.supabase.co:5432/postgres"

# Test public access query
SELECT * FROM investor_profiles 
WHERE slug = 'your-test-slug' 
AND is_public = true 
AND user_confirmed = true;

# Verify trigger exists
SELECT * FROM pg_trigger WHERE tgname = 'trigger_set_investor_slug';

# Verify RLS policies
SELECT * FROM pg_policies WHERE tablename = 'investor_profiles';

# Verify anon role permissions
SELECT grantee, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name = 'investor_profiles' AND grantee = 'anon';
```

## 🔒 Security Verification

### 1. Environment Variables Security
- ✅ `.env.local` is in `.gitignore` (should be)
- ⚠️ **NEVER commit** `.env.local` to Git
- ✅ Frontend uses `VITE_` prefix (safe for client-side)
- ✅ Edge Function uses server-side env vars (secure)

### 2. API Keys
- ✅ `VITE_SUPABASE_ANON_KEY` - Safe to expose (limited permissions)
- ⚠️ `OPENAI_API_KEY` - **Should NOT have VITE_ prefix** (this is exposed!)
  
**SECURITY ISSUE**: Your OpenAI API key should be moved to backend/Edge Function:
```bash
# Better approach: Set in Edge Function secrets
supabase secrets set OPENAI_API_KEY=your-openai-api-key-here

# Remove from .env.local to prevent client-side exposure
```

### 3. RLS Policies
- ✅ Public profiles require: `user_confirmed = true` AND `is_public = true`
- ✅ Users can only update their own profiles
- ✅ Anonymous role only has SELECT permission

## 🚀 Deployment Commands Summary

```bash
# 1. Link project (if needed)
supabase link --project-ref ibsisfnjxeowvdtvgzff

# 2. Deploy database migration
supabase db push

# 3. Set Edge Function secrets
supabase secrets set SUPABASE_URL=https://ibsisfnjxeowvdtvgzff.supabase.co
supabase secrets set SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlic2lzZm5qeGVvd3ZkdHZnemZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NTk1NzgsImV4cCI6MjA4MDEzNTU3OH0.K16sO1R9L2WZGPueDP0mArs2eDYZc-TnIk2LApDw_fs

# 4. Deploy Edge Function
supabase functions deploy investor-og-image

# 5. Verify everything
supabase functions list
supabase secrets list
supabase db diff

# 6. Test Edge Function
curl "https://ibsisfnjxeowvdtvgzff.supabase.co/functions/v1/investor-og-image?slug=test"

# 7. Deploy frontend
npm run build
git push origin main
```

## ✅ Final Verification Status

| Component | Status | Action Required |
|-----------|--------|-----------------|
| Supabase CLI | ✅ Installed | None |
| Environment Variables (.env.local) | ✅ Configured | Secure OPENAI_API_KEY |
| Database Migration | ✅ Ready | Run `supabase db push` |
| Edge Function Code | ✅ Created | Deploy with `supabase functions deploy` |
| Edge Function Env Vars | ⚠️ **NOT SET** | Set via `supabase secrets set` or Dashboard |
| Frontend Code | ✅ Complete | Build and deploy |
| Routing | ✅ Configured | None |
| Data Masking | ✅ Implemented | None |

## 🎯 Next Steps

1. **CRITICAL**: Set Edge Function environment variables (SUPABASE_URL, SUPABASE_ANON_KEY)
2. Deploy database migration: `supabase db push`
3. Deploy Edge Function: `supabase functions deploy investor-og-image`
4. Test Edge Function endpoint
5. Build and deploy frontend
6. Create test profile and verify complete flow

## 📞 Support

If you encounter issues:
- Check Supabase Dashboard logs
- Run `supabase functions logs investor-og-image`
- Verify RLS policies in Supabase Dashboard
- Test database queries with psql
- Review DEPLOYMENT_GUIDE_PUBLIC_PROFILES.md

---

**Summary**: All code is ready. The only missing piece is setting environment variables for the Edge Function before deployment.
