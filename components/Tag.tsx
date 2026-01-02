
import React from 'react';

interface TagProps {
  label: string;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ label, className }) => {
  return (
    <span className={`px-2.5 py-0.5 border border-border rounded-full text-[9px] font-bold uppercase tracking-widest text-slate-500 bg-white/50 inline-block ${className}`}>
      {label}
    </span>
  );
};

export default Tag;
