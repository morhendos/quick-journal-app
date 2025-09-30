'use client';

import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeeklyHeaderProps {
  selectedWeek: string;
  onNavigateWeek: (direction: 'prev' | 'next') => void;
  onGoToToday: () => void;
  isCurrentWeek: boolean;
  compact?: boolean;
}

export function WeeklyHeader({ 
  selectedWeek, 
  onNavigateWeek, 
  onGoToToday, 
  isCurrentWeek,
  compact = false 
}: WeeklyHeaderProps) {
  
  const formatWeekRange = (startDate: string) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}, ${start.getFullYear()}`;
  };

  return (
    <div className={cn(
      "paper-texture bg-paper rounded-lg journal-shadow transition-colors duration-200",
      compact ? "p-3" : "p-4 sm:p-6"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-ink opacity-70" />
          {isCurrentWeek && (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
              Current Week
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigateWeek('prev')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Previous week"
          >
            <ChevronLeft className="w-4 h-4 text-ink" />
          </button>
          
          <div className="text-center min-w-0">
            <div className={cn(
              "font-medium text-ink",
              compact ? "text-sm" : "text-base"
            )}>
              {formatWeekRange(selectedWeek)}
            </div>
            {!compact && !isCurrentWeek && (
              <button
                onClick={onGoToToday}
                className="text-xs text-blue-600 hover:text-blue-700 mt-1 transition-colors"
              >
                Go to current week
              </button>
            )}
          </div>
          
          <button
            onClick={() => onNavigateWeek('next')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={new Date(selectedWeek) > new Date()}
            aria-label="Next week"
          >
            <ChevronRight className="w-4 h-4 text-ink" />
          </button>
        </div>
      </div>
    </div>
  );
}
