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

  const handleGoBack = () => {
    const folder = getFolder(currentFolderId);
    if (folder?.parentId) {
      setCurrentFolderId(folder.parentId);
    }
  };

  const handleGoHome = () => {
    setCurrentFolderId('root');
  };

  const breadcrumb = getFilePath(currentFolderId);

  return (
    <div className="h-full flex flex-col bg-[#DFDFDF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 flex justify-between items-center border-b-2 border-gray-400">
        <span className="font-bold">File Explorer</span>
      </div>

      {/* Toolbar */}
      <div className="bg-[#DFDFDF] border-b-2 border-gray-400 p-2 flex gap-2 flex-wrap">
        <button
          onClick={handleGoHome}
          className="xp-button flex items-center gap-1 text-xs"
          title="Home"
        >
          <Home size={14} />
          Home
        </button>
        <button
          onClick={handleGoBack}
          className="xp-button flex items-center gap-1 text-xs"
          title="Back"
        >
          ← Back
        </button>
        <div className="border-l-2 border-gray-400"></div>
        <button
          onClick={() => setShowNewFolder(true)}
          className="xp-button flex items-center gap-1 text-xs"
          title="New Folder"
        >
          <Plus size={14} />
          New Folder
        </button>
        {clipboard && (
          <button
            onClick={handlePaste}
            className="xp-button flex items-center gap-1 text-xs"
            title="Paste"
          >
            📋
            Paste
          </button>
        )}
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#DFDFDF] border-b-2 border-gray-400 px-3 py-2 text-xs flex items-center gap-1">
        <span className="font-bold">Path:</span>
        {breadcrumb.map((name, idx) => (
          <div key={idx} className="flex items-center gap-1">
            {idx > 0 && <span className="text-gray-600">›</span>}
            <span className="text-blue-600">{name}</span>
          </div>
        ))}
      </div>

      {/* New Folder Dialog */}
      {showNewFolder && (
        <div className="bg-gray-100 border-b-2 border-gray-400 p-3 flex gap-2">
          <input
            type="text"
            placeholder="Folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
            className="flex-1 px-2 py-1 border-2 border-gray-400 rounded text-xs"
            autoFocus
          />
          <button
            onClick={handleCreateFolder}
            className="xp-button text-xs px-3"
          >
            Create
          </button>
          <button
            onClick={() => {
              setShowNewFolder(false);
              setNewFolderName('');
            }}
            className="xp-button text-xs px-3"
          >
            Cancel
          </button>
        </div>
      )}

      {/* File List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {items.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-xs">
            This folder is empty
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-3 hover:bg-blue-100 cursor-pointer transition ${
                  selectedItem?.id === item.id ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() => setSelectedItem(item)}
                onDoubleClick={() => handleOpenFolder(item)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-lg">{item.icon}</span>
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
