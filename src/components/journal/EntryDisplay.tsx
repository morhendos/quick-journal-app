import { JournalEntryDisplayProps } from '@/types/journal';
import { BookOpen, Sparkles, Edit } from 'lucide-react';

export function EntryDisplay({ entry, isToday, onEdit }: JournalEntryDisplayProps) {
  return (
    <div className={`
      paper-texture bg-paper rounded-lg p-6 transition-all duration-200
      ${isToday ? 'journal-shadow' : 'border border-accent/20 hover:journal-shadow'}
    `}>
      <EntryHeader date={entry.date} isToday={isToday} />
      
      <div className="space-y-6 my-6">
        <Section 
          title="Learning" 
          icon={<BookOpen size={18} className="text-accent" strokeWidth={1.5} />} 
          content={entry.learning} 
        />
        <Section 
          title="Joy" 
          icon={<Sparkles size={18} className="text-accent" strokeWidth={1.5} />} 
          content={entry.enjoyment} 
        />
      </div>

      {isToday && onEdit && (
        <button
          onClick={onEdit}
          className="w-full bg-accent/10 text-accent hover:bg-accent/15
            py-3 px-6 rounded-md transition-all duration-200
            flex items-center justify-center gap-2 group journal-text journal-button"
        >
          <Edit size={18} className="group-hover:scale-105 transition-transform" strokeWidth={1.5} />
          <span>Edit Entry</span>
        </button>
      )}
    </div>
  );
}

function EntryHeader({ date, isToday }: { date: string; isToday?: boolean }) {
  if (isToday) {
    return (
      <div className="text-center mb-6">
        <h3 className="journal-heading text-xl font-semibold text-ink mb-1 transition-colors">
          Today's Page
        </h3>
        <p className="text-muted text-sm journal-text transition-colors">
          {new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}
        </p>
      </div>
    );
  }

  return (
    <time className="block text-center text-muted text-sm mb-6 journal-text transition-colors">
      {new Date(date).toLocaleDateString('en-US', { dateStyle: 'full' })}
    </time>
  );
}

function Section({ title, icon, content }: { title: string; icon: React.ReactNode; content: string }) {
  return (
    <div className="space-y-2">
      <h4 className="flex items-center gap-2.5 text-sm font-medium text-ink/90 journal-text transition-colors">
        {icon}
        {title}
      </h4>
      <p className="text-ink/90 whitespace-pre-wrap pl-7 journal-text leading-relaxed transition-colors">
        {content}
      </p>
    </div>
  );
}