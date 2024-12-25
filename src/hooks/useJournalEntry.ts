import { useState, useEffect } from 'react';
import { JournalEntryFormData } from '@/types/journal';
import { getTodayEntry, saveEntry } from '@/lib/storage';

/**
 * Custom hook for managing journal entry state and operations
 */
export function useJournalEntry() {
  const [learning, setLearning] = useState('');
  const [enjoyment, setEnjoyment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load today's entry if it exists
  useEffect(() => {
    const todayEntry = getTodayEntry();
    if (todayEntry) {
      setLearning(todayEntry.learning);
      setEnjoyment(todayEntry.enjoyment);
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entryData: JournalEntryFormData = {
      date: new Date().toISOString().split('T')[0],
      learning,
      enjoyment
    };

    saveEntry(entryData);
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
    setSubmitted,
    isEditing,
    handleSubmit,
    handleEdit,
    handleCancel
  };
}