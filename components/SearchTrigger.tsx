"use client";

import { Search } from "lucide-react";
import { openCommandPalette } from "./CommandPalette";
import { useModKLabel } from "./ShortcutHint";

export default function SearchTrigger({ compact = false }: { compact?: boolean }) {
  const label = useModKLabel();

  if (compact) {
    return (
      <button
        type="button"
        onClick={openCommandPalette}
        className="min-h-11 min-w-11 inline-flex items-center justify-center text-[var(--sakura-muted)] transition-colors duration-200 hover:text-[var(--sakura-accent-deep)]"
        aria-label={`Search (${label})`}
        aria-haspopup="dialog"
      >
        <Search size={18} strokeWidth={1.75} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openCommandPalette}
      className="inline-flex items-center gap-2 h-9 px-3 lg:w-[12.25rem] rounded-full sakura-glass text-left text-[var(--sakura-muted)] transition-[border-color,color] duration-200 hover:border-[var(--sakura-line)] hover:text-[var(--sakura-ink)]"
      aria-label={`Search (${label})`}
      aria-haspopup="dialog"
    >
      <Search size={14} strokeWidth={1.75} className="shrink-0" />
      <span className="flex-1 truncate text-[0.82rem]">Search</span>
      <kbd className="hidden lg:inline-flex shrink-0 font-mono text-[0.62rem] tracking-[.04em] text-[var(--sakura-muted-soft)] border border-[var(--sakura-line-soft)] rounded-md px-1.5 py-[0.12rem]">
        {label}
      </kbd>
    </button>
  );
}
