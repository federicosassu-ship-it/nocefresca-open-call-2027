# QA report — 7 November 2026

Tested on the production build (`npm run build && npm run preview`). The checks are automated in `scripts/qa.mjs`, the raw output is in `qa/report.json`, and full-page screenshots are in `qa/`.

## Results

| Area | Check | Result |
|---|---|---|
| **Accessibility** | axe-core 4.13: WCAG 2.0/2.1/2.2 A + AA + best practices, all accordions open, mobile + desktop | **0 violations** |
| | Lighthouse accessibility (mobile & desktop) | **100** |
| | One `<h1>`, no skipped heading levels, skip link, landmarks | ✓ |
| | All 94 images have `alt` (decorative ones `alt=""`) | ✓ |
| | Keyboard: studio tabs (arrow keys / Home / End), galleries (buttons + arrow keys), accordions, mobile menu (Esc returns focus) | ✓ |
| | Visible focus states (burgundy, ochre on dark) · `prefers-reduced-motion` disables all animation | ✓ |
| | Colour contrast: body text 13.1:1, headings 9.4:1, small accent text ≥ 5:1 | ✓ |
| | Target size ≥ 24 px (WCAG 2.5.8) | ✓ (one inline text link is exempt) |
| **Performance** | Lighthouse mobile (Moto G Power, slow-4G simulation) | **93**: FCP 1.5 s · LCP 2.9 s · TBT 140 ms · CLS 0 |
| | Lighthouse desktop | **100**: FCP 0.4 s · LCP 0.7 s · TBT 0 · CLS 0 |
| | HTML 65 KB gzip (CSS inlined) · JS 9 KB · fonts self-hosted, latin subsets, 2 preloaded | ✓ |
| | Hero: art-directed AVIF (43 KB on phones), responsive preload, `fetchpriority=high`; all other images lazy AVIF/WebP | ✓ |
| **SEO / sharing** | Lighthouse SEO **100**, Best Practices **100** · title, meta description, canonical, Open Graph + 1200×630 image, JSON-LD (Organization, WebPage, FAQPage) | ✓ |
| **Layout** | No horizontal scroll at 320, 360, 375, 414, 768, 1024, 1280, 1440, 1920 px | ✓ |
| **Function** | 0 console errors · 0 broken internal anchors · all images load | ✓ |
| | Sticky mobile CTA: hidden on the hero, shown while reading, hidden over the final CTA and footer | ✓ |
| | `utm_*`/`fbclid` forwarded to the form and the `?/apply_now` URL kept intact | ✓ |
| | Consent: 0 tracking requests before consent and after "Only necessary"; GTM + Pixel requested only after "Accept" | ✓ |
| **Copy accuracy** | Every fact traced to a nocefresca.it URL (see `src/content/opencall.ts`); quotes verbatim; unverifiable claims removed | ✓ (see open flags) |

## Bugs found and fixed during QA

1. On load, the page jumped to the Studios section (`scrollIntoView` on the initial tab). Fixed: only the tab list scrolls, and only on user action.
2. **Mobile layout was 785 px wide** (the browser zoomed out). Two causes: grid blowout from carousels, and visually-hidden
   (absolute) spans escaping non-positioned scroll containers. Fixed with `minmax(0,1fr)`, `min-width:0` and `position:relative` on rails.
3. Footer overflowed by 8 px at 320 px. Fixed.
4. Terracotta used for small labels failed contrast (3.2:1). A darker `--c-terracotta-ink` (5.1:1) is now used for small text.
5. `role="tabpanel"` on `<article>` (invalid ARIA) → `<div>`. The scrollable `<pre>` was made keyboard-focusable.
6. A latent JS bug: a variable shadowed the analytics function inside galleries, so `gallery_navigate` would have thrown. Fixed.
7. Mobile LCP was 5.0 s: phones were downloading the full portrait at 180 KB. Fixed with a dedicated band crop, AVIF at 43 KB and a preload.
8. Forced synchronous reflows from 11 gallery measurements at start-up. Moved into one ResizeObserver pass (reads, then writes).
9. Copy: four small claims that couldn't be verified (captions and alt text) were rewritten; a few that were partly unverifiable
   ("quiet museums", "unedited") were corrected.

## Known limitations

- **Instagram could not be analysed** (login wall). The brand audit uses the site's 2026 "Cartography" graphics as a proxy.
  Screenshots are needed to finalise it.
- The application form lives on the current PHP site. Completion tracking must be added there (see `docs/TRACKING.md`).
- Some studio photos are flagged "not up to date" by the source, and the page keeps that note.
- Lighthouse runs on localhost. Real-world numbers depend on the host: enable HTTP/2+, Brotli and long cache headers for `/_assets/*`, whose file names are hashed.
