'use client';

import { useEffect, useState } from 'react';
import { JournalEntry } from '@/types/journal';
import { getEntries } from '@/lib/storage';
import { EntryDisplay } from '@/components/journal/EntryDisplay';

/**
 * Displays a list of all journal entries in chronological order
 */
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
        <div key={entry.id} style={{ animationDelay: `${index * 0.1}s` }}>
          <EntryDisplay entry={entry} />
        </div>
      ))}
    </div>
  );
}

/**
 * Displayed when there are no journal entries yet
 */
function EmptyState() {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
      <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
        <span className="text-2xl">📝</span>
      </div>
      <p className="text-gray-600 font-medium mb-1">Your Journal Awaits</p>
      <p className="text-sm text-gray-500">Start your journaling journey today!</p>
    </div>
  );
}
