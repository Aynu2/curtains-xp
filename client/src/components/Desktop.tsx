import React, { useState, useEffect, useCallback } from 'react';
import { useOS } from '@/contexts/OSContext';
import { getTheme } from '@/lib/themes';
import { DraggableWindow } from './DraggableWindow';
import { FileExplorer } from './apps/FileExplorer';
import { Calculator } from './apps/Calculator';
import { Terminal } from './apps/Terminal';
import { Notepad } from './apps/Notepad';
import { SettingsApp } from './apps/SettingsApp';
import { GamesApp } from './apps/GamesApp';
import { Browser } from './apps/Browser';
import { AppStore } from './apps/AppStore';
import { SystemInfo } from './apps/SystemInfo';
import { PaintPro } from './apps/PaintPro';
import { MediaPlayer } from './apps/MediaPlayer';
import { PhotoGallery } from './apps/PhotoGallery';
import { CodeEditor } from './apps/CodeEditor';
import { SpreadsheetPro } from './apps/SpreadsheetPro';
import { DocumentEditor } from './apps/DocumentEditor';
import { EmailClient } from './apps/EmailClient';
import { DownloadManager } from './apps/DownloadManager';
import { FileSearch } from './apps/FileSearch';
import { BackupRestore } from './apps/BackupRestore';
import { Taskbar } from './Taskbar';
import { getSoundInstance } from '@/lib/sounds';
import { useSoundEffect } from '@/hooks/useSoundEffect';
import { createFile, getFolderContents, getFileContent } from '@/lib/filesystem';
import { getFileTypeInfo } from '@/lib/fileTypes';
import { Menu, Settings, Folder, Calculator as CalcIcon, Terminal as TerminalIcon, FileText, Gamepad2, Globe, Info, ShoppingBag, Palette, Music, Image, Code, Grid3x3, BookOpen, Mail, Copy, Scissors, Clipboard, Trash2 } from 'lucide-react';
import { ContextMenu, ContextMenuItem, useContextMenu } from './ContextMenu';
import { deleteItem } from '@/lib/filesystem';
import {
  IconMyComputer,
  IconNetworkPlaces,
  IconRecycleBin,
  IconMyDocuments,
  IconInternet,
  IconControlPanel,
  renderXPIcon,
} from './XPIcons';

export const Desktop: React.FC = () => {
  const { windows, openWindow, username, setScreen, installedComponents, clipboard, setClipboard, theme } = useOS();
  const { playSound } = useSoundEffect();
  const themeColors = getTheme(theme);

  const [time, setTime] = useState(new Date());
  const [dragOver, setDragOver] = useState(false);
  const [desktopFiles, setDesktopFiles] = useState<any[]>([]);
  const { contextMenu, handleContextMenu, closeContextMenu, ContextMenuComponent } = useContextMenu();
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleLogout = () => {
    setScreen('login');
  };

  const handleRestart = () => {
    const shutdownDiv = document.createElement('div');
    shutdownDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:black;display:flex;align-items:center;justify-content:center;z-index:9999;';
    shutdownDiv.innerHTML = '<div style="color:white;font-size:24px;text-align:center;"><p>Curtains is shutting down...</p><p style="font-size:14px;margin-top:20px;">Please wait...</p></div>';
    document.body.appendChild(shutdownDiv);
    setTimeout(() => {
      setScreen('boot');
      document.body.removeChild(shutdownDiv);
    }, 2000);
  };

  const handleShutdown = () => {
    if (window.confirm('Are you sure you want to shut down?')) {
      handleRestart();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Load files from root folder and play startup chime
    const rootFiles = getFolderContents('root');
    setDesktopFiles(rootFiles);

    const sounds = getSoundInstance();
    sounds.playStartup();
  }, []);

  useEffect(() => {
    const handleLaunchApp = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { appId } = customEvent.detail;
      const appName = appId.replace('-', ' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      openWindow(appId, appName);
    };

    window.addEventListener('launchApp', handleLaunchApp);
    return () => window.removeEventListener('launchApp', handleLaunchApp);
  }, [openWindow]);

  const desktopApps = [
    { id: 'documents', label: 'My Documents', icon: <IconMyDocuments size={36} /> },
    { id: 'my-computer', label: 'My Computer', icon: <IconMyComputer size={36} /> },
    { id: 'network-places', label: 'My Network Places', icon: <IconNetworkPlaces size={36} /> },
    { id: 'recycle', label: 'Recycle Bin', icon: <IconRecycleBin size={36} /> },
    { id: 'browser', label: 'Internet Explorer', icon: <IconInternet size={36} /> },
    { id: 'settings', label: 'Control Panel', icon: <IconControlPanel size={36} /> },
  ];

  const handleDesktopIconClick = (appId: string) => {
    playSound('click');
    // Check if it's a file from the file system
    const file = desktopFiles.find(f => f.id === appId);
    if (file && !file.children) {
      // It's a file, open it with the appropriate app
      const fileTypeInfo = getFileTypeInfo(file.name);
      const fileContent = getFileContent(file.id);
      openWindow(fileTypeInfo.app, file.name, { fileId: file.id, content: fileContent, filename: file.name });
      return;
    }

    switch (appId) {
      case 'my-computer':
        openWindow('file-explorer', 'My Computer');
        break;
      case 'documents':
        openWindow('file-explorer', 'My Documents');
        break;
      case 'network-places':
        openWindow('file-explorer', 'My Network Places');
        break;
      case 'recycle':
        openWindow('file-explorer', 'Recycle Bin');
        break;
      case 'file-explorer':
        openWindow('file-explorer', 'File Explorer');
        break;
      case 'calculator':
        openWindow('calculator', 'Calculator');
        break;
      case 'terminal':
        openWindow('terminal', 'Terminal');
        break;
      case 'notepad':
        openWindow('notepad', 'Notepad');
        break;
      case 'games':
        openWindow('games', 'Games');
        break;
      case 'browser':
        openWindow('browser', 'Internet Browser');
        break;
      case 'settings':
        openWindow('settings', 'Settings');
        break;
      case 'restart':
        handleRestart();
        break;
      case 'shutdown':
        handleShutdown();
        break;
      default:
        break;
    }
  };

  const handleFileContextMenu = (e: React.MouseEvent, file: any) => {
    e.preventDefault();
    setSelectedFile(file);
    const items: ContextMenuItem[] = [
      {
        label: 'Copy',
        icon: <Copy size={16} />,
        onClick: () => {
          setClipboard({
            type: 'copy',
            fileId: file.id,
            fileName: file.name,
            filePath: 'root',
            content: getFileContent(file.id),
          });
        },
      },
      {
        label: 'Cut',
        icon: <Scissors size={16} />,
        onClick: () => {
          setClipboard({
            type: 'cut',
            fileId: file.id,
            fileName: file.name,
            filePath: 'root',
            content: getFileContent(file.id),
          });
        },
      },
      {
        label: 'Paste',
        icon: <Clipboard size={16} />,
        onClick: () => {
          if (clipboard && clipboard.type === 'cut') {
            deleteItem(clipboard.fileId);
            setClipboard(null);
          }
          const rootFiles = getFolderContents('root');
          setDesktopFiles(rootFiles);
        },
        disabled: !clipboard,
      } as ContextMenuItem,
      { label: '', onClick: () => {}, divider: true } as ContextMenuItem,
      {
        label: 'Delete',
        icon: <Trash2 size={16} />,
        onClick: () => {
          deleteItem(file.id);
          const rootFiles = getFolderContents('root');
          setDesktopFiles(rootFiles);
        },
      },
    ];
    handleContextMenu(e, items);
  };

  const renderWindowContent = (w: any) => {
    switch (w.app) {
      case 'file-explorer':
        return <FileExplorer />;
      case 'calculator':
        return <Calculator />;
      case 'terminal':
        return <Terminal />;
      case 'notepad':
        return <Notepad fileContent={w.content?.content ? w.content : undefined} />;
      case 'settings':
        return <SettingsApp />;
      case 'games':
        return <GamesApp />;
      case 'browser':
        return <Browser />;
      case 'app-store':
        return <AppStore />;
      case 'system-info':
        return <SystemInfo />;
      case 'paint-pro':
        return <PaintPro />;
      case 'media-player':
        return <MediaPlayer />;
      case 'photo-gallery':
        return <PhotoGallery />;
      case 'code-editor':
        return <CodeEditor fileContent={w.content?.content ? w.content : undefined} />;
      case 'spreadsheet-pro':
        return <SpreadsheetPro />;
      case 'document-editor':
        return <DocumentEditor fileContent={w.content?.content ? w.content : undefined} />;
      case 'email-client':
        return <EmailClient />;
      case 'download-manager':
        return <DownloadManager />;
      case 'file-search':
        return <FileSearch />;
      case 'backup-restore':
        return <BackupRestore />;
      default:
        return <div>App not found</div>;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          createFile(file.name, content, 'root');
          // Refresh desktop files
          const rootFiles = getFolderContents('root');
          setDesktopFiles(rootFiles);
        };
        if (file.type.startsWith('text')) {
          reader.readAsText(file);
        } else {
          reader.readAsDataURL(file);
        }
      });
    }
  };

  return (
    <div
      className={`fixed inset-0 overflow-hidden transition-opacity ${
        dragOver ? 'opacity-75' : ''
      }`}
      style={{
        background:
          theme === 'luna-blue'
            ? 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663665744001/XNzjLxgnakZVoQ2paoEWJv/bliss-wallpaper-YsU9v4xmKfhvT2Vs7fWytB.webp)'
            : `linear-gradient(135deg, ${themeColors.wallpaperColor} 0%, ${themeColors.wallpaperColor}dd 50%, ${themeColors.wallpaperColor}99 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingBottom: '32px',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragOver && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center z-40 pointer-events-none">
          <div className="text-white text-2xl font-bold">Drop files here</div>
        </div>
      )}
      {/* Desktop Icons — left column, like real XP */}
      <div className="p-4 flex flex-col gap-4 w-28 absolute top-0 left-0">
        {desktopApps.map((app: any) => (
          <button
            key={app.id}
            onClick={() => handleDesktopIconClick(app.id)}
            className="xp-desktop-icon group hover:animate-desktop-icon-hover active:animate-button-press"
          >
            <div className="text-4xl">{app.icon}</div>
            <div className="xp-desktop-icon-label">{app.label}</div>
          </button>
        ))}
        {/* File Icons */}
        {desktopFiles.map((file: any) => {
          const fileTypeInfo = getFileTypeInfo(file.name);
          return (
            <button
              key={file.id}
              onClick={() => handleDesktopIconClick(file.id)}
              onContextMenu={(e) => handleFileContextMenu(e, file)}
              className="xp-desktop-icon group hover:animate-desktop-icon-hover active:animate-button-press"
              title={file.name}
            >
              <div className="flex items-center justify-center">{renderXPIcon(fileTypeInfo.app, 36)}</div>
              <div className="xp-desktop-icon-label text-xs">{file.name.substring(0, 12)}</div>
            </button>
          );
        })}
      </div>

      {/* Windows */}
      {windows.map((w) => (
        <DraggableWindow key={w.id} window={w}>
          {renderWindowContent(w)}
        </DraggableWindow>
      ))}

      {/* Taskbar */}
      <Taskbar onLogout={handleLogout} onRestart={handleRestart} onShutdown={handleShutdown} onAppLaunch={(app) => openWindow(app, app.replace('-', ' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))} />



      {/* Context Menu */}
      {ContextMenuComponent}
    </div>
  );
};
