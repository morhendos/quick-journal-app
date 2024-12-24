'use client';

import { useEffect, useState } from 'react';
import { EntryDisplay } from '@/components/journal/EntryDisplay';
import { useJournalStore } from '@/hooks/useJournalStore';
import { BookOpen } from 'lucide-react';

export function JournalEntryList() {
  const [mounted, setMounted] = useState(false);
  const { entries, loadEntries } = useJournalStore();

  useEffect(() => {
    setMounted(true);
    loadEntries();
  }, [loadEntries]);

  if (!mounted) return null;

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-accent/20 rounded-lg transition-colors">
        <div className="inline-block p-3 bg-accent/5 rounded-full mb-4">
          <BookOpen size={24} className="text-accent" strokeWidth={1.5} />
        </div>
        <p className="text-ink font-medium mb-1 journal-heading transition-colors">
          Your Journal Awaits
        </p>
        <p className="text-muted text-sm journal-text transition-colors">
          Begin your journey of reflection today
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
      {entries.map((entry, index) => (
        <div 
          key={entry.id} 
          style={{ animationDelay: `${index * 0.1}s` }}
          className="animate-slide-in"
        >
          <EntryDisplay entry={entry} />
        </div>
      ))}
    </div>
  );
}