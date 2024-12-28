'use client';

import { useJournalStorage } from '@/lib/storage';
import { startOfWeek, addDays, format } from 'date-fns';
import { CheckCircle2 } from 'lucide-react';

export function WeekView() {
  const { getEntries } = useJournalStorage();
  const startDate = startOfWeek(new Date());
  const entries = getEntries();

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startDate, i);
    const hasEntry = entries.some(entry => 
      format(new Date(entry.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    return { 
      date,
      dayName: format(date, 'EEE'),
      hasEntry 
    };
  });

  return (
    <div className="flex justify-between gap-2 py-4 px-1">
      {days.map(({ date, dayName, hasEntry }) => (
        <div 
          key={dayName}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-sm text-ink/70 journal-text">{dayName}</span>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center
              ${hasEntry ? 'text-accent bg-accent/10' : 'text-ink/30 bg-paper/50'}
              transition-colors duration-200`}
          >
            <CheckCircle2 size={16} />
          </div>
        </div>
      ))}
    </div>
  );
}
