'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';
import { SectionKey, StorageKeyMap, MonthlyData, BaseItem, MonthlyStorageMethods } from '@/types/monthly';
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

  // Helper to get the method name
  type ActionType = 'add' | 'update' | 'delete';
  const getMethodName = (action: ActionType) => 
    `${action}${capitalizedKey}Item` as keyof MonthlyStorageMethods;

  return (
    <MonthlyList
      title={section.title}
      items={currentData[itemsKey]}
      addItem={monthlyStorage[getMethodName('add')] as (text: string) => BaseItem}
      updateItem={monthlyStorage[getMethodName('update')] as (id: string, text: string) => void}
      deleteItem={monthlyStorage[getMethodName('delete')] as (id: string) => void}
      emptyMessage={section.emptyMessage}
      placeholder={section.placeholder}
    />
  );
}