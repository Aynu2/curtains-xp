import React from 'react';
import { useOS } from '@/contexts/OSContext';
import { getTheme } from '@/lib/themes';
import { useSoundEffect } from '@/hooks/useSoundEffect';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAppLaunch: (app: string) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onAppLaunch }) => {
  const { theme } = useOS();
  const { playSound } = useSoundEffect();
  const themeColors = getTheme(theme);

  if (!isOpen) return null;

  const menuItems = [
    { label: 'Notepad', app: 'notepad', icon: '📝' },
    { label: 'Calculator', app: 'calculator', icon: '🧮' },
    { label: 'Paint Pro', app: 'paint-pro', icon: '🎨' },
    { label: 'Terminal', app: 'terminal', icon: '⌨️' },
    { label: 'File Explorer', app: 'file-explorer', icon: '📁' },
    { label: 'Browser', app: 'browser', icon: '🌐' },
    { label: 'Media Player', app: 'media-player', icon: '🎬' },
    { label: 'Photo Gallery', app: 'photo-gallery', icon: '📸' },
    { label: 'Games', app: 'games', icon: '🎮' },
    { label: 'Settings', app: 'settings', icon: '⚙️' },
    { label: 'System Info', app: 'system-info', icon: 'ℹ️' },
    { label: 'Email Client', app: 'email-client', icon: '📧' },
  ];

  const handleMenuItemClick = (app: string) => {
    playSound('click');
    onAppLaunch(app);
    onClose();
  };

  return (
    <div
      className="fixed bottom-12 left-0 rounded shadow-2xl z-50 overflow-hidden animate-slideIn"
      style={{
        backgroundColor: themeColors.systemTrayBackground,
        border: `2px solid ${themeColors.buttonBorderLight}`,
        borderRight: `2px solid ${themeColors.buttonBorderDark}`,
        borderBottom: `2px solid ${themeColors.buttonBorderDark}`,
        width: '200px',
        maxHeight: '400px',
        overflowY: 'auto',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Start Menu Header */}
      <div
        className="px-3 py-2 font-bold text-sm"
        style={{
          background: `linear-gradient(to right, #0099CC, #0066AA)`,
          color: 'white',
          borderBottom: `2px solid ${themeColors.buttonBorderLight}`,
        }}
      >
        Programs
      </div>

      {/* Menu Items */}
      <div className="py-1">
        {menuItems.map((item) => (
          <button
            key={item.app}
            onClick={() => handleMenuItemClick(item.app)}
            className="w-full px-3 py-2 text-left text-xs flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-colors"
            style={{
              color: themeColors.buttonText,
            }}
          >
            <span className="text-sm">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Separator */}
      <div
        style={{
          height: '1px',
          backgroundColor: themeColors.buttonBorderLight,
          margin: '4px 0',
        }}
      />

      {/* Bottom Menu Items */}
      <div className="py-1">
        <button
          onClick={() => handleMenuItemClick('file-search')}
          className="w-full px-3 py-2 text-left text-xs flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-colors"
          style={{
            color: themeColors.buttonText,
          }}
        >
          <span className="text-sm">🔎</span>
          <span>Search</span>
        </button>
        <button
          onClick={() => handleMenuItemClick('app-store')}
          className="w-full px-3 py-2 text-left text-xs flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-colors"
          style={{
            color: themeColors.buttonText,
          }}
        >
          <span className="text-sm">🛍️</span>
          <span>App Store</span>
        </button>
      </div>

      {/* Separator */}
      <div
        style={{
          height: '1px',
          backgroundColor: themeColors.buttonBorderLight,
          margin: '4px 0',
        }}
      />

      {/* Help & Support */}
      <div className="py-1">
        <button
          className="w-full px-3 py-2 text-left text-xs flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-colors"
          style={{
            color: themeColors.buttonText,
          }}
        >
          <span className="text-sm">❓</span>
          <span>Help & Support</span>
        </button>
      </div>
    </div>
  );
};
