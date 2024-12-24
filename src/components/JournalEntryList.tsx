'use client';

import { useEffect, useState } from 'react';
import { JournalEntry } from '@/types/journal';
import { getEntries } from '@/lib/storage';
import { EntryDisplay } from '@/components/journal/EntryDisplay';
import { BookOpen } from 'lucide-react';

export function JournalEntryList() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Update entries whenever local storage changes
  useEffect(() => {
    // Initial load
    loadEntries();

    // Set up storage event listener
    const handleStorageChange = () => {
      loadEntries();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Poll for changes every second (as backup)
    const interval = setInterval(loadEntries, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const loadEntries = () => {
    const newEntries = getEntries().sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setEntries(newEntries);
  };

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