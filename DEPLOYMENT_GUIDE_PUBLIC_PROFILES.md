# Public Investor Profile Deployment Guide

This guide walks you through deploying the public investor profile feature with slug-based URLs and OG images.

## Prerequisites

- Supabase CLI installed (`npm install -g supabase`)
- Supabase project configured locally
- Access to Supabase dashboard
- Git access to deploy changes

## Step 1: Deploy Database Migration

The migration adds the necessary columns and RLS policies for public profiles.

```bash
# Navigate to project root
cd /Users/ankitkumarsingh/hushhTech

# Link to your Supabase project (if not already linked)
supabase link --project-ref YOUR_PROJECT_REF

# Push the migration to Supabase
supabase db push

# Or apply the specific migration file
supabase db push supabase/migrations/20251203000001_add_slug_and_public_access.sql
```

### What the Migration Does:

1. **Adds `slug` column**: Unique, URL-friendly identifier for each profile
2. **Adds `is_public` column**: Boolean flag to control profile visibility (default: true)
3. **Creates slug generation function**: Automatically generates slugs from names
4. **Creates trigger**: Auto-generates slugs on insert/update
5. **Updates RLS policies**: Allows public read access to confirmed public profiles
6. **Backfills existing profiles**: Generates slugs for all existing profiles

### Verify Migration

```bash
# Check if migration was successful
supabase db diff

# Connect to database and verify
psql YOUR_DATABASE_URL

# Run these queries to verify:
\d investor_profiles              # Should show slug and is_public columns
SELECT slug FROM investor_profiles LIMIT 5;  # Should show generated slugs
```

## Step 2: Deploy Edge Function for OG Images

The Edge Function generates dynamic Open Graph images for social media sharing.

```bash
# Deploy the investor-og-image Edge Function
supabase functions deploy investor-og-image

# Verify deployment
supabase functions list

# Test the function
curl "YOUR_SUPABASE_URL/functions/v1/investor-og-image?slug=test-slug"
```

### Edge Function Details:

- **Endpoint**: `https://YOUR_PROJECT.supabase.co/functions/v1/investor-og-image?slug=PROFILE_SLUG`
- **Response**: SVG image (1200x630px) optimized for social media
- **Cache**: 1 hour browser cache, 24 hours CDN cache
- **Features**:
  - Beautiful gradient background
  - Profile name, age, organization
  - Investment attributes (risk tolerance, goals, experience)
  - Hushh branding

### Test OG Image Generation

```bash
# Get a slug from your database
supabase db execute "SELECT slug FROM investor_profiles WHERE user_confirmed = true LIMIT 1;"

# Test with actual slug
curl "https://YOUR_PROJECT.supabase.co/functions/v1/investor-og-image?slug=ACTUAL_SLUG" > test-og-image.svg

# Open in browser to view
open test-og-image.svg
```

## Step 3: Update Environment Variables

Ensure your `.env.local` has the correct Supabase configuration:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

## Step 4: Deploy Frontend Changes

```bash
# Build the project
npm run build

# Deploy to Vercel (or your hosting platform)
vercel --prod

# Or use Git deployment
git add .
git commit -m "feat: add public investor profiles with slug-based URLs and OG images"
git push origin main
```

## Step 5: Testing the Complete Flow

### A. Create a Test Profile

1. Navigate to: `https://hushhtech.com/hushh-user-profile`
2. Fill in the form with test data:
   - Name: "John Doe"
   - Email: "john.doe@example.com"
   - Age: 35
   - Phone: +1 1234567890
   - Organization: "Hushh Technologies"
3. Click "Generate Investor Profile"
4. Verify profile is created and slug is displayed

### B. Test Public Profile Access

1. Copy the public profile URL from the share section
2. Open in incognito/private browser window (to test without auth)
3. Verify:
   - ✅ Profile loads without authentication
   - ✅ Sensitive data is masked (j***@example.com, +1-***-7890)
   - ✅ Investment profile fields are displayed
   - ✅ Share and copy buttons work
   - ✅ Page title and meta tags are correct

### C. Test OG Image for Social Sharing

1. Use a social media debugger tool:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/

2. Enter your profile URL: `https://hushhtech.com/investor/john-doe-investor`

3. Verify OG image loads correctly:
   - ✅ Image displays profile name
   - ✅ Shows age and organization
   - ✅ Displays investment attributes
   - ✅ Hushh branding visible
   - ✅ Image is 1200x630px

### D. Test Slug Uniqueness

1. Create another profile with the same name
2. Verify second profile gets slug: `john-doe-investor-2`
3. Test third profile gets: `john-doe-investor-3`

### E. Test Privacy Controls

```bash
# Update profile to private via Supabase dashboard or SQL
supabase db execute "UPDATE investor_profiles SET is_public = false WHERE slug = 'john-doe-investor';"

# Try to access the profile
# Should show "Profile Not Found" error
```

## Step 6: Verify Database Triggers

Test that slugs are auto-generated:

```bash
# Insert a test profile
supabase db execute "
  INSERT INTO investor_profiles (user_id, name, email, age, phone_country_code, phone_number, investor_profile, confirmed_at)
  VALUES (
    'test-user-id',
    'Jane Smith',
    'jane@example.com',
    28,
    '+1',
    '9876543210',
    '{}'::jsonb,
    NOW()
  );
"

# Verify slug was auto-generated
supabase db execute "SELECT slug FROM investor_profiles WHERE email = 'jane@example.com';"
# Should return: jane-smith-investor
```

## Troubleshooting

### Issue: Slug Not Generated

**Solution**: Check if trigger is active:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'set_investor_slug_trigger';
```

If missing, re-run the migration.

### Issue: OG Image Not Loading

**Solution**: 
1. Check Edge Function logs:
   ```bash
   supabase functions logs investor-og-image
   ```

2. Verify environment variables in Supabase dashboard:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY

3. Test function directly:
   ```bash
   curl -v "YOUR_SUPABASE_URL/functions/v1/investor-og-image?slug=test"
   ```

### Issue: Profile Not Found (Public Access)

**Solution**: Verify RLS policy:
```sql
SELECT * FROM pg_policies WHERE tablename = 'investor_profiles';
```

Should show policy: `Public can view confirmed public profiles`

### Issue: TypeScript Errors in Edge Function

**Expected**: Edge Function uses Deno, not Node.js. TypeScript errors are normal and won't affect deployment.

## Performance Optimization

### Enable CDN Caching

Add these headers to Vercel configuration (vercel.json):
```json
{
  "routes": [
    {
      "src": "/investor/(.+)",
      "headers": {
        "Cache-Control": "public, max-age=3600, s-maxage=86400"
      }
    }
  ]
}
```

### Database Indexing

The migration already creates an index on the `slug` column for fast lookups:
```sql
CREATE UNIQUE INDEX idx_investor_profiles_slug ON investor_profiles(slug);
```

## Security Considerations

1. **Data Masking**: Email and phone numbers are masked on the frontend
2. **RLS Policies**: Database-level security ensures only public, confirmed profiles are accessible
3. **CORS**: Edge Function has CORS headers for cross-origin requests
4. **Rate Limiting**: Consider adding rate limiting to Edge Function for production

## Monitoring

### Key Metrics to Track

1. **Profile View Count**: Track visits to public profiles
2. **Share Conversion**: Track copy/share button clicks
3. **OG Image Performance**: Monitor Edge Function response times
4. **SEO Performance**: Track search engine indexing

### Supabase Dashboard

Monitor:
- Database query performance
- Edge Function invocations
- RLS policy hits
- Storage usage

## Next Steps

After successful deployment:

1. ✅ Test all functionality in production
2. ✅ Set up monitoring and alerts
3. ✅ Create user documentation
4. ✅ Announce feature to users
5. ✅ Collect user feedback
6. ✅ Consider adding:
   - Custom domains for profiles
   - Profile analytics dashboard
   - QR codes for profiles
   - PDF export functionality

## Rollback Plan

If issues occur:

```bash
# Rollback database migration
supabase db reset

# Or manually revert specific migration
supabase db push --rollback

# Remove Edge Function
supabase functions delete investor-og-image

# Revert frontend code
git revert HEAD
git push origin main
```

## Support

For issues or questions:
- Check Supabase logs: `supabase functions logs`
- Review database logs in Supabase Dashboard
- Test locally: `supabase start` and `npm run dev`
- Contact team for support

---

**Deployment Checklist**:
- [ ] Database migration deployed
- [ ] Edge Function deployed
- [ ] Environment variables configured
- [ ] Frontend deployed
- [ ] Test profile created
- [ ] Public access verified
- [ ] OG images tested
- [ ] Social sharing validated
- [ ] Privacy controls tested
- [ ] Performance optimized
- [ ] Monitoring set up
- [ ] Documentation updated
