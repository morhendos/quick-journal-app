'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';

export function MonthlyWorkList() {
  const {
    getSelectedMonthData,
    addWorkItem,
    updateWorkItem,
    deleteWorkItem
  } = useMonthlyStorage();

  const currentData = getSelectedMonthData();

  return (
    <MonthlyList
      title="Work I Got Done"
      items={currentData.workItems}
      addItem={addWorkItem}
      updateItem={updateWorkItem}
      deleteItem={deleteWorkItem}
      emptyMessage="Start adding your accomplishments for this month"
      placeholder="Enter an accomplishment..."
    />
  );
}