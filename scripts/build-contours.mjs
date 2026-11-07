// Procedural topographic contour lines — a nod to the 2025–26 "Cartography" graphics.
// Output: src/generated/contours.json (smoothed SVG paths in a 1200×800 viewBox).
import { writeFile, mkdir } from 'node:fs/promises';
import { contours } from 'd3-contour';
import { createNoise2D } from 'simplex-noise';

// deterministic PRNG so builds are reproducible
function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
// Ramer–Douglas–Peucker simplification (keeps files small)
function rdp(pts, eps) {
  if (pts.length < 3) return pts;
  const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1];
  let dmax = 0, idx = 0;
  const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / len;
    if (d > dmax) { dmax = d; idx = i; }
  }
  if (dmax > eps) return [...rdp(pts.slice(0, idx + 1), eps).slice(0, -1), ...rdp(pts.slice(idx), eps)];
  return [pts[0], pts[pts.length - 1]];
}
// closed rings: split at the point farthest from the start, simplify both halves
function rdpClosed(pts, eps) {
  let far = 0, fd = -1;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[0][0], pts[i][1] - pts[0][1]); if (d > fd) { fd = d; far = i; } }
  const a = rdp(pts.slice(0, far + 1), eps), b = rdp(pts.slice(far), eps);
  return [...a.slice(0, -1), ...b];
}
const chaikin = (pts, it = 2) => {
  for (let k = 0; k < it; k++) {
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
      out.push([0.75 * x0 + 0.25 * x1, 0.75 * y0 + 0.25 * y1], [0.25 * x0 + 0.75 * x1, 0.25 * y0 + 0.75 * y1]);
    }
    out.push(out[0]);
    pts = out;
  }
  return pts;
};

function field(seed, W, H, scale) {
  const noise = createNoise2D(mulberry32(seed));
  const v = new Float64Array(W * H);
  for (let j = 0; j < H; j++)
    for (let i = 0; i < W; i++) {
      const x = i / scale, y = j / scale;
      v[j * W + i] = noise(x, y) * 0.65 + noise(x * 2.1 + 7, y * 2.1 - 3) * 0.25 + noise(x * 4.3, y * 4.3) * 0.1;
    }
  return v;
}

function build(seed, levels = 11) {
  const W = 100, H = 67, S = 12; // grid → 1200×800
  const values = field(seed, W, H, 31);
  const thresholds = Array.from({ length: levels }, (_, i) => -0.8 + (1.6 * (i + 0.5)) / levels);
  const polys = contours().size([W, H]).smooth(true).thresholds(thresholds)(values);
  let d = '';
  for (const mp of polys)
    for (const poly of mp.coordinates)
      for (const ring of poly) {
        if (ring.length < 6) continue;
        const sm = rdpClosed(chaikin(ring.map(([x, y]) => [x * S, y * S]), 2), 0.9);
        d += 'M' + sm.map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`).join('L') + 'Z';
      }
  return d;
}

await mkdir(new URL('../src/generated/', import.meta.url), { recursive: true });
const out = { viewBox: '0 0 1200 800', a: build(7, 9), b: build(23, 8), c: build(101, 10) };
await writeFile(new URL('../src/generated/contours.json', import.meta.url), JSON.stringify(out));
console.log('contours.json written', Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length])));

// Standalone SVG motifs (imported with ?url so they are cached and respect the Astro base path)
const svg = (d, stroke, opacity, width = 1.2) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><path d="${d}" fill="none" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="${width}" stroke-linejoin="round"/></svg>`;
await writeFile(new URL('../src/generated/contours-light.svg', import.meta.url), svg(out.a, '#FFFFFF', 0.55));
await writeFile(new URL('../src/generated/contours-light-b.svg', import.meta.url), svg(out.c, '#FFFFFF', 0.5));
await writeFile(new URL('../src/generated/contours-ink.svg', import.meta.url), svg(out.b, '#682B33', 0.14, 1));
console.log('contour SVG motifs written');
