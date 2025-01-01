import { JournalEntry, JournalEntryFormData } from '@/types/journal';
import { useLocalStorage } from '@/hooks/useLocalStorage';

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

// Monthly items storage
export function useMonthlyStorage() {
  const [workItems, setWorkItems] = useLocalStorage('monthlyWorkItems', []);
  const [projectItems, setProjectItems] = useLocalStorage('monthlyProjectItems', []);
  const [learningItems, setLearningItems] = useLocalStorage('monthlyLearningItems', []);

  const addWorkItem = (text: string) => {
    const newItem = {
      id: Date.now().toString(),
      text,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setWorkItems(current => [newItem, ...current]);
    return newItem;
  };

  const addProjectItem = (text: string) => {
    const newItem = {
      id: Date.now().toString(),
      text,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProjectItems(current => [newItem, ...current]);
    return newItem;
  };

  const addLearningItem = (text: string) => {
    const newItem = {
      id: Date.now().toString(),
      text,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setLearningItems(current => [newItem, ...current]);
    return newItem;
  };

  const updateWorkItem = (id: string, text: string) => {
    setWorkItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, text, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const updateProjectItem = (id: string, text: string) => {
    setProjectItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, text, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const updateLearningItem = (id: string, text: string) => {
    setLearningItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, text, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const deleteWorkItem = (id: string) => {
    setWorkItems(items => items.filter(item => item.id !== id));
  };

  const deleteProjectItem = (id: string) => {
    setProjectItems(items => items.filter(item => item.id !== id));
  };

  const deleteLearningItem = (id: string) => {
    setLearningItems(items => items.filter(item => item.id !== id));
  };

  return {
    workItems,
    projectItems,
    learningItems,
    addWorkItem,
    addProjectItem,
    addLearningItem,
    updateWorkItem,
    updateProjectItem,
    updateLearningItem,
    deleteWorkItem,
    deleteProjectItem,
    deleteLearningItem
  };
}