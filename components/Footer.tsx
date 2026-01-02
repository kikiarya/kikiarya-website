
import React from 'react';
import Container from './Container';

const Footer: React.FC = () => {
  return (
    <footer className="py-24 border-t border-border">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <h3 className="text-sm font-bold tracking-tighter mb-4">QY.CH <span className="text-accent">.</span></h3>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest leading-relaxed font-mono">
              Engineering systems with <br /> deliberate design.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-4">
              <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-300">Contact</h4>
              <ul className="space-y-2">
                <li><a href="mailto:hello@qiyue.com" className="text-xs font-bold hover:text-accent transition-colors">Email</a></li>
                <li><a href="https://linkedin.com" target="_blank" className="text-xs font-bold hover:text-accent transition-colors">LinkedIn</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-300">Social</h4>
              <ul className="space-y-2">
                <li><a href="https://github.com" target="_blank" className="text-xs font-bold hover:text-accent transition-colors">GitHub</a></li>
                <li><a href="https://twitter.com" target="_blank" className="text-xs font-bold hover:text-accent transition-colors">X / Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-24 flex justify-between items-center text-slate-300 font-mono text-[9px] uppercase tracking-widest">
          <span>© {new Date().getFullYear()} Qiyue Chen</span>
          <span>Silicon Valley</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
