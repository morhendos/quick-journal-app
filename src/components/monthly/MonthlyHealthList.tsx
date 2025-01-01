'use client';

import { MonthlyList } from './MonthlyList';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';

export function MonthlyHealthList() {
  const {
    getCurrentMonthData,
    addHealthItem,
    updateHealthItem,
    deleteHealthItem
  } = useMonthlyStorage();

  const currentData = getCurrentMonthData();

  return (
    <MonthlyList
      title="Health and fitness challenges I've been doing"
      items={currentData.healthItems}
      addItem={addHealthItem}
      updateItem={updateHealthItem}
      deleteItem={deleteHealthItem}
      emptyMessage="Start adding your health and fitness activities for this month"
      placeholder="Enter a health/fitness activity..."
    />
  );
}