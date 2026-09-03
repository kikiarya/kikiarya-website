"use client";

import { useState } from "react";

export default function CopyBibtex({ bibtex }: { bibtex: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" className="button-ghost w-full" onClick={handleCopy}>
      {copied ? "Copied" : "Copy BibTeX"}
    </button>
  );
}
