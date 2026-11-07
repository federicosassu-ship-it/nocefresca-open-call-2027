# Tracking & consent plan

## Principles

1. **Consent first.** Google Consent Mode v2 defaults to *denied* in `<head>`. GTM and the Meta Pixel are **not loaded at all**
   until the visitor accepts (basic consent mode). This was verified in QA: 0 requests before consent, 0 after "Only necessary".
2. **A click is not an application.** `apply_click` measures intent only. Applications are measured on the form itself (see below).
3. **One naming scheme.** Events are snake_case and every event carries a `location`, so one GA4 exploration covers all CTAs.

## Event dictionary (pushed to `window.dataLayer`)

| Event | Fired when | Parameters |
|---|---|---|
| `apply_click` | Any primary CTA to the application form | `location` (hero, header, glance, artists, dates, fees, apply_section, final, sticky_mobile, mobile_menu), `link_url`, `outbound` |
| `secondary_cta_click` | Explore / Read the FAQ / see-fees links | `location` |
| `glance_click` | A card in "At a glance" | `location` (studio, dates, home, curator, fee, group, programme, milis) |
| `nav_click` | Header or mobile-menu anchor | `location` |
| `section_view` | A section is 30% visible (once per section) | `location` (= section id: month, for-you, glance, milis, studios, living, artists, programme, dates, fees, apply, faq, final) |
| `scroll_depth` | 25 / 50 / 75 / 90 / 100 % | `percent` |
| `faq_open` | An FAQ answer is opened | `location` (question id) |
| `fees_details_open` | Fee option details, cancellation or funding accordion | `location` |
| `programme_details_open` | Curatorial support / partners accordion | `location` |
| `accordion_open` | Other accordions (ten words, getting here, equipment…) | `location` |
| `studio_select` | A studio tab is chosen | `location` (studio id) |
| `gallery_navigate` | Prev/next in any gallery | `location` (gallery), `direction`, `index` |
| `copy_form_questions` | "Copy the form questions" | `success` |
| `contact_click` | WhatsApp / email | `location` |
| `outbound_click` | Any link to another host | `link_url`, `link_domain`, `location` |
| `consent_update` | Visitor saves a consent choice | `analytics`, `marketing` |

**Fees engagement:** `section_view` with `location=fees`, plus `fees_details_open`.
**Programme engagement:** `section_view` with `location=programme`, plus `programme_details_open`.

## GTM setup (suggested)

- GA4 Configuration tag, consent-aware (requires `analytics_storage`).
- One GA4 Event tag with event name `{{Event}}`, triggered on a custom-event regex:
  `^(apply_click|secondary_cta_click|glance_click|section_view|scroll_depth|faq_open|fees_details_open|programme_details_open|accordion_open|studio_select|gallery_navigate|copy_form_questions|contact_click|outbound_click)$`.
  Pass `location`, `percent`, `link_url` as event parameters.
- Mark `apply_click` as a **micro-conversion**. Mark `application_complete` (below) as the **conversion**.

## Measuring the application itself (on the form at `nocefresca.it/?/apply_now`)

The form is a server-rendered, 8-step PHP flow outside this landing. Add GTM to those pages (the site already has `GTM-M6ST7FR`)
and fire:

| Event | Trigger on the form pages |
|---|---|
| `application_form_start` | View of `?/apply_now` (step 1, no `afpag`) |
| `application_form_step` | View of `?/apply_now&afpag=N`. Send `step: N` (2…8) to build a step-abandonment funnel |
| `application_submit` | Click on **Submit** on the summary step (8) |
| `application_complete` | View of the confirmation page or message shown after a successful submit **[TO CONFIRM: URL/selector]** |

Meta (only with marketing consent): map `application_complete` → standard event **`SubmitApplication`**.
Optionally map `application_form_start` → `InitiateCheckout`-style custom event `ApplicationStart`.
The landing already sends the custom event `ApplyClick` (never `Lead`/`SubmitApplication`) after consent.

Campaign attribution: the landing forwards `utm_*`, `fbclid`, `gclid` and `msclkid` to every apply link, keeping the
`?/apply_now` route intact, for example `…/?/apply_now&utm_source=instagram&fbclid=…`. QA confirmed this.
Test once on the live PHP router that extra query parameters are ignored correctly.

## Consent tools

- **Built-in banner** (`consent.mode = 'builtin'` in `src/config.ts`): appears only when a GTM or Pixel ID is set. Choices are
  stored in `localStorage` (`nf-consent-v1`). "Cookie settings" in the footer reopens it.
- **External CMP** (e.g. iubenda, already used for the privacy policy): set `consent.mode = 'external'` and call
  `window.nfConsent.update({ analytics: true, marketing: true })` from the CMP's callback.
- Review the banner without IDs: append `?consent-demo` to the URL.
