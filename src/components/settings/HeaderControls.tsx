'use client';

import { Download, Upload, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { downloadEntries, importEntries } from '@/lib/storage';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { JournalEntry, ImportFormat } from '@/types/journal';

interface HeaderControlsProps {
  onEntriesUpdate?: () => void;
}

// Storage actions type
type StorageActions = {
  importData: (data: unknown) => Promise<void>;
  exportData: () => void;
};

function MonthlyControls() {
  const { theme, toggleTheme } = useTheme();
  const { exportData, importData } = useMonthlyStorage();
  
  const storageActions: StorageActions = {
    importData: async (data: unknown) => importData(data),
    exportData
  };

  return (
    <Controls
      theme={theme}
      toggleTheme={toggleTheme}
      storageActions={storageActions}
    />
  );
}

function JournalControls({ onEntriesUpdate }: HeaderControlsProps) {
  const { theme, toggleTheme } = useTheme();
  
  const storageActions: StorageActions = {
    importData: async (data: unknown) => {
      importEntries(data as ImportFormat | JournalEntry[]);
      onEntriesUpdate?.();
    },
    exportData: () => downloadEntries()
  };

  return (
    <Controls
      theme={theme}
      toggleTheme={toggleTheme}
      storageActions={storageActions}
    />
  );
}

function Controls({
  theme,
  toggleTheme,
  storageActions
}: {
  theme: string;
  toggleTheme: () => void;
  storageActions: StorageActions;
}) {
  const handleImport = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data = JSON.parse(text);
        await storageActions.importData(data);
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Error importing data. Please check the file format.');
      }
    };

    input.click();
  }, [storageActions]);

  return (
    <div className="flex justify-end gap-2">
      <HeaderButton
        onClick={handleImport}
        aria-label="Import entries"
      >
        <Upload size={20} strokeWidth={1.5} />
      </HeaderButton>

      <HeaderButton
        onClick={storageActions.exportData}
        aria-label="Export entries"
      >
        <Download size={20} strokeWidth={1.5} />
      </HeaderButton>

      <HeaderButton
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun size={20} strokeWidth={1.5} />
        ) : (
          <Moon size={20} strokeWidth={1.5} />
        )}
      </HeaderButton>
    </div>
  );
}

function HeaderButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-10 h-10 rounded-full flex items-center justify-center
        text-ink/70 hover:text-ink transition-colors duration-200"
    >
      {children}
    </button>
  );
}

export function HeaderControls(props: HeaderControlsProps) {
  const pathname = usePathname();
  const isMonthlyPage = pathname === '/monthly';
  
  if (isMonthlyPage) {
    return <MonthlyControls />;
  }
  
  return <JournalControls {...props} />;
}