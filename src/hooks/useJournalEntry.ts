import { useState, useEffect } from 'react';
import { useJournalStorage } from '@/lib/storage';

export function useJournalEntry(selectedDate: string) {
  const { addEntry, updateEntry, getEntryByDate } = useJournalStorage();
  
  const entry = getEntryByDate(selectedDate);
  const [learning, setLearning] = useState(entry?.learning || '');
  const [enjoyment, setEnjoyment] = useState(entry?.enjoyment || '');
  const [submitted, setSubmitted] = useState(!!entry);
  const [isEditing, setIsEditing] = useState(false);

  // Reset form when date changes
  useEffect(() => {
    const currentEntry = getEntryByDate(selectedDate);
    setLearning(currentEntry?.learning || '');
    setEnjoyment(currentEntry?.enjoyment || '');
    setSubmitted(!!currentEntry);
    setIsEditing(false);
  }, [selectedDate, getEntryByDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entryData = { date: selectedDate, learning, enjoyment };

    if (entry) {
      // If entry exists, update it
      updateEntry(entry.id, entryData);
    } else {
      // If no entry exists, create new one
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
    if (entry) {
      setLearning(entry.learning);
      setEnjoyment(entry.enjoyment);
      setIsEditing(false);
      setSubmitted(true);
    } else {
      setLearning('');
      setEnjoyment('');
      setSubmitted(false);
    }
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
    entry // Add this to expose the current entry
  };
}