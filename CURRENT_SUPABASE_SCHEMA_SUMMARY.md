# Current Supabase Database Schema Summary

## Overview
This document summarizes the existing database structure before implementing the new onboarding flow.

---

## Existing Tables

### 1. **members** (Original Schema)
**Purpose:** Basic member registration and profile data

**Key Fields:**
- `id` (UUID) - Primary key
- `name` (text) - User's full name
- `email` (text) - Unique email
- `age` (integer) - Age (13-120)
- `phone_country_code` + `phone_number` - Phone details
- `organisation` (text) - Optional organization
- `country` (char2) - Country code
- `profile` (JSONB) - Flexible profile data
- `profile_source` (text) - Default: 'ai_seed'
- Timestamps: `created_at`, `updated_at`

**RLS Policies:**
- Users can insert/update/view their own row
- Keyed by `auth.uid()`

---

### 2. **investor_profiles**
**Purpose:** Detailed investor profile with AI-generated content

**Key Fields:**
- `id` (UUID) - Primary key
- `user_id` (UUID) - References `auth.users(id)`
- `name`, `email`, `age`, `phone_country_code`, `phone_number`, `organisation`
- `derived_context` (JSONB) - Enrichment data
- `investor_profile` (JSONB) - AI-generated profile (12 fields)
- `is_ai_prefilled` (boolean) - Default: true
- `user_confirmed` (boolean) - Default: false
- `confirmed_at` (timestamp)
- `slug` (text) - Added later for public profiles
- Timestamps: `created_at`, `updated_at`

**RLS Policies:**
- Users can insert/update/view their own profile
- Keyed by `user_id = auth.uid()`

---

### 3. **investor_agents**
**Purpose:** Agent configuration for each investor

**Key Fields:**
- `id` (UUID) - Primary key
- `user_id` (UUID) - References `auth.users(id)`
- `slug` (text) - References `investor_profiles(slug)`
- `public_prompt` (text) - Agent system prompt for public
- `private_prompt` (text) - Agent system prompt for private
- `autonomy_enabled` (boolean) - Auto-respond feature
- `reply_style` (text) - 'short', 'medium', 'long'
- `reply_tone` (text) - 'casual', 'professional', 'formal'
- Timestamps: `created_at`, `updated_at`

**RLS Policies:**
- Users can CRUD their own agent
- Auto-provisioned when `investor_profiles.user_confirmed = true`

---

### 4. **agent_messages**
**Purpose:** Conversation history for agent chats

**Key Fields:**
- `id` (UUID) - Primary key
- `user_id` (UUID) - References `auth.users(id)`
- `slug` (text) - Investor slug
- `mode` (text) - 'public' or 'private'
- `visitor_id` (UUID) - For anonymous public visitors
- `role` (text) - 'user', 'assistant', 'system', 'tool'
- `content` (text) - Message content
- `metadata` (JSONB) - Additional context
- `created_at` (timestamp)

**RLS Policies:**
- Users can view/insert their own messages
- Separate policies for public vs private mode

---

### 5. **public_chat_messages** (From migration 20251204150116)
**Purpose:** Public chat messages (likely similar to agent_messages)

---

### 6. **background_tasks** (From migration 20251204220000)
**Purpose:** Background task queue/management

---

## Authentication Setup

**Auth Provider:** Supabase Auth
- Email/password authentication
- Google OAuth
- Apple OAuth
- Email verification required
- User data stored in `auth.users` (Supabase managed)

---

## Current Authentication Flow

1. **Sign Up** → Creates user in `auth.users`
2. **Email verification** → Required before login
3. **Sign In** → Returns session + user_id
4. **Redirect** → Currently to `/hushh-user-profile`

---

## Observations for Onboarding Flow

### What Exists:
✅ Multiple profile tables (`members`, `investor_profiles`)  
✅ Rich user data collection (name, age, phone, organization)  
✅ JSONB fields for flexible data (`profile`, `derived_context`, `investor_profile`)  
✅ RLS policies properly configured  
✅ Auto-provisioning triggers (agent creation)  

### What's Missing:
❌ No dedicated `user_onboarding` or onboarding progress table  
❌ No tracking of onboarding step completion  
❌ No onboarding-specific fields in existing tables  
❌ Multiple profile tables suggest need for consolidation or clear flow  

---

## Recommendations for New Onboarding Flow

### Option 1: Create New `user_onboarding` Table
**Pros:**
- Clean separation of concerns
- Easy to track progress
- Can be deleted after onboarding complete

**Cons:**
- Additional table to maintain
- Need to merge data into final profile table

### Option 2: Extend Existing Tables
**Pros:**
- Reuse existing structure
- Less data migration needed

**Cons:**
- Mixing onboarding state with profile data
- Could get messy with multiple tables

### Recommended Approach:
**Create `user_onboarding` table** that:
1. Stores step-by-step data collection
2. Tracks current_step, completed_steps, is_complete
3. Uses JSONB for flexible step data
4. Merges into appropriate table (members/investor_profiles) on completion

---

## Next Steps

1. **Get first design screen** from you
2. **Create `user_onboarding` migration** with initial schema
3. **Build onboarding components** step-by-step
4. **Implement logic** to route users through flow
5. **Test across devices**

---

**Ready to proceed!** 
Please share the first onboarding screen design and I'll start building.
