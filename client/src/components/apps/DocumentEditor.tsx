import React, { useState } from 'react';
import { Bold, Italic, Underline, Save, Plus } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  content: string;
}

interface DocumentEditorProps {
  fileContent?: { content: string; filename: string };
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({ fileContent }) => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'Welcome to Curtains XP',
      content: 'Welcome to the Curtains XP Document Editor!\n\nThis is a nostalgic word processor that brings back the charm of early 2000s computing. You can create, edit, and format documents with ease.',
    },
  ]);

  const [activeDocIdx, setActiveDocIdx] = useState(0);
  const [newDocName, setNewDocName] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const activeDoc = documents[activeDocIdx];

  const handleContentChange = (newContent: string) => {
    const updated = [...documents];
    updated[activeDocIdx].content = newContent;
    setDocuments(updated);
  };

  const handleNewDocument = () => {
    if (!newDocName.trim()) return;
    const newDoc: Document = {
      id: Date.now().toString(),
      title: newDocName,
      content: '',
    };
    setDocuments([...documents, newDoc]);
    setActiveDocIdx(documents.length);
    setNewDocName('');
  };

  return (
    <div className="flex h-full [background-color:#DFDFDF]">
      {/* Sidebar */}
      <div className="w-40 bg-[background-color:#C0C0C0] border-r-2 border-gray-400 p-2 flex flex-col">
        <h3 className="text-xs font-bold mb-2">Documents</h3>
        <div className="flex-1 space-y-1 overflow-auto mb-2">
          {documents.map((doc, idx) => (
            <button
              key={doc.id}
              onClick={() => setActiveDocIdx(idx)}
              className={`w-full p-1 text-left text-xs rounded transition-colors truncate ${
                idx === activeDocIdx
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-300'
              }`}
              title={doc.title}
            >
              {doc.title}
            </button>
          ))}
        </div>

        <div className="space-y-1 border-t-2 border-gray-400 pt-2">
          <input
            type="text"
            value={newDocName}
            onChange={(e) => setNewDocName(e.target.value)}
            placeholder="Document name"
            className="xp-input w-full text-xs"
            onKeyPress={(e) => e.key === 'Enter' && handleNewDocument()}
          />
          <button
            onClick={handleNewDocument}
            className="xp-button w-full text-xs flex items-center justify-center gap-1"
          >
            <Plus size={12} /> New
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-[background-color:#C0C0C0] border-b-2 border-gray-400 p-2 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold">{activeDoc.title}</span>
            <button className="xp-button p-1 ml-auto text-xs flex items-center gap-1">
              <Save size={12} /> Save
            </button>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => setIsBold(!isBold)}
              className={`xp-button p-1 ${isBold ? 'bg-blue-500 text-white' : ''}`}
              title="Bold"
            >
              <Bold size={14} />
            </button>
            <button
              onClick={() => setIsItalic(!isItalic)}
              className={`xp-button p-1 ${isItalic ? 'bg-blue-500 text-white' : ''}`}
              title="Italic"
            >
              <Italic size={14} />
            </button>
            <button
              onClick={() => setIsUnderline(!isUnderline)}
              className={`xp-button p-1 ${isUnderline ? 'bg-blue-500 text-white' : ''}`}
              title="Underline"
            >
              <Underline size={14} />
            </button>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={activeDoc.content}
          onChange={(e) => handleContentChange(e.target.value)}
          className="flex-1 p-4 resize-none border-none outline-none"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#000000',
            fontWeight: isBold ? 'bold' : 'normal',
            fontStyle: isItalic ? 'italic' : 'normal',
            textDecoration: isUnderline ? 'underline' : 'none',
          }}
          spellCheck="false"
        />
      </div>
    </div>
  );
};
