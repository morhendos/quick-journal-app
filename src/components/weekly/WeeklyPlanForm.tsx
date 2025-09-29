'use client';

import React, { useState } from 'react';
import { Plus, X, Target } from 'lucide-react';
import { WeeklyPlanFormData } from '@/types/weekly';
import { AutoResizeTextarea } from '@/components/common/AutoResizeTextarea';
import { Button } from '@/components/common/Button';

interface WeeklyPlanFormProps {
  initialData?: WeeklyPlanFormData;
  onSubmit: (data: WeeklyPlanFormData) => void;
  onCancel?: () => void;
  weekStartDate: string;
}

export function WeeklyPlanForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  weekStartDate 
}: WeeklyPlanFormProps) {
  const [description, setDescription] = useState(initialData?.description || '');
  const [habits, setHabits] = useState(
    initialData?.habits || [{ name: '', targetDays: 7, notes: '' }]
  );

  const formatWeekRange = (startDate: string) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  };

  const addHabit = () => {
    setHabits([...habits, { name: '', targetDays: 7, notes: '' }]);
  };

  const removeHabit = (index: number) => {
    setHabits(habits.filter((_, i) => i !== index));
  };

  const updateHabit = (index: number, field: string, value: any) => {
    const updatedHabits = [...habits];
    updatedHabits[index] = { ...updatedHabits[index], [field]: value };
    setHabits(updatedHabits);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty habits
    const validHabits = habits.filter(h => h.name.trim());
    
    if (!description.trim() && validHabits.length === 0) {
      return;
    }

    onSubmit({
      description,
      habits: validHabits
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Week of {formatWeekRange(weekStartDate)}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Plan your intentions and habits for the week
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Weekly Intentions
        </label>
        <AutoResizeTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What do you want to focus on this week? What are your main goals and priorities?"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          minRows={3}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            <Target className="inline-block w-4 h-4 mr-1" />
            Habits to Track
          </label>
          <Button
            type="button"
            onClick={addHabit}
            variant="secondary"
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Habit
          </Button>
        </div>

        <div className="space-y-3">
          {habits.map((habit, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
                                        bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    value={habit.name}
                    onChange={(e) => updateHabit(index, 'name', e.target.value)}
                    placeholder="Habit name (e.g., 'No alcohol', 'Exercise', 'Meditate')"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Target:
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="1"
                        max="7"
                        value={habit.targetDays}
                        onChange={(e) => updateHabit(index, 'targetDays', parseInt(e.target.value) || 1)}
                        className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md 
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-center
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">/ 7 days</span>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={habit.notes || ''}
                    onChange={(e) => updateHabit(index, 'notes', e.target.value)}
                    placeholder="Optional notes (e.g., 'Only on weekdays')"
                    className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {habits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHabit(index)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary">
          {initialData ? 'Update Plan' : 'Save Plan'}
        </Button>
      </div>
    </form>
  );
}
