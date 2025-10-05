'use client';

import React from 'react';
import { Check, Circle, Target } from 'lucide-react';
import { useWeeklyPlans } from '@/hooks/useWeeklyPlans';
import Link from 'next/link';

export function DailyHabitsWidget() {
  const {
    currentWeekPlan,
    toggleHabitCompletion,
    calculateHabitProgress
  } = useWeeklyPlans();

  const today = new Date().toISOString().split('T')[0];

  if (!currentWeekPlan || currentWeekPlan.habits.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Today's Habits
        </h3>
        <Link
          href="/weekly"
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View Week →
        </Link>
      </div>

      <div className="space-y-3">
        {currentWeekPlan.habits.map(habit => {
          const isCompleted = habit.completedDates.includes(today);
          const progress = calculateHabitProgress(habit, currentWeekPlan.weekStartDate);
          
          return (
            <div key={habit.id} className="flex items-center justify-between p-3 
                                          border border-gray-200 dark:border-gray-700 rounded-lg
                                          hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {habit.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {habit.completedDates.length} / {habit.targetDays} days
                  {progress.isCompleted && (
                    <span className="ml-2 text-green-600 dark:text-green-400">✓ Goal achieved!</span>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => toggleHabitCompletion(currentWeekPlan.id, habit.id, today)}
                className={`
                  p-2 rounded-lg transition-all transform hover:scale-105
                  ${isCompleted 
                    ? 'bg-green-500 text-white shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
                aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            Today: {currentWeekPlan.habits.filter(h => h.completedDates.includes(today)).length} / {currentWeekPlan.habits.length} completed
          </span>
          <span className="font-medium">
            {Math.round((currentWeekPlan.habits.filter(h => h.completedDates.includes(today)).length / currentWeekPlan.habits.length) * 100)}% done
          </span>
        </div>
      </div>
    </div>
  );
}
