# Pull Request: Sell the Wall Page, IRR Update, Chat Privacy Fix & Tagline Update

## Summary
This PR introduces multiple enhancements to the Hushh website including a new Sell the Wall page, updated fund metrics, improved chat assistant privacy logic, and comprehensive tagline updates.

## Changes

### 1. 🎯 New Sell the Wall Page
- Created full-screen Gamma iframe integration at `/sell-the-wall`
- Positioned below navbar (top: 64px) for seamless viewing
- Enabled fullscreen functionality for immersive presentation
- URL: https://gamma.app/embed/ya0impa0panawof

**File Created:**
- `src/pages/sell-the-wall/index.tsx`

### 2. 📊 Target Net IRR Update
- Updated Fund A Target Net IRR from **69% to 18-23%** on discover-fund-a page
- Reflects more realistic and sustainable return projections
- Updated all related documentation and displays

**Files Modified:**
- `src/pages/discover-fund-a/index.tsx`

### 3. 🔗 Enhanced Navigation
- Made "Sell the Wall" text clickable on:
  - Home page (Hero section)
  - Discover Fund A page
- Links open in new tab for better user experience
- Added proper hover effects and styling

**Files Modified:**
- `src/components/Hero.tsx`
- `src/pages/discover-fund-a/index.tsx`

### 4. 🔒 Chat Assistant Privacy Fix
- Fixed investor profile chat assistant to show address/country data by default
- Changed privacy logic from opt-in to opt-out model
- **Before**: `isVisible = privacyData[fieldName] === true` (strict opt-in)
- **After**: `isVisible = privacyData[fieldName] !== false` (default visible unless explicitly hidden)
- Deployed to Supabase edge function: `investor-chat`

**Files Modified:**
- `supabase/functions/investor-chat/index.ts` (line 74)

### 5. 📝 Company Tagline Update
- Updated tagline from "build exceptional businesses" to "**invest in** exceptional businesses"
- Created comprehensive update script that searches across entire codebase
- Updated 7 files with 14 total occurrences:
  - `src/pages/discover-fund-a/index.tsx`
  - `src/pages/Login.tsx`
  - `src/pages/Signup.tsx`
  - `src/components/profile/profilePage.tsx`
  - Script files for consistency

**Files Modified:**
- `src/pages/discover-fund-a/index.tsx`
- `src/pages/Login.tsx`
- `src/pages/Signup.tsx`
- `src/components/profile/profilePage.tsx`
- `scripts/replace-tagline.cjs`
- `scripts/update-tagline-invest.cjs`
- `scripts/update-tagline-comprehensive.cjs`

**Scripts Created:**
- `scripts/update-tagline-comprehensive.cjs` - Automated tagline update across entire codebase

## Technical Details

### All Files Modified/Created
1. **New Files:**
   - `src/pages/sell-the-wall/index.tsx`
   - `scripts/update-tagline-comprehensive.cjs`

2. **Modified Files:**
   - `src/pages/discover-fund-a/index.tsx`
   - `src/components/Hero.tsx`
   - `supabase/functions/investor-chat/index.ts`
   - `src/pages/Login.tsx`
   - `src/pages/Signup.tsx`
   - `src/components/profile/profilePage.tsx`
   - `scripts/replace-tagline.cjs`
   - `scripts/update-tagline-invest.cjs`

## Testing Checklist
- ✅ Sell the Wall page loads correctly with Gamma iframe
- ✅ Fullscreen functionality works
- ✅ Navigation links properly redirect to `/sell-the-wall`
- ✅ IRR displays updated values (18-23%)
- ✅ Chat assistant shows address/country data by default
- ✅ All tagline references updated consistently across the site
- ✅ Responsive design maintained across all devices
- ✅ No console errors or warnings
- ✅ All existing functionality preserved

## Deployment Notes

### Critical: Supabase Edge Function Deployment
The chat assistant privacy fix requires deploying the updated edge function:
```bash
supabase functions deploy investor-chat
```

### Other Considerations
- All changes are backward compatible
- No database migrations required
- No breaking changes to existing APIs
- Static assets are optimized

## Commits
1. Initial implementation of Sell the Wall page with Gamma iframe
2. Updated Target Net IRR from 69% to 18-23%
3. Made "Sell the Wall" text clickable with proper navigation
4. Fixed chat assistant privacy logic to show data by default
5. Comprehensive tagline update from "build" to "invest in" exceptional businesses

## Screenshots
Refer to commit history for visual confirmation of changes.

## Related Issues
Addresses multiple feature requests and fixes for improved UX and accurate fund information display.

## Reviewer Notes
- Pay special attention to the privacy logic change in `investor-chat` edge function
- Verify the Gamma iframe displays correctly on different screen sizes
- Confirm the tagline updates maintain brand consistency
- Test the chat assistant with different privacy settings

---

**Branch:** `feature/sell-the-wall-ux-and-irr-update`  
**Target:** `main`  
**Author:** Ankit Kumar Singh
