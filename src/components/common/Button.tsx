import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'default' | 'ghost';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-accent/30',
          'disabled:pointer-events-none disabled:opacity-50',
          variant === 'default' && [
            'bg-accent/10 text-accent hover:bg-accent/20',
            'active:bg-accent/30'
          ],
          variant === 'ghost' && [
            'hover:bg-accent/10 text-ink/70 hover:text-ink',
            'active:bg-accent/20'
          ],
          size === 'default' && 'h-10 px-4 py-2',
          size === 'sm' && 'h-9 px-3',
          size === 'lg' && 'h-11 px-8',
          size === 'icon' && 'h-10 w-10',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';