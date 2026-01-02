
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Tag from './Tag';
import { Project } from '../lib/projects';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="aspect-[16/10] bg-slate-100 rounded-2xl overflow-hidden mb-6 border border-gray-100 relative">
          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-95 group-hover:scale-100">
             <div className="bg-white px-6 py-3 rounded-full shadow-2xl border border-gray-100 text-[10px] font-bold uppercase tracking-widest flex items-center">
               View Case Study <ArrowUpRight size={14} className="ml-2" />
             </div>
          </div>
          <div className="w-full h-full flex items-center justify-center font-mono text-slate-200 text-6xl font-black italic select-none">
            {project.title.charAt(0)}
          </div>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="font-mono text-[9px] text-slate-300">0{index + 1}</span>
              <div className="flex gap-2">
                {project.categoryTags.map(tag => (
                  <span key={tag} className="font-mono text-[9px] text-slate-400 uppercase tracking-tighter">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="text-xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2 max-w-sm">
              {project.shortDescription}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
