'use client';

import { Download, Upload } from 'lucide-react';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';

export function ExportImportControls() {
  const { exportData, importData } = useMonthlyStorage();

  const handleImport = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data = JSON.parse(text);
        await importData(data);
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Error importing data. Please check the file format.');
      }
    };

    input.click();
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={exportData}
        className="flex items-center gap-2 text-sm text-ink/70 hover:text-accent transition-colors"
        title="Export data"
      >
        <Download size={16} />
        <span>Export</span>
      </button>
      <button
        onClick={handleImport}
        className="flex items-center gap-2 text-sm text-ink/70 hover:text-accent transition-colors"
        title="Import data"
      >
        <Upload size={16} />
        <span>Import</span>
      </button>
    </div>
  );
}