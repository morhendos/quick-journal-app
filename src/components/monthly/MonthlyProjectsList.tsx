'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';

export function MonthlyProjectsList() {
  const {
    getCurrentMonthData,
    addProjectItem,
    updateProjectItem,
    deleteProjectItem
  } = useMonthlyStorage();

  const currentData = getCurrentMonthData();

  return (
    <MonthlyList
      title="Projects I've Moved Forward"
      items={currentData.projectItems || []}
      addItem={addProjectItem}
      updateItem={updateProjectItem}
      deleteItem={deleteProjectItem}
      emptyMessage="Start adding your project progress for this month"
      placeholder="Enter project progress..."
    />
  );
}