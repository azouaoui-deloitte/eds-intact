# Figma (redesign) vs production — `https://www.intact.ca/en/personal-insurance`

Production captured 2026-11-05 with real Chrome (Playwright `channel: chrome`), locale en-CA,
`waitUntil: domcontentloaded` + 6 s, OneTrust banner removed, province modal answered **Quebec**
(the Figma shows « QC »). Viewports 1440 / 768 / 375: `import-work/prod/prod-{desktop,tablet,mobile}.png`,
`prod.html`, `prod-sections.json`, `prod-faq.json`, `prod-links.json`, `prod-header-footer-links.json`.
A later request was answered by an AWS WAF « Human Verification » page: no more automated prod fetches today.

**Design source of truth = Figma.** Production is used only for links, FAQ answers and assets the Figma does not provide.

## Section-by-section

| Figma section | Production equivalent | Status | Content source |
|---|---|---|---|
| S01 header `i-nav` (top bar Personal / Business / **Prestige**, FR, QC, Find a representative; main nav Vehicle insurance, Home insurance, Claims, Online services, **Home helper**; Login, search, **Get my price**) | header: Personal / Business, QC, FR, Find a representative, Login, mega menus (Vehicle, Home, Claims, Online services), « Get a quote » | **changed**: Prestige segment, *Home helper* item and search are new; CTA renamed | Figma labels; prod URLs (mega-menu content not designed) |
| S02 hero « Protect what matters at a smart price » (left on image, label « Get a personalized quote today », Car and home / Car / Home, « Or call now: 1-888-456-7890 ») | hero, same H1, « Save up to $925 when you bundle », Car + Home / Car / Home, 1-844-240-4448, man-with-dog photo | **restyled**: new photo, savings line removed, phone number differs | Figma copy + image; prod webquote URLs (QC) |
| — | key numbers (« 1 in 4 », 24/7, 2,000 brokers, BrandSpark badge) | **removed** | — |
| S03 « Find the protection that fits your lifestyle » + 6 product rows | « Popular coverage in Quebec » icon tiles (Car, House, Synchro, my Drive, Commercial property, Commercial vehicle) | **new component** (list replaces tiles), products changed (Recreative vehicle, Condo added; Synchro / my Drive removed) | Figma copy; prod URLs |
| S04 « We're here for you… » 3 image cards (Submit a claim, Login to Client Centre, Explore Jiffy « New ») | « More than insurance » (Jiffy, Keep it Intact) + « Insurance at your service » | **new / merged** | Figma copy + photos; prod URLs |
| S05 « The most trusted insurance brand in Canada » (burgundy) | — (BrandSpark badge in key numbers) | **new** — body and CTA are placeholders | Figma (placeholder) → **client copy needed** |
| S06 « Honest answers to your insurance questions » + 5 questions | FAQ accordion, same 5 questions, « View all FAQ » | **moved up + restyled** (split layout) | Figma questions = prod; answers from prod |
| S07 « Peace of mind wherever you are » (teal, app) | « Insurance at your service » (online services) + app contest banner | **restyled / merged** | Figma copy; prod URL mobile app |
| S08 « Proud to play our part » + image strip | « Proud to play our part » olympic slider | **restyled** (marquee strip instead of slider, new body copy) | Figma copy + images; prod URL partnerships |
| — | « Advice to help you to protect what you care about » (3 blog cards) | **removed** | — |
| S09 « Get coverage that's tailored to you. » (red) | « Get your home or car insurance quote in minutes in Quebec » (icon banner, quote + phone) | **restyled** (phone CTA removed) | Figma copy; prod quote URL |
| S10 footer « Scrolled Red » | dark footer | **restyled**; Figma columns differ (Products, Quick links ×2, Intact portal) | Figma labels; prod URLs |

Production page height 7670 px (desktop) vs Figma 6651 px.

## Links (Figma label → production URL)

| Figma label | URL |
|---|---|
| Car and home / Car / Home (hero) | `https://webquote.app.intact.ca/?language=EN&province=QC&f={ch,c,h}&origin=INTACT&intcid=personalhomepage` |
| Car insurance | `/en/personal-insurance/vehicle/car-insurance/quebec` |
| House insurance | `/en/personal-insurance/home/house-insurance/quebec` |
| Commercial vehicle | `/en/business-insurance/coverage/commercial-vehicle-insurance` |
| Recreative vehicle | `/en/personal-insurance/vehicle/rv-insurance` |
| Condo insurance | `/en/personal-insurance/home/condo-insurance` |
| Business property | `/en/business-insurance/coverage/property-insurance` |
| Submit a claim | `/en/personal-insurance/claims` |
| Login to Client Centre | `/en/personal-insurance/online-services/client-centre` |
| Explore Jiffy | `/en/jiffy` |
| Discover our award-winning app | `/en/personal-insurance/online-services/mobile-app` |
| See all frequently asked questions | `/en/faq` |
| Discover our partnerships | `/en/partnerships` |
| Get a personalized quote | `https://webquote.app.intact.ca/?language=EN&province=QC&f=ch&origin=INTACT&intcid=personalhomepage` |
| Header / footer links | `import-work/prod/prod-header-footer-links.json` |

## Assets

All page images come from the Figma image fills in original resolution (`import-work/figma/assets/images/`), which are
equal or larger than the production renditions. Logos, social icons, app badges, chevrons and `+` icons are Figma SVG
exports. Production product pictograms (`/Icons/PL-Icon/PL-icon-black/*.svg`) are line icons, not the coloured
Figma pictograms → only the car pictogram is available (see questions).

## Questions for the client / designer

1. **Viewports**: only the 1440 desktop frame exists. Please provide 320/375 mobile and 744/768 tablet frames of the page
   (or confirm that the library components' responsive variable modes are the target). Typography of the hand-built
   H2 (56/56) has no mobile value.
2. **Hand-built sections** S03, S04, S06, S08, S09 are not instances of the library components (Product Feature, Blog Cards,
   Accordion, Scroller/Marquee, Pre-footer banner) and use hard-coded values (100 px padding vs the 96 px variable,
   56 px headings). Should they become library components (with variants) or stay page-specific?
3. **States**: hover is designed only for the first product row; no hover / focus / open state for the FAQ items,
   cards, footer links; no design for the open mega-menu (`i-nav` « Open Menu », « Menu Type » swap) nor the scrolled header.
4. **Placeholder copy**: S05 body « Tempus leo eu… » and CTA « Button »; S03 descriptions for Commercial vehicle and
   Business property duplicate other rows; footer has two identical *QUICK LINKS* columns and « Commercial vehical » typo.
5. **Phone numbers**: hero shows 1-888-456-7890 (looks like a placeholder); production uses 1-844-240-4448.
6. **Province logic**: production asks for the province and personalises products / links (Quebec). Is the redesigned page
   Quebec-only, or should the province selector (footer « Quebec ») drive the content?
7. **Assets**: please share the remote libraries (pictograms `product list v2`, icon set, `Gif`) or export the 5 missing
   pictograms (house, commercial vehicle, RV, condo, business property); confirm licences for the S08 sport photos and the
   Olympic bracket.
8. **Fonts**: Intact Sans / Intact Serif licence for self-hosting on aem.live (the EDS repository is public on GitHub).
9. **Behaviour**: S08 strip — auto-scrolling marquee or manual scroll? speed, pause on hover, `prefers-reduced-motion`.
   FAQ — single or multiple open items? Footer « Legal notes » chevron — expandable?
10. **Figma access**: the account has a View seat on the Intact org (MCP 20 calls / month, REST Tier 1 20 / month) and no
    access to the remote libraries. A **Dev seat** on the Intact org (or Dev Mode exports / sharing the library files) is
    needed for variants and states verification at scale.
11. Footer logo uses the **French** variant on the English page; hero « Show breadcrumbs » is on but nothing is drawn —
    should a breadcrumb appear?
