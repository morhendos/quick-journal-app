'use client';

import { useJournalStorage } from '@/lib/storage';
import { Calendar } from 'lucide-react';

export function WeeklyOverview() {
  const { entries } = useJournalStorage();
  
  const getAllEntryDates = () => {
    const today = new Date();
    const allDates = entries.map(entry => new Date(entry.date));
    const days: Date[] = [];

    // Add dates from entries
    allDates.forEach(date => {
      const startOfWeek = date.getDate() - date.getDay();
      const dayDate = new Date(date);
      dayDate.setDate(startOfWeek);
      
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(dayDate);
        currentDate.setDate(dayDate.getDate() + i);
        if (!days.some(d => d.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0])) {
          days.push(currentDate);
        }
      }
    });

    // Add current week if not already included
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      if (!days.some(d => d.toISOString().split('T')[0] === date.toISOString().split('T')[0])) {
        days.push(date);
      }
    }

    return days.sort((a, b) => a.getTime() - b.getTime());
  };

  const hasEntryForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return entries.some(entry => entry.date === dateStr);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toISOString().split('T')[0] === today.toISOString().split('T')[0];
  };

  const getWeekLabel = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  const groupDatesByWeek = (dates: Date[]) => {
    const weeks = new Map<string, Date[]>();
    
    dates.forEach(date => {
      const weekLabel = getWeekLabel(date);
      if (!weeks.has(weekLabel)) {
        weeks.set(weekLabel, []);
      }
      weeks.get(weekLabel)!.push(date);
    });
    
    return weeks;
  };

  const allDates = getAllEntryDates();
  const weekGroups = groupDatesByWeek(allDates);

  return (
    <div className="w-full space-y-6">
      <h3 className="text-sm font-medium text-ink/90 journal-text flex items-center gap-2.5">
        <Calendar size={18} className="text-accent" strokeWidth={1.5} />
        <span>Activity Overview</span>
      </h3>
      
      <div className="space-y-4">
        {Array.from(weekGroups).map(([weekLabel, dates]) => (
          <div key={weekLabel} className="space-y-2">
            <div className="text-xs text-ink/60">{weekLabel}</div>
            <div className="flex gap-2 items-center">
              {dates.map((date, index) => (
                <div
                  key={index}
                  className={`
                    w-8 h-8 rounded-md flex items-center justify-center text-xs
                    transition-colors duration-200
                    ${hasEntryForDate(date) ? 'bg-accent/20 text-accent' : 'bg-paper text-ink/50'}
                    ${isToday(date) ? 'ring-2 ring-accent' : ''}
                  `}
                >
                  {date.getDate()}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}