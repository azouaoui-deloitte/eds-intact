# Figma component → EDS block map — `/content/intact/en/personal-insurance`

Rules: one block (or block option) per Figma main component; Figma variants → `select` / `multiselect`
fields of the block model in Universal Editor (`classes` field); styles only through `styles/tokens.css`
custom properties (generated from the Figma variables, see `figma-inventory.md`); hand-built Figma
frames are mapped to the library component they imitate, or to default content + section styles.
Header and footer are **AEM components in Experience Fragments** (aem-intact), never EDS blocks: the EDS
`header` / `footer` blocks only fetch the XF HTML.

| # | Figma (node) | Main component → variant used | EDS implementation | UE model / options | Content source |
|---|---|---|---|---|---|
| S01 | `i-nav` `40004993:41095` | `i-nav` State=Default (Scrolled), `.i-lineselector` Active/Default (Hover, Focus), `i-logo` Logo-Intact/English/Default, `i-button` Primary 40px, `Search icon`, `Arrow small` | AEM `intact/components/header` (HTL + Sling Model + dialog) in XF `/content/experience-fragments/intact/en/site/header/master`; EDS `blocks/header` fetches `<xf>.content.html` and binds `header-behavior.js` (scrolled state, segment line selector, mobile drawer) | dialog: segments (label, link, active), utility links (FR, QC, Find a representative), main links, login, CTA, search | Figma copy + prod links |
| S02 | `i-hero` `40004993:48083` | `i-hero` Hero Style=**Left on image** (Show spacer, Show breadcrumbs) › `.intact-hero-lockup` Alignment=Left (Show Phone, Show Button Group) › `i-button-group` Size=56px (Group Label + 3 buttons) | block **`hero`** | `classes` (select): `left-on-image`, `center-on-image`, `in-container`, `center-on-solid`, `center-full-width-image`, `half`, `simple`, `simple-with-illustration` (all `i-hero` Hero Style variants except the tablet/mobile-only Half); fields: image + alt, tag (`i-tag`), text (richtext: heading, body, fully bold paragraph = `i-button-group` label, buttons — **bold = Primary, italic = Secondary**, phone line, notes) | Figma copy, prod links (webquote URLs, tel), Figma image |
| S03 | Frame › `Text + Media_v1` + 6 × `product list v2` | `product list v2` (remote lib) product=car/home/commercial vehicle/rv/condo/business, state=Default / **hover** | block **`product-list`** (container) + item `product-list-item` | block: eyebrow; item: pictogram (image), title, description, link. Hover / focus = Figma `state=hover` (pictogram + description shown) | Figma copy, prod links (`/vehicle/car-insurance/quebec`…) |
| S04 | Frame `Blog cards` | none (hand-built; closest library: *Blog Cards* / *Card grids*) | section: default content H2 (italic = red accent) + block **`cards`** option `overlay` | `cards` classes: `overlay`; item: image + alt, tag (optional, e.g. « New »), text (richtext: copy + CTA link) | Figma copy + images, prod links (claims, Client Centre, Jiffy) |
| S05 | `i-side by side` `40004993:51957` | `i-side by side` Type=**Default**, Order=**Image Right** (Show CTA, Show List=false) | block **`side-by-side`** | `classes` (multiselect): Type Default / `in-container` / `thirds`, Order Image Right / `image-left`, theme `sand` / `burgundy` / `teal` / `white`, `bleed` (illustration overflowing, as in S05), `buttons-lg` (i-button 56px, library default); fields: image + alt, text (richtext: heading, body, CTA). `Show List` (i-listcolumn) not implemented (unused on the page) | Figma copy (body + CTA are placeholders → prod « More than insurance » / client), Figma image |
| S06 | Frame `FAQ` | none (hand-built; library: *Accordion*) + `i-button` Secondary 40px + `Add` icons | block **`accordion`** option `split` | block: intro (richtext: H2 with accent + CTA); item `accordion-item`: question (text), answer (richtext) | questions Figma = prod; answers from prod |
| S07 | `i-side by side` `40004993:52186` | `i-side by side` Type=**In Container**, Order=**Image Right** | block **`side-by-side`** | `in-container`, `image-right`, theme `teal`, section style `sand` | Figma copy, prod link (mobile app) |
| S08 | Frame `Frame 6` | `Gif` (remote) + `i-button` Secondary + 12 image frames (hand-built; library: *Scroller/Marquee (Intact)*) | section `sand center`: default content (logo image, H2 with accent, text, button) + block **`marquee`** | `marquee` items: image + alt | Figma copy + images, prod link (partnerships) |
| S09 | Frame `FAQ` (misnamed) | none (hand-built; library: *Pre-footer banner*) | section `red center`: default content (H2, text, button) | section style `red`, `center` | Figma copy, prod quote link |
| S10 | `i-footer` `40004993:56486` | `i-footer` State=**Scrolled Red**, `.footercontent`, `.intact-footer-list` ×4, `.footer-header-label`, `b-text-button` Reversed, `app-button-individual` App store / Google play 40px English, `Button` Secondary-reversed 40px (Quebec / FR), social ×5, `i-logo` White | AEM `intact/components/footer` in XF `/content/experience-fragments/intact/en/site/footer/master`; EDS `blocks/footer` fetches the XF | dialog: variant (Default / Scrolled Red / Scrolled Sand), columns (header + links), social, apps, selectors, legal links, also-of-interest, copyright | Figma copy + prod links |

## Global styles (no block)

| Figma | EDS |
|---|---|
| `i-button` Type Primary / Secondary / Tertiary / *-reversed, Size 56px / 40px, State Default / Hover / Disabled / Focus | `styles/styles.css` buttons: `strong > a` = Primary, `em > a` = Secondary, `strong > em > a` = Tertiary; *reversed* automatically inside dark themes (`burgundy`, `teal`, `red`, `dark`, hero); 56px inside `hero`, 40px elsewhere; hover / focus-visible / disabled from the library variants |
| `b-text-button` Default / Reversed | plain links (`a`) with the text-button style |
| H2 red accent (character override `#df0030`) | `em` inside headings renders `--color-brand-red`, not italic |
| sections `#f7f2ea`, `#df0030`, `#1a1a1a` | section metadata `style`: `sand`, `red`, `dark`, `center`, `narrow` |
| Global-Responsive modes 320 / 744 / 1024 / 1440 / 1920 | `styles/tokens.css` custom properties redefined in `@media (width >= 744px)`, `(width >= 1024px)`, `(width >= 1440px)`, `(width >= 1920px)` |

## Not in scope of this page (library components with no instance here)

Breadcrumbs (hero `Show breadcrumbs=true` but nothing visible), Tabs, Carousel, Trust signals, Tags, Video, Modal,
Cookie consent, Geolocation banner (prod shows a province selector modal — not in the Figma).

## Variant coverage (main components → block options)

| Main component | Variants in Figma | Implemented as options | Not implemented |
|---|---|---|---|
| `i-hero` Hero Style | 9 | 8 | *Half (Tablet and Mobile only)* — responsive form of `half`; breadcrumbs (`i-breadcrumbs`) and the media play/pause `Icon button` |
| `.intact-hero-lockup` Alignment, Show Tag / Body / Phone / Button Group | Left, Center + 5 booleans | alignment follows the hero style; tag field; optional body / phone / buttons in the rich text | optional bottom text area |
| `i-button-group` Size | 56px, 40px, Text, mobile | 56px in hero, 40px elsewhere | Text, mobile |
| `i-side by side` Type × Order | 3 × 2 | 6 + `bleed`, themes, `buttons-lg` | `Show List` (`i-listcolumn`) |
| `i-button` Type × Size × State | 5 × 2 × 4 | all (strong / em / strong+em, reversed in dark themes; hover, focus, disabled) | — |
| `product list v2` product × state | 6 × 2 | pictogram + title + description + link; hover / focus state | remote pictograms (5 not exportable) |
| `i-footer` State | 5 | AEM footer dialog (see aem-intact) | — |
| `i-nav` State | 2 | AEM header (Default, Scrolled) | open mega-menu (not designed) |
