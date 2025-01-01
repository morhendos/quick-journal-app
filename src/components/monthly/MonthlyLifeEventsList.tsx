'use client';

import { MonthlyList } from './MonthlyList';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';

export function MonthlyLifeEventsList() {
  const {
    getCurrentMonthData,
    addLifeEventItem,
    updateLifeEventItem,
    deleteLifeEventItem
  } = useMonthlyStorage();

  const currentData = getCurrentMonthData();

  return (
    <MonthlyList
      title="Other big life events (some of them unexpected)"
      items={currentData.lifeEventItems}
      addItem={addLifeEventItem}
      updateItem={updateLifeEventItem}
      deleteItem={deleteLifeEventItem}
      emptyMessage="Start adding significant life events for this month"
      placeholder="Enter a life event..."
    />
  );
}