import React, { useState } from 'react';
import { useOS } from '@/contexts/OSContext';

interface UserAccount {
  id: string;
  username: string;
  password: string;
  avatar: string;
  color: string;
}

export const LoginScreen: React.FC = () => {
  const { setScreen, setUsername, setUserPassword, username: contextUsername, userPassword: contextPassword } = useOS();
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [users, setUsers] = useState<UserAccount[]>([
    {
      id: '1',
      username: contextUsername,
      password: contextPassword,
      avatar: '👤',
      color: '#0099CC',
    },
  ]);

  const handleLogin = () => {
    if (!selectedUser) return;
    setPasswordError('');
    
    if (password === selectedUser.password) {
      setUsername(selectedUser.username);
      setUserPassword(selectedUser.password);
      setPassword('');
      setScreen('desktop');
    } else {
      setPasswordError('Incorrect password');
      setPassword('');
    }
  };

  const handleChangePassword = (user: UserAccount) => {
    const newPass = prompt(`Enter new password for ${user.username}:`);
    if (newPass && newPass.length >= 4) {
      const updatedUsers = users.map(u => 
        u.id === user.id ? { ...u, password: newPass } : u
      );
      setUsers(updatedUsers);
      setUsername(user.username);
      setUserPassword(newPass);
      alert('Password changed successfully!');
    } else if (newPass) {
      alert('Password must be at least 4 characters');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedUser) {
      handleLogin();
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

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-2xl">
        {!selectedUser ? (
          // User Selection Screen
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              Curtains XP
            </h1>
            <p className="text-white text-lg mb-8 drop-shadow">
              Select a user account to log in
            </p>

            {/* User Grid */}
            <div className="grid grid-cols-2 gap-6 mb-6 px-8">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="cursor-pointer group"
                >
                  <div
                    className="rounded-lg p-6 text-center transition-all hover:scale-105 hover:shadow-2xl"
                    style={{ backgroundColor: user.color + '20', border: `3px solid ${user.color}` }}
                  >
                    <div className="text-6xl mb-3">{user.avatar}</div>
                    <p className="text-white font-bold text-lg">{user.username}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChangePassword(user);
                      }}
                      className="mt-2 text-xs text-white/70 hover:text-white underline"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Login Screen
          <div className="bg-white/95 rounded-lg p-8 shadow-2xl max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">{selectedUser.avatar}</div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedUser.username}</h2>
            </div>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
              autoFocus
            />

            {passwordError && (
              <p className="text-red-600 text-sm mb-4">{passwordError}</p>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleLogin}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition xp-button"
              >
                OK
              </button>
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setPassword('');
                  setPasswordError('');
                }}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition xp-button"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
