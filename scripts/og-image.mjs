// Renders public/og-image.jpg (1200×630) for social sharing, using the page's own fonts, colours and hero photo.
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const sharp = require('sharp');
const root = new URL('../', import.meta.url);
// Inline every asset as a data URI (pages created with setContent cannot load file:// resources)
const dataUri = async (p, mime) => `data:${mime};base64,${(await readFile(new URL(p, root))).toString('base64')}`;
const photo = `data:image/jpeg;base64,${(await sharp(fileURLToPath(new URL('src/assets/img/hero/artist-shoreline.jpg', root))).resize({ width: 1040 }).jpeg({ quality: 82 }).toBuffer()).toString('base64')}`;
const sgFont = await dataUri('node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2', 'font/woff2');
const vkFont = await dataUri('node_modules/@fontsource-variable/vollkorn/files/vollkorn-latin-wght-normal.woff2', 'font/woff2');
const logo = await dataUri('src/assets/img/brand/logo.png', 'image/png');
const contours = await readFile(new URL('src/generated/contours-light.svg', root), 'utf8');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:SG;src:url(${sgFont}) format('woff2');font-weight:300 700}
@font-face{font-family:VK;src:url(${vkFont}) format('woff2');font-weight:400 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;display:grid;grid-template-columns:520px 1fr;background:#edc77d;font-family:SG;color:#682b33;overflow:hidden}
.photo{background:url(${photo}) 50% 62%/cover}
.panel{position:relative;padding:56px 60px;display:flex;flex-direction:column;justify-content:space-between}
.contours{position:absolute;inset:0;opacity:.75}
.contours svg{width:100%;height:100%}
.top,.bottom{position:relative}
.pill{display:inline-block;background:#f6f1e7;border-radius:999px;padding:8px 18px;font-size:22px;font-weight:500}
h1{margin-top:28px;font-size:62px;line-height:1.02;letter-spacing:-.03em;font-weight:500}
.bottom{display:flex;justify-content:space-between;align-items:flex-end;font-size:22px;font-weight:500}
.bottom span{display:block;font-family:VK;font-weight:400;font-size:21px;color:#3e1f22;margin-top:4px}
img{height:54px}
</style></head><body>
<div class="photo"></div>
<div class="panel"><div class="contours">${contours}</div>
<div class="top"><span class="pill">Open Call 2027 · Edition Nr. 7</span><h1>Your rural artist’s studio in the heart of the Mediterranean.</h1></div>
<div class="bottom"><div>Milis, Sardinia · Mar–Dec 2027<span>Private studio, housing and a guest curator · 1–3 months</span></div><img src="${logo}" alt=""></div>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const out = fileURLToPath(new URL('public/og-image.jpg', root));
await page.screenshot({ path: out, type: 'jpeg', quality: 86 });
await browser.close();
console.log('written', out);
