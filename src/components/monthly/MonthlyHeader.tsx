'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMonthlyContext } from '@/contexts/MonthlyContext';
import { cn } from '@/lib/utils';

type NavigationButtonProps = {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
  compact?: boolean;
};

function NavigationButton({ direction, onClick, disabled, compact }: NavigationButtonProps) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center rounded-full',
        'transition-all duration-200',
        'hover:bg-accent/10 active:bg-accent/20',
        'focus:outline-none focus:ring-2 focus:ring-accent/30',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'text-ink/70 hover:text-ink',
        compact ? 'w-6 h-6' : 'w-7 h-7 sm:w-8 sm:h-8'
      )}
      aria-label={`${direction === 'left' ? 'Previous' : 'Next'} month`}
    >
      <Icon className={compact ? "w-4 h-4" : "w-4 h-4 sm:w-5 sm:h-5"} />
    </button>
  );
}

interface MonthlyHeaderProps {
  compact?: boolean;
}

export function MonthlyHeader({ compact }: MonthlyHeaderProps) {
  const { selectedDate, monthOffset, setMonthOffset, isCurrentMonth } = useMonthlyContext();

  const handlePreviousMonth = () => {
    setMonthOffset(monthOffset - 1);
  };

  const handleNextMonth = () => {
    if (!isCurrentMonth) {
      setMonthOffset(monthOffset + 1);
    }
  };

  const handleCurrentMonth = () => {
    setMonthOffset(0);
  };

  const monthName = new Intl.DateTimeFormat('en-US', { 
    month: 'long',
    year: compact ? undefined : 'numeric'
  }).format(selectedDate);

  return (
    <div className={cn(
      "relative",
      !compact && "pb-6 sm:pb-8"
    )}>
      <div className="flex items-center gap-2 sm:gap-3 justify-center">
        <NavigationButton
          direction="left"
          onClick={handlePreviousMonth}
          compact={compact}
        />

        <h2 className={cn(
          "journal-heading text-center",
          compact ? "text-base sm:text-lg text-ink/90" : "text-lg sm:text-xl md:text-2xl font-semibold text-ink/90",
          compact ? "min-w-[120px] sm:min-w-[140px]" : "min-w-[140px] sm:min-w-[180px]"
        )}>
          {monthName}
        </h2>

        <NavigationButton
          direction="right"
          onClick={handleNextMonth}
          disabled={isCurrentMonth}
          compact={compact}
        />
      </div>

      {!compact && !isCurrentMonth && (
        <button
          onClick={handleCurrentMonth}
          className={cn(
            'absolute bottom-0 left-1/2 transform -translate-x-1/2',
            'text-xs sm:text-sm text-ink/60 hover:text-ink',
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