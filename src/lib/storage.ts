import { JournalEntry, JournalEntryFormData } from '@/types/journal';

/**
 * Checks if the code is running in the browser environment
 */
const isClient = typeof window !== 'undefined';

/**
 * Key used for storing journal entries in localStorage
 */
const STORAGE_KEY = 'journal_entries';

/**
 * Saves or updates a journal entry
 * If an entry exists for the given date, it will be updated
 * Otherwise, a new entry will be created
 */
export const saveEntry = (entry: JournalEntryFormData): JournalEntry | undefined => {
  if (!isClient) return;

  const entries = getEntries();
  const existingEntryIndex = entries.findIndex(e => e.date === entry.date);

  if (existingEntryIndex !== -1) {
    // Update existing entry
    const updatedEntries = [...entries];
    updatedEntries[existingEntryIndex] = {
      ...entries[existingEntryIndex],
      ...entry
    };
    persistEntries(updatedEntries);
    return updatedEntries[existingEntryIndex];
  } else {
    // Create new entry
    const newEntry: JournalEntry = {
      ...entry,
      id: generateId(),
    };
    persistEntries([...entries, newEntry]);
    return newEntry;
  }
};

/**
 * Retrieves all journal entries from localStorage
 */
export const getEntries = (): JournalEntry[] => {
  if (!isClient) return [];

  try {
    const entriesJson = window.localStorage.getItem(STORAGE_KEY);
    return entriesJson ? JSON.parse(entriesJson) : [];
  } catch (error) {
    console.error('Error retrieving entries:', error);
    return [];
  }
};

/**
 * Gets the entry for the current day if it exists
 */
export const getTodayEntry = (): JournalEntry | undefined => {
  if (!isClient) return undefined;

  const today = new Date().toISOString().split('T')[0];
  const entries = getEntries();
  return entries.find(entry => entry.date === today);
};

/**
 * Checks if an entry exists for today
 */
export const hasEntryForToday = (): boolean => {
  return !!getTodayEntry();
};

/**
 * Persists entries to localStorage
 */
function persistEntries(entries: JournalEntry[]): void {
  if (!isClient) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving entries:', error);
  }
}

/**
 * Generates a unique ID for new entries
 */
function generateId(): string {
  return Date.now().toString();
}