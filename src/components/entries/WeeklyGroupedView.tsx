import { JournalEntry } from '@/types/journal';
import { groupEntriesByWeek } from '@/utils/dates';
import { EntryDisplay } from './EntryDisplay';

interface WeeklyGroupedViewProps {
  entries: JournalEntry[];
}

export function WeeklyGroupedView({ entries }: WeeklyGroupedViewProps) {
  const groupedEntries = groupEntriesByWeek(entries);

  return (
    <div className="space-y-8">
      {Object.entries(groupedEntries)
        .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
        .map(([weekStart, weekEntries]) => (
          <div key={weekStart} className="space-y-4">
            <div className="space-y-6 pl-4 border-l-2 border-accent/10">
              {weekEntries
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((entry, index) => (
                  <div
                    key={entry.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    className="animate-slide-in"
                  >
                    <EntryDisplay entry={entry} />
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}