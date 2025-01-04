'use client';

import { Download, Upload, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { downloadEntries, importEntries } from '@/lib/storage';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { JournalEntry, ImportFormat } from '@/types/journal';
import { cn } from '@/lib/utils';

interface HeaderControlsProps {
  onEntriesUpdate?: () => void;
}

function HeaderButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center
        text-ink/70 hover:text-ink transition-colors duration-200"
    >
      {children}
    </button>
  );
}

export function HeaderControls({ onEntriesUpdate }: HeaderControlsProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const monthlyStorage = useMonthlyStorage();
  const isMonthlyPage = pathname === '/monthly';

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
        if (isMonthlyPage) {
          await monthlyStorage.importData(data);
        } else {
          importEntries(data as ImportFormat | JournalEntry[]);
          onEntriesUpdate?.();
        }
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Error importing data. Please check the file format.');
      }
    };

    input.click();
  }, [isMonthlyPage, monthlyStorage, onEntriesUpdate]);

  const handleExport = useCallback(() => {
    if (isMonthlyPage) {
      monthlyStorage.exportData();
    } else {
      downloadEntries();
    }
  }, [isMonthlyPage, monthlyStorage]);

  return (
    <div className="flex justify-end gap-1 sm:gap-2">
      <HeaderButton
        onClick={handleImport}
        aria-label="Import entries"
      >
        <Upload className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={1.5} />
      </HeaderButton>

      <HeaderButton
        onClick={handleExport}
        aria-label="Export entries"
      >
        <Download className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={1.5} />
      </HeaderButton>

      <HeaderButton
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={1.5} />
        ) : (
          <Moon className="w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={1.5} />
        )}
      </HeaderButton>
    </div>
  );
}