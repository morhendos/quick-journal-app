'use client';

import { useJournalStorage } from '@/lib/storage';
import { EntryDisplay } from './EntryDisplay';
import { WeeklyGroupedView } from './WeeklyGroupedView';
import { ViewToggle } from '@/components/common/ViewToggle';
import { BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

type ViewType = 'chronological' | 'weekly';

export function EntryList() {
  const { entries } = useJournalStorage();
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<ViewType>('weekly');

  // Handle hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 border-2 border-dashed border-accent/20 rounded-lg transition-colors">
        <div className="inline-block p-3 bg-accent/5 rounded-full mb-3 sm:mb-4">
          <BookOpen size={24} className="text-accent" strokeWidth={1.5} />
        </div>
        <p className="text-ink font-medium mb-1 journal-heading transition-colors text-base sm:text-lg">
          Your Journal Awaits
        </p>
        <p className="text-muted text-xs sm:text-sm journal-text transition-colors px-4">
          Begin your journey of reflection today
        </p>
      </div>
    );
  }

  // Sort entries chronologically (oldest first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="flex flex-col min-h-0 h-full">
      <div className="flex-none">
        <ViewToggle view={view} onViewChange={setView} />
      </div>
      
      <div className="flex-1 overflow-auto min-h-0">
        {view === 'chronological' ? (
          <div className="space-y-4 sm:space-y-6">
            {sortedEntries.map((entry, index) => (
              <div 
                key={entry.id} 
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-slide-in"
              >
                <EntryDisplay entry={entry} />
              </div>
            ))}
          </div>
        ) : (
          <WeeklyGroupedView entries={sortedEntries} />
        )}
      </div>
    </div>
  );
}