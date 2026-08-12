import React, { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';

interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
  size: string;
  rating: number;
  installed: boolean;
  appId?: string;
}

export const AppStore: React.FC = () => {
  const [apps, setApps] = useState<App[]>([
    {
      id: '1',
      name: 'Paint Pro',
      description: 'Advanced image editing and drawing application',
      icon: '🎨',
      size: '12 MB',
      rating: 4.5,
      installed: false,
      appId: 'paint-pro',
    },
    {
      id: '2',
      name: 'Media Player',
      description: 'Play your favorite music and videos',
      icon: '🎵',
      size: '8 MB',
      rating: 4.2,
      installed: false,
      appId: 'media-player',
    },
    {
      id: '3',
      name: 'Document Editor',
      description: 'Professional word processing and document creation',
      icon: '📄',
      size: '25 MB',
      rating: 4.7,
      installed: false,
      appId: 'document-editor',
    },
    {
      id: '4',
      name: 'Spreadsheet Pro',
      description: 'Create and analyze spreadsheets with ease',
      icon: '📊',
      size: '18 MB',
      rating: 4.4,
      installed: false,
      appId: 'spreadsheet-pro',
    },
    {
      id: '5',
      name: 'Photo Gallery',
      description: 'Organize and view your photos beautifully',
      icon: '📸',
      size: '5 MB',
      rating: 4.3,
      installed: false,
      appId: 'photo-gallery',
    },
    {
      id: '6',
      name: 'Code Editor',
      description: 'Lightweight code editor with syntax highlighting',
      icon: '💻',
      size: '15 MB',
      rating: 4.6,
      installed: false,
      appId: 'code-editor',
    },
    {
      id: '7',
      name: 'Email Client',
      description: 'Manage all your email accounts in one place',
      icon: '📧',
      size: '10 MB',
      rating: 4.1,
      installed: false,
    },
    {
      id: '8',
      name: 'Chat Application',
      description: 'Instant messaging and video calls',
      icon: '💬',
      size: '20 MB',
      rating: 4.5,
      installed: false,
    },
  ]);

  const handleInstall = (id: string) => {
    setApps(apps.map(app =>
      app.id === id ? { ...app, installed: true } : app
    ));
  };

  const handleUninstall = (id: string) => {
    setApps(apps.map(app =>
      app.id === id ? { ...app, installed: false } : app
    ));
  };

  const handleLaunch = (appId: string | undefined) => {
    if (appId) {
      window.dispatchEvent(new CustomEvent('launchApp', { detail: { appId } }));
    }
  };

  const installedCount = apps.filter(app => app.installed).length;

  return (
    <div className="flex flex-col h-full [background-color:#DFDFDF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 text-white">
        <h1 className="font-bold">Curtains XP App Store</h1>
        <p className="text-xs">Installed: {installedCount} apps</p>
      </div>

      {/* Apps Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {apps.map(app => (
            <div
              key={app.id}
              className="p-4 rounded border-2 border-gray-400 bg-white hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="text-4xl">{app.icon}</div>
                {app.installed ? (
                  <button
                    onClick={() => handleUninstall(app.id)}
                    className="xp-button p-1 text-xs"
                    title="Uninstall"
                  >
                    <Trash2 size={12} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleInstall(app.id)}
                    className="xp-button p-1 text-xs"
                    title="Install"
                  >
                    <Download size={12} />
                  </button>
                )}
              </div>

              <h3 className="font-bold text-xs mb-1">{app.name}</h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {app.description}
              </p>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{app.size}</span>
                <span>⭐ {app.rating}</span>
              </div>

              {app.installed && (
                <button
                  onClick={() => handleLaunch(app.appId)}
                  className="mt-2 w-full px-2 py-1 bg-green-500 text-white text-xs rounded text-center font-bold hover:bg-green-600"
                >
                  Launch
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
