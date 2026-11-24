/*
 * Immaculate Lawncare brand marks, built from the Paper "Logo Refinements" page.
 * - ScriptWordmark: red hand-lettered "Immaculate" with a charcoal drop shade,
 *   a swash tail pulled from the final "e", and block LAWNCARE underneath.
 * - ScriptPatch: round stitched patch with ring text and the script in the center.
 * - StarPatch: tiny-size fallback (patch ring + red star) used for the favicon.
 * Colors come from the brand palette; fonts from next/font CSS variables.
 */
import { useId, type SVGProps } from "react";

const RED = "#D62B1F";
const INK = "#171512";
const WHITE = "#FFFFFF";
const BRIGHT_RED = "#FF6253";

const script = { fontFamily: "var(--font-yellowtail), cursive" };
const condensed = { fontFamily: "var(--font-barlow-condensed), 'Arial Narrow', sans-serif" };

const SWASH = "M610 84 C 522 132, 262 150, 56 142 C 266 160, 522 150, 622 96 Z";

function starPath(cx: number, cy: number, R: number, r = R * 0.42) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = ((-90 + i * 36) * Math.PI) / 180;
    const rad = i % 2 === 0 ? R : r;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)} ${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join(" L")} Z`;
}

type WordmarkProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** "light" = white letters for dark backgrounds. */
  tone?: "dark" | "light";
  /** Hide the LAWNCARE line (e.g. very tight spaces). */
  compact?: boolean;
  title?: string;
};

export function ScriptWordmark({ tone = "dark", compact = false, title = "Immaculate Lawncare", ...props }: WordmarkProps) {
  const letters = tone === "light" ? WHITE : RED;
  const shade = tone === "light" ? RED : INK;
  const block = tone === "light" ? WHITE : INK;
  return (
    <svg viewBox={compact ? "-6 -34 656 210" : "-6 -34 656 290"} role="img" aria-label={title} {...props}>
      <g style={script} fontSize="150">
        <text x="38" y="141" fill={shade} transform="rotate(-5 38 18)">
          Immaculate
        </text>
        <text x="32" y="135" fill={letters} transform="rotate(-5 32 12)">
          Immaculate
        </text>
      </g>
      <path d={SWASH} fill={shade} transform="translate(6 6)" />
      <path d={SWASH} fill={letters} />
      {compact ? null : (
        <text
          x="320"
          y="242"
          textAnchor="middle"
          textLength="330"
          lengthAdjust="spacing"
          fontSize="46"
          fontWeight="800"
          fill={block}
          style={condensed}
        >
          LAWNCARE
        </text>
      )}
    </svg>
  );
}

type PatchProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  variant?: "ink" | "red";
  title?: string;
};

/** Round stitched patch. Ring text uses native SVG textPath. */
export function ScriptPatch({ variant = "ink", title = "Immaculate Lawncare, veteran owned, Hampton Roads Virginia", ...props }: PatchProps) {
  const ring = variant === "red" ? RED : INK;
  const sep = variant === "red" ? WHITE : RED;
  // Unique per instance so several patches can share a page without textPath id clashes.
  const id = `patch${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={title} {...props}>
      <defs>
        {/* Top text baseline sits inside the ring band; bottom text reads upright left-to-right. */}
        <path id={`${id}-top`} d="M 20.6 100 A 79.4 79.4 0 0 1 179.4 100" />
        <path id={`${id}-bottom`} d="M 10.8 100 A 89.2 89.2 0 0 0 189.2 100" />
      </defs>
      <circle cx="100" cy="100" r="98.5" fill={ring} />
      <circle cx="100" cy="100" r="95" fill="none" stroke={WHITE} strokeWidth="1" strokeDasharray="2.6 2.2" strokeOpacity="0.85" />
      <circle cx="100" cy="100" r="74.5" fill="none" stroke={WHITE} strokeWidth="1.4" />
      <circle cx="100" cy="100" r="71" fill={WHITE} />
      <path d={starPath(15.5, 100, 4)} fill={sep} />
      <path d={starPath(184.5, 100, 4)} fill={sep} />
      <path d={starPath(100, 62, 6.5)} fill={RED} />
      <g style={condensed} fontWeight="700" fill={WHITE}>
        <text fontSize="14" letterSpacing="1.6">
          <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
            HAMPTON ROADS · VIRGINIA
          </textPath>
        </text>
        <text fontSize="13" letterSpacing="3">
          <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">
            VETERAN OWNED
          </textPath>
        </text>
      </g>
      <g transform="rotate(-7 100 108)">
        <text x="100" y="111" textAnchor="middle" fontSize="32" fill={RED} style={script}>
          Immaculate
        </text>
        <text
          x="100"
          y="126"
          textAnchor="middle"
          textLength="56"
          lengthAdjust="spacing"
          fontSize="10"
          fontWeight="800"
          fill={INK}
          style={condensed}
        >
          LAWNCARE
        </text>
      </g>
    </svg>
  );
}

/** Small-size mark: patch ring with a red star. */
export function StarPatch(props: Omit<SVGProps<SVGSVGElement>, "children">) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden {...props}>
      <circle cx="100" cy="100" r="98" fill={INK} />
      <circle cx="100" cy="100" r="74" fill={WHITE} />
      <path d={starPath(100, 104, 50)} fill={RED} />
    </svg>
  );
}

export const brandColors = { RED, INK, WHITE, BRIGHT_RED };
