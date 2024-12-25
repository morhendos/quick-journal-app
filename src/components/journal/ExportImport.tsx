'use client';

import React, { useRef } from 'react';
import { exportJournalEntries, importJournalEntries } from '@/lib/exportImport';
import { JournalEntry } from '@/types/journal';
import { Download, Upload } from 'lucide-react';

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
    <div className="flex gap-2">
      <button
        onClick={handleExport}
        className="
          p-2
          rounded-lg
          bg-paper paper-texture journal-shadow 
          border border-accent/20
          hover:scale-102 active:scale-98 
          transition-all duration-200
          flex items-center justify-center
          text-ink/90
        "
        aria-label="Export journal entries"
      >
        <Download size={20} className="text-accent" strokeWidth={1.5} />
      </button>
      <button
        onClick={handleImportClick}
        className="
          p-2
          rounded-lg
          bg-paper paper-texture journal-shadow 
          border border-accent/20
          hover:scale-102 active:scale-98 
          transition-all duration-200
          flex items-center justify-center
          text-ink/90
        "
        aria-label="Import journal entries"
      >
        <Upload size={20} className="text-accent" strokeWidth={1.5} />
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
