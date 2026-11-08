// QA for the Open Call landing page. Run `npm run build && npm run preview` in another shell, then `npm run qa`.
// Writes qa/report.json + qa/*.jpg screenshots. Uses the system Playwright + the project's axe-core.
import { createRequire } from 'node:module';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium, devices } = require('playwright');

const URL = process.env.QA_URL || 'http://127.0.0.1:4321/';
const OUT = new globalThis.URL('../qa/', import.meta.url);
await mkdir(OUT, { recursive: true });
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const report = { url: URL, date: new Date().toISOString(), runs: {} };
const browser = await chromium.launch();

async function scrollThrough(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(40); }
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => window.scrollTo(0, 0));
}

for (const [name, ctxOpts] of Object.entries({
  mobile: { ...devices['iPhone 13'], deviceScaleFactor: 1 }, // DPR 1 keeps the full-page JPEG under the 65,535 px limit
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
})) {
  const ctx = await browser.newContext({ ...ctxOpts, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const r = { consoleErrors: [], failedRequests: [] };
  page.on('console', (m) => m.type() === 'error' && r.consoleErrors.push(m.text()));
  page.on('pageerror', (e) => r.consoleErrors.push(String(e)));
  page.on('requestfailed', (q) => { if (q.url().startsWith(URL)) r.failedRequests.push(q.url()); });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await scrollThrough(page);

  // layout & structure
  Object.assign(r, await page.evaluate(() => {
    const de = document.documentElement;
    const ids = new Set([...document.querySelectorAll('[id]')].map((e) => e.id));
    const anchors = [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href').slice(1)).filter(Boolean);
    const imgs = [...document.querySelectorAll('img')];
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => +h.tagName[1]);
    let skips = 0; for (let i = 1; i < headings.length; i++) if (headings[i] - headings[i - 1] > 1) skips++;
    const small = [];
    document.querySelectorAll('a[href], button, summary, [role="tab"], input').forEach((el) => {
      const rc = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      if (!rc.width || cs.visibility === 'hidden' || el.closest('[hidden]') || el.closest('.prose, p, li, dd, figcaption, address, .small')) return; // inline text links are exempt (WCAG 2.5.8)
      if (rc.width < 24 || rc.height < 24) small.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(rc.width)}×${Math.round(rc.height)}`);
    });
    return {
      horizontalOverflow: de.scrollWidth - de.clientWidth,
      h1Count: document.querySelectorAll('h1').length,
      headingSkips: skips,
      brokenAnchors: [...new Set(anchors.filter((a) => !ids.has(a)))],
      images: imgs.length,
      imagesMissingAlt: imgs.filter((i) => !i.hasAttribute('alt')).length,
      imagesNotLoaded: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src).slice(0, 5),
      smallTargets: small.slice(0, 10),
      applyLinks: [...document.querySelectorAll('a[data-apply]')].length,
      pageWeightHint: document.documentElement.outerHTML.length,
    };
  }));

  // axe-core: WCAG 2.0/2.1/2.2 A + AA (accordions opened so hidden content is tested too)
  await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () => {
    const res = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] }, resultTypes: ['violations'] });
    return res.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, sample: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) }));
  });
  r.axeViolations = axe;
  await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = false)));

  // interactions
  const tabsOk = await page.evaluate(async () => {
    const tabs = [...document.querySelectorAll('[role="tab"]')];
    if (!tabs.length) return 'no tabs';
    tabs[0].focus();
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await new Promise((res) => setTimeout(res, 50));
    const sel = tabs[1].getAttribute('aria-selected') === 'true';
    const panelVisible = !document.getElementById(tabs[1].getAttribute('aria-controls')).hidden;
    const otherHidden = document.getElementById(tabs[0].getAttribute('aria-controls')).hidden;
    return sel && panelVisible && otherHidden && document.activeElement === tabs[1] ? 'ok' : `fail sel=${sel} vis=${panelVisible} hid=${otherHidden}`;
  });
  r.tabsKeyboard = tabsOk;
  r.accordion = await page.evaluate(() => { const s = document.querySelector('#faq details summary, .acc details summary'); s.click(); const ok = s.parentElement.open; s.click(); return ok ? 'ok' : 'fail'; });
  r.dataLayerAfterAccordion = await page.evaluate(() => window.dataLayer.filter((e) => e.event).slice(-3).map((e) => e.event));

  if (name === 'mobile') {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.4));
    await page.waitForTimeout(500);
    const midVisible = await page.evaluate(() => document.querySelector('[data-sticky-apply]').classList.contains('is-visible'));
    await page.evaluate(() => document.getElementById('final').scrollIntoView());
    await page.waitForTimeout(500);
    const finalHidden = await page.evaluate(() => !document.querySelector('[data-sticky-apply]').classList.contains('is-visible'));
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    const topHidden = await page.evaluate(() => !document.querySelector('[data-sticky-apply]').classList.contains('is-visible'));
    r.stickyBar = midVisible && finalHidden && topHidden ? 'ok' : `fail mid=${midVisible} final=${finalHidden} top=${topHidden}`;
    // menu
    await page.click('[data-menu-toggle]');
    const menuOpen = await page.evaluate(() => !document.querySelector('[data-menu]').hidden);
    await page.keyboard.press('Escape');
    const menuClosed = await page.evaluate(() => document.querySelector('[data-menu]').hidden && document.activeElement.matches('[data-menu-toggle]'));
    r.mobileMenu = menuOpen && menuClosed ? 'ok' : `fail open=${menuOpen} closed=${menuClosed}`;
  }

  // screenshots (full page)
  await page.screenshot({ path: new globalThis.URL(`${name}-full.jpg`, OUT).pathname, fullPage: true, type: 'jpeg', quality: 70 });
  report.runs[name] = r;
  await ctx.close();
}

// campaign parameters → form links; consent gate for tracking
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const tracking = [];
  page.on('request', (q) => { if (/googletagmanager|facebook\.net|connect\.facebook/.test(q.url())) tracking.push(q.url()); });
  // simulate a configured site: inject test IDs into the page config
  await page.route((u) => u.href.startsWith(URL) && new globalThis.URL(u.href).pathname === new globalThis.URL(URL).pathname, async (route) => {
    const res = await route.fetch(); let body = await res.text();
    body = body.replace('"gtmId":null', '"gtmId":"GTM-TEST000"').replace('"metaPixelId":null', '"metaPixelId":"000000000000000"');
    route.fulfill({ response: res, body });
  });
  await page.goto(`${URL}?utm_source=instagram&utm_medium=paid_social&utm_campaign=oc27&fbclid=abc`, { waitUntil: 'networkidle' });
  const href = await page.getAttribute('a[data-apply]', 'href');
  const bannerShown = await page.isVisible('[data-consent]');
  const beforeConsent = tracking.length;
  await page.click('[data-consent-reject]');
  await page.waitForTimeout(300);
  const afterReject = tracking.length;
  await page.click('[data-consent-open]');
  await page.click('[data-consent-accept]');
  await page.waitForTimeout(800);
  const afterAccept = tracking.length;
  await page.click('a[data-apply]', { noWaitAfter: true, trial: true });
  report.campaign = {
    applyHref: href,
    formUrlIntact: href.startsWith('https://www.nocefresca.it/?/apply_now&'),
    utmForwarded: /utm_source=instagram/.test(href) && /fbclid=abc/.test(href),
  };
  report.consent = { bannerShown, trackingRequestsBeforeConsent: beforeConsent, afterReject, afterAccept, ok: bannerShown && beforeConsent === 0 && afterReject === 0 && afterAccept > 0 };
  await ctx.close();
}

await browser.close();
await writeFile(new globalThis.URL('report.json', OUT), JSON.stringify(report, null, 2));
const summary = Object.entries(report.runs).map(([k, v]) => `${k}: overflow=${v.horizontalOverflow}px h1=${v.h1Count} skips=${v.headingSkips} brokenAnchors=${v.brokenAnchors.length} missingAlt=${v.imagesMissingAlt} notLoaded=${v.imagesNotLoaded.length} smallTargets=${v.smallTargets.length} axe=${v.axeViolations.length} tabs=${v.tabsKeyboard} accordion=${v.accordion}${v.stickyBar ? ' sticky=' + v.stickyBar : ''}${v.mobileMenu ? ' menu=' + v.mobileMenu : ''} consoleErrors=${v.consoleErrors.length}`).join('\n');
console.log(summary);
console.log('campaign:', report.campaign);
console.log('consent:', report.consent);
for (const [k, v] of Object.entries(report.runs)) {
  if (v.axeViolations.length) console.log(`\n[${k}] axe:`, JSON.stringify(v.axeViolations, null, 1));
  if (v.smallTargets.length) console.log(`[${k}] small targets:`, v.smallTargets);
  if (v.brokenAnchors.length) console.log(`[${k}] broken anchors:`, v.brokenAnchors);
  if (v.consoleErrors.length) console.log(`[${k}] console:`, v.consoleErrors);
}
