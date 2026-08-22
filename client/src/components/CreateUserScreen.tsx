import React, { useState } from 'react';
import { useOS } from '@/contexts/OSContext';
import { IconXPLogo, IconHelp } from './XPIcons';

export const CreateUserScreen: React.FC = () => {
  const { setScreen, setUsername, setUserPassword } = useOS();
  const [username, setUsernameInput] = useState('');
  const [password, setPasswordInput] = useState('');
  const [confirmPassword, setConfirmPasswordInput] = useState('');
  const [error, setError] = useState('');

  const handleCreateUser = () => {
    setError('');

    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }

    if (password && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password && password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setUsername(username.trim());
    if (password) setUserPassword(password);
    localStorage.setItem('curtains-xp-username', username.trim());
    if (password) localStorage.setItem('curtains-xp-password', password);
    localStorage.setItem('curtains-xp-setup-complete', 'true');
    localStorage.setItem('curtains-xp-installed', 'true');
    setScreen('login');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateUser();
    }
  };

  return (
    <div
      className="fixed inset-0 select-none flex flex-col justify-between overflow-hidden font-sans"
      style={{
        background: 'radial-gradient(circle at 18% 25%, #3B72DE 0%, #154CB8 35%, #072E8A 70%, #001B64 100%)',
        fontFamily: '"Tahoma", "Segoe UI", "Arial", sans-serif',
      }}
    >
      {/* Top Header */}
      <div
        className="w-full h-14 px-6 flex items-center justify-between flex-shrink-0 select-none z-10"
        style={{
          background: 'linear-gradient(to bottom, #001B64 0%, #06287E 100%)',
          borderBottom: '1px solid #041B54',
        }}
      >
        <div className="flex items-center gap-2">
          <IconXPLogo size={22} />
          <div className="flex items-baseline leading-none">
            <span
              className="text-white text-[20px] font-bold tracking-tight"
              style={{
                fontFamily: '"Franklin Gothic Medium", "Segoe UI", "Tahoma", sans-serif',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              Curtains
            </span>
            <span
              className="text-[#FF5218] text-[13px] font-black italic tracking-normal ml-0.5 -mt-0.5"
              style={{
                fontFamily: '"Franklin Gothic Medium", "Segoe UI", "Tahoma", sans-serif',
                textShadow: '0 1px 3px rgba(255, 82, 24, 0.4)',
              }}
            >
              xp
            </span>
          </div>
        </div>
      </div>

      {/* Main OOBE Area */}
      <div className="flex-1 flex items-center justify-between max-w-5xl mx-auto w-full px-12 py-8 relative">
        <div className="flex flex-col items-start max-w-xl">
          <h1
            className="text-white text-[32px] font-bold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            style={{
              fontFamily: '"Franklin Gothic Medium", "Segoe UI", "Tahoma", sans-serif',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Who will use this computer?
          </h1>

          <p
            className="text-white text-[15px] leading-relaxed mb-6 drop-shadow"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
          >
            Type the name of each person who will use this computer. Curtains XP uses the name to create a user account for each person.
          </p>

          <div className="flex flex-col gap-3 w-full max-w-sm mb-4">
            <div className="flex items-center gap-3">
              <span
                className="text-white text-[14px] font-bold w-32 drop-shadow"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                Your name:
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsernameInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Administrator"
                autoFocus
                className="flex-1 px-3 py-1.5 text-sm bg-white text-black rounded-[2px] border border-gray-400 focus:outline-none focus:border-blue-500 shadow-inner"
              />
            </div>

            <div className="flex items-center gap-3">
              <span
                className="text-white text-[14px] font-bold w-32 drop-shadow"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                Password:
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="(Optional)"
                className="flex-1 px-3 py-1.5 text-sm bg-white text-black rounded-[2px] border border-gray-400 focus:outline-none focus:border-blue-500 shadow-inner"
              />
            </div>

            {password && (
              <div className="flex items-center gap-3">
                <span
                  className="text-white text-[14px] font-bold w-32 drop-shadow"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  Confirm password:
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Re-type password"
                  className="flex-1 px-3 py-1.5 text-sm bg-white text-black rounded-[2px] border border-gray-400 focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>
            )}

            {error && (
              <div className="text-yellow-300 text-xs font-bold drop-shadow mt-1">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="w-36 h-36 flex items-center justify-center flex-shrink-0 drop-shadow-2xl">
          <IconHelp size={120} />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex-shrink-0 flex flex-col select-none z-10">
        <div
          className="w-full h-[2px]"
          style={{
            background:
              'linear-gradient(to right, #001B64 0%, #D97706 20%, #F59E0B 50%, #D97706 80%, #001B64 100%)',
            boxShadow: '0 0 4px rgba(245, 158, 11, 0.5)',
          }}
        />
        <div
          className="w-full h-14 flex items-center justify-end px-8"
          style={{
            background: 'linear-gradient(to bottom, #071F5E 0%, #00103A 100%)',
          }}
        >
          <button
            onClick={handleCreateUser}
            className="flex items-center gap-2 px-5 py-1.5 rounded-[3px] bg-[#388E3C] hover:bg-[#2E7D32] active:bg-[#1B5E20] text-white font-bold text-xs shadow border border-[#144F18] cursor-pointer group"
          >
            <span className="text-[13px]">Next</span>
            <span className="text-sm group-hover:translate-x-0.5 transition-transform">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
