'use client';

import { HeaderControls } from '../settings/HeaderControls';
import LogoutButton from '../auth/LogoutButton';
import { Navigation } from './Navigation';
import { usePathname } from 'next/navigation';

interface PageHeaderProps {
  onEntriesUpdate?: () => void;
}

export function PageHeader({ onEntriesUpdate }: PageHeaderProps) {
  const pathname = usePathname();
  const title = pathname === '/monthly' 
    ? 'Monthly Review' 
    : pathname === '/subscriptions'
      ? 'Subscriptions'
      : 'Daily Journal';

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="w-32">
          <LogoutButton />
        </div>
        <h1 className="journal-heading text-4xl sm:text-5xl font-bold text-ink tracking-tight">
          {title}
        </h1>
        <div className="w-32">
          <HeaderControls onEntriesUpdate={onEntriesUpdate} />
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Navigation />
      </div>
    </div>
  );
}