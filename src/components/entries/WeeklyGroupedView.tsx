import { JournalEntry } from '@/types/journal';
import { formatShortDate } from '@/utils/dates';

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

export function WeeklyGroupedView({ entries }: WeeklyGroupedViewProps) {
  // Just use the pre-filtered entries passed in from EntryList
  const { enjoyments, learnings } = groupEntriesByType(entries);
  
  // Sort by date (newest first)
  const sortedEnjoyments = enjoyments.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sortedLearnings = learnings.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <div className="space-y-12">
      {/* Enjoyments section */}
      <div className="pl-4 border-l-2 border-accent/10 space-y-4">
        <h3 className="text-lg font-medium text-ink/90">Enjoyments:</h3>
        {sortedEnjoyments.length > 0 ? (
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
        ) : (
          <div className="text-ink/50 text-sm">
            No enjoyments recorded this week
          </div>
        )}
      </div>

      {/* Learnings section */}
      <div className="pl-4 border-l-2 border-accent/10 space-y-4">
        <h3 className="text-lg font-medium text-ink/90">Learnings:</h3>
        {sortedLearnings.length > 0 ? (
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
        ) : (
          <div className="text-ink/50 text-sm">
            No learnings recorded this week
          </div>
        )}
      </div>
    </div>
  );
}