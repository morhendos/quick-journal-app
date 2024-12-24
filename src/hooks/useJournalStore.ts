'use client';

import { create } from 'zustand';
import { JournalEntry, JournalEntryFormData } from '@/types/journal';
import { getEntries, saveEntry } from '@/lib/storage';

type JournalStore = {
  entries: JournalEntry[];
  loadEntries: () => void;
  addOrUpdateEntry: (entryData: JournalEntryFormData) => JournalEntry;
};

export const useJournalStore = create<JournalStore>((set, get) => ({
  entries: [],
  loadEntries: () => {
    const entries = getEntries().sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    set({ entries });
  },
  addOrUpdateEntry: (entryData) => {
    const entry = saveEntry(entryData);
    if (entry) {
      const currentEntries = get().entries;
      const index = currentEntries.findIndex(e => e.date === entry.date);
      
      const updatedEntries = index >= 0
        ? currentEntries.map(e => e.date === entry.date ? entry : e)
        : [entry, ...currentEntries];

      set({ entries: updatedEntries });
      return entry;
    }
    return entry!; // TypeScript appeasement, we know it exists
  },
}));