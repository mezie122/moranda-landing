'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-slate-950" />,
});

const TechBackgroundCanvas = dynamic(
  () => import('@/components/TechBackgroundCanvas'),
  { ssr: false }
);

const WebGLBackground = dynamic(
  () => import('@/components/WebGLBackground'),
  { ssr: false }
);

const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
  ssr: false,
});

const VENTURES = [
  {
    category: 'Publishing House',
    title: 'MEZIE Publishing',
    description:
      'Author brand and independent publishing powerhouse behind inspiring books, digital guides, and strategic media.',
    accent: 'from-violet-500 to-indigo-500',
    borderHover: 'hover:border-violet-500/50',
    tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    link: '#contact',
  },
  {
    category: 'Brand Entity',
    title: 'MEZIE 007',
    description:
      'Personal brand entity and portfolio hub showcasing full-stack software development, tech ventures, and creative innovations.',
    accent: 'from-cyan-400 to-blue-500',
    borderHover: 'hover:border-cyan-500/50',
    tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    link: '#contact',
  },
  {
    category: 'Enterprise AI',
    title: 'Moranda AI Automation',
    description:
      'Concurrent enterprise automation pipelines, intelligent customer support bots, document parsing, and workflow integrations.',
    accent: 'from-emerald-400 to-teal-500',
    borderHover: 'hover:border-emerald-500/50',
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    link: '#contact',
  },
  {
    category: 'Fintech & Billing',
    title: 'Moranda Invoice',
    description:
      'Streamlined transaction management, automated billing infrastructure, and real-time financial tracking for modern businesses.',
    accent: 'from-blue-400 to-indigo-500',
    borderHover: 'hover:border-blue-500/50',
    tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    link: '#contact',
  },
  {
    category: 'Digital Commerce',
    title: 'Jara E-Commerce',
    description:
      'Next-generation multi-vendor marketplace connecting segmented buyer ecosystems with high-efficiency seller dashboards.',
    accent: 'from-violet-400 to-purple-500',
    borderHover: 'hover:border-purple-500/50',
    tagColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    link: '#contact',
  },
  {
    category: 'Food & Logistics',
    title: 'Moranda Eats',
    description:
      'On-demand culinary and beverage ordering platform engineered for rapid local fulfillment and seamless user experience.',
    accent: 'from-emerald-400 to-cyan-500',
    borderHover: 'hover:border-teal-500/50',
    tagColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    link: '#contact',
  },
];

const SOCIALS = [
  { name: 'Facebook', href: '#' },
  { name: 'TikTok', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'X (Twitter)', href: '#' },
  { name: 'LinkedIn', href: '#' },
];

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-violet-500/30 selection:text-violet-200 overflow-x-hidden">
      {/* Global Ambient Background Layers */}
      {isMounted && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <WebGLBackground />
          <TechBackgroundCanvas />
        </div>
      )}

      {/* Hidden / Floating Admin Panel */}
      {isMounted && <AdminPanel />}

      {/* Top Glass Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-slate-800/60 bg-slate-950/75 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2.5 font-bold tracking-wider text-sm md:text-base"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 shadow-sm shadow-cyan-400/50" />
            <span>
              MORANDA<span className="text-slate-400 font-normal">GROUP</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#portfolio" className="hover:text-white transition-colors">
              Ventures
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              Vision
            </a>
            <a href="#socials" className="hover:text-white transition-colors">
              Connect
            </a>
          </nav>

          <a
            href="#contact"
            className="px-4 py-2 rounded-lg text-xs md:text-sm font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-all"
          >
            Get in Touch
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden">
        {isMounted && <HeroCanvas />}

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-900/80 backdrop-blur-sm text-xs font-medium text-slate-300 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Est. 2026 • Parent Holding Company
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Moranda Group
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            A forward-thinking parent company powering media, publishing,
            technology, and decentralized digital products from Nigeria to the
            world.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#portfolio"
              className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/25"
            >
              Explore Ecosystem
            </a>
            <a
              href="#about"
              className="px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold backdrop-blur-sm transition-all"
            >
              Our Vision
            </a>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="relative z-10 border-y border-slate-800/60 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              6+
            </div>
            <div className="text-xs uppercase tracking-wider text-slate-400">
              Active Subsidiaries
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
              Global
            </div>
            <div className="text-xs uppercase tracking-wider text-slate-400">
              Audience Reach
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-violet-400 mb-1">
              2026
            </div>
            <div className="text-xs uppercase tracking-wider text-slate-400">
              Established
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-1">
              100%
            </div>
            <div className="text-xs uppercase tracking-wider text-slate-400">
              Innovation Driven
            </div>
          </div>
        </div>
      </section>

      {/* Ventures & Subsidiaries Portfolio */}
      <section
        id="portfolio"
        className="relative z-10 py-24 px-6 max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
            Ventures & Subsidiaries
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
            Our Portfolio
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            An interconnected ecosystem of independent brands and scalable
            digital platforms engineered for long-term impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VENTURES.map((venture) => (
            <div
              key={venture.title}
              className={`group relative rounded-2xl border border-slate-800/80 bg-slate-900/40 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${venture.borderHover}`}
            >
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full border ${venture.tagColor}`}
                >
                  {venture.category}
                </span>
                <span
                  className={`h-2 w-2 rounded-full bg-gradient-to-r ${venture.accent}`}
                />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {venture.title}
              </h3>

              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                {venture.description}
              </p>

              <a
                href={venture.link}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-200 group-hover:text-white transition-colors"
              >
                Visit Brand
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Vision / Founder Section */}
      <section
        id="about"
        className="relative z-10 py-20 px-6 border-t border-slate-800/60 bg-slate-900/20 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Corporate Architecture
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">
            Building Resilient Digital Infrastructure
          </h2>
          <p className="text-slate-300/90 text-base md:text-lg leading-relaxed mb-8">
            Founded on the principle that modern enterprises thrive through
            modular engineering and creative autonomy, Moranda Group unifies
            publishing, enterprise AI automation, commerce, and financial
            tooling under one cohesive vision.
          </p>
        </div>
      </section>

      {/* Socials & Contact */}
      <section
        id="socials"
        className="relative z-10 py-20 px-6 border-t border-slate-800/60"
      >
        <div id="contact" className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Connect & Follow
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-8">
            Official Social Networks
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-700 text-sm font-medium text-slate-300 hover:text-white transition-all"
              >
                {social.name}
              </a>
            ))}
          </div>

          <div className="p-8 rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/80 to-slate-950 max-w-2xl mx-auto backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-2">
              Partner With Moranda Group
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Interested in enterprise automation, publishing collaborations, or
              digital product partnerships?
            </p>
            <a
              href="mailto:contact@morandagroup.com"
              className="inline-block px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white text-sm font-semibold shadow-lg shadow-violet-600/20 transition-all"
            >
              contact@morandagroup.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/60 py-8 px-6 text-center text-xs text-slate-500">
        <p>© 2026 MORANDA Group. All rights reserved.</p>
      </footer>
    </div>
  );
}