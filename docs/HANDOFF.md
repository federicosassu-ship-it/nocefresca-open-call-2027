# Passaggio di consegne allo sviluppatore — Landing Open Call 2027 di Nocefresca

Landing a pagina singola, pensata prima per il mobile, costruita come **sito statico** (l'output è HTML/CSS/JS semplice).
Non servono server, database o CMS: si può pubblicare ovunque si possano caricare file statici.

- Anteprima online: https://federicosassu-ship-it.github.io/nocefresca-open-call-2027/
- Codice sorgente: https://github.com/federicosassu-ship-it/nocefresca-open-call-2027

## Tecnologie usate

| | |
|---|---|
| Framework | [Astro](https://astro.build) 7 (output statico, nessun framework lato client) |
| Immagini | `astro:assets` + sharp → AVIF/WebP responsive, generate in fase di build |
| Font | Space Grotesk + Vollkorn, ospitati in locale tramite `@fontsource-variable` |
| Animazioni | GSAP 3 + ScrollTrigger (solo per l'intro del logo), CSS per il resto; rispetta `prefers-reduced-motion` |
| Grafica generata in build | `scripts/build-map.mjs` (mappa della Sardegna, d3-geo), `build-contours.mjs` (motivi a curve di livello), `build-wordmark.mjs` (logo vettorializzato con Potrace) |
| Controlli qualità | Playwright + axe-core (`npm run qa`) |

Richiede Node 22 o superiore.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview    # serve la cartella dist/
npm run qa         # richiede `npm run preview` attivo
```

## Dove si trovano le cose

- **Tutti i testi, prezzi, date e link:** `src/content/opencall.ts`, unica fonte dei contenuti. I testi si cambiano qui, non nei componenti.
- **Impostazioni** (URL del modulo di candidatura, ID di GTM / Meta Pixel, stato delle candidature): `src/config.ts`.
- **Ordine delle sezioni:** `src/pages/index.astro`.
- **Layout, `<head>`, SEO, schema FAQ, impostazioni predefinite del consenso:** `src/layouts/Base.astro`.
- **Stili globali e design token:** `src/styles/global.css` (colori come variabili CSS su `:root`).
- **Foto:** `src/assets/img/` (originali; le versioni ridimensionate le crea la build).

| # | Sezione | Componente |
|---|---|---|
| – | Intro del logo (guidata dallo scroll) | `Intro.astro` |
| – | Header / menu | `Header.astro` |
| 01 | Hero + striscia con i dati chiave | `Hero.astro`, `InfoStrip.astro` |
| 02 | A chi si rivolge | `ForYou.astro` |
| 03 | Studi | `Studios.astro` |
| 04 | Milis + mappa | `Milis.astro`, `MapSardinia.astro` |
| 05 | Vivere qui / le case | `Living.astro` |
| 06 | Artisti, video, network | `Artists.astro` |
| 07 | Programma | `Programme.astro` |
| 08 | Date e stato delle candidature | `Dates.astro`, `StatusBadge.astro` |
| 09 | Costi (calcolatore + pannello dettagli + finanziamenti) | `Fees.astro`, `FeeEstimator.astro` |
| 10 | Come candidarsi | `Apply.astro` |
| 11 | FAQ | `Faq.astro` |
| – | CTA finale, footer, barra "Apply" fissa, banner cookie | `FinalCta.astro`, `Footer.astro`, `StickyApply.astro`, `ConsentBanner.astro` |

Componenti condivisi: `Rail.astro` (caroselli orizzontali), `SectionHead.astro`, `ApplyButton.astro`.
`Glance.astro` e `Month.astro` non sono più nella pagina (tolti su richiesta della fondatrice) ma restano nel codice nel caso servano di nuovo.

## Comportamenti da sapere

- **I pulsanti "Apply"** portano al modulo esistente (`?/apply_now` su nocefresca.it) e passano i parametri UTM / `fbclid` arrivati dal clic sull'inserzione.
- **Lo stato delle candidature** (aperte / posti residui / chiuse) è una sola impostazione: badge, avvisi e testi si adeguano da soli.
- **I video** caricano l'embed di Instagram solo quando qualcuno preme play (prima Instagram non viene contattato).
- **Tracciamento:** gli eventi `dataLayer` sono elencati in `docs/TRACKING.md`. Il Consent Mode v2 parte da *negato*; GTM e Pixel restano spenti finché non si inseriscono gli ID in `src/config.ts` e il visitatore accetta.
- **Accessibilità:** accordion con `<details>` e finestre con `<dialog>` nativi, navigazione da tastiera, contrasto WCAG 2.2 AA; dettagli in `docs/QA.md`.

## Pubblicazione su nocefresca.it

Due strade semplici:

1. **In una sottocartella** (consigliata), ad esempio `nocefresca.it/open-call/`: fare la build con `BASE_PATH=/open-call/ SITE_URL=https://www.nocefresca.it npm run build` e caricare il contenuto di `dist/` in quella cartella. Il resto del sito non cambia.
2. **Riportarla nei template del sito esistente:** usare i file HTML delle singole sezioni (vedi sotto) come riferimento visivo e `src/content/opencall.ts` per i testi. I blocchi `<style>` e `<script>` di ogni componente sono autonomi.

Nel repository c'è anche un workflow di GitHub Pages (`.github/workflows/pages.yml`) usato per il link di anteprima.

## Esportare l'HTML di ogni sezione

```bash
npm run build && node scripts/export-sections.mjs
```

Crea la cartella `handoff/` (non inclusa nel repository):

- `handoff/site/`: la pagina completa già compilata. Va aperta tramite un server locale (es. `npx serve handoff/site`); se aperta direttamente dal disco il browser blocca gli script.
- `handoff/sections/NN-nome.html`: un file per sezione con l'HTML definitivo e tutto il CSS della pagina. Si aprono direttamente nel browser e servono come riferimento o per il porting: sono statici (senza script), quindi caroselli, calcolatore e finestre funzionano solo nella pagina completa.

## Da confermare con Nocefresca

Cercare `[TO CONFIRM]` nel codice. Punti principali: posizione dello studio dell'Opzione D (Casa Oaxaca o Casa Bagnolo), frequenza delle pulizie, grafia dei nomi dei finanziatori, loghi ad alta risoluzione dei finanziatori e di TransArtists, e gli ID di GTM / Meta Pixel.
