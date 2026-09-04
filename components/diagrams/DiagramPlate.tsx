import type { ReactNode } from "react";
import Bow from "../decor/Bow";
import LaceDivider from "../decor/LaceDivider";
import Pearl from "../decor/Pearl";
import { DiamondMark } from "./icons";

export function OrnamentDivider() {
  return (
    <div
      className="flex items-center justify-center gap-2 text-[var(--sakura-accent-deep)]"
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-current opacity-40" />
      <span className="size-1 rounded-full bg-current opacity-50" />
      <DiamondMark size={8} />
      <span className="size-1 rounded-full bg-current opacity-50" />
      <span className="h-px w-10 bg-current opacity-40" />
    </div>
  );
}

export default function DiagramPlate({
  title,
  subtitle,
  caption,
  children,
}: {
  title: ReactNode;
  subtitle: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="diagram-plate">
      <div className="diagram-plate-lace diagram-plate-lace-top" aria-hidden="true">
        <LaceDivider scallop={16} picots />
      </div>
      <div className="diagram-plate-lace diagram-plate-lace-bottom" aria-hidden="true">
        <LaceDivider scallop={16} picots />
      </div>
      <div className="pointer-events-none absolute left-5 top-5 text-[var(--sakura-accent)]">
        <Pearl size={7} />
      </div>
      <div className="pointer-events-none absolute right-5 top-5 text-[var(--sakura-accent)]">
        <Pearl size={7} />
      </div>
      <div className="pointer-events-none absolute bottom-5 left-5 text-[var(--sakura-accent)]">
        <Pearl size={7} />
      </div>
      <div className="pointer-events-none absolute bottom-5 right-5 text-[var(--sakura-accent)]">
        <Pearl size={7} />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-2 z-[1] -translate-x-1/2 text-[var(--sakura-accent-deep)]">
        <Bow size={34} variant="soft" />
      </div>

      <div className="diagram-plate-inner">
        <p className="eyebrow">Fig. Architecture</p>
        <h3 className="mt-4 text-center font-display text-2xl font-light leading-tight md:text-[1.85rem]">
          {title}
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-center font-display text-base italic leading-snug text-[var(--sakura-ink-soft)]">
          {subtitle}
        </p>
        <div className="mt-4">
          <OrnamentDivider />
        </div>
        <div className="mt-7 md:mt-8">{children}</div>
        <figcaption className="mt-7 font-display italic text-base leading-7 text-[var(--sakura-ink-soft)]">
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}
