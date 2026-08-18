import React from "react";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`mb-12 ${className}`}>
      <span className="eyebrow block mb-4">{eyebrow}</span>
      <h2 className="font-display text-chapter font-light text-balance">{title}</h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--sakura-ink-soft)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
