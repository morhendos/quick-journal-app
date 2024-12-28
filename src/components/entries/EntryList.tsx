'use client';

import { useJournalStorage } from '@/lib/storage';
import { EntryDisplay } from './EntryDisplay';
import { WeeklyGroupedView } from './WeeklyGroupedView';
import { ViewToggle } from '@/components/common/ViewToggle';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';

type ViewType = 'chronological' | 'weekly';

export function EntryList() {
  const { entries } = useJournalStorage();
  const [view, setView] = useState<ViewType>('weekly');

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

  return (
    <div>
      <ViewToggle view={view} onViewChange={setView} />
      
      <div className="max-h-[450px] sm:max-h-[600px] overflow-y-auto pr-1 sm:pr-2 -mr-1 sm:-mr-2">
        {view === 'chronological' ? (
          <div className="space-y-4 sm:space-y-6">
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
        ) : (
          <WeeklyGroupedView entries={entries} />
        )}
      </div>
    </div>
  );
}