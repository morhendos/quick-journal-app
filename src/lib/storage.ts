import { JournalEntry } from '@/types';

const isClient = typeof window !== 'undefined';

export const saveEntry = (entry: Omit<JournalEntry, 'id'>) => {
  if (!isClient) return;

  const entries = getEntries();
  const today = new Date().toISOString().split('T')[0];
  const existingEntryIndex = entries.findIndex(e => e.date === today);

  if (existingEntryIndex !== -1) {
    // Update existing entry
    const updatedEntries = [...entries];
    updatedEntries[existingEntryIndex] = {
      ...entries[existingEntryIndex],
      ...entry
    };
    window.localStorage.setItem('journal_entries', JSON.stringify(updatedEntries));
    return updatedEntries[existingEntryIndex];
  } else {
    // Create new entry
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    window.localStorage.setItem('journal_entries', JSON.stringify([...entries, newEntry]));
    return newEntry;
  }
};

export const getEntries = (): JournalEntry[] => {
  if (!isClient) return [];

  const entries = window.localStorage.getItem('journal_entries');
  return entries ? JSON.parse(entries) : [];
};

export const getTodayEntry = (): JournalEntry | undefined => {
  if (!isClient) return undefined;

  const today = new Date().toISOString().split('T')[0];
  const entries = getEntries();
  return entries.find(entry => entry.date === today);
};

export const hasEntryForToday = (): boolean => {
  return !!getTodayEntry();
};
