import type { ReactNode } from "react";

/** Circular press-stamp. Number or metric sits in the wax, not in a card. */
export default function WaxSeal({
  size = 104,
  active = false,
  caption,
  children,
}: {
  size?: number;
  active?: boolean;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <div className="m-0 flex flex-col items-center gap-2">
      <div
        className={`relative grid place-items-center rounded-full border-2 text-[var(--sakura-accent-deep)] transition-[border-color,transform,box-shadow] duration-300 ${
          active
            ? "border-[var(--sakura-accent-deep)] shadow-[0_8px_20px_rgba(138,51,88,0.12)]"
            : "border-[var(--sakura-line)]"
        }`}
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle at 32% 28%, color-mix(in srgb, var(--sakura-bg-deep) 88%, white), var(--sakura-paper-soft) 62%, color-mix(in srgb, var(--sakura-accent) 16%, var(--sakura-bg-deep)))",
        }}
      >
        <span
          className="pointer-events-none absolute rounded-full border border-current opacity-25"
          style={{ inset: "11%" }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute rounded-full border border-current opacity-15"
          style={{ inset: "18%" }}
          aria-hidden="true"
        />
        <span className="relative z-[1] px-2 text-center font-display font-light leading-none tracking-[-0.04em]">
          {children}
        </span>
      </div>
      {caption ? (
        <p className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)]">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
