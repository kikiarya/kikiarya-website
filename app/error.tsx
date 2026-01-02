
'use client';

import React, { useEffect } from 'react';
import Container from '../components/Container';

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
    <div className="min-h-screen flex flex-col justify-center items-center py-40">
      <Container className="text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-500 font-bold mb-8 block">Runtime Error</span>
        <h2 className="text-5xl font-semibold tracking-tighter mb-10">Something went <br /><span className="text-slate-300 italic">unexpected.</span></h2>
        <button
          onClick={() => reset()}
          className="px-10 py-4 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all"
        >
          Try again
        </button>
      </Container>
    </div>
  );
}
