export type EnvelopeMarkProps = {
  width?: number;
  className?: string;
};

/** Line envelope — a correspondence mark, not a photo template. */
export default function EnvelopeMark({ width = 88, className = "" }: EnvelopeMarkProps) {
  return (
    <svg
      viewBox="0 0 96 64"
      width={width}
      height={(width * 64) / 96}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    >
      <rect x="4" y="10" width="88" height="48" rx="3" />
      <path d="M4 14L48 40L92 14" />
      <path d="M4 58L36 34" opacity="0.45" />
      <path d="M92 58L60 34" opacity="0.45" />
    </svg>
  );
}
