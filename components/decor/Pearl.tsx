export type PearlProps = {
  size?: number;
  className?: string;
};

export default function Pearl({ size = 7, className = "" }: PearlProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="6" cy="6" r="4.6" fill="currentColor" opacity="0.35" />
      <circle cx="6" cy="6" r="4.6" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="4.6" cy="4.4" r="1.1" fill="currentColor" opacity="0.45" />
    </svg>
  );
}
