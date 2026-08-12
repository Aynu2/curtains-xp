import React, { useEffect } from 'react';
import { useOS } from '@/contexts/OSContext';
import { getSoundInstance } from '@/lib/sounds';

export const BootScreen: React.FC = () => {
  const { bootProgress, setBootProgress, setScreen } = useOS();

  useEffect(() => {
    // Play startup sound
    const sounds = getSoundInstance();
    sounds.playStartup();

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25;
      if (progress >= 100) {
        progress = 100;
        setBootProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          const isSetup = localStorage.getItem('curtains-xp-setup-complete') === 'true' || localStorage.getItem('curtains-xp-installed') === 'true';
          setScreen(isSetup ? 'login' : 'installation');
        }, 1500);
      } else {
        setBootProgress(progress);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [setBootProgress, setScreen]);

  const bootMessages = [
    'Checking system memory...',
    'Loading drivers...',
    'Initializing hardware...',
    'Starting system services...',
    'Loading desktop environment...',
  ];

  const messageIndex = Math.floor((bootProgress / 100) * bootMessages.length);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-8">
      {/* Windows XP Logo */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-6xl font-bold text-white flex items-center gap-3">
          <div className="w-16 h-16 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Windows Logo */}
              <rect x="10" y="10" width="35" height="35" fill="#FF6B35" />
              <rect x="55" y="10" width="35" height="35" fill="#00AA00" />
              <rect x="10" y="55" width="35" height="35" fill="#0099CC" />
              <rect x="55" y="55" width="35" height="35" fill="#FFDD00" />
            </svg>
          </div>
          <span>Curtains XP</span>
        </div>
      </div>

      {/* Boot Messages */}
      <div className="w-96 space-y-2">
        {bootMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-green-400 font-mono text-sm transition-opacity duration-300 ${
              idx <= messageIndex ? 'opacity-100' : 'opacity-30'
            }`}
          >
            {idx <= messageIndex && '> '}{msg}
            {idx === messageIndex && <span className="animate-pulse">_</span>}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-96 space-y-2">
        <div className="xp-progress">
          <div
            className="xp-progress-fill"
            style={{ width: `${bootProgress}%` }}
          />
        </div>
        <div className="text-green-400 font-mono text-xs text-center">
          {Math.round(bootProgress)}%
        </div>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-8 left-8 text-gray-500 text-xs">
        <div>Copyright © 1985-2001</div>
        <div>Microsoft Corporation</div>
      </div>
    </div>
  );
};
