'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';
import { MONTHLY_SECTIONS } from '@/config/monthlyReview';

export function MonthlyWorkList() {
  const {
    getSelectedMonthData,
    addWorkItem,
    updateWorkItem,
    deleteWorkItem
  } = useMonthlyStorage();

  const currentData = getSelectedMonthData();
  const config = MONTHLY_SECTIONS.find(section => section.key === 'work')!;

  return (
    <MonthlyList
      title={config.title}
      items={currentData.workItems}
      addItem={addWorkItem}
      updateItem={updateWorkItem}
      deleteItem={deleteWorkItem}
      emptyMessage={config.emptyMessage}
      placeholder={config.placeholder}
    />
  );
}