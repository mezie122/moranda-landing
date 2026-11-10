'use client';

import React, { useState } from 'react';

export default function AdminPanel({
  isOpen,
  onClose,
  siteState,
  onUpdateSiteState,
}: {
  isOpen: boolean;
  onClose: () => void;
  siteState: any;
  onUpdateSiteState: (newState: any) => void;
}) {
  const [activeTab, setActiveTab] = useState<'hero' | 'socials' | 'portfolio' | 'founder' | 'awards' | 'team'>('hero');

  const [hero, setHero] = useState(siteState.hero);
  const [socials, setSocials] = useState(siteState.socials);
  const [portfolio, setPortfolio] = useState(siteState.portfolio);
  const [founder, setFounder] = useState(siteState.founder);
  const [awards, setAwards] = useState(siteState.awards);
  const [team, setTeam] = useState(siteState.team);

  const [newPortfolio, setNewPortfolio] = useState({ title: '', category: '', description: '', link: '#', tag: 'Venture' });
  const [newAward, setNewAward] = useState({ title: '', issuer: '', year: '2026', tag: 'Award' });
  const [newMember, setNewMember] = useState({ name: '', role: '', focus: '' });

  if (!isOpen) return null;

  // Handle local image file upload converting to object URL for immediate live UI display
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, targetField: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (targetField === 'founder') {
        setFounder({ ...founder, photo: imageUrl });
      }
    }
  };

  const handleSave = () => {
    onUpdateSiteState({
      hero,
      socials,
      portfolio,
      founder,
      awards,
      team,
    });
    alert('Full site state updated successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative text-slate-100 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-xl font-bold text-white">MORANDA Master CMS Admin</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 my-4 overflow-x-auto pb-2 border-b border-slate-800 shrink-0 text-xs">
          {[
            { id: 'hero', label: 'Hero Settings' },
            { id: 'socials', label: 'Social Networks' },
            { id: 'portfolio', label: 'Portfolio Cards' },
            { id: 'founder', label: 'Founder & Photo' },
            { id: 'awards', label: 'Awards & Certs' },
            { id: 'team', label: 'Workforce Team' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 uppercase">Hero & Headline Control</h3>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Main Title</label>
                <input type="text" value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs" />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Subtitle</label>
                <textarea rows={3} value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs" />
              </div>
            </div>
          )}

          {activeTab === 'socials' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 uppercase">Manage Social Networks & Links</h3>
              {socials.map((soc: any, idx: number) => (
                <div key={soc.id} className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs items-center">
                  <span className="font-bold text-white">{soc.name}</span>
                  <input
                    type="text"
                    value={soc.url}
                    onChange={(e) => {
                      const updated = [...socials];
                      updated[idx].url = e.target.value;
                      setSocials(updated);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs"
                    placeholder="Profile URL"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 uppercase">Add & Manage Portfolio Cards</h3>
              <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <input type="text" placeholder="Venture Title" value={newPortfolio.title} onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800" />
                <input type="text" placeholder="Category (e.g. Media / AI)" value={newPortfolio.category} onChange={(e) => setNewPortfolio({ ...newPortfolio, category: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800" />
                <input type="text" placeholder="Live URL (e.g. https://...)" value={newPortfolio.link} onChange={(e) => setNewPortfolio({ ...newPortfolio, link: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800" />
                <textarea placeholder="Description..." value={newPortfolio.description} onChange={(e) => setNewPortfolio({ ...newPortfolio, description: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800" />
                <button
                  onClick={() => {
                    if (newPortfolio.title) {
                      setPortfolio([...portfolio, { ...newPortfolio, id: Date.now().toString(), tag: 'Active Venture', badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' }]);
                      setNewPortfolio({ title: '', category: '', description: '', link: '#', tag: 'Venture' });
                    }
                  }}
                  className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-bold"
                >
                  + Create Portfolio Card
                </button>
              </div>

              {portfolio.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div><span className="font-bold text-white">{p.title}</span></div>
                  <button onClick={() => setPortfolio(portfolio.filter((item: any) => item.id !== p.id))} className="text-red-400 font-bold">Delete</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'founder' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 uppercase">Founder Profile & Device Photo Upload</h3>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Upload Founder Photo from Device</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'founder')}
                  className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500 file:text-slate-950 hover:file:bg-cyan-400 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Full Name</label>
                <input type="text" value={founder.name} onChange={(e) => setFounder({ ...founder, name: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs" />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Bio</label>
                <textarea rows={3} value={founder.bio} onChange={(e) => setFounder({ ...founder, bio: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs" />
              </div>
            </div>
          )}

          {activeTab === 'awards' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 uppercase">Manage Awards & Certificates</h3>
              <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <input type="text" placeholder="Award / Certificate Title" value={newAward.title} onChange={(e) => setNewAward({ ...newAward, title: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800" />
                <input type="text" placeholder="Issuer Organization" value={newAward.issuer} onChange={(e) => setNewAward({ ...newAward, issuer: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800" />
                <button
                  onClick={() => {
                    if (newAward.title) {
                      setAwards([...awards, { ...newAward, id: Date.now().toString() }]);
                      setNewAward({ title: '', issuer: '', year: '2026', tag: 'Award' });
                    }
                  }}
                  className="w-full py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-bold"
                >
                  + Add Award Card
                </button>
              </div>

              {awards.map((a: any) => (
                <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div><span className="font-bold text-white">{a.title}</span></div>
                  <button onClick={() => setAwards(awards.filter((item: any) => item.id !== a.id))} className="text-red-400 font-bold">Delete</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 uppercase">Manage Workforce & Team</h3>
              <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <input type="text" placeholder="Member Name" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800" />
                <input type="text" placeholder="Role" value={newMember.role} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800" />
                <input type="text" placeholder="Focus Area" value={newMember.focus} onChange={(e) => setNewMember({ ...newMember, focus: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800" />
                <button
                  onClick={() => {
                    if (newMember.name) {
                      setTeam([...team, { ...newMember, id: Date.now().toString() }]);
                      setNewMember({ name: '', role: '', focus: '' });
                    }
                  }}
                  className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-bold"
                >
                  + Add Team Member Card
                </button>
              </div>

              {team.map((t: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div><span className="font-bold text-white">{t.name}</span> <span className="text-slate-500">({t.role})</span></div>
                  <button onClick={() => setTeam(team.filter((_: any, i: number) => i !== idx))} className="text-red-400 font-bold">Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 shrink-0 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs">Cancel</button>
          <button onClick={handleSave} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-lg">Apply All UI Changes</button>
        </div>
      </div>
    </div>
  );
}