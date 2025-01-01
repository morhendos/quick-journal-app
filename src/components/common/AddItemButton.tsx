'use client';

import { Plus } from 'lucide-react';

interface AddItemButtonProps {
  onClick: () => void;
}

export function AddItemButton({ onClick }: AddItemButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-accent/10 text-ink/50 hover:text-accent transition-colors"
      aria-label="Add item"
    >
      <Plus size={20} />
    </button>
  );
}