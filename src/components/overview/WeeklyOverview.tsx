'use client';

import { useJournalStorage } from '@/lib/storage';
import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

function getLocalISOString(date: Date) {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().split('T')[0];
}

interface WeeklyOverviewProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export function WeeklyOverview({ selectedDate, onDateSelect }: WeeklyOverviewProps) {
  const { entries } = useJournalStorage();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const getDaysOfWeek = () => {
    const today = new Date();
    const days = [];
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + mondayOffset + i);
      days.push(date);
    }
    
    return days;
  };

  const hasEntryForDate = (date: Date) => {
    const dateStr = getLocalISOString(date);
    return entries.some(entry => entry.date === dateStr);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return getLocalISOString(date) === getLocalISOString(today);
  };

  const isFutureDate = (date: Date) => {
    const today = new Date();
    const todayStr = getLocalISOString(today);
    const dateStr = getLocalISOString(date);
    return dateStr > todayStr;
  };

  const handleDayClick = (date: Date) => {
    if (isFutureDate(date)) return;
    onDateSelect(getLocalISOString(date));
  };

  const isSelectedDay = (date: Date) => {
    return getLocalISOString(date) === selectedDate;
  };

  const weekDays = getDaysOfWeek();
  const today = new Date();
  const todayStr = getLocalISOString(today);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-medium text-ink/90 journal-text flex items-center gap-2.5">
          <Calendar size={18} className="text-accent" strokeWidth={1.5} />
          <span>Week Overview</span>
        </h3>
        
        <div className="flex gap-2 items-center">
          {weekDays.map((date, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-md flex items-center justify-center text-xs
                transition-colors duration-200
                bg-paper text-ink/50"
            >
              {date.getDate()}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-medium text-ink/90 journal-text flex items-center gap-2.5">
        <Calendar size={18} className="text-accent" strokeWidth={1.5} />
        <span>Week Overview</span>
      </h3>
      
      <div className="flex gap-2 items-center">
        {weekDays.map((date, index) => {
          const dateStr = getLocalISOString(date);
          const hasEntry = entries.some(entry => entry.date === dateStr);
          const isCurrentDay = dateStr === todayStr;
          const isSelected = isSelectedDay(date);
          const isFuture = isFutureDate(date);
          
          return (
            <button
              key={index}
              onClick={() => handleDayClick(date)}
              disabled={isFuture}
              className={`w-8 h-8 rounded-md flex items-center justify-center text-xs
                transition-all duration-200
                ${hasEntry ? 'bg-accent/20 text-accent hover:bg-accent/30' : 'bg-paper text-ink/50 hover:bg-paper/80'}
                ${isCurrentDay ? 'ring-2 ring-accent' : ''}
                ${isSelected ? 'ring-2 ring-accent/50 shadow-sm' : ''}
                ${isFuture ? 'opacity-50 cursor-default' : 'cursor-pointer hover:scale-105 active:scale-95'}
                `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}