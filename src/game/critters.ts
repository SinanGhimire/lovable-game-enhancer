/**
 * Procedural chibi creature art.
 *
 * Every creature here is drawn at runtime on a canvas in the thick-outlined,
 * flat-colour chibi style of the home-screen cast — no imported sprite packs.
 * Each design produces the same three strips the engine expects:
 * idle (6 frames), walk (8 frames), death (10 frames).
 */

export type CritterShape = "blob" | "egg" | "round" | "wide" | "tall";
export type CritterCrown = "none" | "horns" | "ears" | "antenna" | "spikes" | "crown" | "fin";
export type CritterMouth = "none" | "fangs" | "grin" | "smile" | "maw";

export type CritterEnemyKey =
  | "cr_mite" | "cr_sprig" | "cr_ember" | "cr_frost" | "cr_husk" | "cr_gaze"
  | "cr_venom" | "cr_shade" | "cr_rust" | "cr_bloom" | "cr_grub" | "cr_brute"
  | "cr_warden" | "cr_titan" | "cr_dread" | "cr_omen";

export type CritterHeroKey = "templar" | "reaper" | "oracle" | "seraph" | "warchief" | "sprout";

export interface CritterDesign {
  key: CritterEnemyKey | CritterHeroKey;
  name: string;
  body: string;
  shade: string;
  eye: string;
  shape: CritterShape;
  crown: CritterCrown;
  mouth: CritterMouth;
  eyes: 1 | 2 | 3;
  arms: boolean;
  tail: boolean;
  size: number;
}

const OUTLINE = "#15111c";
const LIMB = "#1b1622";

export const FRAME = 112;
export const IDLE_FRAMES = 6;
export const WALK_FRAMES = 8;
export const DEATH_FRAMES = 10;

/* ------------------------------- the roster -------------------------------- */

export const CRITTER_ENEMIES: CritterDesign[] = [
  { key: "cr_mite", name: "Gloom Mite", body: "#b478e8", shade: "#8a4fc7", eye: "#ffd9f4", shape: "blob", crown: "horns", mouth: "fangs", eyes: 2, arms: true, tail: false, size: 0.82 },
  { key: "cr_sprig", name: "Bog Sprig", body: "#8ed24f", shade: "#5f9c2c", eye: "#f4ffd9", shape: "egg", crown: "ears", mouth: "grin", eyes: 2, arms: true, tail: true, size: 0.85 },
  { key: "cr_ember", name: "Ember Pup", body: "#ff7a52", shade: "#c94a2b", eye: "#fff0d0", shape: "round", crown: "horns", mouth: "fangs", eyes: 2, arms: true, tail: true, size: 0.9 },
  { key: "cr_frost", name: "Frost Nib", body: "#6fd8f0", shade: "#3a9cbc", eye: "#eafcff", shape: "blob", crown: "spikes", mouth: "smile", eyes: 2, arms: true, tail: false, size: 0.88 },
  { key: "cr_husk", name: "Ash Husk", body: "#9aa2b8", shade: "#666e86", eye: "#ffe9a8", shape: "tall", crown: "none", mouth: "maw", eyes: 2, arms: true, tail: false, size: 0.95 },
  { key: "cr_gaze", name: "Gazer", body: "#f0dd63", shade: "#c1a72c", eye: "#3a2a10", shape: "round", crown: "antenna", mouth: "none", eyes: 1, arms: true, tail: false, size: 0.9 },
  { key: "cr_venom", name: "Venom Tick", body: "#57d9a3", shade: "#2c9a6d", eye: "#0e2b20", shape: "wide", crown: "spikes", mouth: "fangs", eyes: 3, arms: true, tail: true, size: 0.95 },
  { key: "cr_shade", name: "Shade Wisp", body: "#7a6ce0", shade: "#4a3fa5", eye: "#e6e0ff", shape: "egg", crown: "fin", mouth: "grin", eyes: 2, arms: false, tail: true, size: 0.95 },
  { key: "cr_rust", name: "Rustling", body: "#d98a3c", shade: "#a15c18", eye: "#fff2d8", shape: "blob", crown: "horns", mouth: "maw", eyes: 2, arms: true, tail: false, size: 1 },
  { key: "cr_bloom", name: "Rot Bloom", body: "#e86fa8", shade: "#b2417a", eye: "#fff0f7", shape: "round", crown: "crown", mouth: "smile", eyes: 2, arms: true, tail: false, size: 1 },
  { key: "cr_grub", name: "Deep Grub", body: "#c3d9e8", shade: "#8ea5b8", eye: "#2b1a2e", shape: "wide", crown: "ears", mouth: "fangs", eyes: 3, arms: true, tail: true, size: 1.05 },
  { key: "cr_brute", name: "Slag Brute", body: "#6b7be8", shade: "#3d49a8", eye: "#e8f0ff", shape: "wide", crown: "horns", mouth: "maw", eyes: 2, arms: true, tail: false, size: 1.2 },
  { key: "cr_warden", name: "Warden Sac", body: "#a34fd9", shade: "#6d2a9c", eye: "#ffe6ff", shape: "tall", crown: "crown", mouth: "fangs", eyes: 3, arms: true, tail: true, size: 1.22 },
  { key: "cr_titan", name: "Mire Titan", body: "#3fbf8f", shade: "#1f7f5d", eye: "#fdffe0", shape: "tall", crown: "spikes", mouth: "maw", eyes: 2, arms: true, tail: true, size: 1.35 },
  { key: "cr_dread", name: "Dread Maw", body: "#e0483f", shade: "#9c241f", eye: "#ffe0c8", shape: "wide", crown: "horns", mouth: "maw", eyes: 3, arms: true, tail: true, size: 1.4 },
  { key: "cr_omen", name: "Pale Omen", body: "#f2f0ea", shade: "#b9b4ab", eye: "#5a1d3a", shape: "tall", crown: "fin", mouth: "grin", eyes: 2, arms: true, tail: false, size: 1.45 },
];

export const CRITTER_HEROES: CritterDesign[] = [
  { key: "templar", name: "Templar", body: "#e8e2d2", shade: "#b0a893", eye: "#3a6fd0", shape: "egg", crown: "crown", mouth: "smile", eyes: 2, arms: true, tail: false, size: 0.95 },
  { key: "reaper", name: "Reaper", body: "#4c4a63", shade: "#2c2a3d", eye: "#8bf7c8", shape: "tall", crown: "fin", mouth: "grin", eyes: 2, arms: true, tail: true, size: 1 },
  { key: "oracle", name: "Oracle", body: "#8f6ce0", shade: "#5b3ea8", eye: "#ffe9a8", shape: "egg", crown: "antenna", mouth: "smile", eyes: 1, arms: true, tail: false, size: 0.95 },
  { key: "seraph", name: "Seraph", body: "#ffd98a", shade: "#d3a94f", eye: "#5a3a10", shape: "round", crown: "crown", mouth: "smile", eyes: 2, arms: true, tail: false, size: 0.95 },
  { key: "warchief", name: "Warchief", body: "#6fbf5a", shade: "#3f8c30", eye: "#ffeecb", shape: "wide", crown: "horns", mouth: "fangs", eyes: 2, arms: true, tail: false, size: 1.05 },
  { key: "sprout", name: "Sprout", body: "#a8e86f", shade: "#6fae38", eye: "#26401a", shape: "blob", crown: "ears", mouth: "grin", eyes: 2, arms: true, tail: true, size: 0.82 },
];

/* -------------------------------- drawing ---------------------------------- */

function bodyPath(g: CanvasRenderingContext2D, d: CritterDesign, w: number, h: number, squash: number) {
  const bw = w * (1 + (1 - squash) * 0.35);
  const bh = h * squash;
  g.beginPath();
  switch (d.shape) {
    case "egg":
      g.ellipse(0, -bh * 0.5, bw * 0.44, bh * 0.5, 0, 0, Math.PI * 2);
      break;
    case "round":
      g.ellipse(0, -bh * 0.48, bw * 0.5, bh * 0.48, 0, 0, Math.PI * 2);
      break;
    case "wide":
      g.ellipse(0, -bh * 0.46, bw * 0.58, bh * 0.46, 0, 0, Math.PI * 2);
      break;
    case "tall":
      g.ellipse(0, -bh * 0.52, bw * 0.42, bh * 0.55, 0, 0, Math.PI * 2);
      break;
    default: {
      // blob: rounded body with a slightly heavier bottom
      g.moveTo(-bw * 0.5, -bh * 0.34);
      g.bezierCurveTo(-bw * 0.56, -bh * 0.95, bw * 0.56, -bh * 0.95, bw * 0.5, -bh * 0.34);
      g.bezierCurveTo(bw * 0.52, -bh * 0.02, -bw * 0.52, -bh * 0.02, -bw * 0.5, -bh * 0.34);
      break;
    }
  }
  g.closePath();
}

function drawCrown(g: CanvasRenderingContext2D, d: CritterDesign, w: number, h: number) {
  const top = -h * 0.86;
  g.fillStyle = d.body;
  g.strokeStyle = OUTLINE;
  g.lineWidth = 5;
  const horn = (sx: number) => {
    g.beginPath();
    g.moveTo(sx * w * 0.3, top + h * 0.1);
    g.quadraticCurveTo(sx * w * 0.62, top - h * 0.02, sx * w * 0.44, top - h * 0.24);
    g.quadraticCurveTo(sx * w * 0.26, top - h * 0.04, sx * w * 0.16, top + h * 0.08);
    g.closePath();
    g.fill();
    g.stroke();
  };
  switch (d.crown) {
    case "horns":
      horn(-1);
      horn(1);
      break;
    case "ears":
      for (const sx of [-1, 1]) {
        g.beginPath();
        g.ellipse(sx * w * 0.34, top - h * 0.04, w * 0.11, h * 0.16, sx * 0.4, 0, Math.PI * 2);
        g.fill();
        g.stroke();
      }
      break;
    case "antenna":
      g.beginPath();
      g.moveTo(0, top + h * 0.06);
      g.quadraticCurveTo(w * 0.1, top - h * 0.2, w * 0.02, top - h * 0.3);
      g.stroke();
      g.beginPath();
      g.arc(w * 0.02, top - h * 0.34, w * 0.09, 0, Math.PI * 2);
      g.fillStyle = d.eye;
      g.fill();
      g.stroke();
      break;
    case "spikes":
      for (let i = -2; i <= 2; i++) {
        g.beginPath();
        g.moveTo(i * w * 0.16 - w * 0.07, top + h * 0.08);
        g.lineTo(i * w * 0.16, top - h * 0.16);
        g.lineTo(i * w * 0.16 + w * 0.07, top + h * 0.08);
        g.closePath();
        g.fillStyle = d.shade;
        g.fill();
        g.stroke();
      }
      break;
    case "crown":
      g.beginPath();
      g.moveTo(-w * 0.28, top + h * 0.04);
      g.lineTo(-w * 0.3, top - h * 0.2);
      g.lineTo(-w * 0.12, top - h * 0.06);
      g.lineTo(0, top - h * 0.26);
      g.lineTo(w * 0.12, top - h * 0.06);
      g.lineTo(w * 0.3, top - h * 0.2);
      g.lineTo(w * 0.28, top + h * 0.04);
      g.closePath();
      g.fillStyle = "#ffd45e";
      g.fill();
      g.stroke();
      break;
    case "fin":
      g.beginPath();
      g.moveTo(-w * 0.06, top + h * 0.1);
      g.quadraticCurveTo(0, top - h * 0.34, w * 0.16, top - h * 0.08);
      g.quadraticCurveTo(w * 0.06, top + h * 0.06, -w * 0.06, top + h * 0.1);
      g.closePath();
      g.fillStyle = d.shade;
      g.fill();
      g.stroke();
      break;
    default:
      break;
  }
}

function drawFace(g: CanvasRenderingContext2D, d: CritterDesign, w: number, h: number, blink: number) {
  const cy = -h * 0.55;
  const r = w * (d.eyes === 1 ? 0.2 : 0.13);
  const xs = d.eyes === 1 ? [0] : d.eyes === 2 ? [-w * 0.17, w * 0.17] : [-w * 0.24, 0, w * 0.24];
  for (const x of xs) {
    g.beginPath();
    g.ellipse(x, cy, r, r * (1 - blink * 0.85), 0, 0, Math.PI * 2);
    g.fillStyle = "#fdfbff";
    g.fill();
    g.lineWidth = 4;
    g.strokeStyle = OUTLINE;
    g.stroke();
    if (blink < 0.6) {
      g.beginPath();
      g.arc(x + r * 0.16, cy + r * 0.1, r * 0.44, 0, Math.PI * 2);
      g.fillStyle = d.eye;
      g.fill();
      g.beginPath();
      g.arc(x + r * 0.16, cy + r * 0.1, r * 0.2, 0, Math.PI * 2);
      g.fillStyle = OUTLINE;
      g.fill();
    }
  }

  const my = -h * 0.3;
  g.lineWidth = 4;
  g.strokeStyle = OUTLINE;
  switch (d.mouth) {
    case "fangs":
      g.beginPath();
      g.moveTo(-w * 0.16, my);
      g.lineTo(w * 0.16, my);
      g.stroke();
      for (const sx of [-1, 1]) {
        g.beginPath();
        g.moveTo(sx * w * 0.1, my);
        g.lineTo(sx * w * 0.14, my + h * 0.08);
        g.lineTo(sx * w * 0.03, my);
        g.closePath();
        g.fillStyle = "#fdfbff";
        g.fill();
        g.stroke();
      }
      break;
    case "grin":
      g.beginPath();
      g.arc(0, my - h * 0.03, w * 0.18, 0.15 * Math.PI, 0.85 * Math.PI);
      g.stroke();
      break;
    case "smile":
      g.beginPath();
      g.arc(0, my - h * 0.02, w * 0.12, 0.15 * Math.PI, 0.85 * Math.PI);
      g.stroke();
      break;
    case "maw":
      g.beginPath();
      g.ellipse(0, my + h * 0.02, w * 0.2, h * 0.09, 0, 0, Math.PI * 2);
      g.fillStyle = "#2a1020";
      g.fill();
      g.stroke();
      g.beginPath();
      g.moveTo(-w * 0.14, my - h * 0.05);
      g.lineTo(-w * 0.08, my + h * 0.03);
      g.lineTo(-w * 0.02, my - h * 0.05);
      g.lineTo(w * 0.04, my + h * 0.03);
      g.lineTo(w * 0.12, my - h * 0.05);
      g.closePath();
      g.fillStyle = "#fdfbff";
      g.fill();
      break;
    default:
      break;
  }
}

function drawLimbs(
  g: CanvasRenderingContext2D,
  d: CritterDesign,
  w: number,
  h: number,
  step: number,
  lift: number,
) {
  g.strokeStyle = LIMB;
  g.lineCap = "round";

  // legs
  g.lineWidth = 9;
  for (const sx of [-1, 1]) {
    const swing = Math.sin(step + (sx > 0 ? Math.PI : 0)) * h * 0.1;
    g.beginPath();
    g.moveTo(sx * w * 0.2, -h * 0.1 - lift);
    g.lineTo(sx * w * 0.2 + swing * 0.5, -lift + Math.min(0, -swing * 0.4));
    g.stroke();
    g.beginPath();
    g.ellipse(sx * w * 0.2 + swing * 0.6, -lift + Math.min(0, -swing * 0.4), w * 0.09, h * 0.035, 0, 0, Math.PI * 2);
    g.fillStyle = LIMB;
    g.fill();
  }

  // arms
  if (d.arms) {
    g.lineWidth = 8;
    for (const sx of [-1, 1]) {
      const swing = Math.sin(step + (sx > 0 ? 0 : Math.PI)) * h * 0.07;
      g.beginPath();
      g.moveTo(sx * w * 0.42, -h * 0.5);
      g.quadraticCurveTo(sx * w * 0.56, -h * 0.42 + swing, sx * w * 0.52, -h * 0.28 + swing);
      g.stroke();
    }
  }

  if (d.tail) {
    g.lineWidth = 7;
    g.beginPath();
    g.moveTo(-w * 0.42, -h * 0.24);
    g.quadraticCurveTo(-w * 0.68, -h * 0.24 + Math.sin(step) * h * 0.05, -w * 0.62, -h * 0.44);
    g.stroke();
  }
}

function drawCritter(
  g: CanvasRenderingContext2D,
  d: CritterDesign,
  opts: { squash: number; step: number; lift: number; lean: number; blink: number },
) {
  const w = FRAME * 0.46 * d.size;
  const h = FRAME * 0.5 * d.size;

  g.save();
  g.translate(0, -opts.lift);
  g.rotate(opts.lean);

  // ground shadow (drawn un-rotated, below)
  g.save();
  g.rotate(-opts.lean);
  g.globalAlpha = 0.28;
  g.fillStyle = "#000";
  g.beginPath();
  g.ellipse(0, opts.lift * 0.9 + 2, w * 0.46, h * 0.08, 0, 0, Math.PI * 2);
  g.fill();
  g.globalAlpha = 1;
  g.restore();

  drawLimbs(g, d, w, h, opts.step, 0);
  drawCrown(g, d, w, h);

  bodyPath(g, d, w, h, opts.squash);
  const grad = g.createLinearGradient(0, -h, 0, 0);
  grad.addColorStop(0, d.body);
  grad.addColorStop(1, d.shade);
  g.fillStyle = grad;
  g.fill();
  g.lineWidth = 6;
  g.strokeStyle = OUTLINE;
  g.stroke();

  // belly highlight
  g.save();
  g.globalAlpha = 0.18;
  g.beginPath();
  g.ellipse(-w * 0.16, -h * 0.62, w * 0.14, h * 0.16, -0.5, 0, Math.PI * 2);
  g.fillStyle = "#fff";
  g.fill();
  g.restore();

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
    g.translate(FRAME * i + FRAME / 2, FRAME - 10);
    if (anim === "idle") {
      const p = Math.sin(t * Math.PI * 2);
      drawCritter(g, d, {
        squash: 1 + p * 0.05,
        step: t * Math.PI * 2,
        lift: Math.max(0, p) * 3,
        lean: p * 0.03,
        blink: i === frames - 1 ? 1 : 0,
      });
    } else if (anim === "walk") {
      const p = Math.sin(t * Math.PI * 2);
      drawCritter(g, d, {
        squash: 1 - Math.abs(p) * 0.06,
        step: t * Math.PI * 2,
        lift: Math.abs(p) * 7,
        lean: p * 0.09,
        blink: 0,
      });
    } else {
      const k = i / (frames - 1);
      g.globalAlpha = Math.max(0, 1 - k * 1.05);
      g.rotate(k * 1.1);
      drawCritter(g, d, {
        squash: 1 - k * 0.55,
        step: k * 6,
        lift: Math.sin(k * Math.PI) * 10,
        lean: 0,
        blink: k > 0.3 ? 1 : 0,
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
