import { JournalEntry } from '@/types';

const isClient = typeof window !== 'undefined';

export const saveEntry = (entry: Omit<JournalEntry, 'id'>) => {
  if (!isClient) return;

  const entries = getEntries();
  const newEntry = {
    ...entry,
    id: Date.now().toString(),
  };
  
  window.localStorage.setItem('journal_entries', JSON.stringify([...entries, newEntry]));
  return newEntry;
};

export const getEntries = (): JournalEntry[] => {
  if (!isClient) return [];

  const entries = window.localStorage.getItem('journal_entries');
  return entries ? JSON.parse(entries) : [];
};

export const hasEntryForToday = (): boolean => {
  if (!isClient) return false;

  const today = new Date().toISOString().split('T')[0];
  const entries = getEntries();
  return entries.some(entry => entry.date === today);
};
