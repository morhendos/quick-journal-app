import { JournalEntry } from '@/types/journal';
import { BookOpen, Sparkles } from 'lucide-react';
import { useDateContext } from '@/contexts/DateContext';
import { getWeekDays } from '@/utils/dates';

type WeeklyGroupedViewProps = {
  entries: JournalEntry[];
};

export function WeeklyGroupedView({ entries }: WeeklyGroupedViewProps) {
  const { weekOffset } = useDateContext();
  
  // Get the dates for the selected week
  const weekDays = getWeekDays(weekOffset);
  // Create new Date objects to avoid mutating the original dates
  const weekStart = new Date(weekDays[0]);
  const weekEnd = new Date(weekDays[6]);
  
  // Set to start and end of day for proper comparison
  weekStart.setHours(0, 0, 0, 0);
  weekEnd.setHours(23, 59, 59, 999);
  
  // Filter entries for the selected week
  const weeklyEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= weekStart && entryDate <= weekEnd;
  });

  return (
    <div className="space-y-4 sm:space-y-8">
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
    <div className="paper-texture bg-paper rounded-lg p-3 sm:p-6 journal-shadow">
      <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-ink mb-4 sm:mb-6 journal-heading transition-colors">
        {icon}
        <span className="leading-tight">{title}</span>
      </h3>
      <div className="space-y-4 sm:space-y-6">
        {children}
      </div>
    </div>
  );
}

function EntryItem({ date, content }: { date: string; content: string }) {
  const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
  const isToday = new Date(date).toDateString() === new Date().toDateString();
  
  return (
    <div className="border-l-2 border-accent/20 pl-3 sm:pl-4 py-1">
      <time className="flex items-center gap-2 text-muted text-xs sm:text-sm mb-1.5 sm:mb-2 journal-text transition-colors">
        {dayName}
        {isToday && (
          <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs">
            Today
          </span>
        )}
      </time>
      <p className="text-ink/90 journal-text leading-relaxed text-sm sm:text-base transition-colors">
        {content}
      </p>
    </div>
  );
}