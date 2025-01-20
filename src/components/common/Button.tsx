'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  { className, variant = 'default', size = 'default', ...props },
  ref
) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        {
          'bg-accent/10 text-accent hover:bg-accent/15': variant === 'default',
          'hover:bg-accent/10': variant === 'ghost',
          'h-10 py-2 px-4': size === 'default',
          'h-9 px-3': size === 'sm',
          'h-11 px-8': size === 'lg',
        },
        'rounded-md',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button };