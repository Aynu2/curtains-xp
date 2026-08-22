import React, { useState, useEffect } from 'react';
import { useOS } from '@/contexts/OSContext';
import { IconXPLogo, IconHelp } from './XPIcons';

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

type WizardStage = 'menu' | 'components-dialog' | 'compatibility-dialog' | 'installing' | 'welcome-oobe' | 'user-setup' | 'oobe-complete';

export const InstallationWizard: React.FC<InstallationWizardProps> = ({ onInstallationComplete }) => {
  const { setUsername, setUserPassword } = useOS();
  const [stage, setStage] = useState<WizardStage>('menu');

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

  const [inputUsername, setInputUsername] = useState('Administrator');
  const [inputPassword, setInputPassword] = useState('');
  const [installProgress, setInstallProgress] = useState(0);
  const [installStepIndex, setInstallStepIndex] = useState(3); // 3 = Installing Curtains
  const [minutesRemaining, setMinutesRemaining] = useState(36);
  const [installStatusText, setInstallStatusText] = useState('Installing Devices');
  const [activeSlide, setActiveSlide] = useState(0);
  const [blinkDot, setBlinkDot] = useState(0);

  const showcaseSlides = [
    {
      title: 'Your computer will be faster and more reliable',
      body: 'Curtains® XP not only starts faster than any previous version, but it also runs your programs more quickly and reliably than ever. If a program becomes unstable, you can close it without having to shut down Curtains or lose any of your work.',
    },
    {
      title: 'An exciting new look and feel',
      body: 'Curtains® XP has a fresh, streamlined design that puts the most common tasks within easy reach. Cleaner visual style, simplified menus, and customizable themes make computing easier and more enjoyable.',
    },
    {
      title: 'The best experience for music, photos, and video',
      body: 'Curtains® XP makes it easy to organize, play, and share your favorite media. Enjoy digital music with Media Player, edit and view images with Picture Viewer, and create rich documents effortlessly.',
    },
    {
      title: 'Connected and secure computing',
      body: 'Built-in internet browsing, email communication, and local network sharing make collaborating easier. Enhanced security and system restore protect your personal files and computer configuration.',
    },
  ];

  // Blinking green activity dots in bottom right
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setBlinkDot((prev) => (prev + 1) % 4);
    }, 450);
    return () => clearInterval(dotInterval);
  }, []);

  // Slide rotator during installation
  useEffect(() => {
    if (stage === 'installing') {
      const slideInterval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % showcaseSlides.length);
      }, 7000);
      return () => clearInterval(slideInterval);
    }
  }, [stage, showcaseSlides.length]);

  // Installation simulation progress
  useEffect(() => {
    if (stage === 'installing') {
      const statuses = [
        'Preparing setup files...',
        'Installing Devices',
        'Configuring Network Settings',
        'Installing Curtains Components',
        'Registering Applications',
        'Saving System Configuration',
        'Finalizing Installation',
      ];

      const interval = setInterval(() => {
        setInstallProgress((prev) => {
          const next = prev + 1.2;
          const statusIdx = Math.min(Math.floor((next / 100) * statuses.length), statuses.length - 1);
          setInstallStatusText(statuses[statusIdx]);

          if (next >= 60 && installStepIndex < 4) {
            setInstallStepIndex(4); // Finalizing
          }

          const mins = Math.max(1, Math.round(36 - (next / 100) * 35));
          setMinutesRemaining(mins);

          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setStage('welcome-oobe');
            }, 800);
            return 100;
          }
          return next;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [stage, installStepIndex]);

  const handleComponentToggle = (key: keyof SelectedComponents) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleStartInstallation = () => {
    setInstallProgress(0);
    setInstallStepIndex(3);
    setMinutesRemaining(36);
    setStage('installing');
  };

  const handleFinishOOBE = () => {
    const user = inputUsername.trim() || 'Administrator';
    setUsername(user);
    if (inputPassword) setUserPassword(inputPassword);

    localStorage.setItem('curtains-xp-username', user);
    if (inputPassword) localStorage.setItem('curtains-xp-password', inputPassword);
    localStorage.setItem('curtains-xp-setup-complete', 'true');
    localStorage.setItem('curtains-xp-installed', 'true');

    onInstallationComplete(selectedComponents);
  };

  // Reusable Top Header Bar
  const renderHeader = () => (
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
  );

  // Reusable Bottom Footer Bar
  const renderFooter = (content: React.ReactNode) => (
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
        className="w-full h-14 flex items-center justify-between px-8"
        style={{
          background: 'linear-gradient(to bottom, #071F5E 0%, #00103A 100%)',
        }}
      >
        {content}
      </div>
    </div>
  );

  // =========================================================================
  // STAGE 1: AUTORUN / SETUP MENU ("What do you want to do?") - Image 3
  // =========================================================================
  if (stage === 'menu') {
    return (
      <div
        className="fixed inset-0 flex flex-col justify-between select-none overflow-hidden font-sans"
        style={{
          background: 'radial-gradient(circle at 18% 25%, #3B72DE 0%, #154CB8 35%, #072E8A 70%, #001B64 100%)',
          fontFamily: '"Tahoma", "Segoe UI", "Arial", sans-serif',
        }}
      >
        {renderHeader()}

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
          <div className="flex flex-col items-start max-w-xl w-full">
            {/* Title Header */}
            <div className="flex items-center gap-3 mb-8">
              <IconXPLogo size={36} />
              <h1
                className="text-white text-3xl font-bold italic tracking-wide"
                style={{
                  fontFamily: '"Franklin Gothic Medium", "Segoe UI", "Tahoma", sans-serif',
                  textShadow: '0 2px 6px rgba(0,0,0,0.8)',
                }}
              >
                Welcome to Curtains XP
              </h1>
            </div>

            {/* Sub-header with CD / Installer Box */}
            <div className="flex items-center gap-4 mb-6">
              {/* CD / Installer Graphic */}
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 drop-shadow-lg">
                <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
                  <rect x="4" y="6" width="30" height="36" rx="2" fill="#E2E8F0" stroke="#334155" strokeWidth="1" />
                  <rect x="4" y="6" width="30" height="8" fill="#3B82F6" />
                  <circle cx="30" cy="28" r="14" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.2" />
                  <circle cx="30" cy="28" r="5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" />
                  <circle cx="30" cy="28" r="2" fill="#0F172A" />
                </svg>
              </div>
              <h2
                className="text-white text-2xl font-bold tracking-wide"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
              >
                What do you want to do?
              </h2>
            </div>

            {/* Menu Option Buttons */}
            <div className="flex flex-col gap-3.5 w-full pl-6">
              <button
                onClick={handleStartInstallation}
                className="flex items-center gap-3 text-left text-white hover:text-yellow-200 transition-colors group cursor-pointer"
              >
                <span className="w-6 h-6 rounded-[3px] bg-[#388E3C] border border-[#1B5E20] text-white flex items-center justify-center font-bold text-xs shadow group-hover:bg-[#43A047] group-hover:scale-105 transition-transform">
                  ➔
                </span>
                <span
                  className="text-[16px] font-bold tracking-wide underline-offset-2 group-hover:underline"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  <span className="underline">I</span>nstall Curtains XP
                </span>
              </button>

              <button
                onClick={() => setStage('components-dialog')}
                className="flex items-center gap-3 text-left text-white hover:text-yellow-200 transition-colors group cursor-pointer"
              >
                <span className="w-6 h-6 rounded-[3px] bg-[#1E6FE8] border border-[#0B4BB8] text-white flex items-center justify-center font-bold text-xs shadow group-hover:bg-[#3B82F6] group-hover:scale-105 transition-transform">
                  ➔
                </span>
                <span
                  className="text-[16px] font-bold tracking-wide underline-offset-2 group-hover:underline"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  Install <span className="underline">o</span>ptional Curtains components
                </span>
              </button>

              <button
                onClick={() => alert('Curtains XP Features:\n- Full Retro XP Desktop Simulator\n- File Explorer, Notepad, Paint, Media Player\n- Classic Themes & Sound Effects\n- Pure Web Architecture')}
                className="flex items-center gap-3 text-left text-white hover:text-yellow-200 transition-colors group cursor-pointer"
              >
                <span className="w-6 h-6 rounded-[3px] bg-[#1E6FE8] border border-[#0B4BB8] text-white flex items-center justify-center font-bold text-xs shadow group-hover:bg-[#3B82F6] group-hover:scale-105 transition-transform">
                  ➔
                </span>
                <span
                  className="text-[16px] font-bold tracking-wide underline-offset-2 group-hover:underline"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  <span className="underline">P</span>erform additional tasks
                </span>
              </button>

              <button
                onClick={() => setStage('compatibility-dialog')}
                className="flex items-center gap-3 text-left text-white hover:text-yellow-200 transition-colors group cursor-pointer"
              >
                <span className="w-6 h-6 rounded-[3px] bg-[#1E6FE8] border border-[#0B4BB8] text-white flex items-center justify-center font-bold text-xs shadow group-hover:bg-[#3B82F6] group-hover:scale-105 transition-transform">
                  ➔
                </span>
                <span
                  className="text-[16px] font-bold tracking-wide underline-offset-2 group-hover:underline"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  <span className="underline">C</span>heck system compatibility
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer with Exit button */}
        {renderFooter(
          <button
            onClick={() => handleStartInstallation()}
            className="flex items-center gap-2 text-white hover:text-red-200 transition-colors cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-[2px] bg-gradient-to-b from-[#EF4444] to-[#B91C1C] border border-[#7F1D1D] text-white flex items-center justify-center font-bold text-xs shadow group-hover:scale-105 transition-transform">
              ✕
            </div>
            <span
              className="text-[14px] font-bold tracking-wide text-white group-hover:underline"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              Exit
            </span>
          </button>
        )}
      </div>
    );
  }

  // Optional Components Selector Dialog
  if (stage === 'components-dialog') {
    return (
      <div
        className="fixed inset-0 flex flex-col justify-between select-none overflow-hidden font-sans"
        style={{
          background: 'radial-gradient(circle at 18% 25%, #3B72DE 0%, #154CB8 35%, #072E8A 70%, #001B64 100%)',
          fontFamily: '"Tahoma", "Segoe UI", "Arial", sans-serif',
        }}
      >
        {renderHeader()}

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white/95 rounded-[4px] p-6 max-w-lg w-full shadow-2xl border-2 border-white/50 text-[#1F2937]">
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Optional Curtains Components</h2>
            <p className="text-xs text-gray-600 mb-4">
              Select the applications and utilities you wish to include in your Curtains XP installation:
            </p>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-2 mb-6">
              {[
                { key: 'fileExplorer', label: 'File Explorer', desc: 'Browse folders, files, and drives' },
                { key: 'notepad', label: 'Notepad', desc: 'Lightweight text editing application' },
                { key: 'calculator', label: 'Calculator', desc: 'Standard & scientific math tool' },
                { key: 'terminal', label: 'Command Prompt', desc: 'Command-line system shell' },
                { key: 'games', label: 'Classic Games', desc: 'Minesweeper, Solitaire, Snake' },
                { key: 'browser', label: 'Internet Browser', desc: 'Retro web surfing browser' },
                { key: 'weatherWidget', label: 'Weather Utility', desc: 'Live weather forecasts' },
                { key: 'newsReader', label: 'News Feed Reader', desc: 'Headlines and RSS news feeds' },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className="flex items-start gap-2.5 p-2 rounded hover:bg-blue-50 border border-transparent hover:border-blue-200 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedComponents[key as keyof SelectedComponents]}
                    onChange={() => handleComponentToggle(key as keyof SelectedComponents)}
                    className="mt-0.5 cursor-pointer accent-[#1E6FE8]"
                  />
                  <div>
                    <div className="text-xs font-bold text-gray-900">{label}</div>
                    <div className="text-[11px] text-gray-500">{desc}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setStage('menu')}
                className="px-5 py-1.5 rounded-[3px] bg-[#1E6FE8] hover:bg-[#1558C0] active:bg-[#0E3D94] text-white font-bold text-xs shadow border border-[#0B4BB8] cursor-pointer"
              >
                OK
              </button>
            </div>
          </div>
        </div>

        {renderFooter(
          <button
            onClick={() => setStage('menu')}
            className="text-white text-xs font-bold hover:underline cursor-pointer"
          >
            &lt; Back to Menu
          </button>
        )}
      </div>
    );
  }

  // System Compatibility Dialog
  if (stage === 'compatibility-dialog') {
    return (
      <div
        className="fixed inset-0 flex flex-col justify-between select-none overflow-hidden font-sans"
        style={{
          background: 'radial-gradient(circle at 18% 25%, #3B72DE 0%, #154CB8 35%, #072E8A 70%, #001B64 100%)',
          fontFamily: '"Tahoma", "Segoe UI", "Arial", sans-serif',
        }}
      >
        {renderHeader()}

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white/95 rounded-[4px] p-6 max-w-md w-full shadow-2xl border-2 border-white/50 text-[#1F2937]">
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">System Compatibility Check</h2>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-2 bg-green-50 border border-green-200 rounded">
                <span className="text-green-600 font-bold text-lg">✓</span>
                <div className="text-xs">
                  <div className="font-bold text-gray-800">Processor &amp; Memory</div>
                  <div className="text-gray-500">Fully compatible with Curtains XP engine</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-green-50 border border-green-200 rounded">
                <span className="text-green-600 font-bold text-lg">✓</span>
                <div className="text-xs">
                  <div className="font-bold text-gray-800">Display Adapter</div>
                  <div className="text-gray-500">Hardware accelerated graphics supported</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-green-50 border border-green-200 rounded">
                <span className="text-green-600 font-bold text-lg">✓</span>
                <div className="text-xs">
                  <div className="font-bold text-gray-800">Sound &amp; Audio</div>
                  <div className="text-gray-500">Retro synthesized sound card detected</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStage('menu')}
                className="px-5 py-1.5 rounded-[3px] bg-[#1E6FE8] hover:bg-[#1558C0] text-white font-bold text-xs shadow cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {renderFooter(
          <button
            onClick={() => setStage('menu')}
            className="text-white text-xs font-bold hover:underline cursor-pointer"
          >
            &lt; Back to Menu
          </button>
        )}
      </div>
    );
  }

  // =========================================================================
  // STAGE 2: THE ICONIC 5-STEP INSTALLING SETUP SCREEN - Image 2
  // =========================================================================
  if (stage === 'installing') {
    const steps = [
      { id: 1, label: 'Collecting information' },
      { id: 2, label: 'Dynamic Update' },
      { id: 3, label: 'Preparing installation' },
      { id: 4, label: 'Installing Curtains' },
      { id: 5, label: 'Finalizing installation' },
    ];

    return (
      <div
        className="fixed inset-0 flex flex-col justify-between select-none overflow-hidden font-sans"
        style={{
          background: 'linear-gradient(to bottom, #4A7FD9 0%, #295EC2 40%, #1748A8 100%)',
          fontFamily: '"Tahoma", "Segoe UI", "Arial", sans-serif',
        }}
      >
        {renderHeader()}

        {/* Center Main Stage */}
        <div className="flex-1 flex max-w-6xl mx-auto w-full px-10 py-6 gap-12 items-center">
          {/* Left Column: 5 Stages + Time Countdown + Segmented Progress Bar */}
          <div className="w-[320px] flex flex-col justify-between h-[380px] flex-shrink-0">
            {/* Steps List */}
            <div className="space-y-4">
              {steps.map((s) => {
                const isCompleted = s.id < installStepIndex;
                const isActive = s.id === installStepIndex;

                return (
                  <div key={s.id} className="flex items-center gap-3">
                    {/* Status Circle Bullet */}
                    {isCompleted ? (
                      <div className="w-5 h-5 rounded-full bg-[#388E3C] border-2 border-white flex items-center justify-center shadow-md">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    ) : isActive ? (
                      <div className="w-5 h-5 rounded-full bg-[#E65100] border-2 border-white flex items-center justify-center shadow-md animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center shadow-sm" />
                    )}

                    {/* Step Label */}
                    <span
                      className={`text-[14px] font-bold ${
                        isActive
                          ? 'text-[#FFA726] drop-shadow'
                          : isCompleted
                          ? 'text-white drop-shadow'
                          : 'text-white/60'
                      }`}
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Estimated Time Remaining */}
            <div className="text-white text-[13px] leading-snug drop-shadow" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              <div>Setup will complete in</div>
              <div>approximately:</div>
              <div className="font-bold text-[15px] mt-0.5">{minutesRemaining} minutes</div>
            </div>

            {/* Bottom-Left Progress Bar */}
            <div className="flex flex-col gap-1.5 w-full">
              <span
                className="text-white text-[12px] font-medium drop-shadow"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                {installStatusText}
              </span>

              {/* Windows XP Green Segmented Progress Bar Track */}
              <div className="w-full h-4 bg-[#E0E0E0] border border-[#808080] p-[2px] rounded-[1px] shadow-inner">
                <div
                  className="h-full bg-gradient-to-b from-[#76D22A] via-[#43A047] to-[#2E7D32] transition-all duration-200"
                  style={{
                    width: `${installProgress}%`,
                    backgroundImage:
                      'repeating-linear-gradient(90deg, #43A047 0px, #43A047 8px, #388E3C 8px, #388E3C 10px)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Rotating Feature Showcase Slide */}
          <div className="flex-1 flex flex-col justify-center pr-6">
            <h2
              className="text-white text-[32px] font-bold leading-tight mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{
                fontFamily: '"Franklin Gothic Medium", "Segoe UI", "Tahoma", sans-serif',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              {showcaseSlides[activeSlide].title}
            </h2>

            <p
              className="text-white text-[17px] leading-relaxed max-w-xl font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              {showcaseSlides[activeSlide].body}
            </p>
          </div>
        </div>

        {/* Footer with 4 Activity Blinking Green Dots */}
        {renderFooter(
          <div className="w-full flex items-center justify-between">
            <span
              className="text-white text-xs opacity-75 drop-shadow"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              Curtains XP Setup
            </span>

            {/* Blinking Activity Indicator */}
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-[1px] transition-opacity duration-200 ${
                    blinkDot === idx
                      ? 'bg-[#76D22A] shadow-[0_0_4px_#76D22A] opacity-100'
                      : 'bg-[#2E7D32] opacity-40'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // STAGE 3: OUT-OF-BOX EXPERIENCE (OOBE) "Welcome to Curtains" - Image 1
  // =========================================================================
  if (stage === 'welcome-oobe') {
    return (
      <div
        className="fixed inset-0 flex flex-col justify-between select-none overflow-hidden font-sans"
        style={{
          background: 'radial-gradient(circle at 18% 25%, #3B72DE 0%, #154CB8 35%, #072E8A 70%, #001B64 100%)',
          fontFamily: '"Tahoma", "Segoe UI", "Arial", sans-serif',
        }}
      >
        {renderHeader()}

        {/* Center OOBE Welcome Area */}
        <div className="flex-1 flex items-center justify-between max-w-5xl mx-auto w-full px-12 py-8 relative">
          <div className="flex flex-col items-start max-w-xl">
            <h1
              className="text-white text-[38px] font-bold mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{
                fontFamily: '"Franklin Gothic Medium", "Segoe UI", "Tahoma", sans-serif',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              Welcome to Curtains
            </h1>

            <p
              className="text-white text-[16px] leading-relaxed mb-4 drop-shadow"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              Thank you for purchasing Curtains XP.
            </p>

            <p
              className="text-white text-[16px] leading-relaxed mb-12 drop-shadow"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              Let's spend a few minutes setting up your computer.
            </p>

            <p
              className="text-white text-[14px] font-normal opacity-90 drop-shadow mt-8"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              To continue, click Next.
            </p>
          </div>

          {/* Big 3D Help Sphere Graphic */}
          <div className="w-36 h-36 flex items-center justify-center flex-shrink-0 drop-shadow-2xl">
            <IconHelp size={120} />
          </div>
        </div>

        {/* Footer with Green "Next ➔" Button */}
        {renderFooter(
          <div className="w-full flex items-center justify-end">
            <button
              onClick={() => setStage('user-setup')}
              className="flex items-center gap-2 px-4 py-1.5 rounded-[3px] bg-[#388E3C] hover:bg-[#2E7D32] active:bg-[#1B5E20] text-white font-bold text-xs shadow border border-[#144F18] cursor-pointer group"
            >
              <span className="text-[13px]">Next</span>
              <span className="text-sm group-hover:translate-x-0.5 transition-transform">➔</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // STAGE 4: USER SETUP ("Who will use this computer?")
  // =========================================================================
  if (stage === 'user-setup') {
    return (
      <div
        className="fixed inset-0 flex flex-col justify-between select-none overflow-hidden font-sans"
        style={{
          background: 'radial-gradient(circle at 18% 25%, #3B72DE 0%, #154CB8 35%, #072E8A 70%, #001B64 100%)',
          fontFamily: '"Tahoma", "Segoe UI", "Arial", sans-serif',
        }}
      >
        {renderHeader()}

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

            {/* Username input box */}
            <div className="flex flex-col gap-3 w-full max-w-sm mb-6">
              <div className="flex items-center gap-3">
                <span
                  className="text-white text-[14px] font-bold w-28 drop-shadow"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  Your name:
                </span>
                <input
                  type="text"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  placeholder="Administrator"
                  autoFocus
                  className="flex-1 px-3 py-1 text-sm bg-white text-black rounded-[2px] border border-gray-400 focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="text-white text-[14px] font-bold w-28 drop-shadow"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  Password:
                </span>
                <input
                  type="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="(Optional)"
                  className="flex-1 px-3 py-1 text-sm bg-white text-black rounded-[2px] border border-gray-400 focus:outline-none focus:border-blue-500 shadow-inner"
                />
              </div>
            </div>
          </div>

          <div className="w-36 h-36 flex items-center justify-center flex-shrink-0 drop-shadow-2xl">
            <IconHelp size={120} />
          </div>
        </div>

        {renderFooter(
          <div className="w-full flex items-center justify-between">
            <button
              onClick={() => setStage('welcome-oobe')}
              className="flex items-center gap-2 px-4 py-1.5 rounded-[3px] bg-white/10 hover:bg-white/20 text-white font-bold text-xs shadow border border-white/20 cursor-pointer"
            >
              <span>◀</span>
              <span>Back</span>
            </button>

            <button
              onClick={() => setStage('oobe-complete')}
              className="flex items-center gap-2 px-4 py-1.5 rounded-[3px] bg-[#388E3C] hover:bg-[#2E7D32] active:bg-[#1B5E20] text-white font-bold text-xs shadow border border-[#144F18] cursor-pointer group"
            >
              <span className="text-[13px]">Next</span>
              <span className="text-sm group-hover:translate-x-0.5 transition-transform">➔</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // STAGE 5: OOBE COMPLETE ("Thank you!")
  // =========================================================================
  return (
    <div
      className="fixed inset-0 flex flex-col justify-between select-none overflow-hidden font-sans"
      style={{
        background: 'radial-gradient(circle at 18% 25%, #3B72DE 0%, #154CB8 35%, #072E8A 70%, #001B64 100%)',
        fontFamily: '"Tahoma", "Segoe UI", "Arial", sans-serif',
      }}
    >
      {renderHeader()}

      <div className="flex-1 flex items-center justify-between max-w-5xl mx-auto w-full px-12 py-8 relative">
        <div className="flex flex-col items-start max-w-xl">
          <h1
            className="text-white text-[38px] font-bold mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            style={{
              fontFamily: '"Franklin Gothic Medium", "Segoe UI", "Tahoma", sans-serif',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Thank you!
          </h1>

          <p
            className="text-white text-[16px] leading-relaxed mb-4 drop-shadow"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
          >
            Congratulations, you are ready to use Curtains XP!
          </p>

          <p
            className="text-white text-[16px] leading-relaxed mb-8 drop-shadow"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
          >
            Click Finish to log in and start exploring your new operating system.
          </p>
        </div>

        <div className="w-36 h-36 flex items-center justify-center flex-shrink-0 drop-shadow-2xl">
          <IconHelp size={120} />
        </div>
      </div>

      {renderFooter(
        <div className="w-full flex items-center justify-end">
          <button
            onClick={handleFinishOOBE}
            className="flex items-center gap-2 px-5 py-1.5 rounded-[3px] bg-[#388E3C] hover:bg-[#2E7D32] active:bg-[#1B5E20] text-white font-bold text-xs shadow border border-[#144F18] cursor-pointer group"
          >
            <span className="text-[13px]">Finish</span>
            <span className="text-sm group-hover:translate-x-0.5 transition-transform">➔</span>
          </button>
        </div>
      )}
    </div>
  );
};
