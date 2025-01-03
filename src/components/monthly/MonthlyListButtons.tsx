'use client';

import { Check, X } from 'lucide-react';

interface ActionButtonsProps {
  onSave: () => void;
  onCancel: () => void;
  disabled?: boolean;
  size?: 'medium' | 'small';
}

export function ActionButtons({ 
  onSave, 
  onCancel, 
  disabled, 
  size = 'medium' 
}: ActionButtonsProps) {
  const buttonSize = size === 'medium' ? 20 : 18;
  const padding = size === 'medium' ? 'p-2' : 'p-1';

  return (
    <div className="flex flex-row gap-2">
      <button
        onClick={onSave}
        disabled={disabled}
        className={`${padding} text-accent hover:bg-accent/10 rounded-md transition-colors disabled:opacity-50`}
        title="Save (⌘+Enter)"
      >
        <Check size={buttonSize} />
      </button>
      <button
        onClick={onCancel}
        className={`${padding} text-ink/70 hover:text-ink/90 rounded-md transition-colors`}
        title="Cancel (Esc)"
      >
        <X size={buttonSize} />
      </button>
    </div>
  );
}

interface HeaderButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function HeaderButton({ onClick, children }: HeaderButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-ink/70 hover:text-accent transition-colors"
    >
      {children}
    </button>
  );
}