'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';

export function MonthlyLearningList() {
  const {
    getSelectedMonthData,
    addLearningItem,
    updateLearningItem,
    deleteLearningItem
  } = useMonthlyStorage();

  const currentData = getSelectedMonthData();

  return (
    <MonthlyList
      title="What I Learned"
      items={currentData.learningItems}
      addItem={addLearningItem}
      updateItem={updateLearningItem}
      deleteItem={deleteLearningItem}
      emptyMessage="Start adding your learnings for this month"
      placeholder="Enter something you learned..."
    />
  );
}