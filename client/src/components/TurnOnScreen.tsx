import React, { useState, useEffect } from 'react';
import { useOS } from '@/contexts/OSContext';

export const TurnOnScreen: React.FC = () => {
  const { setScreen } = useOS();
  const [loading, setLoading] = useState(false);

  const handleTurnOn = () => {
    setLoading(true);
    // Simulate boot sequence
    setTimeout(() => {
      setScreen('login');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-center">
        {!loading ? (
          <div className="flex flex-col items-center gap-8">
            <div className="text-6xl">💻</div>
            <h1 className="text-4xl font-bold text-white mb-4">Curtains XP</h1>
            <p className="text-white text-lg mb-8">Press any key or click to turn on</p>
            <button
              onClick={handleTurnOn}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition"
            >
              Turn On
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl animate-spin">⚙️</div>
            <p className="text-white text-lg">Starting up...</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};
