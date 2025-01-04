'use client';

import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { MonthlyList } from './MonthlyList';
import { SectionKey, StorageKeyMap, MonthlyData, BaseItem, MonthlyStorageMethods } from '@/types/monthly';
import { MONTHLY_SECTIONS } from '@/config/monthlyReview';

interface GenericMonthlyListProps {
  sectionKey: SectionKey;
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

// Map from section key to the base method name (without 'Item' suffix)
const methodBaseName: Record<SectionKey, string> = {
  work: 'Work',
  projects: 'Project',
  learning: 'Learning',
  health: 'Health',
  lifeEvents: 'LifeEvent',
  learningsToRemember: 'LearningToRemember',
  hopes: 'Hope'
};

export function GenericMonthlyList({ sectionKey }: GenericMonthlyListProps) {
  const monthlyStorage = useMonthlyStorage();
  const currentData = monthlyStorage.getSelectedMonthData();
  
  const section = MONTHLY_SECTIONS.find(s => s.key === sectionKey);
  if (!section) return null;

  const itemsKey = getStorageKey(sectionKey);
  const baseName = methodBaseName[sectionKey];

  // Helper to get the method name
  type ActionType = 'add' | 'update' | 'delete';
  const getMethodName = (action: ActionType) => 
    `${action}${baseName}Item` as keyof MonthlyStorageMethods;

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