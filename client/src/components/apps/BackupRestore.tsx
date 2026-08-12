import React, { useState, useRef } from 'react';
import { Download, Upload, Trash2, Copy, Check } from 'lucide-react';
import { exportFileSystem, importFileSystem, loadFileSystem, clearFileSystem } from '@/lib/filesystem';

export const BackupRestore: React.FC = () => {
  const [backups, setBackups] = useState<{ id: string; name: string; timestamp: number }[]>(() => {
    const saved = localStorage.getItem('curtains-xp-backups');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveBackups = (items: typeof backups) => {
    setBackups(items);
    localStorage.setItem('curtains-xp-backups', JSON.stringify(items));
  };

  const handleCreateBackup = () => {
    const backupData = exportFileSystem();
    const backupId = `backup-${Date.now()}`;
    const backupName = `Backup ${new Date().toLocaleString()}`;

    // Save backup metadata
    const newBackup = { id: backupId, name: backupName, timestamp: Date.now() };
    saveBackups([...backups, newBackup]);

    // Save actual backup data
    localStorage.setItem(`curtains-xp-backup-${backupId}`, backupData);

    alert(`Backup created: ${backupName}`);
  };

  const handleRestoreBackup = (backupId: string) => {
    if (window.confirm('Restore this backup? Current files will be replaced.')) {
      const backupData = localStorage.getItem(`curtains-xp-backup-${backupId}`);
      if (backupData) {
        if (importFileSystem(backupData)) {
          alert('Backup restored successfully!');
          window.location.reload();
        } else {
          alert('Failed to restore backup');
        }
      }
    }
  };

  const handleDeleteBackup = (backupId: string) => {
    if (window.confirm('Delete this backup permanently?')) {
      localStorage.removeItem(`curtains-xp-backup-${backupId}`);
      saveBackups(backups.filter((b) => b.id !== backupId));
      setSelectedBackup(null);
    }
  };

  const handleExportBackup = (backupId: string) => {
    const backupData = localStorage.getItem(`curtains-xp-backup-${backupId}`);
    if (backupData) {
      const element = document.createElement('a');
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(backupData)
      );
      element.setAttribute('download', `curtains-xp-backup-${backupId}.json`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleImportBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          if (importFileSystem(content)) {
            alert('Backup imported successfully!');
            window.location.reload();
          } else {
            alert('Failed to import backup');
          }
        } catch (error) {
          alert('Invalid backup file');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleCopyBackupData = (backupId: string) => {
    const backupData = localStorage.getItem(`curtains-xp-backup-${backupId}`);
    if (backupData) {
      navigator.clipboard.writeText(backupData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFactoryReset = () => {
    if (
      window.confirm(
        'This will delete ALL files and reset the system. This cannot be undone. Continue?'
      )
    ) {
      clearFileSystem();
      alert('File system cleared. Please refresh the page.');
      window.location.reload();
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#DFDFDF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 flex justify-between items-center border-b-2 border-gray-400">
        <span className="font-bold">Backup & Restore</span>
      </div>

      {/* Actions */}
      <div className="bg-gray-100 border-b-2 border-gray-400 p-3 space-y-2">
        <button
          onClick={handleCreateBackup}
          className="xp-button w-full flex items-center justify-center gap-2 text-xs"
        >
          <Download size={14} />
          Create Backup Now
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="xp-button flex-1 flex items-center justify-center gap-2 text-xs"
          >
            <Upload size={14} />
            Import Backup
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportBackup}
            style={{ display: 'none' }}
          />
          <button
            onClick={handleFactoryReset}
            className="xp-button flex-1 text-xs bg-red-100 hover:bg-red-200"
          >
            Factory Reset
          </button>
        </div>
      </div>

      {/* Backups List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {backups.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-xs">
            No backups yet. Create one to get started.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {backups.map((backup) => (
              <div
                key={backup.id}
                onClick={() => setSelectedBackup(backup.id)}
                className={`p-3 cursor-pointer hover:bg-blue-50 transition ${
                  selectedBackup === backup.id ? 'bg-blue-100' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{backup.name}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(backup.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>

                {selectedBackup === backup.id && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRestoreBackup(backup.id);
                      }}
                      className="xp-button text-xs px-2 py-1 flex items-center gap-1"
                      title="Restore"
                    >
                      ↻ Restore
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExportBackup(backup.id);
                      }}
                      className="xp-button text-xs px-2 py-1 flex items-center gap-1"
                      title="Export"
                    >
                      <Download size={12} />
                      Export
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyBackupData(backup.id);
                      }}
                      className="xp-button text-xs px-2 py-1 flex items-center gap-1"
                      title="Copy"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBackup(backup.id);
                      }}
                      className="xp-button text-xs px-2 py-1 flex items-center gap-1 bg-red-100 hover:bg-red-200"
                      title="Delete"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-[#DFDFDF] border-t-2 border-gray-400 px-3 py-2 text-xs text-gray-600">
        {backups.length} backup(s) available
      </div>
    </div>
  );
};
