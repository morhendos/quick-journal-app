'use client';

import { JournalEntry } from '@/types/journal';
import { create } from 'zustand';

interface JournalStore {
  entries: JournalEntry[];
  updateEntries: (entries: JournalEntry[]) => void;
}

export const useJournalStore = create<JournalStore>((set) => ({
  entries: [],
  updateEntries: (entries) => set({ entries })
}));
