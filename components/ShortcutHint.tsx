"use client";

import { useEffect, useState } from "react";

export default function ShortcutHint({ className = "" }: { className?: string }) {
  const [label, setLabel] = useState("Ctrl+K");

  useEffect(() => {
    const mac = /Mac|iPhone|iPad/.test(navigator.platform) || navigator.userAgent.includes("Mac");
    setLabel(mac ? "⌘K" : "Ctrl+K");
  }, []);

  return (
    <span className={`font-mono text-meta uppercase tracking-[.12em] ${className}`}>
      {label}
    </span>
  );
}
