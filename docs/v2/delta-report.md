# V2 (user stories) vs V1 (Figma only) — delta report

Page V1 `/content/intact/en/personal-insurance` vs V2 `/content/intact/en/personal-insurance-v2` (same template, same
authored content mapped into the story fields), rendered through `https://localhost:8444` (AEM author 4802 + local code).
Harness: `import-work/v2/{capture,probe,evaluate,delta,crops,xf-editor}.mjs`; shots in `import-work/v2/shots/`
(`<component>-<width>-v1|v2.png`, `<component>-<width>-sxs.png` = V1 | V2 | diff, `state-*`).

## 1. Compliance with the stories

| | V1 | V2 |
|---|---|---|
| All items (197 applicable / 202) | 56.6 % | 95.2 % |
| US-022 Intact Header Navigation (v5) | 63 % | 95.2 % |
| US-021 Intact Footer (v8) | 66.7 % | 95.2 % |
| US-023 Intact Hero Banner (v8) | 38.5 % | 95.1 % |

Per item: `docs/v2/user-stories-checklist.md`.

## 2. Render delta per component and viewport

Pixel % = pixelmatch (threshold 0.1) on the full-width component crop, aligned top-left (height differences count as
differing area). Geometry = elements matched by tag + label: moved / resized (> 1 px), added / removed; Δh = V2 − V1 height.
A11y = aria attributes, focusable elements, landmarks, axe-core violations (WCAG 2.2 AA) V1 → V2.

| Component | Width | Pixel % | Δh px | Moved | Resized | Added | Removed | Aria V1→V2 | Focusable | Landmarks | Axe |
|---|---|---|---|---|---|---|---|---|---|---|---|
| header | 375 | 1.04 | 0 | 0 | 0 | 1 | 1 | 21→71 | 6→6 | 4→6 | 0→0 |
| header | 744 | 5.06 | 0 | 4 | 0 | 1 | 1 | 21→71 | 6→6 | 4→6 | 0→0 |
| header | 1024 | 7.61 | 0 | 17 | 1 | 10 | 7 | 21→71 | 11→13 | 4→6 | 0→0 |
| header | 1440 | 1.1 | 0 | 5 | 5 | 12 | 6 | 21→71 | 15→18 | 4→6 | 0→0 |
| header | 1920 | 1.09 | 0 | 5 | 5 | 12 | 6 | 21→71 | 15→18 | 4→6 | 0→0 |
| header | 320 | 1.04 | 0 | 0 | 0 | 1 | 1 | 21→71 | 6→6 | 4→6 | 0→0 |
| hero | 375 | 80.19 | 338 | 9 | 10 | 2 | 1 | 0→0 | 4→4 | 0→0 | 0→0 |
| hero | 744 | 78.34 | 350 | 9 | 5 | 2 | 1 | 0→0 | 4→4 | 0→0 | 0→0 |
| hero | 1024 | 50.85 | -70 | 9 | 5 | 2 | 1 | 0→0 | 4→4 | 0→0 | 0→0 |
| hero | 1440 | 1.27 | 0 | 9 | 3 | 2 | 1 | 0→0 | 4→4 | 0→0 | 0→0 |
| hero | 1920 | 64.82 | 233 | 9 | 5 | 2 | 1 | 0→0 | 4→4 | 0→0 | 0→0 |
| hero | 320 | 71.35 | 226 | 9 | 9 | 2 | 1 | 0→0 | 4→4 | 0→0 | 0→0 |
| footer | 375 | 11.37 | -64 | 55 | 0 | 18 | 22 | 10→42 | 41→39 | 1→3 | 0→0 |
| footer | 744 | 43.96 | 448 | 73 | 5 | 18 | 22 | 10→42 | 41→39 | 1→3 | 0→0 |
| footer | 1024 | 39.5 | -242 | 78 | 11 | 18 | 22 | 10→42 | 41→39 | 1→3 | 0→0 |
| footer | 1440 | 0.54 | 0 | 0 | 0 | 18 | 22 | 10→42 | 41→39 | 1→3 | 0→0 |
| footer | 1920 | 0.41 | 0 | 0 | 0 | 18 | 22 | 10→42 | 41→39 | 1→3 | 0→0 |
| footer | 320 | 11.7 | -64 | 55 | 0 | 18 | 22 | 10→42 | 41→39 | 1→3 | 0→0 |

### Full page

| Width | Pixel % | Height V1 | Height V2 | Δh |
|---|---|---|---|---|
| 320 | 45.51 | 8371 | 8533 | 162 |
| 375 | 56.87 | 8080 | 8354 | 274 |
| 744 | 58.61 | 7033 | 7831 | 798 |
| 1024 | 30.54 | 6752 | 6440 | -312 |
| 1440 | 0.19 | 6680 | 6680 | 0 |
| 1920 | 41.46 | 6712 | 6945 | 233 |

### Key states (viewport screenshots, 900 px high)

| State | Pixel % V1 vs V2 | Axe V1 | Axe V2 | Fidelity vs story Figma node V1 / V2 |
|---|---|---|---|---|
| nav-hover-1440 | 0.99 | 0 | 0 | — |
| mega-open-1440 | 0.35 | image-alt:critical:1 | 0 | 36.35 / 36.38 % |
| search-open-1440 | 0.41 | 0 | 0 | — |
| drawer-1024 | 50.98 | 0 | 0 | 40.82 / 9.94 % |
| drawer-l1-375 | 0 | 0 | 0 | 11.51 / 11.51 % |
| drawer-l2-375 | 0 | image-alt:critical:1, label-content-name-mismatch:serious:1 | 0 | 12.44 / 12.45 % |
| drawer-l1-744 | 1.05 | 0 | 0 | 10.45 / 10.77 % |
| drawer-l2-744 | 7.46 | image-alt:critical:1, label-content-name-mismatch:serious:1 | 0 | 2.59 / 6.25 % |
| hero-cta-hover-1440 | 1 | 0 | 0 | — |
| footer-legal-open-1440 | 6.45 | 0 | 0 | — |
| footer-legal-open-375 | 10.3 | 0 | 0 | — |
| footer-region-1440 | 10.31 | 0 | 0 | — |
| footer-link-hover-1440 | 0.43 | 0 | 0 | — |

## 3. Fidelity vs Figma (pixel % differing, threshold 0.2, lower = closer)

Page frame = the V1 source (`40004993:39823`, cached section renders, 1440 only). Story nodes = the Figma nodes referenced
by the stories (fetched once, cached in `import-work/figma/user-stories/`): `i-nav` examples 1920 / 1440 / 1024 / 744 / 320,
`i-footer` responsive instances (State Default = sand band, the page uses Scrolled Red), `i-hero` Left on image examples
(different photo and copy than the page). Story-node scores therefore include content / colour differences common to V1
and V2: compare the two columns, not the absolute value. Fonts are metric-matched fallbacks for both.

| Component | Width | V1 vs page frame | V2 vs page frame | V1 vs story node | V2 vs story node |
|---|---|---|---|---|---|
| header | 320 | — | — | 2.07 | 2.07 |
| header | 744 | — | — | 3.13 | 6.26 |
| header | 1024 | — | — | 2.91 | 4.2 |
| header | 1440 | 1.88 | 1.9 | 1.88 | 1.9 |
| header | 1920 | — | — | 1.41 | 1.43 |
| hero | 320 | — | — | 52.54 | 56.15 |
| hero | 744 | — | — | 70.33 | 42.68 |
| hero | 1024 | — | — | 59.07 | 52.43 |
| hero | 1440 | 1.86 | 2.44 | 52.71 | 52.71 |
| hero | 1920 | — | — | 64.01 | 50.03 |
| footer | 320 | — | — | 19.81 | 20.08 |
| footer | 744 | — | — | 19.41 | 38.93 |
| footer | 1024 | — | — | 22.2 | 31.16 |
| footer | 1440 | 1.72 | 1.84 | 32.45 | 32.57 |
| footer | 1920 | — | — | 41.98 | 42.06 |

## 4. Changes driven by the stories (V2 only, each traced to its AC)

| # | Component | Change | Story ids |
|---|---|---|---|
| H1 | hero | New UE model `hero-v2` (option `*-us-v2` of the hero block): one field per authored part (25 story fields: pretitle, title, description, button group, phone label / number, text link, scroll, closing text, 3 breakpoint images, 2 videos, alt, options) instead of one rich text | US-023 DF-*, AC-01, AC-04 |
| H2 | hero | Per-breakpoint presentation of the story Figma examples: height 700 (≤ 743, 744), 630 (1024), 700 (1440), 933 (1920); mobile buttons stacked full width (gap 12); tablet lockup bottom-aligned; lockup 639 / 512 / 718 / 816; gap 16 → 24 from 1024; content 1416 at 1920 | US-023 AC-02, AN-examples, AC-12 |
| H3 | hero | Phone CTA = one `tel:` link holding icon + label + number (V1: label outside the link, no icon) | US-023 AN-phone (dialog phoneNumber) |
| H4 | hero | `<picture>` with `<source media>` per breakpoint + nearest-image fallback, `fetchpriority=high`, `loading=eager` | US-023 AC-08, AC-NFR-01, AC-14 |
| H5 | hero | Alignment (default by variant), title size (style only), background colour tokens, image ratio, pretitle-as-H1, show tag / buttons, decorative media options | US-023 AC-05, AC-06, AC-09, AC-16, AC-04 |
| H6 | hero | Background video over the image, mobile rules, pause / play button, skipped under reduced motion / Save-Data (code; not exercised) | US-023 AC-07, AC-13, AC-15 |
| H7 | hero | Empty fields leave no element; empty hero removed on publish; image variant without media logged | US-023 AC-01, ST-empty, ST-error |
| N1 | header | 1024-1279: inline nav + CTA + hamburger opening the full tablet drawer (V1: overflow panel with search + 3 utility links) | US-022 AC-03c, AC-05 |
| N2 | header | 1280-1439: desktop-large composition (5 inline items, Login, search, utility, no hamburger) with the 48 px padding (V1: 4 items + burger panel until 1439) | US-022 AC-03b |
| N3 | header | Padding 24 (tablet) / 48 (1024-1439) / 96 + 1416 max (≥ 1440) instead of the page tokens 40 / 64 | US-022 AN-padding |
| N4 | header | Mega item = label `<a>` (goes to the item page) + separate 24 × 24 arrow `<button>` shown on keyboard focus only, rotating; panel also opens on hover | US-022 AC-04a, AC-04c, AC-12c, NFR-target |
| N5 | header | Submenu link back to the item page when no column already links it (Home, Online services) | US-022 AC-17 |
| N6 | header | Province pill = `aria-haspopup=listbox` with the 12 regions (top bar and drawer), choice stored in `localStorage` and restored | US-022 AC-16, DF-showProvince / provinceLabel / provinceOptions |
| N7 | header | Focus trap in the open drawer; Back button name contains its visible label; featured-card image `alt=""` (V1: 2 axe violations, critical + serious) | US-022 AC-12e, AC-NFR-03 |
| N8 | header | `shadow-header` 0 4 20 rgba(51,51,51,.13) + hairline; context variant (`variant-light` / `variant-drop-shadow`, sticky) | US-022 AN-mainbar, AC-19 |
| N9 | header | Search: `<results>?<param>=<encoded term>` (param authored); CTA target / rel; authored logo + brand name fallback; Login XF opens a `<dialog>` (code) | US-022 AC-08, AC-09, AC-10, AC-18 |
| N10 | header | Dialog tabs Logo / Navigation / Search / CTA / Mini & Utility (+ Mobile menu, Design) | US-022 AN-tabs, AC-01 |
| F1 | footer | 4 columns in a row from 1024, one stacked column below (V1 / Figma: 3 + aside at 1024, 2 columns at 744) | US-021 AC-10 |
| F2 | footer | Region (12 regions) and language (FR / EN) pills = buttons opening listboxes (keyboard, ESC, outside click); V1: static button + plain link | US-021 AC-06, AC-07, AC-11c, AC-11e |
| F3 | footer | Third column ABOUT (About Intact … Contact Us) instead of the duplicated QUICK LINKS of the page frame | US-021 AN-columns |
| F4 | footer | Column headings uppercase white 70 % (V1 89.8 % = Figma `#FFFFFFE5`) | US-021 AN-type |
| F5 | footer | Legal notes scrolled into view on open; open-by-default option | US-021 AC-18, AC-08, DF-legalOpen |
| F6 | footer | Footer landmark label, simple variant (88 px), 1-7 columns, logo file, 7 dialog tabs | US-021 AC-11a, AC-05, AC-17, DF-logoFile, AC-01 |
| F7 | footer | Language pill shows the current language (EN) — Figma shows FR | US-021 DF-languageLabel |

Isolation: hero via the `hero-v2` model / `-us-v2` variant (V1 hero model, nodes and decorate path unchanged, V1 `decorate` kept
synchronous); header / footer via `designVariant=us-v2` on the same AEM components (`header.html` / `footer.html` include
`header-v2.html` / `footer-v2.html` only for that value), new XFs `…/site/header-v2/master`, `…/site/footer-v2/master` and a more
specific metadata row (`row_1`, url `/content/intact/en/personal-insurance-v2`); all V2 CSS / JS under `.us-v2`.

## 5. What the stories required that Figma alone did not show (and the reverse)

Stories only (not visible in any Figma frame): label link + keyboard-only expand arrow and hover on mega items; focus trap, ESC
focus return, 24 px targets, axe 0 (caught 2 V1 defects); submenu link to the parent page; province selector in the header (no
design yet — built from the footer dropdown); Login XF modal; context-driven header variants; max 5 items; search parameter
and encoding; CTA target; the 1280-1439 hybrid band and the hamburger drawer at 1024-1279 (meeting DEC-001); footer listbox
behaviour, legal notes auto-scroll, landmark label, simple variant heights, 1-7 columns; hero authoring model (pretitle as H1,
title size independent of the tag, alignment defaults, breakpoint image fallback chain, video rules and limits, closing text,
background colour tokens), empty / error states, LCP / fetchpriority rules.

Figma only (stories defer to it): every per-breakpoint size of the hero (heights, lockup widths, title 40 / 56 / 64 / 72, button
layout), the drawer level-1 / level-2 visuals, the mega panel and featured card, the region dropdown visual, hover pills,
the i-nav Scrolled translucent state, the page copy and the footer Scrolled Red instance.

Conflicts (story vs Figma) and how V2 resolved them:

| Topic | Story | Figma | V2 | Effect on fidelity |
|---|---|---|---|---|
| Tablet header (744-1023) | AC-03: inline nav + CTA + hamburger (story itself flags the conflict with Session 1) | 744 frame: logo + CTA + hamburger | Figma kept (5 items cannot fit with AC-20) | AC-03d partial in V1 and V2 |
| Desktop-medium header (1024-1279) | inline nav + hamburger → tablet drawer (DEC-001, tentative) | 1024 frame: logo + CTA + burger; `desktop burger` overflow panel | story | header 1024: 2.91 → 4.20 % vs story node |
| Header padding | 24 / 48 / 96 | 40 / 64 / 96 (Global-Responsive tokens) | story | header 744: 3.13 → 6.26 % |
| Footer columns | 4 from 1024, 1 below 1024 | 1024: 3 + aside below; 744: 2 columns | story | footer 744: 19.4 → 38.9 %, 1024: 22.2 → 31.2 % |
| Footer headings | white @ .7 | `#FFFFFFE5` (.898) | story | small (1440 page frame 1.72 → 1.84 %) |
| Footer band | launch variant open (Figma Default sand vs demo scrolled-red) | page frame: Scrolled Red | page frame kept | — |
| Language pill | current language (EN) | FR | story | text only |
| Hero alignment at 320 | Left on image defaults to Left | 320 example centred | story | hero 320: 52.5 → 56.2 % |
| Hero phone | fixed phone icon in the link | no icon | story | +icon at every width |
| Hero title size | Display / H1 / H2 option | examples 72 at 1440, page frame 64 | page frame look kept (authored `title-h1`) | hero 1440 vs page frame 1.86 → 2.44 % (icon) |
| Hero buttons | embedded button group | examples: 3 Primary; page: Primary + 2 Secondary | authored page content kept | — |
| Hero gradient | AC-17 rendered gradient vs "pre-baked in the image" | gradient visible | CSS gradient (V1's) | — |
| Canonical file | `T9D3WYokVPpRVClUUBY4cF` (open question) | V1 used `9fjQuwNsndVcp5Lv5i8NGB` | nodes fetched from 9fjQ (same node ids, all 13 found) | — |

## 6. Code delta attributable to the stories

| Repo | Files | Lines + / − | Content |
|---|---|---|---|
| eds-intact `2da0a57..main` | 10 | +1519 / −13 | hero `hero-us-v2.{js,css}`, `_hero.json` (hero-v2 model, 327), `hero.js` (+10 / −1 gate); header `header.css` (+280), `header-behavior.js` (+185 / −12); footer `footer.css` (+104), `footer-behavior.js` (+62); section filter, lint limit |
| aem-intact `f25d5ee..main` | 11 (+4 clientlib synced, +1 package) | +761 / −70 | `header-v2.html` (130), `footer-v2.html` (77), dialogs (+174 / −63), `HeaderModel` (+104), `FooterModel` (+103), `NavLink` (+24), tests (+145), `header.html` / `footer.html` (2 lines each); clientlib +631 / −12; `tools/v2/intact-v2-content-1.0.zip` (V2 paths only) |

## 7. Verification

- V1 unchanged: full-page pixel diff vs the capture taken before any change = **0 px at 1440 and 375**, normalized DOM hash
  identical (`516f962db8308d75`), V1 page JCR, V1 header / footer XF JCR and XF `.content.html` byte-identical. (An async
  `decorate` in `hero.js` changed the image decode timing of one V1 marquee photo by 24 px; fixed by keeping V1 synchronous.)
- V2 in Universal Editor: temporary UES on 8010 with IMS validation disabled, `/update` of the hero `phoneLabel`
  (`Or call now:` → `Call us now:`) returned 200, persisted in the JCR and re-rendered; reverted the same way (200); the temporary
  UES was stopped (editor UES 8000 untouched). `hero-v2` is in `component-models / definition / filters` (aem.page and AEM
  `/content/intact.resource`).
- XF v2 in the page editor: `editor.html` 200 for `header-v2` and `footer-v2`, component overlay on `…/root/header` and
  `…/root/footer`, the dialogs list the new fields (designVariant, brandName, logoFileReference, searchParamName, ctaTarget,
  showProvince, provinceOptions, overviewLabel / simple, ariaLabel, showRegion, regionOptions, languageLabel, legalOpen,
  logoFileReference); a dialog POST (`provinceTitle`) rendered and was reverted. Screenshots `shots/xf-editor-*.png`.
- Lint (`npm run lint`) clean; 8 Sling Model tests pass.

## 8. Not achieved / limits

- Header / footer links are not in the page's server-rendered HTML (XF fetched client-side by the EDS blocks): US-022 AC-13,
  US-021 AC-12 fail in V1 and V2 (architecture, out of a V2-only change).
- `variant-dark` header not implemented (no context defined for it); Login XF modal and hero video are implemented but not
  exercised (no login XF and no DAM MP4 allowed outside the V2 paths); the logo is authored but points to the clientlib SVG
  (no Intact logo in the DAM); UE has no cross-field validation (video without image, image without alt); fr tree not
  available (AC-20 fr labels untested); JPEG instead of WebP for the hero fallback.
- Pixel comparisons use metric-matched fallback fonts (Intact Sans / Serif licensed): text residuals are common to V1 and V2.

## 9. Side-by-side (V1 | V2 | diff)

- Hero 375: `shots/hero-375-sxs.png` (H2: 362 → 700 px, stacked buttons, phone icon)
- Header 1024 hamburger: `shots/state-drawer-1024-sxs.png` (N1: overflow panel → tablet drawer)
- Footer 1024: `shots/footer-1024-sxs.png` (F1, F2, F3: 4 columns, EN pill, ABOUT column, −242 px)
- Also: `shots/header-1440-sxs.png`, `shots/state-mega-open-1440-sxs.png`, `shots/state-footer-region-1440-sxs.png`,
  `shots/state-drawer-l2-744-sxs.png`, `shots/footer-744-sxs.png`, `shots/hero-1920-sxs.png`.
