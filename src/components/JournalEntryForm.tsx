'use client';

import { useJournalEntry } from '@/hooks/useJournalEntry';
import { EntryDisplay } from '@/components/journal/EntryDisplay';
import { getTodayEntry } from '@/lib/storage';
import { BookOpen, Sparkles, Save, X, Edit } from 'lucide-react';
import { useJournalStore } from '@/hooks/useJournalStore';
import { useEffect } from 'react';

export function JournalEntryForm() {
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

  // Subscribe to journal entries updates
  const entries = useJournalStore(state => state.entries);

  // Update form when entries change (e.g., after import)
  useEffect(() => {
    const todayEntry = getTodayEntry();
    if (todayEntry) {
      setLearning(todayEntry.learning);
      setEnjoyment(todayEntry.enjoyment);
      setSubmitted(true);
    }
  }, [entries, setLearning, setEnjoyment, setSubmitted]);

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
          value={learning}
          onChange={(e) => setLearning(e.target.value)}
          required
          placeholder="Share something new you learned today..."
          className="w-full min-h-[120px] p-4 rounded-md bg-paper border border-accent/20
            focus:ring-1 focus:ring-accent/30 focus:border-accent/30
            placeholder:text-muted/40 journal-text text-ink/90
            transition-all duration-200 resize-none"
        />
      </div>
      
      <div className="space-y-3">
        <label className="block text-sm font-medium text-ink/90 journal-text flex items-center gap-2.5 transition-colors">
          <Sparkles size={18} className="text-accent" strokeWidth={1.5} />
          <span>What brought you joy today?</span>
        </label>
        <textarea
          value={enjoyment}
          onChange={(e) => setEnjoyment(e.target.value)}
          required
          placeholder="Share something that made you happy..."
          className="w-full min-h-[120px] p-4 rounded-md bg-paper border border-accent/20
            focus:ring-1 focus:ring-accent/30 focus:border-accent/30
            placeholder:text-muted/40 journal-text text-ink/90
            transition-all duration-200 resize-none"
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