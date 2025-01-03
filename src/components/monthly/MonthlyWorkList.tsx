'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';
import { useMonthlyContext } from '@/contexts/MonthlyContext';

export function MonthlyWorkList() {
  const {
    getSelectedMonthData,
    addWorkItem,
    updateWorkItem,
    deleteWorkItem
  } = useMonthlyStorage();

  const { selectedDate } = useMonthlyContext();
  const currentData = getSelectedMonthData();
  
  // Only show edit controls for December 2024
  const isDecember2024 = selectedDate.getMonth() === 11 && selectedDate.getFullYear() === 2024;

  return (
    <MonthlyList
      title="Work I Got Done"
      items={currentData.workItems}
      addItem={isDecember2024 ? addWorkItem : undefined}
      updateItem={isDecember2024 ? updateWorkItem : undefined}
      deleteItem={isDecember2024 ? deleteWorkItem : undefined}
      emptyMessage={
        isDecember2024 
          ? "Start adding your accomplishments for this month"
          : "No accomplishments recorded for this month"
      }
      placeholder="Enter an accomplishment..."
    />
  );
}