import { useState } from 'react';
import { useJournalStorage } from '@/lib/storage';

export function useJournalEntry() {
  const { addEntry, updateEntry, getTodayEntry } = useJournalStorage();
  
  const todayEntry = getTodayEntry();
  const [learning, setLearning] = useState(todayEntry?.learning || '');
  const [enjoyment, setEnjoyment] = useState(todayEntry?.enjoyment || '');
  const [submitted, setSubmitted] = useState(!!todayEntry);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const today = new Date().toISOString().split('T')[0];
    const entryData = { date: today, learning, enjoyment };

    if (isEditing && todayEntry) {
      updateEntry(todayEntry.id, entryData);
    } else {
      addEntry(entryData);
    }

    setSubmitted(true);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSubmitted(false);
  };

  const handleCancel = () => {
    if (todayEntry) {
      setLearning(todayEntry.learning);
      setEnjoyment(todayEntry.enjoyment);
    }
    setIsEditing(false);
    setSubmitted(true);
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