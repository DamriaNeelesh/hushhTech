# User Registration and Authentication Flow

## Overview
This document describes the automatic registration checking system implemented in the Hushh Tech application.

## Flow Description

### 1. User Login (Email or Google)
- User logs in via email/password or Google OAuth
- System authenticates the user with Supabase Auth

### 2. Registration Status Check
- After successful authentication, the system automatically checks if the user has completed their profile registration
- This check uses the search API: `GET /users?or=(email.ilike.*{email}*)`
- The system looks for:
  - Whether the user exists in the users table
  - Whether the user has a `hushh_id` (indicating complete registration)

### 3. Automatic Redirection
- **If user is NOT registered or has no `hushh_id`**: Redirects to `/user-registration`
- **If user IS fully registered**: Redirects to home page or intended destination

### 4. Protected Routes
- All protected routes are wrapped with `ProtectedRoute` component
- This component automatically checks authentication and registration status
- Redirects to appropriate page if user is not authenticated or registered

## Implementation Details

### Key Files Created/Modified:

1. **`src/services/authentication/checkRegistrationStatus.ts`**
   - Service function to check user registration status
   - Returns `RegistrationStatus` object with user data and registration state

2. **`src/components/ProtectedRoute.tsx`**
   - Wrapper component for protected routes
   - Checks authentication and registration status
   - Shows loading state during checks

3. **`src/services/authentication/emailLogin.tsx`**
   - Modified to check registration status after successful login
   - Automatically redirects based on registration state

4. **`src/services/authentication/googleSignIn.ts`**
   - Updated redirect URL to go through auth callback
   - Allows registration check after Google login

5. **`src/pages/AuthCallback.tsx`**
   - Enhanced to check registration status after OAuth login
   - Redirects appropriately based on user's registration state

6. **`src/pages/UserRegistration.tsx`**
   - Updated to handle `investor_type` field
   - Maintains existing update/create functionality

### Protected Routes:
- `/profile`
- `/community`
- `/community/*`
- `/reports/:id`
- `/kyc-verification`
- `/kyc-form`
- `/discover-fund-a`
- `/nda-form`
- `/user-profile`

### Registration Check Logic:
```typescript
// Check if user exists and has hushh_id
const registrationStatus = await checkRegistrationStatus(email);

if (!registrationStatus.isRegistered) {
  // Redirect to registration
  navigate('/user-registration');
} else {
  // User is fully registered, continue
  navigate('/');
}
```

## User Experience

1. **New User**: Login → Automatic redirect to registration → Complete profile → Access to full application
2. **Returning User (Incomplete Registration)**: Login → Automatic redirect to registration → Complete profile → Access to full application  
3. **Returning User (Complete Registration)**: Login → Automatic redirect to home page → Full access

## API Integration

The system uses the search API with the following endpoint:
- **Base URL**: `https://rpmzykoxqnbozgdoqbpc.supabase.co/rest/v1`
- **Search Endpoint**: `/users?or=(email.ilike.*{email}*)`
- **Headers**: Uses the same API key and headers as UserRegistration component

## Error Handling

- If registration check fails, system defaults to redirecting to registration page
- Loading states are shown during authentication and registration checks
- Errors are logged to console for debugging

This implementation ensures that all users complete their profile registration before accessing protected features of the application. 