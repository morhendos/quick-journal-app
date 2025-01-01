'use client';

import { useJournalEntry } from '@/hooks/useJournalEntry';
import { EntryDisplay } from '@/components/entries/EntryDisplay';
import { useJournalStorage } from '@/lib/storage';
import { BookOpen, Sparkles, Save, X, Edit } from 'lucide-react';
import { useState, useEffect, useRef, ChangeEvent } from 'react';

export function JournalEntryForm() {
  const [mounted, setMounted] = useState(false);
  const {
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
  } = useJournalEntry();

  const { getTodayEntry } = useJournalStorage();
  const learningRef = useRef<HTMLTextAreaElement>(null);
  const enjoymentRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = '42px'; // Reset to initial line height
    const scrollHeight = textarea.scrollHeight;
    if (scrollHeight > 42) { // Only expand if content exceeds one line
      textarea.style.height = `${scrollHeight}px`;
    }
  };

  const handleTextareaChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    setter: (value: string) => void
  ) => {
    setter(e.target.value);
    adjustHeight(e.target);
  };

  useEffect(() => {
    setMounted(true);
    // Initialize textarea heights
    if (learningRef.current) adjustHeight(learningRef.current);
    if (enjoymentRef.current) adjustHeight(enjoymentRef.current);
  }, []);

  if (!mounted) return null;

  if (submitted && !isEditing) {
    const todayEntry = getTodayEntry();
    if (!todayEntry) return null;
    return <EntryDisplay entry={todayEntry} isToday onEdit={handleEdit} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-ink/90 journal-text flex items-center gap-2.5 transition-colors">
          <BookOpen size={18} className="text-accent" strokeWidth={1.5} />
          <span>What did you learn today?</span>
        </label>
        <textarea
          ref={learningRef}
          value={learning}
          onChange={(e) => handleTextareaChange(e, setLearning)}
          required
          placeholder="Share something new you learned today..."
          className="w-full p-3 rounded-md bg-paper
            border border-accent/20 
            focus:outline-none focus:border-accent/40
            placeholder:text-muted/40 journal-text text-ink/90
            transition-colors duration-200 resize-none
            min-h-[42px] overflow-hidden"
        />
      </div>
      
      <div className="space-y-3">
        <label className="block text-sm font-medium text-ink/90 journal-text flex items-center gap-2.5 transition-colors">
          <Sparkles size={18} className="text-accent" strokeWidth={1.5} />
          <span>What brought you joy today?</span>
        </label>
        <textarea
          ref={enjoymentRef}
          value={enjoyment}
          onChange={(e) => handleTextareaChange(e, setEnjoyment)}
          required
          placeholder="Share something that made you happy..."
          className="w-full p-3 rounded-md bg-paper
            border border-accent/20 
            focus:outline-none focus:border-accent/40
            placeholder:text-muted/40 journal-text text-ink/90
            transition-colors duration-200 resize-none
            min-h-[42px] overflow-hidden"
        />
      </div>

      <div className="flex gap-4 pt-2">
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-background text-ink/70 hover:text-ink
              py-3 px-6 rounded-md transition-all duration-200 
              flex items-center justify-center gap-2 group journal-text journal-button"
          >
            <X size={18} className="group-hover:scale-105 transition-transform" strokeWidth={1.5} />
            <span>Cancel</span>
          </button>
        )}
        <button 
          type="submit"
          className="flex-1 bg-accent/10 text-accent hover:bg-accent/15
            py-3 px-6 rounded-md transition-all duration-200
            flex items-center justify-center gap-2 group journal-text journal-button"
        >
          {isEditing ? (
            <>
              <Save size={18} className="group-hover:scale-105 transition-transform" strokeWidth={1.5} />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Edit size={18} className="group-hover:scale-105 transition-transform" strokeWidth={1.5} />
              <span>Save Entry</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}