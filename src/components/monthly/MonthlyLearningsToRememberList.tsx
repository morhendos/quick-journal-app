'use client';

import { MonthlyList } from './MonthlyList';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';

export function MonthlyLearningsToRememberList() {
  const {
    getCurrentMonthData,
    addLearningToRememberItem,
    updateLearningToRememberItem,
    deleteLearningToRememberItem
  } = useMonthlyStorage();

  const currentData = getCurrentMonthData();

  return (
    <MonthlyList
      title="Things I've learned and want to remember"
      items={currentData.learningToRememberItems}
      addItem={addLearningToRememberItem}
      updateItem={updateLearningToRememberItem}
      deleteItem={deleteLearningToRememberItem}
      emptyMessage="Start adding learnings you want to remember"
      placeholder="Enter something you learned..."
    />
  );
}