# Apply Investor Profiles Migration to Supabase

## ❌ Problem
- `psql` not installed locally
- Supabase project not initialized with `supabase init`
- Need to apply migration manually

## ✅ Solution: Apply via Supabase Dashboard

### Step 1: Open Supabase SQL Editor

Go to: https://supabase.com/dashboard/project/ibsisfnjxeowvdtvgzff/sql/new

### Step 2: Copy Migration SQL

Copy the ENTIRE content from:
`supabase/migrations/20251203000000_create_investor_profiles.sql`

**Or use this:**

```sql
-- Create investor_profiles table
CREATE TABLE IF NOT EXISTS public.investor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Raw input
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 100),
  phone_country_code TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  organisation TEXT,
  
  -- Derived context (from enrichment)
  derived_context JSONB DEFAULT '{}'::jsonb,
  
  -- AI Generated Profile (12 fields with confidence)
  investor_profile JSONB NOT NULL,
  
  -- Metadata
  is_ai_prefilled BOOLEAN DEFAULT true,
  user_confirmed BOOLEAN DEFAULT false,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  CONSTRAINT investor_profiles_email_key UNIQUE (email),
  CONSTRAINT investor_profiles_phone_unique UNIQUE (phone_country_code, phone_number)
);

-- Enable RLS
ALTER TABLE public.investor_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can insert their own profile"
  ON public.investor_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own profile"
  ON public.investor_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.investor_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_investor_profiles_user_id ON public.investor_profiles(user_id);
CREATE INDEX idx_investor_profiles_email ON public.investor_profiles(email);
CREATE INDEX idx_investor_profiles_profile_gin ON public.investor_profiles USING gin(investor_profile);

-- Trigger for updated_at
CREATE TRIGGER set_timestamp_on_investor_profiles
  BEFORE UPDATE ON public.investor_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- Grant permissions
GRANT ALL ON public.investor_profiles TO authenticated;
GRANT ALL ON public.investor_profiles TO service_role;
```

### Step 3: Run the Migration

1. Paste the SQL in the editor
2. Click "**RUN**" button (bottom right)
3. Wait for success message

### Step 4: Verify Table Created

Run this query in SQL Editor:

```sql
-- Check if table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'investor_profiles';

-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'investor_profiles'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'investor_profiles';

-- Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'investor_profiles';
```

**Expected Results:**
- ✅ Table `investor_profiles` exists
- ✅ 15 columns (id, user_id, name, email, age, etc.)
- ✅ 3 RLS policies (insert, select, update)
- ✅ 3 indexes (user_id, email, profile_gin)

---

## 🧪 Test Insert (Optional)

After applying migration, test with a dummy insert:

```sql
-- This will fail with auth error (expected), proving RLS works
INSERT INTO investor_profiles (
  user_id,
  name,
  email,
  age,
  phone_country_code,
  phone_number,
  investor_profile
) VALUES (
  gen_random_uuid(),
  'Test User',
  'test@example.com',
  30,
  '+1',
  '5551234567',
  '{"primary_goal": {"value": "long_term_growth", "confidence": 0.7, "rationale": "Test"}}'::jsonb
);

-- Error expected: "new row violates row-level security policy"
-- This is GOOD - means RLS is working!
```

---

## ✅ Verification Checklist

After running the migration:

- [ ] Table `investor_profiles` created
- [ ] All 15 columns present
- [ ] RLS enabled on table
- [ ] 3 RLS policies created (insert, select, update)
- [ ] 3 indexes created
- [ ] Trigger for updated_at exists
- [ ] Permissions granted to authenticated and service_role

---

## 🔍 Check from Table Editor

Alternative verification:

1. Go to: https://supabase.com/dashboard/project/ibsisfnjxeowvdtvgzff/editor
2. Look for `investor_profiles` table in the left sidebar
3. Click on it to see structure
4. Should show all columns and constraints

---

## 🚨 If Migration Fails

### Error: "function set_current_timestamp_updated_at() does not exist"

**Solution:** Create the trigger function first:

```sql
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

Then run the full migration again.

### Error: "table already exists"

**Solution:** Table was already created. Verify it exists:

```sql
SELECT * FROM investor_profiles LIMIT 0;
```

If it returns with no rows (but no error), table exists successfully!

---

## 📱 Next Steps After Migration Applied

1. ✅ Migration applied successfully
2. ✅ Get Claude API key from: https://console.anthropic.com/
3. ✅ Add `ANTHROPIC_API_KEY` to Vercel environment variables
4. ✅ Test the complete flow with `vercel dev` or on deployment
5. ✅ Create PR and merge

---

## 🎯 Summary

**What This Migration Does:**
- Creates `investor_profiles` table to store AI-generated investor data
- Enables Row Level Security (users can only access their own data)
- Creates indexes for fast queries
- Sets up automatic timestamp updates
- Grants proper permissions to authenticated users

**Migration File Location:**
`supabase/migrations/20251203000000_create_investor_profiles.sql`

**Apply Via:**
Supabase Dashboard → SQL Editor → Paste → Run ✅
