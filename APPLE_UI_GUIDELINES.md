# Apple-Inspired UI Guidelines (Hushh)

Practical tokens and patterns distilled from recent Apple references. Keep interfaces calm, readable, and intentional.

## Core Principles (Apple-style calm)
- Hierarchy first: Eyebrow → Headline → Body → Supporting points/stats → CTA.
- Generous whitespace: avoid crowding; keep lines ~60–70 characters.
- Minimal chrome: light borders, subtle dividers, restrained shadows.
- One accent per view: System Blue for links/icons; everything else neutral.
- Consistency beats decoration: reuse spacing, sizes, and type scales.
- Simplicity over flair: no extra frames, gradients only when purposeful, one focal point per screen.

## Typography
- Font: `-apple-system, BlinkMacSystemFont, 'SF Pro Display/Text', 'Segoe UI', sans-serif`.
- Headings: 30–48px, weight 600–700, line-height ~1.05–1.12, slight negative tracking (-0.015em).
- Body: 16–18px, weight 400, line-height 1.5–1.6, color #4A4A4F–#515154.
- Eyebrow/meta: 12–13px, all-caps, tracking 0.12–0.14em, weight 600–700, color #8E8E93.
- Stats: 22–28px, weight 700; label above in 11–12px uppercase, muted.

## Color Tokens
- Background: #F5F5F7 / #F7F7F9. Surfaces: white or very light gray (#F9FAFB).
- Text primary: #1D1D1F; secondary: #4A4A4F–#515154; tertiary/helper: #8E8E93.
- Accent: System Blue #0A84FF (links, icons, pills). Gradients only when purposeful.
- Dividers/borders: #E5E5EA at low opacity.

## Spacing & Layout
- Section padding: 24–32px (mobile) up to 48px (desktop); consistent gutters.
- Vertical rhythm: 12–20px between related items; larger gaps (28–40px) between sections.
- Max width: Constrain copy blocks (~720–840px) and lists (~540–640px) for readability.
- Alignment: Center for hero/intros; left-align for dense text and lists.

## Cards & Surfaces
- Prefer open layouts; if using cards: radius 18–24px, 1px border #E5E5EA, light shadow (e.g., 0 10–20px rgba(0,0,0,0.06)).
- Use separators inside cards instead of heavy outlines; keep padding 20–28px.

## Lists & Rows
- Prefer stacked statements when there are only a few lines—skip bullets unless you need quick scanability.
- Bullets (when used): simple blue dot with ample line-height; left-aligned text. For emphasis, a light pill with subtle shadow is acceptable—but default to plain dots to keep it clean.
- Numbered lists: decimal, consistent indent; keep line-height ~1.5; keep wraps aligned and breathing room between items.
- Newsroom rows: image thumb with 16–20px radius, eyebrow label, title, date, thin divider between rows, comfortable vertical padding.

## CTAs
- Shape: pill/rounded-full; text 16–17px, weight 600.
- Padding: ~14–16px vertical, generous horizontal.
- Styling: default to flat blue; gradients only when purposeful. Shadow subtle (e.g., 0 14–18px rgba(0,169,224,0.22–0.30)).

## Imagery
- Rounded corners (16–24px). One focal image per row/section; avoid clutter.
- Maintain clear margins; let images breathe with surrounding whitespace.

## Links & Accents
- Blue links (#0A84FF/#0071E3), underlined on hover/tap; do not overuse color.
- Icons: minimal, single-color; size 16–20px; align to text baseline.

## Dividers & Shadows
- Dividers: #E5E5EA at 40–70% opacity; use to separate rows, not to box content.
- Shadows: faint and soft; avoid harsh drop-shadows. Glows only for emphasis.

## Footnotes/Legal
- 12–13px, muted gray, optional italic; separated by whitespace from main body.

## Responsive & Accessibility
- Touch targets ≥44px height. Maintain readable sizes on mobile (no sub-16px body).
- Respect prefers-reduced-motion; keep animations subtle and short.
- Contrast: ensure text on light backgrounds meets accessibility guidelines.

## Example Patterns
- Hero/Intro: Eyebrow → concise headline → 1-sentence body → 3 key points (simple bullets) → primary CTA; avoid heavy cards.
- Stat callout: Small label + large number with supporting line beneath; optionally paired in a two-up layout with thin dividers.
- Newsroom list: Thumb → eyebrow → title → date; thin divider; generous padding; keep text left-aligned.
- Long-form copy: Left-aligned paragraphs with 1.5–1.6 line-height, paragraph spacing, blue links as the sole accent; no borders or card chrome.
- Legal/footnotes: Muted, small, separated by whitespace; don’t crowd the main narrative.
