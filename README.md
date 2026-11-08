# Nocefresca — Open Call 2027 landing page

A conversion-focused, mobile-first landing page for paid social traffic (Instagram/Meta).
It replaces the 12-sub-page Open Call with one story-driven page.
All content is verified against nocefresca.it (7 Nov 2026) and every image is an authentic Nocefresca photo.

| | |
|---|---|
| Strategy, audit, IA, design system | [`docs/STRATEGY.md`](docs/STRATEGY.md) |
| Tracking & consent plan | [`docs/TRACKING.md`](docs/TRACKING.md) |
| QA report (accessibility, performance, functional) | [`docs/QA.md`](docs/QA.md) |
| Full-page screenshots | [`qa/mobile-full.jpg`](qa/mobile-full.jpg), [`qa/desktop-full.jpg`](qa/desktop-full.jpg) |

## Stack: why Astro

- **Output is plain static HTML/CSS** plus one 9 KB vanilla JS file. It can be uploaded anywhere,
  including a folder on the current PHP site, with no server runtime.
- **Components and a single content file** keep it maintainable: next year's edition is mostly a data edit.
- **Built-in image pipeline** generates responsive AVIF/WebP from the original photos at build time.
- No UI framework, no tracking SDK, no external fonts or CDNs. It is fast and GDPR-friendly by default.

## Commands

Requires Node 22+.

```bash
npm install
npm run dev        # local dev server → http://localhost:4321
npm run build      # regenerates map + contour motifs, then builds to dist/
npm run preview    # serves dist/ at http://localhost:4321
npm run qa         # (with preview running) axe-core, layout and interaction checks + screenshots → qa/
npm run og         # re-renders public/og-image.jpg (1200×630 share image)
```

## Deploy

1. In `src/config.ts`, set `pageUrl` to the final public URL. It is used for the canonical tag and `og:url`.
2. If the page lives in a sub-folder such as `nocefresca.it/open-call/`, set `base: '/open-call/'` in `astro.config.mjs`.
3. Run `npm run build` and upload the contents of `dist/`.
4. Set the tracking IDs in `src/config.ts` only after reading `docs/TRACKING.md`. They are `null` by default, so the prototype never sends data.

## Editing content: one file

Everything factual is in **`src/content/opencall.ts`**, with a source URL for each block:

- **Application status.** Edit `status.state`: `'open' | 'rolling' | 'closed' | 'upcoming'`. This one change updates the
  hero, info strip, Dates section, sticky bar, final CTA and the CTA label/destination together.
  When closed, the CTAs switch to short stays.
- **Per-period availability.** Set `periods[].availability` to `'available' | 'few' | 'full'`.
  `'unknown'` (the default) shows nothing, so nothing is claimed until you confirm it.
- Fees, inclusions, payment terms, studios, equipment, FAQ, testimonials, hosts, partners, past themes and the form questions
  shown in "Copy the form questions" all live in the same file.

**Images** are in `src/assets/img/…`, referenced by file name. Swap a file and keep its name, or update the name in the
content file. A missing image fails the build loudly; it never ships silently.

**Design tokens** (colours, type scale, spacing) are at the top of `src/styles/global.css`.

## Funders logo wall

Under the fees, the "Funding" block explains that residents can apply for grants. To show the institutions that funded past
residents (embassies, arts councils, universities), add them to `funders` in `src/content/opencall.ts` and put each logo in
`src/assets/img/funders/`. The logo wall stays hidden while the list is empty.

## Structure

```
src/
  content/opencall.ts     ← all copy & facts (edit here)
  config.ts               ← page URL, tracking IDs, consent mode
  components/             ← one component per section (Hero, InfoStrip, Month, ForYou, Glance, Milis,
                            Studios, Living, Artists, Programme, Dates, Fees, Apply, Faq, FinalCta, Footer…)
  layouts/Base.astro      ← <head>: SEO, Open Graph, JSON-LD, fonts, Consent Mode defaults
  scripts/main.ts         ← reveal, tabs, galleries, sticky CTA, menu, analytics, consent, UTM forwarding
  styles/global.css       ← design system
  generated/              ← map + topographic motifs (built by scripts/, do not edit)
scripts/                  ← build-map, build-contours, og-image, qa
```

## Before going live: [TO CONFIRM]

These are the full flags from `docs/STRATEGY.md` §E, condensed:

1. The real availability per 2027 period. The page says "you can still apply while places remain" because that is what the site states.
2. The "42 available places" figure on the current site equals total capacity (6 × 7). It is not shown on the new page.
3. Is applying free? Nothing on the site says so. If it is, it's worth stating.
4. Cleaning frequency (start/end vs start/middle/end) and the Casa Bagnolo studio count (the source says "four" but lists three).
5. The stats "160+ artists since 2021 / 30+ countries" were counted from the Artists archive.
6. Final page URL, GTM/Meta IDs and the consent tool: the built-in banner or iubenda.
7. Missing assets: Instagram screenshots for the brand audit, updated photos of Studio Italo, Studio Leo and the Research Studio,
   higher-resolution host portraits (Antonella, Italo & Leo are 120 px), a vector logo, photo credits,
   and confirmation that resident portraits and quotes may be used in paid campaigns.
