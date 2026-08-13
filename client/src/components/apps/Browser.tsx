import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Search, Home, ArrowLeft, ArrowRight, RotateCw, X, Plus, Star, StarOff, Lock, Globe } from 'lucide-react';

interface Tab {
  id: string;
  url: string;
  title: string;
  history: string[];
  historyIndex: number;
  loading: boolean;
  favicon?: string;
}

const DEFAULT_HOME = 'about:home';

const BOOKMARKS_KEY = 'curtains-xp-bookmarks';
const loadBookmarks = (): { title: string; url: string }[] => {
  try { return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]'); } catch { return []; }
};
const saveBookmarks = (bm: { title: string; url: string }[]) => {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bm));
};

const QUICK_LINKS = [
  { icon: '🔍', label: 'Google', url: 'https://www.google.com' },
  { icon: '📺', label: 'YouTube', url: 'https://www.youtube.com' },
  { icon: '📰', label: 'Wikipedia', url: 'https://en.wikipedia.org' },
  { icon: '💻', label: 'GitHub', url: 'https://github.com' },
  { icon: '🌤️', label: 'Weather', url: 'https://wttr.in' },
  { icon: '📧', label: 'Gmail', url: 'https://mail.google.com' },
  { icon: '🗺️', label: 'Maps', url: 'https://maps.google.com' },
  { icon: '📁', label: 'Drive', url: 'https://drive.google.com' },
];

let tabCounter = 0;
const createTab = (url = DEFAULT_HOME): Tab => ({
  id: `tab-${++tabCounter}`,
  url,
  title: url === DEFAULT_HOME ? 'New Tab' : url,
  history: [url],
  historyIndex: 0,
  loading: false,
});

const resolveUrl = (raw: string): string => {
  const trimmed = raw.trim();
  if (!trimmed || trimmed === DEFAULT_HOME) return DEFAULT_HOME;
  // If it looks like a URL
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  // If it has a dot and no spaces, treat as domain
  if (!trimmed.includes(' ') && trimmed.includes('.')) return `https://${trimmed}`;
  // Otherwise, Google search
  return `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
};

export const Browser: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([createTab()]);
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const [addressInput, setAddressInput] = useState(DEFAULT_HOME);
  const [bookmarks, setBookmarks] = useState<{ title: string; url: string }[]>(loadBookmarks);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    setAddressInput(activeTab.url === DEFAULT_HOME ? '' : activeTab.url);
  }, [activeTab.url, activeTabId]);

  const updateTab = useCallback((id: string, patch: Partial<Tab>) => {
    setTabs(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
  }, []);

  const navigate = (rawUrl: string, tabId = activeTabId) => {
    const url = resolveUrl(rawUrl);
    setTabs(prev => prev.map(t => {
      if (t.id !== tabId) return t;
      const newHistory = [...t.history.slice(0, t.historyIndex + 1), url];
      return { ...t, url, title: url === DEFAULT_HOME ? 'New Tab' : url, history: newHistory, historyIndex: newHistory.length - 1, loading: url !== DEFAULT_HOME };
    }));
    if (tabId === activeTabId) setAddressInput(url === DEFAULT_HOME ? '' : url);
  };

  const goBack = () => {
    setTabs(prev => prev.map(t => {
      if (t.id !== activeTabId || t.historyIndex <= 0) return t;
      const newIndex = t.historyIndex - 1;
      const url = t.history[newIndex];
      return { ...t, url, historyIndex: newIndex, loading: url !== DEFAULT_HOME };
    }));
  };

  const goForward = () => {
    setTabs(prev => prev.map(t => {
      if (t.id !== activeTabId || t.historyIndex >= t.history.length - 1) return t;
      const newIndex = t.historyIndex + 1;
      const url = t.history[newIndex];
      return { ...t, url, historyIndex: newIndex, loading: url !== DEFAULT_HOME };
    }));
  };

  const reload = () => {
    if (activeTab.url === DEFAULT_HOME) return;
    updateTab(activeTabId, { loading: true });
    if (iframeRef.current) {
      try { iframeRef.current.src = iframeRef.current.src; } catch {}
    }
  };

  const addTab = () => {
    const tab = createTab();
    setTabs(prev => [...prev, tab]);
    setActiveTabId(tab.id);
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTabs(prev => {
      const remaining = prev.filter(t => t.id !== id);
      if (remaining.length === 0) {
        const t = createTab();
        setActiveTabId(t.id);
        return [t];
      }
      if (id === activeTabId) setActiveTabId(remaining[remaining.length - 1].id);
      return remaining;
    });
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(addressInput);
  };

  const toggleBookmark = () => {
    const url = activeTab.url;
    if (url === DEFAULT_HOME) return;
    const exists = bookmarks.find(b => b.url === url);
    let next: { title: string; url: string }[];
    if (exists) {
      next = bookmarks.filter(b => b.url !== url);
    } else {
      next = [...bookmarks, { title: activeTab.title || url, url }];
    }
    setBookmarks(next);
    saveBookmarks(next);
  };

  const isBookmarked = bookmarks.some(b => b.url === activeTab.url);
  const canBack = activeTab.historyIndex > 0;
  const canForward = activeTab.historyIndex < activeTab.history.length - 1;
  const isSecure = activeTab.url.startsWith('https://');

  return (
    <div className="flex flex-col h-full bg-[#D4D0C8] select-none">
      {/* Tab Bar */}
      <div className="flex items-end bg-[#C0C0C0] border-b border-gray-500 overflow-x-auto min-h-[28px]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`flex items-center gap-1 px-3 py-1 text-[11px] border-r border-gray-400 max-w-[160px] min-w-[80px] group relative flex-shrink-0 transition-colors ${
              tab.id === activeTabId
                ? 'bg-[#DFDFDF] border-t-2 border-t-blue-500 font-semibold'
                : 'bg-[#B8B8B8] hover:bg-[#CBCBCB]'
            }`}
          >
            <Globe size={10} className="flex-shrink-0 text-blue-600" />
            <span className="truncate flex-1 text-left">
              {tab.title.replace(/^https?:\/\//, '').slice(0, 20) || 'New Tab'}
            </span>
            <span
              onClick={(e) => closeTab(tab.id, e)}
              className="opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white rounded px-0.5 cursor-pointer"
            >
              ×
            </span>
          </button>
        ))}
        <button
          onClick={addTab}
          className="px-2 py-1 text-xs hover:bg-[#CBCBCB] flex-shrink-0"
          title="New tab"
        >
          <Plus size={12} />
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-[#D4D0C8] border-b border-gray-400 px-2 py-1 flex gap-1 items-center">
        <button
          onClick={goBack}
          disabled={!canBack}
          className="xp-button p-1 w-7 h-7 flex items-center justify-center text-xs disabled:opacity-40"
          title="Back"
        >
          <ArrowLeft size={14} />
        </button>
        <button
          onClick={goForward}
          disabled={!canForward}
          className="xp-button p-1 w-7 h-7 flex items-center justify-center text-xs disabled:opacity-40"
          title="Forward"
        >
          <ArrowRight size={14} />
        </button>
        <button
          onClick={reload}
          disabled={activeTab.url === DEFAULT_HOME}
          className="xp-button p-1 w-7 h-7 flex items-center justify-center text-xs disabled:opacity-40"
          title="Reload"
        >
          <RotateCw size={14} className={activeTab.loading ? 'animate-spin' : ''} />
        </button>
        <button
          onClick={() => navigate(DEFAULT_HOME)}
          className="xp-button p-1 w-7 h-7 flex items-center justify-center text-xs"
          title="Home"
        >
          <Home size={14} />
        </button>

        {/* Address bar */}
        <form onSubmit={handleAddressSubmit} className="flex-1 flex gap-1 items-center">
          <div className="flex-1 flex items-center bg-white border-2 border-gray-400 px-2 h-6 gap-1">
            {isSecure && activeTab.url !== DEFAULT_HOME
              ? <Lock size={10} className="text-green-600 flex-shrink-0" />
              : <Globe size={10} className="text-gray-400 flex-shrink-0" />
            }
            <input
              type="text"
              value={addressInput}
              onChange={e => setAddressInput(e.target.value)}
              placeholder="Search or enter address..."
              className="flex-1 text-[11px] outline-none bg-transparent"
            />
          </div>
          <button type="submit" className="xp-button text-xs px-3 h-6">Go</button>
        </form>

        <button
          onClick={toggleBookmark}
          className="xp-button p-1 w-7 h-7 flex items-center justify-center text-xs"
          title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {isBookmarked ? <Star size={13} className="text-yellow-500 fill-yellow-400" /> : <Star size={13} />}
        </button>
        <button
          onClick={() => setShowBookmarks(p => !p)}
          className={`xp-button text-[10px] px-2 h-6 ${showBookmarks ? 'ring-1 ring-blue-500' : ''}`}
        >
          ⭐ Favorites
        </button>
      </div>

      {/* Bookmarks bar */}
      {bookmarks.length > 0 && (
        <div className="bg-[#E8E4DC] border-b border-gray-300 px-2 py-0.5 flex gap-1 overflow-x-auto">
          {bookmarks.map((bm, i) => (
            <button
              key={i}
              onClick={() => navigate(bm.url)}
              className="text-[10px] px-2 py-0.5 hover:bg-blue-100 rounded whitespace-nowrap flex items-center gap-1"
            >
              <Globe size={9} className="text-blue-500" />
              {bm.title.slice(0, 20)}
            </button>
          ))}
        </div>
      )}

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Favorites panel */}
        {showBookmarks && (
          <div className="w-44 bg-[#EAE8E0] border-r-2 border-gray-400 flex flex-col overflow-hidden">
            <div className="bg-[#003399] text-white text-[11px] font-bold px-2 py-1">Favorites</div>
            <div className="flex-1 overflow-y-auto p-1 space-y-0.5">
              {bookmarks.length === 0 && <p className="text-[10px] text-gray-500 px-1 pt-2">No favorites yet.</p>}
              {bookmarks.map((bm, i) => (
                <div key={i} className="flex items-center group">
                  <button
                    onClick={() => navigate(bm.url)}
                    className="flex-1 text-left text-[11px] px-1 py-0.5 hover:bg-blue-100 truncate"
                  >
                    🌐 {bm.title.slice(0, 22)}
                  </button>
                  <button
                    onClick={() => {
                      const next = bookmarks.filter((_, idx) => idx !== i);
                      setBookmarks(next);
                      saveBookmarks(next);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-red-500 text-[10px] px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 relative overflow-hidden">
          {activeTab.url === DEFAULT_HOME ? (
            /* Homepage */
            <div className="h-full overflow-y-auto bg-gradient-to-b from-[#1E5AA0] to-[#3A8FC8] flex flex-col">
              <div className="text-center pt-6 pb-4">
                <div className="text-4xl mb-1">🌐</div>
                <h1 className="text-white text-xl font-bold drop-shadow">Curtains XP Internet Explorer</h1>
                <p className="text-blue-200 text-xs mt-1">The Web at Your Fingertips</p>
              </div>

              {/* Search */}
              <div className="mx-4 mb-4">
                <form
                  onSubmit={e => { e.preventDefault(); const v = (e.currentTarget.querySelector('input') as HTMLInputElement).value; if (v) navigate(v); }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    placeholder="🔍 Search the web or enter an address..."
                    className="flex-1 px-3 py-2 text-sm rounded-l border-2 border-blue-700 outline-none"
                  />
                  <button type="submit" className="bg-[#2B74C4] hover:bg-[#1A5AA0] text-white px-4 text-sm rounded-r border-2 border-blue-700">
                    Search
                  </button>
                </form>
              </div>

              {/* Quick Links */}
              <div className="mx-4 mb-4">
                <div className="bg-white/10 rounded p-3">
                  <p className="text-blue-100 text-[11px] font-bold mb-2 uppercase tracking-wide">Quick Links</p>
                  <div className="grid grid-cols-4 gap-2">
                    {QUICK_LINKS.map(link => (
                      <button
                        key={link.url}
                        onClick={() => navigate(link.url)}
                        className="bg-white/20 hover:bg-white/30 rounded p-2 text-center transition-colors"
                      >
                        <div className="text-lg">{link.icon}</div>
                        <div className="text-white text-[10px] mt-1">{link.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bookmarks */}
              {bookmarks.length > 0 && (
                <div className="mx-4 mb-4">
                  <div className="bg-white/10 rounded p-3">
                    <p className="text-blue-100 text-[11px] font-bold mb-2 uppercase tracking-wide">⭐ Your Favorites</p>
                    <div className="space-y-1">
                      {bookmarks.map((bm, i) => (
                        <button
                          key={i}
                          onClick={() => navigate(bm.url)}
                          className="block w-full text-left text-white text-xs hover:bg-white/20 px-2 py-1 rounded truncate"
                        >
                          🌐 {bm.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center text-blue-300 text-[10px] pb-4">
                Curtains XP Internet Explorer v6.0 — Enter an address above to browse the web
              </div>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              key={activeTab.url}
              src={activeTab.url}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              onLoad={() => {
                updateTab(activeTabId, { loading: false });
                try {
                  const title = iframeRef.current?.contentDocument?.title;
                  if (title) updateTab(activeTabId, { title });
                } catch {}
              }}
              onError={() => updateTab(activeTabId, { loading: false })}
              title="browser-frame"
            />
          )}

          {/* Loading bar */}
          {activeTab.loading && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-200">
              <div className="h-full bg-blue-500 animate-pulse" style={{ width: '60%' }} />
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-[#D4D0C8] border-t border-gray-400 px-2 py-0.5 flex justify-between items-center">
        <span className="text-[10px] text-gray-600">
          {activeTab.loading ? '⏳ Loading...' : activeTab.url === DEFAULT_HOME ? 'Ready' : `🌐 ${activeTab.url.slice(0, 60)}`}
        </span>
        <div className="flex items-center gap-2 text-[10px] text-gray-600">
          {isSecure && activeTab.url !== DEFAULT_HOME && (
            <span className="flex items-center gap-1 text-green-700"><Lock size={9} /> Secure</span>
          )}
          <span>Internet</span>
        </div>
      </div>
    </div>
  );
};
