# Hushh CTA Color & Button Guidelines

This document standardizes how we design and implement **primary CTA buttons** across the Hushh web experiences (marketing site, investor profile, dashboards, etc.).

---

## 1. Primary CTA

**Use for:** Main action on a page or section (e.g., "Create Your Hushh ID →", "Start Now", "Continue").

### 1.1 Colors

- **Background (gradient)**  
  - `from`: `rgb(0, 169, 224)` → hex `#00A9E0`  
  - `to`: `rgb(109, 211, 239)` → hex `#6DD3EF`  
  - Direction: `linear-gradient(to right, rgb(0, 169, 224), rgb(109, 211, 239))`

- **Text color**  
  - Always `#FFFFFF` (white)

- **Shadow**  
  - Default: `0 10px 25px rgba(0, 169, 224, 0.35)`  
  - Hover: `0 12px 30px rgba(0, 150, 200, 0.45)`  
  - Active: `0 6px 18px rgba(0, 120, 170, 0.45)`

### 1.2 Shape & Layout

- Border radius: **full pill** (`9999px` / Chakra `borderRadius="full"`)
- Height: Chakra `size="lg"` equivalent
- Minimum width:
  - Full-width on mobile forms (`w="100%"`)
  - Auto width in hero/marketing sections unless otherwise specified
- Font:
  - Weight: `font-weight: 700` (bold)
  - Size: match surrounding hierarchy, typically `md` / `lg`

---

## 2. Implementation Examples

### 2.1 Chakra UI (preferred for app flows)

**Primary CTA Button (standard)**

```tsx
import { Button } from "@chakra-ui/react";

function PrimaryCtaButton(props) {
  const { children = "Create Your Hushh ID →", ...rest } = props;

  return (
    <Button
      type="button"
      size="lg"
      borderRadius="full"
      fontWeight="bold"
      bgGradient="linear(to-r, rgb(0, 169, 224), rgb(109, 211, 239))"
      color="white"
      boxShadow="0 10px 25px rgba(0, 169, 224, 0.35)"
      _hover={{
        bgGradient: "linear(to-r, rgb(0, 150, 200), rgb(90, 195, 230))",
        boxShadow: "0 12px 30px rgba(0, 150, 200, 0.45)",
        _disabled: {
          bgGradient: "linear(to-r, rgb(0, 169, 224), rgb(109, 211, 239))",
          boxShadow: "0 10px 25px rgba(0, 169, 224, 0.35)",
        },
      }}
      _active={{
        transform: "scale(0.98)",
        boxShadow: "0 6px 18px rgba(0, 120, 170, 0.45)",
      }}
      _focusVisible={{
        outline: "2px solid rgba(0, 169, 224, 0.9)",
        outlineOffset: "2px",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
```

**Usage examples**

```tsx
// Hero CTA
<PrimaryCtaButton>
  Create Your Hushh ID →
</PrimaryCtaButton>

// Form submit CTA (full width)
<PrimaryCtaButton type="submit" width="100%">
  Create Your Hushh ID →
</PrimaryCtaButton>
```

> When using Chakra: **do not** also add Tailwind classes for background on this button. Let Chakra handle styling for consistency.

---

### 2.2 Tailwind (for pure Tailwind sections)

Use this when the component is not using Chakra (e.g., some marketing/landing areas):

```tsx
<button
  type="button"
  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#00A9E0] to-[#6DD3EF] px-6 py-3 text-sm md:text-base font-semibold text-white shadow-[0_10px_25px_rgba(0,169,224,0.35)] transition-transform transition-shadow hover:shadow-[0_12px_30px_rgba(0,150,200,0.45)] hover:scale-[1.01] active:shadow-[0_6px_18px_rgba(0,120,170,0.45)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00A9E0]">
  Create Your Hushh ID →
</button>
```

---

## 3. States & Accessibility

- **Hover:** Slightly darker gradient + stronger shadow, subtle scale up.
- **Active/Pressed:** Slightly smaller scale `scale(0.95–0.98)` and reduced shadow.
- **Disabled:** Keep same base gradient but reduce opacity if needed; do **not** change text color.
- **Focus-visible:** Always show a clear outline or ring for keyboard users (Chakra `_focusVisible`, Tailwind `focus-visible:*`).

Screen readers:
- Label CTAs with clear, action-focused text (e.g., "Create Your Hushh ID", "Confirm Investor Profile").
- Avoid icon-only CTAs unless you provide `aria-label`.

---

## 4. Usage Rules

1. **One primary CTA per view**  
   - Each page/section should have a single dominant primary CTA using this gradient.

2. **Consistency across products**  
   - Home page, investor profile, and Hushh ID flows must all use this same primary CTA style.

3. **Do not mix styles**  
   - Avoid using a different color/button style for actions with the same importance level.

4. **Secondary actions**  
   - Use subtle outlined or neutral buttons (gray/ghost) for secondary actions like "Back", "Skip", or "Maybe later".

---

This guideline should be the single source of truth for CTA color and style. When creating a new CTA, start from these examples so the experience remains consistent across the entire Hushh ecosystem.
