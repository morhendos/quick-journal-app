'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';

export function MonthlyHopesList() {
  const {
    getSelectedMonthData,
    addHopeItem,
    updateHopeItem,
    deleteHopeItem
  } = useMonthlyStorage();

  const currentData = getSelectedMonthData();

  return (
    <MonthlyList
      title="Hopes for Next Month"
      items={currentData.hopeItems}
      addItem={addHopeItem}
      updateItem={updateHopeItem}
      deleteItem={deleteHopeItem}
      emptyMessage="Start adding hopes for next month"
      placeholder="Enter a hope for next month..."
    />
  );
}