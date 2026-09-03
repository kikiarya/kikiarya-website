"use client";

import { useEffect, useState } from "react";
import { openCommandPalette } from "./CommandPalette";

export function useModKLabel() {
  const [label, setLabel] = useState("Ctrl+K");

  useEffect(() => {
    const mac =
      /Mac|iPhone|iPad/.test(navigator.platform) || navigator.userAgent.includes("Mac");
    setLabel(mac ? "⌘K" : "Ctrl+K");
  }, []);

  return label;
}

export default function ShortcutHint({ className = "" }: { className?: string }) {
  const label = useModKLabel();

  return (
    <button
      type="button"
      onClick={openCommandPalette}
      className={`font-mono text-meta uppercase tracking-[.12em] transition-colors duration-200 hover:text-[var(--sakura-accent-deep)] ${className}`}
      aria-label={`Open search (${label})`}
      aria-haspopup="dialog"
    >
      {label}
    </button>
  );
}
