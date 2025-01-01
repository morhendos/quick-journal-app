import { useState, useEffect } from 'react';
import { useJournalStorage } from '@/lib/storage';

export function useJournalEntry(selectedDate: string) {
  const { addEntry, updateEntry, getEntryByDate } = useJournalStorage();
  
  const entry = getEntryByDate(selectedDate);
  const [learning, setLearning] = useState(entry?.learning || '');
  const [enjoyment, setEnjoyment] = useState(entry?.enjoyment || '');
  const [submitted, setSubmitted] = useState(!!entry);
  const [isEditing, setIsEditing] = useState(false);

  // Only reset content when date changes, but preserve editing state
  useEffect(() => {
    const currentEntry = getEntryByDate(selectedDate);
    if (!isEditing) {
      setLearning(currentEntry?.learning || '');
      setEnjoyment(currentEntry?.enjoyment || '');
      setSubmitted(!!currentEntry);
    }
  }, [selectedDate, getEntryByDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entryData = { date: selectedDate, learning, enjoyment };

    if (entry) {
      updateEntry(entry.id, entryData);
    } else {
      addEntry(entryData);
    }

    setSubmitted(true);
    setIsEditing(false);
  };

  const handleEdit = () => {
    const currentEntry = getEntryByDate(selectedDate);
    setLearning(currentEntry?.learning || '');
    setEnjoyment(currentEntry?.enjoyment || '');
    setIsEditing(true);
    setSubmitted(false);
  };

  const handleCancel = () => {
    const currentEntry = getEntryByDate(selectedDate);
    setLearning(currentEntry?.learning || '');
    setEnjoyment(currentEntry?.enjoyment || '');
    setIsEditing(false);
    setSubmitted(!!currentEntry);
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
    handleCancel,
    entry
  };
}