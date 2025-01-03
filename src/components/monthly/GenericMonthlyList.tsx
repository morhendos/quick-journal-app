'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';
import { SectionKey } from '@/types/monthly';
import { MONTHLY_SECTIONS } from '@/config/monthlyReview';

interface GenericMonthlyListProps {
  sectionKey: SectionKey;
}

export function GenericMonthlyList({ sectionKey }: GenericMonthlyListProps) {
  const monthlyStorage = useMonthlyStorage();
  const currentData = monthlyStorage.getSelectedMonthData();
  
  const section = MONTHLY_SECTIONS.find(s => s.key === sectionKey);
  if (!section) return null;

  const itemsKey = `${sectionKey}Items` as const;

  // Get the appropriate action methods based on section key
  const actions = {
    add: monthlyStorage[`add${section.key.charAt(0).toUpperCase() + section.key.slice(1)}Item`],
    update: monthlyStorage[`update${section.key.charAt(0).toUpperCase() + section.key.slice(1)}Item`],
    delete: monthlyStorage[`delete${section.key.charAt(0).toUpperCase() + section.key.slice(1)}Item`]
  };

  return (
    <MonthlyList
      title={section.title}
      items={currentData[itemsKey]}
      addItem={actions.add}
      updateItem={actions.update}
      deleteItem={actions.delete}
      emptyMessage={section.emptyMessage}
      placeholder={section.placeholder}
    />
  );
}