export interface JournalEntry {
  id: string;
  date: string;
  learning: string;
  enjoyment: string;
}

export type JournalEntryFormData = Omit<JournalEntry, 'id'>;