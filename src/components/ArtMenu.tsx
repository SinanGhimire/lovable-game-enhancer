import { Settings, Volume2, VolumeX } from "lucide-react";
import menuArt from "@/assets/echo-menu-art-v2.png";
import type { RunMode } from "@/game/types";

export type ArtTarget =
  | { kind: "play" }
  | { kind: "tab"; tab: "character" | "weapons" | "upgrades" | "echoes" | "collection" }
  | { kind: "modal"; modal: string };

interface Hotspot {
  id: string;
  label: string;
  /** percentages of the artwork box */
  x: number;
  y: number;
  w: number;
  h: number;
  radius?: string;
  target: ArtTarget | { kind: "mode"; mode: RunMode };
}

// Pixel-measured against the 1376 × 768 artwork. These rectangles hug the
// illustrated controls themselves instead of the nearby characters/background.
const HOTSPOTS: Hotspot[] = [
  // left rail
  { id: "shop", label: "Shop", x: 2.18, y: 3.65, w: 7.05, h: 15.76, radius: "22%", target: { kind: "modal", modal: "shop" } },
  { id: "missions", label: "Missions", x: 2.11, y: 23.05, w: 7.85, h: 16.93, radius: "22%", target: { kind: "modal", modal: "missions" } },
  { id: "achievements", label: "Achievements", x: 1.96, y: 42.97, w: 7.63, h: 16.28, radius: "22%", target: { kind: "modal", modal: "achievements" } },

  // right rail
  { id: "daily", label: "Daily Rewards", x: 90.55, y: 2.47, w: 8.28, h: 18.36, radius: "22%", target: { kind: "modal", modal: "gift" } },
  { id: "starter", label: "Starter Pack", x: 90.41, y: 22.4, w: 8.07, h: 19.14, radius: "22%", target: { kind: "modal", modal: "starter" } },
  { id: "current", label: "Current Run", x: 90.19, y: 42.84, w: 8.5, h: 18.75, radius: "22%", target: { kind: "modal", modal: "leaderboard" } },

  // play
  { id: "play", label: "Play", x: 36.77, y: 79.3, w: 26.6, h: 15.5, radius: "9999px", target: { kind: "play" } },

  // bottom left tabs
  { id: "character", label: "Character", x: 1.96, y: 84.12, w: 8.14, h: 14.45, radius: "20%", target: { kind: "tab", tab: "character" } },
  { id: "weapons", label: "Weapons", x: 10.97, y: 84.12, w: 8.36, h: 14.45, radius: "20%", target: { kind: "tab", tab: "weapons" } },
  { id: "upgrades", label: "Upgrades", x: 20.42, y: 84.12, w: 8.29, h: 14.45, radius: "20%", target: { kind: "tab", tab: "upgrades" } },

  // bottom right tabs
  { id: "upgrades-2", label: "Upgrades", x: 71.88, y: 84.12, w: 8.29, h: 14.45, radius: "20%", target: { kind: "tab", tab: "upgrades" } },
  { id: "echoes", label: "Echoes", x: 81.25, y: 84.12, w: 7.34, h: 14.45, radius: "20%", target: { kind: "tab", tab: "echoes" } },
  { id: "collection", label: "Collection", x: 89.75, y: 84.12, w: 9.08, h: 14.45, radius: "20%", target: { kind: "tab", tab: "collection" } },
];




export function ArtMenu({
  mode,
  onMode,
  onOpen,
  onPlay,
  muted,
  onToggleMute,
  ready,
}: {
  mode: RunMode;
  onMode: (m: RunMode) => void;
  onOpen: (t: ArtTarget) => void;
  onPlay: () => void;
  muted: boolean;
  onToggleMute: () => void;
  ready: boolean;
}) {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0b0714] p-0 sm:p-3">
      <h1 className="sr-only">Echo — main menu</h1>

      {/* wrapper keeps the artwork's exact aspect ratio; hitboxes are % based */}
      <div
        className="relative w-full max-w-[1376px] select-none"
        style={{ aspectRatio: "1376 / 768" }}
      >
        <img
          src={menuArt}
          alt="Echo main menu artwork"
          className="pointer-events-none absolute inset-0 h-full w-full object-contain"
          draggable={false}
        />

        {HOTSPOTS.map((h) => {
          const isMode = h.target.kind === "mode";
          const active = isMode && (h.target as { mode: RunMode }).mode === mode;
          return (
            <button
              key={h.id}
              type="button"
              aria-label={h.label}
              aria-pressed={isMode ? active : undefined}
              disabled={h.id === "play" && !ready}
              onClick={() => {
                if (h.target.kind === "mode") onMode((h.target as { mode: RunMode }).mode);
                else if (h.target.kind === "play") onPlay();
                else onOpen(h.target as ArtTarget);
              }}
              className="absolute cursor-pointer bg-transparent transition-[filter,transform] duration-100 hover:scale-[1.025] hover:brightness-125 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 disabled:cursor-wait"
              style={{
                left: `${h.x}%`,
                top: `${h.y}%`,
                width: `${h.w}%`,
                height: `${h.h}%`,
                borderRadius: h.radius ?? "12%",
                boxShadow: active ? "0 0 0 3px rgba(255,214,102,0.9) inset" : undefined,
              }}
            />
          );
        })}

        {/* mode chips: not drawn in this artwork, rendered just above PLAY */}
        <div className="absolute left-1/2 top-[71%] flex -translate-x-1/2 items-center gap-1.5 sm:gap-2">
          {([
            ["survival", "Survival"],
            ["endless", "Endless"],
            ["boss", "Boss Rush"],
          ] as [RunMode, string][]).map(([m, label]) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => onMode(m)}
              className={`rounded-full border-2 border-black/70 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:px-4 sm:py-1.5 sm:text-xs ${
                mode === m ? "bg-amber-500" : "bg-[#3c3560]/90"
              }`}
            >
              {label}
            </button>
          ))}
        </div>


        {/* settings + sound: styled to match the illustrated rail icons */}
        <div className="absolute left-[11.5%] top-[3.5%] flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Settings"
            onClick={() => onOpen({ kind: "modal", modal: "settings" })}
            className="art-icon grid h-10 w-10 place-items-center sm:h-14 sm:w-14"
          >
            <Settings className="h-5 w-5 text-ink sm:h-7 sm:w-7" strokeWidth={2.75} />
          </button>
          <button
            type="button"
            aria-label={muted ? "Unmute sound" : "Mute sound"}
            onClick={onToggleMute}
            className="art-icon grid h-10 w-10 place-items-center sm:h-14 sm:w-14"
          >
            {muted ? (
              <VolumeX className="h-5 w-5 text-ink sm:h-7 sm:w-7" strokeWidth={2.75} />
            ) : (
              <Volume2 className="h-5 w-5 text-ink sm:h-7 sm:w-7" strokeWidth={2.75} />
            )}
          </button>
        </div>

      </div>
    </main>
  );
}
