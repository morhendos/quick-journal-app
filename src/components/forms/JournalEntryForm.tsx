'use client';

import { useJournalEntry } from '@/hooks/useJournalEntry';
import { EntryDisplay } from '@/components/entries/EntryDisplay';
import { BookOpen, Sparkles, Save, X, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AutoResizeTextarea } from '@/components/common/AutoResizeTextarea';
import { useDateContext } from '@/contexts/DateContext';
import { isToday } from '@/utils/dates';

export function JournalEntryForm() {
  const [mounted, setMounted] = useState(false);
  const { selectedDate } = useDateContext();
  
  const {
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
  } = useJournalEntry(selectedDate);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (submitted && !isEditing && entry) {
    return <EntryDisplay entry={entry} isToday={isToday(selectedDate)} onEdit={handleEdit} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-ink/90 journal-text flex items-center gap-2.5 transition-colors">
          <BookOpen size={18} className="text-accent" strokeWidth={1.5} />
          <span>
            What did you learn {isToday(selectedDate) ? 'today' : 'on this day'}?
          </span>
        </label>
        <AutoResizeTextarea
          value={learning}
          onChange={(e) => setLearning(e.target.value)}
          placeholder="Share something new you learned..."
          className="w-full"
        />
      </div>
      
      <div className="space-y-3">
        <label className="block text-sm font-medium text-ink/90 journal-text flex items-center gap-2.5 transition-colors">
          <Sparkles size={18} className="text-accent" strokeWidth={1.5} />
          <span>
            What brought you joy {isToday(selectedDate) ? 'today' : 'on this day'}?
          </span>
        </label>
        <AutoResizeTextarea
          value={enjoyment}
          onChange={(e) => setEnjoyment(e.target.value)}
          placeholder="Share something that made you happy..."
          className="w-full"
        />
      </div>

      <div className="flex gap-4 pt-2">
        {(isEditing || entry) && (
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