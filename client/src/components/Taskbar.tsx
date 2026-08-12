import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '@/contexts/OSContext';
import { Volume2, VolumeX, Clock, Power } from 'lucide-react';
import { getTheme } from '@/lib/themes';
import { useSoundEffect } from '@/hooks/useSoundEffect';
import { StartMenu } from './StartMenu';

interface TaskbarProps {
  onLogout: () => void;
  onShutdown: () => void;
  onRestart: () => void;
  onAppLaunch: (app: string) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ onLogout, onShutdown, onRestart, onAppLaunch }) => {
  const { windows, minimizeWindow, theme } = useOS();
  const { playSound, setVolume: setSoundVolume, getVolume: getSoundVolume } = useSoundEffect();
  const themeColors = getTheme(theme);
  const [time, setTime] = useState(new Date());
  const [volume, setVolume] = useState(() => getSoundVolume());
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  const [showStartMenu, setShowStartMenu] = useState(false);
  const [hoveredWindowId, setHoveredWindowId] = useState<string | null>(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const [taskbarHeight, setTaskbarHeight] = useState(32);
  const [isDraggingHeight, setIsDraggingHeight] = useState(false);
  const taskbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isDraggingHeight) {
      const handleMouseMove = (e: MouseEvent) => {
        const newHeight = Math.max(32, Math.min(120, window.innerHeight - e.clientY));
        setTaskbarHeight(newHeight);
      };

      const handleMouseUp = () => {
        setIsDraggingHeight(false);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingHeight]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getWindowIcon = (app: string) => {
    const icons: { [key: string]: string } = {
      'file-explorer': '📁',
      'calculator': '🧮',
      'terminal': '⌨️',
      'notepad': '📝',
      'settings': '⚙️',
      'games': '🎮',
      'browser': '🌐',
      'app-store': '🛍️',
      'system-info': 'ℹ️',
      'paint-pro': '🎨',
      'media-player': '🎬',
      'photo-gallery': '📸',
      'code-editor': '💻',
      'spreadsheet-pro': '📊',
      'document-editor': '📃',
      'email-client': '📧',
      'download-manager': '📥',
      'file-search': '🔎',
      'backup-restore': '💾',
    };
    return icons[app] || '📦';
  };

  const handleTaskbarButtonClick = (windowId: string) => {
    playSound('click');
    const w = windows.find(w => w.id === windowId);
    if (w?.minimized) {
      minimizeWindow(windowId);
    } else {
      minimizeWindow(windowId);
    }
  };

  const handleTaskbarButtonHover = (e: React.MouseEvent, windowId: string) => {
    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    setPreviewPos({
      x: rect.left,
      y: rect.top - 120,
    });
    setHoveredWindowId(windowId);
  };

  return (
    <>
      {/* Taskbar */}
      <div
        ref={taskbarRef}
        className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-2"
        style={{
          height: `${taskbarHeight}px`,
          background: `linear-gradient(to bottom, ${themeColors.taskbarGradientStart}, ${themeColors.taskbarGradientEnd})`,
          borderTop: `2px solid ${themeColors.taskbarBorder}`,
          borderBottom: `1px solid ${themeColors.taskbarInsetDark}`,
          boxShadow: `inset 1px 1px 0 ${themeColors.taskbarInsetLight}, inset -1px -1px 0 ${themeColors.taskbarInsetDark}`,
          zIndex: 1000,
        }}
      >
        {/* Start Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playSound('click');
            setShowStartMenu(!showStartMenu);
          }}
          className="xp-button px-3 py-1 font-bold text-sm flex items-center gap-2"
          style={{
            background: `linear-gradient(to bottom, ${themeColors.buttonGradientStart}, ${themeColors.buttonGradientEnd})`,
            border: `2px solid ${themeColors.buttonBorderLight}`,
            borderRight: `2px solid ${themeColors.buttonBorderDark}`,
            borderBottom: `2px solid ${themeColors.buttonBorderDark}`,
            cursor: 'pointer',
            height: `${Math.max(24, taskbarHeight - 8)}px`,
          }}
        >
          🪟 Start
        </button>

        {/* Taskbar Buttons */}
        <div className="flex gap-1 flex-1 ml-2 overflow-x-auto">
          {windows.map((w) => (
            <button
              key={w.id}
              onClick={() => handleTaskbarButtonClick(w.id)}
              onMouseEnter={(e) => handleTaskbarButtonHover(e, w.id)}
              onMouseLeave={() => setHoveredWindowId(null)}
              className="xp-button px-2 py-1 text-xs flex items-center gap-1 whitespace-nowrap relative transition-all"
              style={{
                background: w.minimized
                  ? `linear-gradient(to bottom, ${themeColors.buttonGradientStart}, ${themeColors.buttonGradientEnd})`
                  : `linear-gradient(to bottom, ${themeColors.activeButtonGradientStart}, ${themeColors.activeButtonGradientEnd})`,
                color: w.minimized ? themeColors.buttonText : themeColors.activeButtonText,
                border: w.minimized ? `2px solid ${themeColors.buttonBorderLight}` : `2px solid ${themeColors.activeButtonBorderLight}`,
                borderRight: w.minimized ? `2px solid ${themeColors.buttonBorderDark}` : `2px solid ${themeColors.activeButtonBorderDark}`,
                borderBottom: w.minimized ? `2px solid ${themeColors.buttonBorderDark}` : `2px solid ${themeColors.activeButtonBorderDark}`,
                height: `${Math.max(24, taskbarHeight - 8)}px`,
                minWidth: '120px',
                maxWidth: '150px',
                boxShadow: !w.minimized ? 'inset 0 0 4px rgba(0, 0, 0, 0.3)' : 'none',
              }}
              title={w.title}
            >
              <span className="text-sm">{getWindowIcon(w.app)}</span>
              <span className="truncate flex-1">{w.title}</span>
              {!w.minimized && (
                <span className="ml-1 w-2 h-2 rounded-full bg-white opacity-75"></span>
              )}
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div
          className="flex items-center gap-1 ml-2 pl-2"
          style={{
            borderLeft: '2px solid #FFFFFF',
            borderRight: '1px solid #808080',
          }}
        >
          {/* Volume Control */}
          <div className="relative">
            <button
              onClick={() => {
                playSound('click');
                setShowVolumeControl(!showVolumeControl);
              }}
              className="xp-button p-1 flex items-center justify-center"
              style={{
                background: `linear-gradient(to bottom, ${themeColors.buttonGradientStart}, ${themeColors.buttonGradientEnd})`,
                border: `2px solid ${themeColors.buttonBorderLight}`,
                borderRight: `2px solid ${themeColors.buttonBorderDark}`,
                borderBottom: `2px solid ${themeColors.buttonBorderDark}`,
                height: `${Math.max(24, taskbarHeight - 8)}px`,
                width: `${Math.max(24, taskbarHeight - 8)}px`,
              }}
              title="Volume"
            >
              {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>

            {showVolumeControl && (
              <div
                className="absolute bottom-full mb-2 right-0 p-2 rounded shadow-lg z-50"
                style={{
                  backgroundColor: themeColors.systemTrayBackground,
                  border: `2px solid ${themeColors.buttonBorderLight}`,
                  borderRight: `2px solid ${themeColors.buttonBorderDark}`,
                  borderBottom: `2px solid ${themeColors.buttonBorderDark}`,
                }}
              >
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => {
                    const newVolume = Number(e.target.value);
                    setVolume(newVolume);
                    setSoundVolume(newVolume);
                  }}
                  className="w-24 h-2"
                  style={{ cursor: 'pointer' }}
                />
                <div className="text-xs text-center mt-1 text-gray-700 font-bold">
                  {volume}%
                </div>
              </div>
            )}
          </div>

          {/* Clock */}
          <div className="relative">
            <button
              onClick={() => {
                playSound('click');
                setShowVolumeControl(false);
              }}
              className="xp-button px-2 py-1 text-xs flex items-center gap-1"
              style={{
                background: `linear-gradient(to bottom, ${themeColors.buttonGradientStart}, ${themeColors.buttonGradientEnd})`,
                border: `2px solid ${themeColors.buttonBorderLight}`,
                borderRight: `2px solid ${themeColors.buttonBorderDark}`,
                borderBottom: `2px solid ${themeColors.buttonBorderDark}`,
                height: `${Math.max(24, taskbarHeight - 8)}px`,
                minWidth: '50px',
              }}
              title="Date & Time"
            >
              <Clock size={14} />
              <span>{formatTime(time)}</span>
            </button>
          </div>

          {/* Inline Volume Slider Next to Clock */}
          <div
            className="flex items-center gap-1 px-2"
            style={{
              borderLeft: '2px solid #FFFFFF',
              borderRight: '1px solid #808080',
            }}
          >
            <span className="text-xs text-gray-700 font-bold">Vol:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => {
                const newVolume = Number(e.target.value);
                setVolume(newVolume);
                setSoundVolume(newVolume);
              }}
              className="w-16 h-2"
              style={{ cursor: 'pointer' }}
              title="Adjust system sound volume"
            />
            <span className="text-xs text-gray-700 font-bold w-8 text-right">{volume}%</span>
          </div>

          {/* System Indicators */}
          <div className="flex gap-2 text-xs px-2">
            <span title="Network Connected" className="text-green-600 font-bold">
              🌐
            </span>
            <span title="Sound On" className="text-blue-600 font-bold">
              🔊
            </span>
            <span title="Battery Good" className="text-green-600 font-bold">
              🔋
            </span>
          </div>
        </div>
      </div>

      {/* Window Preview */}
      {hoveredWindowId && (
        <div
          className="fixed rounded shadow-2xl z-50 p-2 bg-gray-900 border-2 border-gray-700"
          style={{
            left: `${previewPos.x}px`,
            top: `${previewPos.y}px`,
            width: '200px',
            height: '120px',
          }}
        >
          <div className="w-full h-full bg-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
            {windows.find(w => w.id === hoveredWindowId)?.title}
          </div>
        </div>
      )}

      {/* Start Menu */}
      <StartMenu
        isOpen={showStartMenu}
        onClose={() => setShowStartMenu(false)}
        onAppLaunch={onAppLaunch}
      />

      {/* Close Start Menu on Outside Click */}
      {showStartMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowStartMenu(false)}
        />
      )}

      {/* Taskbar Height Resize Handle */}
      <div
        className="fixed bottom-0 left-0 right-0 h-1 cursor-ns-resize hover:bg-blue-500"
        style={{
          height: '4px',
          backgroundColor: isDraggingHeight ? '#0099CC' : 'transparent',
        }}
        onMouseDown={() => setIsDraggingHeight(true)}
        title="Drag to resize taskbar"
      />
    </>
  );
};
