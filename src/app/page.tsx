'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

// Dynamically import canvas/WebGL components with SSR disabled to prevent server build crashes
const WebGLBackground = dynamic(() => import('@/components/WebGLBackground'), { ssr: false });
const HeroCanvas = dynamic(() => import('@/components/HeroCanvas'), { ssr: false });
const TechBackgroundCanvas = dynamic(() => import('@/components/TechBackgroundCanvas'), { ssr: false });
const AdminPanel = dynamic(() => import('@/components/AdminPanel'), { ssr: false });

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function MorandaGroupHome() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const typedKeys = useRef('');

  // Full Live Site State
  const [siteState, setSiteState] = useState({
    hero: {
      badgeText: 'Parent Holding Company',
      title: 'moranda blue',
      subtitle: 'A forward-thinking parent company powering media, publishing, technology, and digital products from Nigeria to the world.',
      estYear: '2026',
    },
    socials: [
      {
        id: '1',
        name: 'Facebook',
        url: 'https://facebook.com',
        hoverStyle: 'hover:border-[#1877F2] hover:text-[#1877F2]',
        icon: (
          <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        )
      },
      {
        id: '2',
        name: 'TikTok',
        url: 'https://tiktok.com',
        hoverStyle: 'hover:border-cyan-400 hover:text-white',
        icon: (
          <svg className="w-5 h-5 text-slate-100" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.001h-3.28s0 14.004 0 14.004c0 2.502-2.029 4.532-4.532 4.532-2.502 0-4.532-2.03-4.532-4.532 0-2.503 2.03-4.532 4.532-4.532.484 0 .945.076 1.378.217V6.368a9.141 9.141 0 0 0-1.378-.104c-5.027 0-9.103 4.076-9.103 9.103 0 5.026 4.076 9.103 9.103 9.103 5.026 0 9.103-4.077 9.103-9.103V9.012a12.392 12.392 0 0 0 7.303 2.368V8.041a9.07 9.07 0 0 1-5.594-1.934 9.143 9.143 0 0 1-3.003-6.106z"/>
          </svg>
        )
      },
      {
        id: '3',
        name: 'Instagram',
        url: 'https://instagram.com',
        hoverStyle: 'hover:border-[#E4405F] hover:text-[#E4405F]',
        icon: (
          <svg className="w-5 h-5 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        )
      },
      {
        id: '4',
        name: 'X (Twitter)',
        url: 'https://twitter.com',
        hoverStyle: 'hover:border-blue-400 hover:text-blue-400',
        icon: (
          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        )
      },
      {
        id: '5',
        name: 'LinkedIn',
        url: 'https://linkedin.com',
        hoverStyle: 'hover:border-[#0A66C2] hover:text-[#0A66C2]',
        icon: (
          <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        )
      },
    ],
    portfolio: [
      {
        id: '1',
        category: 'Publishing',
        title: 'MEZIE Publishing',
        link: '#',
        description: 'Author brand and independent publishing powerhouse behind inspiring books, digital guides, and strategic media.',
        tag: 'Publishing House',
        badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      },
      {
        id: '2',
        category: 'Personal Brand',
        title: 'MEZIE 007',
        link: '#',
        description: 'Personal brand entity and portfolio hub showcasing software development, tech ventures, and creative innovations.',
        tag: 'Brand Entity',
        badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      },
    ],
    founder: {
      name: 'Onah Sunday Chimezie',
      title: 'Founder & Chief Executive Officer, Moranda Group',
      initials: 'OSC',
      photo: '',
      bio: 'A visionary software developer and media entrepreneur driving innovation across cutting-edge digital platforms, automated tools, and independent publishing. Committed to scaling robust tech architectures and world-class products from Nigeria to global markets.',
    },
    awards: [
      { id: 'a1', title: 'Excellence in Digital Media & Tech', issuer: 'The Gears of Creativity', year: '2026', tag: 'Award' },
      { id: 'a2', title: 'Full-Stack Engineering & App Architecture', issuer: 'Moranda Tech Certification', year: '2026', tag: 'Certificate' },
      { id: 'a3', title: 'Independent Publishing & Content Innovation', issuer: 'Mezie Publishing Group', year: '2025', tag: 'Recognition' }
    ],
    team: [
      { name: 'Onah Sunday Chimezie', role: 'Founder & CEO', focus: 'Software Architecture & Strategy' },
      { name: 'Core Editorial Team', role: 'Mezie Media Desk', focus: 'News Distribution & Digital Journalism' },
      { name: 'Engineering Unit', role: 'Moranda Labs', focus: 'Full-Stack Development & AI Automations' }
    ],
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    typedKeys.current += e.key.toLowerCase();
    if (typedKeys.current.length > 30) typedKeys.current = typedKeys.current.slice(-30);
    if (typedKeys.current.includes('admin.mezie.moranda')) {
      setIsAdminOpen(true);
      typedKeys.current = '';
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const filteredPortfolio = siteState.portfolio.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAwards = siteState.awards.filter((award) =>
    award.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    award.issuer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>('.scroll-reveal');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative overflow-hidden">
      <WebGLBackground />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        siteState={siteState}
        onUpdateSiteState={(newState) => setSiteState(newState)}
      />

      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 group cursor-pointer shrink-0">
            <div className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-blue-500/50 transition-colors">
              <Image src="/assets/logo.png" alt="Moranda Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              MORANDA <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">Group</span>
            </span>
          </div>

          <div className="relative max-w-xs w-full hidden sm:block">
            <input
              type="text"
              placeholder="Search ventures, credentials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white focus:border-cyan-500 outline-none"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#portfolio" className="hover:text-blue-400 transition-colors">Portfolio</a>
            <a href="#founder" className="hover:text-blue-400 transition-colors">Founder</a>
            <a href="#awards" className="hover:text-blue-400 transition-colors">Awards</a>
            <a href="#team" className="hover:text-blue-400 transition-colors">Team</a>
          </nav>

          <a href="#contact" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium text-sm border border-blue-400/20">
            Get in Touch
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 pt-24 pb-20 px-6 max-w-5xl mx-auto text-center overflow-hidden">
        <TechBackgroundCanvas />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-medium mb-8">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-blue-400 font-semibold">Est. {siteState.hero.estYear}</span>
          <span className="text-slate-700">•</span>
          <span>{siteState.hero.badgeText}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.15] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(37,99,235,0.4)]">
          {siteState.hero.title}
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          {siteState.hero.subtitle}
        </p>

        {/* Stats Row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
          {[
            { value: `${siteState.portfolio.length}+`, label: 'Active Subsidiaries' },
            { value: 'Global', label: 'Audience Reach' },
            { value: siteState.hero.estYear, label: 'Established' },
            { value: '100%', label: 'Innovation Driven' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3">
              <div className="text-2xl md:text-3xl font-extrabold text-white bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Media Hub */}
      <section className="scroll-reveal relative z-10 py-12 px-6 max-w-5xl mx-auto">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-950 border border-slate-800/80 text-center shadow-xl">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            Connect & Follow
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-3">Official Social Networks</h3>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            {siteState.socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-md ${social.hoverStyle}`}
              >
                {social.icon}
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="scroll-reveal relative z-10 py-20 px-6 max-w-6xl mx-auto border-t border-slate-800/60 overflow-hidden">
        <HeroCanvas />

        <div className="relative z-10 mb-14 text-center md:text-left">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            Ventures & Subsidiaries
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4">Our Portfolio</h2>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredPortfolio.map((item) => (
            <div key={item.id} className="group relative p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between shadow-lg">
              <div>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${item.badgeBg}`}>
                  {item.tag}
                </span>
                <h3 className="text-2xl font-bold text-white mt-3 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">{item.description}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-bold text-blue-400 hover:text-blue-300 gap-2">
                  Visit Brand <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Profile Section */}
      <section id="founder" className="scroll-reveal relative z-10 py-20 px-6 max-w-6xl mx-auto border-t border-slate-800/60">
        <div className="p-10 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-center gap-10">
          <div className="w-40 h-40 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-1 shrink-0 overflow-hidden shadow-xl shadow-blue-500/20">
            {siteState.founder.photo ? (
              <img src={siteState.founder.photo} alt="Founder" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-4xl font-black text-white">
                {siteState.founder.initials}
              </div>
            )}
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              Executive Leadership
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-4">{siteState.founder.name}</h2>
            <p className="text-blue-400 font-semibold text-sm mt-1">{siteState.founder.title}</p>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mt-4">{siteState.founder.bio}</p>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" className="scroll-reveal relative z-10 py-20 px-6 max-w-6xl mx-auto border-t border-slate-800/60">
        <h2 className="text-3xl font-extrabold text-white mb-8">Awards & Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredAwards.map((award) => (
            <div key={award.id} onClick={() => alert(`Viewing Credential: ${award.title}`)} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {award.tag}
              </span>
              <h3 className="text-lg font-bold text-white mt-3 group-hover:text-cyan-400 transition-colors">{award.title}</h3>
              <p className="text-slate-400 text-xs mt-2">{award.issuer}</p>
              <div className="mt-6 flex items-center text-xs font-bold text-cyan-400 gap-1">View Credential →</div>
            </div>
          ))}
        </div>
      </section>

      {/* Workforce Team Section */}
      <section id="team" className="scroll-reveal relative z-10 py-20 px-6 max-w-6xl mx-auto border-t border-slate-800/60">
        <h2 className="text-3xl font-extrabold text-white mb-8">The Team & Collaborators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteState.team.map((member, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-blue-400 font-bold mb-4">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-white">{member.name}</h3>
              <p className="text-xs font-semibold text-blue-400 mt-0.5">{member.role}</p>
              <p className="text-slate-400 text-xs mt-3">{member.focus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-reveal relative z-10 py-20 px-6 max-w-4xl mx-auto text-center border-t border-slate-800/60">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Let’s Build Together</h2>
        <p className="text-slate-400 text-sm md:text-base mt-3 max-w-lg mx-auto">Interested in partnerships, media inquiries, or venture opportunities with Moranda Group?</p>
        <div className="mt-8">
          <a href="mailto:contact@morandagroup.com" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm shadow-xl hover:scale-105 transition-all">
            <span>Get in Touch via Email</span>
            <span>→</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
        © 2026 MORANDA Group. All rights reserved.
      </footer>
    </div>
  );
}

