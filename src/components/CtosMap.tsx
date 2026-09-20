import React, { useEffect, useRef } from 'react';
import type { AppId } from './phone/DedSecPhoneOS';
import './CtosMap.css';

interface TargetDef {
  id: string;
  code: string;
  kind: string;
  fx: number;
  fy: number;
  weak: string;
  fix: string;
}

interface TargetItem extends TargetDef {
  i: number;
  state: 'idle' | 'breach' | 'done';
  p: number;
  stage: number;
  t0: number;
  node: NodeItem | null;
}

interface NodeItem {
  i: number;
  x: number;
  y: number;
  hub: boolean;
  links: number;
  t: TargetItem | null;
}

interface EdgeItem {
  pts: { x: number; y: number }[];
  cum: number[];
  len: number;
  kind: string;
  a: number;
  b: number;
  alpha: number;
  mid: { x: number; y: number };
  end: { x: number; y: number };
  start: { x: number; y: number };
}

interface PacketItem {
  e: number;
  t: number;
  v: number;
  dir: number;
  c: string;
}

interface RippleItem {
  x: number;
  y: number;
  t0: number;
  r: number;
}

const FACTS = [
  'Default passwords are still the easiest way into cameras, routers and printers.',
  'SQL injection happens when user input is glued into a query. Parameterized queries stop it.',
  'Stored XSS runs an attacker’s script in every visitor’s browser. Escape output by context.',
  'nmap -sV lists open ports and the software version behind each one.',
  'Most breaches start with a person, not a firewall. Phishing is still the top way in.',
  'Hashing is not encryption. Store passwords with bcrypt or argon2, never plain SHA-1.',
  'A photo’s EXIF data can leak GPS coordinates. Strip it before you post.',
  'IDOR: if changing /user/12 to /user/13 shows someone else’s data, access control is missing.',
  'HSTS tells browsers to only use HTTPS, which blocks simple downgrade attacks.',
  'CSRF tokens tie a request to the session that made it.',
  'ARP spoofing lets someone on your LAN sit between you and the gateway.',
  'A buffer overflow writes past the end of a buffer and can overwrite the return address.',
  'Least privilege: every account gets the minimum access it needs and nothing more.',
  'CTF habit: run strings, file and binwalk first. They are cheap and often decisive.',
  'A JWT with alg set to none must be rejected. Always verify the signature server-side.',
  'Rate limiting slows brute force. MFA stops most of it.',
  'In Wireshark, http.request.method == "POST" shows form submissions on unencrypted traffic.',
  'DNS cache poisoning plants a false address so your browser lands on the wrong server.',
  'Log the boring things. Repeated failed logins are often the first sign of an attack.',
  'Certificate pinning makes an app refuse a fake TLS certificate, even a convincing one.'
];

const DEFS: TargetDef[] = [
  { id: 'CAM-4471', code: 'CAM',  kind: 'Traffic camera',    fx: 0.680, fy: 0.064, weak: 'admin password never changed from the factory default.', fix: 'Rotate default credentials and isolate cameras on their own VLAN.' },
  { id: 'SUB-12',   code: 'SUB',  kind: 'Substation relay',  fx: 0.400, fy: 0.281, weak: 'control port reachable from the public internet.',       fix: 'Keep industrial control systems off the internet. Firewall and segment them.' },
  { id: 'ATM-2208', code: 'ATM',  kind: 'Cash machine',      fx: 0.343, fy: 0.372, weak: 'unpatched operating system with a known CVE.',           fix: 'Patch on a schedule and track known CVEs for every asset.' },
  { id: 'TWR-77',   code: 'TWR',  kind: 'Cell tower',        fx: 0.380, fy: 0.394, weak: 'management interface exposed without MFA.',             fix: 'Require MFA and keep admin interfaces behind a VPN.' },
  { id: 'SRV-3F',   code: 'SRV',  kind: 'Public web server', fx: 0.538, fy: 0.456, weak: 'search box builds SQL by string concatenation.',        fix: 'Use parameterized queries and validate all input.' },
  { id: 'LOCK-09',  code: 'LOCK', kind: 'Door controller',   fx: 0.639, fy: 0.454, weak: 'session token that never expires.',                     fix: 'Expire tokens, rotate them on login and bind them to the device.' },
  { id: 'GRID-03',  code: 'GRID', kind: 'Grid controller',   fx: 0.223, fy: 0.548, weak: 'one shared password across every operator account.',    fix: 'Give each person unique credentials and log every admin action.' },
  { id: 'DRN-81',   code: 'DRN',  kind: 'Drone dock',        fx: 0.800, fy: 0.675, weak: 'firmware accepted without a signature check.',          fix: 'Sign firmware and verify the signature before installing.' }
];

const FIXED: [number, number, number][] = [
  [0.452, 0.102, 1], [0.433, 0.348, 1], [0.108, 0.493, 1], [0.194, 0.660, 0], [0.359, 0.657, 1], [0.263, 0.657, 0], [0.590, 0.692, 1],
  [0.729, 0.693, 0], [0.380, 0.588, 1], [0.781, 0.049, 1], [0.774, 0.661, 0], [0.548, 0.900, 1], [0.347, 0.720, 0], [0.489, 0.914, 0],
  [0.143, 0.817, 1], [0.042, 0.880, 0], [0.842, 0.587, 1], [0.300, 0.250, 0], [0.620, 0.200, 0], [0.900, 0.300, 0]
];

function mulberry32(a: number) {
  return function() {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function hash2(x: number, y: number, s: number) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(s | 0, 1274126177);
  h = Math.imul(h ^ h >>> 13, 1274126177);
  return ((h ^ h >>> 16) >>> 0) / 4294967296;
}

function vnoise(x: number, y: number, s: number) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi, s), b = hash2(xi + 1, yi, s), c = hash2(xi, yi + 1, s), d = hash2(xi + 1, yi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x: number, y: number, s: number) {
  let f = 0, a = 0.5;
  for (let i = 0; i < 4; i++) {
    f += a * vnoise(x, y, s + i);
    x *= 2; y *= 2; a *= 0.5;
  }
  return f;
}

interface CtosMapProps {
  isPhoneSettled?: boolean;
  onOpenApp?: (appId: AppId) => void;
  onTargetsProgress?: (acquired: number, total: number) => void;
}

export const CtosMap: React.FC<CtosMapProps> = ({ isPhoneSettled = false, onOpenApp, onTargetsProgress }) => {
  const progressCbRef = useRef(onTargetsProgress);
  progressCbRef.current = onTargetsProgress;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const segsRef = useRef<HTMLSpanElement | null>(null);
  const dvRef = useRef<HTMLElement | null>(null);
  const acqRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const dossierRef = useRef<HTMLDivElement | null>(null);
  const feedRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const resetBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cv: HTMLCanvasElement = canvasRef.current;
    const ctxNullable = cv.getContext('2d');
    if (!ctxNullable) return;
    const ctx: CanvasRenderingContext2D = ctxNullable;

    const tip = tipRef.current!;
    const tipH = tip?.querySelector('.h') as HTMLElement;
    const tipB = tip?.querySelector('.b') as HTMLElement;
    const segsEl = segsRef.current;
    const dvEl = dvRef.current;
    const acqEl = acqRef.current;
    const listEl = listRef.current;
    const dossierEl = dossierRef.current;
    const feedEl = feedRef.current;
    const resetBtn = resetBtnRef.current;

    const PAD = 72, DUR = 1800, TAU = Math.PI * 2;
    const CYAN = '58,174,196', CYANHI = '99,208,228', RED = '255,69,54', INK = '226,232,236';
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let DPR = Math.min(2, window.devicePixelRatio || 1);
    let city: HTMLCanvasElement | null = null;

    let nodes: NodeItem[] = [];
    let edges: EdgeItem[] = [];
    let packets: PacketItem[] = [];
    let ripples: RippleItem[] = [];
    let targets: TargetItem[] = DEFS.map((d, i) => ({
      ...d,
      i,
      state: 'idle',
      p: 0,
      stage: 0,
      t0: 0,
      node: null,
    }));

    const mouse = { x: -999, y: -999, in: false };
    const par = { x: 0, y: 0, tx: 0, ty: 0 };
    const net = { x: 0, y: 0 };

    let hoverT: TargetItem | null = null;
    let hoverN: NodeItem | null = null;
    let listHover: TargetItem | null = null;
    let selT: TargetItem | null = null;
    let curCursor = 'crosshair';

    let acquired = 0;
    let bump = 0;
    let dirty = true;
    let last = performance.now();
    let nextGlitch = 0;
    let densT = 0;
    const glitch = { until: 0, next: 0, slices: [] as { y: number; h: number; dx: number }[] };
    let feed: string[] = [];

    const tmp = { x: 0, y: 0 }, tmp2 = { x: 0, y: 0 };
    let tipKey = '', tipFull = '', tipShown = 0, tipW = 0, tipHh = 0;
    let animationFrameId: number;

    function buildCity() {
      try {
        const rng = mulberry32(7331), cs = 4;
        const ww = W + PAD * 2, wh = H + PAD * 2;
        city = document.createElement('canvas');
        city.width = Math.ceil(ww * DPR);
        city.height = Math.ceil(wh * DPR);
        const c = city.getContext('2d');
        if (!c) return;
        c.scale(DPR, DPR);
        const gw = Math.ceil(ww / cs), gh = Math.ceil(wh / cs);

        const vr: number[] = [], hr: number[] = [];
        for (let x = rng() * 50; x < ww; x += 44 + rng() * 96) vr.push(x);
        for (let y = rng() * 50; y < wh; y += 38 + rng() * 84) hr.push(y);
        const vw = vr.map((_, i) => (i % 4 === 0 ? 4.4 : 2.2));
        const hw = hr.map((_, i) => (i % 4 === 0 ? 4.4 : 2.2));

        const colIdx = new Int16Array(gw), roadV = new Uint8Array(gw);
        let k = 0;
        for (let gx = 0; gx < gw; gx++) {
          const x = gx * cs + cs / 2;
          while (k < vr.length && vr[k] < x) k++;
          colIdx[gx] = k;
          roadV[gx] = ((k < vr.length && vr[k] - x < vw[k]) || (k > 0 && x - vr[k - 1] < vw[k - 1])) ? 1 : 0;
        }
        const rowIdx = new Int16Array(gh), roadH = new Uint8Array(gh);
        k = 0;
        for (let gy = 0; gy < gh; gy++) {
          const y = gy * cs + cs / 2;
          while (k < hr.length && hr[k] < y) k++;
          rowIdx[gy] = k;
          roadH[gy] = ((k < hr.length && hr[k] - y < hw[k]) || (k > 0 && y - hr[k - 1] < hw[k - 1])) ? 1 : 0;
        }

        const levels: string[] = [];
        for (let i = 0; i < 10; i++) levels.push(`rgba(214,222,228,${(0.08 + i * 0.07).toFixed(3)})`);
        const dx = 0.42, dy = 0.9, dl = Math.hypot(dx, dy), ax = dx / dl, ay = dy / dl, p0x = ww * 0.45, p0y = wh * 0.3;

        for (let gy = 0; gy < gh; gy++) {
          const y = gy * cs + cs / 2;
          for (let gx = 0; gx < gw; gx++) {
            const x = gx * cs + cs / 2;
            let a = 0;
            const rv = roadV[gx] || roadH[gy];
            const avenue = Math.abs((x - p0x) * ay - (y - p0y) * ax) < 2.6;
            const rx = x / ww;
            const riverC = wh * 0.46 + Math.sin(rx * 3.6 + 0.6) * wh * 0.09 + (rx - 0.3) * wh * 0.1;
            const river = rx < 0.62 && Math.abs(y - riverC) < 7 + vnoise(x / 90, 3, 4) * 10;
            const railC = wh * 0.31 + (rx - 0.5) * wh * 0.1;
            const rail = rx > 0.22 && Math.abs(y - railC) < 9;
            if (rail) { a = rng() < 0.85 ? 0.3 + rng() * 0.4 : 0; }
            else if (avenue || river) { a = 0; }
            else if (rv) { a = rng() < 0.035 ? 0.3 : 0; }
            else {
              const b = hash2(colIdx[gx], rowIdx[gy], 11);
              const base = b < 0.14 ? 0.05 : 0.18 + b * 0.8;
              const n = fbm(x / 260, y / 260, 5);
              const voidZone = fbm(x / 380 + 9, y / 380, 90) < 0.33;
              let v = base * (0.4 + rng() * 0.6) * (0.55 + n * 0.9);
              if (voidZone) v *= 0.12;
              a = v * 0.75;
            }
            if (a > 0.04) {
              c.fillStyle = levels[Math.min(9, (a * 11) | 0)];
              c.fillRect(gx * cs, gy * cs, cs - 1, cs - 1);
            }
          }
        }
        c.fillStyle = 'rgba(255,255,255,.85)';
        for (let i = 0; i < 150; i++) { c.fillRect(rng() * ww, rng() * wh, 3 + rng() * 6, 3 + rng() * 4); }
        c.fillStyle = 'rgba(255,255,255,.92)';
        for (let i = 0; i < 6; i++) { const s = 10 + rng() * 6; c.fillRect(rng() * ww, rng() * wh, s, s); }
      } catch (e) {
        console.warn("buildCity error:", e);
      }
    }

    function pointAt(e: EdgeItem, d: number, out: { x: number; y: number }) {
      const p = e.pts, cum = e.cum;
      if (d <= 0) { out.x = p[0].x; out.y = p[0].y; return out; }
      for (let i = 1; i < p.length; i++) {
        if (d <= cum[i]) {
          const f = (d - cum[i - 1]) / ((cum[i] - cum[i - 1]) || 1);
          out.x = p[i - 1].x + (p[i].x - p[i - 1].x) * f;
          out.y = p[i - 1].y + (p[i].y - p[i - 1].y) * f;
          return out;
        }
      }
      const l = p[p.length - 1];
      out.x = l.x; out.y = l.y;
      return out;
    }

    function addEdge(pts: { x: number; y: number }[], kind: string, a: number, b: number, alpha?: number) {
      const cum = [0]; let len = 0;
      for (let i = 1; i < pts.length; i++) {
        len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
        cum.push(len);
      }
      const e: EdgeItem = {
        pts,
        cum,
        len: Math.max(1, len),
        kind,
        a,
        b,
        alpha: alpha || 1,
        mid: { x: 0, y: 0 },
        end: pts[pts.length - 1],
        start: pts[0]
      };
      pointAt(e, len / 2, e.mid);
      edges.push(e);
      if (a >= 0 && nodes[a]) nodes[a].links++;
      if (b >= 0 && nodes[b]) nodes[b].links++;
    }

    function buildNet() {
      const rng = mulberry32(4242);
      nodes = []; edges = []; packets = [];
      const addNode = (x: number, y: number, hub: boolean) => {
        const n: NodeItem = { i: nodes.length, x, y, hub, links: 0, t: null };
        nodes.push(n);
        return n;
      };
      FIXED.forEach(f => addNode(f[0] * W, f[1] * H, !!f[2]));
      targets.forEach(t => {
        const n = addNode(t.fx * W, t.fy * H, false);
        n.t = t;
        t.node = n;
      });
      let guard = 0;
      while (nodes.length < FIXED.length + targets.length + 34 && guard++ < 800) {
        const x = rng() * W, y = rng() * H;
        if (nodes.every(n => Math.hypot(n.x - x, n.y - y) > 70)) addNode(x, y, false);
      }
      const seen = new Set<string>();
      const link = (a: number, b: number, alpha: number) => {
        if (a === b) return;
        const k = a < b ? `${a}-${b}` : `${b}-${a}`;
        if (seen.has(k)) return;
        seen.add(k);
        if (nodes[a] && nodes[b]) {
          addEdge([{ x: nodes[a].x, y: nodes[a].y }, { x: nodes[b].x, y: nodes[b].y }], 'w', a, b, alpha);
        }
      };
      nodes.forEach(n => {
        const ds = nodes.filter(o => o !== n).map(o => [o.i, Math.hypot(o.x - n.x, o.y - n.y)]).sort((p, q) => p[1] - q[1]);
        if (ds[0]) link(n.i, ds[0][0], 1);
        if (ds[1] && ds[1][1] < W * 0.28) link(n.i, ds[1][0], 0.8);
      });
      const hubs = nodes.filter(n => n.hub);
      hubs.forEach(h => {
        for (let k = 0; k < 2; k++) {
          const randHub = hubs[(rng() * hubs.length) | 0];
          if (randHub) link(h.i, randHub.i, 0.9);
        }
      });
      targets.forEach(t => {
        let best: NodeItem | null = null, bd = 1e9;
        hubs.forEach(h => {
          if (t.node) {
            const d = Math.hypot(h.x - t.node.x, h.y - t.node.y);
            if (d < bd) { bd = d; best = h; }
          }
        });
        if (best && t.node) link(t.node.i, (best as NodeItem).i, 1);
      });
      for (let k = 0; k < 9; k++) {
        const h = hubs[(rng() * hubs.length) | 0];
        if (h) {
          const ang = rng() * TAU, L = Math.max(W, H);
          addEdge([{ x: h.x, y: h.y }, { x: h.x + Math.cos(ang) * L, y: h.y + Math.sin(ang) * L }], 'w', h.i, -1, 0.7);
        }
      }
      for (let k = 0, tries = 0; k < 16 && tries < 200; tries++) {
        const a = nodes[(rng() * nodes.length) | 0], b = nodes[(rng() * nodes.length) | 0];
        if (!a || !b) continue;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 140 || d > 520) continue;
        const pts = rng() < 0.5 ? [{ x: a.x, y: a.y }, { x: b.x, y: a.y }, { x: b.x, y: b.y }] : [{ x: a.x, y: a.y }, { x: a.x, y: b.y }, { x: b.x, y: b.y }];
        addEdge(pts, 'c', a.i, b.i, 1); k++;
      }
      [[0.27, 0.9, 0.23], [0.1, 0.64, 0.29], [0.48, 1, 0.70]].forEach(l => addEdge([{ x: l[0] * W, y: l[2] * H }, { x: l[1] * W, y: l[2] * H }], 'c', -1, -1, 1));
      [[0.28, 0.75, 0.43], [0.18, 1, 0.86], [0.3, 0.7, 0.34]].forEach(l => addEdge([{ x: l[2] * W, y: l[0] * H }, { x: l[2] * W, y: l[1] * H }], 'c', -1, -1, 1));
      if (edges.length > 0) {
        for (let i = 0; i < 46; i++) {
          packets.push({ e: (rng() * edges.length) | 0, t: rng(), v: 60 + rng() * 110, dir: rng() < 0.5 ? 1 : -1, c: rng() < 0.4 ? CYANHI : INK });
        }
      }
    }

    function drawLens(cx: number, cy: number, ww: number, wh: number, now: number) {
      if (!city) return;
      const R = Math.max(1, Math.min(170, Math.max(110, W * 0.11))), mx = mouse.x, my = mouse.y;
      ctx.save();
      ctx.beginPath(); ctx.arc(mx, my, R, 0, TAU); ctx.clip();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.95; ctx.drawImage(city, cx, cy, ww, wh);
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, R);
      g.addColorStop(0, `rgba(${CYAN},.16)`); g.addColorStop(1, `rgba(${CYAN},0)`);
      ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.fillRect(mx - R, my - R, R * 2, R * 2);
      ctx.restore();
      ctx.save();
      ctx.strokeStyle = `rgba(${CYANHI},.55)`; ctx.lineWidth = 1;
      ctx.setLineDash([2, 8]); ctx.lineDashOffset = RM ? 0 : -now / 60;
      ctx.beginPath(); ctx.arc(mx, my, R, 0, TAU); ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(d => { ctx.moveTo(mx + d[0] * 9, my + d[1] * 9); ctx.lineTo(mx + d[0] * 20, my + d[1] * 20); });
      ctx.stroke();
      ctx.restore();
    }

    function drawNet(_now: number) {
      const ht = hoverT || listHover;
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i];
        let hi = 0;
        if (hoverN && (e.a === hoverN.i || e.b === hoverN.i)) hi = 1;
        if (ht && ht.node && (e.a === ht.node.i || e.b === ht.node.i)) hi = 1;
        for (let j = 0; j < ripples.length; j++) {
          const r = ripples[j];
          const d = Math.min(
            Math.abs(Math.hypot(e.start.x - r.x, e.start.y - r.y) - r.r),
            Math.abs(Math.hypot(e.mid.x - r.x, e.mid.y - r.y) - r.r),
            Math.abs(Math.hypot(e.end.x - r.x, e.end.y - r.y) - r.r)
          );
          if (d < 90) hi = Math.max(hi, (1 - d / 90) * Math.max(0, 1 - r.r / 1200));
        }
        const base = (e.kind === 'c' ? 0.5 : 0.26) * e.alpha;
        ctx.strokeStyle = e.kind === 'c' ? `rgba(${CYAN},${Math.min(1, base + hi * 0.5)})` : `rgba(${INK},${Math.min(1, base + hi * 0.6)})`;
        ctx.lineWidth = 1 + hi * 0.9;
        ctx.beginPath(); ctx.moveTo(e.pts[0].x, e.pts[0].y);
        for (let k = 1; k < e.pts.length; k++) ctx.lineTo(e.pts[k].x, e.pts[k].y);
        ctx.stroke();
      }
      for (const r of ripples) {
        if (r.r <= 0) continue;
        ctx.strokeStyle = `rgba(${CYANHI},${0.5 * Math.max(0, 1 - r.r / 1100)})`; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(r.x, r.y, Math.max(0.1, r.r), 0, TAU); ctx.stroke();
      }
      for (const p of packets) {
        if (!edges[p.e]) continue;
        const e = edges[p.e], d = p.t * e.len;
        pointAt(e, d, tmp); pointAt(e, Math.max(0, Math.min(e.len, d - p.dir * 16)), tmp2);
        ctx.strokeStyle = `rgba(${p.c},.5)`; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(tmp2.x, tmp2.y); ctx.lineTo(tmp.x, tmp.y); ctx.stroke();
        ctx.fillStyle = `rgba(${p.c},.95)`; ctx.fillRect(tmp.x - 1.3, tmp.y - 1.3, 2.6, 2.6);
      }
      for (const nd of nodes) {
        const hov = nd === hoverN;
        if (nd.hub) {
          ctx.strokeStyle = `rgba(${INK},.3)`; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(nd.x, nd.y, 6, 0, TAU); ctx.stroke();
        }
        ctx.fillStyle = `rgba(${INK},${hov ? 1 : 0.85})`;
        ctx.beginPath(); ctx.arc(nd.x, nd.y, hov ? 4 : nd.hub ? 3 : 2, 0, TAU); ctx.fill();
      }
    }

    function drawTargets(now: number) {
      ctx.font = '12px "Share Tech Mono",ui-monospace,monospace';
      for (const tg of targets) {
        if (!tg.node) continue;
        const x = tg.node.x, y = tg.node.y;
        const hov = hoverT === tg || listHover === tg, sel = selT === tg;
        const done = tg.state === 'done', br = tg.state === 'breach';
        const col = done ? CYANHI : RED;
        const pulse = RM ? 0 : Math.sin(now / 260 + tg.i * 1.7);
        let s = done ? 13 : (hov ? 21 : 17) + pulse * 1.3;
        if (br) s = 17 + (RM ? 0 : Math.sin(now / 60) * 2);
        s = Math.max(6, s);

        if (hov && !done) {
          ctx.strokeStyle = `rgba(${RED},.22)`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(-PAD, y); ctx.lineTo(W + PAD, y); ctx.moveTo(x, -PAD); ctx.lineTo(x, H + PAD); ctx.stroke();
        }
        ctx.save();
        ctx.translate(x, y);
        if (br && !RM) ctx.rotate(now / 400);
        ctx.fillStyle = `rgba(${col},${hov ? 0.16 : 0.07})`; ctx.fillRect(-s, -s, s * 2, s * 2);
        const flick = br && Math.floor(now / 90) % 2;
        ctx.strokeStyle = `rgb(${flick ? CYANHI : col})`; ctx.lineWidth = (hov || sel) ? 3 : 2.4;
        const L = s * 0.7;
        ctx.beginPath();
        [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(c => {
          ctx.moveTo(c[0] * s, c[1] * (s - L)); ctx.lineTo(c[0] * s, c[1] * s); ctx.lineTo(c[0] * (s - L), c[1] * s);
        });
        ctx.stroke();
        ctx.restore();
        if (br) {
          ctx.strokeStyle = `rgb(${CYANHI})`; ctx.lineWidth = 2;
          ctx.beginPath();
          const pClamped = Math.max(0, Math.min(1, tg.p));
          ctx.arc(x, y, 30, -Math.PI / 2, -Math.PI / 2 + pClamped * TAU);
          ctx.stroke();
        }
        if (sel && !br) {
          ctx.strokeStyle = `rgba(${col},.55)`; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
          ctx.beginPath(); ctx.arc(x, y, Math.max(1, s + 11), 0, TAU); ctx.stroke(); ctx.setLineDash([]);
        }
        if (done || sel) {
          ctx.fillStyle = `rgb(${col})`; ctx.fillText(tg.id, x + s + 9, y + 4);
        }
      }
    }

    function applyGlitch(now: number) {
      try {
        if (now > glitch.next) {
          glitch.next = now + 45; glitch.slices = [];
          const n = 3 + ((Math.random() * 4) | 0);
          for (let i = 0; i < n; i++) glitch.slices.push({ y: Math.random() * H, h: 6 + Math.random() * 46, dx: (Math.random() - 0.5) * 70 });
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        for (const s of glitch.slices) {
          const y = Math.max(0, Math.floor(s.y * DPR)), h = Math.min(cv.height - y, Math.floor(s.h * DPR));
          if (h <= 0 || cv.width <= 0) continue;
          ctx.drawImage(cv, 0, y, cv.width, h, Math.round(s.dx * DPR), y, cv.width, h);
        }
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      } catch {
        // Ignore canvas glitch slice copy errors safely
      }
    }

    function draw(now: number) {
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
      if (!city) return;
      const cx = -PAD - par.x * 34, cy = -PAD - par.y * 26, ww = W + PAD * 2, wh = H + PAD * 2;
      ctx.globalAlpha = 0.6; ctx.drawImage(city, cx, cy, ww, wh); ctx.globalAlpha = 1;
      if (mouse.in) drawLens(cx, cy, ww, wh, now);
      ctx.save(); ctx.translate(net.x, net.y);
      drawNet(now); drawTargets(now);
      ctx.restore();
      if (glitch.until > now) applyGlitch(now);
    }

    function sector() {
      const cx = Math.floor(mouse.x / 160), cy = Math.floor(mouse.y / 160);
      return String.fromCharCode(65 + (((cx % 26) + 26) % 26)) + '-' + String(Math.max(0, cy) + 1).padStart(2, '0');
    }

    function pick() {
      if (!mouse.in) { hoverT = hoverN = null; return; }
      const x = mouse.x - net.x, y = mouse.y - net.y;
      let bt: TargetItem | null = null, bd = 30;
      for (const t of targets) {
        if (!t.node) continue;
        const d = Math.hypot(t.node.x - x, t.node.y - y);
        if (d < bd) { bd = d; bt = t; }
      }
      hoverT = bt; hoverN = null;
      if (!bt) {
        let bn: NodeItem | null = null, bd2 = 13;
        for (const n of nodes) {
          if (n.t) continue;
          const d = Math.hypot(n.x - x, n.y - y);
          if (d < bd2) { bd2 = d; bn = n; }
        }
        hoverN = bn;
      }
      const c = hoverT ? 'pointer' : 'crosshair';
      if (c !== curCursor) { cv.style.cursor = c; curCursor = c; }
    }

    function setMouse(e: PointerEvent) {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.in = true;
      par.tx = (mouse.x / W - 0.5) * 2; par.ty = (mouse.y / H - 0.5) * 2;
      dirty = true;
    }

    function say(msg: string) {
      try {
        feed.push(msg); feed = feed.slice(-4);
        if (feedEl) {
          feedEl.innerHTML = '';
          feed.forEach(s => {
            const d = document.createElement('div');
            d.textContent = s;
            feedEl.appendChild(d);
          });
        }
      } catch {
        // safe fallback
      }
    }

    function glitchNow(now: number, ms: number) {
      if (RM) return;
      glitch.until = now + ms; glitch.next = 0;
    }

    function ping() {
      const x = mouse.x - net.x, y = mouse.y - net.y;
      ripples.push({ x, y, t0: performance.now(), r: 0 });
      let n = 0;
      for (const nd of nodes) if (Math.hypot(nd.x - x, nd.y - y) < 320) n++;
      say(`> ping ${sector()}: ${n} node${n === 1 ? '' : 's'} answered`);
      bump = 1; dirty = true;
    }

    function activate(tg: TargetItem) {
      selT = tg;
      if (tg.state === 'idle') {
        tg.state = 'breach'; tg.p = 0; tg.stage = 0; tg.t0 = performance.now();
        say(`> ${tg.id}: handshake started`);
        glitchNow(tg.t0, 160);
      }
      renderAll(); dirty = true;
    }

    function updateBreach(now: number) {
      for (const tg of targets) {
        if (tg.state !== 'breach') continue;
        tg.p = Math.min(1, Math.max(0, (now - tg.t0) / DUR));
        if (tg.p >= 0.35 && tg.stage < 1) { tg.stage = 1; say(`> weakness: ${tg.weak}`); }
        if (tg.p >= 0.7 && tg.stage < 2) { tg.stage = 2; say(`> ${tg.id}: access gained`); }
        if (tg.p >= 1) {
          tg.state = 'done'; acquired++;
          say(`> ${tg.id} acquired`);
          glitchNow(now, 220);
          if (tg.node) ripples.push({ x: tg.node.x, y: tg.node.y, t0: now, r: 0 });
          bump = 1; renderAll();
          if (acquired === targets.length) say('> all targets acquired. Each hole was a basic misconfiguration.');
        }
      }
    }

    function placeTip() {
      if (!tip) return;
      let x = mouse.x + 18, y = mouse.y + 20;
      if (x + tipW > W - 8) x = mouse.x - tipW - 14;
      if (y + tipHh > H - 8) y = mouse.y - tipHh - 14;
      tip.style.transform = `translate(${Math.max(4, x)}px,${Math.max(4, y)}px)`;
    }

    function updateTip(dt: number) {
      if (!tip) return;
      if (!mouse.in) { tip.style.opacity = '0'; return; }
      let key = '', head = '', body = '', mode = 'fact';
      if (hoverT) {
        mode = 'target'; key = 't' + hoverT.i + hoverT.state;
        head = `${hoverT.id} · ${hoverT.kind}`;
        body = hoverT.state === 'idle' ? 'Click to breach.' : hoverT.state === 'breach' ? 'Breach in progress.' : 'Acquired. Click to read the lesson.';
      } else if (hoverN) {
        key = 'n' + hoverN.i;
        head = `Relay 0x${hoverN.i.toString(16).toUpperCase().padStart(2, '0')} · ${hoverN.links} links`;
        body = FACTS[Math.floor(hash2(hoverN.i, 7, 3) * FACTS.length)];
      } else {
        const cx = Math.floor(mouse.x / 160), cy = Math.floor(mouse.y / 160);
        key = 's' + cx + ',' + cy; head = 'Sector ' + sector();
        body = FACTS[Math.floor(hash2(cx, cy, 3) * FACTS.length)];
      }
      if (key !== tipKey) {
        tipKey = key; tipFull = body; tipShown = (RM || mode === 'target') ? body.length : 0;
        if (tipH) tipH.textContent = head;
        if (tipB) tipB.textContent = tipShown ? body : '';
        tip.classList.toggle('tgt', mode === 'target');
        tipW = tip.offsetWidth; tipHh = tip.offsetHeight;
      }
      if (tipShown < tipFull.length) {
        tipShown = Math.min(tipFull.length, tipShown + dt * 0.08);
        if (tipB) tipB.textContent = tipFull.slice(0, tipShown | 0);
        tipW = tip.offsetWidth; tipHh = tip.offsetHeight;
      }
      tip.style.opacity = '1'; placeTip();
    }

    function buildSegs() {
      if (!segsEl) return;
      segsEl.innerHTML = '';
      for (let i = 0; i < 10; i++) segsEl.appendChild(document.createElement('i'));
    }

    function density(now: number) {
      if (!dvEl || !segsEl) return;
      if (now - densT < 500) return; densT = now;
      const v = RM ? 62 : Math.round(Math.max(20, Math.min(99, 56 + 14 * Math.sin(now / 2600) + 6 * Math.sin(now / 700) + bump * 24)));
      dvEl.textContent = v + '%';
      const on = Math.round(v / 10);
      [...segsEl.children].forEach((s, i) => s.classList.toggle('on', i < on));
    }

    function buildList() {
      if (!listEl) return;
      listEl.innerHTML = '';
      targets.forEach(t => {
        const b = document.createElement('button');
        b.type = 'button'; b.dataset.i = String(t.i);
        b.innerHTML = `<i class="dot"></i><span class="c">${t.code}</span><span class="n">-${t.id.split('-')[1]}</span>`;
        b.addEventListener('click', () => activate(t));
        const on = () => { listHover = t; dirty = true; };
        const off = () => { listHover = null; dirty = true; };
        b.addEventListener('pointerenter', on); b.addEventListener('pointerleave', off);
        b.addEventListener('focus', on); b.addEventListener('blur', off);
        listEl.appendChild(b);
      });
    }

    function renderDossier() {
      if (!dossierEl) return;
      const t = selT;
      if (!t) {
        dossierEl.innerHTML = '<p>Move across the map to scan a sector. Click a red target to breach it, or click empty space to ping the network.</p>';
        return;
      }
      let h = `<p><b>${t.id}</b> ${t.kind}</p>`;
      if (t.state === 'idle') h += '<p>Locked. Click the target to start a breach.</p>';
      else if (t.state === 'breach') h += '<p>Breach in progress.</p>';
      else h += `<p><span class="k">Weakness</span> ${t.weak}</p><p><span class="k">Fix</span> ${t.fix}</p>`;
      dossierEl.innerHTML = h;
    }

    function renderAll() {
      if (acqEl) acqEl.textContent = acquired + '/' + targets.length;
      progressCbRef.current?.(acquired, targets.length);
      if (listEl) {
        [...listEl.children].forEach((b, i) => {
          const t = targets[i];
          if (!t) return;
          b.className = (t.state === 'done' ? 'done' : t.state === 'breach' ? 'breach' : '') + (t === selT ? ' sel' : '');
          b.setAttribute('aria-label', `${t.id}, ${t.kind}, ${t.state === 'idle' ? 'locked' : t.state === 'breach' ? 'breaching' : 'acquired'}`);
        });
      }
      renderDossier();
    }

    function reset() {
      targets.forEach(t => { t.state = 'idle'; t.p = 0; t.stage = 0; });
      acquired = 0; selT = null; feed = [];
      say(`> ctOS reset. ${targets.length} targets locked.`);
      renderAll(); dirty = true;
    }

    const onPointerMove = (e: PointerEvent) => { setMouse(e); pick(); };
    const onPointerDown = (e: PointerEvent) => { setMouse(e); pick(); if (hoverT) activate(hoverT); else ping(); };
    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') { mouse.in = false; hoverT = hoverN = null; par.tx = par.ty = 0; dirty = true; }
    };

    cv.addEventListener('pointermove', onPointerMove);
    cv.addEventListener('pointerdown', onPointerDown);
    cv.addEventListener('pointerleave', onPointerLeave);
    if (resetBtn) resetBtn.addEventListener('click', reset);

    const handleBreachAll = () => {
      targets.forEach(t => {
        t.state = 'done';
        t.p = 1;
        t.stage = 2;
      });
      acquired = targets.length;
      say('> OVERRIDE: All targets breached');
      renderAll();
      dirty = true;
    };
    window.addEventListener('DEDSEC_BREACH_ALL', handleBreachAll);

    function resize() {
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
      buildCity(); buildNet(); dirty = true;
    }

    let rt: number | undefined;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => {
        if (city && Math.abs(window.innerWidth - W) < 1 && Math.abs(window.innerHeight - H) < 150) return;
        resize();
      }, 200);
    };
    window.addEventListener('resize', onResize);

    function frame(now: number) {
      try {
        const dt = Math.min(64, now - last); last = now;
        const k = RM ? 1 : 1 - Math.pow(0.002, dt / 1000);
        par.x += (par.tx - par.x) * k; par.y += (par.ty - par.y) * k;
        net.x = -par.x * 12; net.y = -par.y * 8;
        if (mouse.in) pick();
        updateBreach(now);
        for (let i = ripples.length - 1; i >= 0; i--) {
          ripples[i].r = Math.max(0, (now - ripples[i].t0) * 0.85);
          if (ripples[i].r > 1300) ripples.splice(i, 1);
        }
        if (!RM) {
          for (const p of packets) {
            if (!edges[p.e]) continue;
            p.t += p.dir * p.v * dt / 1000 / edges[p.e].len;
            if (p.t > 1) p.t = 0; else if (p.t < 0) p.t = 1;
          }
          if (now > nextGlitch) { glitchNow(now, 140); nextGlitch = now + 3500 + Math.random() * 6000; }
        }
        bump *= Math.pow(0.4, dt / 1000);
        density(now);
        updateTip(dt);
        const moving = Math.abs(par.tx - par.x) > 0.001 || Math.abs(par.ty - par.y) > 0.001;
        const busy = !RM || dirty || ripples.length > 0 || moving || targets.some(t => t.state === 'breach');
        if (busy) draw(now);
        dirty = false;
      } catch (err) {
        console.error("ctOS frame error:", err);
      } finally {
        animationFrameId = requestAnimationFrame(frame);
      }
    }

    buildSegs(); buildList(); resize();
    say(`> uplink established. ${targets.length} targets in range.`);
    renderAll();
    setTimeout(() => { ripples.push({ x: W * 0.5, y: H * 0.45, t0: performance.now(), r: 0 }); dirty = true; }, 500);
    nextGlitch = performance.now() + 4000;
    animationFrameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.clearTimeout(rt);
      window.removeEventListener('DEDSEC_BREACH_ALL', handleBreachAll);
      cv.removeEventListener('pointermove', onPointerMove);
      cv.removeEventListener('pointerdown', onPointerDown);
      cv.removeEventListener('pointerleave', onPointerLeave);
      if (resetBtn) resetBtn.removeEventListener('click', reset);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <canvas id="map" ref={canvasRef} role="img" aria-label="Interactive ctOS city network map. Use the target list to breach targets with keyboard." />
      <div className="fx" aria-hidden="true" />

      {/* Top-Left Main Page Hero Identity & Direct HUD Navigation */}
      <header
        className={`ctos-hero-header ${isPhoneSettled ? 'dimmed' : ''}`}
        aria-label="Operative Identity and Dossier Shortcuts"
      >
        <div className="hero-identity-block">
          <h1 className="hero-identity-name">Ansh Yadav</h1>
          <div className="hero-identity-sub">
            <span className="hero-sub-text">BTech 1st Year</span>
            <span className="hero-sub-divider">//</span>
            <span className="hero-sub-institution">University of Lucknow</span>
          </div>
        </div>

        <nav className="ctos-hud-nav" aria-label="ctOS Dossier Shortcuts">
          <button
            type="button"
            className="hud-nav-btn"
            onClick={() => onOpenApp?.('WHOAMI')}
            title="Open Bio (pages/about.html)"
          >
            01 BIO
          </button>
          <button
            type="button"
            className="hud-nav-btn"
            onClick={() => onOpenApp?.('MISSIONS')}
            title="Open Projects (pages/projects.html)"
          >
            02 PROJECTS
          </button>
          <button
            type="button"
            className="hud-nav-btn"
            onClick={() => onOpenApp?.('LOADOUT')}
            title="Open Certs (pages/certs.html)"
          >
            03 CERTS
          </button>
          <button
            type="button"
            className="hud-nav-btn"
            onClick={() => onOpenApp?.('LEARNING')}
            title="Open Learning (pages/learning.html)"
          >
            04 LEARNING
          </button>
          <button
            type="button"
            className="hud-nav-btn"
            onClick={() => onOpenApp?.('SIGNAL')}
            title="Open Contact (pages/contact.html)"
          >
            05 CONTACT
          </button>
        </nav>
      </header>

      <header className={`ctos ${isPhoneSettled ? 'dimmed' : ''}`} aria-label="ctOS network status">
        <div className="logo" aria-label="ctOS">
          <div className="cells">
            <span>c</span>
            <span>t</span>
            <span className="o"><i></i></span>
            <span>S</span>
          </div>
          <div className="bar" />
        </div>
        <div className="row">CORE NETWORK MAP</div>
        <div className="row">[UPLINK ACTIVE]</div>
        <div className="row">
          TRAFFIC DENSITY: <span className="segs" ref={segsRef} aria-hidden="true" /><b ref={dvRef}>62%</b>
        </div>
        <div className="row">
          TARGETS ACQUIRED: <b ref={acqRef}>0/8</b>
        </div>
      </header>

      <aside className={`panel ${isPhoneSettled ? 'dimmed' : ''}`} aria-label="Targets">
        <div className="ph">
          <span>Targets</span>
          <button type="button" ref={resetBtnRef} id="reset">Reset</button>
        </div>
        <div className="list" ref={listRef} />
        <div id="dossier" ref={dossierRef} />
        <div id="feed" ref={feedRef} aria-live="polite" />
      </aside>

      <div id="tip" ref={tipRef} aria-hidden="true">
        <div className="h" />
        <div className="b" />
      </div>
    </>
  );
};
