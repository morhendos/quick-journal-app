import { JournalEntry } from '@/types/journal';
import { groupEntriesByWeek } from '@/utils/dates';
import { EntryDisplay } from './EntryDisplay';

interface WeeklyGroupedViewProps {
  entries: JournalEntry[];
}

export function WeeklyGroupedView({ entries }: WeeklyGroupedViewProps) {
  const groupedEntries = groupEntriesByWeek(entries);

  return (
    <div className="space-y-12">
      {Object.entries(groupedEntries)
        .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
        .map(([weekStart, weekEntries], groupIndex) => (
          <div key={weekStart} className="relative">
            {/* Add week separator line except for the first week */}
            {groupIndex > 0 && (
              <div className="absolute -top-6 left-0 right-0 border-t border-accent/10" />
            )}
            <div className="pl-4 border-l-2 border-accent/10 space-y-6">
              {weekEntries
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
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