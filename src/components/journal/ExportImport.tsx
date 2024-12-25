import React, { useRef } from 'react';
import { exportJournalEntries, importJournalEntries } from '@/lib/exportImport';
import { JournalEntry } from '@/types/journal';

interface ExportImportProps {
  onImportSuccess: (entries: JournalEntry[]) => void;
  onError: (error: string) => void;
}

const ExportImport: React.FC<ExportImportProps> = ({ onImportSuccess, onError }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    try {
      await exportJournalEntries();
    } catch (error) {
      onError('Failed to export journal entries');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const entries = await importJournalEntries(file);
      onImportSuccess(entries);
    } catch (error) {
      onError('Failed to import journal entries');
    } finally {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={handleExport}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Export Journal
      </button>
      <button
        onClick={handleImportClick}
        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Import Journal
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
    </div>
  );
};

export default ExportImport;
