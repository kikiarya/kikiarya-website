export type LaceDividerProps = {
  className?: string;
  /** Scallop diameter in px; the pattern tiles horizontally. */
  scallop?: number;
  /** Dotted picots below each scallop, like eyelet lace. */
  picots?: boolean;
};

/**
 * Scalloped lace edge, tiled as a repeating SVG background so it spans any
 * width without stretching. Use in place of a flat 1px rule.
 */
export default function LaceDivider({
  className = "",
  scallop = 18,
  picots = true,
}: LaceDividerProps) {
  const h = scallop / 2 + (picots ? 7 : 2);
  const stroke = "rgba(177,79,113,0.32)";
  const dot = "rgba(177,79,113,0.26)";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${scallop}" height="${h}" viewBox="0 0 ${scallop} ${h}">
    <path d="M0 1 A ${scallop / 2} ${scallop / 2} 0 0 0 ${scallop} 1" fill="none" stroke="${stroke}" stroke-width="1"/>
    ${picots ? `<circle cx="${scallop / 2}" cy="${scallop / 2 + 4}" r="1" fill="${dot}"/>` : ""}
  </svg>`;

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        height: h,
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "top center",
      }}
    />
  );
}
