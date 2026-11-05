# Figma inventory — Intact « Homepage » (personal insurance, EN)

Source of truth: Figma file **AEM Design Library (WIP)** `9fjQuwNsndVcp5Lv5i8NGB`, frame **Homepage** `40004993:39823`
(page *💾 References - Intact* › section *Pages w/ components*). File version `2418387332619325148`,
lastModified `2026-11-05T14:37Z` (the file is being edited: re-check before sign-off).

All raw responses are cached under `import-work/figma/` and must be reused, never re-requested:

| File | Content |
|---|---|
| `raw/page-nodes.json` | REST `GET file nodes` of the frame (full depth: instances, `componentProperties`, `boundVariables`, styles, text) |
| `raw/mains-and-modes-nodes.json` | REST `GET file nodes` of the 25 local main components/sets used + footer 1024/744/320 and *Contact us v2* 320 examples |
| `raw/mcp-get_variable_defs-40004993-39823.json` | MCP `get_variable_defs` of the frame (names → resolved desktop values) |
| `raw/renders-png-1x.json`, `renders/*.png` | REST renders of the frame + 10 sections @1x (visual targets) |
| `raw/renders-svg.json`, `assets/icons/*.svg` | REST SVG exports of logos / icons / pictograms |
| `raw/image-fills.json`, `assets/images/*` | original image fills (full resolution, 15 files) |
| `components.json` | normalized inventory (sections, 110 instances, texts, images, detached frames, variable ids) |
| `main-components.json` | current definitions of the main components (variants, properties) |
| `variables-by-mode.json`, `variables-map.json` | variable id → resolved value per Global-Responsive mode, id → name candidates |
| `calls-log.jsonl` | every Figma call made (channel, tier, status) |

## Access and rate limits

- Account `azouaoui@deloitte.ca`: **View** seat (guest) on the *Intact* Enterprise org that owns the file
  (Dev seat only on *Deloitte Canada*, which does not apply to this file).
- Figma MCP: View/Collab seats = **up to 20 tool calls per month** (all plans, incl. Enterprise);
  Full/Dev on Enterprise = 600/day, 20/min. REST API with a personal token, View seat: Tier 1
  (`GET file`, `GET file nodes`, `GET image`) **up to 20/month**, Tier 2 5/min, Tier 3 10/min.
- Used for this inventory: MCP **2** counted calls (`create_session`, `get_variable_defs`; `whoami` exempt) and
  REST **4 Tier 1** (2× nodes, PNG render, SVG render) + 2 Tier 2 (image fills, local variables = 403) + Tier 3 (`me`, remote component sets = 403).
- Blocked by permissions (not by rate limit): `GET /files/:key/variables/local` → 403 (variables scope needs a
  Full seat in the Enterprise org); remote library component sets (`product list v2`, pictograms, `Add`, arrows, `Gif`) → 403
  ("You don't have permission to view this component set").
- `get_design_context` was **not** called: the REST node tree holds the same layout/typography/variable bindings
  at node level and is cached to disk, whereas each design-context call would cost 1 of the remaining ~18 monthly MCP calls.
  Budget kept for targeted checks during implementation (states, variants without page usage).

## Frames / viewports

| Frame | Size | Global-Responsive mode |
|---|---|---|
| `Homepage` `40004993:39823` | 1440 × 6651 | `40002838:0` (1440, desktop L) |

**Only the desktop 1440 frame exists for this page.** No tablet / mobile version of this page in the file
(searched every page of the September file outline and the current file). Responsive values come from the
variable modes of the **Global-Responsive** collection (`VariableCollectionId:40002838:27603`):
320 (`40002838:3`), 744 (`40002838:2`), 1024 (`40002838:1`), 1440 (`40002838:0`), 1920 (`40002844:5`);
brand collection `419:811`: Intact `439:1`, belairdirect `419:1`, Prestige `40002696:0`.
Breakpoints (page *→ Grids*): Mobile XS 320–767, Tablet S 744–1023, Desktop M 1024–1439, Desktop L 1440–1919, HD 1920.

## Sections (top → bottom)

| # | Node | Name in Figma | Type | y | h | What it is | Built from |
|---|---|---|---|---|---|---|---|
| S01 | `40004993:41095` | i-nav | INSTANCE `i-nav` State=Default | 0 | 96 | top bar (Personal / Business / Prestige, FR, QC, Find a representative) + main nav (5 links, Login, search, *Get my price*) | library component |
| S02 | `40004993:48083` | i-hero | INSTANCE `i-hero` Hero Style=**Left on image** | 96 | 700 | full-bleed photo, H1 « Protect what matters at a smart price », group label + 3 buttons 56px (*Car and home*, *Car*, *Home*), phone line | library component |
| S03 | `40004993:48209` | Frame 1321317910 › *Text + Media_v1* | FRAME (detached) | 796 | 880 | eyebrow « Find the protection that fits your lifestyle » + 6 × `product list v2` (car = hover state with pictogram + description) | hand-built frame + remote component |
| S04 | `40004993:48715` | Blog cards | FRAME (detached) | 1676 | 817 | H2 with red accent « We're here for you… » + 3 image cards (overlay text, white CTA, « New » tag) | hand-built, no component instance |
| S05 | `40004993:51957` | i-side by side | INSTANCE `i-side by side` Type=Default, Order=Image Right | 2493 | 692 | burgundy full-bleed, « The most trusted insurance brand in Canada », lorem body, CTA « Button » (Secondary-reversed) | library component |
| S06 | `40004993:52154` | FAQ | FRAME (detached) | 3185 | 494 | left: H2 « Honest answers… » + Secondary button; right: 5 questions with `Add` (+) icons | hand-built (no `Accordion` component) |
| S07 | `40004993:52186` | i-side by side | INSTANCE Type=**In Container**, Order=Image Right | 3679 | 740 | teal rounded container on sand, « Peace of mind wherever you are », app illustration, CTA « Discover our award-winning app » | library component |
| S08 | `40004993:52863` | Frame 6 | FRAME (detached) | 4419 | 811 | Olympic bracket logo (`Gif`), H2 « Proud to play our part » (accent), body, Secondary button, 12-image horizontal strip (4925 px wide, overflows) | hand-built + remote `Gif` |
| S09 | `40004993:52902` | **FAQ** (misnamed) | FRAME (detached) | 5230 | 704 | red CTA banner « Get coverage that's tailored to you. », body, white button « Get a personalized quote » | hand-built |
| S10 | `40004993:56486` | i-footer | INSTANCE `i-footer` State=**Scrolled Red** | 5934 | 717 | dark rounded card on red: 4 link columns, social, app badges, Quebec / FR selectors, legal links, « Also of interest » row, logo, copyright | library component |

## Detached layers and hard-coded values (flagged)

Counted on visible nodes (`import-work/figma/extract_inventory.py`, `/tmp/intact/hardcoded.txt`):

| Section | Texts without text style / font variables | Solid fills without variable/style | Auto-layout spacings without variable |
|---|---|---|---|
| S01 i-nav | 0 / 13 | 6 / 35 | 15 / 39 |
| S02 i-hero | 0 / 6 | 0 / 10 | 5 / 19 |
| **S03** | **13 / 13** | 15 / 320 | **16 / 16** |
| **S04** | **8 / 8** | 8 / 13 | **32 / 32** |
| S05 i-side by side | 0 / 3 | 0 / 5 | 1 / 7 |
| **S06** | **6 / 7** | 11 / 20 | **13 / 15** |
| S07 i-side by side | 0 / 3 | 0 / 6 | 1 / 10 |
| **S08** | 1 / 3 | 5 / 8 | 6 / 8 |
| **S09** | **3 / 3** | 0 / 5 | **7 / 7** |
| S10 i-footer | 0 / 41 | 37 / 97 | 50 / 151 |

- S03, S04, S06, S08, S09 are hand-built frames, not instances of the library's *Product Feature*, *Blog Cards*,
  *Accordion*, *Scroller/Marquee* or *Pre-footer banner* components. Their H2s are **Intact Serif 56/56, letter-spacing −0.56**,
  not bound to any variable (the bound heading variable is 64/68 → 36/40 at 320).
- Horizontal padding: hand-built sections use **100 px** (S03, S04, S06), components use the variable
  `Global-Responsive/horizontal_padding` = **96 px**. S09 uses 311 px.
- Red accent words in H2s are character overrides `#df0030` (S04 « here for you », S06 « Honest answers », S08 « Proud »).
- Variable code-syntax names are inconsistent in the file: e.g. `var(--color-brand-red)` resolves to `#ffffff`,
  `var(--color-surface-page)` to `#df0030`, `var(--font-size-heading-h1)` to `12`, `var(--font-family-heading)` to `semi-bold`.
  The EDS tokens therefore use the Figma variable **names** (collection/group/name), not the code syntax.
- Placeholder copy: S05 body « Tempus leo eu aenean sed diam urna tempor. » and CTA « Button »; S03 rows 3 and 6 reuse the
  home / condo descriptions; footer has two identical *QUICK LINKS* columns and « Commercial vehical insurance » (typo).
- Footer logo instance is `Language=French` on an English page.
- Hero `Show breadcrumbs=true` but no breadcrumb layer is visible in the instance.

## Variables (resolved values)

Desktop values from `get_variable_defs` (mode 1440); other modes from the library examples cached in
`raw/mains-and-modes-nodes.json` (footer 1024/744/320, *Contact us v2* 320). « — » = not observable in any cached frame.

### Colours

| Figma variable (name) | Value | Used for |
|---|---|---|
| `Primary/Intact Red` (= `Intac Red`) | `#df0030` | CTA primary, S09 background, red accents, footer page bg |
| `Dark Red` | `#9b0723` | hover (library) |
| `Primary/Rich Black` | `#141414` | headings |
| `Keep It Intact/Black Charcoal` (= `color/grey/13`) | `#212121` | body / H2 |
| `var(--color-surface-dark)` | `#1a1a1a` | top bar, footer card, secondary button text/border |
| `neutral/800*` | `#333333` | hero overlay fill, icons |
| `neutral/700` | `#4f4f4f` | |
| `Primary/Sand` (= `Primary/Soothing Sand`, `Beige`) | `#f7f2ea` | section backgrounds S03/S06/S07/S08 |
| `intact-nb/sand/150` (= `Medium Beige`) | `#e6dad2` | product pictogram |
| `intact-nb/sand/300` (= `Dark Beige`) | `#d6c5b9` | product pictogram |
| `surface/alternate/dark-2` | `#4a1717` | S05 burgundy |
| `surface/alternate/dark-1` | `#066c63` | S07 teal container |
| `Darker Flashy Teal` | `#004844` | pictogram |
| `intact-nb/red/800` (= `Skin 5 - Burgundy`) | `#4f1c17` | pictogram |
| `Keep It Intact/Pink light 1` | `#ffebfe` | « New » tag |
| `Neutral/White`, `Neutral/Black` | `#ffffff`, `#000000` | |
| `var(--color-text-secondary)` | `#ffffffe5` | secondary text on dark |
| `action/text-link/reversed-hover` | `#ffffff33` | link hover on dark |
| `border/default/grey` | `#565656` | |
| `border/default/neutral-light` | `#d8d8d8` | footer divider |

### Typography

Families: `font/heading-style/family` = **Intact Serif** (Regular 400; one Medium 500 in S08),
`font/paragraph-style/family` = `font/functional/button-label` = **Intact Sans** (400, 500, 600, 700).

| Role (text style / variables) | 1440 | 320 | Where |
|---|---|---|---|
| Display / H1 (hero, side-by-side) | Intact Serif 400 64/68, ls −1 | 36/40 | S02, S05, S07 |
| H2 section (hard-coded) | Intact Serif 400 56/56, ls −0.56 | — | S03 rows, S04, S06, S08, S09 |
| `functional/button-label-lg` | Intact Sans 700 18/24 | 18/24 | hero buttons 56px |
| `functional/md/regular` (button-label-md) | Intact Sans 700 16/20 | 16/20 | 40px buttons, footer links |
| `paragraph/p3/regular` | Intact Sans 400 16/22 | 16/22 | body |
| `paragraph/p3/bold` | Intact Sans 700 16/22 | | hero phone |
| `www.intact.ca/Intact Sans/Medium` | Intact Sans 500 16/24 | | S08/S09 body |
| card text (hard-coded) | Intact Sans 700 18/21.6 | — | S04 |
| FAQ question (hard-coded) | Intact Sans 700 18/18 | — | S06 |
| nav main | Intact Sans 700 14/20 (variable 16→14 at 320 on mobile nav) | | S01 |
| product description (hard-coded) | Intact Sans 500 14/18.2 | — | S03 |
| `paragraph/p5/semi-bold` | Intact Sans 600 12/18 | 12/18 | top bar, footer headers (uppercase) |
| `paragraph/p5/regular(-link)` | Intact Sans 400 12/18 | 12/18 | legal links, copyright |
| tag (hard-coded) | Intact Sans 700 11/11, ls 0.66, uppercase | — | « New » |

### Spacing, radius, borders

| Variable | 1440 | 1024 | 744 | 320 |
|---|---|---|---|---|
| `Global-Responsive/horizontal_padding` (= `Header/…/i-header-horizontal-padding`) | 96 | 64 | 40 | 16 |
| `Side by side/intact/i-sbs-container-padding` (= footer inner/container padding) | 48 | 48 | 40 | 16 |
| `Vertical Spacing/intact/i-v-spacing-xl` (= `i-sbs-vertical-padding-xlg`) | 64 | 56 | 48 | 48 |
| `Vertical Spacing/intact/i-v-spacing-m` | 24 | — | — | 16 |
| `Vertical Spacing/intact/i-v-spacing-s` | 16 | 16 | 8 | 8 |
| `Vertical Spacing/intact/i-v-spacing-xs` | 8 | 8 | 4 | 4 |
| `Side by side/intact/i-sbs-gutter` | 120 | — | — | — |
| `Side by side/intact/i-sbs-half-minimum-width` | 328 | | | |
| `Header/header_intact/i-header-gutter` | 40 | | | |
| `Header/header_intact/i-header-button-padding` | 16 | 16 | 16 | 12 (mobile nav) |
| `Hero/intact/i-hero-empty-frame-right` | 506 | | | |
| `Footer/footer_intact/i-footer--container-top-padding` | 40 | | | |
| `Footer/footer_intact/i-footer-radius` = `scale/border radius/md` | 16 | | | |
| `action/button/button-radius` | 8 | | | |
| `scale/border width/xs (1)`, `sm (2)` | 1, 2 | | | |
| size scale `var(--size-N)` | 0, 4, 8, 12, 16, 20, 24, 32, 40, 56 | | | |
| `Global-Responsive/device-width` | 1440 | 1024 | 744 | 320 |

Other radii observed (hard-coded): 4 (card image corners S04), 20 / 40 (pill tag), 6.66 (S08 images).
Effects: one `BACKGROUND_BLUR` 16 on the « New » tag. No shadows.

## Fonts and assets

- Fonts: **Intact Sans** (400/500/600/700) and **Intact Serif** (400/500): proprietary brand fonts, not in any
  local repository; must be licensed for self-hosting on aem.live (see questions).
- Images (`assets/images/`, originals from the Figma image fills): hero photo 2284×1155, 3 card photos (1334×2000, 1334×2000,
  2400×1602), S05 illustration 954×716, S07 app illustration 556×417, S08 Olympic bracket 2114×1240 + 8 sport photos (up to 4096×2731).
- SVG (`assets/icons/`): Intact logo (default EN, white FR), search, chevrons, `Add` (+), social ×5, App Store / Google Play
  badges, car pictogram. The 5 other pictograms (house, truck ×2, condo, garage) are hidden in the Default state and
  their remote component is not accessible → not exportable.

## Component instances → main components

Generated from `import-work/figma/components.json` and `main-components.json`.

### Instances par composant principal

| Composant principal (set) | Clé (set/composant) | Source | Instances | Sections | Variantes utilisées | Propriétés (valeurs utilisées) |
|---|---|---|---|---|---|---|
| `i-nav` | `78239dae64a7` | locale (AEM Design Library WIP) | 1 | S01 | State=Default | Menu Type=40002864:67157; Show Nav=True; Open Menu=False |
| `.i-lineselector` | `86759c9f3f9b` | locale (AEM Design Library WIP) | 3 | S01 | State=Active<br>State=Default |  |
| `Arrow small` | `e8e973ec205a` | librairie distante (403) | 3 | S01, S10 | Direction=Down, Size=Small |  |
| `i-logo` | `0b9fb752cf5c` | locale (AEM Design Library WIP) | 2 | S01, S10 | Logo Type=Logo-Intact, Language=English, Colour=Default<br>Logo Type=Logo-Intact, Language=French, Colour=White |  |
| `Search icon` | `7e69978cbb26` | locale (AEM Design Library WIP) | 1 | S01 |  |  |
| `i-hero` | `3cf60405bd32` | locale (AEM Design Library WIP) | 1 | S02 | Hero Style=Left on image | Show spacer=True; Show breadcrumbs=True |
| `.intact-hero-lockup` | `c67dde8b4ab2` | locale (AEM Design Library WIP) | 1 | S02 | Alignment=Left | Show Button Group=True; Show Tag=False; Show Body Copy=False; Show optional bottom text area=False; Show Phone=True; Headline=Protect what matters at a smart price |
| `i-button-group` | `13b9be7572f2` | locale (AEM Design Library WIP) | 1 | S02 | Size=56px | Show Button 4=False; Show Button 3=True; Show Button 2=True; Show Group Label=True |
| `.label` | `130aa38dba6a` | locale (AEM Design Library WIP) | 1 | S02 | Group label alignment=left |  |
| `.bttn-w-label` | `7d3f230b3c4f` | locale (AEM Design Library WIP) | 3 | S02 |  | Show Button Label=False |
| `i-button` | `a8c9177c13dc` | locale (AEM Design Library WIP) | 7 | S02, S05, S06, S07, S08 | Type=Primary, Size=56px, State=Default<br>Type=Secondary, Size=40px, State=Default<br>Type=Secondary-reversed, Size=40px, State=Default<br>Type=Secondary-reversed, Size=56px, State=Default | Icon Right=40003876:31831; Trailing icon=False; Leading icon=False; Text=Button/Car/Car and home/Discover our award-winning app/Discover our pa |
| `product list v2` | `2029c59f6c90` | librairie distante (403) | 6 | S03 | product=business, state=Default<br>product=car, state=hover<br>product=commercial vehicle, state=Default<br>product=condo, state=Default<br>product=home, state=Default<br>product=rv, state=Default |  |
| `Berline angle` | `82b15e0d31c3` | librairie distante (403) | 1 | S03 | brand=intact-nb |  |
| `Single house` | `0ee13c56f2fe` | librairie distante (403) | 1 | S03 | brand=intact-nb |  |
| `Truck` | `f413614a5440` | librairie distante (403) | 2 | S03 | brand=intact-nb, color=dark |  |
| `Condo` | `28167973301c` | librairie distante (403) | 1 | S03 | brand=intact-nb |  |
| `Garage closed small` | `0c09a1c6c657` | librairie distante (403) | 1 | S03 | brand=intact-nb |  |
| `i-side by side` | `5eb1583d8e8c` | locale (AEM Design Library WIP) | 2 | S05, S07 | Type=Default, Order=Image Right<br>Type=In Container, Order=Image Right | Show List=False; Body Copy=Always have access to your insurance inf/Tempus leo eu aenean sed diam; Show CTA=True; Headline=Peace of mind wherever you are/The most trusted insurance brand in Can |
| `Add` | `c394ccd4214e` | librairie distante (403) | 5 | S06 | Type=Mobile |  |
| `Gif` | `c145d454aec2` | librairie distante (403) | 1 | S08 | Property 1=Variant3 |  |
| `i-footer` | `cc0e317744c3` | locale (AEM Design Library WIP) | 1 | S10 | State=Scrolled Red |  |
| `.footercontent` | `a058225378a5` | locale (AEM Design Library WIP) | 1 | S10 |  |  |
| `.intact-footer-list` | `cf8f4ae6cd49` | locale (AEM Design Library WIP) | 4 | S10 |  |  |
| `i-listcolumn` | `3cd1c5db6c34` | locale (AEM Design Library WIP) | 4 | S10 | Size=Small | Show List item 9=False; Show List item 8=False/True; Show List item 7=False/True; Show List item 6=False/True; Show List item 10=False; Show List item 1=True; Show List item 3=False/True; Show List item 2=False/True; Show List item 5=False/True; Show List item 4=False/True |
| `.intact - List item` | `75512eed5229` | locale (AEM Design Library WIP) | 22 | S10 | Size=Small | Icon=40003884:32846; Show Text=False; Tag=False; Button Text=True; Sub text label ↘️=False; Sub text label=Sub text; Leading icon=False |
| `b-text-button` | `69ec6c57a40f` | locale (AEM Design Library WIP) | 22 | S10 | Type=Reversed, State=Default | Trailing Icon=40003876:31831; Leading Icon=40003876:31832; Leading icon=False; Trailing icon=False; Text=Access for representatives/Blog/Business property insurance/Client Cen |
| `.footer-header-label` | `2512e67117e8` | locale (AEM Design Library WIP) | 2 | S10 |  | Text=DOWNLOAD THE APP/SOCIAL MEDIA |
| `social-facebook` | `642808608c3e` | locale (AEM Design Library WIP) | 1 | S10 |  |  |
| `social-x` | `0a760c66e48a` | locale (AEM Design Library WIP) | 1 | S10 |  |  |
| `social-linkedin` | `5b31d4bb624e` | locale (AEM Design Library WIP) | 1 | S10 |  |  |
| `social-instagram` | `15dfd99862e9` | locale (AEM Design Library WIP) | 1 | S10 |  |  |
| `social-youtube` | `c543d0b5e314` | locale (AEM Design Library WIP) | 1 | S10 |  |  |
| `app-button-individual` | `e56f5d50359a` | locale (AEM Design Library WIP) | 2 | S10 | Store=App store, State=Default, Size=40px, Language=English<br>Store=Google play, State=Default, Size=40px, Language=English | Show Ratings=False |
| `Button` | `d0f202dd012e` | locale (AEM Design Library WIP) | 2 | S10 | Type=Secondary-reversed, Size=40px, State=Default | Leading icon=False; Trailing icon=True; Text=FR/Quebec |
| `Arrow xsmall` | `a607f32f6094` | librairie distante (403) | 1 | S10 | Direction=Down |  |

### Définitions des composants principaux (état du fichier au 2026-11-05T14:37:21Z )

| Composant principal | Id | Clé | Nb variantes | Propriétés de variante (options) | Autres propriétés |
|---|---|---|---|---|---|
| `Button` | `40000120:2450` | `d0f202dd012e` | 0 | Type: Primary, Secondary, Tertiary, Secondary-reversed, Tertiary-reversed; Size: 56px, 40px; State: Default, Hover, Disabled, Focus | Text (text=Button); Trailing icon (boolean=True); Leading icon (boolean=True) |
| `app-button-individual` | `40001556:8090` | `e56f5d50359a` | 12 | Store: App store, Google play; State: Default, Focus; Size: Default, 40px, 32px; Language: English, French | Show Ratings (boolean=False) |
| `Search icon` | `40001642:12988` | `7e69978cbb26` | 0 |  |  |
| `b-text-button` | `40001690:40248` | `69ec6c57a40f` | 8 | Type: Reversed, Default; State: Default, Hover, Disabled, Focus | Text (text=Button); Trailing icon (boolean=True); Leading icon (boolean=False); Leading Icon (instance_swap=40003876:31832); Trailing Icon (instance_swap=40003876:31831) |
| `social-facebook` | `40001695:22368` | `642808608c3e` | 0 |  |  |
| `social-x` | `40001695:22437` | `0a760c66e48a` | 0 |  |  |
| `social-linkedin` | `40001695:22438` | `5b31d4bb624e` | 0 |  |  |
| `social-youtube` | `40001695:22472` | `c543d0b5e314` | 0 |  |  |
| `social-instagram` | `40001695:22476` | `15dfd99862e9` | 0 |  |  |
| `.footer-header-label` | `40001695:24484` | `2512e67117e8` | 0 |  | Text (text=FOOTER HEADER LABEL) |
| `i-button` | `40002139:22353` | `a8c9177c13dc` | 40 | Type: Primary, Secondary, Tertiary, Secondary-reversed, Tertiary-reversed; Size: 56px, 40px; State: Default, Hover, Disabled, Focus | Text (text=Button); Trailing icon (boolean=True); Leading icon (boolean=True); Icon Right (instance_swap=40003876:31831) |
| `i-listcolumn` | `40002454:31790` | `3cd1c5db6c34` | 2 | Size: Small, Large | Show List item 1 (boolean=True); Show List item 2 (boolean=True); Show List item 3 (boolean=True); Show List item 4 (boolean=True); Show List item 5 (boolean=True); Show List item 6 (boolean=True); Show List item 7 (boolean=True); Show List item 8 (boolean=Tru |
| `.intact-footer-list` | `40002472:18240` | `cf8f4ae6cd49` | 0 |  |  |
| `i-logo` | `40003059:77158` | `0b9fb752cf5c` | 24 | Logo Type: Intact x Canadiens, Intact x Olympics, Logo-Intact, Agencies, Agency - Ellipse, Agency - La Turquoise; Language: English, French; Colour: Default, White |  |
| `.footercontent` | `40003282:60924` | `a058225378a5` | 0 |  | Footer list (slot={'guid': {'sessionID': -) |
| `i-footer` | `40003282:62938` | `cc0e317744c3` | 5 | State: Default, Scrolled Red, Scrolled Sand, simple-desktop, simple-tablet+mobile |  |
| `i-side by side` | `40003565:7906` | `5eb1583d8e8c` | 6 | Type: Default, In Container, Thirds; Order: Image Left, Image Right | Headline (text=Lorem ipsum headline); Body Copy (text=Tempus leo eu aenean sed); Show CTA (boolean=True); Show List (boolean=True) |
| `.intact - List item` | `40004178:43516` | `75512eed5229` | 2 | Size: Small, Large | Leading icon (boolean=True); Tag (boolean=True); Sub text label (text=Sub text); Sub text label ↘️ (boolean=True); Button Text (boolean=True); Icon (instance_swap=40003884:32846); Show Text (boolean=False) |
| `.intact-hero-lockup` | `40004538:10623` | `c67dde8b4ab2` | 2 | Alignment: Center, Left | Show Tag (boolean=True); Headline (text=Protect what matters at ); Show Body Copy (boolean=True); Show Button Group (boolean=True); Show Phone (boolean=True); Show optional bottom text area (boolean=False) |
| `i-hero` | `40004588:17800` | `3cf60405bd32` | 9 | Hero Style: Center on image, Center on solid, Left on image, In container, Half, Simple, Half (Tablet and Mobile only), Center full-width image, Simple with illustration | Show breadcrumbs (boolean=True); Show spacer (boolean=True) |
| `.bttn-w-label` | `40004843:53364` | `7d3f230b3c4f` | 0 |  | Show Button Label (boolean=False) |
| `i-button-group` | `40005065:39956` | `13b9be7572f2` | 4 | Size: 56px, 40px, Text, mobile | Show Group Label (boolean=True); Show Button 2 (boolean=True); Show Button 3 (boolean=True); Show Button 4 (boolean=False) |
| `.label` | `40005065:40094` | `130aa38dba6a` | 2 | Group label alignment: left, center |  |
| `i-nav` | `40030900:128226` | `78239dae64a7` | 2 | State: Default, Scrolled | Open Menu (boolean=False); Show Nav (boolean=True); Menu Type (instance_swap=40002864:67157) |
| `.i-lineselector` | `40030938:313826` | `86759c9f3f9b` | 4 | State: Active, Default, Hover, Focus |  |
