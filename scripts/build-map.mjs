// Generates the Europe → Sardinia → Milis map paths from Natural Earth data (world-atlas).
// Output: src/generated/map.json (pre-projected SVG path strings, no runtime JS needed).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { feature } from 'topojson-client';
import { geoConicConformal, geoMercator, geoPath, geoContains, geoBounds } from 'd3-geo';

const load = async (f) => JSON.parse(await readFile(new URL(`../node_modules/world-atlas/${f}`, import.meta.url)));
const round = (d) => d.replace(/(\d+)\.(\d)\d*/g, '$1.$2');
const round0 = (d) => d.replace(/(-?\d+)\.\d+/g, '$1');

// ---------- Context map: the western/central Mediterranean ----------
const w110 = await load('land-50m.json'); // merged land (no borders), 1:50m, clipped to the frame below
const countries = feature(w110, w110.objects.land);
const ctx = { w: 640, h: 560 };
const ctxBox = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[-10, 35], [-10, 53], [21, 53], [21, 35], [-10, 35]]] } };
const ctxProj = geoConicConformal().parallels([35, 55]).rotate([-7, 0]).fitExtent([[0, 0], [ctx.w, ctx.h]], ctxBox).clipExtent([[-2, -2], [ctx.w + 2, ctx.h + 2]]);
// Capture projected + clipped rings, then simplify them (Ramer–Douglas–Peucker) to keep the SVG light.
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
function simplifiedPath(proj, geo, eps, minArea = 0) {
  const rings = []; let cur = null;
  const ctxRec = {
    moveTo(x, y) { cur = [[x, y]]; rings.push(cur); },
    lineTo(x, y) { cur.push([x, y]); },
    closePath() {}, arc() {}, beginPath() {},
  };
  geoPath(proj, ctxRec)(geo);
  let d = '';
  for (const r of rings) {
    if (r.length < 3) continue;
    let a = 0; for (let i = 0; i < r.length; i++) { const [x0, y0] = r[i], [x1, y1] = r[(i + 1) % r.length]; a += x0 * y1 - x1 * y0; }
    if (Math.abs(a / 2) < minArea) continue;
    const s = rdp(r, eps);
    if (s.length < 3) continue;
    d += 'M' + s.map(([x, y]) => `${Math.round(x * 10) / 10} ${Math.round(y * 10) / 10}`).join('L') + 'Z';
  }
  return d;
}
const ctxLand = simplifiedPath(ctxProj, countries, 0.6, 2);

// Sardinia polygon (from the Italy multipolygon, 10m detail)
const w10 = await load('countries-10m.json');
const c10 = feature(w10, w10.objects.countries);
const italy = c10.features.find((f) => f.properties.name === 'Italy');
const sardPoly = italy.geometry.coordinates
  .map((coords) => ({ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: coords } }))
  .filter((f) => {
    const [[x0, y0], [x1, y1]] = geoBounds(f);
    return x0 > 7.8 && x1 < 10.2 && y0 > 38.6 && y1 < 41.4; // Sardinia + its small islands
  });
const sardinia = { type: 'FeatureCollection', features: sardPoly };
const ctxSardinia = simplifiedPath(ctxProj, sardinia, 0.35, 0);
const [sx, sy] = ctxProj([8.9, 40.1]);

// ---------- Detail map: Sardinia ----------
const det = { w: 580, h: 600 }; // island fitted in the left 420 units; right side holds the inset + legend
const detProj = geoMercator().fitExtent([[24, 24], [396, det.h - 24]], sardinia);
const detPath = geoPath(detProj);
const detSardinia = simplifiedPath(detProj, sardinia, 0.4, 1);
const places = {
  milis: [8.6381, 40.0514], // 40°03′05″N 8°38′17″E (Nocefresca HQ, Via Diaz 18)
  oristano: [8.592, 39.9036],
  cagliari: [9.1217, 39.2238],
  olbia: [9.4983, 40.9236],
  montiferru: [8.575, 40.155],
  coast: [8.42, 40.085],
};
const pts = Object.fromEntries(Object.entries(places).map(([k, v]) => [k, detProj(v).map((n) => +n.toFixed(1))]));

await mkdir(new URL('../src/generated/', import.meta.url), { recursive: true });
await writeFile(
  new URL('../src/generated/map.json', import.meta.url),
  JSON.stringify({ ctx: { ...ctx, land: ctxLand, sardinia: ctxSardinia, focus: [+sx.toFixed(1), +sy.toFixed(1)] }, detail: { ...det, sardinia: detSardinia, points: pts } }),
);
console.log('map.json written', { ctxLand: ctxLand.length, ctxSardinia: ctxSardinia.length, detSardinia: detSardinia.length, pts });
