'use client';

import { AddItemButton } from '@/components/common/AddItemButton';
import { MonthlyEntryList } from './MonthlyEntryList';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';

export function MonthlyHealthList() {
  const { items: healthItems, addItem, removeItem } = useMonthlyStorage('health');

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-medium text-ink/90">Health and fitness challenges I've been doing</h2>
        <AddItemButton onClick={addItem} />
      </div>
      <MonthlyEntryList items={healthItems} onRemoveItem={removeItem} />
    </div>
  );
}