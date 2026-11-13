'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AdminPanelProps {
  onClose: () => void;
}

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

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [hero, setHero] = useState({
    badge: 'Decentralized Digital Architecture',
    title: 'Engineering the Moranda Brand Ecosystem',
    subtitle: 'Building next-generation digital products across fintech, e-commerce, automated logistics, and high-tier interactive applications.',
  });

  const [founder, setFounder] = useState({
    title: 'The Visionary Founder & Executive Lead',
    description: 'Pioneering the Moranda brand ecosystem through decentralized cross-platform engineering, high-performance web architecture, and visionary leadership.',
    image: '/assets/logo.png',
  });

  const [heroMedia, setHeroMedia] = useState<MediaItem[]>([]);
  const [cards, setCards] = useState<StoryCard[]>([]);

  // New Card State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTag, setNewTag] = useState('Ecosystem');
  const [newImage, setNewImage] = useState('/assets/logo.png');
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const founderFileInputRef = useRef<HTMLInputElement | null>(null);
  const heroMediaInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const savedConfig = localStorage.getItem('moranda_site_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        if (parsed.hero) setHero((prev) => ({ ...prev, ...parsed.hero }));
        if (parsed.founder) setFounder((prev) => ({ ...prev, ...parsed.founder }));
        if (parsed.heroMedia && Array.isArray(parsed.heroMedia)) setHeroMedia(parsed.heroMedia);
        if (parsed.cards && Array.isArray(parsed.cards)) setCards(parsed.cards);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const compressImage = (file: File, callback: (compressedBase64: string) => void) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL('image/jpeg', 0.7));
      };
      if (event.target?.result) img.src = event.target.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFounderImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    compressImage(file, (base64) => setFounder({ ...founder, image: base64 }));
  };

  const handleCardImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    compressImage(file, (base64) => setNewImage(base64));
  };

  // Handle uploading multiple photos and videos for the Hero box
  const handleHeroMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: MediaItem[] = [];
    Array.from(files).forEach((file) => {
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');
      if (isVideo || isImage) {
        newItems.push({
          id: Date.now() + Math.random().toString(),
          type: isVideo ? 'video' : 'image',
          url: URL.createObjectURL(file),
          name: file.name,
        });
      }
    });

    setHeroMedia((prev) => [...prev, ...newItems]);
    if (heroMediaInputRef.current) heroMediaInputRef.current.value = '';
  };

  const handleRemoveHeroMedia = (id: string) => {
    setHeroMedia((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    setCards([
      ...cards,
      {
        id: Date.now().toString(),
        title: newTitle,
        description: newDesc,
        tag: newTag,
        image: newImage,
      },
    ]);
    setNewTitle('');
    setNewDesc('');
    setNewImage('/assets/logo.png');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const config = { hero, founder, heroMedia, cards };
      localStorage.setItem('moranda_site_config', JSON.stringify(config));
      window.dispatchEvent(new Event('moranda_config_updated'));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setErrorMsg('Storage quota exceeded.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 sm:p-6">
      <div className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse shadow-lg shadow-blue-500/50" />
            <h2 className="text-sm font-bold text-white tracking-wide">Moranda Admin Control Center</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
          >
            ✕ Close
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSaveAll} className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Hero Section Edit */}
          <div className="space-y-4 p-4 rounded-xl bg-slate-950/60 border border-white/10">
            <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Hero Section</h3>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Headline</label>
              <input
                type="text"
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Subtitle</label>
              <textarea
                rows={2}
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                required
              />
            </div>
          </div>

          {/* Hero Right-Side Media Playlist (Photos & Up to 20+ Videos) */}
          <div className="space-y-4 p-4 rounded-xl bg-blue-950/20 border border-blue-500/30">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                🎬 Hero Media Playlist ({heroMedia.length} items queued)
              </h3>
              <span className="text-[11px] text-slate-400">Plays sequentially</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 block">Upload Photos & Videos (Select multiple at once)</label>
              <input
                ref={heroMediaInputRef}
                type="file"
                accept="video/*,image/*"
                multiple
                onChange={handleHeroMediaUpload}
                className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-600/20 file:text-cyan-300 hover:file:bg-cyan-600/30 cursor-pointer bg-slate-900 p-2 rounded-lg border border-white/10"
              />
            </div>

            {/* Playlist Queue Manager */}
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {heroMedia.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No media queued yet. Default 3D canvas will show until you upload media.</p>
              ) : (
                heroMedia.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-white/10 text-xs">
                    <div className="flex items-center gap-3 truncate">
                      <span className="text-cyan-400 font-mono">#{idx + 1}</span>
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-300 uppercase">{item.type}</span>
                      <span className="truncate text-white">{item.name || `Media item ${idx + 1}`}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveHeroMedia(item.id)}
                      className="text-red-400 hover:text-red-300 px-2 py-1 rounded bg-red-500/10 border border-red-500/20 text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CEO & Founder Card */}
          <div className="space-y-4 p-4 rounded-xl bg-slate-950/60 border border-white/10">
            <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">★ CEO & Founder Special Card</h3>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Founder Title</label>
              <input
                type="text"
                value={founder.title}
                onChange={(e) => setFounder({ ...founder, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Founder Write-up</label>
              <textarea
                rows={2}
                value={founder.description}
                onChange={(e) => setFounder({ ...founder, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Founder Photo</label>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-slate-950 border border-white/10 overflow-hidden shrink-0">
                  <img src={founder.image} alt="Founder" className="w-full h-full object-cover" />
                </div>
                <input
                  ref={founderFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFounderImageUpload}
                  className="block w-full text-xs text-slate-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600/20 file:text-blue-300 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Add New Story Card */}
          <div className="space-y-4 p-4 rounded-xl bg-slate-950/60 border border-white/10">
            <h3 className="text-xs font-semibold text-violet-400 uppercase tracking-wider">+ Add New Story / Venture Card</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Card Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Ecosystem Expansion"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Category Tag</label>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="e.g. Milestone"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Card Write-up Description</label>
              <textarea
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Enter write-up..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500 resize-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Card Photo</label>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-slate-950 border border-white/10 overflow-hidden shrink-0">
                  <img src={newImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCardImageUpload}
                  className="block w-full text-xs text-slate-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600/20 file:text-blue-300 cursor-pointer"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddCard}
              className="px-4 py-2 rounded-lg bg-violet-600/20 border border-violet-500/40 text-violet-300 text-xs font-semibold hover:bg-violet-600/30 transition-colors"
            >
              + Insert Card into Queue
            </button>
          </div>

          {/* Active Cards Manager */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Manage Active Cards ({cards.length})</h3>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {cards.map((card) => (
                <div key={card.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-white/10 text-xs">
                  <div className="flex items-center gap-3 truncate">
                    <img src={card.image} alt="" className="h-6 w-6 rounded object-cover shrink-0" />
                    <span className="truncate"><strong className="text-blue-400">[{card.tag}]</strong> {card.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteCard(card.id)}
                    className="text-red-400 hover:text-red-300 px-2 py-1 rounded bg-red-500/10 border border-red-500/20 text-[10px]"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          {errorMsg && <div className="p-3 rounded-xl bg-red-500/10 text-red-400 text-xs text-center">{errorMsg}</div>}
          {saved && <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs text-center font-medium">✓ Saved & Synced Live!</div>}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold">Save All Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}