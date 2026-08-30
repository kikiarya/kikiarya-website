export type SparkleProps = {
  size?: number;
  className?: string;
  /** Four-point star reads sweeter; six-point reads more celestial. */
  points?: 4 | 6;
  filled?: boolean;
  strokeWidth?: number;
};

/** Four- or six-point sparkle. Pairs with `Bow` for scattered accents. */
export default function Sparkle({
  size = 18,
  className = "",
  points = 4,
  filled = true,
  strokeWidth = 1.4,
}: SparkleProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 1.5c.7 5.2 1.6 6.1 6.8 6.8-5.2.7-6.1 1.6-6.8 6.8-.7-5.2-1.6-6.1-6.8-6.8 5.2-.7 6.1-1.6 6.8-6.8z" />
      {points === 6 ? (
        <path d="M18.6 15.4c.3 2.3.7 2.7 3 3-2.3.3-2.7.7-3 3-.3-2.3-.7-2.7-3-3 2.3-.3 2.7-.7 3-3z" />
      ) : null}
    </svg>
  );
}
