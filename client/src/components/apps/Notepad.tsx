import React, { useState } from 'react';
import { createFile } from '@/lib/filesystem';
import { useSoundEffect } from '@/hooks/useSoundEffect';

interface NotepadProps {
  fileContent?: { content: string; filename: string };
}

export const Notepad: React.FC<NotepadProps> = ({ fileContent = undefined }) => {
  const { playSound } = useSoundEffect();
  const [content, setContent] = useState(fileContent?.content || '');
  const [filename, setFilename] = useState(fileContent?.filename || 'Untitled.txt');

  const handleSave = () => {
    playSound('click');
    if (!content.trim()) {
      alert('Cannot save empty file');
      return;
    }
    // Save to file system
    createFile(filename, content, 'root');
    playSound('success');
    alert(`File saved: ${filename}`);
  };

  const handleDownload = () => {
    playSound('click');
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    playSound('success');
  };

  return (
    <div className="flex flex-col h-full [background-color:#DFDFDF]">
      {/* Menu Bar */}
      <div className="[background-color:#DFDFDF] border-b-2 border-gray-400 px-2 py-1 flex gap-4">
        <button className="text-xs font-bold hover:bg-blue-500 hover:text-white px-2 py-1">
          File
        </button>
        <button className="text-xs font-bold hover:bg-blue-500 hover:text-white px-2 py-1">
          Edit
        </button>
        <button className="text-xs font-bold hover:bg-blue-500 hover:text-white px-2 py-1">
          Format
        </button>
        <button className="text-xs font-bold hover:bg-blue-500 hover:text-white px-2 py-1">
          View
        </button>
        <button className="text-xs font-bold hover:bg-blue-500 hover:text-white px-2 py-1">
          Help
        </button>
      </div>

      {/* Toolbar */}
      <div className="[background-color:#DFDFDF] border-b-2 border-gray-400 px-2 py-1 flex gap-2">
        <button
          onClick={handleSave}
          className="xp-button text-xs"
          title="Save"
        >
          💾 Save
        </button>
        <button
          onClick={handleDownload}
          className="xp-button text-xs"
          title="Download"
        >
          📥 Download
        </button>
        <button onClick={() => playSound('click')} className="xp-button text-xs" title="Print">
          🖨️ Print
        </button>
        <div className="flex-1" />
        <input
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="xp-input text-xs w-32"
          placeholder="Filename"
        />
      </div>

      {/* Text Area */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-2 font-mono text-xs resize-none border-none outline-none bg-white"
        spellCheck="false"
      />

      {/* Status Bar */}
      <div className="[background-color:#DFDFDF] border-t-2 border-gray-400 px-2 py-1 text-xs flex justify-between">
        <span>Line: {content.split('\n').length}</span>
        <span>Column: {content.split('\n').pop()?.length || 0}</span>
      </div>
    </div>
  );
};
