import { useState, useEffect, useRef } from 'react';
import { useJournalStorage } from '@/lib/storage';

export function useJournalEntry(selectedDate: string) {
  const { addEntry, updateEntry, getEntryByDate } = useJournalStorage();
  const lastDateRef = useRef(selectedDate);
  
  const entry = getEntryByDate(selectedDate);
  const [learning, setLearning] = useState(entry?.learning || '');
  const [enjoyment, setEnjoyment] = useState(entry?.enjoyment || '');
  const [submitted, setSubmitted] = useState(!!entry);
  const [isEditing, setIsEditing] = useState(false);

  // Only update content when date changes and we're not creating a new entry
  useEffect(() => {
    const currentEntry = getEntryByDate(selectedDate);
    const dateChanged = lastDateRef.current !== selectedDate;
    lastDateRef.current = selectedDate;

    if (dateChanged && !isEditing) {
      if (currentEntry) {
        setLearning(currentEntry.learning);
        setEnjoyment(currentEntry.enjoyment);
        setSubmitted(true);
      } else {
        setLearning('');
        setEnjoyment('');
        setSubmitted(false);
      }
    }
  }, [selectedDate, getEntryByDate, isEditing]);

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
    if (currentEntry) {
      setLearning(currentEntry.learning);
      setEnjoyment(currentEntry.enjoyment);
    }
    setIsEditing(true);
    setSubmitted(false);
  };

  const handleCancel = () => {
    const currentEntry = getEntryByDate(selectedDate);
    if (currentEntry) {
      setLearning(currentEntry.learning);
      setEnjoyment(currentEntry.enjoyment);
      setSubmitted(true);
    } else {
      setLearning('');
      setEnjoyment('');
      setSubmitted(false);
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
    handleCancel,
    entry
  };
}