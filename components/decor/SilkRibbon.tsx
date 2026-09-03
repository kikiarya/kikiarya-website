export type SilkRibbonProps = {
  width?: number;
  className?: string;
  flowing?: boolean;
};

/** One flowing sash. Sightline, not a bow. */
export default function SilkRibbon({
  width = 168,
  className = "",
  flowing = false,
}: SilkRibbonProps) {
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
      <path d="M4 22C22 8 38 6 54 16c14 9 22 10 36 3 14-7 24-6 38 4 12 8 24 10 44 2" />
      <path
        d="M4 22C22 8 38 6 54 16c14 9 22 10 36 3 14-7 24-6 38 4 12 8 24 10 44 2"
        strokeWidth="5.5"
        opacity="0.14"
      />
      <path d="M118 19c4 6 8 9 14 10" opacity="0.55" />
    </svg>
  );
}
