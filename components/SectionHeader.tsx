import React from "react";

export default function SectionHeader({ eyebrow, title, description, className = "" }: { eyebrow: string; title: string; description?: string; className?: string }) {
  return <div className={`mb-12 ${className}`}><span className="eyebrow block mb-4">{eyebrow}</span><h2 className="font-display text-4xl md:text-6xl font-light leading-[.98] tracking-[-.035em]">{title}</h2>{description ? <p className="mt-6 max-w-2xl text-[var(--sakura-ink-soft)] leading-7">{description}</p> : null}</div>;
}
