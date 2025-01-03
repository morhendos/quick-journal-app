'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
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
      aria-label={`${direction === 'left' ? 'Previous' : 'Next'} month`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

export function MonthlyHeader() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthOffset, setMonthOffset] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    setCurrentDate(date);
  }, [monthOffset]);

  const handlePreviousMonth = () => {
    setMonthOffset(prev => prev - 1);
  };

  const handleNextMonth = () => {
    if (monthOffset < 0) {
      setMonthOffset(prev => prev + 1);
    }
  };

  const handleCurrentMonth = () => {
    setMonthOffset(0);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-3 animate-pulse">
        <div className="w-8 h-8 bg-accent/10 rounded-full" />
        <div className="w-40 h-8 bg-paper rounded-md" />
        <div className="w-8 h-8 bg-accent/10 rounded-full" />
      </div>
    );
  }

  const monthName = new Intl.DateTimeFormat('en-US', { 
    month: 'long',
    year: 'numeric'
  }).format(currentDate);

  return (
    <div className="flex flex-col items-center gap-4 relative pb-10">
      <div className="flex items-center gap-3">
        <NavigationButton
          direction="left"
          onClick={handlePreviousMonth}
        />

        <h2 className="text-xl sm:text-2xl font-semibold text-ink/90 journal-heading min-w-[180px] text-center">
          {monthName}
        </h2>

        <NavigationButton
          direction="right"
          onClick={handleNextMonth}
          disabled={monthOffset === 0}
        />
      </div>

      {monthOffset !== 0 && (
        <button
          onClick={handleCurrentMonth}
          className={cn(
            'absolute bottom-0 left-1/2 transform -translate-x-1/2',
            'text-xs text-ink/60 hover:text-ink',
            'transition-all duration-200',
            'py-1 px-2 rounded-md',
            'hover:bg-accent/10 active:bg-accent/20',
            'focus:outline-none focus:ring-2 focus:ring-accent/30'
          )}
        >
          Back to Current Month
        </button>
      )}
    </div>
  );
}