'use client';

import { CalendarDays, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'chronological' | 'weekly';
  onViewChange: (view: 'chronological' | 'weekly') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex justify-center gap-2 mb-6">
      <ViewButton
        isActive={view === 'weekly'}
        onClick={() => onViewChange('weekly')}
        icon={<CalendarDays size={18} strokeWidth={1.5} />}
        label="Group by Week"
      />
      <ViewButton
        isActive={view === 'chronological'}
        onClick={() => onViewChange('chronological')}
        icon={<List size={18} strokeWidth={1.5} />}
        label="Chronological"
      />
    </div>
  );
}

function ViewButton({
  isActive,
  onClick,
  icon,
  label
}: {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 py-1.5 px-3 rounded-md text-sm
        journal-text transition-all duration-200
        ${isActive 
          ? 'bg-accent/10 text-accent' 
          : 'text-ink/60 hover:text-ink/80'}
      `}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}