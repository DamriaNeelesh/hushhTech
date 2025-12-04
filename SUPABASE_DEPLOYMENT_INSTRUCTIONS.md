# 🚀 Supabase Edge Function Deployment Instructions

## ⚠️ CRITICAL: API Key Security Fix

Your OpenAI API key is currently **exposed in the browser**. Follow these steps to secure it.

---

## Step 1: Set OpenAI API Key as Supabase Secret 🔐

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/ibsisfnjxeowvdtvgzff
2. Navigate to **Settings** → **Edge Functions** → **Manage Secrets**
3. Click **"Add secret"**
4. Set:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** `YOUR_OPENAI_API_KEY_HERE`
5. Click **Save**

---

## Step 2: Deploy Edge Function 🚢

### Option A: Using Supabase CLI (if you have access token)

```bash
# Get your access token from: https://supabase.com/dashboard/account/tokens
export SUPABASE_ACCESS_TOKEN="your-access-token-here"

# Deploy the function
npx supabase functions deploy generate-investor-profile --project-ref ibsisfnjxeowvdtvgzff
```

### Option B: Using Supabase Dashboard (Recommended)

1. Go to: https://supabase.com/dashboard/project/ibsisfnjxeowvdtvgzff/functions
2. Click **"Deploy new function"**
3. **Function name:** `generate-investor-profile`
4. Upload the file: `supabase/functions/generate-investor-profile/index.ts`
5. Click **Deploy**

---

## Step 3: Verify Deployment ✅

After deployment, test the function:

```bash
curl -X POST \
  'https://ibsisfnjxeowvdtvgzff.supabase.co/functions/v1/generate-investor-profile' \
  -H 'Authorization: Bearer YOUR_USER_JWT_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "input": {
      "name": "Test User",
      "email": "test@example.com",
      "age": 25,
      "phone_country_code": "+1",
      "phone_number": "1234567890"
    },
    "context": {
      "country": "United States",
      "currency": "USD",
      "region": "North America",
      "life_stage": "early_career"
    }
  }'
```

---

## Step 4: What I've Already Done ✅

- ✅ Created `supabase/functions/generate-investor-profile/index.ts`
- ✅ Added authentication verification
- ✅ Added CORS headers
- ✅ Secured OpenAI API calls on the server-side
- ⏳ Waiting for you to deploy and set secrets

---

## Step 5: After Deployment

Once deployed, I'll update the frontend code to:
1. ✅ Remove direct OpenAI calls from `generateProfile.ts`
2. ✅ Clean up `.env.local` to remove exposed API key
3. ✅ Test the complete flow

---

## 📧 Alternative: Use Supabase CLI with Access Token

If you have a Supabase access token:

```bash
# Set your access token
export SUPABASE_ACCESS_TOKEN="sbp_your_token_here"

# Set the secret
npx supabase secrets set OPENAI_API_KEY="YOUR_OPENAI_API_KEY_HERE..." --project-ref ibsisfnjxeowvdtvgzff

# Deploy the function
npx supabase functions deploy generate-investor-profile --project-ref ibsisfnjxeowvdtvgzff
```

---

## 🔍 Get Access Token

1. Go to: https://supabase.com/dashboard/account/tokens
2. Click **"Generate new token"**
3. Give it a name: "CLI Access"
4. Copy the token
5. Use it in the commands above

---

## ⚠️ IMPORTANT

After deployment, your OpenAI API key will be:
- ✅ Secure (not exposed in browser)
- ✅ Only accessible server-side
- ✅ Protected by authentication
- ✅ Not visible in Network Inspector

**Please complete Steps 1 & 2, then let me know so I can continue with the frontend updates!**
