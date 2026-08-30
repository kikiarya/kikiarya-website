export type FloralSprigProps = {
  size?: number;
  className?: string;
  /** Mirror horizontally, for framing a heading from both sides. */
  flip?: boolean;
  strokeWidth?: number;
};

/** Thin sakura sprig: one stem, three blossoms, two leaves. */
export default function FloralSprig({
  size = 72,
  className = "",
  flip = false,
  strokeWidth = 1.3,
}: FloralSprigProps) {
  return (
    <svg
      viewBox="0 0 80 48"
      width={size}
      height={(size * 48) / 80}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* Stem */}
      <path d="M2 40C16 38 32 32 46 22 56 15 64 11 74 9" />

      {/* Leaves */}
      <path d="M20 37c4-5 9-7 14-6-3 5-8 7-14 6z" />
      <path d="M40 26c2-6 6-9 11-9-1 6-5 9-11 9z" />

      {/* Blossoms — five petals each, drawn as a rosette */}
      <g>
        <circle cx="68" cy="12" r="3.4" />
        <circle cx="74" cy="7" r="4.2" />
        <circle cx="63" cy="6" r="2.6" />
      </g>
      <circle cx="74" cy="7" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="68" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
