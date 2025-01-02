'use client';

import { useJournalStorage } from '@/lib/storage';
import { EntryDisplay } from './EntryDisplay';
import { WeeklyGroupedView } from './WeeklyGroupedView';
import { ViewToggle } from '@/components/common/ViewToggle';
import { BookOpen } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { getLocalISOString, getWeekBounds, getWeekRange } from '@/utils/dates';
import { useDateContext } from '@/contexts/DateContext';

type ViewType = 'chronological' | 'weekly';

export function EntryList() {
  const { entries } = useJournalStorage();
  const { weekOffset } = useDateContext();
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<ViewType>('chronological');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get week bounds based on the selected week offset
  const weekBounds = useMemo(() => {
    return getWeekBounds(weekOffset);
  }, [weekOffset]);

  const weekRange = useMemo(() => {
    return getWeekRange(weekOffset);
  }, [weekOffset]);

  if (!mounted) {
    return null;
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

  // Filter entries for the selected week
  const { monday, sunday } = weekBounds;
  
  const filteredEntries = view === 'chronological'
    ? entries.filter(entry => {
        const entryDate = new Date(entry.date + 'T00:00:00');
        const entryLocalDate = getLocalISOString(entryDate);
        const mondayLocal = getLocalISOString(monday);
        const sundayLocal = getLocalISOString(sunday);
        return entryLocalDate >= mondayLocal && entryLocalDate <= sundayLocal;
      })
    : entries;

  // Sort entries with newest first for chronological view
  const sortedEntries = view === 'chronological' 
    ? [...filteredEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : [...filteredEntries];

  const noEntriesThisWeek = view === 'chronological' && sortedEntries.length === 0;
  const currentWeekText = weekOffset === 0 ? 'this week' : `week of ${weekRange.start}`;

  return (
    <div className="flex flex-col min-h-0 h-full">
      <div className="flex-none space-y-2">
        <ViewToggle view={view} onViewChange={setView} />
        {view === 'chronological' && (
          <p className="text-xs text-ink/60 text-center journal-text">
            {weekOffset === 0 ? 'Current Week' : `Week of ${weekRange.start} - ${weekRange.end}`}
          </p>
        )}
      </div>
      
      <div className="flex-1 overflow-auto min-h-0 mt-4">
        {noEntriesThisWeek ? (
          <div className="text-center py-8 text-muted text-sm journal-text border-2 border-dashed border-accent/10 rounded-lg">
            No entries for {currentWeekText}
          </div>
        ) : view === 'chronological' ? (
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