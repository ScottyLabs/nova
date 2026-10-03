type Pt = [number, number];
type Mat = [a: number, b: number, c: number, d: number, e: number, f: number];

// One 11-point star (Figma vector 274:972).
const STAR: Pt[] = [
  [188.948, 55.74], [38.734, 23.618], [144.545, 79.358], [0, 129.429],
  [183.279, 106.755], [326.879, 288.145], [219.179, 106.755], [348.608, 117.148],
  [243.742, 79.358], [393.011, 0],
];

/** Each pattern star is three copies of STAR (Figma unions 274:971 / 274:961);
    matrices are each copy's relativeTransform (one is mirrored). */
const UNIONS: Record<"a" | "b", { w: number; h: number; copies: Mat[] }> = {
  a: {
    w: 475.24,
    h: 519.61,
    copies: [
      [0.96593, -0.25882, 0.25882, 0.96593, 11, 102.17],
      [-0.99992, -0.01227, -0.01227, 0.99992, 393.15, 235.27],
      [0.99652, 0.08332, -0.08332, 0.99652, 83.46, 117.03],
    ],
  },
  b: {
    w: 512,
    h: 435.45,
    copies: [
      [0.96593, -0.25882, 0.25882, 0.96593, -33.3, 102.18],
      [-0.10312, -0.99467, 0.99467, -0.10312, 258.83, 448.65],
      [0.99652, 0.08332, -0.08332, 0.99652, 28.83, 116.58],
    ],
  },
};

/** The cluster: three pattern stars, overlapping into one union. */
const PARTS: { shape: keyof typeof UNIONS; x: number; y: number; scale: number; rot: number }[] = [
  // like the cover's "Union (Stroke)": two big stars up top whose spikes
  // interlock, one below them tucked under the middle
  { shape: "a", x: 0, y: 0, scale: 1.05, rot: -10 },
  { shape: "a", x: 235, y: -40, scale: 1.1, rot: 150 },
  { shape: "b", x: 125, y: 180, scale: 1.15, rot: 12 },
];

const mul = (m: Mat, n: Mat): Mat => [
  m[0] * n[0] + m[2] * n[1],
  m[1] * n[0] + m[3] * n[1],
  m[0] * n[2] + m[2] * n[3],
  m[1] * n[2] + m[3] * n[3],
  m[0] * n[4] + m[2] * n[5] + m[4],
  m[1] * n[4] + m[3] * n[5] + m[5],
];
const apply = (m: Mat, [x, y]: Pt): Pt => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];

/** STAR with small rounded corners (quadratic; tangent capped so only the
    tips soften, like the Figma union). */
function roundedStar(radius: number) {
  const n = STAR.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const p = STAR[(i - 1 + n) % n], c = STAR[i], q = STAR[(i + 1) % n];
    const v1: Pt = [p[0] - c[0], p[1] - c[1]], v2: Pt = [q[0] - c[0], q[1] - c[1]];
    const l1 = Math.hypot(...v1), l2 = Math.hypot(...v2);
    const half = Math.acos(Math.min(1, Math.max(-1, (v1[0] * v2[0] + v1[1] * v2[1]) / (l1 * l2)))) / 2;
    // cap the tangent so shallow corners stay crisp instead of swooping
    const t = Math.min(radius / Math.tan(half || 1e-6), radius * 1.5, l1 / 2, l2 / 2);
    const f = (v: number) => v.toFixed(2);
    d += `${i ? "L" : "M"}${f(c[0] + (v1[0] / l1) * t)} ${f(c[1] + (v1[1] / l1) * t)}`;
    d += `Q${f(c[0])} ${f(c[1])} ${f(c[0] + (v2[0] / l2) * t)} ${f(c[1] + (v2[1] / l2) * t)}`;
  }
  return d + "Z";
}

export interface IStarPiece {
  /** final placement of this copy, in cluster coordinates (origin top-left) */
  matrix: Mat;
}

/** Every star copy in the cluster, plus the cluster's bounds. */
export function buildCluster() {
  const pieces: IStarPiece[] = [];
  PARTS.forEach((part) => {
    const u = UNIONS[part.shape];
    const r = (part.rot * Math.PI) / 180;
    const cos = Math.cos(r) * part.scale, sin = Math.sin(r) * part.scale;
    const place: Mat = [cos, sin, -sin, cos, part.x, part.y];
    const centre: Mat = [1, 0, 0, 1, -u.w / 2, -u.h / 2];
    u.copies.forEach((copy) => {
      const m = mul(place, mul(centre, copy));
      pieces.push({ matrix: m });
    });
  });
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of pieces)
    for (const pt of STAR) {
      const [x, y] = apply(p.matrix, pt);
      minX = Math.min(minX, x); minY = Math.min(minY, y);
      maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
    }
  // breathing room so the progressive blur isn't cropped at the box edge
  const pad = 0.18 * Math.max(maxX - minX, maxY - minY);
  minX -= pad; minY -= pad; maxX += pad; maxY += pad;
  for (const p of pieces) {
    p.matrix = [p.matrix[0], p.matrix[1], p.matrix[2], p.matrix[3], p.matrix[4] - minX, p.matrix[5] - minY];
  }
  return { pieces, pad, d: roundedStar(4), w: maxX - minX, h: maxY - minY };
}
