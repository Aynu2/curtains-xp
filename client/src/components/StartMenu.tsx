import React, { useState } from 'react';
import { useOS } from '@/contexts/OSContext';
import { getTheme } from '@/lib/themes';
import { useSoundEffect } from '@/hooks/useSoundEffect';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAppLaunch: (app: string) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onAppLaunch }) => {
  const { theme, username, installedComponents, setScreen } = useOS();
  const { playSound } = useSoundEffect();
  const themeColors = getTheme(theme);
  const [showAllPrograms, setShowAllPrograms] = useState(false);

  if (!isOpen) return null;

  const handleLaunch = (app: string) => {
    playSound('click');
    onAppLaunch(app);
    onClose();
  };

  const handleLogoff = () => {
    playSound('click');
    setScreen('login');
    onClose();
  };

  const handleShutdown = () => {
    playSound('click');
    onClose();
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;inset:0;background:#000;display:flex;align-items:center;justify-content:center;z-index:99999;flex-direction:column;gap:16px;';
    div.innerHTML = `<div style="color:white;font-size:22px;font-weight:bold;">Windows is shutting down...</div><div style="color:#aaa;font-size:13px;">Please wait</div>`;
    document.body.appendChild(div);
    setTimeout(() => {
      setScreen('boot');
      document.body.removeChild(div);
    }, 2500);
  };

  const pinnedLeft = [
    installedComponents.browser && { label: 'Internet Explorer', app: 'browser', icon: '🌐', desc: 'Internet Browser' },
    installedComponents.notepad && { label: 'Notepad', app: 'notepad', icon: '📝', desc: 'Text editor' },
    installedComponents.calculator && { label: 'Calculator', app: 'calculator', icon: '🧮', desc: '' },
    installedComponents.terminal && { label: 'Command Prompt', app: 'terminal', icon: '⌨️', desc: '' },
    installedComponents.games && { label: 'Games', app: 'games', icon: '🎮', desc: '' },
    installedComponents.settings && { label: 'Control Panel', app: 'settings', icon: '⚙️', desc: '' },
  ].filter(Boolean) as { label: string; app: string; icon: string; desc: string }[];

  const allPrograms = [
    { label: 'Notepad', app: 'notepad', icon: '📝' },
    { label: 'Calculator', app: 'calculator', icon: '🧮' },
    { label: 'Command Prompt', app: 'terminal', icon: '⌨️' },
    { label: 'Internet Browser', app: 'browser', icon: '🌐' },
    { label: 'Games', app: 'games', icon: '🎮' },
    { label: 'Paint Pro', app: 'paint-pro', icon: '🎨' },
    { label: 'Media Player', app: 'media-player', icon: '🎬' },
    { label: 'Photo Gallery', app: 'photo-gallery', icon: '📸' },
    { label: 'Code Editor', app: 'code-editor', icon: '💻' },
    { label: 'Spreadsheet', app: 'spreadsheet-pro', icon: '📊' },
    { label: 'Document Editor', app: 'document-editor', icon: '📃' },
    { label: 'Email Client', app: 'email-client', icon: '📧' },
    { label: 'Download Manager', app: 'download-manager', icon: '📥' },
    { label: 'File Search', app: 'file-search', icon: '🔍' },
    { label: 'Backup & Restore', app: 'backup-restore', icon: '💾' },
    { label: 'System Info', app: 'system-info', icon: 'ℹ️' },
    { label: 'App Store', app: 'app-store', icon: '🛍️' },
    { label: 'Control Panel', app: 'settings', icon: '⚙️' },
  ];

  const rightPlaces = [
    { label: 'My Computer', app: 'my-computer', icon: '💻' },
    { label: 'My Documents', app: 'documents', icon: '📁' },
    { label: 'File Explorer', app: 'file-explorer', icon: '📂' },
    { label: 'Control Panel', app: 'settings', icon: '⚙️' },
    { label: 'App Store', app: 'app-store', icon: '🛍️' },
    { label: 'System Info', app: 'system-info', icon: 'ℹ️' },
    { label: 'Search', app: 'file-search', icon: '🔍' },
  ];

  return (
    <div
      className="fixed bottom-[36px] left-0 z-[999] shadow-2xl animate-slideIn"
      style={{ width: '500px' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* User Banner */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{
          background: 'linear-gradient(135deg, #1a56c4 0%, #2b74e0 40%, #1a56c4 100%)',
          borderBottom: '2px solid #0a3a8c',
        }}
      >
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-sm flex items-center justify-center text-2xl border-2 border-white/40 bg-white/10 flex-shrink-0"
        >
          👤
        </div>
        <div>
          <div className="text-white font-bold text-base drop-shadow leading-tight">{username || 'User'}</div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="flex" style={{ minHeight: '340px' }}>
        {/* Left column — Programs */}
        <div className="flex flex-col bg-white" style={{ width: '55%', borderRight: '1px solid #b0c4de' }}>
          {!showAllPrograms ? (
            <>
              <div className="flex-1 overflow-y-auto">
                {pinnedLeft.map((item) => (
                  <button
                    key={item.app}
                    onClick={() => handleLaunch(item.app)}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#316AC5] hover:text-white group transition-colors text-left"
                  >
                    <span className="text-xl w-7 text-center flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="text-xs font-bold leading-tight">{item.label}</div>
                      {item.desc && <div className="text-[10px] text-gray-500 group-hover:text-white/80">{item.desc}</div>}
                    </div>
                  </button>
                ))}
              </div>

              {/* Divider + All Programs */}
              <div className="border-t border-gray-300 mx-2 my-1" />
              <button
                onClick={() => setShowAllPrograms(true)}
                className="flex items-center justify-between px-3 py-2 hover:bg-[#316AC5] hover:text-white w-full text-xs font-bold transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">📋</span>
                  All Programs
                </span>
                <span className="text-sm">▶</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowAllPrograms(false)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-[#316AC5] hover:text-white text-xs font-bold border-b border-gray-200 transition-colors"
              >
                <span>◀</span>
                <span>Back</span>
              </button>
              <div className="flex-1 overflow-y-auto">
                {allPrograms.map((item) => (
                  <button
                    key={item.app}
                    onClick={() => handleLaunch(item.app)}
                    className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#316AC5] hover:text-white transition-colors text-left"
                  >
                    <span className="text-base w-6 text-center flex-shrink-0">{item.icon}</span>
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right column — Places */}
        <div
          className="flex flex-col py-2"
          style={{
            width: '45%',
            background: 'linear-gradient(to bottom, #d6e4f7, #c5d9f1)',
          }}
        >
          {rightPlaces.map((item) => (
            <button
              key={item.app}
              onClick={() => {
                if (item.app === 'my-computer') { handleLaunch('file-explorer'); }
                else if (item.app === 'documents') { handleLaunch('file-explorer'); }
                else { handleLaunch(item.app); }
              }}
              className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#316AC5] hover:text-white transition-colors text-left group"
            >
              <span className="text-base w-6 text-center flex-shrink-0">{item.icon}</span>
              <span className="text-xs font-semibold text-gray-800 group-hover:text-white">{item.label}</span>
            </button>
          ))}

          <div className="border-t border-blue-300 mx-2 my-2" />

          <button
            onClick={() => handleLaunch('file-search')}
            className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#316AC5] hover:text-white transition-colors text-left group"
          >
            <span className="text-base w-6 text-center">🔎</span>
            <span className="text-xs font-semibold text-gray-800 group-hover:text-white">Search</span>
          </button>
          <button
            className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#316AC5] hover:text-white transition-colors text-left group"
          >
            <span className="text-base w-6 text-center">❓</span>
            <span className="text-xs font-semibold text-gray-800 group-hover:text-white">Help and Support</span>
          </button>
          <button
            className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#316AC5] hover:text-white transition-colors text-left group"
          >
            <span className="text-base w-6 text-center">🖥️</span>
            <span className="text-xs font-semibold text-gray-800 group-hover:text-white">Run...</span>
          </button>
        </div>
      </div>

      {/* Footer — Log Off / Turn Off Computer */}
      <div
        className="flex items-center justify-end gap-2 px-4 py-2"
        style={{
          background: 'linear-gradient(to bottom, #c4d9f0, #b0c4de)',
          borderTop: '2px solid #7ca4d0',
        }}
      >
        <button
          onClick={handleLogoff}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-sm border transition-colors"
          style={{
            background: 'linear-gradient(to bottom, #e8f0fb, #c8d8f0)',
            border: '1px solid #7ca4d0',
            color: '#1a1a1a',
          }}
          onMouseOver={e => (e.currentTarget.style.background = 'linear-gradient(to bottom, #316AC5, #1a4fa0)')}
          onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(to bottom, #e8f0fb, #c8d8f0)')}
        >
          <span>🚪</span>
          <span>Log Off</span>
        </button>
        <button
          onClick={handleShutdown}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-sm border transition-colors"
          style={{
            background: 'linear-gradient(to bottom, #e8f0fb, #c8d8f0)',
            border: '1px solid #7ca4d0',
            color: '#1a1a1a',
          }}
          onMouseOver={e => (e.currentTarget.style.background = 'linear-gradient(to bottom, #316AC5, #1a4fa0)')}
          onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(to bottom, #e8f0fb, #c8d8f0)')}
        >
          <span>⏻</span>
          <span>Turn Off Computer</span>
        </button>
      </div>
    </div>
  );
};
