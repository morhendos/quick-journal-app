'use client';

import { HeaderControls } from '../settings/HeaderControls';
import LogoutButton from '../auth/LogoutButton';

interface PageHeaderProps {
  onEntriesUpdate?: () => void;
}

export function PageHeader({ onEntriesUpdate }: PageHeaderProps) {
  return (
    <div className="mb-16 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="w-32">
          <LogoutButton />
        </div>
        <h1 className="journal-heading text-4xl sm:text-5xl font-bold text-ink tracking-tight">
          Daily Journal
        </h1>
        <div className="w-32">
          <HeaderControls onEntriesUpdate={onEntriesUpdate} />
        </div>
      </div>
      <p className="text-muted text-lg max-w-2xl mx-auto journal-text leading-relaxed text-center">
        Capture your daily moments of growth and joy. Every reflection is a step toward mindfulness.
      </p>
    </div>
  );
}