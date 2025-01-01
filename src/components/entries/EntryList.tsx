'use client';

import { useJournalStorage } from '@/lib/storage';
import { EntryDisplay } from './EntryDisplay';
import { WeeklyGroupedView } from './WeeklyGroupedView';
import { ViewToggle } from '@/components/common/ViewToggle';
import { BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

type ViewType = 'chronological' | 'weekly';

function getLocalISOString(date: Date) {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().split('T')[0];
}

function getWeekBounds() {
  const today = new Date();
  const currentDay = today.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
}

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

  // Filter entries for chronological view to only show current week
  const { monday, sunday } = getWeekBounds();
  
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

  return (
    <div className="flex flex-col min-h-0 h-full">
      <div className="flex-none">
        <ViewToggle view={view} onViewChange={setView} />
      </div>
      
      <div className="flex-1 overflow-auto min-h-0">
        {noEntriesThisWeek ? (
          <div className="text-center py-8 text-muted text-sm journal-text">
            No entries for this week yet
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