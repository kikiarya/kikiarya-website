
import React from 'react';
import Container from '../../components/Container';
import Reveal from '../../components/Reveal';
import SectionHeader from '../../components/SectionHeader';

export default function BlogPage() {
  return (
    <div className="pt-40 pb-20">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <SectionHeader 
              eyebrow="Journal" 
              title="System Observations" 
              description="A space for documented learnings in distributed computing, LLM patterns, and interaction design."
            />
          </Reveal>
          <div className="mt-32 space-y-16">
            <div className="p-16 bg-slate-100 rounded-[40px] border border-gray-100 text-center">
              <h2 className="text-2xl font-semibold tracking-tight mb-4 text-slate-900">Drafting the first entry...</h2>
              <p className="text-slate-500 mb-10 max-w-sm mx-auto">I'm currently formalizing my notes on SAGA patterns in microservice architectures.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
