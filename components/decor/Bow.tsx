export type BowProps = {
  size?: number;
  className?: string;
  /** "line" is thin outline; "soft" adds a translucent fill inside the loops. */
  variant?: "line" | "soft";
  strokeWidth?: number;
};

/**
 * Coquette ribbon bow. Inherits `currentColor`, so set the colour on a parent
 * (e.g. `text-[var(--sakura-accent)]`). Decorative — never announced.
 */
export default function Bow({
  size = 64,
  className = "",
  variant = "line",
  strokeWidth = 1.6,
}: BowProps) {
  const fill = variant === "soft" ? "currentColor" : "none";

  return (
    <svg
      viewBox="0 0 100 72"
      width={size}
      height={(size * 72) / 100}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Trailing tails, drawn first so the loops overlap them */}
      <path d="M47 37C44 47 38 56 30 64c4 0 8-1 11-3 5-7 8-15 9-23" />
      <path d="M53 37c3 10 9 19 17 27-4 0-8-1-11-3-5-7-8-15-9-23" />

      {/* Loops */}
      <path
        d="M50 32C44 20 30 12 20 14 10 16 8 26 14 31c6 5 22 6 36 3z"
        fill={fill}
        fillOpacity={variant === "soft" ? 0.14 : undefined}
      />
      <path
        d="M50 32c6-12 20-20 30-18 10 2 12 12 6 17-6 5-22 6-36 3z"
        fill={fill}
        fillOpacity={variant === "soft" ? 0.14 : undefined}
      />

      {/* Centre knot */}
      <ellipse
        cx="50"
        cy="33"
        rx="6.5"
        ry="5.2"
        fill={fill}
        fillOpacity={variant === "soft" ? 0.22 : undefined}
      />
    </svg>
  );
}
