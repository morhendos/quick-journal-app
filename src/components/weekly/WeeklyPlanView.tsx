'use client';

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Edit2, CheckCircle, FileText } from 'lucide-react';
import { useWeeklyPlans } from '@/hooks/useWeeklyPlans';
import { WeeklyPlanForm } from './WeeklyPlanForm';
import { WeeklyReviewForm } from './WeeklyReviewForm';
import { HabitTracker } from './HabitTracker';
import { Button } from '@/components/common/Button';
import { WeeklyPlan } from '@/types/weekly';

type ViewMode = 'tracker' | 'plan' | 'review';

export function WeeklyPlanView() {
  const {
    currentWeekPlan,
    getPlanByWeek,
    savePlan,
    toggleHabitCompletion,
    saveReview,
    calculateHabitProgress,
    getWeekStart
  } = useWeeklyPlans();

  const [selectedWeek, setSelectedWeek] = useState(getWeekStart());
  const [viewMode, setViewMode] = useState<ViewMode>('tracker');
  const [isEditing, setIsEditing] = useState(false);
  
  const plan = getPlanByWeek(selectedWeek);
  const isCurrentWeek = selectedWeek === getWeekStart();
  
  // Format week display
  const formatWeekRange = (startDate: string) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}, ${start.getFullYear()}`;
  };

  // Navigate weeks
  const navigateWeek = (direction: 'prev' | 'next') => {
    const current = new Date(selectedWeek);
    current.setDate(current.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedWeek(current.toISOString().split('T')[0]);
  };

  const handlePlanSubmit = (data: any) => {
    savePlan(data, selectedWeek);
    setIsEditing(false);
    setViewMode('tracker');
  };

  const handleReviewSubmit = (review: any) => {
    if (plan) {
      saveReview(plan.id, review);
      setViewMode('tracker');
    }
  };

  const handleHabitToggle = (habitId: string, date: string) => {
    if (plan && habitId) {
      toggleHabitCompletion(plan.id, habitId, date);
    }
  };

  // Check if it's time for review (Friday evening or later)
  const shouldShowReviewPrompt = () => {
    if (!plan || plan.review) return false;
    
    const now = new Date();
    const weekEnd = new Date(selectedWeek);
    weekEnd.setDate(weekEnd.getDate() + 4); // Friday
    weekEnd.setHours(17, 0, 0, 0); // 5 PM Friday
    
    return now >= weekEnd;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Weekly Planning
            </h1>
          </div>
          
          {isCurrentWeek && (
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              Current Week
            </span>
          )}
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {formatWeekRange(selectedWeek)}
            </div>
            {isCurrentWeek && (
              <button
                onClick={() => setSelectedWeek(getWeekStart())}
                className="text-sm text-blue-600 hover:text-blue-700 mt-1"
              >
                Today
              </button>
            )}
          </div>
          
          <button
            onClick={() => navigateWeek('next')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            disabled={new Date(selectedWeek) > new Date()}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode Tabs */}
        {plan && (
          <div className="flex gap-2 mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <button
              onClick={() => setViewMode('tracker')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                viewMode === 'tracker'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Track Habits
            </button>
            <button
              onClick={() => setViewMode('plan')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                viewMode === 'plan'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Edit2 className="w-4 h-4" />
              Edit Plan
            </button>
            <button
              onClick={() => setViewMode('review')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                viewMode === 'review'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <FileText className="w-4 h-4" />
              {plan.review ? 'View Review' : 'Add Review'}
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        {!plan && viewMode === 'tracker' && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No plan for this week yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start by creating a plan with your intentions and habits for the week
            </p>
            <Button
              onClick={() => setViewMode('plan')}
              variant="primary"
              className="inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Weekly Plan
            </Button>
          </div>
        )}

        {/* Plan Description */}
        {plan && viewMode === 'tracker' && (
          <>
            {plan.description && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
                  Weekly Intentions
                </h3>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {plan.description}
                </p>
              </div>
            )}

            {/* Review Prompt */}
            {shouldShowReviewPrompt() && (
              <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-900 dark:text-yellow-300 mb-2">
                  Time for Weekly Review
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  The week is ending. Take a moment to reflect on your progress and learnings.
                </p>
                <Button
                  onClick={() => setViewMode('review')}
                  variant="primary"
                  size="sm"
                >
                  Write Review
                </Button>
              </div>
            )}

            <HabitTracker
              habits={plan.habits}
              weekStartDate={selectedWeek}
              onToggleHabit={handleHabitToggle}
              calculateProgress={calculateHabitProgress}
              readonly={new Date(selectedWeek) > new Date()}
            />
          </>
        )}

        {/* Plan Form */}
        {(viewMode === 'plan' || (!plan && viewMode === 'plan')) && (
          <WeeklyPlanForm
            initialData={plan ? {
              description: plan.description,
              habits: plan.habits.map(h => ({
                name: h.name,
                targetDays: h.targetDays,
                notes: h.notes
              }))
            } : undefined}
            weekStartDate={selectedWeek}
            onSubmit={handlePlanSubmit}
            onCancel={plan ? () => setViewMode('tracker') : undefined}
          />
        )}

        {/* Review Form/Display */}
        {plan && viewMode === 'review' && (
          <>
            {plan.review && !isEditing ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Week Review
                  </h3>
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="secondary"
                    size="sm"
                  >
                    Edit Review
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {plan.review.rating && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} className={i < plan.review.rating! ? 'text-yellow-500' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {plan.review.text && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">General Reflection</h4>
                      <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{plan.review.text}</p>
                    </div>
                  )}
                  
                  {plan.review.accomplishments && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Accomplishments</h4>
                      <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{plan.review.accomplishments}</p>
                    </div>
                  )}
                  
                  {plan.review.challenges && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Challenges</h4>
                      <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{plan.review.challenges}</p>
                    </div>
                  )}
                  
                  {plan.review.lessonsLearned && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lessons Learned</h4>
                      <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{plan.review.lessonsLearned}</p>
                    </div>
                  )}
                  
                  {plan.review.nextWeekFocus && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Next Week Focus</h4>
                      <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{plan.review.nextWeekFocus}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <WeeklyReviewForm
                initialData={plan.review}
                weekStartDate={selectedWeek}
                onSubmit={(review) => {
                  handleReviewSubmit(review);
                  setIsEditing(false);
                }}
                onCancel={() => {
                  setIsEditing(false);
                  if (!plan.review) setViewMode('tracker');
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
