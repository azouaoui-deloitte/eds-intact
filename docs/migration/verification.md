# Verification against Figma — `/content/intact/en/personal-insurance`

Reference: Figma frame `40004993:39823` (1440 only) and its section renders (`import-work/figma/renders/`).
Rendering: local EDS preview (`aem up`, port 3010) with the same code and content as the AEM package;
`prefers-reduced-motion: reduce` to freeze the marquee. Scripts: `import-work/verify/{verify-figma,visual-diff,responsive,states-a11y}.mjs`.

**Fonts:** Intact Sans / Intact Serif could not be obtained (licensed; production font URLs are behind AWS WAF).
Text is rendered with metric-adjusted fallbacks (Arial / Georgia), so text widths differ; line boxes, positions and
all non-text geometry are font-independent and are what the ±3 px check measures.

## Element boxes, 1440 (section-relative, ±3 px)

53 / 54 checks pass. Text elements are compared on line boxes (y, height) and left edge (or centre for centred
text); button widths that hug their label differ by 2–11 px because of the fallback font.

| Section | Section height Figma / rendered | Elements checked | Result |
|---|---|---|---|
| S02 hero | 700 / 700 | h1, group label, 3 buttons 56 px, phone | pass (Δ ≤ 2) |
| S03 product list | 880 / 885 | eyebrow, rows 1, 2, 6, pictogram box, titles, description | rows pass (Δ 0); **section +5**: the Figma content is 885 px inside an 880 px frame (clipped in Figma) |
| S04 cards | 817 / 817 | heading, 3 cards, card text, CTA 48 px, « New » tag | pass (Δ ≤ 1) |
| S05 side by side (Default, Image Right, burgundy) | 692 / 692 | heading, body, CTA, illustration (Figma imageTransform) | pass (Δ 0) |
| S06 FAQ (split) | 494 / 494 | heading, CTA, items 1 and 5, question, + icon | pass (Δ 0) |
| S07 side by side (In Container, teal) | 740 / 740 | container, heading, body, CTA, image | pass (Δ 0) |
| S08 partnerships + marquee | 811 / 811 | logo, heading, body, CTA, images 1, 2, 4 | pass (Δ ≤ 0.3) |
| S09 quote banner (red) | 704 / 704 | heading, body, CTA | pass (Δ ≤ 0.5) |
| S01 header / S10 footer | — | AEM components in XFs, verified separately (aem-intact) | see header/footer report |

## Visual diff, 1440 (pixelmatch, threshold 0.2)

| Section | Pixels differing | Main cause |
|---|---|---|
| S02 hero | 2.3 % | text (fallback font) |
| S03 product list | 2.4 % | text |
| S04 cards | 2.2 % | text |
| S05 side by side | 1.5 % | text |
| S06 FAQ | 2.4 % | text |
| S07 side by side | 1.2 % | text |
| S08 partnerships | 4.8 % | text + images 3 and 4 (in Figma the photos start 11 px / 24 px below their frame top, showing the frame's own background image — not reproduced) |
| S09 quote banner | 1.2 % | text |

Images are the Figma image fills cropped to the exact visible window of each Figma node (imageTransform or child
rectangle), so `object-fit: cover` reproduces the Figma framing while staying authorable in the DAM.

## Other viewports (no Figma frame — tokens of the Global-Responsive modes)

| Width | Horizontal overflow | Tokens (h1, h2, page padding, xl spacing) |
|---|---|---|
| 320 / 375 | none | 36/40, 32/36, 16, 48 — pass |
| 744 | none | 36/40, 32/36, 40, 48 — pass |
| 900 (in-between) | none | stacked layouts, no clipping |
| 1024 | none | 64/68, 56/56, 64, 56 — pass |
| 1200 (in-between) | none | two-column layouts, no clipping |
| 1440 | none | 64/68, 56/56, 96, 64 — pass |
| 1920 | none | content centred at 1248 / 1240 px |

Mobile / tablet layouts (stacking order, product list without hover, hero crop) are assumptions pending the
designer's frames (see `figma-vs-prod.md`, question 1).

## States (Figma variants)

| Figma variant | Rendered | Result |
|---|---|---|
| `i-button` Primary 56 Default `#df0030`, radius 8 | `rgb(223, 0, 48)`, 56 px, 8 px | pass |
| `i-button` Primary Hover `#9e0a26` | `rgb(158, 10, 38)` | pass |
| `i-button` Secondary 40 Default, border `#1a1a1a` 2 px | border `rgb(26, 26, 26)`, 40 px | pass |
| `i-button` Secondary Hover `#94712a1a` | `rgba(148, 113, 42, 0.1)` | pass |
| `i-button` Secondary-reversed Default / Hover `#ffffff33` | transparent + white border / `rgba(255, 255, 255, 0.2)` | pass |
| `i-button` Focus (radius 6) | 2 px outline, radius 6 | pass |
| `product list v2` state=hover (pictogram + description) | row 1 shown as in the Figma; any hovered / focused row switches | pass |
| FAQ open state | not designed — `+` becomes `−`, answer from production | assumption |

## Accessibility (axe-core, WCAG 2.1 A/AA, `main`)

0 violations. Heading order H1 › H2 › H3; marquee is a focusable, labelled region and stops under
`prefers-reduced-motion`; FAQ uses native `details` / `summary`; decorative pictograms have empty alt.

## Universal Editor

Blocked until AEM Code Sync is enabled on `eds-intact` (AEM cannot load the component models from the code bus).
Pending: render through `https://localhost:8444`, `data-aue-*` instrumentation check, `/update` round-trip with a
temporary no-IMS UES, then revert.
