import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Clock } from 'lucide-react';

interface SystemTrayProps {
  onLogout: () => void;
  onShutdown: () => void;
  onRestart: () => void;
}

export const SystemTray: React.FC<SystemTrayProps> = ({ onLogout, onShutdown, onRestart }) => {
  const [time, setTime] = useState(new Date());
  const [volume, setVolume] = useState(75);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [showPowerMenu, setShowPowerMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="flex items-center gap-2 px-2">
      {/* Volume Control */}
      <div className="relative">
        <button
          onClick={() => setShowVolumeControl(!showVolumeControl)}
          className="xp-button p-1 w-6 h-6 flex items-center justify-center text-xs hover:bg-blue-100"
        >
          {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        {showVolumeControl && (
          <div
            className="absolute bottom-full mb-2 right-0 p-2 rounded shadow-lg"
            style={{ backgroundColor: '#DFDFDF', border: '2px solid #808080' }}
          >
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 h-2"
              style={{ cursor: 'pointer' }}
            />
            <div className="text-xs text-center mt-1 text-gray-700">
              {volume}%
            </div>
          </div>
        )}
      </div>

      {/* Clock */}
      <div className="relative">
        <button
          onClick={() => setShowPowerMenu(!showPowerMenu)}
          className="xp-button px-2 py-1 text-xs flex items-center gap-2 hover:bg-blue-100"
        >
          <Clock size={14} />
          <span>{formatTime(time)}</span>
        </button>

        {showPowerMenu && (
          <div
            className="absolute bottom-full mb-2 right-0 rounded shadow-lg z-50"
            style={{
              backgroundColor: '#DFDFDF',
              border: '2px solid #808080',
              minWidth: '150px',
            }}
          >
            <div className="p-2 border-b-2 border-gray-400 text-xs font-bold text-gray-700">
              {formatDate(time)}
            </div>
            <div className="p-2 border-b-2 border-gray-400 text-xs text-gray-600">
              {formatTime(time)}
            </div>
            <button
              onClick={() => {
                onLogout();
                setShowPowerMenu(false);
              }}
              className="w-full px-2 py-1 text-left text-xs hover:bg-blue-500 hover:text-white"
            >
              Logout
            </button>
            <button
              onClick={() => {
                onRestart();
                setShowPowerMenu(false);
              }}
              className="w-full px-2 py-1 text-left text-xs hover:bg-blue-500 hover:text-white"
            >
              Restart
            </button>
            <button
              onClick={() => {
                onShutdown();
                setShowPowerMenu(false);
              }}
              className="w-full px-2 py-1 text-left text-xs hover:bg-red-500 hover:text-white"
            >
              Shutdown
            </button>
          </div>
        )}
      </div>

      {/* System Indicators */}
      <div className="flex gap-1 text-xs">
        <span title="Network Connected" className="text-green-600">
          🌐
        </span>
        <span title="Sound On" className="text-blue-600">
          🔊
        </span>
        <span title="Battery Good" className="text-green-600">
          🔋
        </span>
      </div>
    </div>
  );
};
