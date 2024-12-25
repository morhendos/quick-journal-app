'use client';

import { useState, useEffect } from 'react';
import { JournalEntryFormData } from '@/types/journal';
import { getTodayEntry, saveEntry, getEntries } from '@/lib/storage';
import { useJournalStore } from './useJournalStore';

/**
 * Custom hook for managing journal entry state and operations
 */
export function useJournalEntry() {
  const [learning, setLearning] = useState('');
  const [enjoyment, setEnjoyment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const updateEntries = useJournalStore(state => state.updateEntries);

  // Load today's entry if it exists
  useEffect(() => {
    const todayEntry = getTodayEntry();
    if (todayEntry) {
      setLearning(todayEntry.learning);
      setEnjoyment(todayEntry.enjoyment);
      setSubmitted(true);
    }
    // Initialize store with entries
    updateEntries(getEntries());
  }, [updateEntries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entryData: JournalEntryFormData = {
      date: new Date().toISOString().split('T')[0],
      learning,
      enjoyment
    };

    saveEntry(entryData);
    updateEntries(getEntries()); // Update store after saving
    setSubmitted(true);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    const todayEntry = getTodayEntry();
    if (todayEntry) {
      setLearning(todayEntry.learning);
      setEnjoyment(todayEntry.enjoyment);
    }
    setIsEditing(false);
  };

  return {
    learning,
    setLearning,
    enjoyment,
    setEnjoyment,
    submitted,
    isEditing,
    handleSubmit,
    handleEdit,
    handleCancel
  };
}