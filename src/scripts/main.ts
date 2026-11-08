/* Nocefresca — Open Call landing · client enhancements (no framework, progressive enhancement). */

type Cfg = { gtmId: string | null; metaPixelId: string | null; forwardCampaignParams: boolean; consentMode: 'builtin' | 'external'; storageKey: string };
type Consent = { analytics: boolean; marketing: boolean };

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
    nfTrack: (event: string, params?: Record<string, unknown>) => void;
    nfConsent: { update: (c: Partial<Consent>) => void; get: () => Consent; open: () => void };
  }
}

const cfg: Cfg = JSON.parse(document.getElementById('nf-config')?.textContent || '{}');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel)) as T[];

/* ------------------------------------------------------------------ */
/* Analytics: one function, consistent snake_case event names          */
/* ------------------------------------------------------------------ */
const consent: Consent = { analytics: false, marketing: false };
window.dataLayer = window.dataLayer || [];

function track(event: string, params: Record<string, unknown> = {}) {
  // dataLayer is only an in-page queue: GTM is not loaded until consent is given (see applyConsent).
  window.dataLayer.push({ event, page_section: params.location ?? undefined, ...params });
  // Meta: only after marketing consent, and never as a "Lead"/"SubmitApplication" — a click is not an application.
  if (consent.marketing && window.fbq && event === 'apply_click') window.fbq('trackCustom', 'ApplyClick', { location: params.location });
}
window.nfTrack = track;

/* clicks on anything with data-track, plus every outbound link */
document.addEventListener('click', (e) => {
  const el = (e.target as Element).closest<HTMLElement>('a, button');
  if (!el) return;
  const name = el.dataset.track;
  const location = el.dataset.location;
  const a = el instanceof HTMLAnchorElement ? el : null;
  const url = a?.href;
  const external = !!a && a.host !== window.location.host && /^https?:/.test(a.protocol);
  const base = { location, link_url: url, link_text: (el.textContent || '').trim().slice(0, 80) };
  if (name && el.tagName === 'A') track(name, { ...base, outbound: external });
  if (external && name !== 'outbound_click') track('outbound_click', { ...base, link_domain: a!.hostname });
});

/* accordions (details) — 'toggle' doesn't bubble, so listen on each */
$$<HTMLDetailsElement>('details[data-track]').forEach((d) =>
  d.addEventListener('toggle', () => { if (d.open) track(d.dataset.track!, { location: d.dataset.location }); }),
);

/* section views (once each) */
if ('IntersectionObserver' in window) {
  const seen = new Set<string>();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const id = (en.target as HTMLElement).id;
      if (en.isIntersecting && !seen.has(id)) { seen.add(id); track('section_view', { location: id }); }
    });
  }, { threshold: 0.3 });
  $$('main > section[id], main > div > section[id]').forEach((s) => io.observe(s));
}

/* scroll depth 25/50/75/90/100 */
{
  const marks = [25, 50, 75, 90, 100];
  let ticking = false;
  const check = () => {
    ticking = false;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 100;
    while (marks.length && pct >= marks[0] - 0.5) track('scroll_depth', { percent: marks.shift() });
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } }, { passive: true });
}

/* ------------------------------------------------------------------ */
/* Campaign parameters → application form links                        */
/* ------------------------------------------------------------------ */
if (cfg.forwardCampaignParams) {
  const params = new URLSearchParams(window.location.search);
  const keep: string[] = [];
  params.forEach((v, k) => { if (/^utm_/.test(k) || ['fbclid', 'gclid', 'msclkid'].includes(k)) keep.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`); });
  if (keep.length) {
    // Raw concatenation on purpose: the form URL is "?/apply_now" and must not be re-encoded by URLSearchParams.
    $$<HTMLAnchorElement>('a[data-apply]').forEach((a) => { a.href = a.getAttribute('href')! + (a.getAttribute('href')!.includes('?') ? '&' : '?') + keep.join('&'); });
  }
}

/* ------------------------------------------------------------------ */
/* Consent (Google Consent Mode v2, basic mode: nothing loads before a choice) */
/* ------------------------------------------------------------------ */
let gtmLoaded = false;
let pixelLoaded = false;
function loadGTM(id: string) {
  if (gtmLoaded) return; gtmLoaded = true;
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script'); s.async = true; s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`; document.head.appendChild(s);
}
function loadPixel(id: string) {
  if (pixelLoaded) return; pixelLoaded = true;
  const n: any = (window.fbq = function (...args: unknown[]) { n.callMethod ? n.callMethod(...args) : n.queue.push(args); } as any);
  if (!window._fbq) window._fbq = n;
  n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
  const s = document.createElement('script'); s.async = true; s.src = 'https://connect.facebook.net/en_US/fbevents.js'; document.head.appendChild(s);
  window.fbq!('init', id); window.fbq!('track', 'PageView');
}
function applyConsent(c: Consent, persist = true) {
  consent.analytics = c.analytics; consent.marketing = c.marketing;
  const g = (v: boolean) => (v ? 'granted' : 'denied');
  window.gtag?.('consent', 'update', { analytics_storage: g(c.analytics), ad_storage: g(c.marketing), ad_user_data: g(c.marketing), ad_personalization: g(c.marketing) });
  if (persist) { try { localStorage.setItem(cfg.storageKey, JSON.stringify({ ...c, t: Date.now() })); } catch { /* storage blocked: choice lasts this page view */ } }
  if ((c.analytics || c.marketing) && cfg.gtmId) loadGTM(cfg.gtmId);
  if (c.marketing && cfg.metaPixelId) loadPixel(cfg.metaPixelId);
  track('consent_update', { analytics: c.analytics, marketing: c.marketing });
}
{
  const banner = document.querySelector<HTMLElement>('[data-consent]');
  const needed = !!(cfg.gtmId || cfg.metaPixelId) || new URLSearchParams(location.search).has('consent-demo');
  let stored: Consent | null = null;
  try { stored = JSON.parse(localStorage.getItem(cfg.storageKey) || 'null'); } catch { stored = null; }
  const open = () => {
    if (!banner) return;
    banner.querySelector<HTMLInputElement>('[data-consent-analytics]')!.checked = consent.analytics;
    banner.querySelector<HTMLInputElement>('[data-consent-marketing]')!.checked = consent.marketing;
    banner.hidden = false;
    banner.querySelector<HTMLElement>('[data-consent-accept]')?.focus({ preventScroll: true });
  };
  const close = () => { if (banner) banner.hidden = true; };
  if (stored) applyConsent({ analytics: !!stored.analytics, marketing: !!stored.marketing }, false);
  else if (needed && cfg.consentMode === 'builtin') open();
  banner?.querySelector('[data-consent-accept]')?.addEventListener('click', () => { applyConsent({ analytics: true, marketing: true }); close(); });
  banner?.querySelector('[data-consent-reject]')?.addEventListener('click', () => { applyConsent({ analytics: false, marketing: false }); close(); });
  banner?.querySelector('[data-consent-save]')?.addEventListener('click', () => {
    applyConsent({ analytics: banner.querySelector<HTMLInputElement>('[data-consent-analytics]')!.checked, marketing: banner.querySelector<HTMLInputElement>('[data-consent-marketing]')!.checked });
    close();
  });
  $$('[data-consent-open]').forEach((b) => b.addEventListener('click', open));
  window.nfConsent = { update: (c) => applyConsent({ ...consent, ...c }), get: () => ({ ...consent }), open };
}

/* ------------------------------------------------------------------ */
/* Reveal on scroll (content is never hidden if this script fails)     */
/* ------------------------------------------------------------------ */
{
  const items = $$('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) items.forEach((el) => el.classList.add('is-in'));
  else {
    // No synchronous layout reads: the observer's first callback reveals whatever is already in view.
    document.documentElement.classList.add('reveal-ready');
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  }
}

/* ------------------------------------------------------------------ */
/* Header: scrolled state, active section, mobile menu                 */
/* ------------------------------------------------------------------ */
{
  const header = document.querySelector<HTMLElement>('[data-header]');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const links = $$<HTMLAnchorElement>('.site-nav a');
  const targets = links.map((a) => document.querySelector<HTMLElement>(a.hash)).filter(Boolean) as HTMLElement[];
  if ('IntersectionObserver' in window && targets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.setAttribute('aria-current', String(a.hash === `#${en.target.id}`)));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach((t) => io.observe(t));
  }

  const btn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const setOpen = (open: boolean, focusBack = false) => {
    if (!btn || !menu) return;
    btn.setAttribute('aria-expanded', String(open));
    btn.querySelector('.menu-btn__label')!.textContent = open ? 'Close' : 'Menu';
    menu.hidden = !open;
    if (open) menu.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
    else if (focusBack) btn.focus();
  };
  btn?.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', (e) => { if ((e.target as Element).closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && btn?.getAttribute('aria-expanded') === 'true') setOpen(false, true); });
  window.matchMedia('(min-width: 60rem)').addEventListener('change', (m) => { if (m.matches) setOpen(false); });
}

/* ------------------------------------------------------------------ */
/* Sticky mobile apply bar: after the hero, hidden over the final CTA & footer */
/* ------------------------------------------------------------------ */
{
  const bar = document.querySelector<HTMLElement>('[data-sticky-apply]');
  const hero = document.getElementById('top');
  const blockers = ['intro', 'final', 'footer', 'mobile-menu'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
  if (bar && hero && 'IntersectionObserver' in window) {
    const state = new Map<Element, boolean>();
    const update = () => {
      const heroVisible = state.get(hero) ?? true;
      const blocked = blockers.some((b) => state.get(b));
      const show = !heroVisible && !blocked;
      bar.classList.toggle('is-visible', show);
      bar.setAttribute('aria-hidden', String(!show));
      bar.querySelectorAll('a').forEach((a) => (show ? a.removeAttribute('tabindex') : a.setAttribute('tabindex', '-1')));
    };
    const io = new IntersectionObserver((entries) => { entries.forEach((en) => state.set(en.target, en.isIntersecting)); update(); }, { threshold: 0 });
    [hero, ...blockers].forEach((el) => io.observe(el));
    update();
  }
}

/* ------------------------------------------------------------------ */
/* Rails (galleries & strips): buttons, counter, keyboard              */
/* Measurements run inside one shared ResizeObserver callback (after layout):      */
/* all reads first, then all writes — no forced synchronous reflows.                */
/* ------------------------------------------------------------------ */
type RailApi = { measure: () => () => void; reset: () => void };
const rails = new Map<Element, RailApi>();
const railByTrack = new Map<Element, RailApi>();
const ro = 'ResizeObserver' in window ? new ResizeObserver((entries) => {
  const writes = entries.map((en) => railByTrack.get(en.target)?.measure()).filter(Boolean) as (() => void)[];
  writes.forEach((w) => w());
}) : null;
$$('[data-rail]').forEach((wrap) => {
  const trackEl = wrap.querySelector<HTMLElement>('[data-rail-track]')!;
  const controls = wrap.querySelector<HTMLElement>('[data-rail-controls]')!;
  const prev = wrap.querySelector<HTMLButtonElement>('[data-rail-prev]')!;
  const next = wrap.querySelector<HTMLButtonElement>('[data-rail-next]')!;
  const counter = wrap.querySelector<HTMLElement>('[data-rail-counter]')!;
  const name = (wrap as HTMLElement).dataset.rail;
  const items = Array.from(trackEl.children) as HTMLElement[];
  const step = () => (items.length < 2 ? trackEl.clientWidth : items[1].offsetLeft - items[0].offsetLeft);
  // read phase → returns the write phase
  const measure = () => {
    const sl = trackEl.scrollLeft, cw = trackEl.clientWidth, sw = trackEl.scrollWidth, st = Math.max(1, step());
    const overflow = sw > cw + 4;
    const atEnd = sl + cw >= sw - 4;
    const idx = atEnd ? items.length : Math.min(items.length, Math.round(sl / st) + 1);
    return () => {
      controls.hidden = !overflow;
      if (!overflow) return;
      prev.disabled = sl <= 2;
      next.disabled = atEnd;
      counter.textContent = `${idx} / ${items.length}`;
    };
  };
  const update = () => measure()();
  let tTimer = 0;
  const go = (dir: 1 | -1) => {
    trackEl.scrollBy({ left: dir * step(), behavior: reduceMotion ? 'auto' : 'smooth' });
    clearTimeout(tTimer);
    tTimer = window.setTimeout(() => track('gallery_navigate', { location: name, direction: dir > 0 ? 'next' : 'prev', index: Number(counter.textContent?.split(' / ')[0]) || undefined }), 450);
  };
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  trackEl.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });
  let raf = 0;
  trackEl.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
  const api: RailApi = { measure, reset: () => { trackEl.scrollLeft = 0; } };
  rails.set(wrap, api);
  railByTrack.set(trackEl, api);
  if (ro) ro.observe(trackEl); else update();
});

/* ------------------------------------------------------------------ */
/* Tabs (studios): ARIA tabs with automatic activation                 */
/* ------------------------------------------------------------------ */
$$('[data-tabs]').forEach((root) => {
  const list = root.querySelector<HTMLElement>('[data-tablist]');
  const tabs = $$<HTMLButtonElement>('[role="tab"]', root);
  const panels = $$<HTMLElement>('[role="tabpanel"]', root);
  if (!list || !tabs.length) return;
  list.hidden = false;
  root.classList.add('js-tabs');
  const select = (i: number, focus = false, user = false) => {
    tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
    panels.forEach((p, j) => { p.hidden = i !== j; p.tabIndex = i === j ? 0 : -1; });
    if (focus) tabs[i].focus({ preventScroll: true });
    // keep the active tab visible inside the (horizontally scrolling) tab list — never scroll the page
    if (user && list.scrollWidth > list.clientWidth) list.scrollTo({ left: Math.max(0, tabs[i].offsetLeft - list.offsetLeft - 16), behavior: reduceMotion ? 'auto' : 'smooth' });
    if (user) {
      const rail = panels[i].querySelector('[data-rail]');
      if (rail) rails.get(rail)?.reset();
      track('studio_select', { location: tabs[i].dataset.tab });
    }
  };
  tabs.forEach((t, i) => t.addEventListener('click', () => select(i, false, true)));
  list.addEventListener('keydown', (e) => {
    const cur = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (cur < 0) return;
    const map: Record<string, number> = { ArrowRight: (cur + 1) % tabs.length, ArrowLeft: (cur - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 };
    if (e.key in map) { e.preventDefault(); select(map[e.key], true, true); }
  });
  select(0);
});

/* ------------------------------------------------------------------ */
/* Copy the application questions                                      */
/* ------------------------------------------------------------------ */
{
  const btn = document.querySelector<HTMLButtonElement>('[data-copy-questions]');
  const src = document.querySelector<HTMLElement>('[data-copy-source]');
  const status = document.querySelector<HTMLElement>('[data-copy-status]');
  btn?.addEventListener('click', async () => {
    const text = src?.textContent || '';
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch {
      const ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); try { ok = document.execCommand('copy'); } catch { ok = false; } ta.remove();
    }
    if (status) status.textContent = ok ? 'Copied. Paste the questions into your notes and draft your answers.' : 'Copy failed — open “Preview the questions” and copy them from there.';
    track('copy_form_questions', { location: 'apply', success: ok });
  });
}
