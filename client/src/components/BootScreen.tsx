import React, { useEffect } from 'react';
import { useOS } from '@/contexts/OSContext';
import { getSoundInstance } from '@/lib/sounds';

export const BootScreen: React.FC = () => {
  const { setScreen } = useOS();

  useEffect(() => {
    // Play startup sound
    try {
      const sounds = getSoundInstance();
      sounds.playStartup();
    } catch {
      // Ignore audio autoplay restrictions if any
    }

    // Realistic boot sequence timing (~4 seconds)
    const timer = setTimeout(() => {
      const isSetup =
        localStorage.getItem('curtains-xp-setup-complete') === 'true' ||
        localStorage.getItem('curtains-xp-installed') === 'true';
      setScreen(isSetup ? 'login' : 'installation');
    }, 4000);

    return () => clearTimeout(timer);
  }, [setScreen]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center select-none overflow-hidden cursor-none">
      <div className="flex flex-col items-center justify-center gap-10">
        {/* Windows XP Flag & Wordmark Logo */}
        <div className="flex flex-col items-center">
          {/* Authentic Wavy Windows XP 4-Color Flag */}
          <div className="w-28 h-28 mb-3 flex items-center justify-center">
            <svg
              viewBox="0 0 160 145"
              className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Red Tile Gradient */}
                <linearGradient id="xpRedGrad" x1="15%" y1="10%" x2="85%" y2="90%">
                  <stop offset="0%" stopColor="#FF7A45" />
                  <stop offset="35%" stopColor="#EB3D18" />
                  <stop offset="85%" stopColor="#C41A00" />
                  <stop offset="100%" stopColor="#960E00" />
                </linearGradient>

                {/* Green Tile Gradient */}
                <linearGradient id="xpGreenGrad" x1="15%" y1="10%" x2="85%" y2="90%">
                  <stop offset="0%" stopColor="#8EE033" />
                  <stop offset="40%" stopColor="#5EBA15" />
                  <stop offset="85%" stopColor="#3A8A04" />
                  <stop offset="100%" stopColor="#256000" />
                </linearGradient>

                {/* Blue Tile Gradient */}
                <linearGradient id="xpBlueGrad" x1="15%" y1="10%" x2="85%" y2="90%">
                  <stop offset="0%" stopColor="#4FA8FF" />
                  <stop offset="40%" stopColor="#1E76E8" />
                  <stop offset="85%" stopColor="#0B4BB8" />
                  <stop offset="100%" stopColor="#042C7D" />
                </linearGradient>

                {/* Yellow Tile Gradient */}
                <linearGradient id="xpYellowGrad" x1="15%" y1="10%" x2="85%" y2="90%">
                  <stop offset="0%" stopColor="#FFE040" />
                  <stop offset="40%" stopColor="#FFBA08" />
                  <stop offset="85%" stopColor="#E68A00" />
                  <stop offset="100%" stopColor="#BA6200" />
                </linearGradient>

                {/* Gloss / Specular Highlights */}
                <linearGradient id="xpGloss" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                  <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
                </linearGradient>
              </defs>

              {/* Shadow Silhouettes */}
              <g opacity="0.35" transform="translate(3, 4)">
                <path
                  d="M 23 15 C 38 7, 57 11, 72 14 C 70 34, 67 54, 65 72 C 50 68, 33 65, 19 74 C 20.5 54, 21.5 34, 23 15 Z"
                  fill="#000000"
                />
                <path
                  d="M 78 15 C 93 19, 114 14, 129 5 C 128 24, 126 44, 125 63 C 111 72, 92 68, 77 64 C 77.5 47, 77.8 30, 78 15 Z"
                  fill="#000000"
                />
                <path
                  d="M 17 80 C 31 71, 49 75, 63 78 C 61 97, 58 117, 56 135 C 41 131, 25 127, 12 137 C 13.5 118, 15 99, 17 80 Z"
                  fill="#000000"
                />
                <path
                  d="M 70 80 C 85 83, 107 79, 122 69 C 120 89, 119 109, 117 129 C 102 138, 83 134, 68 130 C 68.8 113, 69.4 96, 70 80 Z"
                  fill="#000000"
                />
              </g>

              {/* Top-Left: Red Pane */}
              <g>
                <path
                  d="M 23 15 C 38 7, 57 11, 72 14 C 70 34, 67 54, 65 72 C 50 68, 33 65, 19 74 C 20.5 54, 21.5 34, 23 15 Z"
                  fill="url(#xpRedGrad)"
                />
                <path
                  d="M 23 15 C 38 7, 57 11, 72 14 C 70 34, 67 54, 65 72 C 50 68, 33 65, 19 74 C 20.5 54, 21.5 34, 23 15 Z"
                  fill="url(#xpGloss)"
                />
              </g>

              {/* Top-Right: Green Pane */}
              <g>
                <path
                  d="M 78 15 C 93 19, 114 14, 129 5 C 128 24, 126 44, 125 63 C 111 72, 92 68, 77 64 C 77.5 47, 77.8 30, 78 15 Z"
                  fill="url(#xpGreenGrad)"
                />
                <path
                  d="M 78 15 C 93 19, 114 14, 129 5 C 128 24, 126 44, 125 63 C 111 72, 92 68, 77 64 C 77.5 47, 77.8 30, 78 15 Z"
                  fill="url(#xpGloss)"
                />
              </g>

              {/* Bottom-Left: Blue Pane */}
              <g>
                <path
                  d="M 17 80 C 31 71, 49 75, 63 78 C 61 97, 58 117, 56 135 C 41 131, 25 127, 12 137 C 13.5 118, 15 99, 17 80 Z"
                  fill="url(#xpBlueGrad)"
                />
                <path
                  d="M 17 80 C 31 71, 49 75, 63 78 C 61 97, 58 117, 56 135 C 41 131, 25 127, 12 137 C 13.5 118, 15 99, 17 80 Z"
                  fill="url(#xpGloss)"
                />
              </g>

              {/* Bottom-Right: Yellow Pane */}
              <g>
                <path
                  d="M 70 80 C 85 83, 107 79, 122 69 C 120 89, 119 109, 117 129 C 102 138, 83 134, 68 130 C 68.8 113, 69.4 96, 70 80 Z"
                  fill="url(#xpYellowGrad)"
                />
                <path
                  d="M 70 80 C 85 83, 107 79, 122 69 C 120 89, 119 109, 117 129 C 102 138, 83 134, 68 130 C 68.8 113, 69.4 96, 70 80 Z"
                  fill="url(#xpGloss)"
                />
              </g>
            </svg>
          </div>

          {/* Typography: Microsoft Curtains xp */}
          <div className="flex flex-col items-start select-none">
            <span
              className="text-[#FFFFFF] text-[15px] font-medium tracking-[0.04em] leading-none mb-1 pl-1"
              style={{
                fontFamily: '"Segoe UI", "Tahoma", "Arial", sans-serif',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)',
              }}
            >
              Microsoft
            </span>
            <div className="flex items-start leading-none">
              <span
                className="text-[#FFFFFF] text-[52px] font-bold tracking-[-0.03em] leading-none"
                style={{
                  fontFamily: '"Franklin Gothic Medium", "Segoe UI", "Tahoma", sans-serif',
                  textShadow: '0 2px 6px rgba(0, 0, 0, 0.9)',
                }}
              >
                Curtains
              </span>
              <span
                className="text-[#FF5218] text-[24px] font-black italic tracking-normal ml-1 -mt-1 select-none"
                style={{
                  fontFamily: '"Franklin Gothic Medium", "Segoe UI", "Tahoma", sans-serif',
                  textShadow: '0 1px 4px rgba(255, 82, 24, 0.4)',
                }}
              >
                xp
              </span>
            </div>
          </div>
        </div>

        {/* Windows XP Progress Bar (Pill capsule with 3 scrolling blue blocks) */}
        <div className="relative w-[190px] h-[15px] rounded-full p-[2px] bg-black border-[1.5px] border-[#5A6372] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden">
          <div className="xp-boot-track w-full h-full relative overflow-hidden rounded-full">
            <div className="xp-boot-blocks flex gap-[2px] absolute top-0 bottom-0">
              <div className="w-[9px] h-full rounded-[1px] bg-gradient-to-b from-[#6EB2FF] via-[#1B6EE8] to-[#083CA5] shadow-[0_0_2px_#3A8CFF]" />
              <div className="w-[9px] h-full rounded-[1px] bg-gradient-to-b from-[#6EB2FF] via-[#1B6EE8] to-[#083CA5] shadow-[0_0_2px_#3A8CFF]" />
              <div className="w-[9px] h-full rounded-[1px] bg-gradient-to-b from-[#6EB2FF] via-[#1B6EE8] to-[#083CA5] shadow-[0_0_2px_#3A8CFF]" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes xpBootSlide {
          0% {
            transform: translateX(-40px);
          }
          100% {
            transform: translateX(190px);
          }
        }
        .xp-boot-blocks {
          animation: xpBootSlide 2.2s linear infinite;
        }
      `}</style>
    </div>
  );
};
