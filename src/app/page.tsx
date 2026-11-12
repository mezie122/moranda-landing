'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-slate-950" />
});

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden flex flex-col items-center justify-center">
      {/* 3D Background Canvas */}
      {isMounted && <HeroCanvas />}

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-6">
          Moranda Group
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8">
          Architecting decentralized digital products across e-commerce, fintech, logistics, and automation sectors.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#explore"
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-medium transition-all shadow-lg shadow-blue-600/30"
          >
            Explore Ecosystem
          </a>
        </div>
      </div>
    </main>
  );
}
