// File type detection and app mapping
export interface FileTypeInfo {
  icon: string;
  app: string;
  category: 'text' | 'image' | 'audio' | 'video' | 'document' | 'spreadsheet' | 'code' | 'other';
}

const fileTypeMap: { [key: string]: FileTypeInfo } = {
  // Text files
  '.txt': { icon: '📄', app: 'notepad', category: 'text' },
  '.md': { icon: '📝', app: 'notepad', category: 'text' },
  '.log': { icon: '📋', app: 'notepad', category: 'text' },
  
  // Images
  '.jpg': { icon: '🖼️', app: 'photo-gallery', category: 'image' },
  '.jpeg': { icon: '🖼️', app: 'photo-gallery', category: 'image' },
  '.png': { icon: '🖼️', app: 'photo-gallery', category: 'image' },
  '.gif': { icon: '🖼️', app: 'photo-gallery', category: 'image' },
  '.bmp': { icon: '🖼️', app: 'photo-gallery', category: 'image' },
  '.svg': { icon: '🖼️', app: 'photo-gallery', category: 'image' },
  
  // Audio
  '.mp3': { icon: '🎵', app: 'media-player', category: 'audio' },
  '.wav': { icon: '🎵', app: 'media-player', category: 'audio' },
  '.flac': { icon: '🎵', app: 'media-player', category: 'audio' },
  '.aac': { icon: '🎵', app: 'media-player', category: 'audio' },
  
  // Video
  '.mp4': { icon: '🎬', app: 'media-player', category: 'video' },
  '.avi': { icon: '🎬', app: 'media-player', category: 'video' },
  '.mkv': { icon: '🎬', app: 'media-player', category: 'video' },
  '.mov': { icon: '🎬', app: 'media-player', category: 'video' },
  
  // Documents
  '.doc': { icon: '📑', app: 'document-editor', category: 'document' },
  '.docx': { icon: '📑', app: 'document-editor', category: 'document' },
  '.pdf': { icon: '📕', app: 'notepad', category: 'document' },
  
  // Spreadsheet
  '.xls': { icon: '📊', app: 'spreadsheet-pro', category: 'spreadsheet' },
  '.xlsx': { icon: '📊', app: 'spreadsheet-pro', category: 'spreadsheet' },
  '.csv': { icon: '📊', app: 'spreadsheet-pro', category: 'spreadsheet' },
  
  // Code
  '.js': { icon: '</>', app: 'code-editor', category: 'code' },
  '.ts': { icon: '</>', app: 'code-editor', category: 'code' },
  '.jsx': { icon: '</>', app: 'code-editor', category: 'code' },
  '.tsx': { icon: '</>', app: 'code-editor', category: 'code' },
  '.py': { icon: '</>', app: 'code-editor', category: 'code' },
  '.java': { icon: '</>', app: 'code-editor', category: 'code' },
  '.cpp': { icon: '</>', app: 'code-editor', category: 'code' },
  '.html': { icon: '</>', app: 'code-editor', category: 'code' },
  '.css': { icon: '</>', app: 'code-editor', category: 'code' },
  '.json': { icon: '</>', app: 'code-editor', category: 'code' },
  '.xml': { icon: '</>', app: 'code-editor', category: 'code' },
};

export function getFileTypeInfo(filename: string): FileTypeInfo {
  const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  return fileTypeMap[ext] || { icon: '📦', app: 'file-explorer', category: 'other' };
}

export function getFileExtension(filename: string): string {
  return filename.substring(filename.lastIndexOf('.')).toLowerCase();
}

export function getFileNameWithoutExtension(filename: string): string {
  return filename.substring(0, filename.lastIndexOf('.')) || filename;
}
