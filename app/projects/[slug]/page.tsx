
"use client";

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Container from '../../../components/Container';
import Reveal from '../../../components/Reveal';
import Tag from '../../../components/Tag';
import DemoFrame from '../../../components/DemoFrame';
import { getProjectBySlug } from '../../../lib/projects';
import { Github, ExternalLink, ArrowLeft, Layout, Code } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailPage() {
  // useParams 是 Next.js 官方提供的获取路由参数的方式
  const params = useParams();
  const slug = params?.slug as string;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-40 pb-20">
      <Container>
        <Link href="/projects" className="group inline-flex items-center text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-blue-600 transition-colors mb-12">
          <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Works
        </Link>

        <Reveal>
          <div className="max-w-5xl mb-24">
            <div className="flex flex-wrap gap-2 mb-8">
              {project.categoryTags.map(tag => <Tag key={tag} label={tag} />)}
            </div>
            <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter leading-[0.9] text-slate-900 mb-10">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-3xl">
              {project.shortDescription}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-12 border-t border-b border-gray-100 mb-32">
          <div>
            <span className="font-mono text-[9px] text-slate-300 uppercase tracking-widest block mb-3">Timeline</span>
            <span className="text-sm font-bold">2023 - 2024</span>
          </div>
          <div>
            <span className="font-mono text-[9px] text-slate-300 uppercase tracking-widest block mb-3">Role</span>
            <span className="text-sm font-bold">{project.role || 'Senior Engineer'}</span>
          </div>
          <div>
            <span className="font-mono text-[9px] text-slate-300 uppercase tracking-widest block mb-3">Stack</span>
            <span className="text-sm font-bold">{project.techStack.slice(0, 3).join(', ')}</span>
          </div>
          <div className="flex gap-4">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-all hover:scale-110 active:scale-90">
                <Github size={18} />
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-600 text-white rounded-full hover:bg-slate-900 transition-all hover:scale-110 active:scale-90">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-32">
            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold mb-10 flex items-center">
                <Layout size={14} className="mr-3" /> Context & Strategy
              </h2>
              <div className="space-y-8">
                <p className="text-xl text-slate-700 leading-relaxed italic border-l-4 border-blue-600 pl-8">
                  {project.longDescription}
                </p>
                {project.context && (
                  <div className="bg-slate-50 p-10 rounded-3xl border border-gray-100">
                    <h3 className="font-bold mb-4 text-slate-900">Project Goal</h3>
                    <p className="text-slate-600 leading-relaxed">{project.context}</p>
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold mb-10 flex items-center">
                <Code size={14} className="mr-3" /> Engineering Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.highlights.map((h, i) => (
                  <div key={i} className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm border-l-4 border-blue-600">
                    <span className="font-mono text-[9px] text-slate-300 block mb-3">FEATURED INNOVATION 0{i+1}</span>
                    <p className="text-sm font-medium leading-relaxed text-slate-800">{h}</p>
                  </div>
                ))}
              </div>
            </section>

            {project.demoUrl && (
              <section>
                <h2 className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold mb-10">Live Environment</h2>
                <DemoFrame url={project.demoUrl} title={project.title} />
              </section>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <div className="sticky top-32">
              <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm mb-8">
                <h3 className="font-mono text-[9px] text-slate-300 uppercase tracking-widest block mb-6">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(t => (
                    <span key={t} className="px-3 py-1.5 bg-slate-50 border border-gray-100 rounded-lg text-xs font-bold text-slate-600">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {project.results && (
                <div className="p-8 bg-blue-600 rounded-3xl shadow-xl shadow-blue-600/10 text-white">
                  <h3 className="font-mono text-[9px] text-white/50 uppercase tracking-widest block mb-6">Outcome</h3>
                  <p className="text-xl font-semibold leading-snug italic">{project.results}</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
