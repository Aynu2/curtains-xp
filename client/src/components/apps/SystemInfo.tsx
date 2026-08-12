import React, { useState } from 'react';

type Tab = 'general' | 'hardware' | 'network' | 'performance';

export const SystemInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('general');

  const getUptime = () => {
    const hours = Math.floor(Math.random() * 720);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="flex flex-col h-full [background-color:#DFDFDF]">
      {/* Tab Bar */}
      <div className="flex gap-1 p-2 bg-[background-color:#C0C0C0] border-b-2 border-gray-400">
        {(['general', 'hardware', 'network', 'performance'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 text-xs font-bold rounded ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'xp-button'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {activeTab === 'general' && (
          <div className="space-y-3">
            <div className="border-2 border-gray-400 p-3 bg-white">
              <h3 className="font-bold text-xs mb-2">System Information</h3>
              <div className="space-y-1 text-xs">
                <div><span className="font-bold">Computer Name:</span> CURTAINS-PC</div>
                <div><span className="font-bold">Operating System:</span> Curtains XP Professional</div>
                <div><span className="font-bold">Version:</span> 1.0.0</div>
                <div><span className="font-bold">Build:</span> 2026</div>
                <div><span className="font-bold">System Type:</span> x86-64 Virtual Machine</div>
                <div><span className="font-bold">Uptime:</span> {getUptime()}</div>
              </div>
            </div>

            <div className="border-2 border-gray-400 p-3 bg-white">
              <h3 className="font-bold text-xs mb-2">Processor</h3>
              <div className="space-y-1 text-xs">
                <div><span className="font-bold">Processor:</span> Virtual CPU @ 2.4 GHz</div>
                <div><span className="font-bold">Cores:</span> 4</div>
                <div><span className="font-bold">Threads:</span> 8</div>
                <div><span className="font-bold">Cache:</span> 8 MB L3</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hardware' && (
          <div className="space-y-3">
            <div className="border-2 border-gray-400 p-3 bg-white">
              <h3 className="font-bold text-xs mb-2">Memory</h3>
              <div className="space-y-1 text-xs">
                <div><span className="font-bold">Total RAM:</span> 8192 MB (8 GB)</div>
                <div><span className="font-bold">Available:</span> 6144 MB (6 GB)</div>
                <div><span className="font-bold">Used:</span> 2048 MB (2 GB)</div>
                <div className="mt-2">
                  <div className="bg-gray-200 h-4 rounded border-2 border-gray-400">
                    <div className="bg-blue-500 h-full w-1/4 rounded" />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">25% Used</div>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-400 p-3 bg-white">
              <h3 className="font-bold text-xs mb-2">Storage Devices</h3>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="font-bold">Local Disk (C:)</div>
                  <div className="text-gray-600">500 GB Total - 350 GB Free</div>
                  <div className="bg-gray-200 h-3 rounded border-2 border-gray-400 mt-1">
                    <div className="bg-green-500 h-full w-2/3 rounded" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-400 p-3 bg-white">
              <h3 className="font-bold text-xs mb-2">Display</h3>
              <div className="space-y-1 text-xs">
                <div><span className="font-bold">Resolution:</span> 1920 x 1080</div>
                <div><span className="font-bold">Refresh Rate:</span> 60 Hz</div>
                <div><span className="font-bold">Color Depth:</span> 32-bit</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-3">
            <div className="border-2 border-gray-400 p-3 bg-white">
              <h3 className="font-bold text-xs mb-2">Network Adapter</h3>
              <div className="space-y-1 text-xs">
                <div><span className="font-bold">Adapter:</span> Ethernet</div>
                <div><span className="font-bold">Status:</span> Connected</div>
                <div><span className="font-bold">IPv4 Address:</span> 192.168.1.100</div>
                <div><span className="font-bold">Subnet Mask:</span> 255.255.255.0</div>
                <div><span className="font-bold">Gateway:</span> 192.168.1.1</div>
                <div><span className="font-bold">DNS:</span> 8.8.8.8, 8.8.4.4</div>
              </div>
            </div>

            <div className="border-2 border-gray-400 p-3 bg-white">
              <h3 className="font-bold text-xs mb-2">Network Statistics</h3>
              <div className="space-y-1 text-xs">
                <div><span className="font-bold">Bytes Sent:</span> 1.2 GB</div>
                <div><span className="font-bold">Bytes Received:</span> 2.8 GB</div>
                <div><span className="font-bold">Packets Sent:</span> 450,000</div>
                <div><span className="font-bold">Packets Received:</span> 520,000</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-3">
            <div className="border-2 border-gray-400 p-3 bg-white">
              <h3 className="font-bold text-xs mb-2">CPU Usage</h3>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {Math.floor(Math.random() * 40)}%
              </div>
              <div className="bg-gray-200 h-4 rounded border-2 border-gray-400">
                <div
                  className="bg-blue-500 h-full rounded"
                  style={{ width: `${Math.floor(Math.random() * 40)}%` }}
                />
              </div>
            </div>

            <div className="border-2 border-gray-400 p-3 bg-white">
              <h3 className="font-bold text-xs mb-2">Memory Usage</h3>
              <div className="text-2xl font-bold text-green-600 mb-2">
                {Math.floor(Math.random() * 30)}%
              </div>
              <div className="bg-gray-200 h-4 rounded border-2 border-gray-400">
                <div
                  className="bg-green-500 h-full rounded"
                  style={{ width: `${Math.floor(Math.random() * 30)}%` }}
                />
              </div>
            </div>

            <div className="border-2 border-gray-400 p-3 bg-white">
              <h3 className="font-bold text-xs mb-2">Disk Usage</h3>
              <div className="text-2xl font-bold text-orange-600 mb-2">
                30%
              </div>
              <div className="bg-gray-200 h-4 rounded border-2 border-gray-400">
                <div className="bg-orange-500 h-full w-1/3 rounded" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
