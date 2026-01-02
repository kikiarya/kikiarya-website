
import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, description, className }) => {
  return (
    <div className={`mb-12 ${className}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent font-bold block mb-4">
        {eyebrow}
      </span>
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-slate-500 max-w-xl text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
