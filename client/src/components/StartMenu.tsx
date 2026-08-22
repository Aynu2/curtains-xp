import React, { useState } from 'react';
import { useOS } from '@/contexts/OSContext';
import { useSoundEffect } from '@/hooks/useSoundEffect';
import {
  IconMyComputer,
  IconNetworkPlaces,
  IconMyDocuments,
  IconMyMusic,
  IconMyPictures,
  IconControlPanel,
  IconHelp,
  IconUserAccounts,
  IconInternet,
  IconNetworkGroup,
  IconWindow,
  IconSecurity,
  IconNotepad,
  IconCalculator,
  IconTerminal,
  IconGames,
  IconPaint,
  IconMediaPlayer,
  IconEmail,
  IconSearch,
  IconRun,
  IconLogoff,
  IconTurnOff,
  renderXPIcon,
} from './XPIcons';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAppLaunch: (app: string) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onAppLaunch }) => {
  const { username, setScreen } = useOS();
  const { playSound } = useSoundEffect();
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
    div.style.cssText =
      'position:fixed;inset:0;background:#000;display:flex;align-items:center;justify-content:center;z-index:99999;flex-direction:column;gap:16px;font-family:Tahoma,sans-serif;';
    div.innerHTML = `<div style="color:white;font-size:22px;font-weight:bold;">Curtains is shutting down...</div><div style="color:#aaa;font-size:13px;">Please wait</div>`;
    document.body.appendChild(div);
    setTimeout(() => {
      setScreen('boot');
      document.body.removeChild(div);
    }, 2500);
  };

  const pinnedPrograms = [
    {
      id: 'browser',
      title: 'Internet',
      subtitle: 'Internet Explorer',
      icon: <IconInternet size={32} />,
    },
    {
      id: 'email-client',
      title: 'E-mail',
      subtitle: 'Outlook Express',
      icon: <IconEmail size={32} />,
    },
  ];

  const recentPrograms = [
    { id: 'notepad', title: 'Notepad', icon: <IconNotepad size={30} /> },
    { id: 'paint-pro', title: 'Paint Pro', icon: <IconPaint size={30} /> },
    { id: 'media-player', title: 'Windows Media Player', icon: <IconMediaPlayer size={30} /> },
    { id: 'calculator', title: 'Calculator', icon: <IconCalculator size={30} /> },
    { id: 'terminal', title: 'Command Prompt', icon: <IconTerminal size={30} /> },
    { id: 'games', title: 'Games', icon: <IconGames size={30} /> },
  ];

  const allProgramsList = [
    { id: 'browser', title: 'Internet Explorer', icon: <IconInternet size={20} /> },
    { id: 'email-client', title: 'Outlook Express', icon: <IconEmail size={20} /> },
    { id: 'media-player', title: 'Windows Media Player', icon: <IconMediaPlayer size={20} /> },
    { id: 'paint-pro', title: 'Paint', icon: <IconPaint size={20} /> },
    { id: 'notepad', title: 'Notepad', icon: <IconNotepad size={20} /> },
    { id: 'calculator', title: 'Calculator', icon: <IconCalculator size={20} /> },
    { id: 'terminal', title: 'Command Prompt', icon: <IconTerminal size={20} /> },
    { id: 'games', title: 'Games', icon: <IconGames size={20} /> },
    { id: 'photo-gallery', title: 'Windows Picture Viewer', icon: <IconMyPictures size={20} /> },
    { id: 'code-editor', title: 'Code Editor', icon: <IconNotepad size={20} /> },
    { id: 'spreadsheet-pro', title: 'Spreadsheet Pro', icon: <IconCalculator size={20} /> },
    { id: 'document-editor', title: 'WordPad', icon: <IconMyDocuments size={20} /> },
    { id: 'download-manager', title: 'Download Manager', icon: <IconWindow size={20} /> },
    { id: 'file-search', title: 'Search Companion', icon: <IconSearch size={20} /> },
    { id: 'backup-restore', title: 'Backup Utility', icon: <IconSecurity size={20} /> },
    { id: 'settings', title: 'Control Panel', icon: <IconControlPanel size={20} /> },
    { id: 'system-info', title: 'System Information', icon: <IconMyComputer size={20} /> },
  ];

  return (
    <div
      className="fixed bottom-[32px] left-0 z-[9999] select-none shadow-[4px_4px_16px_rgba(0,0,0,0.6)] flex flex-col font-sans"
      style={{
        width: '420px',
        borderRadius: '7px 7px 0 0',
        background: '#1F53B7',
        border: '1px solid #002275',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 3px 3px 12px rgba(0,0,0,0.55)',
        fontFamily: '"Tahoma", "Segoe UI", "Arial", sans-serif',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1. Header Banner */}
      <div
        className="flex items-center gap-3 px-3 py-2.5 relative"
        style={{
          borderRadius: '6px 6px 0 0',
          background: 'linear-gradient(to right, #1C5EC8 0%, #2974DF 50%, #1A56C4 100%)',
          borderBottom: '1px solid #0E3D94',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        {/* Framed Profile Picture */}
        <div
          className="w-11 h-11 rounded-[3px] bg-white p-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.4)] flex items-center justify-center flex-shrink-0"
          style={{ border: '2px solid #FFFFFF' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] flex items-center justify-center overflow-hidden rounded-[1px]">
            <IconUserAccounts size={32} />
          </div>
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <span
            className="text-white text-[15px] font-bold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
          >
            {username || 'Administrator'}
          </span>
        </div>
      </div>

      {/* 2. Two-Column Body */}
      <div className="flex relative" style={{ height: '380px' }}>
        {/* Left Column (White Background - Programs) */}
        <div
          className="w-[54%] bg-white flex flex-col justify-between p-1.5 overflow-hidden"
          style={{ borderRight: '1px solid #95B4DC' }}
        >
          {!showAllPrograms ? (
            <div className="flex flex-col h-full justify-between">
              {/* Top Pinned Programs */}
              <div className="flex flex-col gap-0.5">
                {pinnedPrograms.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleLaunch(item.id)}
                    className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-[2px] text-left group hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[11px] font-bold text-[#111827] group-hover:text-white truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-[#6B7280] group-hover:text-[#E0E7FF] truncate">
                        {item.subtitle}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Etched Divider */}
              <div
                className="my-1.5 h-[1px] w-full"
                style={{
                  background: 'linear-gradient(to right, transparent, #CBD5E1 15%, #CBD5E1 85%, transparent)',
                }}
              />

              {/* Recent / Frequently Used Programs */}
              <div className="flex flex-col gap-0.5 flex-1 overflow-y-auto">
                {recentPrograms.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleLaunch(item.id)}
                    className="w-full flex items-center gap-2 px-2 py-1 rounded-[2px] text-left group hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <span className="text-[11px] text-[#1F2937] group-hover:text-white truncate font-normal">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>

              {/* Etched Divider */}
              <div
                className="my-1.5 h-[1px] w-full"
                style={{
                  background: 'linear-gradient(to right, transparent, #CBD5E1 15%, #CBD5E1 85%, transparent)',
                }}
              />

              {/* All Programs Button */}
              <button
                onClick={() => setShowAllPrograms(true)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-[2px] font-bold text-[12px] text-[#111827] hover:bg-[#2F71CD] hover:text-white group transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">All Programs</span>
                <span className="w-4 h-4 rounded-full bg-[#388E3C] text-white text-[10px] flex items-center justify-center group-hover:bg-white group-hover:text-[#388E3C] shadow-sm">
                  ▶
                </span>
              </button>
            </div>
          ) : (
            /* All Programs View */
            <div className="flex flex-col h-full">
              <button
                onClick={() => setShowAllPrograms(false)}
                className="w-full flex items-center gap-2 px-2 py-1.5 font-bold text-[11px] text-[#1E40AF] hover:bg-[#2F71CD] hover:text-white rounded-[2px] transition-colors border-b border-gray-200 mb-1"
              >
                <span>◀</span>
                <span>Back</span>
              </button>
              <div className="flex-1 overflow-y-auto flex flex-col gap-0.5 pr-1">
                {allProgramsList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleLaunch(item.id)}
                    className="w-full flex items-center gap-2 px-2 py-1 rounded-[2px] text-left group hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <span className="text-[11px] text-[#1F2937] group-hover:text-white truncate">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Light Blue Luna Gradient - Places & System) */}
        <div
          className="w-[46%] flex flex-col justify-between p-1.5 overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #D4E5FA 0%, #C4D7F0 100%)',
          }}
        >
          {/* Top Places (Bold) */}
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => handleLaunch('file-explorer')}
              className="w-full flex items-center gap-2 px-2 py-1 rounded-[2px] text-left group hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer"
            >
              <IconMyDocuments size={24} className="flex-shrink-0" />
              <span className="text-[11px] font-bold text-[#0F172A] group-hover:text-white truncate">
                My Documents
              </span>
            </button>
            <button
              onClick={() => handleLaunch('photo-gallery')}
              className="w-full flex items-center gap-2 px-2 py-1 rounded-[2px] text-left group hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer"
            >
              <IconMyPictures size={24} className="flex-shrink-0" />
              <span className="text-[11px] font-bold text-[#0F172A] group-hover:text-white truncate">
                My Pictures
              </span>
            </button>
            <button
              onClick={() => handleLaunch('media-player')}
              className="w-full flex items-center gap-2 px-2 py-1 rounded-[2px] text-left group hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer"
            >
              <IconMyMusic size={24} className="flex-shrink-0" />
              <span className="text-[11px] font-bold text-[#0F172A] group-hover:text-white truncate">
                My Music
              </span>
            </button>
            <button
              onClick={() => handleLaunch('file-explorer')}
              className="w-full flex items-center gap-2 px-2 py-1 rounded-[2px] text-left group hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer"
            >
              <IconMyComputer size={24} className="flex-shrink-0" />
              <span className="text-[11px] font-bold text-[#0F172A] group-hover:text-white truncate">
                My Computer
              </span>
            </button>
            <button
              onClick={() => handleLaunch('file-explorer')}
              className="w-full flex items-center gap-2 px-2 py-1 rounded-[2px] text-left group hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer"
            >
              <IconNetworkPlaces size={24} className="flex-shrink-0" />
              <span className="text-[11px] font-normal text-[#1E293B] group-hover:text-white truncate">
                My Network Places
              </span>
            </button>
          </div>

          {/* Etched Divider */}
          <div
            className="my-1 h-[1px] w-full"
            style={{
              background: 'linear-gradient(to right, transparent, #9BB9E0 15%, #9BB9E0 85%, transparent)',
            }}
          />

          {/* Middle Tier (Control Panel, etc.) */}
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => handleLaunch('settings')}
              className="w-full flex items-center gap-2 px-2 py-1 rounded-[2px] text-left group hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer"
            >
              <IconControlPanel size={24} className="flex-shrink-0" />
              <span className="text-[11px] font-normal text-[#1E293B] group-hover:text-white truncate">
                Control Panel
              </span>
            </button>
            <button
              onClick={() => handleLaunch('app-store')}
              className="w-full flex items-center gap-2 px-2 py-1 rounded-[2px] text-left group hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer"
            >
              <IconWindow size={24} className="flex-shrink-0" />
              <span className="text-[11px] font-normal text-[#1E293B] group-hover:text-white truncate">
                Program Access &amp; Defaults
              </span>
            </button>
            <button
              onClick={() => handleLaunch('browser')}
              className="w-full flex items-center gap-2 px-2 py-1 rounded-[2px] text-left group hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer"
            >
              <IconNetworkGroup size={24} className="flex-shrink-0" />
              <span className="text-[11px] font-normal text-[#1E293B] group-hover:text-white truncate">
                Connect To
              </span>
            </button>
          </div>

          {/* Etched Divider */}
          <div
            className="my-1 h-[1px] w-full"
            style={{
              background: 'linear-gradient(to right, transparent, #9BB9E0 15%, #9BB9E0 85%, transparent)',
            }}
          />

          {/* Bottom Tier (Help, Search, Run) */}
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => handleLaunch('system-info')}
              className="w-full flex items-center gap-2 px-2 py-1 rounded-[2px] text-left group hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer"
            >
              <IconHelp size={24} className="flex-shrink-0" />
              <span className="text-[11px] font-normal text-[#1E293B] group-hover:text-white truncate">
                Help and Support
              </span>
            </button>
            <button
              onClick={() => handleLaunch('file-search')}
              className="w-full flex items-center gap-2 px-2 py-1 rounded-[2px] text-left group hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer"
            >
              <IconSearch size={24} className="flex-shrink-0" />
              <span className="text-[11px] font-normal text-[#1E293B] group-hover:text-white truncate">
                Search
              </span>
            </button>
            <button
              onClick={() => handleLaunch('terminal')}
              className="w-full flex items-center gap-2 px-2 py-1 rounded-[2px] text-left group hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer"
            >
              <IconRun size={24} className="flex-shrink-0" />
              <span className="text-[11px] font-normal text-[#1E293B] group-hover:text-white truncate">
                Run...
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Footer (Log Off & Turn Off Computer) */}
      <div
        className="flex items-center justify-end gap-3 px-3 py-2"
        style={{
          background: 'linear-gradient(to bottom, #235FDC 0%, #194DB7 100%)',
          borderTop: '1px solid #133D94',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
        }}
      >
        <button
          onClick={handleLogoff}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-white hover:bg-[#2E72D6] active:bg-[#15419A] transition-colors cursor-pointer border border-transparent hover:border-blue-300/40"
        >
          <IconLogoff size={22} />
          <span className="text-[11px] font-normal leading-none">Log Off</span>
        </button>
        <button
          onClick={handleShutdown}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-white hover:bg-[#2E72D6] active:bg-[#15419A] transition-colors cursor-pointer border border-transparent hover:border-blue-300/40"
        >
          <IconTurnOff size={22} />
          <span className="text-[11px] font-normal leading-none">Turn Off Computer</span>
        </button>
      </div>
    </div>
  );
};
