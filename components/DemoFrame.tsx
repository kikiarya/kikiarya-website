
import React from 'react';
import { ExternalLink, MonitorOff } from 'lucide-react';

interface DemoFrameProps {
  url?: string;
  title: string;
}

const DemoFrame: React.FC<DemoFrameProps> = ({ url, title }) => {
  if (!url) {
    return (
      <div className="aspect-video bg-slate-50 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-12 text-center">
        <MonitorOff className="text-slate-200 mb-4" size={48} />
        <p className="text-slate-500 font-medium">Live demo not available yet.</p>
        <p className="text-xs text-slate-400 mt-2">The environment is being migrated or is private enterprise software.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-4">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
        </div>
        <a 
          href={url} 
          target="_blank" 
          className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-accent flex items-center transition-colors"
        >
          Open in new tab <ExternalLink size={12} className="ml-2" />
        </a>
      </div>
      <div className="aspect-video bg-white hairline rounded-3xl overflow-hidden shadow-2xl">
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
