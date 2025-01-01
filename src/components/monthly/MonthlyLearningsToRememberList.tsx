'use client';

import { AddItemButton } from '@/components/common/AddItemButton';
import { MonthlyEntryList } from './MonthlyEntryList';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';

export function MonthlyLearningsToRememberList() {
  const { items: learningsToRemember, addItem, removeItem } = useMonthlyStorage('learningsToRemember');

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-medium text-ink/90">Things I've learned and want to remember</h2>
        <AddItemButton onClick={addItem} />
      </div>
      <MonthlyEntryList items={learningsToRemember} onRemoveItem={removeItem} />
    </div>
  );
}