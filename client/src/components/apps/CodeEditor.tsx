import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface File {
  id: string;
  name: string;
  content: string;
  language?: string;
}

interface CodeEditorProps {
  fileContent?: { content: string; filename: string };
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ fileContent }) => {
  const [files, setFiles] = useState<File[]>([
    {
      id: '1',
      name: 'index.html',
      content: `<!DOCTYPE html>
<html>
<head>
  <title>Hello World</title>
</head>
<body>
  <h1>Welcome to Curtains XP</h1>
  <p>This is a nostalgic OS simulator</p>
</body>
</html>`,
      language: 'html',
    },
    {
      id: '2',
      name: 'style.css',
      content: `body {
  font-family: Arial, sans-serif;
  background-color: #0099CC;
  color: #000;
}

h1 {
  font-size: 24px;
  font-weight: bold;
}`,
      language: 'css',
    },
  ]);
  const [activeFileIdx, setActiveFileIdx] = useState(0);
  const [newFileName, setNewFileName] = useState('');

  const activeFile = files[activeFileIdx];

  const handleContentChange = (newContent: string) => {
    const updated = [...files];
    updated[activeFileIdx].content = newContent;
    setFiles(updated);
  };

  const handleNewFile = () => {
    if (!newFileName.trim()) return;
    const newFile: File = {
      id: Date.now().toString(),
      name: newFileName,
      content: '',
      language: newFileName.split('.').pop() || 'txt',
    };
    setFiles([...files, newFile]);
    setActiveFileIdx(files.length);
    setNewFileName('');
  };

  const handleDeleteFile = () => {
    if (files.length === 1) {
      alert('Cannot delete the last file');
      return;
    }
    const updated = files.filter((_, idx) => idx !== activeFileIdx);
    setFiles(updated);
    setActiveFileIdx(Math.max(0, activeFileIdx - 1));
  };

  return (
    <div className="flex h-full [background-color:#DFDFDF]">
      {/* Sidebar */}
      <div className="w-40 bg-[background-color:#C0C0C0] border-r-2 border-gray-400 p-2 flex flex-col">
        <h3 className="text-xs font-bold mb-2">Files</h3>
        <div className="flex-1 space-y-1 overflow-auto mb-2">
          {files.map((file, idx) => (
            <button
              key={file.id}
              onClick={() => setActiveFileIdx(idx)}
              className={`w-full p-1 text-left text-xs rounded transition-colors ${
                idx === activeFileIdx
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-300'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>

        <div className="space-y-1 border-t-2 border-gray-400 pt-2">
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder="filename.txt"
            className="xp-input w-full text-xs"
            onKeyPress={(e) => e.key === 'Enter' && handleNewFile()}
          />
          <button
            onClick={handleNewFile}
            className="xp-button w-full text-xs flex items-center justify-center gap-1"
          >
            <Plus size={12} /> New
          </button>
          <button
            onClick={handleDeleteFile}
            className="xp-button w-full text-xs flex items-center justify-center gap-1"
          >
            <Trash2 size={12} /> Delete
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-[background-color:#C0C0C0] border-b-2 border-gray-400 p-2 flex items-center gap-2">
          <span className="text-xs font-bold">{activeFile.name}</span>
          <button className="xp-button p-1 ml-auto text-xs flex items-center gap-1">
            <Save size={12} /> Save
          </button>
        </div>

        {/* Text Area */}
        <textarea
          value={activeFile.content}
          onChange={(e) => handleContentChange(e.target.value)}
          className="flex-1 p-2 font-mono text-xs resize-none border-none outline-none"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#000000',
            fontFamily: '"Courier New", monospace',
          }}
          spellCheck="false"
        />
      </div>
    </div>
  );
};
