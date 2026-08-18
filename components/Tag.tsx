export default function Tag({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span
      className={`inline-flex rounded-full border border-[var(--sakura-line-soft)] bg-[var(--sakura-surface-soft)] px-3 py-1 font-mono text-meta uppercase tracking-[.08em] text-[var(--sakura-ink-soft)] ${className}`}
    >
      {label}
    </span>
  );
}
