# Developer handoff — Nocefresca Open Call 2027 landing

A single-page, mobile-first landing for the Open Call, built as a **static site** (plain HTML/CSS/JS output).
It needs no server, database or CMS: it can be hosted anywhere static files are served.

- Live preview: https://federicosassu-ship-it.github.io/nocefresca-open-call-2027/
- Source: https://github.com/federicosassu-ship-it/nocefresca-open-call-2027

## Stack

| | |
|---|---|
| Framework | [Astro](https://astro.build) 7 (static output, no client framework) |
| Images | `astro:assets` + sharp → responsive AVIF/WebP, generated at build time |
| Fonts | Space Grotesk + Vollkorn, self-hosted via `@fontsource-variable` |
| Motion | GSAP 3 + ScrollTrigger (logo intro only), CSS for the rest; `prefers-reduced-motion` respected |
| Build-time art | `scripts/build-map.mjs` (Sardinia map, d3-geo), `build-contours.mjs` (contour motifs), `build-wordmark.mjs` (logo vectorised with Potrace) |
| QA | Playwright + axe-core (`npm run qa`) |

Requires Node 22+.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview    # serve dist/
npm run qa         # needs `npm run preview` running
```

## Where things are

- **All copy, prices, dates, links:** `src/content/opencall.ts` — single source of truth. Change text here, not in components.
- **Settings** (application URL, GTM / Meta Pixel IDs, status): `src/config.ts`.
- **Page order:** `src/pages/index.astro`.
- **Layout, `<head>`, SEO, FAQ schema, consent defaults:** `src/layouts/Base.astro`.
- **Global styles & design tokens:** `src/styles/` (colours as CSS custom properties on `:root`).
- **Photos:** `src/assets/img/` (originals; the build makes the resized versions).

| # | Section | Component |
|---|---|---|
| – | Logo intro (scroll-driven) | `Intro.astro` |
| – | Header / menu | `Header.astro` |
| 01 | Hero + key facts strip | `Hero.astro`, `InfoStrip.astro` |
| 02 | Who it's for | `ForYou.astro` |
| 03 | Studios | `Studios.astro` |
| 04 | Milis + map | `Milis.astro`, `MapSardinia.astro` |
| 05 | Living / houses | `Living.astro` |
| 06 | Artists, videos, network | `Artists.astro` |
| 07 | Programme | `Programme.astro` |
| 08 | Dates & status | `Dates.astro`, `StatusBadge.astro` |
| 09 | Fees (estimator + details drawer + funding) | `Fees.astro`, `FeeEstimator.astro` |
| 10 | How to apply | `Apply.astro` |
| 11 | FAQ | `Faq.astro` |
| – | Final CTA, footer, sticky apply bar, cookie banner | `FinalCta.astro`, `Footer.astro`, `StickyApply.astro`, `ConsentBanner.astro` |

Shared pieces: `Rail.astro` (horizontal scrolling carousels), `SectionHead.astro`, `ApplyButton.astro`.
`Glance.astro` and `Month.astro` are no longer on the page (removed at the founder's request) but kept in case they come back.

## Behaviour worth knowing

- **Apply buttons** go to the existing form (`?/apply_now` on nocefresca.it) and forward UTM / `fbclid` parameters from the ad click.
- **Application status** (open / rolling / closed) is one setting; badge, banners and copy follow it.
- **Videos** load Instagram's embed only when someone presses play (nothing is contacted before that).
- **Tracking:** `dataLayer` events are listed in `docs/TRACKING.md`. Consent Mode v2 defaults to *denied*; GTM and Pixel stay off until IDs are set in `src/config.ts` and the visitor accepts.
- **Accessibility:** native `<details>` accordions and `<dialog>` modals, keyboard support, WCAG 2.2 AA contrast; see `docs/QA.md`.

## Publishing on nocefresca.it

Two straightforward options:

1. **As a sub-folder** (recommended), e.g. `nocefresca.it/open-call/`: build with `BASE_PATH=/open-call/ SITE_URL=https://www.nocefresca.it npm run build` and upload the contents of `dist/` to that folder. Nothing else on the existing site changes.
2. **Porting into the existing site's templates:** use the per-section HTML files (below) as the visual reference and `src/content/opencall.ts` for the text. Each component's `<style>` and `<script>` blocks are self-contained.

The repo also has a GitHub Pages workflow (`.github/workflows/`) used for the preview link.

## Per-section HTML export

```bash
npm run build && node scripts/export-sections.mjs
```

Creates `handoff/` (not committed):

- `handoff/site/` — the complete built page. Open it through a local server (e.g. `npx serve handoff/site`); browsers block its scripts if opened directly from disk.
- `handoff/sections/NN-name.html` — one file per section with the final HTML and all the page CSS. They open directly in a browser and are for reference/porting: they are static (no scripts), so carousels, the estimator and dialogs only work on the full page.

## Still to confirm with Nocefresca

Search the code for `[TO CONFIRM]`. Main points: Option D studio location (Casa Oaxaca vs Casa Bagnolo), cleaning frequency, funder names spelling, high-resolution logos for funders and TransArtists, and the GTM / Meta Pixel IDs.
