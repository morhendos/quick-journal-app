/**
 * Represents a single journal entry in the application
 */
export type JournalEntry = {
  /** Unique identifier for the entry */
  id: string;
  /** ISO date string of when the entry was created */
  date: string;
  /** What the user learned that day */
  learning: string;
  /** What the user enjoyed that day */
  enjoyment: string;
};

/**
 * Props for journal entry form submission
 */
export type JournalEntryFormData = Omit<JournalEntry, 'id'>;

/**
 * Props for the journal entry display component
 */
export type JournalEntryDisplayProps = {
  entry: JournalEntry;
  isToday?: boolean;
  onEdit?: () => void;
};
