import { JournalEntry } from '@/types';

export const saveEntry = (entry: Omit<JournalEntry, 'id'>) => {
  const entries = getEntries();
  const newEntry = {
    ...entry,
    id: Date.now().toString(),
  };
  
  localStorage.setItem('journal_entries', JSON.stringify([...entries, newEntry]));
  return newEntry;
};

export const getEntries = (): JournalEntry[] => {
  const entries = localStorage.getItem('journal_entries');
  return entries ? JSON.parse(entries) : [];
};

export const hasEntryForToday = (): boolean => {
  const today = new Date().toISOString().split('T')[0];
  const entries = getEntries();
  return entries.some(entry => entry.date === today);
};
