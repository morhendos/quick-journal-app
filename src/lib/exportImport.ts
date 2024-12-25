import { JournalEntry } from '../types/journal';

export const JOURNAL_STORAGE_KEY = 'journal_entries';

interface ExportData {
  version: string;
  timestamp: string;
  entries: JournalEntry[];
}

type ValidationError = 'INVALID_JSON' | 'INVALID_FORMAT' | 'INVALID_ENTRIES';

class JournalImportError extends Error {
  constructor(type: ValidationError) {
    const messages = {
      INVALID_JSON: 'The file contains invalid JSON data',
      INVALID_FORMAT: 'The file format is not recognized',
      INVALID_ENTRIES: 'The journal entries are not in the correct format'
    };
    super(messages[type]);
    this.name = 'JournalImportError';
  }
}

/**
 * Type guard to check if an object is a valid JournalEntry
 */
function isValidJournalEntry(entry: unknown): entry is JournalEntry {
  return (
    typeof entry === 'object' &&
    entry !== null &&
    typeof (entry as JournalEntry).id === 'string' &&
    typeof (entry as JournalEntry).date === 'string' &&
    typeof (entry as JournalEntry).learning === 'string' &&
    typeof (entry as JournalEntry).enjoyment === 'string' &&
    // Validate date format (YYYY-MM-DD)
    /^\d{4}-\d{2}-\d{2}$/.test((entry as JournalEntry).date)
  );
}

/**
 * Creates a download link and triggers the download
 */
function triggerDownload(data: string, filename: string) {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports journal entries to a JSON file
 * @throws Error if export fails
 */
export const exportJournalEntries = (): void => {
  try {
    const entriesJson = localStorage.getItem(JOURNAL_STORAGE_KEY);
    const entries: JournalEntry[] = entriesJson ? JSON.parse(entriesJson) : [];

    const exportData: ExportData = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      entries
    };

    const filename = `journal_export_${new Date().toISOString().split('T')[0]}.json`;
    triggerDownload(JSON.stringify(exportData, null, 2), filename);
  } catch (error) {
    console.error('Error exporting journal entries:', error);
    throw new Error('Failed to export journal entries');
  }
};

/**
 * Imports journal entries from a JSON file
 * @throws JournalImportError for validation errors
 * @throws Error for other errors
 */
export const importJournalEntries = async (file: File): Promise<JournalEntry[]> => {
  try {
    const text = await file.text();
    let importData: ExportData;

    try {
      importData = JSON.parse(text);
    } catch {
      throw new JournalImportError('INVALID_JSON');
    }

    // Handle direct array format (legacy support)
    if (Array.isArray(importData)) {
      importData = {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        entries: importData
      };
    }

    // Validate structure
    if (!importData || typeof importData !== 'object' || !Array.isArray(importData.entries)) {
      throw new JournalImportError('INVALID_FORMAT');
    }

    // Validate entries
    if (!importData.entries.every(isValidJournalEntry)) {
      throw new JournalImportError('INVALID_ENTRIES');
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
    throw error;
  }
};
