'use client';

import { AddItemButton } from '@/components/common/AddItemButton';
import { MonthlyEntryList } from './MonthlyEntryList';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';

export function MonthlyLifeEventsList() {
  const { items: lifeEvents, addItem, removeItem } = useMonthlyStorage('lifeEvents');

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-medium text-ink/90">Other big life events (some of them unexpected)</h2>
        <AddItemButton onClick={addItem} />
      </div>
      <MonthlyEntryList items={lifeEvents} onRemoveItem={removeItem} />
    </div>
  );
}