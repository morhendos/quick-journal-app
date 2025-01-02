import { JournalEntry, JournalEntryFormData } from '@/types/journal';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { BaseItem } from '@/types/monthly';

const STORAGE_KEY = 'journal_entries';

// Interface for the new JSON format
interface ImportFormat {
  version: string;
  timestamp: string;
  entries: JournalEntry[];
}

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

  const deleteEntry = (id: string) => {
    setEntries(currentEntries => currentEntries.filter(entry => entry.id !== id));
  };

  const getTodayEntry = (): JournalEntry | undefined => {
    const today = new Date().toISOString().split('T')[0];
    return entries.find(entry => entry.date === today);
  };

  const getEntryByDate = (date: string): JournalEntry | undefined => {
    return entries.find(entry => entry.date === date);
  };

  const hasEntryForToday = (): boolean => {
    return !!getTodayEntry();
  };

  return {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    getTodayEntry,
    getEntryByDate,
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
export function importEntries(data: ImportFormat | JournalEntry[]) {
  try {
    // Handle both new format and old format
    const entries = Array.isArray(data) ? data : data.entries;
    
    // Validate entries format
    if (!Array.isArray(entries)) throw new Error('Invalid format');
    
    // Validate each entry has required fields
    const isValidEntry = (entry: any): entry is JournalEntry => {
      return typeof entry === 'object' 
        && typeof entry.date === 'string'
        && typeof entry.learning === 'string'
        && typeof entry.enjoyment === 'string';
    };

    if (!entries.every(isValidEntry)) {
      throw new Error('Invalid entry format');
    }
    
    // Add IDs if missing
    const validEntries = entries.map(entry => ({
      ...entry,
      id: entry.id || Date.now().toString()
    }));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(validEntries));
    
    // Trigger storage event for other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEY,
      newValue: JSON.stringify(validEntries)
    }));

    return validEntries;
  } catch (error) {
    console.error('Error importing entries:', error);
    throw error;
  }
}
