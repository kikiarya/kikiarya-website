
import React from 'react';
import Container from '../../components/Container';
import Reveal from '../../components/Reveal';
import Tag from '../../components/Tag';
import { FileDown, MapPin, Mail, Globe } from 'lucide-react';

export default function ResumePage() {
  return (
    <div className="pt-40 pb-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24">
            <Reveal>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-600 font-bold block mb-6">Curriculum Vitae</span>
                <h1 className="text-6xl font-semibold tracking-tighter text-slate-900 mb-6">Qiyue Chen</h1>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-slate-500 text-xs font-medium uppercase tracking-widest">
                  <span className="flex items-center"><MapPin size={14} className="mr-2 text-blue-600" /> San Francisco, CA</span>
                  <span className="flex items-center"><Mail size={14} className="mr-2 text-blue-600" /> hello@qiyue.com</span>
                  <span className="flex items-center"><Globe size={14} className="mr-2 text-blue-600" /> qiyue.com</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <a 
                href="/resume/Qiyue-Chen-CV.pdf" 
                className="flex items-center px-8 py-3.5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all hover:scale-105"
              >
                <FileDown size={16} className="mr-2" /> Download PDF
              </a>
            </Reveal>
          </div>

          <div className="space-y-32">
            <section className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-1">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300">About</h2>
              </div>
              <div className="md:col-span-3">
                <p className="text-xl text-slate-700 leading-relaxed italic">
                  Systems-focused Full Stack Engineer with 8+ years of experience engineering high-concurrency microservices and editorial-grade frontend architectures. Passionate about LLM orchestration and cloud-native scalability.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-1">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300">Experience</h2>
              </div>
              <div className="md:col-span-3 space-y-16">
                {[
                  {
                    company: 'TechFlow Architecture',
                    role: 'Senior Software Architect',
                    period: '2021 — PRESENT',
                    description: 'Architected global payment gateway handling $50M daily volume with 99.99% uptime.'
                  },
                  {
                    company: 'Cognitive Lab AI',
                    role: 'Lead Product Engineer',
                    period: '2018 — 2021',
                    description: 'Pioneered interactive AI-streaming interfaces used by 500k monthly users.'
                  }
                ].map((job, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between items-baseline mb-4">
                      <h3 className="text-2xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">{job.role}</h3>
                      <span className="font-mono text-[10px] text-slate-300">{job.period}</span>
                    </div>
                    <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-6">{job.company}</p>
                    <p className="text-slate-600 leading-relaxed text-sm">{job.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
