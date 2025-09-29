import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { WeeklyPlan, WeeklyPlanFormData, Habit, WeeklyReview, HabitProgress } from '@/types/weekly';

const STORAGE_KEY = 'weekly_plans';

export function useWeeklyPlans() {
  const [plans, setPlans] = useLocalStorage<WeeklyPlan[]>(STORAGE_KEY, []);

  // Get the Monday of a given week
  const getWeekStart = (date: Date = new Date()): string => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when Sunday
    const monday = new Date(d.setDate(diff));
    return monday.toISOString().split('T')[0];
  };

  // Get the end of the week (Sunday)
  const getWeekEnd = (weekStartDate: string): Date => {
    const start = new Date(weekStartDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end;
  };

  // Check if a date is within a week
  const isDateInWeek = (date: string, weekStartDate: string): boolean => {
    const checkDate = new Date(date);
    const weekStart = new Date(weekStartDate);
    const weekEnd = getWeekEnd(weekStartDate);
    return checkDate >= weekStart && checkDate <= weekEnd;
  };

  // Get plan for a specific week
  const getPlanByWeek = useCallback((weekStartDate: string): WeeklyPlan | undefined => {
    return plans.find(plan => plan.weekStartDate === weekStartDate);
  }, [plans]);

  // Get current week's plan
  const getCurrentWeekPlan = useCallback((): WeeklyPlan | undefined => {
    const currentWeekStart = getWeekStart();
    return getPlanByWeek(currentWeekStart);
  }, [getPlanByWeek]);

  // Create or update a plan
  const savePlan = useCallback((formData: WeeklyPlanFormData, weekStartDate?: string): WeeklyPlan => {
    const weekStart = weekStartDate || getWeekStart();
    const existingPlan = getPlanByWeek(weekStart);

    const habits: Habit[] = formData.habits.map(h => ({
      ...h,
      id: h.id || `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      completedDates: existingPlan?.habits.find(eh => eh.name === h.name)?.completedDates || []
    }));

    const plan: WeeklyPlan = existingPlan ? {
      ...existingPlan,
      description: formData.description,
      habits,
      updatedAt: new Date().toISOString()
    } : {
      id: Date.now().toString(),
      weekStartDate: weekStart,
      description: formData.description,
      habits,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (existingPlan) {
      setPlans(current => current.map(p => 
        p.id === existingPlan.id ? plan : p
      ));
    } else {
      setPlans(current => [...current, plan]);
    }

    return plan;
  }, [getPlanByWeek, setPlans]);

  // Toggle habit completion for a specific date
  const toggleHabitCompletion = useCallback((
    planId: string, 
    habitId: string, 
    date: string
  ) => {
    setPlans(current => current.map(plan => {
      if (plan.id !== planId) return plan;

      return {
        ...plan,
        habits: plan.habits.map(habit => {
          if (habit.id !== habitId) return habit;

          const completedDates = habit.completedDates.includes(date)
            ? habit.completedDates.filter(d => d !== date)
            : [...habit.completedDates, date];

          return {
            ...habit,
            completedDates
          };
        }),
        updatedAt: new Date().toISOString()
      };
    }));
  }, [setPlans]);

  // Add or update review
  const saveReview = useCallback((planId: string, review: Omit<WeeklyReview, 'reviewedAt'>): void => {
    setPlans(current => current.map(plan => {
      if (plan.id !== planId) return plan;

      return {
        ...plan,
        review: {
          ...review,
          reviewedAt: new Date().toISOString()
        },
        updatedAt: new Date().toISOString()
      };
    }));
  }, [setPlans]);

  // Calculate habit progress
  const calculateHabitProgress = useCallback((habit: Habit, weekStartDate: string): HabitProgress => {
    const today = new Date();
    const weekEnd = getWeekEnd(weekStartDate);
    
    // Count completed days within this week
    const completedInWeek = habit.completedDates.filter(dateStr => 
      isDateInWeek(dateStr, weekStartDate)
    ).length;

    const progress = (completedInWeek / habit.targetDays) * 100;
    const isCompleted = completedInWeek >= habit.targetDays;
    
    // Calculate remaining days (only count future days in the week)
    const remainingDaysInWeek = Math.max(0, 
      Math.ceil((weekEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    );
    const remainingDaysNeeded = Math.max(0, habit.targetDays - completedInWeek);

    return {
      habit,
      progress: Math.min(100, progress),
      isCompleted,
      remainingDays: Math.min(remainingDaysInWeek, remainingDaysNeeded)
    };
  }, []);

  // Get all plans sorted by week
  const getAllPlans = useCallback((): WeeklyPlan[] => {
    return [...plans].sort((a, b) => 
      new Date(b.weekStartDate).getTime() - new Date(a.weekStartDate).getTime()
    );
  }, [plans]);

  // Delete a plan
  const deletePlan = useCallback((planId: string): void => {
    setPlans(current => current.filter(p => p.id !== planId));
  }, [setPlans]);

  // Check if a date has any habit completions
  const getHabitsForDate = useCallback((date: string, planId?: string): Habit[] => {
    const weekStart = getWeekStart(new Date(date));
    const plan = planId ? plans.find(p => p.id === planId) : getPlanByWeek(weekStart);
    
    if (!plan) return [];
    
    return plan.habits.filter(habit => 
      habit.completedDates.includes(date)
    );
  }, [plans, getPlanByWeek]);

  return {
    plans: getAllPlans(),
    currentWeekPlan: getCurrentWeekPlan(),
    getPlanByWeek,
    savePlan,
    toggleHabitCompletion,
    saveReview,
    calculateHabitProgress,
    deletePlan,
    getWeekStart,
    getWeekEnd,
    getHabitsForDate
  };
}
