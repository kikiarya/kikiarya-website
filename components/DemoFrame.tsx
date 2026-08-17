
import React from 'react';
import { ExternalLink, MonitorOff } from 'lucide-react';

interface DemoFrameProps {
  url?: string;
  title: string;
}

const DemoFrame: React.FC<DemoFrameProps> = ({ url, title }) => {
  if (!url) {
    return (
      <div className="aspect-video bg-[var(--sakura-surface-soft)] border border-dashed border-[var(--sakura-line)] rounded-3xl flex flex-col items-center justify-center p-12 text-center">
        <MonitorOff className="text-[var(--sakura-muted-soft)] mb-4" size={48} />
        <p className="text-[var(--sakura-ink-soft)] font-medium">Live demo not available yet.</p>
        <p className="text-xs text-[var(--sakura-muted)] mt-2">The environment is being migrated or is private enterprise software.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-4">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--sakura-line)]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--sakura-line)]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--sakura-line)]"></div>
        </div>
        <a 
          href={url} 
          target="_blank" 
          className="text-[10px] font-bold uppercase tracking-widest text-[var(--sakura-muted)] hover:text-accent flex items-center transition-colors"
        >
          Open in new tab <ExternalLink size={12} className="ml-2" />
        </a>
      </div>
      <div className="aspect-video sakura-glass rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(123,62,82,.12)]">
        <iframe 
          src={url} 
          title={title}
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default DemoFrame;
