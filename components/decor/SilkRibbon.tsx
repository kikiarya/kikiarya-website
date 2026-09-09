import { useId } from "react";

export type SilkRibbonProps = {
  width?: number;
  className?: string;
  flowing?: boolean;
  /** "line" is a hairline sash; "sash" is a satin band with a traveling sheen. */
  variant?: "line" | "sash";
};

const LINE =
  "M4 22C22 8 38 6 54 16c14 9 22 10 36 3 14-7 24-6 38 4 12 8 24 10 44 2";

/** One flowing sash. Sightline, not a bow. */
export default function SilkRibbon({
  width = 168,
  className = "",
  flowing = false,
  variant = "line",
}: SilkRibbonProps) {
  const uid = useId().replace(/:/g, "");

  if (variant === "sash") {
    const satin = `silk-satin-${uid}`;
    return (
        <svg
          viewBox="0 0 400 28"
          className={`block h-auto ${className}`}
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={satin} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
              <stop offset="38%" stopColor="currentColor" stopOpacity="0.5" />
              <stop offset="50%" stopColor="white" stopOpacity="0.82" />
              <stop offset="66%" stopColor="currentColor" stopOpacity="0.46" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.14" />
            </linearGradient>
          </defs>
          <path
            d="M4 16 C 70 6, 140 22, 210 14 C 270 7, 330 20, 396 12 L 396 18 C 330 26, 270 13, 210 20 C 140 28, 70 12, 4 22 Z"
            fill={`url(#${satin})`}
          />
          <path
            d="M4 16 C 70 6, 140 22, 210 14 C 270 7, 330 20, 396 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M8 17 C 72 8, 142 23, 210 15.5 C 268 9, 328 21, 390 13.5"
            fill="none"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.55"
            className={flowing ? "silk-sash-flow" : undefined}
          />
        </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 180 36"
      width={width}
      height={(width * 36) / 180}
      className={`${flowing ? "silk-flow " : ""}${className}`}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d={LINE} />
      <path d={LINE} strokeWidth="5.5" opacity="0.14" />
      <path d="M118 19c4 6 8 9 14 10" opacity="0.55" />
    </svg>
  );
}
