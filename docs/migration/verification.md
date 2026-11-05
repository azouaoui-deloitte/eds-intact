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
| S03 product list | 880 / 909 | now built on the Product Feature component `i-products` (see « Product Feature » below): 909 / 909 against `Property 1=desktop` | the page frame used the older `product list v2` (56/56 titles, 16 px eyebrow) |
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
| S03 product list | 1.1 % (vs `i-products` desktop) | text |
| S04 cards | 2.2 % | text |
| S05 side by side | 1.5 % | text |
| S06 FAQ | 2.4 % | text |
| S07 side by side | 1.2 % | text |
| S08 partnerships | 4.8 % | text + images 3 and 4 (in Figma the photos start 11 px / 24 px below their frame top, showing the frame's own background image — not reproduced) |
| S09 quote banner | 1.2 % | text |

Images are the Figma image fills cropped to the exact visible window of each Figma node (imageTransform or child
rectangle), so `object-fit: cover` reproduces the Figma framing while staying authorable in the DAM.

## Fallback fonts (calibrated on the Figma text runs)

Without the licensed Intact Sans / Serif files, `styles/styles.css` declares one fallback face per weight
(a weightless face makes Chrome synthesise bold from Arial Regular). `size-adjust` = median of
(Figma hug width − letter-spacing × characters) / local width over the single-line hug-width text nodes of the page
frame; ascent / descent overrides keep the local face's ascent + descent and place the baseline like the Intact faces
(ascent − descent = 0.774 em Sans, 0.806 em Serif; Chrome multiplies the overrides by `size-adjust`).

| Face | Local font | size-adjust | ascent-override | descent-override | line-gap |
|---|---|---|---|---|---|
| Intact Sans 400 | Arial | 100.8 % | 94.25 % | 17.45 % | 0 |
| Intact Sans 500 | Arial Bold | 94.4 % | 96.85 % | 14.85 % | 0 |
| Intact Sans 600 | Arial Bold | 93.8 % | 97.1 % | 14.6 % | 0 |
| Intact Sans 700 | Arial Bold | 95.7 % | 96.3 % | 15.4 % | 0 |
| Intact Serif 400–500 | Georgia | 104.9 % | 95.2 % | 18.4 % | 0 |

Effect on the AEM render at 1440 (boxes ±3 px / pixels differing):

| Section | Before | After |
|---|---|---|
| S01 header (i-nav) | 9/18, 4.5 % | 18/18, 3.2 % |
| S10 footer (i-footer) | 19/30, 4.0 % | 25/30, 3.2 % |
| S02 hero | 2.27 % | 1.86 % |
| S03 product list | 2.35 % | 1.49 % |
| S04 cards | 2.24 % | 1.79 % |
| S05 side by side | 1.53 % | 1.14 % |
| S06 FAQ | 2.43 % | 2.27 % |
| S07 side by side | 1.19 % | 0.73 % |
| S08 partnerships | 4.81 % | 4.79 % |
| S09 quote banner | 1.15 % | 0.57 % |
| Page boxes S02–S09 | 53/54 | 53/54 |

Remaining misses, Figma-intrinsic: footer `col1` height (frame fixed at 172 while its links end at 286), SOCIAL
MEDIA / DOWNLOAD THE APP label boxes (stale instance boxes 72 / 105, their render bounds 82 / 118 match ours).
(The former S03 +5 is gone: the section now follows `i-products`.) Font residuals: legal « Sitemap » x +3.8 (sum of Figma's
integer-rounded hug widths along the row) and the last related link width +3.1.

## Other viewports (no Figma frame — tokens of the Global-Responsive modes)

`import-work/verify/responsive-modes.mjs` on the AEM render (14 widths, 320 → 1920): the 23 variables redefined by
the `tokens.css` modes resolve to the mode of each width, no horizontal overflow, no text outside a clipping box, no
overlapping text runs — 14/14 pass after the header, product list, footer and accordion changes.

| Width | Tokens | Overflow / clip / overlap | Layout |
|---|---|---|---|
| 320, 375, 600, 743 | mobile mode (padding 16) | none | burger + CTA, 1 card column, product rows `.intact-products-mobile` (pictogram 40, title, description, chevron), footer 1 column |
| 744, 1023 | 744 mode (padding 40) | none | 2 card columns, product rows as `i-products` Property 1=mobile, footer 2 columns |
| 1024, 1199, 1200, 1439 | 1024 mode (padding 64) | none | nav links + burger, 3 card columns, product rows `.intact-products-desktop` with hover reveal, footer 3 columns |
| 1440, 1680, 1919 | 1440 mode (padding 96) | none | full nav (links, search, CTA), product list 1036 wide, footer 4 columns |
| 1920 | 1920 mode (padding 252, Figma 1920 frames) | none | as 1440, product list 1172 wide (`i-products` page instance) |

Components switch at the Figma breakpoints only (744 / 1024 / 1440 / 1920); the boilerplate `columns` block
(900 px) is not used on the page. The product list now has designer frames for 744 and 1440 (and a 1920 page
instance); 320–743 reuses the 744 composition with the 16 px page padding (no 375 frame in the component).

## States

`import-work/verify/states-figma.mjs` on the AEM render: 88/88 checks (computed styles after real hover, keyboard
focus — `:focus-visible` — and clicks), montages `montage-buttons.png` / `montage-header-footer.png` next to the
cached Figma variant renders (`import-work/figma/renders/states/`). Expected values come from the variant nodes
(`import-work/figma/states-expected.json`). Sources: **Figma** = variant in the library; **prod** = intact.ca
behaviour (headful Chrome); **PROVISIONAL** = no design, built from the library tokens.

| Element | States | Source | Verified |
|---|---|---|---|
| `i-button` Primary / Secondary / Tertiary / Secondary-reversed / Tertiary-reversed × 40 / 56 | Default, Hover, Focus (2 px ring, 2 px gap, radius 6, colour of the type), Disabled | Figma | 40/40 fixtures + 18 page buttons |
| Button transitions | colour 0.25 s ease, none under reduced motion | prod (Figma: instant) | pass |
| Hero, FAQ, partnerships, side-by-side CTAs | as their `i-button` type | Figma | pass |
| Product list rows (≥ 1024) | `.intact-products-desktop` Default → hover: the row's own illustration fades in and moves from the left edge to the centre of its 181 px column, description fades in; focus = hover + 2 px black inset ring, radius 8; Smart animate Gentle 0.511 s on left / transform / opacity; row 1 revealed by default as in the `i-products` page instance | Figma (Dev Mode `40014949:58524`) | pass (6 rows × hover / focus + keyboard) |
| Product list rows (< 1024) | `.intact-products-mobile`: always-visible pictogram, description and chevron; no hover variant in Figma, keyboard focus uses the desktop ring | Figma + PROVISIONAL (focus) | pass |
| Cards CTA (Tertiary-reversed on the image) | Hover `#ede6df`, white focus ring | Figma | pass |
| Cards | image zoom 1.04 over 0.51 s on hover / focus-within | PROVISIONAL (prod tiles animate 0.5 s) | pass |
| FAQ accordion | question 18/24 bold `#1a1a1a`, 24 px icon, 73 px between collapsed items as `i-accordion` / `i-accordion-atom` (Collapsed / Expanded: `−` icon, body, divider); items open independently (native `details`), `+` → `−` with 180° turn 0.25 s, height transition (`::details-content`), focus ring, Enter / Space | Figma (atom states) + PROVISIONAL (motion, hover underline, single vs multiple) | pass (1440, 375 incl. 2-line questions) |
| Tags | `.hero-tag` = `i-tag` Size=32 Default / Reversed (32 px, pill, 12 px inset, `#1a1a1a26` / `#ffffff33` stroke, 16 px regular); not instanced on this page; the cards « New » label is the page frame's hand-built 11/11 uppercase label, not an `i-tag` | Figma | CSS matches the variant spec |
| Marquee | continuous motion, pause on hover / focus, static under reduced motion | Figma (motion) + PROVISIONAL (pause) | pass |
| Line selector (Personal / Business / Prestige) | Default, Active and Hover 20 % white, Focus 1 px white ring inset 2 | Figma | pass |
| Nav links | Hover 10 % gold pill, label + 8 px per side, radius 8 | Figma (`i-text-button` Hover) | pass |
| Nav CTA | i-button Primary Hover / Focus (red ring) | Figma | pass |
| Header Default / Scrolled | top bar out, 64 px bar, white 80 % + background blur 48 (CSS 24 px); back to Default at the top | Figma (`i-nav`) | pass |
| Search | opens with `aria-expanded`, focus in the field, Escape closes and returns focus | PROVISIONAL | pass |
| Mobile burger drawer (375) | `aria-expanded`, focus inside, scroll lock, Escape + focus back to the burger | PROVISIONAL | pass |
| Footer links | Intact `i-text-button` Reversed (the page frame used the Belair `b-text-button`): Hover 20 % white pill 32 px high, label + 8 px per side, radius 8, no underline; Focus pill radius 6 + 2 px white ring 2 px outside; 0.25 s | Figma (`40000426:3649`) + prod timing | pass |
| Footer legal links, related links | underline removed on hover | PROVISIONAL | — |
| Legal notes toggle | `aria-expanded`, panel shown, chevron turns 180° | prod (content) + PROVISIONAL (chevron) | pass |
| Province / language | FR link, QC control, hover 20 % white | Figma (line selector) + PROVISIONAL (action) | pass |

Production (intact.ca, headful Chrome): buttons and nav 0.25 s, tiles box-shadow 0.5 s, text links colour 0.5 s,
accordion and footer without transitions; the production header is not sticky (the Figma Scrolled state is kept).

## Product Feature (Figma Dev Mode `40014949:58524`, `i-products`)

Source cached in `import-work/figma/behavior/product-feature/` (2 nodes calls + 2 images calls): the page instance
(1920), the `i-products` set (Property 1=desktop 1440 / mobile 744), `.intact-products-desktop` (6 products ×
Default / hover / focus × Illustration True / False, prototype ON_HOVER → CHANGE_TO, Smart animate Gentle 0.511 s) and
`.intact-products-mobile` (6 products); SVG exports of the 6 hover illustrations and 6 mobile pictograms, PNG renders
of every variant. Harness: `import-work/verify/product-feature-sxs.mjs` — 24/24 geometry checks (±3 px).

| Variant | Implemented as | Geometry | Pixels differing |
|---|---|---|---|
| page instance (1920, car hovered) | ≥ 1920: padding 96, content 1172, row 1 revealed | pass | 1.4 % |
| Property 1=desktop (1440) | ≥ 1024: padding 80, eyebrow 20/24, gap 48, content 1036, rows 112, titles 48/52 −1 | pass | 1.1 % |
| `.intact-products-desktop` Default × 6 | illustration and description at opacity 0, illustration left-aligned | pass | 1.0–2.9 % |
| `.intact-products-desktop` hover × 6 | illustration centred in its 181 px column (x 29–47, y 13–18 as Figma), description at x = row − 181, y 29 (54 px frame) | pass | 2.1–4.5 % |
| `.intact-products-desktop` focus × 6 | hover + `inset 0 0 0 2px #000`, radius 8 | pass | as hover |
| Property 1=mobile (744) / `.intact-products-mobile` | < 1024: padding 56, gap 32, content 664, rows 104 + 1 px divider, pictogram 40, title 24/28 (instance override of the set's 32/36), description 14/20, chevron 12 | pass | 2.2 % |
| 1024 / 320 / 375 | desktop row fits 896; mobile rows without overflow | pass | — |

Hover images (DAM, `reveal_image` field of the product item, UE-editable): `/content/dam/intact/personal-insurance/products/illustration-{car,house,commercial-vehicle,rv,condo,business}.svg`;
mobile pictograms (`image` field): `…/products/pictogram-{…}.svg`. The item model groups `reveal_image` +
`reveal_description` (xwalk element grouping, 4 cells); existing items received the new `modelFields`.
Copy: the business row description now uses the `i-products` text. Remaining pixel differences are text
(fallback fonts) and the illustration exports (Figma clips the car frame at 116 × 76, the SVG export is 122 × 80).

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
| Element boxes 1440 | 53/54 against the page frame; S03 now checked against `i-products` (24/24, see Product Feature) |
| Visual diff 1440 | S02–S09 0.6–2.3 %, S08 4.8 % |
| Overflow 375 / 768 / 1024 / 1440 | none |
| Button / product row / accordion states | pass |
| axe `main` | 0 violations |
| Header 1440 (i-nav) | 18/18 boxes, 3.2 % diff (calibrated fallback fonts) |
| Footer 1440 (i-footer) | 25/30 boxes, 3.2 % diff — 3 Figma-intrinsic, 2 font residuals (see Fallback fonts) |
| States | 88/88 (see States), tags / accordion 2/2 |
| Responsive 320 → 1920 | 14/14 widths |

Two AEM-only defects were found and fixed: the boilerplate `editor-support-rte.js` wrapped richtext in an extra
`div` (hero button group and centred copy lost their `> p` selectors), and AEM drops an empty `imageAlt` (hero and
side-by-side images rendered without `alt`). Two more were found with the product list: the item renderer builds
cells from the `modelFields` stored on each item (written when the item was created), so a model change needs those
values updated on existing items; and the boilerplate `wrapTextNodes` moves a text cell's `data-aue-*` onto an inner
`<p>`, so the product title, FAQ question and card tag lost their UE instrumentation when the block rebuilt the cell —
fixed, every authored field of the page is instrumented again.

## Universal Editor

`/update` round-trip through a temporary UES (port 8010, IMS validation disabled): page `jcr:title` (text), hero
`text` (richtext) and hero `classes` (select) all returned 200 and were persisted in the JCR, then reverted the same
way (AEM re-serialises the richtext with newlines between block elements; no rendering change). The temporary UES
was stopped; the editor keeps using `https://127.0.0.1:8000`.
