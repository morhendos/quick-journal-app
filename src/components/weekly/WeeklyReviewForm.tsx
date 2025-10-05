'use client';

import React, { useState } from 'react';
import { Star, Trophy, AlertCircle, Lightbulb, Target } from 'lucide-react';
import { WeeklyReview } from '@/types/weekly';
import { AutoResizeTextarea } from '@/components/common/AutoResizeTextarea';
import { Button } from '@/components/common/Button';

interface WeeklyReviewFormProps {
  initialData?: WeeklyReview;
  onSubmit: (review: Omit<WeeklyReview, 'reviewedAt'>) => void;
  onCancel?: () => void;
  weekStartDate: string;
}

export function WeeklyReviewForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  weekStartDate 
}: WeeklyReviewFormProps) {
  const [review, setReview] = useState<Omit<WeeklyReview, 'reviewedAt'>>({
    text: initialData?.text || '',
    accomplishments: initialData?.accomplishments || '',
    challenges: initialData?.challenges || '',
    lessonsLearned: initialData?.lessonsLearned || '',
    nextWeekFocus: initialData?.nextWeekFocus || '',
    rating: initialData?.rating || 3
  });

  const formatWeekRange = (startDate: string) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(review);
  };

  const updateField = (field: keyof typeof review, value: any) => {
    setReview(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Week Review: {formatWeekRange(weekStartDate)}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Reflect on your week and capture key insights
        </p>
      </div>

      {/* Week Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          How would you rate this week?
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => updateField('rating', rating)}
              className={`p-2 transition-all ${
                (review.rating || 0) >= rating
                  ? 'text-yellow-500 scale-110'
                  : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400'
              }`}
            >
              <Star 
                className="w-8 h-8" 
                fill={(review.rating || 0) >= rating ? 'currentColor' : 'none'}
              />
            </button>
          ))}
        </div>
      </div>

      {/* General Reflection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          General Reflection
        </label>
        <AutoResizeTextarea
          value={review.text}
          onChange={(e) => updateField('text', e.target.value)}
          placeholder="How did this week go overall? What stood out to you?"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          minRows={3}
        />
      </div>

      {/* Accomplishments */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Trophy className="w-4 h-4 text-green-600" />
          Accomplishments & Wins
        </label>
        <AutoResizeTextarea
          value={review.accomplishments}
          onChange={(e) => updateField('accomplishments', e.target.value)}
          placeholder="What did you accomplish? What went well? What are you proud of?"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          minRows={2}
        />
      </div>

      {/* Challenges */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <AlertCircle className="w-4 h-4 text-orange-600" />
          Challenges & Obstacles
        </label>
        <AutoResizeTextarea
          value={review.challenges}
          onChange={(e) => updateField('challenges', e.target.value)}
          placeholder="What challenges did you face? What didn't go as planned?"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          minRows={2}
        />
      </div>

      {/* Lessons Learned */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Lightbulb className="w-4 h-4 text-yellow-600" />
          Lessons Learned
        </label>
        <AutoResizeTextarea
          value={review.lessonsLearned || ''}
          onChange={(e) => updateField('lessonsLearned', e.target.value)}
          placeholder="What did you learn this week? What insights did you gain?"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          minRows={2}
        />
      </div>

      {/* Next Week Focus */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Target className="w-4 h-4 text-blue-600" />
          Focus for Next Week
        </label>
        <AutoResizeTextarea
          value={review.nextWeekFocus || ''}
          onChange={(e) => updateField('nextWeekFocus', e.target.value)}
          placeholder="Based on this week's experience, what will you focus on next week?"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          minRows={2}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary">
          {initialData ? 'Update Review' : 'Save Review'}
        </Button>
      </div>
    </form>
  );
}
