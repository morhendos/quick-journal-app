'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';
import { SectionKey, StorageMethod, StorageKeyMap, MonthlyData } from '@/types/monthly';
import { MONTHLY_SECTIONS } from '@/config/monthlyReview';

interface GenericMonthlyListProps {
  sectionKey: SectionKey;
}

function capitalize<T extends string>(s: T): Capitalize<T> {
  return (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<T>;
}

const getStorageKey = (sectionKey: SectionKey): keyof MonthlyData => {
  const storageKeyMap: StorageKeyMap = {
    work: 'workItems',
    projects: 'projectItems',
    learning: 'learningItems',
    health: 'healthItems',
    lifeEvents: 'lifeEventItems',
    learningsToRemember: 'learningToRememberItems',
    hopes: 'hopeItems'
  };
  
  return storageKeyMap[sectionKey];
};

export function GenericMonthlyList({ sectionKey }: GenericMonthlyListProps) {
  const monthlyStorage = useMonthlyStorage();
  const currentData = monthlyStorage.getSelectedMonthData();
  
  const section = MONTHLY_SECTIONS.find(s => s.key === sectionKey);
  if (!section) return null;

  const itemsKey = getStorageKey(sectionKey);
  const capitalizedKey = capitalize(section.key);

  // Get the appropriate action methods based on section key
  const actions = {
    add: monthlyStorage[`add${capitalizedKey}Item` as StorageMethod],
    update: monthlyStorage[`update${capitalizedKey}Item` as StorageMethod],
    delete: monthlyStorage[`delete${capitalizedKey}Item` as StorageMethod]
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