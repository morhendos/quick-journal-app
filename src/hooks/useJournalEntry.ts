import { useState, useEffect } from 'react';
import { useJournalStorage } from '@/lib/storage';

export function useJournalEntry(selectedDate: string) {
  const { addEntry, updateEntry, getEntryByDate } = useJournalStorage();
  
  const entry = getEntryByDate(selectedDate);
  const [learning, setLearning] = useState(entry?.learning || '');
  const [enjoyment, setEnjoyment] = useState(entry?.enjoyment || '');
  const [submitted, setSubmitted] = useState(!!entry);
  const [isEditing, setIsEditing] = useState(false);

  // Update form when selected date changes
  useEffect(() => {
    const entry = getEntryByDate(selectedDate);
    setLearning(entry?.learning || '');
    setEnjoyment(entry?.enjoyment || '');
    setSubmitted(!!entry);
    setIsEditing(false);
  }, [selectedDate, getEntryByDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entryData = { date: selectedDate, learning, enjoyment };

    if (isEditing && entry) {
      updateEntry(entry.id, entryData);
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
    if (entry) {
      setLearning(entry.learning);
      setEnjoyment(entry.enjoyment);
    } else {
      setLearning('');
      setEnjoyment('');
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