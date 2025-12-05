# Pull Request: Update Homepage Typography and IRR Targets

## Branch
- **From:** `feat/privacy-toggle-system`
- **To:** `main`

## Summary
Updated homepage Hero component with lighter typography and revised IRR targets for a cleaner, more modern appearance.

## Changes Made

### 1. Typography Updates
- ✅ Reduced all font weights to maximum 500 across Hero component
- ✅ Main heading: 700 → 500
- ✅ All CTA buttons: 650 → 500
- ✅ "Fund A: Genesis" section heading: 700 → 500
- ✅ "Targeting IRR" text: 650 → 450 (with nested span 700 → 500)
- ✅ Stat values (IRR%, Year): 750 → 500
- ✅ "Ready to Transform" heading: 700 → 500
- ✅ WhyChooseSection advantage titles: 650 → 450
- ✅ WhyChooseSection main heading: 700 → 500

### 2. IRR Target Update
- ✅ Changed target IRR from **15-20%** to **18-23%**
- Updated in both:
  - Main text: "Targeting 18-23% net IRR* with our 'Sell the Wall' approach."
  - Stat card display: "18-23%"

## Files Modified
- `src/components/Hero.tsx`
- `src/components/WhyChooseSection.tsx`

## Testing
- ✅ All changes tested on localhost:5173
- ✅ Responsive design verified on multiple screen sizes
- ✅ Typography hierarchy maintained
- ✅ No font weight exceeds 500 as per requirement
- ✅ All buttons and interactive elements functioning correctly

## Visual Impact
- **Lighter Typography:** Cleaner, more modern appearance with reduced boldness
- **Better Readability:** Consistent font weights improve text hierarchy
- **Updated IRR Targets:** Reflects revised projections (18-23% vs 15-20%)
- **Professional Polish:** Maintains brand identity while improving visual refinement

## Commits Included
1. Reduce font weights in Hero component (main heading and top CTA buttons)
2. Reduce font weights in WhyChooseSection
3. Reduce font weights in Fund A Genesis section
4. Reduce all remaining font weights to max 500 in Hero component
5. Update IRR target from 15-20% to 18-23%

## Deployment Notes
- No breaking changes
- No database migrations required
- No environment variable changes needed
- Safe to merge and deploy immediately

## Screenshots
Review the changes on the deployed preview or localhost:5173

---

## How to Create This PR on GitHub

1. Go to: https://github.com/DamriaNeelesh/hushhTech/compare/main...feat/privacy-toggle-system
2. Click "Create Pull Request"
3. Copy and paste this description
4. Review changes and merge when ready
