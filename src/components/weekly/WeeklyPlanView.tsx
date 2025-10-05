'use client';

import React, { useState } from 'react';
import { Plus, Edit2, CheckCircle, FileText, Calendar } from 'lucide-react';
import { useWeeklyPlans } from '@/hooks/useWeeklyPlans';
import { WeeklyPlanForm } from './WeeklyPlanForm';
import { WeeklyReviewForm } from './WeeklyReviewForm';
import { HabitTracker } from './HabitTracker';
import { WeeklyHeader } from './WeeklyHeader';
import { Section } from '@/components/common/Section';
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
  
  // Navigate weeks
  const navigateWeek = (direction: 'prev' | 'next') => {
    const current = new Date(selectedWeek);
    current.setDate(current.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedWeek(current.toISOString().split('T')[0]);
  };

  const goToToday = () => {
    setSelectedWeek(getWeekStart());
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

  // View Mode Tab Component
  const ViewModeTabs = () => {
    if (!plan) return null;

    const tabs = [
      { mode: 'tracker' as ViewMode, icon: CheckCircle, label: 'Track Habits' },
      { mode: 'plan' as ViewMode, icon: Edit2, label: 'Edit Plan' },
      { mode: 'review' as ViewMode, icon: FileText, label: plan.review ? 'View Review' : 'Add Review' }
    ];

    return (
      <div className="flex gap-2 border-t border-gray-200 dark:border-gray-700 pt-4">
        {tabs.map(({ mode, icon: Icon, label }) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`flex-1 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm ${
              viewMode === mode
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    );
  };

  // Empty State Component
  const EmptyState = () => (
    <div className="text-center py-12">
      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="journal-heading text-lg font-medium text-ink mb-2">
        No plan for this week yet
      </h3>
      <p className="text-ink opacity-70 mb-6">
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
  );

  // Weekly Intentions Component
  const WeeklyIntentions = () => {
    if (!plan?.description) return null;

    return (
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
          Weekly Intentions
        </h3>
        <p className="text-ink opacity-80 whitespace-pre-wrap">
          {plan.description}
        </p>
      </div>
    );
  };

  // Review Prompt Component
  const ReviewPrompt = () => {
    if (!shouldShowReviewPrompt()) return null;

    return (
      <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-900 dark:text-yellow-300 mb-2">
          Time for Weekly Review
        </h3>
        <p className="text-ink opacity-80 mb-3">
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
    );
  };

  // Review Display Component
  const ReviewDisplay = () => {
    if (!plan?.review || isEditing) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 className="journal-heading text-lg font-semibold text-ink">
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
              <span className="text-sm text-ink opacity-70">Rating:</span>
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < (plan.review?.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {plan.review.text && (
            <div>
              <h4 className="text-sm font-medium text-ink opacity-80 mb-1">General Reflection</h4>
              <p className="text-ink opacity-70 whitespace-pre-wrap">{plan.review.text}</p>
            </div>
          )}
          
          {plan.review.accomplishments && (
            <div>
              <h4 className="text-sm font-medium text-ink opacity-80 mb-1">Accomplishments</h4>
              <p className="text-ink opacity-70 whitespace-pre-wrap">{plan.review.accomplishments}</p>
            </div>
          )}
          
          {plan.review.challenges && (
            <div>
              <h4 className="text-sm font-medium text-ink opacity-80 mb-1">Challenges</h4>
              <p className="text-ink opacity-70 whitespace-pre-wrap">{plan.review.challenges}</p>
            </div>
          )}
          
          {plan.review.lessonsLearned && (
            <div>
              <h4 className="text-sm font-medium text-ink opacity-80 mb-1">Lessons Learned</h4>
              <p className="text-ink opacity-70 whitespace-pre-wrap">{plan.review.lessonsLearned}</p>
            </div>
          )}
          
          {plan.review.nextWeekFocus && (
            <div>
              <h4 className="text-sm font-medium text-ink opacity-80 mb-1">Next Week Focus</h4>
              <p className="text-ink opacity-70 whitespace-pre-wrap">{plan.review.nextWeekFocus}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 min-h-0 overflow-auto">
      <div className="space-y-6">
        {/* Week Navigation Header */}
        <WeeklyHeader
          selectedWeek={selectedWeek}
          onNavigateWeek={navigateWeek}
          onGoToToday={goToToday}
          isCurrentWeek={isCurrentWeek}
        />

        {/* View Mode Tabs */}
        {plan && (
          <Section title="" className="!p-4">
            <ViewModeTabs />
          </Section>
        )}

        {/* Main Content */}
        <Section title={
          viewMode === 'tracker' ? 'Habit Tracker' :
          viewMode === 'plan' ? 'Weekly Plan' :
          'Weekly Review'
        }>
          {/* Empty state */}
          {!plan && viewMode === 'tracker' && <EmptyState />}

          {/* Tracker view */}
          {plan && viewMode === 'tracker' && (
            <>
              <WeeklyIntentions />
              <ReviewPrompt />
              <HabitTracker
                habits={plan.habits}
                weekStartDate={selectedWeek}
                onToggleHabit={handleHabitToggle}
                calculateProgress={(habit) => calculateHabitProgress(habit, selectedWeek)}
                readonly={new Date(selectedWeek) > new Date()}
              />
            </>
          )}

          {/* Plan form */}
          {(viewMode === 'plan' || !plan) && (
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

          {/* Review section */}
          {plan && viewMode === 'review' && (
            <>
              {plan.review && !isEditing ? (
                <ReviewDisplay />
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
        </Section>
      </div>
    </div>
  );
}
