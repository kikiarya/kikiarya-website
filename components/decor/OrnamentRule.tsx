import Pearl from "./Pearl";
import Sparkle from "./Sparkle";

/** Hairline with pearl / sparkle ticks — section divider, not a second card. */
export default function OrnamentRule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-2 text-[var(--sakura-accent-deep)] ${className}`}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-current opacity-30" />
      <Pearl size={6} />
      <Sparkle size={9} points={4} />
      <Pearl size={6} />
      <span className="h-px flex-1 bg-current opacity-30" />
    </div>
  );
}
