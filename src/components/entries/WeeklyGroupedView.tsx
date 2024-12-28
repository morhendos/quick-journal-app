import { JournalEntry } from '@/types/journal';
import { groupEntriesByWeek } from '@/utils/dates';
import { EntryDisplay } from './EntryDisplay';

interface WeeklyGroupedViewProps {
  entries: JournalEntry[];
}

interface GroupedByType {
  enjoyments: string[];
  learnings: string[];
  dates: string[];
}

function groupEntriesByType(entries: JournalEntry[]): GroupedByType {
  return entries.reduce((acc: GroupedByType, entry) => {
    return {
      enjoyments: [...acc.enjoyments, entry.enjoyment],
      learnings: [...acc.learnings, entry.learning],
      dates: [...acc.dates, entry.date]
    };
  }, { enjoyments: [], learnings: [], dates: [] });
}

export function WeeklyGroupedView({ entries }: WeeklyGroupedViewProps) {
  const groupedEntries = groupEntriesByWeek(entries);

  return (
    <div className="space-y-12">
      {Object.entries(groupedEntries)
        .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
        .map(([weekStart, weekEntries]) => {
          const { enjoyments, learnings, dates } = groupEntriesByType(weekEntries);
          
          return (
            <div key={weekStart} className="space-y-8">
              {/* Enjoyments section */}
              <div className="pl-4 border-l-2 border-accent/10">
                <h3 className="text-lg font-medium mb-4 text-ink/90">Enjoyments:</h3>
                <div className="space-y-2">
                  {enjoyments.map((enjoyment, index) => (
                    <div 
                      key={index}
                      className="text-ink/80"
                    >
                      {enjoyment}
                    </div>
                  ))}
                </div>
              </div>

              {/* Learnings section */}
              <div className="pl-4 border-l-2 border-accent/10">
                <h3 className="text-lg font-medium mb-4 text-ink/90">Learnings:</h3>
                <div className="space-y-2">
                  {learnings.map((learning, index) => (
                    <div 
                      key={index}
                      className="text-ink/80"
                    >
                      {learning}
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