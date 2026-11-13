'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), { ssr: false });
const TechBackgroundCanvas = dynamic(() => import('@/components/TechBackgroundCanvas'), { ssr: false });
const WebGLBackground = dynamic(() => import('@/components/WebGLBackground'), { ssr: false });
const AdminPanel = dynamic(() => import('@/components/AdminPanel'), { ssr: false });

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
}

interface StoryCard {
  id: string;
  title: string;
  description: string;
  tag: string;
  image: string;
}

export default function Home() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const [siteConfig, setSiteConfig] = useState({
    hero: {
      badge: 'Decentralized Digital Architecture',
      title: 'Engineering the Moranda Brand Ecosystem',
      subtitle: 'Building next-generation digital products across fintech, e-commerce, automated logistics, and high-tier interactive applications.',
    },
    founder: {
      title: 'The Visionary Founder & Executive Lead',
      description: 'Pioneering the Moranda brand ecosystem through decentralized cross-platform engineering, high-performance web architecture, and visionary leadership.',
      image: '/assets/logo.png',
    },
    heroMedia: [] as MediaItem[],
    cards: [
      {
        id: '1',
        title: 'The Humble Beginnings of a Legend',
        description: 'Foundational roots establishing technical discipline, rapid prototyping workflows, and architectural precision across emerging sectors.',
        tag: 'Foundations',
        image: '/assets/logo.png',
      },
      {
        id: '2',
        title: 'Moranda Eats & Lifestyle Ecosystem',
        description: 'Modern food service marketplace coordinating digital ordering flows for gourmet dining, artisanal coffee, tea, and desserts.',
        tag: 'Venture',
        image: '/assets/logo.png',
      },
    ] as StoryCard[],
  });

  useEffect(() => {
    const loadConfig = () => {
      const savedConfig = localStorage.getItem('moranda_site_config');
      if (savedConfig) {
        try {
          const parsed = JSON.parse(savedConfig);
          setSiteConfig((prev) => ({
            hero: { ...prev.hero, ...(parsed.hero || {}) },
            founder: { ...prev.founder, ...(parsed.founder || {}) },
            heroMedia: parsed.heroMedia || [],
            cards: parsed.cards || prev.cards,
          }));
        } catch (err) {
          console.error(err);
        }
      }
    };

    loadConfig();
    window.addEventListener('moranda_config_updated', loadConfig);
    return () => window.removeEventListener('moranda_config_updated', loadConfig);
  }, []);

  // Secret triple-click trigger on top-left logo to open Admin Panel
  const [logoClicks, setLogoClicks] = useState(0);
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLogoClicks((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setIsAdminOpen(true);
        return 0;
      }
      setTimeout(() => setLogoClicks(0), 1000);
      return next;
    });
  };

  // Auto-advance photos or listen for video end to play next item in sequence
  const handleMediaEnded = () => {
    if (siteConfig.heroMedia.length > 0) {
      setActiveMediaIndex((prev) => (prev + 1) % siteConfig.heroMedia.length);
    }
  };

  // If item is a photo, auto-advance after 5 seconds
  useEffect(() => {
    if (siteConfig.heroMedia.length === 0) return;
    const currentItem = siteConfig.heroMedia[activeMediaIndex];
    if (currentItem && currentItem.type === 'image') {
      const timer = setTimeout(() => {
        setActiveMediaIndex((prev) => (prev + 1) % siteConfig.heroMedia.length);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeMediaIndex, siteConfig.heroMedia]);

  const filteredCards = siteConfig.cards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const founderMatches =
    siteConfig.founder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    siteConfig.founder.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    searchQuery === '';

  const currentMedia = siteConfig.heroMedia[activeMediaIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white relative overflow-x-hidden font-sans">
      <WebGLBackground />
      <TechBackgroundCanvas />

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            title="Click 3 times to open Admin Panel"
            className="flex items-center gap-3 font-bold tracking-wider group text-left focus:outline-none"
          >
            <div className="relative flex items-center justify-center h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-500/30 p-1 group-hover:border-blue-400 transition-colors">
              <img src="/assets/logo.png" alt="Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-white text-sm sm:text-base">
              MORANDA<span className="text-blue-400 font-normal"> GROUP</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#story" className="hover:text-blue-400 transition-colors">Journey</a>
            <a href="#ecosystem" className="hover:text-blue-400 transition-colors">Ecosystem</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              {siteConfig.hero.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {siteConfig.hero.title}
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl">
              {siteConfig.hero.subtitle}
            </p>
          </div>

          {/* Right-Side Hero Box (Dynamic Playlist or Default 3D Canvas) */}
          <div className="relative h-[380px] sm:h-[450px] rounded-2xl bg-gradient-to-b from-blue-950/20 to-slate-900/40 border border-blue-500/20 overflow-hidden flex items-center justify-center shadow-2xl">
            {siteConfig.heroMedia.length > 0 && currentMedia ? (
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                {currentMedia.type === 'video' ? (
                  <video
                    key={currentMedia.url}
                    src={currentMedia.url}
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleMediaEnded}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    key={currentMedia.url}
                    src={currentMedia.url}
                    alt="Hero slide"
                    className="w-full h-full object-cover animate-fade-in"
                  />
                )}
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-300">
                  Playing [{activeMediaIndex + 1}/{siteConfig.heroMedia.length}]: {currentMedia.type.toUpperCase()}
                </div>
              </div>
            ) : (
              <HeroCanvas />
            )}
          </div>
        </div>
      </section>

      {/* Story & Founder Cards Section with Search Bar */}
      <section id="story" className="py-24 px-6 border-t border-white/10 bg-slate-950/40">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Chronicles & Executive Milestones</h2>
            <p className="text-slate-400 text-sm">
              Dynamically managed narratives, founder spotlight, and venture cards controlled via your Admin Panel.
            </p>

            {/* LIVE SEARCH BAR */}
            <div className="pt-4 relative max-w-md mx-auto">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search milestones, ventures, or keywords..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-blue-500/30 text-white text-sm focus:outline-none focus:border-blue-400 shadow-xl transition-all placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="space-y-12">
            {/* SPECIAL CEO & FOUNDER CARD */}
            {founderMatches && (
              <div className="flex flex-col lg:flex-row items-center gap-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-slate-900/80 border-2 border-blue-500/50 shadow-2xl shadow-blue-500/10">
                <div className="w-full lg:w-1/2 h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-950 border border-blue-400/30 overflow-hidden relative group flex items-center justify-center">
                  <img
                    src={siteConfig.founder.image}
                    alt="Founder & CEO"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-mono shadow-lg">
                    ★ Executive Spotlight
                  </div>
                </div>
                <div className="w-full lg:w-1/2 space-y-4">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Founder & CEO</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{siteConfig.founder.title}</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{siteConfig.founder.description}</p>
                  <div className="pt-2 flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-xs text-blue-300 font-medium">Moranda Brand Ecosystem Lead</span>
                  </div>
                </div>
              </div>
            )}

            {/* DYNAMIC CARDS LIST */}
            {filteredCards.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                No matching cards found for &ldquo;{searchQuery}&rdquo;.
              </div>
            ) : (
              filteredCards.map((card, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={card.id}
                    className={`flex flex-col lg:flex-row items-center gap-8 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-blue-500/40 transition-all shadow-xl ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div className="w-full lg:w-1/2 h-64 sm:h-80 rounded-2xl bg-slate-950 border border-blue-500/20 overflow-hidden relative group flex items-center justify-center">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-blue-500/30 text-blue-300 text-[11px] font-mono shadow-lg">
                        {card.tag || 'Milestone'}
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2 space-y-4">
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Card ID: 0{index + 1}</span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{card.title}</h3>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{card.description}</p>
                      <div className="pt-2 flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span className="text-xs text-slate-400 font-medium">Moranda Brand Ecosystem</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 px-6 border-t border-white/10 text-center text-xs text-slate-500 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <img src="/assets/logo.png" alt="Logo" className="h-5 w-5 object-contain opacity-70" />
          <span className="text-slate-400 font-semibold tracking-wider">MORANDA GROUP</span>
        </div>
        <p>© {new Date().getFullYear()} Moranda Brand Ecosystem. All rights reserved locally.</p>
      </footer>

      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
}