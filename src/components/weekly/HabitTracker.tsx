'use client';

import React from 'react';
import { Check, Circle, Target, TrendingUp } from 'lucide-react';
import { Habit, HabitProgress } from '@/types/weekly';

interface HabitTrackerProps {
  habits: Habit[];
  weekStartDate: string;
  selectedDate?: string;
  onToggleHabit: (habitId: string, date: string) => void;
  calculateProgress: (habit: Habit) => HabitProgress;
  readonly?: boolean;
}

export function HabitTracker({ 
  habits, 
  weekStartDate,
  selectedDate,
  onToggleHabit,
  calculateProgress,
  readonly = false
}: HabitTrackerProps) {
  const today = new Date().toISOString().split('T')[0];
  const currentDate = selectedDate || today;
  
  // Generate week dates
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStartDate);
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  if (habits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No habits to track this week</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Week Overview Grid */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {weekDates.map((date, index) => {
          const isToday = date === today;
          const isSelected = date === currentDate;
          const isPast = new Date(date) < new Date(today);
          
          return (
            <div
              key={date}
              className={`
                text-center p-2 rounded-lg transition-colors cursor-pointer
                ${isToday ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500' : ''}
                ${isSelected && !isToday ? 'bg-gray-100 dark:bg-gray-800' : ''}
                ${!isSelected && !isToday ? 'hover:bg-gray-50 dark:hover:bg-gray-800/50' : ''}
              `}
              onClick={() => !readonly && onToggleHabit('', date)}
            >
              <div className="text-xs text-gray-600 dark:text-gray-400">{dayNames[index]}</div>
              <div className={`text-sm font-medium ${isPast ? 'text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
                {new Date(date).getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Habits List */}
      <div className="space-y-3">
        {habits.map(habit => {
          const progress = calculateProgress(habit);
          const isCompletedToday = habit.completedDates.includes(currentDate);
          const completedCount = habit.completedDates.filter(d => weekDates.includes(d)).length;
          
          return (
            <div key={habit.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {habit.name}
                  </h4>
                  {habit.notes && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {habit.notes}
                    </p>
                  )}
                </div>
                
                {!readonly && (
                  <button
                    onClick={() => onToggleHabit(habit.id, currentDate)}
                    className={`
                      p-3 rounded-lg transition-all transform hover:scale-105
                      ${isCompletedToday 
                        ? 'bg-green-500 text-white shadow-lg' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }
                    `}
                    aria-label={isCompletedToday ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {isCompletedToday ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {completedCount} / {habit.targetDays} days
                  </span>
                  <span className={`font-medium ${progress.isCompleted ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'}`}>
                    {Math.round(progress.progress)}%
                  </span>
                </div>
                
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ease-out ${
                      progress.isCompleted 
                        ? 'bg-green-500' 
                        : progress.progress > 50 
                          ? 'bg-blue-500' 
                          : 'bg-gray-400'
                    }`}
                    style={{ width: `${progress.progress}%` }}
                  />
                </div>

                {/* Week dots */}
                <div className="flex gap-1 justify-between mt-3">
                  {weekDates.map(date => {
                    const isCompleted = habit.completedDates.includes(date);
                    const isPast = new Date(date) <= new Date(today);
                    
                    return (
                      <div
                        key={date}
                        className={`
                          w-6 h-6 rounded-full flex items-center justify-center text-xs
                          ${isCompleted 
                            ? 'bg-green-500 text-white' 
                            : isPast 
                              ? 'bg-gray-200 dark:bg-gray-700' 
                              : 'bg-gray-100 dark:bg-gray-800'
                          }
                        `}
                        title={new Date(date).toLocaleDateString()}
                      >
                        {isCompleted && <Check className="w-3 h-3" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Achievement Badge */}
              {progress.isCompleted && (
                <div className="mt-3 flex items-center gap-2 text-green-600 dark:text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Goal achieved!</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Daily Summary */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {currentDate === today ? "Today's" : `${new Date(currentDate).toLocaleDateString()}'s`} Progress
        </h4>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {habits.filter(h => h.completedDates.includes(currentDate)).length} / {habits.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Habits completed
            </div>
          </div>
          <div className="text-4xl">
            {habits.filter(h => h.completedDates.includes(currentDate)).length === habits.length ? '🎉' : '💪'}
          </div>
        </div>
      </div>
    </div>
  );
}
