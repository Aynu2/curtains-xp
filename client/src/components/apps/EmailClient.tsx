import React, { useState, useEffect } from 'react';
import { Mail, Send, Trash2, Reply, Archive } from 'lucide-react';
import { getEmails, addEmail, deleteEmail, markEmailAsRead, EmailMessage } from '@/lib/storage';

export const EmailClient: React.FC = () => {
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [currentFolder, setCurrentFolder] = useState<'inbox' | 'sent' | 'drafts'>('inbox');
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    body: '',
  });

  useEffect(() => {
    loadEmails();
  }, [currentFolder]);

  const loadEmails = () => {
    const allEmails = getEmails(currentFolder);
    setEmails(allEmails);
  };

  const handleSendEmail = () => {
    if (!composeData.to || !composeData.subject) {
      alert('Please fill in all fields');
      return;
    }

    const newEmail: EmailMessage = {
      id: Date.now().toString(),
      from: 'user@curtains-xp.local',
      to: composeData.to,
      subject: composeData.subject,
      body: composeData.body,
      timestamp: Date.now(),
      read: true,
      folder: 'sent',
    };

    addEmail(newEmail);
    setComposeData({ to: '', subject: '', body: '' });
    setShowCompose(false);
    loadEmails();
  };

  const handleDeleteEmail = (emailId: string) => {
    deleteEmail(emailId);
    setSelectedEmail(null);
    loadEmails();
  };

  const handleSelectEmail = (email: EmailMessage) => {
    setSelectedEmail(email);
    if (!email.read) {
      markEmailAsRead(email.id);
      loadEmails();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail size={20} />
          <span className="font-bold">Curtains Mail</span>
        </div>
        <button
          onClick={() => setShowCompose(true)}
          className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm flex items-center gap-1"
        >
          <Send size={14} />
          Compose
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-32 bg-gray-100 border-r border-gray-300 p-2 space-y-1">
          {(['inbox', 'sent', 'drafts'] as const).map((folder) => (
            <button
              key={folder}
              onClick={() => {
                setCurrentFolder(folder);
                setSelectedEmail(null);
              }}
              className={`w-full text-left px-3 py-2 text-xs rounded capitalize ${
                currentFolder === folder
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200'
              }`}
            >
              {folder}
              {folder === 'inbox' && (
                <span className="ml-1 text-xs">
                  ({emails.filter(e => !e.read).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Email List */}
          <div className="w-64 border-r border-gray-300 overflow-y-auto">
            {emails.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-xs">
                No emails in {currentFolder}
              </div>
            ) : (
              emails.map((email) => (
                <button
                  key={email.id}
                  onClick={() => handleSelectEmail(email)}
                  className={`w-full text-left p-3 border-b border-gray-200 hover:bg-blue-50 transition ${
                    selectedEmail?.id === email.id ? 'bg-blue-100' : ''
                  }`}
                >
                  <div className="font-bold text-xs truncate">
                    {email.from}
                  </div>
                  <div className={`text-xs truncate ${email.read ? 'text-gray-500' : 'font-bold'}`}>
                    {email.subject}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(email.timestamp).toLocaleDateString()}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Email View / Compose */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {showCompose ? (
              // Compose View
              <div className="p-4 flex flex-col gap-3 overflow-y-auto">
                <h3 className="font-bold text-sm">New Message</h3>
                <div>
                  <label className="text-xs font-bold block mb-1">To:</label>
                  <input
                    type="email"
                    value={composeData.to}
                    onChange={(e) =>
                      setComposeData({ ...composeData, to: e.target.value })
                    }
                    placeholder="recipient@example.com"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Subject:</label>
                  <input
                    type="text"
                    value={composeData.subject}
                    onChange={(e) =>
                      setComposeData({ ...composeData, subject: e.target.value })
                    }
                    placeholder="Email subject"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="text-xs font-bold block mb-1">Message:</label>
                  <textarea
                    value={composeData.body}
                    onChange={(e) =>
                      setComposeData({ ...composeData, body: e.target.value })
                    }
                    placeholder="Type your message here..."
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSendEmail}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <Send size={12} />
                    Send
                  </button>
                  <button
                    onClick={() => setShowCompose(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : selectedEmail ? (
              // Email View
              <div className="p-4 flex flex-col overflow-y-auto">
                <div className="mb-4 pb-4 border-b border-gray-300">
                  <h2 className="font-bold text-sm mb-2">{selectedEmail.subject}</h2>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>
                      <span className="font-bold">From:</span> {selectedEmail.from}
                    </div>
                    <div>
                      <span className="font-bold">To:</span> {selectedEmail.to}
                    </div>
                    <div>
                      <span className="font-bold">Date:</span>{' '}
                      {new Date(selectedEmail.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-xs whitespace-pre-wrap mb-4">
                  {selectedEmail.body}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowCompose(true);
                      setComposeData({
                        to: selectedEmail.from,
                        subject: `Re: ${selectedEmail.subject}`,
                        body: '',
                      });
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <Reply size={12} />
                    Reply
                  </button>
                  <button
                    onClick={() => handleDeleteEmail(selectedEmail.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-xs">
                Select an email to read
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
