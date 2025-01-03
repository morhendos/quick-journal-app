export interface JournalEntry {
  id: string;
  date: string;
  learning: string;
  enjoyment: string;
}

export type JournalEntryFormData = Omit<JournalEntry, 'id'>;

export interface JournalEntryDisplayProps {
  entry: JournalEntry;
  isToday?: boolean;
  onEdit?: () => void;
}

export interface ImportFormat {
  version: string;
  timestamp: string;
  entries: JournalEntry[];
}