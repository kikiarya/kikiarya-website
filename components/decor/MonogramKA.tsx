export type MonogramKAProps = {
  size?: number;
  className?: string;
  /** "line" is the bookplate mark; "seal" is denser, for wax. Same drawing. */
  variant?: "line" | "seal";
};

/**
 * KA ligature. One drawing everywhere — Hero bookplate, Cover whisper, seals.
 * Inherits `currentColor`. Decorative unless a parent names it.
 */
export default function MonogramKA({
  size = 72,
  className = "",
  variant = "line",
}: MonogramKAProps) {
  const heavy = variant === "seal";

  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={heavy ? 1.7 : 1.35}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Quiet ring — present so the mark reads as a plate, not loose letters */}
      <circle cx="40" cy="40" r="36.5" opacity={heavy ? 0.55 : 0.28} />
      <circle cx="40" cy="40" r="33.5" opacity={0.12} />

      {/* K stem + arms */}
      <path d="M24 18.5V61.5" />
      <path d="M24 39.5L48 19" />
      <path d="M32.5 39.5L50 61" />

      {/* A, sharing the K's lower arm as a crossbar suggestion */}
      <path d="M41 61.5L56.5 19.5L71 61.5" />
      <path d="M47.2 46.2H65.2" />

      {/* Small flourish at the join — not a bow */}
      <path d="M38 16.5C40.5 14 44 14.5 45.5 17" opacity={0.7} />
    </svg>
  );
}
