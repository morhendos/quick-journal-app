'use client';

import { AddItemButton } from '@/components/common/AddItemButton';
import { MonthlyEntryList } from './MonthlyEntryList';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';

export function MonthlyHopesList() {
  const { items: hopes, addItem, removeItem } = useMonthlyStorage('hopes');

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-medium text-ink/90">Hopes for the next month</h2>
        <AddItemButton onClick={addItem} />
      </div>
      <MonthlyEntryList items={hopes} onRemoveItem={removeItem} />
    </div>
  );
}