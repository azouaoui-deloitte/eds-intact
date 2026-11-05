# AEM + Universal Editor (xwalk) locally — Intact on port 4802

The Intact personal-insurance page is authored in the local **AEM SDK author on http://localhost:4802**
(admin/admin, shared with Scotia and Latam IB, separate roots) and edited with the **Universal Editor**.

## Services

| Service | URL | Notes |
|---|---|---|
| Universal Editor Service | `https://127.0.0.1:8000` | shared `~/ue-service/universal-editor-service.cjs` |
| HTTPS proxy → AEM 4802 | `https://localhost:8444` | `~/ue-service/aem-https-proxy.cjs`; serves this repo for `/content/intact.resource/`, `/content/experience-fragments/intact/*/*/*/*.resource/`, `/conf/intact/*/*/*/*/*.resource/` (`INTACT_PREFIXES` in `~/ue-service/daemon-start-scotia.sh`) |
| AEM SDK author | `http://localhost:4802` | `/content/intact/en/personal-insurance` |
| Local EDS preview | `http://localhost:3010` | `aem up --port 3010 --no-livereload` after `node import-work/tools/build-local.mjs` (serves `content/`, git-ignored) |

Restart proxy + UES only (never AEM): `~/ue-service/daemon-start-scotia.sh restart`.

## AEM content and configuration

| Path | Owner | Content |
|---|---|---|
| `/conf/intact/settings/cloudconfigs/edge-delivery-service-configuration` | this repo (`import-work/tools/ue-build-package.mjs`) | owner `azouaoui-deloitte`, repo `eds-intact`, ref `main`, `editor-support.js` auxiliary script |
| `/content/intact` (`cq:conf=/conf/intact`, allowed templates) › `en` › `personal-insurance` | this repo | page in xwalk structure (sections, blocks, items) |
| `/content/dam/intact/personal-insurance/*` | this repo | Figma image fills cropped to the visible Figma window, SVG exports |
| `/conf/intact/settings/wcm` (templates *Intact EDS Page*, *Intact XF*) | `aem-intact` ui.content | locked header / footer XFs in the page template structure |
| `/content/experience-fragments/intact/en/site/{header,footer}/master` | `aem-intact` ui.content | AEM header / footer components |
| `/content/intact/metadata` | `aem-intact` ui.content | bulk metadata: `nav` / `footer` → XF paths |

Install / update the page package (filters `/conf/intact/settings/cloudconfigs`, `/content/intact` minus
`/content/intact/metadata`, `/content/dam/intact`) and add the UE URL mapping without touching the other mappings:

```bash
import-work/tools/ue-setup-aem.sh            # build + install + UE URL mapping + checks
import-work/tools/ue-setup-aem.sh --skip-osgi
```

OSGi on 4802: `UniversalEditorURLServiceImpl` mappings `/content/scotia`, `/content/latamib`, `/content/intact`;
UE service endpoint `https://127.0.0.1:8000` (not `localhost`, rewritten to `/` by the Franklin rewriter);
`HelixAdminClientImpl` admin API disabled (no preview / publish to admin.hlx.page from this SDK).

## Code sync (required for AEM / Universal Editor rendering) — user action

AEM loads `head.html`, `component-*.json` and the block code from the Edge Delivery **code bus**
`https://main--eds-intact--azouaoui-deloitte.aem.page`. Until the **AEM Code Sync** GitHub App
(https://github.com/apps/aem-code-sync) is granted access to `azouaoui-deloitte/eds-intact`, the page renders
*"Component Models could not be loaded: HTTP 404"*. After granting access:

1. Verify `https://main--eds-intact--azouaoui-deloitte.aem.page/scripts/scripts.js` returns 200.
2. Reload `https://localhost:8444/content/intact/en/personal-insurance.html`; it must contain
   `urn:adobe:aue:config:service" content="https://127.0.0.1:8000` and `data-aue-resource`.
3. Universal Editor: `https://experience.adobe.com/#/aem/editor/canvas/localhost:8444/content/intact/en/personal-insurance.html`.

## Authoring conventions

- Rich text buttons: **bold** link = Primary, *italic* link = Secondary, ***bold + italic*** link = Tertiary;
  inside dark themes (hero, burgundy, teal, red) Secondary / Tertiary render as the Figma *-reversed* types.
- Italic text inside a heading = red accent (`Primary/Intact Red`), as in the Figma headings.
- Section styles: `sand`, `red`, `dark`, `center`, `split` (intro left, block right).
- Fonts: Intact Sans / Intact Serif are licensed and not versioned (`fonts/intact-*` is git-ignored); drop the
  woff2 files in `fonts/` (`intact-sans-{regular,medium,bold}.woff2`, `intact-serif-{regular,medium}.woff2`).
