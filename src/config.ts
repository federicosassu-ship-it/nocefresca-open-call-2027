/**
 * Page & tracking configuration.
 * IDs are null by default so the prototype never sends data to Nocefresca's real accounts.
 * See docs/TRACKING.md before setting them.
 */
export const config = {
  pageUrl: 'https://www.nocefresca.it/open-call-2027/', // [TO CONFIRM] final public URL (canonical + og:url)
  title: 'Open Call 2027 — Nocefresca Artist Residency in Sardinia, Italy',
  description:
    'Apply to the 7th edition of Nocefresca: one to three months in Milis, Sardinia, with a private studio, housing, a guest curator and a small international group of artists. 2027 periods, fees and how to apply.',
  ogImage: '/og-image.jpg',

  analytics: {
    /** Google Tag Manager container, e.g. 'GTM-M6ST7FR' (the one on nocefresca.it today). Loads only after analytics consent. */
    gtmId: null as string | null,
    /** Meta Pixel ID. Loads only after marketing consent. */
    metaPixelId: null as string | null,
    /** Forward utm_* / fbclid / gclid from the landing URL to the application form links. */
    forwardCampaignParams: true,
  },

  consent: {
    /** 'builtin' = lightweight banner in this page (Consent Mode v2). Use 'external' if iubenda/another CMP already manages consent and calls window.nfConsent.update(). */
    mode: 'builtin' as 'builtin' | 'external',
    storageKey: 'nf-consent-v1',
  },
};
