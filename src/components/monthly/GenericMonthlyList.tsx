'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';
import { SectionKey, StorageMethod, StorageKeyMap, MonthlyData, BaseItem } from '@/types/monthly';
import { MONTHLY_SECTIONS } from '@/config/monthlyReview';

interface GenericMonthlyListProps {
  sectionKey: SectionKey;
}

function capitalize<T extends string>(s: T): Capitalize<T> {
  return (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<T>;
}

const getStorageKey = (sectionKey: SectionKey): StorageKeyMap[SectionKey] => {
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

  // Explicitly type each method to avoid union type inference
  const addMethod = `add${capitalizedKey}Item` as StorageMethod;
  const updateMethod = `update${capitalizedKey}Item` as StorageMethod;
  const deleteMethod = `delete${capitalizedKey}Item` as StorageMethod;

  return (
    <MonthlyList
      title={section.title}
      items={currentData[itemsKey]}
      addItem={monthlyStorage[addMethod]}
      updateItem={monthlyStorage[updateMethod]}
      deleteItem={monthlyStorage[deleteMethod]}
      emptyMessage={section.emptyMessage}
      placeholder={section.placeholder}
    />
  );
}