// Virtual file system for Curtains XP
// Supports folders, files, and drag-and-drop operations

export interface FileSystemItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  size: number;
  createdAt: number;
  modifiedAt: number;
  parentId: string | null;
  icon?: string;
}

export interface FileSystemData {
  items: FileSystemItem[];
  rootFolderId: string;
}

const FILESYSTEM_KEY = 'curtains-xp-filesystem';

// Initialize default file system
const defaultFileSystem: FileSystemData = {
  items: [
    {
      id: 'root',
      name: 'My Computer',
      type: 'folder',
      size: 0,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
      parentId: null,
      icon: '💻',
    },
    {
      id: 'documents',
      name: 'My Documents',
      type: 'folder',
      size: 0,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
      parentId: 'root',
      icon: '📁',
    },
    {
      id: 'pictures',
      name: 'My Pictures',
      type: 'folder',
      size: 0,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
      parentId: 'root',
      icon: '🖼️',
    },
    {
      id: 'music',
      name: 'My Music',
      type: 'folder',
      size: 0,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
      parentId: 'root',
      icon: '🎵',
    },
  ],
  rootFolderId: 'root',
};

// Load file system from localStorage
export const loadFileSystem = (): FileSystemData => {
  try {
    const data = localStorage.getItem(FILESYSTEM_KEY);
    return data ? JSON.parse(data) : defaultFileSystem;
  } catch (error) {
    console.error('Error loading file system:', error);
    return defaultFileSystem;
  }
};

// Save file system to localStorage
export const saveFileSystem = (fs: FileSystemData): void => {
  try {
    localStorage.setItem(FILESYSTEM_KEY, JSON.stringify(fs));
  } catch (error) {
    console.error('Error saving file system:', error);
  }
};

// Get items in a folder
export const getFolderContents = (folderId: string): FileSystemItem[] => {
  const fs = loadFileSystem();
  return fs.items.filter(item => item.parentId === folderId);
};

// Get folder by ID
export const getFolder = (folderId: string): FileSystemItem | undefined => {
  const fs = loadFileSystem();
  return fs.items.find(item => item.id === folderId);
};

// Create a new folder
export const createFolder = (name: string, parentId: string): FileSystemItem => {
  const fs = loadFileSystem();
  const newFolder: FileSystemItem = {
    id: `folder-${Date.now()}`,
    name,
    type: 'folder',
    size: 0,
    createdAt: Date.now(),
    modifiedAt: Date.now(),
    parentId,
    icon: '📁',
  };
  fs.items.push(newFolder);
  saveFileSystem(fs);
  return newFolder;
};

// Create a new file
export const createFile = (
  name: string,
  content: string,
  parentId: string,
  type: string = 'text'
): FileSystemItem => {
  const fs = loadFileSystem();
  const newFile: FileSystemItem = {
    id: `file-${Date.now()}`,
    name,
    type: 'file',
    content,
    size: content.length,
    createdAt: Date.now(),
    modifiedAt: Date.now(),
    parentId,
    icon: getFileIcon(name),
  };
  fs.items.push(newFile);
  saveFileSystem(fs);
  return newFile;
};

// Delete item (file or folder)
export const deleteItem = (itemId: string): boolean => {
  const fs = loadFileSystem();
  const item = fs.items.find(i => i.id === itemId);

  if (!item) return false;

  if (item.type === 'folder') {
    // Delete folder and all its contents recursively
    const deleteFolder = (folderId: string) => {
      const children = fs.items.filter(i => i.parentId === folderId);
      children.forEach(child => {
        if (child.type === 'folder') {
          deleteFolder(child.id);
        }
        fs.items = fs.items.filter(i => i.id !== child.id);
      });
    };
    deleteFolder(itemId);
  }

  fs.items = fs.items.filter(i => i.id !== itemId);
  saveFileSystem(fs);
  return true;
};

// Rename item
export const renameItem = (itemId: string, newName: string): boolean => {
  const fs = loadFileSystem();
  const item = fs.items.find(i => i.id === itemId);

  if (!item) return false;

  item.name = newName;
  item.modifiedAt = Date.now();
  saveFileSystem(fs);
  return true;
};

// Move item to another folder
export const moveItem = (itemId: string, newParentId: string): boolean => {
  const fs = loadFileSystem();
  const item = fs.items.find(i => i.id === itemId);

  if (!item) return false;

  // Prevent moving folder into itself
  if (item.type === 'folder' && itemId === newParentId) return false;

  item.parentId = newParentId;
  item.modifiedAt = Date.now();
  saveFileSystem(fs);
  return true;
};

// Copy item to another folder
export const copyItem = (itemId: string, newParentId: string): FileSystemItem | null => {
  const fs = loadFileSystem();
  const item = fs.items.find(i => i.id === itemId);

  if (!item) return null;

  const newItem: FileSystemItem = {
    ...item,
    id: `${item.type}-copy-${Date.now()}`,
    name: `${item.name} (copy)`,
    createdAt: Date.now(),
    modifiedAt: Date.now(),
    parentId: newParentId,
  };

  fs.items.push(newItem);
  saveFileSystem(fs);
  return newItem;
};

// Get file path (breadcrumb)
export const getFilePath = (itemId: string): string[] => {
  const fs = loadFileSystem();
  const path: string[] = [];
  let currentId: string | null = itemId;

  while (currentId) {
    const item = fs.items.find(i => i.id === currentId);
    if (!item) break;
    path.unshift(item.name);
    currentId = item.parentId;
  }

  return path;
};

// Get file icon based on name
export const getFileIcon = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();
  const iconMap: { [key: string]: string } = {
    txt: '📄',
    doc: '📝',
    docx: '📝',
    pdf: '📕',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    gif: '🖼️',
    mp3: '🎵',
    mp4: '🎬',
    zip: '📦',
    exe: '⚙️',
    html: '🌐',
    css: '🎨',
    js: '⚡',
  };
  return iconMap[ext || ''] || '📄';
};

// Get total size of folder
export const getFolderSize = (folderId: string): number => {
  const fs = loadFileSystem();
  let size = 0;

  const calculateSize = (id: string) => {
    const items = fs.items.filter(i => i.parentId === id);
    items.forEach(item => {
      size += item.size;
      if (item.type === 'folder') {
        calculateSize(item.id);
      }
    });
  };

  calculateSize(folderId);
  return size;
};

// Search for files
export const searchFiles = (query: string): FileSystemItem[] => {
  const fs = loadFileSystem();
  const lowerQuery = query.toLowerCase();
  return fs.items.filter(
    item =>
      item.name.toLowerCase().includes(lowerQuery) ||
      (item.content && item.content.toLowerCase().includes(lowerQuery))
  );
};

// Get file content
export const getFileContent = (fileId: string): string | null => {
  const fs = loadFileSystem();
  const file = fs.items.find(i => i.id === fileId && i.type === 'file');
  return file?.content || null;
};

// Update file content
export const updateFileContent = (fileId: string, content: string): boolean => {
  const fs = loadFileSystem();
  const file = fs.items.find(i => i.id === fileId && i.type === 'file');

  if (!file) return false;

  file.content = content;
  file.size = content.length;
  file.modifiedAt = Date.now();
  saveFileSystem(fs);
  return true;
};

// Clear all files (factory reset)
export const clearFileSystem = (): void => {
  try {
    localStorage.removeItem(FILESYSTEM_KEY);
  } catch (error) {
    console.error('Error clearing file system:', error);
  }
};

// Export file system as JSON
export const exportFileSystem = (): string => {
  const fs = loadFileSystem();
  return JSON.stringify(fs, null, 2);
};

// Import file system from JSON
export const importFileSystem = (jsonData: string): boolean => {
  try {
    const fs = JSON.parse(jsonData) as FileSystemData;
    saveFileSystem(fs);
    return true;
  } catch (error) {
    console.error('Error importing file system:', error);
    return false;
  }
};
