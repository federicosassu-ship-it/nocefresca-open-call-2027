// Splits the built page (dist/index.html) into one standalone HTML file per section,
// for review or porting into another CMS. Run after `npm run build`:  node scripts/export-sections.mjs
// Output: handoff/site/ (full built site) + handoff/sections/NN-id.html (static markup + all page CSS).
// Section files show layout and content; interactive behaviour (accordions aside) needs the full page scripts.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');
rmSync('handoff', { recursive: true, force: true });
mkdirSync('handoff/sections', { recursive: true });
cpSync('dist', 'handoff/site', { recursive: true });

const head = html.slice(html.indexOf('<head>') + 6, html.indexOf('</head>'))
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<link rel="(preload|modulepreload|canonical|alternate)"[^>]*>/g, '');
const fix = (s) => s.replace(/(["(,\s])\/_assets\//g, '$1../site/_assets/').replace(/(["(\s])\/(og-image|favicon)/g, '$1../site/$2');

// Find top-level <section ...> blocks by tag balancing.
const sections = [];
const re = /<section\b[^>]*\bid="([^"]+)"/g;
let m;
while ((m = re.exec(html))) {
  let depth = 0, i = m.index;
  const tag = /<(\/?)section\b/g; tag.lastIndex = i;
  let t;
  while ((t = tag.exec(html))) { depth += t[1] ? -1 : 1; if (depth === 0) { i = html.indexOf('>', t.index) + 1; break; } }
  sections.push({ id: m[1], markup: html.slice(m.index, i) });
  re.lastIndex = i;
}
const pick = (tagName) => { const a = html.indexOf(`<${tagName}`); return a < 0 ? '' : html.slice(a, html.indexOf(`</${tagName}>`, a) + tagName.length + 3); };
const parts = [{ id: 'header', markup: pick('header') }, ...sections, { id: 'footer', markup: pick('footer') }];

// Make the copied full page openable from disk too (relative asset paths).
writeFileSync('handoff/site/index.html', html.replace(/(["(,\s])\/_assets\//g, '$1./_assets/').replace(/(["(\s])\/(og-image|favicon)/g, '$1./$2'));

const index = [];
parts.forEach((p, n) => {
  const file = `${String(n).padStart(2, '0')}-${p.id}.html`;
  const body = p.markup.replace(/<script[\s\S]*?<\/script>/g, '');
  writeFileSync(`handoff/sections/${file}`, fix(`<!doctype html>
<html lang="en"><head>${head}
<style>[data-reveal]{opacity:1!important;transform:none!important}.intro-mark{display:none}</style>
</head><body><main>
${body}
</main></body></html>
`));
  index.push(`<li><a href="${file}">${file}</a></li>`);
});
writeFileSync('handoff/sections/index.html', `<!doctype html><meta charset="utf-8"><title>Sections</title><h1>Nocefresca Open Call 2027 — sections</h1><p>Full page: <a href="../site/index.html">site/index.html</a></p><ol>${index.join('')}</ol>`);
console.log(`exported ${parts.length} parts`);
