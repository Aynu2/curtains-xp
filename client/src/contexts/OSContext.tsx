import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { ThemeName } from '@/lib/themes';

export type OSScreen = 'boot' | 'installation' | 'create-user' | 'turn-on' | 'login' | 'desktop';
export type Theme = ThemeName;

export interface Window {
  id: string;
  title: string;
  app: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  content?: any;
  isAnimating?: boolean;
  animationType?: 'minimize' | 'maximize' | 'restore';
}

export interface SelectedComponents {
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

export interface ClipboardItem {
  type: 'cut' | 'copy';
  fileId: string;
  fileName: string;
  filePath: string;
  content: any;
}

export interface OSContextType {
  screen: OSScreen;
  setScreen: (screen: OSScreen) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  windows: Window[];
  openWindow: (app: string, title: string, content?: any) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, width: number, height: number) => void;
  focusWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  username: string;
  setUsername: (name: string) => void;
  userPassword: string;
  setUserPassword: (password: string) => void;
  bootProgress: number;
  setBootProgress: (progress: number) => void;
  installedComponents: SelectedComponents;
  setInstalledComponents: (components: SelectedComponents) => void;
  clipboard: ClipboardItem | null;
  setClipboard: (item: ClipboardItem | null) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<OSScreen>(() => {
    const isInstalled = localStorage.getItem('curtains-xp-installed');
    return isInstalled === 'true' ? 'desktop' : 'boot';
  });
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('curtains-xp-theme');
    return (saved as Theme) || 'luna-blue';
  });
  const [windows, setWindows] = useState<Window[]>([]);
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('curtains-xp-username') || 'CurtainsUser';
  });
  const [userPassword, setUserPassword] = useState(() => {
    return localStorage.getItem('curtains-xp-password') || 'password';
  });
  const [bootProgress, setBootProgress] = useState(0);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [installedComponents, setInstalledComponents] = useState<SelectedComponents>(() => {
    const saved = localStorage.getItem('curtains-xp-installed-components');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      fileExplorer: true,
      calculator: true,
      terminal: true,
      notepad: true,
      settings: true,
      games: true,
      browser: true,
      weatherWidget: true,
      newsReader: true,
    };
  });
  const [clipboard, setClipboard] = useState<ClipboardItem | null>(null);

  const openWindow = useCallback((app: string, title: string, content?: any) => {
    const id = `${app}-${Date.now()}`;
    const newWindow: Window = {
      id,
      title,
      app,
      x: Math.random() * 100 + 50,
      y: Math.random() * 100 + 50,
      width: 600,
      height: 400,
      minimized: false,
      maximized: false,
      zIndex: nextZIndex,
      content,
    };
    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, minimized: true } : w))
    );
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => {
        if (w.id === id) {
          return {
            ...w,
            maximized: !w.maximized,
            x: !w.maximized ? 0 : 100,
            y: !w.maximized ? 0 : 100,
            width: !w.maximized ? window.innerWidth : 600,
            height: !w.maximized ? window.innerHeight - 32 : 400,
          };
        }
        return w;
      })
    );
  }, []);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  const resizeWindow = useCallback((id: string, width: number, height: number) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, width, height } : w))
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => {
      const focused = prev.find(w => w.id === id);
      if (!focused) return prev;
      return prev.map(w => (w.id === id ? { ...w, zIndex: nextZIndex } : w));
    });
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const bringToFront = useCallback((id: string) => {
    focusWindow(id);
  }, [focusWindow]);

  // Persist settings & user data to localStorage
  useEffect(() => {
    localStorage.setItem('curtains-xp-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('curtains-xp-username', username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem('curtains-xp-password', userPassword);
  }, [userPassword]);

  useEffect(() => {
    localStorage.setItem('curtains-xp-installed-components', JSON.stringify(installedComponents));
  }, [installedComponents]);

  const value: OSContextType = {
    screen,
    setScreen,
    theme,
    setTheme,
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    moveWindow,
    resizeWindow,
    focusWindow,
    bringToFront,
    username,
    setUsername,
    userPassword,
    setUserPassword,
    bootProgress,
    setBootProgress,
    installedComponents,
    setInstalledComponents,
    clipboard,
    setClipboard,
  };

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within OSProvider');
  }
  return context;
};
