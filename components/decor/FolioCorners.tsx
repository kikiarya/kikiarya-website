import Pearl from "./Pearl";
import Sparkle from "./Sparkle";

/** Quiet corner anchors — pearls and sparkles, not sprigs. */
export default function FolioCorners({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 hidden md:block ${className}`}
    >
      <span className="absolute left-0 top-0 text-[var(--sakura-accent)]">
        <Pearl size={8} />
      </span>
      <span className="absolute right-0 top-1 text-[var(--sakura-accent)]">
        <Sparkle size={11} points={4} className="opacity-70" />
      </span>
      <span className="absolute bottom-0 left-0 text-[var(--sakura-accent)]">
        <Sparkle size={10} points={4} className="opacity-55" />
      </span>
      <span className="absolute bottom-1 right-0 text-[var(--sakura-accent)]">
        <Pearl size={7} />
      </span>
    </div>
  );
}
