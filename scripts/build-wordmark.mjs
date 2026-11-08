// Re-vectorises the official wordmark (a bitmap trace with 1-unit staircase edges) into smooth curves:
// rasterise large → gentle blur to dissolve the pixel steps → threshold → Potrace → path in the original 386×68 space.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
const potrace = require('potrace');

const SCALE = 12;
const src = await readFile(new URL('../src/assets/img/brand/nocefresca-wordmark.svg', import.meta.url), 'utf8');
const d = src.match(/ d="([^"]+)"/)[1];
const W = 386 * SCALE, H = 68 * SCALE;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 386 68"><rect width="386" height="68" fill="#fff"/><path d="${d}" fill="#000" fill-rule="evenodd"/></svg>`;
const png = await sharp(Buffer.from(svg)).blur(SCALE * 1.3).threshold(128).png().toBuffer();
const traced = await new Promise((res, rej) =>
  potrace.trace(png, { turdSize: 40, optTolerance: 0.6, alphaMax: 0.9, threshold: 128, color: '#000' }, (e, out) => (e ? rej(e) : res(out))),
);
let path = traced.match(/ d="([^"]+)"/)[1];
// back to the original coordinate space
path = path.replace(/-?\d+(\.\d+)?/g, (n) => String(Math.round((Number(n) / SCALE) * 100) / 100));
await mkdir(new URL('../src/generated/', import.meta.url), { recursive: true });
await writeFile(new URL('../src/generated/wordmark-smooth.json', import.meta.url), JSON.stringify({ viewBox: '0 0 386 68', d: path }));
console.log('wordmark-smooth.json', path.length, 'chars');
