
"use client";

import React, { useState, useMemo } from 'react';
import Container from '../../components/Container';
import Reveal from '../../components/Reveal';
import SectionHeader from '../../components/SectionHeader';
import ProjectCard from '../../components/ProjectCard';
import { projects } from '../../lib/projects';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'AI Product', 'Full-Stack', 'Data/ML', 'Distributed'];

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesFilter = filter === 'All' || p.categoryTags.includes(filter);
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <div className="pt-40 pb-20">
      <Container>
        <Reveal>
          <SectionHeader 
            eyebrow="Archive" 
            title="Project Catalog" 
            description="A chronological record of system architecture, product design, and research experiments."
          />
        </Reveal>

        <div className="mt-16 mb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-gray-100">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full transition-all border ${
                  filter === cat 
                    ? 'bg-slate-900 border-slate-900 text-white' 
                    : 'bg-transparent border-gray-200 text-slate-400 hover:border-slate-900 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border border-gray-100 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </AnimatePresence>
          
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-32 text-center">
              <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
