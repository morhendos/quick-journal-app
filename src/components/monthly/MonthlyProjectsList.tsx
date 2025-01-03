'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';

export function MonthlyProjectsList() {
  const {
    getSelectedMonthData,
    addProjectItem,
    updateProjectItem,
    deleteProjectItem
  } = useMonthlyStorage();

  const currentData = getSelectedMonthData();

  return (
    <MonthlyList
      title="Projects & Goals"
      items={currentData.projectItems}
      addItem={addProjectItem}
      updateItem={updateProjectItem}
      deleteItem={deleteProjectItem}
      emptyMessage="Start adding your projects and goals for this month"
      placeholder="Enter a project or goal..."
    />
  );
}