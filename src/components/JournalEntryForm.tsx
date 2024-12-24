'use client';

import { useJournalEntry } from '@/hooks/useJournalEntry';
import { EntryDisplay } from '@/components/journal/EntryDisplay';
import { getTodayEntry } from '@/lib/storage';

export function JournalEntryForm() {
  const {
    learning,
    setLearning,
    enjoyment,
    setEnjoyment,
    submitted,
    isEditing,
    handleSubmit,
    handleEdit,
    handleCancel
  } = useJournalEntry();

  if (submitted && !isEditing) {
    const todayEntry = getTodayEntry();
    if (!todayEntry) return null;

    return <EntryDisplay entry={todayEntry} isToday onEdit={handleEdit} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-ink/80 journal-text flex items-center gap-2 transition-colors">
          <span>💡</span> What did you learn today?
        </label>
        <textarea
          value={learning}
          onChange={(e) => setLearning(e.target.value)}
          required
          placeholder="Share something new you learned today..."
          className="w-full min-h-[120px] p-4 rounded-md bg-paper border border-accent/20
            focus:ring-1 focus:ring-accent/30 focus:border-accent/30
            placeholder:text-muted/50 journal-text text-ink/90
            transition-all duration-200"
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-ink/80 journal-text flex items-center gap-2 transition-colors">
          <span>✨</span> What brought you joy today?
        </label>
        <textarea
          value={enjoyment}
          onChange={(e) => setEnjoyment(e.target.value)}
          required
          placeholder="Share something that made you happy..."
          className="w-full min-h-[120px] p-4 rounded-md bg-paper border border-accent/20
            focus:ring-1 focus:ring-accent/30 focus:border-accent/30
            placeholder:text-muted/50 journal-text text-ink/90
            transition-all duration-200"
        />
      </div>

      <div className="flex gap-4 pt-2">
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-background text-ink/70 hover:text-ink
              py-3 px-6 rounded-md transition-all duration-200
              flex items-center justify-center gap-2 group journal-text"
          >
            <span className="group-hover:scale-105 transition-transform">❌</span>
            Cancel
          </button>
        )}
        <button 
          type="submit"
          className="flex-1 bg-accent/10 text-accent hover:bg-accent/20
            py-3 px-6 rounded-md transition-all duration-200
            flex items-center justify-center gap-2 group journal-text"
        >
          <span className="group-hover:scale-105 transition-transform">
            {isEditing ? '✨' : '📝'}
          </span>
          {isEditing ? 'Save Changes' : 'Save Entry'}
        </button>
      </div>
    </form>
  );
}
