'use client';

import { X } from 'lucide-react';

interface MonthlyEntryListProps {
  items: string[];
  onRemoveItem: (index: number) => void;
}

export function MonthlyEntryList({ items, onRemoveItem }: MonthlyEntryListProps) {
  if (items.length === 0) {
    return (
      <p className="text-muted text-center py-4">No items yet</p>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-3 group text-ink/80"
        >
          <span className="flex-grow">{item}</span>
          <button
            onClick={() => onRemoveItem(index)}
            className="p-1 opacity-0 group-hover:opacity-100 hover:bg-accent/10 rounded transition-all"
            aria-label="Remove item"
          >
            <X size={16} className="text-ink/50" />
          </button>
        </li>
      ))}
    </ul>
  );
}