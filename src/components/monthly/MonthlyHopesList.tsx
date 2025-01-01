'use client';

import { MonthlyList } from './MonthlyList';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';

export function MonthlyHopesList() {
  const {
    getCurrentMonthData,
    addHopeItem,
    updateHopeItem,
    deleteHopeItem
  } = useMonthlyStorage();

  const currentData = getCurrentMonthData();

  return (
    <MonthlyList
      title="Hopes for the next month"
      items={currentData.hopeItems}
      addItem={addHopeItem}
      updateItem={updateHopeItem}
      deleteItem={deleteHopeItem}
      emptyMessage="Start adding your hopes for next month"
      placeholder="Enter a hope for next month..."
    />
  );
}