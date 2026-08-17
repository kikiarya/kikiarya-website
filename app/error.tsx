"use client";

import { useEffect } from "react";
import Container from "../components/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[85vh] flex items-center">
      <Container>
        <p className="eyebrow">Error</p>
        <h2 className="font-display text-5xl md:text-7xl font-light mt-6 leading-none">
          Something broke on this page.
        </h2>
        <p className="mt-6 max-w-md text-[var(--sakura-ink-soft)] leading-7">
          You can retry, or leave and come back from the index.
        </p>
        <button onClick={reset} className="button-primary mt-10">
          Try again
        </button>
      </Container>
    </div>
  );
}
