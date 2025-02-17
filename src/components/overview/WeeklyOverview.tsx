'use client';

import { useJournalStorage } from '@/lib/storage';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { getLocalISOString, getWeekDays, isFutureDate, getWeekRange } from '@/utils/dates';
import { useDateContext } from '@/contexts/DateContext';
import { cn } from '@/lib/utils';

type NavigationButtonProps = {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
};

function NavigationButton({ direction, onClick, disabled }: NavigationButtonProps) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-8 h-8 flex items-center justify-center rounded-full',
        'transition-all duration-200',
        'hover:bg-accent/10 active:bg-accent/20',
        'focus:outline-none focus:ring-2 focus:ring-accent/30',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'text-ink/70 hover:text-ink'
      )}
      aria-label={`${direction === 'left' ? 'Previous' : 'Next'} week`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

export function WeeklyOverview() {
  const { entries } = useJournalStorage();
  const { selectedDate, setSelectedDate, weekOffset, setWeekOffset } = useDateContext();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const weekDays = useMemo(() => getWeekDays(weekOffset), [weekOffset]);
  const weekRange = useMemo(() => getWeekRange(weekOffset), [weekOffset]);

  const entryMap = useMemo(() => {
    const map = new Map<string, boolean>();
    entries.forEach(entry => {
      if (typeof entry.date === 'string') {
        map.set(entry.date, true);
      }
    });
    return map;
  }, [entries]);

  const hasEntryForDate = (date: Date): boolean => {
    try {
      const dateStr = getLocalISOString(date);
      return entryMap.has(dateStr);
    } catch {
      return false;
    }
  };

  const isToday = (date: Date): boolean => {
    try {
      const today = new Date();
      return getLocalISOString(date) === getLocalISOString(today);
    } catch {
      return false;
    }
  };

  const isSelectedDay = (date: Date): boolean => {
    try {
      return getLocalISOString(date) === selectedDate;
    } catch {
      return false;
    }
  };

  const handleDayClick = (date: Date): void => {
    if (isFutureDate(date)) return;
    try {
      const dateStr = getLocalISOString(date);
      setSelectedDate(dateStr);
    } catch (error) {
      console.error('Error handling day click:', error);
    }
  };

  const handlePreviousWeek = () => {
    setWeekOffset(prev => prev - 1);
  };

  const handleNextWeek = () => {
    if (weekOffset < 0) {
      setWeekOffset(prev => prev + 1);
    }
  };

  const handleCurrentWeek = () => {
    setWeekOffset(0);
  };

  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <h3 className="text-sm font-medium text-ink/90 journal-text flex items-center gap-2.5">
          <div className="w-[18px] h-[18px] bg-accent/20 rounded" />
          <div className="w-24 h-4 bg-ink/10 rounded" />
        </h3>
        
        <div className="flex gap-2 items-center">
          {Array(7).fill(0).map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-md bg-paper/50"
            />
          ))}
        </div>
      </div>
    );
  }

  const today = new Date();
  const todayStr = getLocalISOString(today);

  return (
    <div className="flex flex-col items-center gap-4 relative pb-10"> {/* Added pb-10 for button space */}
      <div className="flex items-center gap-3">
        <NavigationButton
          direction="left"
          onClick={handlePreviousWeek}
        />

        <div className="flex flex-col items-center min-w-[140px]">
          <h3 className="text-sm font-medium text-ink/90 journal-text flex items-center gap-2.5">
            <Calendar size={18} className="text-accent" strokeWidth={1.5} />
            <span>{weekRange.month} {weekRange.year}</span>
          </h3>
          <p className="text-xs text-ink/60 mt-0.5">
            {weekRange.start} - {weekRange.end}
          </p>
        </div>

        <NavigationButton
          direction="right"
          onClick={handleNextWeek}
          disabled={weekOffset === 0}
        />
      </div>
      
      <div className="flex gap-2 items-center">
        {weekDays.map((date, index) => {
          const dateStr = getLocalISOString(date);
          const hasEntry = hasEntryForDate(date);
          const isCurrentDay = dateStr === todayStr;
          const isSelected = isSelectedDay(date);
          const isFutureDay = isFutureDate(date);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          
          return (
            <button
              key={index}
              onClick={() => handleDayClick(date)}
              disabled={isFutureDay}
              aria-label={`${dayName} ${date.getDate()}${hasEntry ? ', has entry' : ''}${isCurrentDay ? ', current day' : ''}`}
              aria-pressed={isSelected}
              className={cn(
                'w-8 h-8 rounded-md flex items-center justify-center text-xs',
                'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50',
                hasEntry ? 'bg-accent/20 text-accent hover:bg-accent/30' : 'bg-paper text-ink/50 hover:bg-paper/80',
                isCurrentDay ? 'ring-2 ring-accent' : '',
                isSelected ? 'ring-2 ring-accent/50 shadow-sm' : '',
                isFutureDay ? 'opacity-50 cursor-default' : 'cursor-pointer hover:scale-105 active:scale-95'
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {weekOffset !== 0 && (
        <button
          onClick={handleCurrentWeek}
          className={cn(
            'absolute bottom-0 left-1/2 transform -translate-x-1/2',
            'text-xs text-ink/60 hover:text-ink',
            'transition-all duration-200',
            'py-1 px-2 rounded-md',
            'hover:bg-accent/10 active:bg-accent/20',
            'focus:outline-none focus:ring-2 focus:ring-accent/30'
          )}
        >
          Back to Current Week
        </button>
      )}
    </div>
  );
}