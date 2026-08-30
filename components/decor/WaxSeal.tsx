import MonogramKA from "./MonogramKA";

export type WaxSealProps = {
  /** Outer diameter in px. Resume ~88, Contact ~64. Same stamp, two sizes. */
  size?: number;
  className?: string;
};

/**
 * The only seal on the site. Do not invent a second stamp.
 * Resume download + Contact — both render this component.
 */
export default function WaxSeal({ size = 72, className = "" }: WaxSealProps) {
  const inner = size * 0.62;

  return (
    <span
      className={`relative inline-flex items-center justify-center text-[var(--sakura-accent-deep)] ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="absolute inset-0"
        fill="none"
      >
        <circle cx="50" cy="50" r="48" fill="var(--sakura-accent-deep)" opacity="0.88" />
        <circle
          cx="50"
          cy="50"
          r="43"
          stroke="rgba(255,247,248,.45)"
          strokeWidth="1.2"
          strokeDasharray="2.2 3.4"
        />
        <circle cx="50" cy="50" r="38.5" stroke="rgba(255,247,248,.22)" strokeWidth="0.8" />
      </svg>
      <MonogramKA
        variant="seal"
        size={inner}
        className="relative z-10 text-[rgba(255,247,248,.92)]"
      />
    </span>
  );
}
