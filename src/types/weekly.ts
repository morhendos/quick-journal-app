/**
 * Types for Weekly Planning and Review feature
 */

export interface Habit {
  id: string;
  name: string;
  targetDays: number; // e.g., 5 for "5/7 days"
  completedDates: string[]; // ISO date strings when completed
  notes?: string;
  color?: string; // For UI visualization
}

export interface WeeklyReview {
  text: string;
  accomplishments: string;
  challenges: string;
  lessonsLearned?: string;
  nextWeekFocus?: string;
  rating?: number; // 1-5 scale
  reviewedAt: string;
}

export interface WeeklyPlan {
  id: string;
  weekStartDate: string; // Monday of the week (ISO date)
  description: string; // Overall plan/intentions for the week
  habits: Habit[];
  review?: WeeklyReview;
  createdAt: string;
  updatedAt: string;
}

export interface WeeklyPlanFormData {
  description: string;
  habits: Omit<Habit, 'id' | 'completedDates'>[];
}

// Utility type for habit tracking
export interface HabitProgress {
  habit: Habit;
  progress: number; // Percentage (0-100)
  isCompleted: boolean;
  remainingDays: number;
}

// For weekly overview
export interface WeekSummary {
  weekStartDate: string;
  hasPlan: boolean;
  hasReview: boolean;
  habitCompletion: number; // Overall percentage
  totalHabits: number;
  completedHabits: number;
}
