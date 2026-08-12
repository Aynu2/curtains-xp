import React, { useState } from 'react';
import { Search, FileText, Folder, X } from 'lucide-react';
import { searchFiles, getFileContent, FileSystemItem } from '@/lib/filesystem';

export const FileSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FileSystemItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileSystemItem | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      const found = searchFiles(query);
      setResults(found);
      setSearched(true);
      setSelectedFile(null);
      setPreview('');
    }
  };

  const handleSelectFile = (file: FileSystemItem) => {
    setSelectedFile(file);
    if (file.type === 'file' && file.content) {
      setPreview(file.content.substring(0, 500));
    } else {
      setPreview('');
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setSelectedFile(null);
    setPreview('');
    setSearched(false);
  };

  return (
    <div className="h-full flex flex-col bg-[#DFDFDF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 flex justify-between items-center border-b-2 border-gray-400">
        <span className="font-bold">File Search</span>
      </div>

      {/* Search Input */}
      <div className="bg-gray-100 border-b-2 border-gray-400 p-3 space-y-2">
        <label className="text-xs font-bold block">Search for files:</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter filename or content..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-2 py-1 border-2 border-gray-400 rounded text-xs"
            autoFocus
          />
          <button
            onClick={handleSearch}
            className="xp-button flex items-center gap-1 text-xs px-3"
          >
            <Search size={14} />
            Search
          </button>
          {searched && (
            <button
              onClick={handleClear}
              className="xp-button flex items-center gap-1 text-xs px-3"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results and Preview */}
      <div className="flex-1 overflow-hidden flex gap-2 p-2">
        {/* Results List */}
        <div className="flex-1 bg-white border-2 border-gray-400 rounded overflow-y-auto">
          {!searched ? (
            <div className="p-4 text-center text-gray-500 text-xs">
              Enter a search term and click Search
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-xs">
              No files found matching "{query}"
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {results.map((file) => (
                <div
                  key={file.id}
                  onClick={() => handleSelectFile(file)}
                  className={`p-3 cursor-pointer hover:bg-blue-50 transition ${
                    selectedFile?.id === file.id ? 'bg-blue-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{file.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{file.name}</div>
                      <div className="text-xs text-gray-500">
                        {file.type === 'folder' ? 'Folder' : `${file.size} bytes`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview Panel */}
        {selectedFile && (
          <div className="w-64 bg-white border-2 border-gray-400 rounded flex flex-col overflow-hidden">
            <div className="bg-gray-100 border-b border-gray-300 p-2">
              <div className="text-xs font-bold truncate">{selectedFile.name}</div>
              <div className="text-xs text-gray-500">
                {selectedFile.type === 'folder' ? 'Folder' : 'File'}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {selectedFile.type === 'folder' ? (
                <div className="text-xs text-gray-500 text-center py-4">
                  Folder - no preview available
                </div>
              ) : preview ? (
                <div className="text-xs font-mono whitespace-pre-wrap break-words text-gray-700">
                  {preview}
                  {selectedFile.content && selectedFile.content.length > 500 && (
                    <div className="text-gray-400 mt-2">... (truncated)</div>
                  )}
                </div>
              ) : (
                <div className="text-xs text-gray-500 text-center py-4">
                  No preview available
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-[#DFDFDF] border-t-2 border-gray-400 px-3 py-2 text-xs text-gray-600">
        {searched ? `${results.length} result(s) found` : 'Ready to search'}
      </div>
    </div>
  );
};
