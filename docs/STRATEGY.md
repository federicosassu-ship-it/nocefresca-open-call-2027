# Nocefresca — Open Call 2027 landing page
### Research, audit, information architecture & design system

Researched on **7 November 2026**. Everything factual below comes from
nocefresca.it, fetched that day. Lines marked **[VERIFIED]** come straight from a source.
Lines marked **[PROPOSED]** are my design decisions. Lines marked **[TO CONFIRM]** need
a check by the Nocefresca team before the page goes live.

---

## 0. Summary

- The current Open Call has plenty of good, honest information. It's spread across
  **12 sub-pages and a dropdown menu**. There's no sense of place above the fold, and the first page has
  **a deadline that has passed with no clear status**. Ad traffic hits a dead end.
- The new page tells one story on one URL:
  **want it → get it → see yourself there → trust it → practical details → apply**.
  The long detail stays one tap away in accordions, tabs and galleries.
- The visual identity comes from three verified sources: the **logo brown (#572400)**,
  the **2026 "Cartography" graphics** (ochre/coral paper textures, burgundy #682B33 text,
  topographic lines, a grotesk typeface), and the **real colours of the place**: ochre walls,
  basalt, cotto floors, citrus groves.
- **Instagram couldn't be analysed directly** (see §1). The 2026 graphics on the site are
  almost certainly the same series that runs on the feed. They are the bridge between the two.

---

## 1. Research scope & limitations

**Analysed [VERIFIED]:** Open Call 2027: all 12 sub-pages (New open call announced, For whom,
Dates, Programme, Location, Housing, Studios, Equipment & Gears, Facilities & Additional
services, Fees, Partners). Also Home, About, Artists (178 archive entries, 2018–2026), FAQ
(23 Q&As), Short-stays (Nocefreschissima), News (incl. resident letters and curatorial
diaries), Press, Apply page, and all **8 steps of the live application form** (read only;
nothing was submitted). Also the site CSS (colour values, fonts) and 256 original images.

**Instagram — NOT accessible.** `instagram.com/nocefresca` redirects anonymous visitors to the
login wall (HTTP 429 → `/accounts/login`). I did not try to get around this. The site's own
SnapWidget feed (`snapwidget.com/embed/1062936`) is on a host this environment doesn't allow.

**What I used instead:** the site's most recent graphic assets (news covers 104–106,
Sept–Oct 2026: *"Cartography Nr. 4 / Nr. 5 — Artists of the month"*, *"Texts by guest
curator"*). These look like Instagram carousel covers. I treated them as the stand-in for the
current social identity.

**Needed to finalise the brand audit [TO CONFIRM]:**
1. Screenshots of the last ~30 grid posts and 3–4 recent carousels, including the Open Call 2027 announcement.
2. The name of the typeface used in the 2026 graphics (it visually matches **Space Grotesk**, see §B.3).
3. The original high-res files of the paid-ad creatives, so the hero can mirror them exactly.
4. A vector logo (SVG/PDF). Only 470 px PNGs exist on the site.

---

## A. Diagnosis of the current Open Call

| Area | Problem (evidence) | Effect on conversion |
|---|---|---|
| **Visual impact** | The ad lands on a text page. There's one 1280×492 courtyard photo, no headline promise, and generic menus. | No emotional hook in the first 3 seconds after an Instagram tap. |
| **Hierarchy** | The key facts (dates, fees, studios, what's included) sit on 11 separate sub-pages behind a menu labelled "New open call announced". Fees are 10 clicks deep in the menu order. | Artists bounce before reaching the decisive information. |
| **Status** | "Application deadline **7th September 2026\*\***" and "Available places **42\*\***", plus a footnote: *"Is the open call expired? If there are available places, you can still apply"*. | Today the main deadline has passed. Visitors can't tell whether applying is worth it. |
| **"42 places"** | 6 periods × 7 residents (FAQ: "up to 7 residents") = **42**. That's total yearly capacity, not live availability. | Misleading as a scarcity signal. **[TO CONFIRM]** — don't publish it as "places left". |
| **Mobile UX** | Sub-navigation becomes a `<select>` dropdown. Slideshows use tiny ❮ ❯ arrows. Fee table is wide. "Back to top" button. | Hard to explore on the phones that paid social sends. |
| **Engagement** | The best storytelling (resident letters, "10 things to do in Milis", "Which month to choose") is buried in News. Testimonials are a 4-item carousel on Home only. | The proof that it changes artists' lives is missing from the decision page. |
| **Trust** | Network memberships (Alliance of Artists Communities, Res Artis, AiR), EU/Regione support, the curator and hosts are spread across footer/About/Housing. | Credibility is high but invisible where it matters. |
| **Conversion path** | Apply → info page (`?/apply_form`) → button → form (`?/apply_now`), an 8-step form with no warning about what you need (portfolio PDF max 20 MB, funding plan, 3 period choices…). | Extra click, plus abandonment from unprepared applicants. |
| **Tracking** | Universal Analytics `UA-179520545-1` (shut down in 2024) plus GTM `GTM-M6ST7FR` plus Histats. No consent mode visible. | Ad optimisation is blind. Possible GDPR exposure. |

---

## B. Brand audit (website + 2026 graphics; Instagram pending)

### B.1 Personality [VERIFIED from copy and imagery]
Warm, honest and a little playful ("you can chat with sheep, horses and chickens";
"Learn how to order your cappuccinos and vino rosso beforehand!"). Rooted in the community: hosts
are named and quoted. Process over product ("no final outcome required"). Internationally
minded but **anti-touristic** ("far from hotel standards and Airbnb neutrality").
In one line: **a small independent cultural house, not a retreat brand.**

### B.2 Colour palette

| Token | HEX | Source | Status |
|---|---|---|---|
| `brown` (logo) | **#572400** | Logo PNG pixels, CSS `.bgmarron/.scuro/.chiaro` | VERIFIED |
| `burgundy` | **#682B33** | Title colour in the 2026 graphics (median of 3 files: 104_1, 105_1, 106_1) | VERIFIED (sampled from JPEG) |
| `ochre` | **#EDC77D** | Background of the 2026 "Cartography" graphics; also Casa Bagnolo walls in photos | VERIFIED (sampled) |
| `coral` | **#EBAC94** | Background of the 2026 "Cartography Nr. 5" graphic | VERIFIED (sampled) |
| `paper` | **#F6F1E7** | CSS `#f6f1e7`; paper highlights in the graphics `#f6f0e3` | VERIFIED |
| `sand` | **#E7DABF** | CSS `.bg2b` | VERIFIED |
| `terracotta` | **#BB754F** | CSS `.marronchiaro`, `.bg4` | VERIFIED |
| `olive` | **#58550B** | CSS `.bgverdescuro` (application form header) | VERIFIED |
| `deep` | **#4F1F06** | CSS `.marronscuro` (footer band) | VERIFIED |
| `ink` | **#3E1F22** | Darkened burgundy for long body text (13.1:1 on paper) | PROPOSED |
| `muted` | **#7A4A4E** | Secondary text (6.4:1 on paper; light surfaces only) | PROPOSED |
| `ochre-soft` / `coral-soft` | #F4E2BC / #F6D5C8 | Tints for large surfaces | PROPOSED |

**Contrast checks (WCAG 2.2):** burgundy on paper 9.41, on ochre 6.59, on coral 5.48. Paper on
deep 12.18. Terracotta is decorative only (3.23:1, large text or graphics).

### B.3 Typography
- **Website [VERIFIED]:** Vollkorn (serif, headings) + Poppins (body). The logo wordmark is a geometric sans.
- **2026 graphics [VERIFIED visually]:** a contemporary grotesk, set medium weight in sentence case,
  with small labels like "Cartography Nr. 4". Side-by-side rendering against 10 candidates
  matches **Space Grotesk** most closely ('y', 'g', 't', 'a', numerals). **[TO CONFIRM]**
- **[PROPOSED] system:** **Space Grotesk** for headlines, labels and UI (the social-ad continuity)
  + **Vollkorn** for body, quotes and italics (the website heritage, editorial warmth). Poppins is
  dropped: it's generic and adds a third family. Both fonts are self-hosted (OFL), with no Google CDN, for GDPR and speed.

### B.4 Photography [VERIFIED from 256 site images]
Natural daylight, strong Mediterranean sun and hard shadows. Candid, documentary moments
(artists laughing, cooking, painting, gathering material). Textures everywhere: basalt, whitewash, cotto,
woven baskets, old furniture. Saturated local colour: ochre walls, blue sky, citrus. People
are shown as individuals, never staged as models.
**[PROPOSED] treatment:** no filters, square corners, generous crops, magazine-style captions
naming the place. A 4:5 portrait format on mobile echoes the Instagram feed.

### B.5 Graphic language [VERIFIED]
1. **Topographic contour lines + dotted routes**: the 2025–26 "Unofficial Cartographies" editions.
2. **Hand-drawn loose orbits** around the wordmark (footer logo), a walnut shell or a pebble.
3. **Hand-drawn illustrated map of Milis** (people, dogs, cats).
4. **Paper grain** and ochre/coral flat fields.
5. **Series numbering** ("Cartography Nr. 4").
**[PROPOSED]:** procedurally generated contour lines (inline SVG, ~4 KB) on ochre/coral fields.
Dotted routes connect the application steps and the map journey (Cagliari → Oristano → Milis).
Each section gets a "Nr." label. These are derived, not copied. The 2027 theme is not published, so
the page never claims a theme.

### B.6 Tone of voice
Use the brand's own phrases where they're strong:
- "Your rural artist's studio in the heart of the Mediterranean."
- "Time and space to focus on your creative practice."
- "Process based: no final outcome required."

Write short declaratives, use concrete numbers, keep a touch of humour. Avoid "unleash", "transformative journey",
countdowns, or anything else with a luxury or growth-hack tone. Residents' own words do the persuading.

### B.7 Cross-platform consistency principles [PROPOSED]
1. **Same first frame:** ochre/coral field + burgundy Space Grotesk headline + one authentic photo, on both the ad and the hero.
2. **One CTA colour:** burgundy button on light surfaces, ochre button on photo or dark surfaces.
3. **Sentence case everywhere** (as in the 2026 graphics). Labels use the "Nr." pattern.
4. **Real people, real places.** No stock imagery, ever.
5. **Name things the way the site does:** Casa Bagnolo, Casa Oaxaca, Orchard Studio Cottage, Nocefreschissima.

---

## C. Content inventory → new location

| Source content (URL `?/…`) | Key facts kept | New location | Treatment |
|---|---|---|---|
| New open call announced | 7th edition, Milis, 19 km to coast, deadline 7 Sep 2026, "42 places", late-apply rule | Hero + status component + Dates | Fast + editable status |
| For whom | 12 disciplines "but not limited to"; 10 adjectives; incubator text | Nr.03 "Is it for you?" | Typographic list + accordions |
| Home "You will love it if…" | 6 motivations | Nr.03 | Checklist |
| Dates | 6 periods 2027 with exact arrival/departure dates; results 21 Sep 2026 | Nr.10 Dates & availability | Period cards |
| News "Which month to choose" | Seasonal character per month | Nr.10 period cards (1 line each) + link | Excerpt |
| FAQ weather | Temperatures by month | Nr.10 period cards | Inline |
| Programme | 6 activity types, curator 2 group + 3 individual sessions, written texts, pre-departure meeting, yearly theme, calendar PDF | Nr.09 Programme | Arc + accordions + PDF link |
| Artists archive | Past themes 2023–2026; 178 entries; 24 artists in 2026 | Nr.08 Artists + Nr.09 themes | Portrait strip + stats |
| Location | Milis facts, services, citrus groves of Camaldolese monks, Montiferru, distances | Nr.05 Milis | Map + facts + gallery |
| News "10 things in Milis / W. Sardinia" | Local life | Nr.05 links | Contextual links |
| Housing | Network of local homes, shared/private, amenities, "traces of who lived there before", 4 hosts | Nr.07 Living | Gallery + hosts + accordion |
| Studios | 3 premises, 7 studios + 80 m² garden: specs, honest notes, "which studio to choose" | Nr.06 Studios | Interactive studio selector |
| Equipment & Gears | Full list (9 categories) + equipment budget | Nr.06 | Accordion (complete list) |
| Facilities & Additional services | 10 included facilities, 4 paid services | Nr.11 Fees (included / extras) + Nr.07 | Lists |
| Fees | Options A–E €1,650–1,880/month, guest €15/night (min 7 nights) | Nr.11 Fees | Option cards + details |
| Form step 7 / FAQ | €450 confirmation fee within 2 weeks; balance 12 weeks before; cancellation & rescheduling (€80) | Nr.11 | Payment timeline + accordion |
| FAQ "funding" | No fellowships; invitation letter + personalised budget | Nr.11 + FAQ | Callout |
| Apply page | Annual call; apply anytime with secured funds; 5 selection criteria; ≥20 min form | Nr.12 How to apply | 4 steps |
| Application form (8 steps) | What you need (project idea, equipment, 1–3 months + 3 choices, gift to community, studio/housing, funds, CV+portfolio PDF ≤20 MB, links) | Nr.12 "Prepare" checklist + "copy the questions" | Checklist |
| FAQ (23) | 14 conversion-critical Qs inline | Nr.13 FAQ | Accordion + link to full FAQ |
| Testimonials (4) + resident letters (2) | Verbatim quotes, names, discipline, country | Nr.08 Artists | Featured letter + cards |
| Partners (9) | Names + one-line roles | Nr.09 Programme (network) | Compact list + links |
| About | First permanent residency programme in Sardinia (their claim); founder Francesca Sassu; contact | Hero support + FAQ contact card | Human contact |
| Footer | Address, network logos, EU/Regione/PSR logos, privacy | Footer | Logos must stay (funding visibility) |
| Short-stays | Nocefreschissima 2-week alternative | Footer + Dates fallback | Cross-link |

No essential information is lost: every detail is either on the page or one link away to the original sub-page.

---

## D. Conversion strategy

1. **Message match:** the hero reuses the ad's world (ochre, burgundy grotesk, a real photo) and
   answers *what, where, who, when, how much* in the first viewport. That's the info strip.
2. **Honest status component:** "Main deadline passed · applications reviewed while places remain".
   It's a single editable data object that updates the hero, Dates, FAQ and final CTA together.
3. **Desire before detail:** an image-led "a month here" sequence built only from verified facts.
4. **Self-qualification:** "You'll love it if…" next to "It might not be for you if…". Every point
   comes from the FAQ and resident letters. This raises applicant quality and lowers wasted ad spend.
5. **Glance hub:** 8 cards answer the 8 recurring questions and deep-link to the detail.
6. **Proof where doubt peaks:** resident voices plus network memberships, placed right before the price.
7. **Price transparency:** options A–E, included/excluded, payment timeline, cancellation terms. No dark patterns.
8. **Friction removal:** a "Prepare in 10 minutes" checklist plus a *Copy all form questions* button,
   so artists draft answers offline. The CTA goes straight to `?/apply_now`, skipping the interstitial page.
9. **CTA cadence:** header (desktop), hero, glance, after voices, fees, apply, final, and a sticky mobile bar
   that hides over the final CTA and footer.

---

## E. Factual flags (fix on the live site and confirm before launch)

1. **Status:** main deadline 7 Sep 2026 and results 21 Sep 2026 have both passed. Confirm the real availability per period. **[TO CONFIRM]**
2. **"42 available places"** = total capacity (6 × 7), not remaining places. **[TO CONFIRM]**
3. **Cleaning:** Housing says "beginning and end"; FAQ says "beginning, middle and end". The page uses the conservative version. **[TO CONFIRM]**
4. **Application fee:** none is mentioned anywhere. If applying is free, say so; it's a strong conversion line. Not claimed on the page. **[TO CONFIRM]**
5. **Rolling decisions:** no published response time for late applications. Not claimed. **[TO CONFIRM]**
6. **2027 theme:** not published. The page lists only past themes. **[TO CONFIRM]**
7. **Studio photos:** Studio Italo, Studio Leo and Research Studio photos are "not updated" (per the source). The page keeps that note. New photos are needed.
8. **Orchard Studio Cottage size:** "sq m" is blank on the source.
8b. **Casa Bagnolo studio count:** the Studios page says "four studios" but lists three (Ramiro, Marco, Nick); the form offers seven studios in total. The page names the three listed ones. **[TO CONFIRM]**
9. **Copy errors on the live site:** "Mills" for Milis; "chemistry" for pharmacy; "Additionals notes"; Volcorn typo in CSS.
10. **Stats:** "170+ artists from 30+ countries since 2021" is derived from the Artists archive (169 Milis entries 2021–26, including duos; 36 countries/territories). **[TO CONFIRM]**
11. **Analytics:** UA property is dead. Migrate to GA4 via GTM with Consent Mode v2 (see TRACKING.md).
12. **Supported-by logos** (Regione Sardegna, PSR, EU) are kept in the footer. Confirm the required placement rules with the funding body.

---

## 2. Information architecture (final)

| Nr. | Section | Purpose / question answered | Main message | Visual approach | Interaction | Conversion role |
|---|---|---|---|---|---|---|
| — | Header | Orientation | Nocefresca · Apply | Paper bar, logo | Anchor nav (desktop); Apply always visible | Persistent CTA |
| 01 | Hero | What, where, when, how much? | "Your rural artist's studio in the heart of the Mediterranean." | Mobile: full-bleed portrait photo, headline on the sky. Desktop: editorial split | Primary + secondary CTA; info strip | Attention + first CTA |
| 02 | A month here | What will I experience? | Time, a studio, a village, good company | Asymmetric photo essay with 6 verified captions + resident quote | Scroll reveal | Desire |
| 03 | Is it for you? | Am I the right fit? | 12 disciplines (but not limited to) · love it if / not for you if | Large typography, two-column honesty | Accordion: "10 words that describe Nocefresca" | Identification + qualification |
| 04 | At a glance | The essentials | 8 cards | Bento grid with photos + contour fields | Deep links | Understanding, CTA |
| 05 | Milis, Sardinia | Where exactly? | A citrus village at the foot of Montiferru, 19 km from the sea | Generated map Europe → Sardinia → Milis + photo strip | Seasons and "getting here" accordions | Place as artistic value |
| 06 | Studios | Where will I work? | Seven private studios in three houses + an 80 m² studio garden | Studio selector with gallery and specs | Tabs + swipe gallery; equipment accordion | Core benefit |
| 07 | Living | What's daily life like? | Real homes in the village, local hosts | Photo pair + host portraits | Accordions (housing, food, practicalities) | Removes uncertainty |
| 08 | Artists | Can I trust it? | Residents' own words | Featured letter + 4 voices + 2026 portrait strip + network logos | Horizontal scroll | Trust + CTA |
| 09 | Programme | What happens during the month? | Self-directed, never alone | Before / during / at the end arc, past themes, partners | Accordions, PDF link | Value of curation |
| 10 | Dates | When can I come? | Six periods in 2027, stay 1–3 months | Period cards with season + weather | Status badges (hidden when unknown) | Practical |
| 11 | Fees | What does it cost? | €1,650–1,880/month, studio + housing included | Option cards A–E, included/excluded, payment timeline | Details accordions | Trust through transparency + CTA |
| 12 | How to apply | How exactly? | Four steps, about 20 minutes | Dotted-route steps, prep checklist | "Copy the questions" | Friction removal + CTA |
| 13 | FAQ | Last objections | 14 verified answers + "Talk to Francesca" | Accordion, curator card | Accordions | Objection handling |
| 14 | Final CTA | Decide | "Looking for time and space to focus on your practice?" | Full-bleed photo + status repeat | Primary + secondary | Conversion |
| — | Footer | Institutional trust | Address, network, supporters, short-stays | Deep brown | Links, cookie settings | Fallback paths |

---

## 3. Design system [PROPOSED, derived from §B]

**Colour roles:** `paper` page background · `ink` body text · `burgundy` headings, links and primary
button · `ochre` highlight fields, status strip and CTA on dark · `coral` secondary fields ·
`sand` alternating sections · `deep` footer and dark sections · `terracotta` decorative accents ·
`olive` "open" status.

**Type scale (fluid, `clamp`):** Display (H1) 40→92 px Space Grotesk 500, −0.025em, line-height 1.0 ·
H2 32→60 px · H3 22→28 px · Lead 20→23 px Vollkorn · Body 18→19 px Vollkorn 1.55 · Label 13–14 px
Space Grotesk 500 sentence case · Numerals Space Grotesk (tabular for prices and dates).

**Spacing:** 4-pt base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 · Section padding 64 px (mobile) → 128 px (desktop).

**Grid:** 4 / 8 / 12 columns · gutters 16 / 24 / 32 · side margins 16 px (phone) → 64 px · max width 1440.

**Components:** button (primary burgundy / on-dark ochre / ghost), 48 px min height, 2 px radius,
arrow glyph that nudges on hover · status badge (shape + text, never colour alone) · info strip ·
section label "Nr. 0X" · cards (no shadows, 1 px rule or flat field, 2 px radius max) · accordion
(native `<details>`, + / − glyph, 56 px rows) · gallery (CSS scroll-snap + buttons + keyboard,
counter "3 / 9") · tabs (ARIA tabs, arrow keys) · quote (Vollkorn italic, burgundy) · sticky mobile apply bar.

**Photography:** authentic only, natural colour, square corners, captions in Space Grotesk 13 px.

**Motifs:** contour lines (white at 35% on ochre/coral), dotted route (terracotta dots), hand-drawn orbit
(logo only), "Nr." labels.

**Motion:** 500–700 ms ease-out fade/translate (12 px) on first reveal; hover zoom 1.03 on images;
no parallax, no autoplay. Fully disabled under `prefers-reduced-motion`.
