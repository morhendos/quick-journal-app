'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';

export function MonthlyLearningsToRememberList() {
  const {
    getSelectedMonthData,
    addLearningToRememberItem,
    updateLearningToRememberItem,
    deleteLearningToRememberItem
  } = useMonthlyStorage();

  const currentData = getSelectedMonthData();

  return (
    <MonthlyList
      title="Learnings to Remember"
      items={currentData.learningToRememberItems}
      addItem={addLearningToRememberItem}
      updateItem={updateLearningToRememberItem}
      deleteItem={deleteLearningToRememberItem}
      emptyMessage="Start adding important learnings to remember"
      placeholder="Enter a learning to remember..."
    />
  );
}