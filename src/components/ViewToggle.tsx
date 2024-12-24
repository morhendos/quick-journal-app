import { LayoutList, Group } from 'lucide-react';

type ViewToggleProps = {
  view: 'chronological' | 'weekly';
  onViewChange: (view: 'chronological' | 'weekly') => void;
};

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex gap-2 mb-4 justify-end">
      <button
        onClick={() => onViewChange('chronological')}
        className={`p-2 rounded-md transition-all duration-200 ${view === 'chronological' ? 'bg-accent/10 text-accent' : 'text-muted hover:text-ink'}`}
        title="Chronological View"
      >
        <LayoutList size={20} strokeWidth={1.5} />
      </button>
      <button
        onClick={() => onViewChange('weekly')}
        className={`p-2 rounded-md transition-all duration-200 ${view === 'weekly' ? 'bg-accent/10 text-accent' : 'text-muted hover:text-ink'}`}
        title="Weekly Grouped View"
      >
        <Group size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
}
