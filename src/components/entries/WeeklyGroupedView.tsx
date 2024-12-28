import { JournalEntry } from '@/types/journal';
import { groupEntriesByWeek } from '@/utils/dates';

interface WeeklyGroupedViewProps {
  entries: JournalEntry[];
}

interface GroupedEntry {
  content: string;
  date: string;
}

interface GroupedByType {
  enjoyments: GroupedEntry[];
  learnings: GroupedEntry[];
}

function groupEntriesByType(entries: JournalEntry[]): GroupedByType {
  return entries.reduce((acc: GroupedByType, entry) => {
    return {
      enjoyments: [...acc.enjoyments, { content: entry.enjoyment, date: entry.date }],
      learnings: [...acc.learnings, { content: entry.learning, date: entry.date }]
    };
  }, { enjoyments: [], learnings: [] });
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

export function WeeklyGroupedView({ entries }: WeeklyGroupedViewProps) {
  const groupedEntries = groupEntriesByWeek(entries);

  return (
    <div className="space-y-12">
      {Object.entries(groupedEntries)
        .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
        .map(([weekStart, weekEntries]) => {
          const { enjoyments, learnings } = groupEntriesByType(weekEntries);
          
          return (
            <div key={weekStart} className="space-y-8">
              {/* Enjoyments section */}
              <div className="pl-4 border-l-2 border-accent/10">
                <h3 className="text-lg font-medium mb-4 text-ink/90">Enjoyments:</h3>
                <div className="space-y-2">
                  {enjoyments.map((entry, index) => (
                    <div 
                      key={index}
                      className="text-ink/80 flex gap-3"
                    >
                      <span className="text-ink/50 text-sm min-w-[60px]">{formatDate(entry.date)}</span>
                      <span>{entry.content}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learnings section */}
              <div className="pl-4 border-l-2 border-accent/10">
                <h3 className="text-lg font-medium mb-4 text-ink/90">Learnings:</h3>
                <div className="space-y-2">
                  {learnings.map((entry, index) => (
                    <div 
                      key={index}
                      className="text-ink/80 flex gap-3"
                    >
                      <span className="text-ink/50 text-sm min-w-[60px]">{formatDate(entry.date)}</span>
                      <span>{entry.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}