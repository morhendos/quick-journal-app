'use client';

import { useEffect, useState } from 'react';
import { JournalEntry } from '@/types/journal';
import { getEntries } from '@/lib/storage';
import { EntryDisplay } from '@/components/journal/EntryDisplay';

export function JournalEntryList() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEntries(getEntries().sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  }, []);

  if (!mounted) return null;

  if (entries.length === 0) {
    return <EmptyState />;
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

function EmptyState() {
  return (
    <div className="text-center py-12 border-2 border-dashed border-accent/20 rounded-lg">
      <div className="inline-block p-3 bg-accent/5 rounded-full mb-4">
        <span className="text-2xl">📝</span>
      </div>
      <p className="text-ink font-medium mb-1 journal-heading">Your Journal Awaits</p>
      <p className="text-muted text-sm journal-text">Begin your journey of reflection today</p>
    </div>
  );
}
