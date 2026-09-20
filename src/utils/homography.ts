export interface QuadCorners {
  tl: [number, number]; // [x, y] in pixels or fractions
  tr: [number, number];
  br: [number, number];
  bl: [number, number];
}

/**
 * Computes a CSS matrix3d() transform string that maps a rectangle
 * of size (srcWidth x srcHeight) at (0, 0) to an arbitrary quadrilateral
 * defined by the 4 corner points: [tl, tr, br, bl].
 *
 * Uses projective homography mapping unit square [0,1]^2 -> quad -> scaled by src size.
 *
 * Must be applied to an element with:
 *   transform-origin: 0 0;
 *   width: srcWidth px;
 *   height: srcHeight px;
 */
export function computeHomographyMatrix3d(
  srcWidth: number,
  srcHeight: number,
  corners: [[number, number], [number, number], [number, number], [number, number]]
): string {
  const [p0, p1, p2, p3] = corners;
  const [x0, y0] = p0;
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const [x3, y3] = p3;

  const dx1 = x1 - x2;
  const dx2 = x3 - x2;
  const sx = x0 - x1 + x2 - x3;

  const dy1 = y1 - y2;
  const dy2 = y3 - y2;
  const sy = y0 - y1 + y2 - y3;

  const det = dx1 * dy2 - dx2 * dy1;

  let a: number, b: number, c: number;
  let d: number, e: number, f: number;
  let g: number, h: number;

  if (Math.abs(det) < 1e-8) {
    // Parallelogram / Affine fallback
    a = x1 - x0;
    b = x3 - x0;
    c = x0;
    d = y1 - y0;
    e = y3 - y0;
    f = y0;
    g = 0;
    h = 0;
  } else {
    // Full Projective Homography
    g = (sx * dy2 - sy * dx2) / det;
    h = (dx1 * sy - dy1 * sx) / det;
    a = x1 - x0 + g * x1;
    b = x3 - x0 + h * x3;
    c = x0;
    d = y1 - y0 + g * y1;
    e = y3 - y0 + h * y3;
    f = y0;
  }

  // Pre-divide by source element dimensions (u = x / srcWidth, v = y / srcHeight)
  const w = Math.max(1, srcWidth);
  const hSrc = Math.max(1, srcHeight);

  const m11 = a / w;
  const m12 = d / w;
  const m14 = g / w;

  const m21 = b / hSrc;
  const m22 = e / hSrc;
  const m24 = h / hSrc;

  const m41 = c;
  const m42 = f;
  const m44 = 1;

  // Format into CSS matrix3d(col1, col2, col3, col4)
  // [m11, m12, 0, m14,  m21, m22, 0, m24,  0, 0, 1, 0,  m41, m42, 0, m44]
  return `matrix3d(${m11.toFixed(7)}, ${m12.toFixed(7)}, 0, ${m14.toFixed(9)}, ${m21.toFixed(7)}, ${m22.toFixed(7)}, 0, ${m24.toFixed(9)}, 0, 0, 1, 0, ${m41.toFixed(4)}, ${m42.toFixed(4)}, 0, ${m44.toFixed(4)})`;
}

/**
 * Returns a CSS clip-path polygon string for the 4 corners (in percentages or px)
 */
export function getCornerClipPath(
  corners: [[number, number], [number, number], [number, number], [number, number]],
  width: number,
  height: number
): string {
  const [p0, p1, p2, p3] = corners;
  const toPct = (x: number, y: number) => `${((x / width) * 100).toFixed(2)}% ${((y / height) * 100).toFixed(2)}%`;
  return `polygon(${toPct(p0[0], p0[1])}, ${toPct(p1[0], p1[1])}, ${toPct(p2[0], p2[1])}, ${toPct(p3[0], p3[1])})`;
}
