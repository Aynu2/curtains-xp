import React, { useState, useEffect } from 'react';
import { Folder, File, Plus, Trash2, Edit2, Copy, Scissors, Home, Search } from 'lucide-react';
import {
  getFolderContents,
  getFolder,
  createFolder,
  deleteItem,
  renameItem,
  moveItem,
  copyItem,
  getFilePath,
  FileSystemItem,
} from '@/lib/filesystem';

import { IconFolder, IconHelpDocument, renderXPIcon } from '../XPIcons';

export const FileExplorer: React.FC = () => {
  const [currentFolderId, setCurrentFolderId] = useState('root');
  const [items, setItems] = useState<FileSystemItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<FileSystemItem | null>(null);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showRename, setShowRename] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [clipboard, setClipboard] = useState<{ item: FileSystemItem; operation: 'cut' | 'copy' } | null>(null);

  useEffect(() => {
    loadFolder();
  }, [currentFolderId]);

  const loadFolder = () => {
    const contents = getFolderContents(currentFolderId);
    setItems(contents);
    setSelectedItem(null);
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName, currentFolderId);
      setNewFolderName('');
      setShowNewFolder(false);
      loadFolder();
    }
  };

  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(itemId);
      loadFolder();
    }
  };

  const handleRenameItem = (itemId: string) => {
    if (renameValue.trim()) {
      renameItem(itemId, renameValue);
      setShowRename(false);
      setRenameValue('');
      loadFolder();
    }
  };

  const handleCopyItem = (item: FileSystemItem) => {
    setClipboard({ item, operation: 'copy' });
  };

  const handleCutItem = (item: FileSystemItem) => {
    setClipboard({ item, operation: 'cut' });
  };

  const handlePaste = () => {
    if (clipboard) {
      if (clipboard.operation === 'copy') {
        copyItem(clipboard.item.id, currentFolderId);
      } else {
        moveItem(clipboard.item.id, currentFolderId);
        setClipboard(null);
      }
      loadFolder();
    }
  };

  const handleOpenFolder = (item: FileSystemItem) => {
    if (item.type === 'folder') {
      setCurrentFolderId(item.id);
    }
  };

  const handleGoUp = () => {
    const current = getFolder(currentFolderId);
    if (current && current.parentId) {
      setCurrentFolderId(current.parentId);
    }
  };

  const path = getFilePath(currentFolderId);

  return (
    <div className="flex flex-col h-full bg-white text-xs select-none font-sans">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1 bg-[#ECE9D8] border-b border-[#D4D0C8]">
        <button
          onClick={handleGoUp}
          disabled={currentFolderId === 'root'}
          className="xp-button px-2 py-1 flex items-center gap-1 disabled:opacity-50"
          title="Up"
        >
          <Home size={14} />
          <span>Up</span>
        </button>
        <div className="w-[1px] h-5 bg-gray-400 mx-1" />
        <button
          onClick={() => setShowNewFolder(!showNewFolder)}
          className="xp-button px-2 py-1 flex items-center gap-1"
          title="New Folder"
        >
          <Plus size={14} />
          <span>New Folder</span>
        </button>
        <div className="w-[1px] h-5 bg-gray-400 mx-1" />
        <button
          onClick={() => selectedItem && handleDeleteItem(selectedItem.id)}
          disabled={!selectedItem}
          className="xp-button px-2 py-1 flex items-center gap-1 disabled:opacity-50"
          title="Delete"
        >
          <Trash2 size={14} />
          <span>Delete</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[#ECE9D8] border-b border-[#D4D0C8]">
        <span className="text-gray-600 font-medium">Address:</span>
        <div className="flex-1 bg-white border border-[#7F9DB9] px-2 py-0.5 text-xs flex items-center gap-1">
          <IconFolder size={14} />
          <span>{path}</span>
        </div>
      </div>

      {/* New Folder Modal/Inline */}
      {showNewFolder && (
        <div className="p-2 bg-yellow-50 border-b border-yellow-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
            className="px-2 py-0.5 border border-gray-400 rounded text-xs flex-1"
            autoFocus
          />
          <button
            onClick={handleCreateFolder}
            className="xp-button px-3 py-0.5"
          >
            Create
          </button>
          <button
            onClick={() => setShowNewFolder(false)}
            className="xp-button px-2 py-0.5"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-2">
        {items.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            This folder is empty
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-2 hover:bg-[#316AC5] hover:text-white cursor-pointer transition rounded-[2px] ${
                  selectedItem?.id === item.id ? 'bg-[#316AC5] text-white' : ''
                }`}
                onClick={() => setSelectedItem(item)}
                onDoubleClick={() => handleOpenFolder(item)}
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <span className="flex-shrink-0">
                    {item.type === 'folder' ? (
                      <IconFolder size={20} />
                    ) : (
                      renderXPIcon(item.name.endsWith('.txt') ? 'notepad' : 'document-editor', 20)
                    )}
                  </span>
                  {showRename && selectedItem?.id === item.id ? (
                    <input
                      type="text"
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleRenameItem(item.id);
                        if (e.key === 'Escape') setShowRename(false);
                      }}
                      className="flex-1 px-2 py-1 border-2 border-gray-400 rounded text-xs"
                      autoFocus
                    />
                  ) : (
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-medium truncate ${selectedItem?.id === item.id ? 'text-white' : ''}`}>
                        {item.name}
                      </div>
                      <div className={`text-xs ${selectedItem?.id === item.id ? 'text-blue-100' : 'text-gray-500'}`}>
                        {item.type === 'folder' ? 'Folder' : `${item.size} bytes`}
                      </div>
                    </div>
                  )}
                </div>

                {selectedItem?.id === item.id && !showRename && (
                  <div className="flex gap-1 ml-2">
                    {item.type === 'file' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyItem(item);
                          }}
                          className="p-1 hover:bg-blue-600 rounded"
                          title="Copy"
                        >
                          <Copy size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCutItem(item);
                          }}
                          className="p-1 hover:bg-blue-600 rounded"
                          title="Cut"
                        >
                          <Scissors size={14} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowRename(true);
                        setRenameValue(item.name);
                      }}
                      className="p-1 hover:bg-blue-600 rounded"
                      title="Rename"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(item.id);
                      }}
                      className="p-1 hover:bg-blue-600 rounded"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-[#DFDFDF] border-t-2 border-gray-400 px-3 py-2 text-xs text-gray-600 flex justify-between">
        <span>{items.length} item(s)</span>
        <span>{selectedItem ? `${selectedItem.name} - ${selectedItem.size} bytes` : ''}</span>
      </div>
    </div>
  );
};
