
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Download } from 'lucide-react';
import { getFeaturedProjects } from '../lib/projects';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import Container from '../components/Container';
import Reveal from '../components/Reveal';

export default function Home() {
  const featured = getFeaturedProjects();
  const topSkills = ['TypeScript', 'Next.js', 'Go', 'Python', 'AWS', 'Kubernetes', 'OpenAI', 'Kafka'];

  return (
    <div className="pt-40 pb-20">
      <Container>
        <Reveal>
          <div className="max-w-4xl mb-40">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-blue-600 font-bold mb-6 block">
              Senior Full-Stack Engineer / Architect
            </span>
            <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter leading-[0.9] text-slate-900 mb-10">
              Crafting systems <br />
              <span className="text-slate-400">with purpose</span> <br />
              and <span className="italic">precision.</span>
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-10 mt-12">
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl">
                Qiyue Chen is a systems engineer dedicated to building high-performance, resilient web products. Combining deep backend logic with editorial-grade frontend aesthetics.
                <br />
                <span className="text-sm mt-4 block text-slate-400">专注于高并发分布式系统与精致前端体验。</span>
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/projects" className="px-8 py-3.5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 flex items-center group">
                  View Work <ArrowUpRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/resume" className="px-8 py-3.5 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-xl transition-all flex items-center">
                  Resume <Download size={14} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <section className="mb-40">
          <Reveal>
            <div className="flex justify-between items-end mb-16">
              <SectionHeader 
                eyebrow="Portfolio" 
                title="Featured Work" 
                className="mb-0"
              />
              <Link href="/projects" className="hidden md:block text-[10px] font-bold uppercase tracking-widest border-b border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all">
                Browse Archive
              </Link>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </section>

        <section className="py-32 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <h2 className="text-4xl font-semibold tracking-tighter leading-tight">
                Technical Mastery <br />
                <span className="text-slate-400 italic">across the full stack.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                {topSkills.map(skill => (
                  <div key={skill} className="px-6 py-3 bg-white border border-gray-100 rounded-xl font-mono text-xs font-bold uppercase tracking-widest text-slate-500 shadow-sm hover:shadow-md transition-shadow">
                    {skill}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </Container>
    </div>
  );
}
