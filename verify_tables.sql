-- Comprehensive Database Verification Script

-- 1. Check if investor_profiles table exists and show all columns
SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'investor_profiles'
ORDER BY ordinal_position;

-- 2. Check indexes on investor_profiles
SELECT
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename = 'investor_profiles';

-- 3. Check triggers on investor_profiles
SELECT
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE event_object_schema = 'public'
AND event_object_table = 'investor_profiles';

-- 4. Check RLS policies
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'investor_profiles';

-- 5. Check if generate_investor_slug function exists
SELECT 
    routine_name,
    routine_type,
    data_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name LIKE '%slug%';

-- 6. Check table permissions for anon role
SELECT 
    grantee,
    privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
AND table_name = 'investor_profiles'
AND grantee IN ('anon', 'authenticated', 'public');

-- 7. Sample data check (if any profiles exist)
SELECT 
    id,
    name,
    slug,
    is_public,
    user_confirmed,
    created_at
FROM public.investor_profiles
LIMIT 5;
