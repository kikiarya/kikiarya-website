export type RoseWindowProps = {
  size?: number;
  className?: string;
};

/** Twelve-fold geometric rose. Background only — keep opacity low. */
export default function RoseWindow({ size = 220, className = "" }: RoseWindowProps) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.55"
    >
      <circle cx="50" cy="50" r="47" />
      <circle cx="50" cy="50" r="31" />
      <circle cx="50" cy="50" r="14" />
      {petals.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 50 50)`}>
          <path d="M50 50L50 3" opacity="0.7" />
          <path d="M50 19C58 24 61 32 58 39C54 35 50 33 50 19Z" opacity="0.45" />
        </g>
      ))}
    </svg>
  );
}
