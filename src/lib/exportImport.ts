import { JournalEntry } from '../types/journal';

export const JOURNAL_STORAGE_KEY = 'journal_entries';

interface ExportData {
  version: string;
  timestamp: string;
  entries: JournalEntry[];
}

/**
 * Exports journal entries to a JSON file
 * @returns void
 */
export const exportJournalEntries = (): void => {
  try {
    // Get entries from localStorage
    const entriesJson = localStorage.getItem(JOURNAL_STORAGE_KEY);
    const entries = entriesJson ? JSON.parse(entriesJson) : [];

    // Create export data structure
    const exportData: ExportData = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      entries
    };

    // Convert to Blob
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `journal_export_${new Date().toISOString().split('T')[0]}.json`;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting journal entries:', error);
    throw new Error('Failed to export journal entries');
  }
};

/**
 * Type guard to check if an object is a valid JournalEntry
 */
function isValidJournalEntry(entry: any): entry is JournalEntry {
  return (
    typeof entry === 'object' &&
    entry !== null &&
    typeof entry.id === 'string' &&
    typeof entry.date === 'string' &&
    typeof entry.learning === 'string' &&
    typeof entry.enjoyment === 'string' &&
    // Validate date format (YYYY-MM-DD)
    /^\d{4}-\d{2}-\d{2}$/.test(entry.date)
  );
}

/**
 * Imports journal entries from a JSON file
 * @param file File object containing journal entries
 * @returns Promise<JournalEntry[]>
 */
export const importJournalEntries = async (file: File): Promise<JournalEntry[]> => {
  try {
    const text = await file.text();
    let importData: ExportData;

    try {
      importData = JSON.parse(text);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      throw new Error('Invalid JSON format');
    }

    // Basic structure validation
    if (!importData || typeof importData !== 'object') {
      throw new Error('Invalid import file format: not an object');
    }

    // If it's a direct array of entries (old format), wrap it
    if (Array.isArray(importData)) {
      importData = {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        entries: importData
      };
    }

    // Validate structure
    if (!importData.entries || !Array.isArray(importData.entries)) {
      throw new Error('Invalid import file format: no entries array');
    }

    // Validate each entry
    const validEntries = importData.entries.every(isValidJournalEntry);
    if (!validEntries) {
      throw new Error('Invalid entry format in import file');
    }

    // Merge with existing entries
    const existingEntriesJson = localStorage.getItem(JOURNAL_STORAGE_KEY);
    const existingEntries: JournalEntry[] = existingEntriesJson ? JSON.parse(existingEntriesJson) : [];

    // Create a map of existing entries by date
    const entriesMap = new Map(existingEntries.map(entry => [entry.date, entry]));

    // Merge new entries, overwriting existing ones with the same date
    importData.entries.forEach(entry => {
      entriesMap.set(entry.date, entry);
    });

    // Convert map back to array and sort by date
    const mergedEntries = Array.from(entriesMap.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Save to localStorage
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(mergedEntries));

    return mergedEntries;
  } catch (error) {
    console.error('Error importing journal entries:', error);
    throw error instanceof Error ? error : new Error('Failed to import journal entries');
  }
};
