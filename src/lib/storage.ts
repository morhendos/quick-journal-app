import { JournalEntry, JournalEntryFormData } from '@/types/journal';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const STORAGE_KEY = 'journal_entries';

export function useJournalStorage() {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>(STORAGE_KEY, []);

  const addEntry = (entry: JournalEntryFormData): JournalEntry => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString()
    };

    setEntries(currentEntries => [...currentEntries, newEntry]);
    return newEntry;
  };

  const updateEntry = (id: string, updatedEntry: Partial<JournalEntry>) => {
    setEntries(currentEntries =>
      currentEntries.map(entry =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      )
    );
  };

  const getTodayEntry = (): JournalEntry | undefined => {
    const today = new Date().toISOString().split('T')[0];
    return entries.find(entry => entry.date === today);
  };

  const hasEntryForToday = (): boolean => {
    return !!getTodayEntry();
  };

  return {
    entries,
    addEntry,
    updateEntry,
    getTodayEntry,
    hasEntryForToday
  };
}