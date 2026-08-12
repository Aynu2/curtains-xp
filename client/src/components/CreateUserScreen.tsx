import React, { useState } from 'react';
import { useOS } from '@/contexts/OSContext';

export const CreateUserScreen: React.FC = () => {
  const { setScreen, setUsername, setUserPassword } = useOS();
  const [username, setUsernameInput] = useState('');
  const [password, setPasswordInput] = useState('');
  const [confirmPassword, setConfirmPasswordInput] = useState('');
  const [error, setError] = useState('');

  const handleCreateUser = () => {
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    // Save user and proceed to turn-on screen
    setUsername(username);
    setUserPassword(password);
    localStorage.setItem('curtains-xp-setup-complete', 'true');
    setScreen('turn-on');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateUser();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundImage:
          'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663665744001/XNzjLxgnakZVoQ2paoEWJv/bliss-wallpaper-YsU9v4xmKfhvT2Vs7fWytB.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Create User Container */}
      <div className="relative z-10 bg-white/95 rounded-lg p-8 shadow-2xl max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Create User Account</h1>
        <p className="text-gray-600 mb-6">Set up your local user account for Curtains XP</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsernameInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter username"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter password (min 4 characters)"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Confirm password"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 border-2 border-red-400 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleCreateUser}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition xp-button"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};
