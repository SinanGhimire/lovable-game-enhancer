import { CRITTER_ENEMIES, type CritterEnemyKey } from "./critters";
import type { HordeStat } from "./horde-species";

/** Gameplay tuning for the hand-designed chibi horde (tier 1 fodder -> tier 5 nightmares). */
interface CritterTuning {
  tier: 1 | 2 | 3 | 4 | 5;
  radius: number;
  speed: [number, number];
  hp: number;
  score: number;
  height: number;
  damage: number;
  minWave: number;
  weight: number;
}

const TUNING: Record<CritterEnemyKey, CritterTuning> = {
  cr_mite: { tier: 1, radius: 15, speed: [112, 148], hp: 3, score: 12, height: 70, damage: 7, minWave: 1, weight: 1.9 },
  cr_sprig: { tier: 1, radius: 16, speed: [96, 128], hp: 4, score: 14, height: 74, damage: 8, minWave: 1, weight: 1.8 },
  cr_ember: { tier: 1, radius: 17, speed: [128, 168], hp: 4, score: 16, height: 78, damage: 9, minWave: 1, weight: 1.6 },
  cr_frost: { tier: 2, radius: 17, speed: [104, 138], hp: 6, score: 22, height: 78, damage: 10, minWave: 2, weight: 1.5 },
  cr_husk: { tier: 2, radius: 18, speed: [82, 110], hp: 8, score: 26, height: 86, damage: 12, minWave: 2, weight: 1.5 },
  cr_gaze: { tier: 2, radius: 18, speed: [118, 152], hp: 6, score: 26, height: 80, damage: 11, minWave: 2, weight: 1.3 },
  cr_venom: { tier: 3, radius: 20, speed: [126, 164], hp: 9, score: 34, height: 84, damage: 13, minWave: 3, weight: 1.3 },
  cr_shade: { tier: 3, radius: 18, speed: [140, 182], hp: 7, score: 36, height: 82, damage: 12, minWave: 3, weight: 1.2 },
  cr_rust: { tier: 3, radius: 21, speed: [92, 124], hp: 12, score: 38, height: 90, damage: 14, minWave: 3, weight: 1.2 },
  cr_bloom: { tier: 3, radius: 20, speed: [100, 132], hp: 11, score: 38, height: 88, damage: 14, minWave: 4, weight: 1.1 },
  cr_grub: { tier: 4, radius: 23, speed: [86, 116], hp: 17, score: 54, height: 94, damage: 16, minWave: 4, weight: 1.1 },
  cr_brute: { tier: 4, radius: 26, speed: [74, 100], hp: 22, score: 66, height: 104, damage: 19, minWave: 5, weight: 1 },
  cr_warden: { tier: 4, radius: 25, speed: [88, 118], hp: 20, score: 70, height: 106, damage: 18, minWave: 5, weight: 1 },
  cr_titan: { tier: 5, radius: 29, speed: [66, 92], hp: 34, score: 110, height: 118, damage: 23, minWave: 6, weight: 0.9 },
  cr_dread: { tier: 5, radius: 30, speed: [78, 104], hp: 38, score: 130, height: 122, damage: 25, minWave: 7, weight: 0.85 },
  cr_omen: { tier: 5, radius: 28, speed: [96, 126], hp: 42, score: 150, height: 124, damage: 27, minWave: 8, weight: 0.8 },
};

export const CRITTER_KEYS = CRITTER_ENEMIES.map((d) => d.key) as CritterEnemyKey[];

export const CRITTER_NAME: Record<CritterEnemyKey, string> = Object.fromEntries(
  CRITTER_ENEMIES.map((d) => [d.key, d.name]),
) as Record<CritterEnemyKey, string>;

export const CRITTER_TIER: Record<CritterEnemyKey, number> = Object.fromEntries(
  CRITTER_KEYS.map((k) => [k, TUNING[k].tier]),
) as Record<CritterEnemyKey, number>;

export const CRITTER_STATS: Record<CritterEnemyKey, HordeStat> = Object.fromEntries(
  CRITTER_ENEMIES.map((d) => {
    const t = TUNING[d.key as CritterEnemyKey];
    return [
      d.key,
      {
        sprite: d.key as CritterEnemyKey,
        radius: t.radius,
        speed: t.speed,
        hp: t.hp,
        score: t.score,
        height: t.height,
        color: d.body,
        damage: t.damage,
        minWave: t.minWave,
        weight: t.weight,
      } satisfies HordeStat,
    ];
  }),
) as Record<CritterEnemyKey, HordeStat>;
