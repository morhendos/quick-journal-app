'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';

export function MonthlyLifeEventsList() {
  const {
    getSelectedMonthData,
    addLifeEventItem,
    updateLifeEventItem,
    deleteLifeEventItem
  } = useMonthlyStorage();

  const currentData = getSelectedMonthData();

  return (
    <MonthlyList
      title="Life Events"
      items={currentData.lifeEventItems}
      addItem={addLifeEventItem}
      updateItem={updateLifeEventItem}
      deleteItem={deleteLifeEventItem}
      emptyMessage="Start adding significant life events for this month"
      placeholder="Enter a life event..."
    />
  );
}