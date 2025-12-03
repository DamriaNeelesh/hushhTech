# Testing Investor Profile System Locally

## Problem
The `/api/generate-investor-profile` endpoint is a **Vercel serverless function** that only works:
- ✅ On Vercel production/preview deployments
- ✅ With `vercel dev` locally
- ❌ With `npm run dev` (Vite dev server doesn't support serverless functions)

## Solution 1: Test with Vercel CLI (Recommended)

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Link Project
```bash
vercel link
```

### Add Environment Variable
Create `.env` file (NOT `.env.local`) in project root:
```bash
ANTHROPIC_API_KEY=your_claude_api_key_here
```

### Run with Vercel Dev
```bash
vercel dev
```

This will:
- Start the Vite dev server
- Run serverless functions from `/api` folder
- Make the API endpoint work at `http://localhost:3000/api/generate-investor-profile`

### Test the Flow
1. Go to: http://localhost:3000/hushh-user-profile
2. Login with existing credentials
3. Click "Create Your Hushh ID"
4. Fill the 5-field form
5. Click "Generate My Profile"
6. Should see AI-generated profile with 12 fields
7. Review and edit as needed
8. Click "Confirm Profile"
9. Should redirect back to profile page

## Solution 2: Test on Vercel Deployment

### Deploy to Vercel
```bash
# Push changes to GitHub (already done)
git push origin feature/new-supabase-setup

# Vercel will auto-deploy if connected to GitHub
```

### Add Environment Variable in Vercel
1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add: `ANTHROPIC_API_KEY` = `your_claude_api_key`
3. Redeploy: Settings → Deployments → Redeploy latest

### Test on Live Site
Visit your Vercel URL and test the complete flow there.

## Solution 3: For Quick Local Testing (Mock API)

If you just want to test the UI flow without the actual AI generation, we can add a mock mode that returns sample data without calling Claude API.

## Verification Steps

✅ **Step 1: Check API Endpoint**
```bash
# With vercel dev running
curl -X POST http://localhost:3000/api/generate-investor-profile \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "name": "Test User",
      "email": "test@example.com",
      "age": 30,
      "phone_country_code": "+1",
      "phone_number": "5551234567"
    },
    "context": {
      "country": "United States",
      "region": "NA",
      "currency": "USD",
      "life_stage": "early_career"
    }
  }'
```

Expected response:
```json
{
  "success": true,
  "profile": {
    "primary_goal": { "value": "...", "confidence": 0.7, "rationale": "..." },
    ...
  }
}
```

✅ **Step 2: Check Supabase Table**
Run this query in Supabase SQL Editor:
```sql
SELECT * FROM investor_profiles WHERE user_id = auth.uid();
```

## Current Setup Status

- [x] Serverless API function created (`/api/generate-investor-profile.js`)
- [x] Client code updated to use API endpoint
- [x] Button navigation fixed
- [x] Code pushed to GitHub
- [ ] **YOU NEED TO DO:** Get Claude API key from https://console.anthropic.com/
- [ ] **YOU NEED TO DO:** Add `ANTHROPIC_API_KEY` to Vercel env vars
- [ ] **YOU NEED TO DO:** Apply Supabase migration (see below)

## Apply Supabase Migration

Go to: https://supabase.com/dashboard/project/ibsisfnjxeowvdtvgzff/sql/new

Run this SQL:
```sql
-- Copy entire content from: supabase/migrations/20251203000000_create_investor_profiles.sql
-- Then click RUN
```

## Why It's Not Working with `npm run dev`

The Vite dev server (`npm run dev`) is just a static file server with HMR. It doesn't know how to execute Node.js serverless functions.

**Vercel's deployment does this:**
1. Vite builds the React app → static files
2. Files in `/api` → Vercel serverless functions
3. Both work together in production

**For local dev:**
- Use `vercel dev` to simulate this environment
- OR deploy to Vercel preview and test there

## Recommended Next Steps

1. ✅ Install Vercel CLI: `npm install -g vercel`
2. ✅ Get Claude API key from: https://console.anthropic.com/
3. ✅ Create `.env` with: `ANTHROPIC_API_KEY=your_key`
4. ✅ Run: `vercel dev`
5. ✅ Test the complete flow
6. ✅ Apply Supabase migration
7. ✅ Deploy to Vercel production

---

**Quick Commands:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Add API key to .env
echo "ANTHROPIC_API_KEY=your_key_here" > .env

# Run locally
vercel dev

# Deploy
vercel --prod
```
