
import React from 'react';
import Container from '../components/Container';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Container className="text-center">
        <div className="inline-block w-12 h-12 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.3em] text-slate-300">Synchronizing Architecture...</p>
      </Container>
    </div>
  );
}
