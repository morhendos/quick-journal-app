'use client';

import { ThemeToggle } from '../ThemeToggle';
import ExportImport from '../journal/ExportImport';
import { useToast } from '@/components/ui/use-toast';
import { JournalEntry } from '@/types/journal';

export function PageHeader() {
  const { toast } = useToast();

  const handleImportSuccess = (entries: JournalEntry[]) => {
    toast({
      title: 'Import Successful',
      description: `Successfully imported ${entries.length} journal entries.`,
      duration: 3000,
    });
  };

  const handleError = (error: string) => {
    toast({
      title: 'Error',
      description: error,
      variant: 'destructive',
      duration: 3000,
    });
  };

  return (
    <div className="mb-16 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="w-32"></div> {/* Spacer with fixed width */}
        <h1 className="journal-heading text-4xl sm:text-5xl font-bold text-ink tracking-tight">
          Daily Journal
        </h1>
        <div className="w-32 flex justify-end items-center gap-2"> {/* Container for buttons */}
          <ExportImport 
            onImportSuccess={handleImportSuccess}
            onError={handleError}
          />
          <ThemeToggle />
        </div>
      </div>
      <p className="text-muted text-lg max-w-2xl mx-auto journal-text leading-relaxed text-center">
        Capture your daily moments of growth and joy. Every reflection is a step toward mindfulness.
      </p>
    </div>
  );
}
