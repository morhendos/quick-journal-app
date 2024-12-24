import { LayoutList, LayoutGrid } from 'lucide-react';

type ViewToggleProps = {
  view: 'chronological' | 'weekly';
  onViewChange: (view: 'chronological' | 'weekly') => void;
};

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center justify-end gap-1 mb-6">
      <span className="text-sm text-muted mr-2">View:</span>
      <div className="bg-accent/5 rounded-lg p-1 flex gap-1">
        <button
          onClick={() => onViewChange('weekly')}
          className={`
            px-3 py-1.5 rounded flex items-center gap-2 transition-all duration-200
            ${view === 'weekly' 
              ? 'bg-paper text-ink journal-shadow' 
              : 'text-muted hover:text-ink'}
          `}
          title="Weekly Grouped View"
        >
          <LayoutGrid size={18} strokeWidth={1.5} />
          <span className="text-sm">Weekly</span>
        </button>
        <button
          onClick={() => onViewChange('chronological')}
          className={`
            px-3 py-1.5 rounded flex items-center gap-2 transition-all duration-200
            ${view === 'chronological' 
              ? 'bg-paper text-ink journal-shadow' 
              : 'text-muted hover:text-ink'}
          `}
          title="Chronological View"
        >
          <LayoutList size={18} strokeWidth={1.5} />
          <span className="text-sm">Timeline</span>
        </button>
      </div>
    </div>
  );
}
