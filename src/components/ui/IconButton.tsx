'use client';

import { LucideIcon } from 'lucide-react';
import { ComponentProps } from 'react';

interface IconButtonProps extends ComponentProps<'button'> {
  icon: LucideIcon;
  size?: number;
  strokeWidth?: number;
}

export function IconButton({ 
  icon: Icon,
  size = 20,
  strokeWidth = 1.5,
  className = '',
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      className={`
        p-2
        rounded-lg
        bg-paper paper-texture journal-shadow 
        border border-accent/20
        hover:scale-102 active:scale-98 
        transition-all duration-200
        flex items-center justify-center
        text-ink/90
        ${className}
      `}
    >
      <Icon 
        size={size} 
        className="text-accent" 
        strokeWidth={strokeWidth} 
      />
    </button>
  );
}
