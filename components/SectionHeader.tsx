import React from "react";
import FloralSprig from "./decor/FloralSprig";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
  ornament = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  /** Trailing sakura sprig beside the title. Decorative only. */
  ornament?: boolean;
}) {
  return (
    <div className={`mb-12 ${className}`}>
      <span className="eyebrow block mb-4">{eyebrow}</span>
      <div className="flex items-center gap-5">
        <h2 className="font-display text-chapter font-light text-balance">{title}</h2>
        {ornament ? (
          <FloralSprig
            size={66}
            className="hidden md:block shrink-0 text-[var(--sakura-accent)]/55"
          />
        ) : null}
      </div>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--sakura-ink-soft)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
