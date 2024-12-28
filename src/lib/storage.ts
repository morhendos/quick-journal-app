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

// Export entries as JSON file
export function downloadEntries() {
  const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const dataStr = JSON.stringify(entries, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  
  const exportName = `journal_entries_${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportName);
  linkElement.click();
}

// Import entries from JSON file
export function importEntries(entries: JournalEntry[]) {
  try {
    // Validate entries format
    if (!Array.isArray(entries)) throw new Error('Invalid format');
    
    // Add IDs if missing
    const validEntries = entries.map(entry => ({
      ...entry,
      id: entry.id || Date.now().toString()
    }));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(validEntries));
    
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error importing entries:', error);
    throw error;
  }
}