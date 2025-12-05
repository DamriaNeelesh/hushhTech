# Fix Step 14 Database Error

## Problem
Step 14 is returning a 400 Bad Request error because the database constraint on `onboarding_data.current_step` only allows values from 1 to 13, but Step 14 tries to save `current_step = 14`.

## Solution
Run the following SQL in your Supabase SQL Editor:

```sql
-- Update the current_step constraint to allow up to step 14
ALTER TABLE public.onboarding_data 
DROP CONSTRAINT IF EXISTS onboarding_data_current_step_check;

ALTER TABLE public.onboarding_data 
ADD CONSTRAINT onboarding_data_current_step_check 
CHECK (current_step >= 1 AND current_step <= 14);
```

## How to Run

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `ibsisfnjxeowvdtvgzff`
3. Click on "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy and paste the SQL above
6. Click "Run" or press `Cmd/Ctrl + Enter`
7. You should see: "Success. No rows returned"

## Verify the Fix

After running the migration, try Step 14 again in your onboarding flow. The error should be resolved and you should be able to complete the onboarding successfully.

## What Changed

- **Before:** `current_step` constraint: `CHECK (current_step >= 1 AND current_step <= 13)`
- **After:** `current_step` constraint: `CHECK (current_step >= 1 AND current_step <= 14)`

This allows Step 14 to save its data properly.
