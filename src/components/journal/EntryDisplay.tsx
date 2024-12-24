import { JournalEntryDisplayProps } from '@/types/journal';

/**
 * Displays a single journal entry with learning and enjoyment sections
 */
export function EntryDisplay({ entry, isToday, onEdit }: JournalEntryDisplayProps) {
  const containerClasses = isToday
    ? 'bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 animate-fade-in shadow-inner'
    : 'hover-lift rounded-xl border border-gray-100 overflow-hidden animate-slide-in';

  const headerContent = isToday ? (
    <div className="text-center mb-6">
      <div className="inline-block p-3 bg-emerald-100 rounded-full mb-3">
        <span className="text-2xl">✨</span>
      </div>
      <h3 className="text-xl font-semibold text-emerald-900 mb-2">Today's Reflections</h3>
      <p className="text-emerald-700 text-sm">Your thoughts have been captured.</p>
    </div>
  ) : (
    <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
      <time className="text-sm font-medium text-gray-500">
        {new Date(entry.date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>
    </div>
  );

  return (
    <div className={containerClasses}>
      {headerContent}
      
      <div className={`space-y-4 ${isToday ? 'mb-6' : 'p-5 bg-white'}`}>
        <Section
          title="Learning"
          content={entry.learning}
          icon="💡"
          isToday={isToday}
        />
        <Section
          title="Enjoyment"
          content={entry.enjoyment}
          icon="⭐"
          isToday={isToday}
        />
      </div>

      {isToday && onEdit && (
        <button
          onClick={onEdit}
          className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 focus-ring transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <span className="group-hover:scale-105 transition-transform">✏️</span>
          Edit Entry
        </button>
      )}
    </div>
  );
}

type SectionProps = {
  title: string;
  content: string;
  icon: string;
  isToday?: boolean;
};

/**
 * Renders a section of the journal entry (either learning or enjoyment)
 */
function Section({ title, content, icon, isToday }: SectionProps) {
  const containerClass = isToday ? 'bg-white bg-opacity-50 rounded-lg p-4' : '';
  const titleClass = isToday 
    ? 'text-sm font-medium text-emerald-800 mb-2 flex items-center'
    : 'text-sm font-medium text-gray-900 flex items-center mb-2';
  const contentClass = isToday 
    ? 'text-emerald-900 whitespace-pre-wrap'
    : 'text-gray-600 whitespace-pre-wrap';

  return (
    <div className={containerClass}>
      <h4 className={titleClass}>
        <span className="mr-2">{icon}</span> {title}
      </h4>
      <p className={contentClass}>{content}</p>
    </div>
  );
}
