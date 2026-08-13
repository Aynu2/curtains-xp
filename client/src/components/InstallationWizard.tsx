import React, { useState } from 'react';

type InstallationStep = 'welcome' | 'license' | 'destination' | 'components' | 'settings' | 'network' | 'progress' | 'completion';

interface SelectedComponents {
  fileExplorer: boolean;
  calculator: boolean;
  terminal: boolean;
  notepad: boolean;
  settings: boolean;
  games: boolean;
  browser: boolean;
  weatherWidget: boolean;
  newsReader: boolean;
}

interface InstallationWizardProps {
  onInstallationComplete: (components: SelectedComponents) => void;
}

export const InstallationWizard: React.FC<InstallationWizardProps> = ({ onInstallationComplete }) => {
  const [currentStep, setCurrentStep] = useState<InstallationStep>('welcome');
  const [licenseAccepted, setLicenseAccepted] = useState(false);
  const [destinationFolder, setDestinationFolder] = useState('C:\\Program Files\\Curtains XP');
  const [selectedComponents, setSelectedComponents] = useState<SelectedComponents>({
    fileExplorer: true,
    calculator: true,
    terminal: true,
    notepad: true,
    settings: true,
    games: true,
    browser: true,
    weatherWidget: true,
    newsReader: true,
  });
  const [installationProgress, setInstallationProgress] = useState(0);
  const [installationMessage, setInstallationMessage] = useState('Initializing installation...');
  const [setupSettings, setSetupSettings] = useState({
    theme: 'luna-blue',
    resolution: '1024 x 768',
    enableSound: true,
    autoUpdate: true,
  });
  const [networkSettings, setNetworkSettings] = useState({
    connectionType: 'ethernet',
    ipAddress: '192.168.1.100',
    autoDetect: true,
  });

  const handleLicenseAccept = () => {
    setLicenseAccepted(true);
    setCurrentStep('destination');
  };

  const handleDestinationNext = () => {
    setCurrentStep('components');
  };

  const handleComponentToggle = (component: keyof SelectedComponents) => {
    setSelectedComponents(prev => ({
      ...prev,
      [component]: !prev[component]
    }));
  };

  const handleComponentsNext = () => {
    setCurrentStep('settings');
  };

  const handleSettingsNext = () => {
    setCurrentStep('network');
  };

  const handleNetworkNext = () => {
    setCurrentStep('progress');
    simulateInstallation();
  };

  const simulateInstallation = () => {
    const messages = [
      'Extracting files...',
      'Copying system files...',
      'Installing components...',
      'Configuring settings...',
      'Registering applications...',
      'Creating shortcuts...',
      'Finalizing installation...',
      'Installation complete!',
    ];

    let progress = 0;
    let messageIndex = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 12;
      const newMessageIndex = Math.floor((progress / 100) * messages.length);
      
      if (newMessageIndex > messageIndex && newMessageIndex < messages.length) {
        messageIndex = newMessageIndex;
        setInstallationMessage(messages[messageIndex]);
      }

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setInstallationProgress(100);
          setInstallationMessage('Installation complete!');
          setCurrentStep('completion');
        }, 500);
      } else {
        setInstallationProgress(Math.floor(progress));
      }
    }, 300);
  };

  const handleFinish = () => {
    onInstallationComplete(selectedComponents);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="xp-window w-full max-w-2xl max-h-96 flex flex-col">
        {/* Title Bar */}
        <div className="xp-titlebar">
          <span>Curtains XP Setup Wizard</span>
          <button className="xp-window-control text-xs">×</button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 bg-[background-color:#DFDFDF]">
          {currentStep === 'welcome' && (
            <div className="space-y-4">
              <h2 className="font-bold text-sm mb-4">Welcome to Curtains XP Setup</h2>
              <div className="border-2 border-gray-400 p-4 bg-white">
                <p className="text-xs mb-3">
                  Welcome to the Curtains XP Setup Wizard. This wizard will guide you through the installation process.
                </p>
                <p className="text-xs mb-3">
                  The setup wizard will help you:
                </p>
                <ul className="text-xs ml-4 space-y-1 mb-3">
                  <li>• Review the End User License Agreement</li>
                  <li>• Select an installation folder</li>
                  <li>• Choose components to install</li>
                  <li>• Configure system settings</li>
                  <li>• Set up network connection</li>
                  <li>• Complete the installation</li>
                </ul>
                <p className="text-xs text-gray-600">
                  Click "Next" to continue.
                </p>
              </div>
            </div>
          )}

          {currentStep === 'license' && (
            <div className="space-y-4">
              <h2 className="font-bold text-sm mb-4">License Agreement</h2>
              <div className="border-2 border-gray-400 p-3 h-40 overflow-y-auto bg-white text-xs">
                <p className="mb-2 font-bold">CURTAINS XP - END USER LICENSE AGREEMENT</p>
                <p className="mb-2">
                  This software is provided "as-is" for entertainment and educational purposes. 
                  By installing Curtains XP, you agree to the following terms:
                </p>
                <p className="mb-2">
                  1. This software may be freely used and modified for personal use.
                </p>
                <p className="mb-2">
                  2. The software is provided without warranty of any kind.
                </p>
                <p className="mb-2">
                  3. The creators are not liable for any issues arising from use of this software.
                </p>
                <p className="mb-2">
                  4. This is a tribute to Windows XP and is not affiliated with Microsoft Corporation.
                </p>
                <p>
                  By clicking "I Agree", you accept these terms and conditions.
                </p>
              </div>
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={licenseAccepted}
                  onChange={(e) => setLicenseAccepted(e.target.checked)}
                  className="cursor-pointer"
                />
                I agree to the License Agreement
              </label>
            </div>
          )}

          {currentStep === 'destination' && (
            <div className="space-y-4">
              <h2 className="font-bold text-sm mb-4">Select Installation Folder</h2>
              <p className="text-xs mb-2">Choose where to install Curtains XP:</p>

              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setDestinationFolder('C:\\Program Files\\Curtains XP')}
                  className={`xp-button text-xs px-3 py-1 ${destinationFolder.startsWith('C:') ? 'ring-2 ring-blue-500' : ''}`}
                >
                  💾 C: Drive
                </button>
                <button
                  onClick={() => setDestinationFolder('E:\\Program Files\\Curtains XP')}
                  className={`xp-button text-xs px-3 py-1 ${destinationFolder.startsWith('E:') ? 'ring-2 ring-blue-500' : ''}`}
                >
                  💿 E: Drive
                </button>
              </div>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={destinationFolder}
                  onChange={(e) => setDestinationFolder(e.target.value)}
                  className="xp-input flex-1 text-xs"
                />
                <button className="xp-button text-xs">Browse...</button>
              </div>
              <div className="border-2 border-gray-400 p-2 bg-white text-xs">
                <p className="font-bold mb-1">Installation Information:</p>
                <p>Space required: ~50 MB</p>
                <p>Available space: {destinationFolder.startsWith('E:') ? '~2 TB' : '~500 GB'}</p>
                <p className="mt-1 text-gray-600">Drive: {destinationFolder.startsWith('E:') ? 'E: (Secondary)' : 'C: (System)'}</p>
              </div>
            </div>
          )}

          {currentStep === 'components' && (
            <div className="space-y-4">
              <h2 className="font-bold text-sm mb-4">Select Components</h2>
              <p className="text-xs mb-3">Choose which components to install:</p>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {[
                  { key: 'fileExplorer', label: 'File Explorer', desc: 'Browse files and folders' },
                  { key: 'calculator', label: 'Calculator', desc: 'Basic calculator application' },
                  { key: 'terminal', label: 'Terminal', desc: 'Command-line interface' },
                  { key: 'notepad', label: 'Notepad', desc: 'Text editor' },
                  { key: 'settings', label: 'Settings', desc: 'System configuration' },
                  { key: 'games', label: 'Games', desc: 'Snake, Minesweeper, Tic Tac Toe' },
                  { key: 'browser', label: 'Internet Browser', desc: 'Web browsing with Google search' },
                  { key: 'weatherWidget', label: 'Weather Widget', desc: 'Real-time weather data' },
                  { key: 'newsReader', label: 'News Reader', desc: 'Latest news feeds' },
                ].map(({ key, label, desc }) => (
                  <label key={key} className="flex items-start gap-2 text-xs p-2 hover:bg-blue-100">
                    <input
                      type="checkbox"
                      checked={selectedComponents[key as keyof SelectedComponents]}
                      onChange={() => handleComponentToggle(key as keyof SelectedComponents)}
                      className="cursor-pointer mt-0.5"
                    />
                    <div>
                      <div className="font-bold">{label}</div>
                      <div className="text-gray-600">{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'settings' && (
            <div className="space-y-4">
              <h2 className="font-bold text-sm mb-4">System Settings</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold">Theme:</label>
                  <select 
                    value={setupSettings.theme}
                    onChange={(e) => setSetupSettings({...setupSettings, theme: e.target.value})}
                    className="xp-input w-full text-xs mt-1"
                  >
                    <option value="luna-blue">Luna Blue</option>
                    <option value="luna-silver">Luna Silver</option>
                    <option value="royale">Royale</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold">Resolution:</label>
                  <select 
                    value={setupSettings.resolution}
                    onChange={(e) => setSetupSettings({...setupSettings, resolution: e.target.value})}
                    className="xp-input w-full text-xs mt-1"
                  >
                    <option value="800 x 600">800 x 600</option>
                    <option value="1024 x 768">1024 x 768</option>
                    <option value="1280 x 1024">1280 x 1024</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 text-xs">
                  <input 
                    type="checkbox" 
                    checked={setupSettings.enableSound}
                    onChange={(e) => setSetupSettings({...setupSettings, enableSound: e.target.checked})}
                  />
                  <span>Enable system sounds</span>
                </label>
                <label className="flex items-center gap-2 text-xs">
                  <input 
                    type="checkbox" 
                    checked={setupSettings.autoUpdate}
                    onChange={(e) => setSetupSettings({...setupSettings, autoUpdate: e.target.checked})}
                  />
                  <span>Enable automatic updates</span>
                </label>
              </div>
            </div>
          )}

          {currentStep === 'network' && (
            <div className="space-y-4">
              <h2 className="font-bold text-sm mb-4">Network Configuration</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold">Connection Type:</label>
                  <select 
                    value={networkSettings.connectionType}
                    onChange={(e) => setNetworkSettings({...networkSettings, connectionType: e.target.value})}
                    className="xp-input w-full text-xs mt-1"
                  >
                    <option value="ethernet">Ethernet</option>
                    <option value="wifi">WiFi</option>
                    <option value="dialup">Dial-up</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold">IP Address:</label>
                  <input 
                    type="text" 
                    value={networkSettings.ipAddress}
                    onChange={(e) => setNetworkSettings({...networkSettings, ipAddress: e.target.value})}
                    className="xp-input w-full text-xs mt-1"
                  />
                </div>
                <label className="flex items-center gap-2 text-xs">
                  <input 
                    type="checkbox" 
                    checked={networkSettings.autoDetect}
                    onChange={(e) => setNetworkSettings({...networkSettings, autoDetect: e.target.checked})}
                  />
                  <span>Automatically detect network settings</span>
                </label>
              </div>
            </div>
          )}

          {currentStep === 'progress' && (
            <div className="space-y-4">
              <h2 className="font-bold text-sm mb-4">Installing Curtains XP...</h2>
              <div className="space-y-2">
                <div className="xp-progress">
                  <div className="xp-progress-fill" style={{ width: `${installationProgress}%` }} />
                </div>
                <p className="text-xs text-center font-bold">{installationProgress}% Complete</p>
              </div>
              <p className="text-xs text-gray-600 text-center">
                {installationMessage}
              </p>
            </div>
          )}

          {currentStep === 'completion' && (
            <div className="space-y-4">
              <h2 className="font-bold text-sm mb-4">Installation Complete!</h2>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600 mb-4">✓</p>
                <p className="text-xs mb-4">
                  Curtains XP has been successfully installed on your computer.
                </p>
                <p className="text-xs text-gray-600 mb-4">
                  You can now use all installed components from the Start Menu.
                </p>
                <p className="text-xs text-gray-600">
                  Click "Finish" to complete the setup wizard.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Button Bar */}
        <div className="bg-[background-color:#C0C0C0] border-t-2 border-gray-400 p-3 flex justify-end gap-2">
          {currentStep !== 'welcome' && currentStep !== 'completion' && (
            <button
              onClick={() => {
                if (currentStep === 'license') setCurrentStep('welcome');
                else if (currentStep === 'destination') setCurrentStep('license');
                else if (currentStep === 'components') setCurrentStep('destination');
                else if (currentStep === 'settings') setCurrentStep('components');
                else if (currentStep === 'network') setCurrentStep('settings');
              }}
              className="xp-button text-xs px-6"
            >
              &lt; Back
            </button>
          )}

          {currentStep === 'welcome' && (
            <button
              onClick={() => setCurrentStep('license')}
              className="xp-button text-xs px-6"
            >
              Next &gt;
            </button>
          )}

          {currentStep === 'license' && (
            <button
              onClick={handleLicenseAccept}
              disabled={!licenseAccepted}
              className="xp-button text-xs px-6 disabled:opacity-50"
            >
              Next &gt;
            </button>
          )}

          {currentStep === 'destination' && (
            <button
              onClick={handleDestinationNext}
              className="xp-button text-xs px-6"
            >
              Next &gt;
            </button>
          )}

          {currentStep === 'components' && (
            <button
              onClick={handleComponentsNext}
              className="xp-button text-xs px-6"
            >
              Next &gt;
            </button>
          )}

          {currentStep === 'settings' && (
            <button
              onClick={handleSettingsNext}
              className="xp-button text-xs px-6"
            >
              Next &gt;
            </button>
          )}

          {currentStep === 'network' && (
            <button
              onClick={handleNetworkNext}
              className="xp-button text-xs px-6"
            >
              Install
            </button>
          )}

          {currentStep === 'completion' && (
            <button
              onClick={handleFinish}
              className="xp-button text-xs px-6"
            >
              Finish
            </button>
          )}

          {currentStep !== 'progress' && currentStep !== 'completion' && (
            <button
              className="xp-button text-xs px-6"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
