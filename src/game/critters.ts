/**
 * Procedural chibi creature art.
 *
 * Every creature here is drawn at runtime on a canvas in a thick-outlined,
 * cel-shaded chibi style — no imported sprite packs. Each design produces the
 * three strips the engine expects: idle (6), walk (8), death (10).
 *
 * The renderer is deliberately layered like a painter would work:
 * shadow -> tail -> wings -> back limbs -> body (base, cel shade, rim light,
 * pattern) -> belly plate -> arms + claws -> crown -> brows -> eyes -> mouth.
 */

export type CritterShape = "blob" | "egg" | "round" | "wide" | "tall";
export type CritterCrown = "none" | "horns" | "ears" | "antenna" | "spikes" | "crown" | "fin";
export type CritterMouth = "none" | "fangs" | "grin" | "smile" | "maw";
export type CritterPattern = "none" | "spots" | "stripes" | "plates" | "belly";
export type CritterBrow = "none" | "angry" | "sad" | "flat";

export type CritterEnemyKey =
  | "cr_mite" | "cr_sprig" | "cr_ember" | "cr_frost" | "cr_husk" | "cr_gaze"
  | "cr_venom" | "cr_shade" | "cr_rust" | "cr_bloom" | "cr_grub" | "cr_brute"
  | "cr_warden" | "cr_titan" | "cr_dread" | "cr_omen";

export type CritterHeroKey = "templar" | "reaper" | "oracle" | "seraph" | "warchief" | "sprout";

export interface CritterDesign {
  key: CritterEnemyKey | CritterHeroKey;
  name: string;
  /** main body colour */
  body: string;
  /** darker tone used for the cel shadow, horns and pattern */
  shade: string;
  /** iris colour */
  eye: string;
  shape: CritterShape;
  crown: CritterCrown;
  mouth: CritterMouth;
  eyes: 1 | 2 | 3;
  arms: boolean;
  tail: boolean;
  /** bulk: nudges silhouette proportions (world size comes from the stat table) */
  size: number;
  pattern?: CritterPattern;
  brow?: CritterBrow;
  wings?: boolean;
  claws?: boolean;
  /** optional emissive halo behind the creature (bosses / elites) */
  glow?: string;
}

const OUTLINE = "#140f1a";
const LIMB = "#231b2e";
const TOOTH = "#fdfbff";

export const FRAME = 160;
export const IDLE_FRAMES = 6;
export const WALK_FRAMES = 8;
export const DEATH_FRAMES = 10;

/* ------------------------------- the roster -------------------------------- */

export const CRITTER_ENEMIES: CritterDesign[] = [
  { key: "cr_mite", name: "Gloom Mite", body: "#b478e8", shade: "#7a3fb8", eye: "#ffe6fb", shape: "blob", crown: "horns", mouth: "fangs", eyes: 2, arms: true, tail: false, size: 0.82, pattern: "belly", brow: "angry", claws: true },
  { key: "cr_sprig", name: "Bog Sprig", body: "#8ed24f", shade: "#4f8b22", eye: "#1d3410", shape: "egg", crown: "ears", mouth: "grin", eyes: 2, arms: true, tail: true, size: 0.85, pattern: "spots", brow: "sad", claws: true },
  { key: "cr_ember", name: "Ember Pup", body: "#ff7a52", shade: "#b83a20", eye: "#fff0d0", shape: "round", crown: "horns", mouth: "fangs", eyes: 2, arms: true, tail: true, size: 0.9, pattern: "belly", brow: "angry", claws: true, glow: "rgba(255,140,70,0.5)" },
  { key: "cr_frost", name: "Frost Nib", body: "#6fd8f0", shade: "#2f87a8", eye: "#0d2a36", shape: "blob", crown: "spikes", mouth: "fangs", eyes: 2, arms: true, tail: false, size: 0.88, pattern: "plates", brow: "flat", claws: true, glow: "rgba(120,225,255,0.4)" },
  { key: "cr_husk", name: "Ash Husk", body: "#9aa2b8", shade: "#5b6379", eye: "#ffd76a", shape: "tall", crown: "none", mouth: "maw", eyes: 2, arms: true, tail: false, size: 0.95, pattern: "stripes", brow: "angry" },
  { key: "cr_gaze", name: "Gazer", body: "#f0dd63", shade: "#b89a1f", eye: "#2e1f08", shape: "round", crown: "antenna", mouth: "grin", eyes: 1, arms: true, tail: false, size: 0.9, pattern: "spots", brow: "angry", claws: true },
  { key: "cr_venom", name: "Venom Tick", body: "#57d9a3", shade: "#1f8a5f", eye: "#07241a", shape: "wide", crown: "spikes", mouth: "fangs", eyes: 3, arms: true, tail: true, size: 0.95, pattern: "plates", brow: "angry", claws: true },
  { key: "cr_shade", name: "Shade Wisp", body: "#7a6ce0", shade: "#3d3390", eye: "#efeaff", shape: "egg", crown: "fin", mouth: "grin", eyes: 2, arms: true, tail: true, size: 0.95, pattern: "none", brow: "sad", wings: true, glow: "rgba(150,130,255,0.45)" },
  { key: "cr_rust", name: "Rustling", body: "#d98a3c", shade: "#8f4d10", eye: "#301a06", shape: "blob", crown: "horns", mouth: "maw", eyes: 2, arms: true, tail: false, size: 1, pattern: "stripes", brow: "angry", claws: true },
  { key: "cr_bloom", name: "Rot Bloom", body: "#e86fa8", shade: "#a32f6c", eye: "#3a0c22", shape: "round", crown: "crown", mouth: "fangs", eyes: 2, arms: true, tail: false, size: 1, pattern: "spots", brow: "sad", claws: true },
  { key: "cr_grub", name: "Deep Grub", body: "#c3d9e8", shade: "#7e94a8", eye: "#231428", shape: "wide", crown: "ears", mouth: "fangs", eyes: 3, arms: true, tail: true, size: 1.05, pattern: "plates", brow: "flat", claws: true },
  { key: "cr_brute", name: "Slag Brute", body: "#6b7be8", shade: "#2f3b96", eye: "#eaf0ff", shape: "wide", crown: "horns", mouth: "maw", eyes: 2, arms: true, tail: false, size: 1.2, pattern: "plates", brow: "angry", claws: true },
  { key: "cr_warden", name: "Warden Sac", body: "#a34fd9", shade: "#621c92", eye: "#ffe6ff", shape: "tall", crown: "crown", mouth: "fangs", eyes: 3, arms: true, tail: true, size: 1.22, pattern: "spots", brow: "angry", claws: true, glow: "rgba(190,110,255,0.45)" },
  { key: "cr_titan", name: "Mire Titan", body: "#3fbf8f", shade: "#166b4c", eye: "#f6ffe0", shape: "tall", crown: "spikes", mouth: "maw", eyes: 2, arms: true, tail: true, size: 1.35, pattern: "plates", brow: "angry", claws: true },
  { key: "cr_dread", name: "Dread Maw", body: "#e0483f", shade: "#8c1a16", eye: "#ffe2c8", shape: "wide", crown: "horns", mouth: "maw", eyes: 3, arms: true, tail: true, size: 1.4, pattern: "stripes", brow: "angry", claws: true, wings: true, glow: "rgba(255,90,70,0.45)" },
  { key: "cr_omen", name: "Pale Omen", body: "#f2f0ea", shade: "#a9a49b", eye: "#6a1030", shape: "tall", crown: "fin", mouth: "maw", eyes: 2, arms: true, tail: false, size: 1.45, pattern: "plates", brow: "angry", claws: true, wings: true, glow: "rgba(255,240,220,0.4)" },
];

export const CRITTER_HEROES: CritterDesign[] = [
  { key: "templar", name: "Templar", body: "#e8e2d2", shade: "#a89f88", eye: "#3a6fd0", shape: "egg", crown: "crown", mouth: "smile", eyes: 2, arms: true, tail: false, size: 0.95, pattern: "plates", brow: "flat" },
  { key: "reaper", name: "Reaper", body: "#4c4a63", shade: "#26243a", eye: "#8bf7c8", shape: "tall", crown: "fin", mouth: "grin", eyes: 2, arms: true, tail: true, size: 1, pattern: "none", brow: "angry", glow: "rgba(120,255,205,0.35)" },
  { key: "oracle", name: "Oracle", body: "#8f6ce0", shade: "#4f3496", eye: "#ffe9a8", shape: "egg", crown: "antenna", mouth: "smile", eyes: 1, arms: true, tail: false, size: 0.95, pattern: "spots", brow: "flat" },
  { key: "seraph", name: "Seraph", body: "#ffd98a", shade: "#cb9c40", eye: "#4a2f0a", shape: "round", crown: "crown", mouth: "smile", eyes: 2, arms: true, tail: false, size: 0.95, pattern: "belly", brow: "flat", wings: true },
  { key: "warchief", name: "Warchief", body: "#6fbf5a", shade: "#33771f", eye: "#ffeecb", shape: "wide", crown: "horns", mouth: "fangs", eyes: 2, arms: true, tail: false, size: 1.05, pattern: "stripes", brow: "angry", claws: true },
  { key: "sprout", name: "Sprout", body: "#a8e86f", shade: "#639f2c", eye: "#1f3a12", shape: "blob", crown: "ears", mouth: "grin", eyes: 2, arms: true, tail: true, size: 0.82, pattern: "spots", brow: "sad" },
];

/* --------------------------------- helpers --------------------------------- */

function parseColor(v: string): [number, number, number] {
  if (v.startsWith("#")) {
    return [
      parseInt(v.slice(1, 3), 16),
      parseInt(v.slice(3, 5), 16),
      parseInt(v.slice(5, 7), 16),
    ];
  }
  const m = v.match(/-?\d+(\.\d+)?/g) ?? ["0", "0", "0"];
  return [Number(m[0]), Number(m[1]), Number(m[2])];
}

/** blend two colours (hex or rgb()) — used for cel shading and highlights */
function mix(from: string, to: string, t: number) {
  const a = parseColor(from);
  const b = parseColor(to);
  const c = a.map((v, i) => Math.round(v + (b[i]! - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

/** deterministic pseudo-random so a design always looks identical */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function seedOf(key: string) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** limbs read as a darker relative of the body instead of flat black */
function limbTone(d: CritterDesign) {
  return mix(d.shade, LIMB, 0.55);
}

function ink(g: CanvasRenderingContext2D, width: number) {
  g.lineJoin = "round";
  g.lineCap = "round";
  g.lineWidth = width;
  g.strokeStyle = OUTLINE;
}

/* --------------------------------- drawing --------------------------------- */

function bodyPath(g: CanvasRenderingContext2D, d: CritterDesign, w: number, h: number, squash: number) {
  const bw = w * (1 + (1 - squash) * 0.3);
  const bh = h * squash;
  g.beginPath();
  switch (d.shape) {
    case "egg":
      g.moveTo(0, -bh);
      g.bezierCurveTo(bw * 0.62, -bh * 0.96, bw * 0.6, -bh * 0.1, 0, -bh * 0.02);
      g.bezierCurveTo(-bw * 0.6, -bh * 0.1, -bw * 0.62, -bh * 0.96, 0, -bh);
      break;
    case "round":
      g.moveTo(0, -bh);
      g.bezierCurveTo(bw * 0.78, -bh * 0.98, bw * 0.74, -bh * 0.06, 0, -bh * 0.02);
      g.bezierCurveTo(-bw * 0.74, -bh * 0.06, -bw * 0.78, -bh * 0.98, 0, -bh);
      break;
    case "wide":
      g.moveTo(0, -bh * 0.98);
      g.bezierCurveTo(bw * 0.96, -bh * 0.9, bw * 0.9, -bh * 0.04, 0, -bh * 0.02);
      g.bezierCurveTo(-bw * 0.9, -bh * 0.04, -bw * 0.96, -bh * 0.9, 0, -bh * 0.98);
      break;
    case "tall":
      g.moveTo(0, -bh * 1.02);
      g.bezierCurveTo(bw * 0.66, -bh * 0.98, bw * 0.62, -bh * 0.12, 0, -bh * 0.03);
      g.bezierCurveTo(-bw * 0.62, -bh * 0.12, -bw * 0.66, -bh * 0.98, 0, -bh * 1.02);
      break;
    default:
      // blob: heavy pear silhouette with a soft crown
      g.moveTo(-bw * 0.56, -bh * 0.36);
      g.bezierCurveTo(-bw * 0.66, -bh * 1.04, bw * 0.66, -bh * 1.04, bw * 0.56, -bh * 0.36);
      g.bezierCurveTo(bw * 0.6, -bh * 0.02, -bw * 0.6, -bh * 0.02, -bw * 0.56, -bh * 0.36);
      break;
  }
  g.closePath();
}

function drawPattern(g: CanvasRenderingContext2D, d: CritterDesign, w: number, h: number) {
  const r = rng(seedOf(d.key));
  const dark = mix(d.shade, "#000000", 0.15);
  switch (d.pattern) {
    case "spots":
      g.fillStyle = dark;
      g.globalAlpha = 0.5;
      for (let i = 0; i < 9; i++) {
        const x = (r() - 0.5) * w * 1.5;
        const y = -h * (0.08 + r() * 0.5);
        const rr = w * (0.05 + r() * 0.07);
        g.beginPath();
        g.ellipse(x, y, rr, rr * 0.82, r() * 3, 0, Math.PI * 2);
        g.fill();
      }
      break;
    case "stripes":
      g.strokeStyle = dark;
      g.globalAlpha = 0.45;
      g.lineWidth = w * 0.1;
      g.lineCap = "round";
      for (let i = 0; i < 5; i++) {
        const y = -h * (0.08 + i * 0.11);
        g.beginPath();
        g.moveTo(-w, y);
        g.quadraticCurveTo(0, y - h * 0.06, w, y);
        g.stroke();
      }
      break;
    case "plates":
      g.strokeStyle = dark;
      g.globalAlpha = 0.55;
      g.lineWidth = 3.5;
      for (let i = 0; i < 4; i++) {
        const y = -h * (0.1 + i * 0.12);
        g.beginPath();
        g.moveTo(-w * 0.8, y);
        g.quadraticCurveTo(0, y + h * 0.07, w * 0.8, y);
        g.stroke();
      }
      break;
    case "belly":
      g.globalAlpha = 0.85;
      g.fillStyle = mix(d.body, "#ffffff", 0.55);
      g.beginPath();
      g.ellipse(0, -h * 0.2, w * 0.46, h * 0.24, 0, 0, Math.PI * 2);
      g.fill();
      break;
    default:
      break;
  }
  g.globalAlpha = 1;
}

function drawCrown(g: CanvasRenderingContext2D, d: CritterDesign, w: number, h: number) {
  const top = -h * 0.9;
  const horn = mix(d.shade, "#f7edd8", 0.72);
  ink(g, 5);

  const drawHorn = (sx: number) => {
    const grad = g.createLinearGradient(sx * w * 0.2, top, sx * w * 0.7, top - h * 0.4);
    grad.addColorStop(0, mix(horn, "#000000", 0.3));
    grad.addColorStop(1, mix(horn, "#ffffff", 0.5));
    g.fillStyle = grad;
    g.beginPath();
    g.moveTo(sx * w * 0.22, top + h * 0.18);
    g.quadraticCurveTo(sx * w * 0.42, top - h * 0.08, sx * w * 0.78, top - h * 0.2);
    g.quadraticCurveTo(sx * w * 0.52, top + h * 0.04, sx * w * 0.56, top + h * 0.2);
    g.closePath();
    g.fill();
    g.stroke();
    // ridge lines carved into the horn
    g.save();
    g.globalAlpha = 0.4;
    g.lineWidth = 2.4;
    for (let i = 1; i <= 2; i++) {
      const t = i / 3;
      g.beginPath();
      g.moveTo(sx * w * (0.18 + 0.3 * t), top + h * (0.14 - 0.13 * t));
      g.lineTo(sx * w * (0.5 + 0.14 * t), top + h * (0.16 - 0.22 * t));
      g.stroke();
    }
    g.restore();
  };

  switch (d.crown) {
    case "horns":
      drawHorn(-1);
      drawHorn(1);
      break;
    case "ears":
      for (const sx of [-1, 1]) {
        g.fillStyle = d.body;
        g.beginPath();
        g.ellipse(sx * w * 0.5, top - h * 0.02, w * 0.16, h * 0.24, sx * 0.42, 0, Math.PI * 2);
        g.fill();
        g.stroke();
        g.save();
        g.globalAlpha = 0.75;
        g.fillStyle = mix(d.shade, "#ff9ec0", 0.4);
        g.beginPath();
        g.ellipse(sx * w * 0.5, top - h * 0.02, w * 0.075, h * 0.14, sx * 0.42, 0, Math.PI * 2);
        g.fill();
        g.restore();
      }
      break;
    case "antenna":
      g.lineWidth = 5;
      g.beginPath();
      g.moveTo(0, top + h * 0.1);
      g.quadraticCurveTo(w * 0.22, top - h * 0.2, w * 0.06, top - h * 0.36);
      g.stroke();
      g.beginPath();
      g.arc(w * 0.06, top - h * 0.42, w * 0.12, 0, Math.PI * 2);
      g.fillStyle = mix(d.eye, "#ffffff", 0.35);
      g.fill();
      g.stroke();
      g.save();
      g.globalAlpha = 0.7;
      g.fillStyle = "#fff";
      g.beginPath();
      g.arc(w * 0.02, top - h * 0.46, w * 0.04, 0, Math.PI * 2);
      g.fill();
      g.restore();
      break;
    case "spikes":
      for (let i = -2; i <= 2; i++) {
        const tall = 1 - Math.abs(i) * 0.22;
        g.beginPath();
        g.moveTo(i * w * 0.24 - w * 0.11, top + h * 0.16);
        g.quadraticCurveTo(i * w * 0.24, top - h * 0.1 * tall, i * w * 0.24, top - h * 0.3 * tall);
        g.quadraticCurveTo(i * w * 0.24, top - h * 0.1 * tall, i * w * 0.24 + w * 0.11, top + h * 0.16);
        g.closePath();
        g.fillStyle = mix(d.shade, "#f7edd8", 0.66);
        g.fill();
        g.stroke();
      }
      break;
    case "crown": {
      const gold = g.createLinearGradient(0, top - h * 0.3, 0, top + h * 0.06);
      gold.addColorStop(0, "#ffe9a0");
      gold.addColorStop(0.5, "#ffc43e");
      gold.addColorStop(1, "#c98a1a");
      g.fillStyle = gold;
      g.beginPath();
      g.moveTo(-w * 0.42, top + h * 0.08);
      g.lineTo(-w * 0.46, top - h * 0.26);
      g.lineTo(-w * 0.18, top - h * 0.08);
      g.lineTo(0, top - h * 0.36);
      g.lineTo(w * 0.18, top - h * 0.08);
      g.lineTo(w * 0.46, top - h * 0.26);
      g.lineTo(w * 0.42, top + h * 0.08);
      g.closePath();
      g.fill();
      g.stroke();
      g.fillStyle = "#ff5c7a";
      for (const sx of [-1, 0, 1]) {
        g.beginPath();
        g.arc(sx * w * 0.24, top - h * 0.02, w * 0.045, 0, Math.PI * 2);
        g.fill();
        g.stroke();
      }
      break;
    }
    case "fin":
      g.fillStyle = mix(d.shade, "#ffffff", 0.18);
      g.beginPath();
      g.moveTo(-w * 0.1, top + h * 0.16);
      g.quadraticCurveTo(-w * 0.02, top - h * 0.46, w * 0.26, top - h * 0.1);
      g.quadraticCurveTo(w * 0.08, top + h * 0.06, -w * 0.1, top + h * 0.16);
      g.closePath();
      g.fill();
      g.stroke();
      g.save();
      g.globalAlpha = 0.35;
      g.lineWidth = 2.6;
      for (let i = 1; i <= 3; i++) {
        g.beginPath();
        g.moveTo(-w * 0.02 + i * w * 0.05, top + h * 0.1);
        g.lineTo(w * 0.02 + i * w * 0.05, top - h * 0.16 + i * h * 0.05);
        g.stroke();
      }
      g.restore();
      break;
    default:
      break;
  }
}

function drawWings(g: CanvasRenderingContext2D, d: CritterDesign, w: number, h: number, flap: number) {
  ink(g, 5);
  for (const sx of [-1, 1]) {
    g.save();
    g.translate(sx * w * 0.5, -h * 0.68);
    g.rotate(sx * (0.2 + flap * 0.22));
    const grad = g.createLinearGradient(0, 0, sx * w * 0.9, -h * 0.3);
    grad.addColorStop(0, mix(d.shade, "#000000", 0.2));
    grad.addColorStop(1, mix(d.shade, "#ffffff", 0.15));
    g.fillStyle = grad;
    g.beginPath();
    g.moveTo(0, 0);
    g.quadraticCurveTo(sx * w * 0.5, -h * 0.52, sx * w * 0.94, -h * 0.3);
    g.quadraticCurveTo(sx * w * 0.7, -h * 0.24, sx * w * 0.78, -h * 0.02);
    g.quadraticCurveTo(sx * w * 0.5, -h * 0.1, sx * w * 0.36, h * 0.1);
    g.quadraticCurveTo(sx * w * 0.2, -h * 0.02, 0, 0);
    g.closePath();
    g.fill();
    g.stroke();
    g.save();
    g.globalAlpha = 0.4;
    g.lineWidth = 2.6;
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(sx * w * 0.72, -h * 0.26);
    g.moveTo(0, 0);
    g.lineTo(sx * w * 0.62, -h * 0.04);
    g.stroke();
    g.restore();
    g.restore();
  }
}

function drawFace(g: CanvasRenderingContext2D, d: CritterDesign, w: number, h: number, blink: number) {
  const cy = -h * 0.6;
  const r = w * (d.eyes === 1 ? 0.27 : d.eyes === 3 ? 0.15 : 0.19);
  const xs =
    d.eyes === 1 ? [0] : d.eyes === 2 ? [-w * 0.24, w * 0.24] : [-w * 0.34, 0, w * 0.34];

  // eye sockets: a soft darker pool behind each eye grounds them in the body
  g.save();
  g.globalAlpha = 0.22;
  g.fillStyle = mix(d.shade, "#000000", 0.4);
  for (const x of xs) {
    g.beginPath();
    g.ellipse(x, cy + r * 0.1, r * 1.28, r * 1.2, 0, 0, Math.PI * 2);
    g.fill();
  }
  g.restore();

  for (const x of xs) {
    const open = 1 - blink * 0.9;
    g.beginPath();
    g.ellipse(x, cy, r, r * open, 0, 0, Math.PI * 2);
    g.fillStyle = "#fdfbff";
    g.fill();
    ink(g, 4.5);
    g.stroke();
    if (blink < 0.55) {
      // iris + slit pupil + two glints = the expressive part of the face
      g.save();
      g.beginPath();
      g.ellipse(x, cy, r, r * open, 0, 0, Math.PI * 2);
      g.clip();
      g.beginPath();
      g.arc(x + r * 0.14, cy + r * 0.12, r * 0.6, 0, Math.PI * 2);
      g.fillStyle = d.eye;
      g.fill();
      g.beginPath();
      g.ellipse(x + r * 0.14, cy + r * 0.12, r * 0.24, r * 0.42, 0, 0, Math.PI * 2);
      g.fillStyle = OUTLINE;
      g.fill();
      g.fillStyle = "rgba(255,255,255,0.95)";
      g.beginPath();
      g.arc(x - r * 0.24, cy - r * 0.3, r * 0.22, 0, Math.PI * 2);
      g.fill();
      g.globalAlpha = 0.6;
      g.beginPath();
      g.arc(x + r * 0.36, cy + r * 0.38, r * 0.11, 0, Math.PI * 2);
      g.fill();
      g.restore();
    }
  }

  // brows do most of the personality work
  if (d.brow && d.brow !== "none") {
    ink(g, r * 0.44);
    const lift = cy - r * 1.3;
    for (const x of xs) {
      const sx = x === 0 ? 1 : Math.sign(x);
      const drop = d.brow === "flat" ? 0 : r * 0.42 * (d.brow === "angry" ? 1 : -1);
      g.beginPath();
      g.moveTo(x - sx * r * 0.95, lift - drop);
      g.lineTo(x + sx * r * 0.95, lift + drop);
      g.stroke();
    }
  }

  const my = -h * 0.42;
  ink(g, 4.5);
  switch (d.mouth) {
    case "fangs": {
      // a small snarling mouth with two upper fangs
      g.beginPath();
      g.moveTo(-w * 0.26, my - h * 0.02);
      g.quadraticCurveTo(0, my + h * 0.1, w * 0.26, my - h * 0.02);
      g.quadraticCurveTo(0, my + h * 0.02, -w * 0.26, my - h * 0.02);
      g.closePath();
      g.fillStyle = "#2a0f1c";
      g.fill();
      g.stroke();
      g.save();
      g.beginPath();
      g.moveTo(-w * 0.26, my - h * 0.02);
      g.quadraticCurveTo(0, my + h * 0.1, w * 0.26, my - h * 0.02);
      g.quadraticCurveTo(0, my + h * 0.02, -w * 0.26, my - h * 0.02);
      g.closePath();
      g.clip();
      g.fillStyle = TOOTH;
      for (const sx of [-1, 1]) {
        g.beginPath();
        g.moveTo(sx * w * 0.19, my - h * 0.04);
        g.lineTo(sx * w * 0.12, my + h * 0.08);
        g.lineTo(sx * w * 0.06, my - h * 0.04);
        g.closePath();
        g.fill();
      }
      g.restore();
      break;
    }
    case "grin": {
      g.beginPath();
      g.moveTo(-w * 0.26, my - h * 0.03);
      g.quadraticCurveTo(0, my + h * 0.14, w * 0.26, my - h * 0.03);
      g.closePath();
      g.fillStyle = "#2a1020";
      g.fill();
      g.stroke();
      g.save();
      g.beginPath();
      g.moveTo(-w * 0.26, my - h * 0.03);
      g.quadraticCurveTo(0, my + h * 0.14, w * 0.26, my - h * 0.03);
      g.closePath();
      g.clip();
      g.fillStyle = TOOTH;
      for (let i = -3; i <= 3; i++) {
        g.beginPath();
        g.moveTo(i * w * 0.08 - w * 0.04, my - h * 0.04);
        g.lineTo(i * w * 0.08, my + h * 0.04);
        g.lineTo(i * w * 0.08 + w * 0.04, my - h * 0.04);
        g.closePath();
        g.fill();
      }
      g.restore();
      break;
    }
    case "smile":
      g.beginPath();
      g.moveTo(-w * 0.16, my - h * 0.02);
      g.quadraticCurveTo(0, my + h * 0.07, w * 0.16, my - h * 0.02);
      g.stroke();
      break;
    case "maw": {
      g.beginPath();
      g.ellipse(0, my + h * 0.04, w * 0.3, h * 0.13, 0, 0, Math.PI * 2);
      g.fillStyle = "#2a0f1c";
      g.fill();
      g.stroke();
      g.save();
      g.beginPath();
      g.ellipse(0, my + h * 0.04, w * 0.3, h * 0.13, 0, 0, Math.PI * 2);
      g.clip();
      // tongue
      g.fillStyle = "#c8456b";
      g.beginPath();
      g.ellipse(0, my + h * 0.15, w * 0.18, h * 0.08, 0, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = TOOTH;
      for (let i = -3; i <= 3; i++) {
        g.beginPath();
        g.moveTo(i * w * 0.1 - w * 0.05, my - h * 0.1);
        g.lineTo(i * w * 0.1, my + h * 0.03);
        g.lineTo(i * w * 0.1 + w * 0.05, my - h * 0.1);
        g.closePath();
        g.fill();
        g.beginPath();
        g.moveTo(i * w * 0.1 - w * 0.05, my + h * 0.19);
        g.lineTo(i * w * 0.1, my + h * 0.08);
        g.lineTo(i * w * 0.1 + w * 0.05, my + h * 0.19);
        g.closePath();
        g.fill();
      }
      g.restore();
      break;
    }
    default:
      break;
  }
}

function drawLegs(g: CanvasRenderingContext2D, d: CritterDesign, w: number, h: number, step: number) {
  g.lineCap = "round";
  for (const sx of [-1, 1]) {
    const swing = Math.sin(step + (sx > 0 ? Math.PI : 0)) * h * 0.09;
    const footY = Math.min(0, -swing * 0.5);
    const footX = sx * w * 0.28 + swing * 0.55;
    g.strokeStyle = OUTLINE;
    g.lineWidth = 11;
    g.beginPath();
    g.moveTo(sx * w * 0.26, -h * 0.16);
    g.quadraticCurveTo(sx * w * 0.3, -h * 0.08, footX, footY);
    g.stroke();
    g.strokeStyle = limbTone(d);
    g.lineWidth = 6.5;
    g.beginPath();
    g.moveTo(sx * w * 0.26, -h * 0.16);
    g.quadraticCurveTo(sx * w * 0.3, -h * 0.08, footX, footY);
    g.stroke();
    // foot
    g.fillStyle = limbTone(d);
    ink(g, 4);
    g.beginPath();
    g.ellipse(footX + sx * w * 0.03, footY, w * 0.14, h * 0.05, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();
    if (d.claws) {
      g.fillStyle = TOOTH;
      for (let i = -1; i <= 1; i++) {
        g.beginPath();
        g.moveTo(footX + sx * w * 0.1 + i * w * 0.035, footY - h * 0.012);
        g.lineTo(footX + sx * w * 0.17 + i * w * 0.035, footY - h * 0.005);
        g.lineTo(footX + sx * w * 0.1 + i * w * 0.035, footY + h * 0.022);
        g.closePath();
        g.fill();
      }
    }
  }
}

function drawArms(g: CanvasRenderingContext2D, d: CritterDesign, w: number, h: number, step: number) {
  if (!d.arms) return;
  for (const sx of [-1, 1]) {
    const swing = Math.sin(step + (sx > 0 ? 0 : Math.PI)) * h * 0.08;
    const hx = sx * w * 0.72;
    const hy = -h * 0.32 + swing;
    g.strokeStyle = OUTLINE;
    g.lineWidth = 10.5;
    g.beginPath();
    g.moveTo(sx * w * 0.52, -h * 0.56);
    g.quadraticCurveTo(sx * w * 0.8, -h * 0.46 + swing, hx, hy);
    g.stroke();
    g.strokeStyle = limbTone(d);
    g.lineWidth = 6;
    g.beginPath();
    g.moveTo(sx * w * 0.52, -h * 0.56);
    g.quadraticCurveTo(sx * w * 0.8, -h * 0.46 + swing, hx, hy);
    g.stroke();
    // fist
    g.fillStyle = mix(d.body, "#000000", 0.15);
    ink(g, 4);
    g.beginPath();
    g.arc(hx, hy, w * 0.1, 0, Math.PI * 2);
    g.fill();
    g.stroke();
    if (d.claws) {
      g.fillStyle = TOOTH;
      for (let i = -1; i <= 1; i++) {
        const a = Math.PI * 0.5 + i * 0.42;
        g.beginPath();
        g.moveTo(hx + Math.cos(a) * w * 0.07, hy + Math.sin(a) * w * 0.07);
        g.lineTo(hx + Math.cos(a) * w * 0.19, hy + Math.sin(a) * w * 0.19);
        g.lineTo(hx + Math.cos(a + 0.3) * w * 0.08, hy + Math.sin(a + 0.3) * w * 0.08);
        g.closePath();
        g.fill();
      }
    }
  }
}

function drawTail(g: CanvasRenderingContext2D, d: CritterDesign, w: number, h: number, step: number) {
  if (!d.tail) return;
  const sway = Math.sin(step) * h * 0.08;
  g.strokeStyle = OUTLINE;
  g.lineWidth = 12;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(-w * 0.6, -h * 0.24);
  g.quadraticCurveTo(-w * 1.3, -h * 0.24 + sway, -w * 1.16, -h * 0.66 + sway);
  g.stroke();
  g.strokeStyle = limbTone(d);
  g.lineWidth = 7;
  g.beginPath();
  g.moveTo(-w * 0.6, -h * 0.24);
  g.quadraticCurveTo(-w * 1.3, -h * 0.24 + sway, -w * 1.16, -h * 0.66 + sway);
  g.stroke();
  // spade tip
  g.fillStyle = mix(d.shade, "#ffffff", 0.2);
  ink(g, 4.5);
  g.beginPath();
  g.moveTo(-w * 1.16, -h * 0.86 + sway);
  g.lineTo(-w * 0.98, -h * 0.62 + sway);
  g.lineTo(-w * 1.34, -h * 0.62 + sway);
  g.closePath();
  g.fill();
  g.stroke();
}

function drawCritter(
  g: CanvasRenderingContext2D,
  d: CritterDesign,
  opts: { squash: number; step: number; lift: number; lean: number; blink: number },
) {
  const bulk = 0.86 + d.size * 0.16;
  const w = FRAME * 0.3 * bulk;
  const h = FRAME * 0.62 * (0.92 + d.size * 0.06);

  // ground shadow stays put while the body hops
  g.save();
  g.globalAlpha = 0.3;
  g.fillStyle = "#000";
  g.beginPath();
  g.ellipse(0, 2, w * 0.72 - opts.lift * 0.2, h * 0.07, 0, 0, Math.PI * 2);
  g.fill();
  g.restore();

  if (d.glow) {
    g.save();
    g.globalCompositeOperation = "lighter";
    const halo = g.createRadialGradient(0, -h * 0.5, 0, 0, -h * 0.5, h * 0.9);
    halo.addColorStop(0, d.glow);
    halo.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = halo;
    g.fillRect(-h, -h * 1.5, h * 2, h * 2);
    g.restore();
  }

  g.save();
  g.translate(0, -opts.lift);
  g.rotate(opts.lean);

  drawTail(g, d, w, h, opts.step);
  if (d.wings) drawWings(g, d, w, h, Math.sin(opts.step));
  drawLegs(g, d, w, h, opts.step);

  // ---- body: flat base, cel shadow, rim light, pattern, outline
  bodyPath(g, d, w, h, opts.squash);
  g.save();
  g.fillStyle = d.body;
  g.fill();
  g.clip();

  // cel shadow on the lower-right third
  g.fillStyle = d.shade;
  g.globalAlpha = 0.85;
  g.beginPath();
  g.ellipse(w * 1.32, -h * 0.3, w * 0.95, h * 0.78, -0.28, 0, Math.PI * 2);
  g.fill();
  g.globalAlpha = 0.5;
  g.beginPath();
  g.ellipse(0, h * 0.16, w * 1.1, h * 0.26, 0, 0, Math.PI * 2);
  g.fill();
  g.globalAlpha = 1;

  drawPattern(g, d, w, h);

  // top-left rim light
  g.globalAlpha = 0.3;
  g.fillStyle = "#ffffff";
  g.beginPath();
  g.ellipse(-w * 0.46, -h * 0.82, w * 0.42, h * 0.2, -0.6, 0, Math.PI * 2);
  g.fill();
  g.globalAlpha = 0.16;
  g.beginPath();
  g.ellipse(-w * 0.72, -h * 0.45, w * 0.16, h * 0.3, 0.1, 0, Math.PI * 2);
  g.fill();
  g.restore();

  bodyPath(g, d, w, h, opts.squash);
  ink(g, 6.5);
  g.stroke();

  drawCrown(g, d, w, h);
  drawArms(g, d, w, h, opts.step);
  drawFace(g, d, w, h, opts.blink);
  g.restore();
}

/* --------------------------------- strips ---------------------------------- */

function makeStrip(d: CritterDesign, anim: "idle" | "walk" | "death"): HTMLCanvasElement {
  const frames = anim === "idle" ? IDLE_FRAMES : anim === "walk" ? WALK_FRAMES : DEATH_FRAMES;
  const c = document.createElement("canvas");
  c.width = FRAME * frames;
  c.height = FRAME;
  const g = c.getContext("2d")!;
  g.lineJoin = "round";

  for (let i = 0; i < frames; i++) {
    const t = i / frames;
    g.save();
    g.translate(FRAME * i + FRAME / 2, FRAME - 12);
    if (anim === "idle") {
      const p = Math.sin(t * Math.PI * 2);
      drawCritter(g, d, {
        squash: 1 + p * 0.05,
        step: t * Math.PI * 2,
        lift: Math.max(0, p) * 4,
        lean: p * 0.03,
        blink: i === frames - 1 ? 1 : 0,
      });
    } else if (anim === "walk") {
      const p = Math.sin(t * Math.PI * 2);
      drawCritter(g, d, {
        squash: 1 - Math.abs(p) * 0.07,
        step: t * Math.PI * 2,
        lift: Math.abs(p) * 9,
        lean: p * 0.1,
        blink: 0,
      });
    } else {
      const k = i / (frames - 1);
      g.globalAlpha = Math.max(0, 1 - k * 1.05);
      g.rotate(k * 1.15);
      drawCritter(g, d, {
        squash: 1 - k * 0.55,
        step: k * 6,
        lift: Math.sin(k * Math.PI) * 12,
        lean: 0,
        blink: k > 0.25 ? 1 : 0,
      });
    }
    g.restore();
  }
  return c;
}

const urlCache = new Map<string, [string, string, string]>();

/** [idle, walk, death] data URLs for a design — generated once per session. */
export function critterSrc(d: CritterDesign): [string, string, string] {
  const hit = urlCache.get(d.key);
  if (hit) return hit;
  if (typeof document === "undefined") {
    const empty: [string, string, string] = ["", "", ""];
    return empty;
  }
  const out: [string, string, string] = [
    makeStrip(d, "idle").toDataURL(),
    makeStrip(d, "walk").toDataURL(),
    makeStrip(d, "death").toDataURL(),
  ];
  urlCache.set(d.key, out);
  return out;
}

export const CRITTER_MAP: Record<string, CritterDesign> = Object.fromEntries(
  [...CRITTER_ENEMIES, ...CRITTER_HEROES].map((d) => [d.key, d]),
);
