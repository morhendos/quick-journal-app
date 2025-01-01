'use client';

import { MonthlyList } from './MonthlyList';
import { useMonthlyStorage } from '@/lib/storage';

export function MonthlyLearningList() {
  const { learningItems, addLearningItem, updateLearningItem, deleteLearningItem } = useMonthlyStorage();
  
  return (
    <MonthlyList
      title="Personal Learning"
      items={learningItems}
      addItem={addLearningItem}
      updateItem={updateLearningItem}
      deleteItem={deleteLearningItem}
      emptyMessage="No personal learning items yet"
      placeholder="What have you been learning this month?"
    />
  );
}