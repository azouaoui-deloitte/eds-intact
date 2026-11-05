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

## Library variants (`import-work/content/intact/en/component-variants`, local test page)

Rendered against the main component variants (`import-work/figma/renders/variants/`, REST render of the 15 variant nodes)
with Figma copy and solid placeholders of the same colour as the Figma image placeholders.

| Variant | Height | Image / container box | Visual diff |
|---|---|---|---|
| side by side Default × Image Left / Right | 692 / 692 | Δ 0 | 1.3 % |
| side by side In Container × Image Left / Right | 740 / 740 | Δ 0 | 1.2 % |
| side by side Thirds × Image Left / Right | 677 / 677 | Δ ≤ 0.8 | 0.8 % |
| hero Left on image, Center on image, In container, Half | 700 / 700 | Half image Δ 3 | 2.0–4.7 % |
| hero Center full-width image | 1234 / 1240 | Δ 0 | 0.8 % |
| hero Center on solid, Simple, Simple with illustration | −78, −68, +6 | — | 3.5–11 % |

Remaining deltas are font- or content-driven: with the fallback serif the 64 px headline fits on one line where the
Figma (Intact Serif) wraps to two (−68 px), and the test content omits the library-only list (`i-listcolumn`),
breadcrumbs and contest notes.

## AEM render (`https://localhost:8444/content/intact/en/personal-insurance.html`)

Same harnesses, run on the local author render (UE instrumentation and `editor-support.js` active):

| Check | Result |
|---|---|
| Element boxes 1440 | 53/54 (S03 +5, Figma content) |
| Visual diff 1440 | S02–S09 1.2–2.4 %, S08 4.8 % |
| Overflow 375 / 768 / 1024 / 1440 | none |
| Button / product row / accordion states | pass |
| axe `main` | 0 violations |
| Header 1440 (i-nav) | 9/18 boxes, all failures are text widths (fallback font); 4.5 % diff |
| Footer 1440 (i-footer) | 19/30 boxes, text widths + `col1` height (Figma frame fixed at 172 while its links end at 286) ; 4.0 % diff |
| Header / footer states | 25/25 (line selector, hover, focus order, search, Scrolled, drawer, legal notes, axe) |

Two AEM-only defects were found and fixed: the boilerplate `editor-support-rte.js` wrapped richtext in an extra
`div` (hero button group and centred copy lost their `> p` selectors), and AEM drops an empty `imageAlt` (hero and
side-by-side images rendered without `alt`).

## Universal Editor

`/update` round-trip through a temporary UES (port 8010, IMS validation disabled): page `jcr:title` (text), hero
`text` (richtext) and hero `classes` (select) all returned 200 and were persisted in the JCR, then reverted the same
way (AEM re-serialises the richtext with newlines between block elements; no rendering change). The temporary UES
was stopped; the editor keeps using `https://127.0.0.1:8000`.
