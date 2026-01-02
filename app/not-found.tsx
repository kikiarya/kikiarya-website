
import React from 'react';
import Link from 'next/link';
import Container from '../components/Container';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-40">
      <Container className="text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-blue-600 font-bold mb-8 block">Error 404</span>
        <h1 className="text-7xl md:text-9xl font-semibold tracking-tighter mb-10">Lost in <br /><span className="text-slate-300 italic">the void.</span></h1>
        <p className="text-slate-500 max-w-sm mx-auto mb-12">The resource you are looking for has been moved or purged from the architecture.</p>
        <Link href="/" className="px-10 py-4 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all">
          Return Home
        </Link>
      </Container>
    </div>
  );
}
