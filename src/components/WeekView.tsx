'use client';

import { useJournalStorage } from '@/lib/storage';
import { startOfWeek, addDays, format } from 'date-fns';
import { CheckCircle2 } from 'lucide-react';

export function WeekView() {
  const { getEntries } = useJournalStorage();
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start from Monday
  const entries = getEntries();

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startDate, i);
    const isToday = format(new Date(), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    const hasEntry = entries.some(entry => 
      format(new Date(entry.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    return { 
      date,
      dayName: format(date, 'EEE'),
      hasEntry,
      isToday
    };
  });

  return (
    <div className="flex justify-between gap-2 py-4 px-1 mb-6">
      {days.map(({ date, dayName, hasEntry, isToday }) => (
        <div 
          key={dayName}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-sm text-ink/70 journal-text">{dayName}</span>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center border
              ${hasEntry 
                ? 'text-accent bg-accent/10 border-accent/20' 
                : 'text-ink/30 bg-paper/50 border-ink/10'}
              ${isToday && 'ring-2 ring-accent/20 ring-offset-1 ring-offset-background'}
              transition-colors duration-200`}
          >
            <CheckCircle2 size={16} />
          </div>
        </div>
      ))}
    </div>
  );
}