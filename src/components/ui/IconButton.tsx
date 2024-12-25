'use client';

import { LucideIcon } from 'lucide-react';
import { ComponentProps } from 'react';

/**
 * Props for the IconButton component
 * @interface IconButtonProps
 * @extends {ComponentProps<'button'>} - Inherits all HTML button props
 */
interface IconButtonProps extends ComponentProps<'button'> {
  /** Lucide icon component to render */
  icon: LucideIcon;
  /** Size of the icon in pixels */
  size?: number;
  /** Stroke width of the icon */
  strokeWidth?: number;
}

/**
 * A reusable button component that displays an icon with consistent styling
 * @component
 * @example
 * ```tsx
 * <IconButton
 *   icon={Download}
 *   onClick={handleClick}
 *   aria-label="Download file"
 * />
 * ```
 */
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
