// Turns a bitmap-traced outline (staircase "M x,y L x,y … Z" rings) into smooth cubic curves,
// keeping genuine corners sharp. Used for the logo wordmark so it stays crisp when shown large.
type P = [number, number];

function rdp(pts: P[], eps: number): P[] {
  if (pts.length < 3) return pts;
  const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1];
  const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
  let dmax = 0, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / len;
    if (d > dmax) { dmax = d; idx = i; }
  }
  return dmax > eps ? [...rdp(pts.slice(0, idx + 1), eps).slice(0, -1), ...rdp(pts.slice(idx), eps)] : [pts[0], pts[pts.length - 1]];
}

function simplifyRing(ring: P[], eps: number): P[] {
  let far = 0, fd = -1;
  ring.forEach((p, i) => { const d = Math.hypot(p[0] - ring[0][0], p[1] - ring[0][1]); if (d > fd) { fd = d; far = i; } });
  const a = rdp([...ring.slice(0, far + 1)], eps);
  const b = rdp([...ring.slice(far), ring[0]], eps);
  return [...a.slice(0, -1), ...b.slice(0, -1)];
}

const f = (n: number) => Math.round(n * 100) / 100;

export function smoothOutline(d: string, { eps = 0.8, corner = 58 } = {}): string {
  const rings = d.split(/(?=M)/).map((seg) =>
    [...seg.matchAll(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g)].map((m) => [Number(m[1]), Number(m[2])] as P),
  ).filter((r) => r.length > 2);
  return rings.map((raw) => {
    const pts = simplifyRing(raw, eps);
    const n = pts.length;
    if (n < 3) return '';
    const at = (i: number) => pts[(i + n) % n];
    // a point is a corner when the outline turns sharply there
    const isCorner = pts.map((_, i) => {
      const [p0, p1, p2] = [at(i - 1), at(i), at(i + 1)];
      const a1 = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]), a2 = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
      let t = Math.abs(a2 - a1) * 180 / Math.PI; if (t > 180) t = 360 - t;
      return t > corner;
    });
    let out = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
      const t = 1 / 6;
      const c1: P = isCorner[i] ? p1 : [p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t];
      const c2: P = isCorner[(i + 1) % n] ? p2 : [p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t];
      out += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
    }
    return out + 'Z';
  }).join('');
}
