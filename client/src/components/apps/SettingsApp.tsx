import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useOS } from '@/contexts/OSContext';
import { getThemeNames } from '@/lib/themes';
import { useSoundEffect } from '@/hooks/useSoundEffect';

export const SettingsApp: React.FC = () => {
  const { playSound } = useSoundEffect();
  const { theme, setTheme } = useOS();
  const [selectedCategory, setSelectedCategory] = useState('display');
  const [settings, setSettings] = useState({
    resolution: '1024 x 768',
    colorQuality: '32-bit',
    refreshRate: '60',
    volume: 75,
    systemSounds: true,
    startupSound: true,
    mouseTrails: true,
    pointerSpeed: 5,
    keyboardRepeat: true,
    repeatDelay: 3,
    screenSaver: 'starfield',
    screenSaverTimeout: 10,
    powerSave: true,
    autoHibernate: true,
    hibernateTimeout: 30,
    fontSmoothing: true,
    clearType: true,
    showFileExtensions: true,
    showHiddenFiles: false,
    enableVisualThemes: true,
    enableWindowAnimation: true,
    enableMenuAnimation: true,
    enableCompositing: true,
    soundScheme: 'windows-default',
    powerScheme: 'home-office',
    folderView: 'common-tasks',
    repeatRate: 5,
    snapToDefault: true,
  });

  const categories = [
    { id: 'display', name: 'Display Settings', icon: '🖥️' },
    { id: 'themes', name: 'Themes', icon: '🎨' },
    { id: 'sound', name: 'Sound Settings', icon: '🔊' },
    { id: 'network', name: 'Network Connections', icon: '🌐' },
    { id: 'system', name: 'System Properties', icon: '⚙️' },
    { id: 'keyboard', name: 'Keyboard Settings', icon: '⌨️' },
    { id: 'mouse', name: 'Mouse Settings', icon: '🖱️' },
    { id: 'screensaver', name: 'Screen Saver', icon: '🎬' },
    { id: 'power', name: 'Power Options', icon: '⚡' },
    { id: 'folder', name: 'Folder Options', icon: '📁' },
    { id: 'accessibility', name: 'Accessibility', icon: '♿' },
    { id: 'performance', name: 'Performance', icon: '⚙️' },
  ];

  const settingsContent: Record<string, React.ReactNode> = {
    themes: (
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold mb-2 block">Select Theme:</label>
          <div className="space-y-2">
            {getThemeNames().map((themeOption) => (
              <label key={themeOption.value} className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value={themeOption.value}
                  checked={theme === themeOption.value}
                  onChange={(e) => setTheme(e.target.value as any)}
                />
                <span>{themeOption.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mt-6 p-3 border-2 border-gray-400 bg-white">
          <p className="text-xs font-bold mb-2">Theme Preview:</p>
          <div className="flex gap-2">
            <div
              className="flex-1 p-2 rounded"
              style={{
                background: 'linear-gradient(to bottom, #DFDFDF, #BFBFBF)',
                border: '2px solid #FFFFFF',
                boxShadow: 'inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #808080',
              }}
            >
              <span className="text-xs">Inactive</span>
            </div>
            <div
              className="flex-1 p-2 rounded"
              style={{
                background:
                  theme === 'luna-blue'
                    ? 'linear-gradient(to bottom, #0099CC, #0066AA)'
                    : theme === 'luna-silver'
                    ? 'linear-gradient(to bottom, #C0C0C0, #A0A0A0)'
                    : 'linear-gradient(to bottom, #1E90FF, #1873CC)',
                border: '2px solid #0066AA',
                color: 'white',
              }}
            >
              <span className="text-xs">Active</span>
            </div>
          </div>
        </div>
      </div>
    ),
    display: (
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold">Resolution:</label>
          <select 
            className="xp-input w-full text-xs mt-1"
            value={settings.resolution}
            onChange={(e) => setSettings({...settings, resolution: e.target.value})}
          >
            <option>640 x 480</option>
            <option>800 x 600</option>
            <option>1024 x 768</option>
            <option>1280 x 1024</option>
            <option>1600 x 1200</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold">Color Quality:</label>
          <select 
            className="xp-input w-full text-xs mt-1"
            value={settings.colorQuality}
            onChange={(e) => setSettings({...settings, colorQuality: e.target.value})}
          >
            <option value="16-bit">16-bit (65,536 colors)</option>
            <option value="32-bit">32-bit (16.7 million colors)</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold">Refresh Rate:</label>
          <select 
            className="xp-input w-full text-xs mt-1"
            value={settings.refreshRate}
            onChange={(e) => setSettings({...settings, refreshRate: e.target.value})}
          >
            <option value="60">60 Hz</option>
            <option value="75">75 Hz</option>
            <option value="85">85 Hz</option>
            <option value="100">100 Hz</option>
          </select>
        </div>
        <div>
          <label className="flex items-center gap-2 text-xs mt-4">
            <input 
              type="checkbox" 
              checked={settings.fontSmoothing}
              onChange={(e) => setSettings({...settings, fontSmoothing: e.target.checked})}
            />
            <span>Enable font smoothing (ClearType)</span>
          </label>
        </div>
      </div>
    ),
    sound: (
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold">Master Volume:</label>
          <div className="flex gap-2 items-center">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={settings.volume}
              onChange={(e) => setSettings({...settings, volume: parseInt(e.target.value)})}
              className="flex-1 mt-1" 
            />
            <span className="text-xs w-8">{settings.volume}%</span>
          </div>
        </div>
        <div className="border-t pt-4">
          <p className="text-xs font-bold mb-2">Sound Schemes:</p>
          <label className="flex items-center gap-2 text-xs">
            <input 
              type="radio" 
              name="scheme" 
              checked={settings.soundScheme === 'windows-default'}
              onChange={() => setSettings({...settings, soundScheme: 'windows-default'})}
            />
            <span>Windows Default</span>
          </label>
          <label className="flex items-center gap-2 text-xs">
            <input 
              type="radio" 
              name="scheme"
              checked={settings.soundScheme === 'no-sounds'}
              onChange={() => setSettings({...settings, soundScheme: 'no-sounds'})}
            />
            <span>No Sounds</span>
          </label>
          <label className="flex items-center gap-2 text-xs">
            <input 
              type="radio" 
              name="scheme"
              checked={settings.soundScheme === 'robotz'}
              onChange={() => setSettings({...settings, soundScheme: 'robotz'})}
            />
            <span>Robotz</span>
          </label>
        </div>
        <div className="border-t pt-4">
          <label className="flex items-center gap-2 text-xs">
            <input 
              type="checkbox" 
              checked={settings.systemSounds}
              onChange={(e) => setSettings({...settings, systemSounds: e.target.checked})}
            />
            <span>Enable system sounds</span>
          </label>
          <label className="flex items-center gap-2 text-xs mt-2">
            <input 
              type="checkbox" 
              checked={settings.startupSound}
              onChange={(e) => setSettings({...settings, startupSound: e.target.checked})}
            />
            <span>Play startup sound</span>
          </label>
        </div>
      </div>
    ),
    network: (
      <div className="space-y-4">
        <div className="bg-blue-100 border-l-4 border-blue-500 p-3">
          <p className="text-xs font-bold">Network Status: Connected</p>
          <p className="text-xs mt-1">IP Address: 192.168.1.100</p>
          <p className="text-xs">Subnet Mask: 255.255.255.0</p>
          <p className="text-xs">Gateway: 192.168.1.1</p>
          <p className="text-xs">Connection: Ethernet (100 Mbps)</p>
          <p className="text-xs">DNS: 8.8.8.8, 8.8.4.4</p>
        </div>
        <div className="border-2 border-gray-400 p-2">
          <p className="text-xs font-bold mb-2">Network Adapters:</p>
          <p className="text-xs">Realtek RTL8139 Ethernet - Connected</p>
        </div>
      </div>
    ),
    system: (
      <div className="space-y-4">
        <div className="bg-blue-100 border-l-4 border-blue-500 p-3">
          <p className="text-xs font-bold">System Information</p>
          <p className="text-xs mt-1">OS: Curtains XP Professional</p>
          <p className="text-xs">Version: 5.1.2600</p>
          <p className="text-xs">Build: Service Pack 3</p>
          <p className="text-xs">Processor: Intel Pentium 4 @ 2.4 GHz</p>
          <p className="text-xs">RAM: 512 MB</p>
          <p className="text-xs">Hard Drive: 80 GB</p>
          <p className="text-xs">Uptime: 2 days, 5 hours</p>
        </div>
        <div className="border-2 border-gray-400 p-2">
          <p className="text-xs font-bold mb-1">Device Manager</p>
          <p className="text-xs">All devices functioning normally</p>
        </div>
      </div>
    ),
    keyboard: (
      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-xs">
            <input 
              type="checkbox" 
              checked={settings.keyboardRepeat}
              onChange={(e) => setSettings({...settings, keyboardRepeat: e.target.checked})}
            />
            <span>Enable keyboard repeat</span>
          </label>
        </div>
        <div>
          <label className="text-xs font-bold">Repeat delay:</label>
          <input 
            type="range" 
            min="1" 
            max="5" 
            value={settings.repeatDelay}
            onChange={(e) => setSettings({...settings, repeatDelay: parseInt(e.target.value)})}
            className="w-full mt-1" 
          />
          <p className="text-xs text-gray-600 mt-1">Short ← → Long</p>
        </div>
        <div>
          <label className="text-xs font-bold">Repeat rate:</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={settings.repeatRate}
            onChange={(e) => setSettings({...settings, repeatRate: parseInt(e.target.value)})}
            className="w-full mt-1" 
          />
          <p className="text-xs text-gray-600 mt-1">Slow ← → Fast</p>
        </div>
      </div>
    ),
    mouse: (
      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-xs">
            <input 
              type="checkbox" 
              checked={settings.mouseTrails}
              onChange={(e) => setSettings({...settings, mouseTrails: e.target.checked})}
            />
            <span>Enable mouse pointer trails</span>
          </label>
        </div>
        <div>
          <label className="text-xs font-bold">Pointer speed:</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={settings.pointerSpeed}
            onChange={(e) => setSettings({...settings, pointerSpeed: parseInt(e.target.value)})}
            className="w-full mt-1" 
          />
          <p className="text-xs text-gray-600 mt-1">Slow ← → Fast</p>
        </div>
        <div>
          <label className="flex items-center gap-2 text-xs mt-4">
            <input 
              type="checkbox" 
              checked={settings.snapToDefault}
              onChange={(e) => setSettings({...settings, snapToDefault: e.target.checked})}
            />
            <span>Snap to default button</span>
          </label>
        </div>
      </div>
    ),
    screensaver: (
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold">Screen Saver:</label>
          <select 
            className="xp-input w-full text-xs mt-1"
            value={settings.screenSaver}
            onChange={(e) => setSettings({...settings, screenSaver: e.target.value})}
          >
            <option value="none">(None)</option>
            <option value="starfield">Starfield</option>
            <option value="bubbles">Bubbles</option>
            <option value="mystify">Mystify</option>
            <option value="scrolling">Scrolling Marquee</option>
            <option value="3d">3D Maze</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold">Wait: {settings.screenSaverTimeout} minutes</label>
          <input 
            type="range" 
            min="1" 
            max="60" 
            value={settings.screenSaverTimeout}
            onChange={(e) => setSettings({...settings, screenSaverTimeout: parseInt(e.target.value)})}
            className="w-full mt-1" 
          />
        </div>
        <button className="xp-button text-xs mt-4">Preview</button>
      </div>
    ),
    power: (
      <div className="space-y-4">
        <div className="border-2 border-gray-400 p-2">
          <p className="text-xs font-bold mb-2">Power Schemes</p>
          <label className="flex items-center gap-2 text-xs">
            <input 
              type="radio" 
              name="power" 
              checked={settings.powerScheme === 'home-office'}
              onChange={() => setSettings({...settings, powerScheme: 'home-office'})}
            />
            <span>Home/Office Desk</span>
          </label>
          <label className="flex items-center gap-2 text-xs">
            <input 
              type="radio" 
              name="power"
              checked={settings.powerScheme === 'portable'}
              onChange={() => setSettings({...settings, powerScheme: 'portable'})}
            />
            <span>Portable/Laptop</span>
          </label>
          <label className="flex items-center gap-2 text-xs">
            <input 
              type="radio" 
              name="power"
              checked={settings.powerScheme === 'presentation'}
              onChange={() => setSettings({...settings, powerScheme: 'presentation'})}
            />
            <span>Presentation</span>
          </label>
        </div>
        <div className="border-t pt-4">
          <label className="flex items-center gap-2 text-xs">
            <input 
              type="checkbox" 
              checked={settings.powerSave}
              onChange={(e) => setSettings({...settings, powerSave: e.target.checked})}
            />
            <span>Enable power saving</span>
          </label>
          <label className="flex items-center gap-2 text-xs mt-2">
            <input 
              type="checkbox" 
              checked={settings.autoHibernate}
              onChange={(e) => setSettings({...settings, autoHibernate: e.target.checked})}
            />
            <span>Enable hibernation</span>
          </label>
        </div>
        <div className="border-t pt-4">
          <label className="text-xs font-bold">Hibernate after: {settings.hibernateTimeout} minutes</label>
          <input 
            type="range" 
            min="10" 
            max="120" 
            value={settings.hibernateTimeout}
            onChange={(e) => setSettings({...settings, hibernateTimeout: parseInt(e.target.value)})}
            className="w-full mt-1" 
          />
        </div>
      </div>
    ),
    folder: (
      <div className="space-y-4">
        <div className="border-2 border-gray-400 p-2">
          <p className="text-xs font-bold mb-2">View Options</p>
          <label className="flex items-center gap-2 text-xs">
            <input 
              type="checkbox" 
              checked={settings.showFileExtensions}
              onChange={(e) => setSettings({...settings, showFileExtensions: e.target.checked})}
            />
            <span>Show file extensions</span>
          </label>
          <label className="flex items-center gap-2 text-xs mt-2">
            <input 
              type="checkbox" 
              checked={settings.showHiddenFiles}
              onChange={(e) => setSettings({...settings, showHiddenFiles: e.target.checked})}
            />
            <span>Show hidden files and folders</span>
          </label>
        </div>
        <div className="border-t pt-4">
          <p className="text-xs font-bold mb-2">Folder View</p>
          <label className="flex items-center gap-2 text-xs">
            <input 
              type="radio" 
              name="view" 
              checked={settings.folderView === 'common-tasks'}
              onChange={() => setSettings({...settings, folderView: 'common-tasks'})}
            />
            <span>Show common tasks</span>
          </label>
          <label className="flex items-center gap-2 text-xs">
            <input 
              type="radio" 
              name="view"
              checked={settings.folderView === 'classic'}
              onChange={() => setSettings({...settings, folderView: 'classic'})}
            />
            <span>Use Windows classic folders</span>
          </label>
        </div>
      </div>
    ),
    accessibility: (
      <div className="space-y-4">
        <div className="border-2 border-gray-400 p-2">
          <p className="text-xs font-bold mb-2">Accessibility Options</p>
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" />
            <span>Use StickyKeys</span>
          </label>
          <label className="flex items-center gap-2 text-xs mt-2">
            <input type="checkbox" />
            <span>Use FilterKeys</span>
          </label>
          <label className="flex items-center gap-2 text-xs mt-2">
            <input type="checkbox" />
            <span>Use ToggleKeys</span>
          </label>
          <label className="flex items-center gap-2 text-xs mt-2">
            <input type="checkbox" />
            <span>Use MouseKeys</span>
          </label>
        </div>
        <div className="border-t pt-4">
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" />
            <span>High contrast</span>
          </label>
          <label className="flex items-center gap-2 text-xs mt-2">
            <input type="checkbox" />
            <span>Use sound instead of visual indicators</span>
          </label>
        </div>
      </div>
    ),
    performance: (
      <div className="space-y-4">
        <div className="border-2 border-gray-400 p-2">
          <p className="text-xs font-bold mb-2">Visual Effects</p>
          <label className="flex items-center gap-2 text-xs">
            <input 
              type="checkbox" 
              checked={settings.enableWindowAnimation}
              onChange={(e) => setSettings({...settings, enableWindowAnimation: e.target.checked})}
            />
            <span>Animate windows when minimizing/maximizing</span>
          </label>
          <label className="flex items-center gap-2 text-xs mt-2">
            <input 
              type="checkbox" 
              checked={settings.enableMenuAnimation}
              onChange={(e) => setSettings({...settings, enableMenuAnimation: e.target.checked})}
            />
            <span>Fade or slide menus into view</span>
          </label>
          <label className="flex items-center gap-2 text-xs mt-2">
            <input 
              type="checkbox" 
              checked={settings.enableCompositing}
              onChange={(e) => setSettings({...settings, enableCompositing: e.target.checked})}
            />
            <span>Enable visual themes</span>
          </label>
        </div>
        <div className="border-t pt-4">
          <button className="xp-button text-xs">Optimize for Performance</button>
          <button className="xp-button text-xs ml-2">Optimize for Appearance</button>
        </div>
      </div>
    ),
  };

  return (
    <div className="flex h-full [background-color:#DFDFDF]">
      {/* Sidebar */}
      <div className="w-48 [background-color:#DFDFDF] border-r-2 border-gray-400 p-2 overflow-y-auto">
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playSound('click');
                setSelectedCategory(cat.id);
              }}
              className={`w-full text-left px-3 py-2 text-xs rounded transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-500 text-white font-bold'
                  : 'hover:bg-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{cat.icon}</span>
                <span className="truncate">{cat.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col [background-color:#DFDFDF]">
        <div className="flex-1 p-4 overflow-y-auto">
          <h2 className="text-sm font-bold mb-4">
            {categories.find((c) => c.id === selectedCategory)?.name}
          </h2>
          <div className="space-y-4">
            {settingsContent[selectedCategory]}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-2 justify-end p-4 border-t-2 border-gray-400">
          <button 
            onClick={() => playSound('click')} 
            className="xp-button text-xs"
          >
            Apply
          </button>
          <button 
            onClick={() => playSound('click')} 
            className="xp-button text-xs"
          >
            OK
          </button>
          <button 
            onClick={() => playSound('click')} 
            className="xp-button text-xs"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
