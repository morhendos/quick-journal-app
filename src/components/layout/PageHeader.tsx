'use client';

import { HeaderControls } from '../settings/HeaderControls';
import LogoutButton from '../auth/LogoutButton';
import { Navigation } from './Navigation';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  onEntriesUpdate?: () => void;
  compact?: boolean;
}

export function PageHeader({ onEntriesUpdate, compact }: PageHeaderProps) {
  const pathname = usePathname();
  const title = pathname === '/monthly' ? 'Monthly Review' : 'Daily Journal';

  return (
    <div className={cn(
      "animate-fade-in",
      compact ? "" : "mb-4 sm:mb-6 md:mb-8"
    )}>
      <div className="flex justify-between items-center gap-2">
        <div className="w-20 sm:w-24 md:w-32">
          <LogoutButton />
        </div>
        <h1 className={cn(
          "journal-heading font-bold text-ink tracking-tight text-center",
          compact 
            ? "text-lg sm:text-xl md:text-2xl" 
            : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        )}>
          {title}
        </h1>
        <div className="w-20 sm:w-24 md:w-32">
          <HeaderControls onEntriesUpdate={onEntriesUpdate} />
        </div>
      </div>
      {!compact && (
        <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center">
          <Navigation />
        </div>
      )}
    </div>
  );
}