# Onboarding Data Fix - Edge Functions Update

## 🎯 Problem Identified

The chat interface was unable to answer questions about user's address and onboarding information because:

1. **investor-chat edge function**: Had the code to fetch onboarding data but the logic was not defensive enough
2. **investor-agent-mcp edge function**: Was NOT fetching onboarding_data at all - completely missing!

## ✅ What Was Fixed

### Fix 1: Enhanced investor-chat Edge Function
**File**: `supabase/functions/investor-chat/index.ts`

**Changes Made**:
1. **More Defensive Privacy Checking**: Changed from relying on `privacySettings.onboarding_data` object to safely accessing with optional chaining
2. **Better Field Filtering**: Now explicitly skips system fields (id, user_id, created_at, etc.)
3. **Added Debug Logging**: Console logs to track:
   - Whether onboarding data exists
   - Which fields are visible after privacy filtering
   - When data is added to system prompt
   - System prompt length
4. **Improved AI Guidelines**: Updated the system prompt to explicitly mention onboarding details

**Key Code Change**:
```typescript
// OLD: Relied on privacySettings structure existing
if (onboardingData && privacySettings.onboarding_data) {
  Object.keys(privacySettings.onboarding_data).forEach(...)
}

// NEW: More defensive with explicit iteration
const privacyData = privacySettings?.onboarding_data || {};

if (onboardingData) {
  Object.keys(onboardingData).forEach(fieldName => {
    // Skip system fields
    if (['id', 'user_id', 'created_at', ...].includes(fieldName)) return;
    
    // Check if value exists
    if (onboardingData[fieldName] == null) return;
    
    // Check privacy
    const isVisible = privacyData[fieldName] === true;
    
    if (isVisible) {
      // Add to visible data with proper masking
    }
  });
}
```

### Fix 2: Added Onboarding Data to investor-agent-mcp Edge Function
**File**: `supabase/functions/investor-agent-mcp/index.ts`

**Changes Made**:
1. **Added Onboarding Data Fetch** in `handleChat()` function
2. **Added Onboarding Data Fetch** in `handleSendMessage()` function (for A2A protocol)
3. **Same Privacy Filtering Logic** as investor-chat
4. **Added Debug Logging** with "MCP DEBUG" and "A2A DEBUG" prefixes
5. **Enhanced System Prompts** to include onboarding information

**Locations Updated**:
- ✅ `handleChat()` - Used by MCP protocol
- ✅ `handleSendMessage()` - Used by A2A protocol (agent-to-agent communication)

## 📊 Database Verification Results

For user `linkedin-id-investor`:
- ✅ Onboarding data EXISTS
- ✅ Address fields populated: "hushh villa", "Kirkland", "WA", "98033"
- ✅ Privacy settings CORRECT: All address fields set to `true` (visible)
- ✅ Profile is public and confirmed

**The data was there all along - the edge functions just weren't using it properly!**

## 🚀 Deployment Instructions

### Step 1: Verify Supabase CLI is Logged In
```bash
supabase status
```

If not logged in:
```bash
supabase login
```

### Step 2: Deploy investor-chat Edge Function
```bash
supabase functions deploy investor-chat --no-verify-jwt
```

**Expected Output**:
```
Deploying Function investor-chat...
✓ Function deployed successfully
```

### Step 3: Deploy investor-agent-mcp Edge Function
```bash
supabase functions deploy investor-agent-mcp --no-verify-jwt
```

**Expected Output**:
```
Deploying Function investor-agent-mcp...
✓ Function deployed successfully
```

### Step 4: Verify Deployment
Check the Supabase Dashboard:
1. Go to **Edge Functions** section
2. Verify both functions show recent deployment timestamp
3. Check logs for any immediate errors

## 🧪 Testing Instructions

### Test 1: Chat Widget on Public Profile
1. Visit: `https://www.hushhtech.com/investor/linkedin-id-investor`
2. Open the chat widget
3. Ask: **"What is the investor's address?"**
4. **Expected Response**: Should provide address details: "hushh villa, Kirkland, WA 98033"

### Test 2: More Specific Questions
Try these questions:
- ✅ "Tell me the investor's city and state"
- ✅ "What is their zip code?"
- ✅ "Where does this investor live?"
- ✅ "What is their legal name?"

### Test 3: Check Debug Logs
1. Go to Supabase Dashboard → Edge Functions → investor-chat
2. Click "Logs"
3. Look for these debug messages:
```
DEBUG: Onboarding data exists for user: [user_id]
DEBUG: Visible onboarding fields: [array of fields]
DEBUG: Onboarding data added to system prompt
DEBUG: System prompt length: [number] characters
```

### Test 4: MCP/A2A Protocol (if applicable)
If you're using the MCP or A2A protocol:
1. Test the `/mcp` endpoint
2. Test the `/a2a/rpc` endpoint
3. Check for "MCP DEBUG" and "A2A DEBUG" logs

## 🔍 Debugging Guide

### If Address Still Not Showing:

1. **Check Edge Function Logs**:
   ```bash
   supabase functions logs investor-chat
   ```
   
   Look for:
   - "DEBUG: Onboarding data exists" - confirms data fetch
   - "DEBUG: Visible onboarding fields" - confirms privacy filtering
   - "DEBUG: Onboarding data added to system prompt" - confirms AI receives it

2. **Check OpenAI Response**:
   - Verify the API key is valid
   - Check if OpenAI is rate-limiting
   - Review the model being used (currently gpt-4o-mini)

3. **Verify Privacy Settings**:
   Run this SQL in Supabase:
   ```sql
   SELECT 
     slug,
     privacy_settings->'onboarding_data'->'address_line_1' as address_privacy
   FROM investor_profiles
   WHERE slug = 'linkedin-id-investor';
   ```
   Should return: `true`

4. **Check if Data is in System Prompt**:
   Add this temporary debug to see the actual prompt:
   ```typescript
   console.log('FULL SYSTEM PROMPT:', systemPrompt);
   ```

## 📈 What's Included in Onboarding Data Now

When privacy settings allow, the AI can now answer questions about:

**Personal Information**:
- Legal first name and last name
- Date of birth (formatted)
- SSN (always masked as ***-**-****)

**Address Information**:
- Address line 1 and 2
- City, State, Zip Code
- Country
- Address phone number

**Account Details**:
- Account type (general/retirement)
- Selected fund
- Account structure (individual/other)

**Citizenship & Residence**:
- Citizenship country
- Residence country

**Investment Details**:
- Initial investment amount
- Recurring investment settings
- Recurring frequency and amount

**Referral Information**:
- How they heard about us

## ✅ Success Criteria

After deployment, the following should work:

1. ✅ Chat can answer address questions
2. ✅ Chat can provide city, state, zip code
3. ✅ Chat can share legal name (if privacy allows)
4. ✅ Chat can provide account type information
5. ✅ Debug logs show onboarding data being processed
6. ✅ MCP protocol includes onboarding data
7. ✅ A2A protocol includes onboarding data

## 🔒 Privacy & Security

**Still Protected**:
- ✅ SSN always masked (***-**-****)
- ✅ Only fields marked as `true` in privacy_settings are shared
- ✅ System fields (id, created_at, etc.) never exposed
- ✅ Null/undefined values filtered out
- ✅ Date of birth formatted (not raw timestamp)

## 📝 Technical Details

**Edge Functions Updated**:
1. `supabase/functions/investor-chat/index.ts` - Public chat widget
2. `supabase/functions/investor-agent-mcp/index.ts` - MCP and A2A protocols

**Database Tables Used**:
- `investor_profiles` - Main profile data + privacy settings
- `onboarding_data` - Detailed onboarding information

**API Endpoint**:
- Public chat: `POST /investor-chat`
- MCP: `GET /investor-agent-mcp/mcp?slug=...`
- A2A: `POST /investor-agent-mcp/a2a/rpc?slug=...`

## 🎉 Summary

This fix ensures that both the chat interface and MCP/A2A protocols have access to complete user information (respecting privacy settings) so they can properly answer questions about address, onboarding details, and personal information.

**Before**: AI said "I don't have address information"
**After**: AI can provide full address and onboarding details based on privacy settings

---

**Deployment Date**: December 6, 2025
**Updated By**: Cline AI Assistant
**Status**: ✅ Ready for Deployment
