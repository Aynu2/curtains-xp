import React, { useState } from 'react';
import { useOS } from '@/contexts/OSContext';
import { getSoundInstance } from '@/lib/sounds';
import { useSoundEffect } from '@/hooks/useSoundEffect';

export const LoginScreen: React.FC = () => {
  const { setScreen, setUsername, setUserPassword, username: contextUsername, userPassword: contextPassword } = useOS();
  const { playSound } = useSoundEffect();

  const savedUser = localStorage.getItem('curtains-xp-username') || contextUsername || 'Administrator';
  const savedPass = localStorage.getItem('curtains-xp-password') || contextPassword || '';

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPasswordError('');

    // If user has a password set and entered password doesn't match
    if (savedPass && password !== savedPass) {
      setPasswordError('Incorrect password. Please try again.');
      setPassword('');
      return;
    }

    setIsLoggingIn(true);
    setUsername(savedUser);
    if (password) setUserPassword(password);
    localStorage.setItem('curtains-xp-installed', 'true');

    try {
      const sounds = getSoundInstance();
      sounds.playStartup();
    } catch {
      // Ignore audio error
    }

    setTimeout(() => {
      setScreen('desktop');
    }, 400);
  };

  const handleShutdown = () => {
    playSound('click');
    const div = document.createElement('div');
    div.style.cssText =
      'position:fixed;inset:0;background:#000;display:flex;align-items:center;justify-content:center;z-index:99999;flex-direction:column;gap:16px;font-family:Tahoma,sans-serif;';
    div.innerHTML = `<div style="color:white;font-size:22px;font-weight:bold;">Windows is shutting down...</div><div style="color:#aaa;font-size:13px;">Please wait</div>`;
    document.body.appendChild(div);
    setTimeout(() => {
      setScreen('boot');
      document.body.removeChild(div);
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 select-none flex flex-col justify-between overflow-hidden cursor-default font-sans"
      style={{
        background: 'radial-gradient(circle at 18% 30%, #3B72DE 0%, #154CB8 35%, #072E8A 70%, #001B64 100%)',
        fontFamily: '"Tahoma", "Segoe UI", "Arial", sans-serif',
      }}
    >
      {/* Top Background Gradient Bar */}
      <div
        className="w-full h-12 flex-shrink-0"
        style={{
          background: 'linear-gradient(to bottom, #001E68 0%, transparent 100%)',
        }}
      />

      {/* Main Center Area (Split Left / Right) */}
      <div className="flex-1 flex items-center justify-center max-w-5xl mx-auto w-full px-8 py-4">
        {/* Left Side: Flag Logo + Curtains XP Branding */}
        <div className="flex-1 flex flex-col items-end pr-12 text-right">
          <div className="flex flex-col items-end">
            {/* Wavy 4-Color Windows Flag */}
            <div className="w-24 h-24 mb-2 flex items-center justify-center">
              <svg
                viewBox="0 0 160 145"
                className="w-full h-full filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="lockRedGrad" x1="15%" y1="10%" x2="85%" y2="90%">
                    <stop offset="0%" stopColor="#FF7A45" />
                    <stop offset="35%" stopColor="#EB3D18" />
                    <stop offset="85%" stopColor="#C41A00" />
                    <stop offset="100%" stopColor="#960E00" />
                  </linearGradient>
                  <linearGradient id="lockGreenGrad" x1="15%" y1="10%" x2="85%" y2="90%">
                    <stop offset="0%" stopColor="#8EE033" />
                    <stop offset="40%" stopColor="#5EBA15" />
                    <stop offset="85%" stopColor="#3A8A04" />
                    <stop offset="100%" stopColor="#256000" />
                  </linearGradient>
                  <linearGradient id="lockBlueGrad" x1="15%" y1="10%" x2="85%" y2="90%">
                    <stop offset="0%" stopColor="#4FA8FF" />
                    <stop offset="40%" stopColor="#1E76E8" />
                    <stop offset="85%" stopColor="#0B4BB8" />
                    <stop offset="100%" stopColor="#042C7D" />
                  </linearGradient>
                  <linearGradient id="lockYellowGrad" x1="15%" y1="10%" x2="85%" y2="90%">
                    <stop offset="0%" stopColor="#FFE040" />
                    <stop offset="40%" stopColor="#FFBA08" />
                    <stop offset="85%" stopColor="#E68A00" />
                    <stop offset="100%" stopColor="#BA6200" />
                  </linearGradient>
                  <linearGradient id="lockGloss" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                    <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                <g>
                  {/* Red Pane */}
                  <path
                    d="M 23 15 C 38 7, 57 11, 72 14 C 70 34, 67 54, 65 72 C 50 68, 33 65, 19 74 C 20.5 54, 21.5 34, 23 15 Z"
                    fill="url(#lockRedGrad)"
                  />
                  <path
                    d="M 23 15 C 38 7, 57 11, 72 14 C 70 34, 67 54, 65 72 C 50 68, 33 65, 19 74 C 20.5 54, 21.5 34, 23 15 Z"
                    fill="url(#lockGloss)"
                  />
                  {/* Green Pane */}
                  <path
                    d="M 78 15 C 93 19, 114 14, 129 5 C 128 24, 126 44, 125 63 C 111 72, 92 68, 77 64 C 77.5 47, 77.8 30, 78 15 Z"
                    fill="url(#lockGreenGrad)"
                  />
                  <path
                    d="M 78 15 C 93 19, 114 14, 129 5 C 128 24, 126 44, 125 63 C 111 72, 92 68, 77 64 C 77.5 47, 77.8 30, 78 15 Z"
                    fill="url(#lockGloss)"
                  />
                  {/* Blue Pane */}
                  <path
                    d="M 17 80 C 31 71, 49 75, 63 78 C 61 97, 58 117, 56 135 C 41 131, 25 127, 12 137 C 13.5 118, 15 99, 17 80 Z"
                    fill="url(#lockBlueGrad)"
                  />
                  <path
                    d="M 17 80 C 31 71, 49 75, 63 78 C 61 97, 58 117, 56 135 C 41 131, 25 127, 12 137 C 13.5 118, 15 99, 17 80 Z"
                    fill="url(#lockGloss)"
                  />
                  {/* Yellow Pane */}
                  <path
                    d="M 70 80 C 85 83, 107 79, 122 69 C 120 89, 119 109, 117 129 C 102 138, 83 134, 68 130 C 68.8 113, 69.4 96, 70 80 Z"
                    fill="url(#lockYellowGrad)"
                  />
                  <path
                    d="M 70 80 C 85 83, 107 79, 122 69 C 120 89, 119 109, 117 129 C 102 138, 83 134, 68 130 C 68.8 113, 69.4 96, 70 80 Z"
                    fill="url(#lockGloss)"
                  />
                </g>
              </svg>
            </div>

            {/* Curtains xp Wordmark */}
            <div className="flex items-start leading-none select-none">
              <span
                className="text-[#FFFFFF] text-[42px] font-bold tracking-tight leading-none"
                style={{
                  fontFamily: '"Franklin Gothic Medium", "Segoe UI", "Tahoma", sans-serif',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                }}
              >
                Curtains
              </span>
              <span
                className="text-[#FF5218] text-[22px] font-black italic tracking-normal ml-1 -mt-1 select-none"
                style={{
                  fontFamily: '"Franklin Gothic Medium", "Segoe UI", "Tahoma", sans-serif',
                  textShadow: '0 1px 3px rgba(255, 82, 24, 0.4)',
                }}
              >
                xp
              </span>
            </div>

            {/* Instruction Subtitle */}
            <p
              className="text-white text-[15px] font-normal mt-6 tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
              style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
            >
              To begin, click your user name
            </p>
          </div>
        </div>

        {/* Center Glowing Divider Line */}
        <div
          className="w-[1px] h-[280px] self-center flex-shrink-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(255,255,255,0.2) 15%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) 85%, transparent)',
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.4)',
          }}
        />

        {/* Right Side: Single User Card */}
        <div className="flex-1 flex flex-col justify-center pl-12">
          <form
            onSubmit={handleLogin}
            className="flex items-center gap-4 p-3 rounded-[6px] transition-all max-w-[340px] border border-transparent hover:border-white/20 hover:bg-white/10 group cursor-pointer"
            onClick={() => {
              if (!savedPass) {
                handleLogin();
              }
            }}
          >
            {/* User Avatar (Snowflake / Framed box) */}
            <div
              className="w-14 h-14 rounded-[4px] bg-white p-[2px] shadow-[0_2px_6px_rgba(0,0,0,0.5)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
              style={{ border: '2px solid #FFFFFF' }}
            >
              <div className="w-full h-full bg-gradient-to-br from-[#1E6FE8] via-[#0B4BB8] to-[#042C7D] flex items-center justify-center rounded-[2px] text-white">
                {/* Snowflake SVG */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
                  <polyline points="10 4 12 2 14 4" />
                  <polyline points="10 20 12 22 14 20" />
                  <polyline points="4 10 2 12 4 14" />
                  <polyline points="20 10 22 12 20 14" />
                  <polyline points="7.07 4.93 4.93 4.93 4.93 7.07" />
                  <polyline points="16.93 4.93 19.07 4.93 19.07 7.07" />
                  <polyline points="7.07 19.07 4.93 19.07 4.93 16.93" />
                  <polyline points="16.93 19.07 19.07 19.07 19.07 16.93" />
                </svg>
              </div>
            </div>

            {/* User Credentials & Password Input */}
            <div className="flex flex-col flex-1 min-w-0">
              <span
                className="text-white text-[17px] font-bold leading-tight drop-shadow truncate"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
              >
                {savedUser}
              </span>

              {savedPass ? (
                <div className="mt-1.5 flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="password"
                      placeholder="Type your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoFocus
                      className="px-2 py-1 text-xs bg-white text-black rounded-[2px] border border-gray-400 focus:outline-none focus:border-blue-500 shadow-inner w-36 font-sans"
                    />
                    <button
                      type="submit"
                      disabled={isLoggingIn}
                      className="w-6 h-6 rounded-[3px] bg-[#388E3C] hover:bg-[#2E7D32] active:bg-[#1B5E20] text-white flex items-center justify-center shadow font-bold text-xs border border-[#144F18] cursor-pointer"
                      title="Log On"
                    >
                      ➜
                    </button>
                  </div>
                  {passwordError && (
                    <span className="text-yellow-300 text-[10px] font-medium leading-none drop-shadow">
                      {passwordError}
                    </span>
                  )}
                </div>
              ) : (
                <span
                  className="text-blue-200 text-[12px] font-normal leading-tight mt-0.5 group-hover:text-white"
                  style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}
                >
                  Click to log on
                </span>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Bar: Separator + Shut Down + Help Note */}
      <div className="w-full flex-shrink-0 flex flex-col">
        {/* Horizontal Gradient Separator Line */}
        <div
          className="w-full h-[2px]"
          style={{
            background:
              'linear-gradient(to right, #001B64 0%, #D97706 20%, #F59E0B 50%, #D97706 80%, #001B64 100%)',
            boxShadow: '0 0 4px rgba(245, 158, 11, 0.5)',
          }}
        />

        {/* Footer Area */}
        <div
          className="w-full h-16 flex items-center justify-between px-8"
          style={{
            background: 'linear-gradient(to bottom, #071F5E 0%, #00103A 100%)',
          }}
        >
          {/* Bottom Left: Turn Off Computer */}
          <button
            onClick={handleShutdown}
            className="flex items-center gap-2 text-white hover:text-red-200 transition-colors cursor-pointer group"
          >
            {/* Red Power Icon Box */}
            <div className="w-7 h-7 rounded-[3px] bg-gradient-to-b from-[#EF4444] to-[#B91C1C] border border-[#7F1D1D] shadow flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M12 2v10" />
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
              </svg>
            </div>
            <span
              className="text-[13px] font-normal tracking-wide text-white group-hover:underline"
              style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
            >
              Turn off computer
            </span>
          </button>

          {/* Bottom Right: User Accounts Help Note */}
          <div
            className="text-right text-[11px] text-[#A5C2F0] leading-snug"
            style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
          >
            <div>After you log on, you can add or change accounts.</div>
            <div>Just go to Control Panel and click User Accounts.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
