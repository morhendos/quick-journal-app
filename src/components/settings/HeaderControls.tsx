'use client';

import { useToast } from '@/components/ui/use-toast';
import { Download, Upload, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { IconButton } from '../ui/IconButton';
import { exportJournalEntries, importJournalEntries } from '@/lib/exportImport';
import { useJournalStore } from '@/hooks/useJournalStore';
import { getEntries } from '@/lib/storage';

export function HeaderControls() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateEntries = useJournalStore(state => state.updateEntries);

  // Theme handling
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Import/Export handlers
  const handleExport = async () => {
    try {
      await exportJournalEntries();
      toast({
        title: 'Export Successful',
        description: 'Your journal has been exported successfully.',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to export journal entries',
        variant: 'destructive',
        duration: 3000,
      });
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
      updateEntries(getEntries()); // Update store with latest entries
      toast({
        title: 'Import Successful',
        description: `Successfully imported ${entries.length} journal entries.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to import journal entries',
        variant: 'destructive',
        duration: 3000,
      });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex justify-end items-center gap-2">
      <IconButton
        icon={Download}
        onClick={handleExport}
        aria-label="Export journal entries"
      />
      <IconButton
        icon={Upload}
        onClick={handleImportClick}
        aria-label="Import journal entries"
      />
      <IconButton
        icon={theme === 'dark' ? Sun : Moon}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
    </div>
  );
}