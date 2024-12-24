import { JournalEntry } from '@/types/journal';
import { BookOpen, Sparkles } from 'lucide-react';

type WeeklyGroupedViewProps = {
  entries: JournalEntry[];
};

export function WeeklyGroupedView({ entries }: WeeklyGroupedViewProps) {
  // Get entries from the last 7 days
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const weeklyEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= weekAgo && entryDate <= today;
  });

  return (
    <div className="space-y-8">
      <Section 
        title="What I Learned This Week"
        icon={<BookOpen size={20} className="text-accent" strokeWidth={1.5} />}
      >
        {weeklyEntries.map((entry) => (
          <EntryItem 
            key={entry.id}
            date={entry.date}
            content={entry.learning}
          />
        ))}
      </Section>

      <Section 
        title="What Brought Me Joy"
        icon={<Sparkles size={20} className="text-accent" strokeWidth={1.5} />}
      >
        {weeklyEntries.map((entry) => (
          <EntryItem 
            key={entry.id}
            date={entry.date}
            content={entry.enjoyment}
          />
        ))}
      </Section>
    </div>
  );
}

function Section({ 
  title, 
  icon, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
}) {
  return (
    <div className="paper-texture bg-paper rounded-lg p-6 journal-shadow">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-ink mb-6 journal-heading transition-colors">
        {icon}
        {title}
      </h3>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}

function EntryItem({ date, content }: { date: string; content: string }) {
  return (
    <div className="border-l-2 border-accent/20 pl-4 py-1">
      <time className="block text-muted text-sm mb-2 journal-text transition-colors">
        {new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}
      </time>
      <p className="text-ink/90 journal-text leading-relaxed transition-colors">
        {content}
      </p>
    </div>
  );
}
