import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Star, Globe, Lock, Plus, X } from 'lucide-react';

const DEFAULT_HOME = 'about:home';
const BOOKMARKS_KEY = 'curtains-xp-bookmarks-v2';

const loadBookmarks = (): { title: string; url: string }[] => {
  try { return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]'); } catch { return []; }
};
const saveBookmarks = (bm: { title: string; url: string }[]) =>
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bm));

const resolveUrl = (raw: string): string => {
  const t = raw.trim();
  if (!t || t === DEFAULT_HOME) return DEFAULT_HOME;
  if (/^https?:\/\//i.test(t)) return t;
  if (!t.includes(' ') && t.includes('.')) return `https://${t}`;
  return `https://www.google.com/search?q=${encodeURIComponent(t)}`;
};

interface Tab { id: string; url: string; title: string; history: string[]; historyIndex: number; loading: boolean; }
let tid = 0;
const newTab = (url = DEFAULT_HOME): Tab => ({
  id: `t${++tid}`, url, title: url === DEFAULT_HOME ? 'New Tab' : url,
  history: [url], historyIndex: 0, loading: false,
});

const QUICK_LINKS = [
  { icon: '🔍', label: 'Google', url: 'https://www.google.com' },
  { icon: '📺', label: 'YouTube', url: 'https://www.youtube.com' },
  { icon: '📰', label: 'Wikipedia', url: 'https://en.wikipedia.org' },
  { icon: '💻', label: 'GitHub', url: 'https://github.com' },
  { icon: '📧', label: 'Gmail', url: 'https://mail.google.com' },
  { icon: '🗺️', label: 'Maps', url: 'https://maps.google.com' },
  { icon: '📁', label: 'Drive', url: 'https://drive.google.com' },
  { icon: '🌤️', label: 'Weather', url: 'https://wttr.in' },
];

export const Browser: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([newTab()]);
  const [activeId, setActiveId] = useState(tabs[0].id);
  const [addressInput, setAddressInput] = useState('');
  const [bookmarks, setBookmarks] = useState(loadBookmarks);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const active = tabs.find(t => t.id === activeId) || tabs[0];

  useEffect(() => {
    setAddressInput(active.url === DEFAULT_HOME ? '' : active.url);
  }, [active.url, activeId]);

  const patch = useCallback((id: string, p: Partial<Tab>) =>
    setTabs(prev => prev.map(t => t.id === id ? { ...t, ...p } : t)), []);

  const navigate = (rawUrl: string, tabId = activeId) => {
    const url = resolveUrl(rawUrl);
    setTabs(prev => prev.map(t => {
      if (t.id !== tabId) return t;
      const h = [...t.history.slice(0, t.historyIndex + 1), url];
      return { ...t, url, title: url === DEFAULT_HOME ? 'New Tab' : url, history: h, historyIndex: h.length - 1, loading: url !== DEFAULT_HOME };
    }));
    if (tabId === activeId) setAddressInput(url === DEFAULT_HOME ? '' : url);
  };

  const goBack = () => setTabs(prev => prev.map(t => {
    if (t.id !== activeId || t.historyIndex <= 0) return t;
    const i = t.historyIndex - 1;
    return { ...t, url: t.history[i], historyIndex: i, loading: t.history[i] !== DEFAULT_HOME };
  }));

  const goForward = () => setTabs(prev => prev.map(t => {
    if (t.id !== activeId || t.historyIndex >= t.history.length - 1) return t;
    const i = t.historyIndex + 1;
    return { ...t, url: t.history[i], historyIndex: i, loading: t.history[i] !== DEFAULT_HOME };
  }));

  const addNewTab = () => { const t = newTab(); setTabs(p => [...p, t]); setActiveId(t.id); };
  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTabs(prev => {
      const rest = prev.filter(t => t.id !== id);
      if (rest.length === 0) { const t = newTab(); setActiveId(t.id); return [t]; }
      if (id === activeId) setActiveId(rest[rest.length - 1].id);
      return rest;
    });
  };

  const toggleBookmark = () => {
    const url = active.url;
    if (url === DEFAULT_HOME) return;
    const exists = bookmarks.find(b => b.url === url);
    const next = exists ? bookmarks.filter(b => b.url !== url) : [...bookmarks, { title: active.title, url }];
    setBookmarks(next); saveBookmarks(next);
  };

  const isBookmarked = bookmarks.some(b => b.url === active.url);
  const canBack = active.historyIndex > 0;
  const canForward = active.historyIndex < active.history.length - 1;
  const isSecure = active.url.startsWith('https://');

  return (
    <div className="flex flex-col h-full select-none" style={{ background: '#D4D0C8', fontFamily: 'Tahoma, sans-serif' }}>

      {/* ── Tab Bar ── */}
      <div className="flex items-end overflow-x-auto flex-shrink-0" style={{ background: '#C0C0C0', borderBottom: '1px solid #808080', minHeight: 26 }}>
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => setActiveId(tab.id)}
            className="flex items-center gap-1 px-3 py-1 cursor-pointer group flex-shrink-0 relative"
            style={{
              maxWidth: 160, minWidth: 80,
              background: tab.id === activeId ? '#D4D0C8' : '#B8B4AC',
              borderLeft: '1px solid #808080', borderRight: '1px solid #808080',
              borderTop: tab.id === activeId ? '2px solid #316AC5' : '1px solid #808080',
              marginTop: tab.id === activeId ? 0 : 2,
            }}
          >
            <Globe size={10} className="flex-shrink-0 text-blue-600" />
            <span className="text-[11px] truncate flex-1">
              {tab.title.replace(/^https?:\/\//, '').slice(0, 18) || 'New Tab'}
            </span>
            <span
              onClick={(e) => closeTab(tab.id, e)}
              className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-600 text-xs px-0.5 cursor-pointer"
            >×</span>
          </div>
        ))}
        <button onClick={addNewTab} className="px-2 py-1 text-xs hover:bg-[#A0A0A0] flex-shrink-0" title="New tab">
          <Plus size={11} />
        </button>
      </div>

      {/* ── Toolbar Row 1: Back/Forward/Refresh/Home + Address + Go ── */}
      <div className="flex items-center gap-1 px-2 py-1 flex-shrink-0" style={{ background: '#ECE9D8', borderBottom: '1px solid #ACA899' }}>
        {/* Nav buttons */}
        <button onClick={goBack} disabled={!canBack} title="Back"
          className="xp-button w-7 h-6 flex items-center justify-center disabled:opacity-40">
          <ArrowLeft size={13} />
        </button>
        <button onClick={goForward} disabled={!canForward} title="Forward"
          className="xp-button w-7 h-6 flex items-center justify-center disabled:opacity-40">
          <ArrowRight size={13} />
        </button>
        <button onClick={() => { patch(activeId, { loading: true }); if (iframeRef.current) { try { iframeRef.current.src = iframeRef.current.src; } catch {} } }} title="Refresh"
          className="xp-button w-7 h-6 flex items-center justify-center">
          <RotateCw size={13} className={active.loading ? 'animate-spin' : ''} />
        </button>
        <button onClick={() => navigate(DEFAULT_HOME)} title="Home"
          className="xp-button w-7 h-6 flex items-center justify-center">
          <Home size={13} />
        </button>

        {/* Address bar */}
        <div className="flex-1 flex items-center gap-1 ml-1">
          <span className="text-[11px] text-gray-600 font-bold">Address</span>
          <form onSubmit={e => { e.preventDefault(); navigate(addressInput); }} className="flex-1 flex items-center gap-1">
            <div className="flex-1 flex items-center bg-white border border-gray-400 px-1.5 h-[22px] gap-1">
              {active.url !== DEFAULT_HOME && (
                isSecure
                  ? <Lock size={9} className="text-green-600 flex-shrink-0" />
                  : <Globe size={9} className="text-gray-400 flex-shrink-0" />
              )}
              <input
                type="text"
                value={addressInput}
                onChange={e => setAddressInput(e.target.value)}
                placeholder="Type a web address or search..."
                className="flex-1 text-[11px] outline-none bg-transparent"
              />
            </div>
            <button type="submit" className="xp-button text-[11px] px-3 h-[22px]">Go</button>
          </form>
        </div>

        <button onClick={toggleBookmark} title={isBookmarked ? 'Remove favorite' : 'Add to favorites'}
          className="xp-button w-7 h-6 flex items-center justify-center ml-1">
          <Star size={13} className={isBookmarked ? 'text-yellow-500 fill-yellow-400' : ''} />
        </button>
      </div>

      {/* ── Bookmarks Bar ── */}
      {bookmarks.length > 0 && (
        <div className="flex items-center gap-1 px-2 py-0.5 overflow-x-auto flex-shrink-0"
          style={{ background: '#F0EFE7', borderBottom: '1px solid #ACA899' }}>
          <span className="text-[10px] text-gray-500 font-bold mr-1">Links:</span>
          {bookmarks.map((bm, i) => (
            <button key={i} onClick={() => navigate(bm.url)}
              className="text-[10px] px-2 py-0.5 hover:bg-blue-100 whitespace-nowrap flex items-center gap-1 rounded text-blue-700">
              🌐 {bm.title.slice(0, 18)}
            </button>
          ))}
        </div>
      )}

      {/* ── Content ── */}
      <div className="flex-1 relative overflow-hidden">
        {active.url === DEFAULT_HOME ? (
          /* ── Homepage ── */
          <div className="h-full overflow-y-auto" style={{ background: 'linear-gradient(180deg, #1a56c4 0%, #2d7ae0 50%, #3d8ef5 100%)' }}>
            <div className="flex flex-col items-center px-6 py-8">
              {/* Logo */}
              <div className="text-5xl mb-2">🌐</div>
              <h1 className="text-white text-xl font-bold mb-1 drop-shadow">Internet Explorer</h1>
              <p className="text-blue-200 text-xs mb-6">Curtains XP Edition</p>

              {/* Search bar */}
              <form
                onSubmit={e => {
                  e.preventDefault();
                  const v = (e.currentTarget.querySelector('input') as HTMLInputElement).value.trim();
                  if (v) navigate(v);
                }}
                className="w-full max-w-md flex mb-8"
              >
                <input
                  type="text"
                  placeholder="Search or enter web address..."
                  className="flex-1 px-3 py-2 text-sm border-2 border-blue-700 outline-none rounded-l"
                />
                <button type="submit"
                  className="px-4 text-sm font-bold text-white border-2 border-l-0 border-blue-700 rounded-r"
                  style={{ background: 'linear-gradient(to bottom, #2b74c4, #1a5aa0)' }}>
                  Search
                </button>
              </form>

              {/* Quick links */}
              <div className="w-full max-w-md">
                <div
                  className="text-white text-xs font-bold uppercase tracking-wider mb-3 pb-1"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.3)' }}
                >
                  Quick Links
                </div>
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {QUICK_LINKS.map(link => (
                    <button key={link.url} onClick={() => navigate(link.url)}
                      className="flex flex-col items-center gap-1 p-3 rounded transition-colors"
                      style={{ background: 'rgba(255,255,255,0.15)' }}
                      onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
                      onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span className="text-white text-[10px]">{link.label}</span>
                    </button>
                  ))}
                </div>

                {/* Saved favorites */}
                {bookmarks.length > 0 && (
                  <div>
                    <div className="text-white text-xs font-bold uppercase tracking-wider mb-2 pb-1"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.3)' }}>
                      ⭐ Your Favorites
                    </div>
                    <div className="space-y-1">
                      {bookmarks.map((bm, i) => (
                        <button key={i} onClick={() => navigate(bm.url)}
                          className="w-full text-left text-white text-xs px-3 py-1.5 rounded flex items-center gap-2 transition-colors"
                          style={{ background: 'rgba(255,255,255,0.12)' }}
                          onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
                          onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                        >
                          🌐 {bm.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            key={active.url}
            src={active.url}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            onLoad={() => {
              patch(activeId, { loading: false });
              try {
                const t = iframeRef.current?.contentDocument?.title;
                if (t) patch(activeId, { title: t });
              } catch {}
            }}
            onError={() => patch(activeId, { loading: false })}
            title="browser-content"
          />
        )}

        {/* Loading progress bar */}
        {active.loading && (
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: '#dde' }}>
            <div className="h-full bg-blue-500 animate-pulse" style={{ width: '65%' }} />
          </div>
        )}
      </div>

      {/* ── Status Bar ── */}
      <div className="flex items-center justify-between px-2 flex-shrink-0"
        style={{ background: '#D4D0C8', borderTop: '1px solid #808080', height: 20 }}>
        <span className="text-[10px] text-gray-600 truncate max-w-[60%]">
          {active.loading ? '⏳ Opening page...' : active.url === DEFAULT_HOME ? 'Done' : active.url.slice(0, 60)}
        </span>
        <div className="flex items-center gap-3 text-[10px] text-gray-600">
          {isSecure && active.url !== DEFAULT_HOME && (
            <span className="flex items-center gap-0.5 text-green-700"><Lock size={9} /> Secure</span>
          )}
          <span>🌐 Internet</span>
        </div>
      </div>
    </div>
  );
};
