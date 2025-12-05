# Onboarding Flow Setup Guide

## Overview
This guide documents the complete onboarding flow setup, including database schema, TypeScript types, and implementation strategy.

## Database Schema

### Created Files
1. **Migration File**: `supabase/migrations/20251205000000_create_onboarding_data.sql`
2. **TypeScript Types**: `src/types/onboarding.ts`

### Onboarding Data Table

The `onboarding_data` table stores all information collected during the 13-step onboarding process.

#### Table Structure
```sql
CREATE TABLE public.onboarding_data (
  id UUID PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id),
  
  -- Step 1: Account Type
  account_type TEXT ('general' | 'retirement'),
  
  -- Step 3: Fund Selection
  selected_fund TEXT DEFAULT 'hushh_fund_a',
  
  -- Step 4: Referral Source
  referral_source TEXT,
  referral_source_other TEXT,
  
  -- Step 6: Residence
  citizenship_country TEXT DEFAULT 'united_states',
  residence_country TEXT DEFAULT 'united_states',
  
  -- Step 7: Account Structure
  account_structure TEXT ('individual' | 'other'),
  
  -- Step 8-13: Personal & Investment Details
  -- (See migration file for complete structure)
  
  -- Progress Tracking
  current_step INTEGER DEFAULT 1,
  completed_steps INTEGER[],
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Security
- **Row Level Security (RLS)** enabled
- Users can only access their own onboarding data
- Policies for INSERT, SELECT, UPDATE, DELETE operations

#### Indexes
- `user_id` - Fast lookup by user
- `current_step` - Progress tracking
- `is_completed` - Filter completed onboarding
- `created_at` - Time-based queries

## Applying the Migration

### Option 1: Supabase Dashboard (Recommended)
1. Go to https://supabase.com/dashboard/project/ibsisfnjxeowvdtvgzff
2. Navigate to SQL Editor
3. Copy contents of `supabase/migrations/20251205000000_create_onboarding_data.sql`
4. Paste and run the SQL
5. Verify table creation in Table Editor

### Option 2: Using Supabase CLI
```bash
# First, link your project (if not already linked)
cd /Users/ankitkumarsingh/hushhTech
supabase link --project-ref ibsisfnjxeowvdtvgzff

# Then push the migration
supabase db push
```

### Option 3: Direct Database Connection
Use the connection string from your Supabase project settings and apply the migration using any PostgreSQL client.

## Onboarding Flow Steps

### Step 1: Account Type Selection
- **Data Collected**: `account_type`
- **Options**: General ($10 min) or Retirement ($1,000 min)

### Step 2: Portfolio Introduction
- No data collection (informational screen)

### Step 3: Fund Selection
- **Data Collected**: `selected_fund`
- **Default**: Hushh Fund A

### Step 4: Referral Source
- **Data Collected**: `referral_source`, `referral_source_other`
- **Options**: Podcast, Social Media, Yahoo Finance, AI Tool, etc.

### Step 5: Information Collection Intro
- No data collection (transition screen)

### Step 6: Residence Confirmation
- **Data Collected**: `citizenship_country`, `residence_country`
- **Requirement**: US residents only

### Step 7: Account Structure
- **Data Collected**: `account_structure`
- **Options**: Individual or Other

### Step 8: Phone Number
- **Data Collected**: `phone_number`, `phone_country_code`

### Step 9: Legal Name
- **Data Collected**: `legal_first_name`, `legal_last_name`

### Step 10: Address Details
- **Data Collected**: Address line 1 & 2, city, state, ZIP code, phone

### Step 11: Sensitive Information
- **Data Collected**: `ssn_encrypted`, `date_of_birth`
- **Security**: SSN should be encrypted before storage

### Step 12: Initial Investment
- **Data Collected**: `initial_investment_amount`
- **Minimum**: $10 or $1,000 (based on account type)
- **Bonus**: 1% bonus for $5,000+

### Step 13: Recurring Investment
- **Data Collected**: `recurring_investment_enabled`, `recurring_frequency`, `recurring_amount`, `recurring_day_of_month`
- **Optional**: Can skip this step

## Data Flow

### 1. User Authentication
- User signs up via Google/Apple OAuth
- Redirected to `/auth/callback`
- Session established

### 2. Check Onboarding Status
```typescript
// Check if user has completed onboarding
const { data } = await supabase
  .from('onboarding_data')
  .select('is_completed')
  .eq('user_id', user.id)
  .single();

if (!data || !data.is_completed) {
  // Redirect to onboarding
  navigate('/onboarding/step-1');
} else {
  // Redirect to profile
  navigate('/hushh-user-profile');
}
```

### 3. Save Progress
Auto-save after each step:
```typescript
await supabase
  .from('onboarding_data')
  .upsert({
    user_id: user.id,
    current_step: stepNumber,
    ...stepData,
    completed_steps: [...completedSteps, stepNumber]
  });
```

### 4. Complete Onboarding
After step 13:
1. Mark `is_completed = true`
2. Set `completed_at`
3. Migrate data to `investor_profiles` table
4. Create `investor_agents` entry for MCP
5. Redirect to `/hushh-user-profile`

## Integration with Existing System

### investor_profiles Mapping
```typescript
// Map onboarding_data → investor_profiles
{
  user_id: onboarding.user_id,
  name: `${onboarding.legal_first_name} ${onboarding.legal_last_name}`,
  email: user.email,
  age: calculateAge(onboarding.date_of_birth),
  phone_country_code: onboarding.phone_country_code,
  phone_number: onboarding.phone_number,
  organisation: null, // Not collected in onboarding
  // ... rest of profile data
}
```

### MCP Integration
Once profile is created, the existing MCP agent system will work seamlessly:
- `investor_agents` table linked via `user_id`
- `slug` generated from profile
- Agent can respond to inquiries via `/investor/:slug`

## Frontend Implementation

### Routing
```typescript
// App.tsx or routes file
<Route path="/onboarding/step-1" element={<OnboardingStep1 />} />
<Route path="/onboarding/step-2" element={<OnboardingStep2 />} />
// ... steps 3-13
```

### State Management
Use React Context or Zustand to manage onboarding state across steps.

### CTA Button Styling
```css
background: linear-gradient(to right, #00A9E0, #6DD3EF);
color: #0B1120;
font-weight: 650;
```

## TypeScript Types
All types are defined in `src/types/onboarding.ts`:
- `OnboardingData` - Complete data structure
- `Step1Data` through `Step13Data` - Individual step types
- `OnboardingState` - React state management
- `OnboardingResponse` - API responses

## Next Steps

1. ✅ Apply migration to Supabase
2. ⏳ Build UI components for each onboarding step
3. ⏳ Implement auto-save functionality
4. ⏳ Create onboarding completion handler
5. ⏳ Test full flow end-to-end
6. ⏳ Add SSN encryption
7. ⏳ Integrate with payment processing

## Notes
- SSN encryption should be implemented before production
- Consider adding phone number validation
- Test with various edge cases (incomplete flows, browser refresh, etc.)
- Add loading states and error handling
- Implement analytics tracking for each step
