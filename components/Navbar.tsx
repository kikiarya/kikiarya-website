
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from './Container';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  // 仅在 Next.js 环境下运行，安全获取当前路径
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', path: '/projects' },
    { name: 'Resume', path: '/resume' },
    { name: 'Journal', path: '/blog' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled ? 'py-4 bg-white/70 backdrop-blur-xl border-b border-gray-200' : 'py-8 bg-transparent'
    }`}>
      <Container>
        <div className="flex justify-between items-center">
          <Link href="/" className="text-lg font-bold tracking-tighter hover:opacity-70 transition-opacity">
            QY.CH <span className="text-blue-600">.</span>
          </Link>

          <div className="flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-[10px] uppercase tracking-widest font-bold transition-all hover:text-blue-600 relative ${
                    isActive ? 'text-black' : 'text-slate-500'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-blue-600"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
