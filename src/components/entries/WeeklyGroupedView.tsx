import { JournalEntry } from '@/types/journal';
import { groupEntriesByWeek, formatShortDate, getWeekRange } from '@/utils/dates';

interface WeeklyGroupedViewProps {
  entries: JournalEntry[];
}

interface GroupedEntry {
  content: string;
  date: string;
  weekStart: string;
}

interface GroupedByType {
  enjoyments: GroupedEntry[];
  learnings: GroupedEntry[];
}

function groupEntriesByType(entries: JournalEntry[], weekStart: string): GroupedByType {
  return entries.reduce((acc: GroupedByType, entry) => {
    return {
      enjoyments: [...acc.enjoyments, { content: entry.enjoyment, date: entry.date, weekStart }],
      learnings: [...acc.learnings, { content: entry.learning, date: entry.date, weekStart }]
    };
  }, { enjoyments: [], learnings: [] });
}

export function WeeklyGroupedView({ entries }: WeeklyGroupedViewProps) {
  const groupedEntries = groupEntriesByWeek(entries);

  return (
    <div className="space-y-12">
      {Object.entries(groupedEntries)
        .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()) // Sort weeks newest first
        .map(([weekStart, weekEntries]) => {
          const { enjoyments, learnings } = groupEntriesByType(weekEntries, weekStart);
          
          // Sort entries within each section by date (newest first)
          const sortedEnjoyments = enjoyments
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          const sortedLearnings = learnings
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          
          return (
            <div key={weekStart} className="space-y-8">
              <h2 className="text-lg font-semibold text-ink/90">
                Week of {getWeekRange(weekStart)}
              </h2>
              
              {/* Enjoyments section */}
              <div className="pl-4 border-l-2 border-accent/10 space-y-4">
                <h3 className="text-base font-medium text-ink/90">Enjoyments:</h3>
                <div className="space-y-2">
                  {sortedEnjoyments.map((entry, index) => (
                    <div 
                      key={`${entry.date}-${index}`}
                      className="text-ink/80 flex gap-3 group items-start"
                    >
                      <span className="text-ink/50 text-sm min-w-[60px] pt-0.5">
                        {formatShortDate(entry.date)}
                      </span>
                      <span className="flex-1 group-hover:text-ink/90 transition-colors">
                        {entry.content}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learnings section */}
              <div className="pl-4 border-l-2 border-accent/10 space-y-4">
                <h3 className="text-base font-medium text-ink/90">Learnings:</h3>
                <div className="space-y-2">
                  {sortedLearnings.map((entry, index) => (
                    <div 
                      key={`${entry.date}-${index}`}
                      className="text-ink/80 flex gap-3 group items-start"
                    >
                      <span className="text-ink/50 text-sm min-w-[60px] pt-0.5">
                        {formatShortDate(entry.date)}
                      </span>
                      <span className="flex-1 group-hover:text-ink/90 transition-colors">
                        {entry.content}
                      </span>
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