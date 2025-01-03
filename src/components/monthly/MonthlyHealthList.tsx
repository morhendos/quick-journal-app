'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';

export function MonthlyHealthList() {
  const {
    getSelectedMonthData,
    addHealthItem,
    updateHealthItem,
    deleteHealthItem
  } = useMonthlyStorage();

  const currentData = getSelectedMonthData();

  return (
    <MonthlyList
      title="Health & Well-being"
      items={currentData.healthItems}
      addItem={addHealthItem}
      updateItem={updateHealthItem}
      deleteItem={deleteHealthItem}
      emptyMessage="Start adding health-related items for this month"
      placeholder="Enter a health-related item..."
    />
  );
}