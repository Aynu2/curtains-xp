import React, { useState, useEffect } from 'react';
import { Download, Trash2, Folder, ExternalLink } from 'lucide-react';
import { createFile } from '@/lib/filesystem';

interface DownloadItem {
  id: string;
  filename: string;
  url: string;
  progress: number;
  status: 'pending' | 'downloading' | 'completed' | 'failed';
  size: string;
  timestamp: number;
}

export const DownloadManager: React.FC = () => {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [filename, setFilename] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('curtains-xp-downloads');
    if (saved) {
      setDownloads(JSON.parse(saved));
    }
  }, []);

  const saveDownloads = (items: DownloadItem[]) => {
    setDownloads(items);
    localStorage.setItem('curtains-xp-downloads', JSON.stringify(items));
  };

  const handleDownload = async () => {
    if (!newUrl.trim()) {
      alert('Please enter a URL');
      return;
    }

    const finalFilename = filename.trim() || newUrl.split('/').pop() || 'download';
    const downloadId = `download-${Date.now()}`;

    const newDownload: DownloadItem = {
      id: downloadId,
      filename: finalFilename,
      url: newUrl,
      progress: 0,
      status: 'pending',
      size: 'calculating...',
      timestamp: Date.now(),
    };

    saveDownloads([...downloads, newDownload]);
    setNewUrl('');
    setFilename('');

    // Simulate download
    simulateDownload(downloadId, newUrl, finalFilename);
  };

  const simulateDownload = async (id: string, url: string, fname: string) => {
    try {
      // Update status to downloading
      setDownloads((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: 'downloading' } : d))
      );

      // Simulate progress
      for (let i = 0; i <= 100; i += Math.random() * 30) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setDownloads((prev) =>
          prev.map((d) =>
            d.id === id
              ? {
                  ...d,
                  progress: Math.min(i, 100),
                  size: `${Math.round(i * 0.5)} KB`,
                }
              : d
          )
        );
      }

      // Simulate file content
      const mockContent = `Downloaded from: ${url}\nDownloaded at: ${new Date().toLocaleString()}\n\nThis is a simulated download of: ${fname}`;

      // Save to file system
      createFile(fname, mockContent, 'root');

      // Mark as completed
      setDownloads((prev) =>
        prev.map((d) =>
          d.id === id
            ? {
                ...d,
                progress: 100,
                status: 'completed',
                size: '512 KB',
              }
            : d
        )
      );
    } catch (error) {
      setDownloads((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: 'failed' } : d))
      );
    }
  };

  const handleDelete = (id: string) => {
    saveDownloads(downloads.filter((d) => d.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'downloading':
        return 'text-blue-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#DFDFDF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 flex justify-between items-center border-b-2 border-gray-400">
        <span className="font-bold">Download Manager</span>
      </div>

      {/* Download Input */}
      <div className="bg-gray-100 border-b-2 border-gray-400 p-3 space-y-2">
        <div>
          <label className="text-xs font-bold block mb-1">URL:</label>
          <input
            type="text"
            placeholder="https://example.com/file.txt"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
            className="w-full px-2 py-1 border-2 border-gray-400 rounded text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-bold block mb-1">Filename (optional):</label>
          <input
            type="text"
            placeholder="custom-name.txt"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="w-full px-2 py-1 border-2 border-gray-400 rounded text-xs"
          />
        </div>
        <button
          onClick={handleDownload}
          className="xp-button w-full flex items-center justify-center gap-2 text-xs"
        >
          <Download size={14} />
          Download
        </button>
      </div>

      {/* Downloads List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {downloads.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-xs">
            No downloads yet. Enter a URL to start downloading.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {downloads.map((download) => (
              <div key={download.id} className="p-3 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{download.filename}</div>
                    <div className="text-xs text-gray-500 truncate">{download.url}</div>
                  </div>
                  <button
                    onClick={() => handleDelete(download.id)}
                    className="p-1 hover:bg-red-200 rounded ml-2"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full transition-all"
                      style={{ width: `${download.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold w-12 text-right">
                    {Math.round(download.progress)}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className={`font-medium ${getStatusColor(download.status)}`}>
                    {download.status.charAt(0).toUpperCase() + download.status.slice(1)}
                  </span>
                  <span className="text-gray-500">{download.size}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-[#DFDFDF] border-t-2 border-gray-400 px-3 py-2 text-xs text-gray-600">
        {downloads.length} download(s)
      </div>
    </div>
  );
};
