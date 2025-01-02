'use client';

import { useState, useEffect } from 'react';
import { JournalEntryDisplayProps } from '@/types/journal';
import { BookOpen, Sparkles, Edit } from 'lucide-react';
import { formatDate } from '@/utils/dates';

export function EntryDisplay({ entry, isToday, onEdit }: JournalEntryDisplayProps) {
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="journal-heading text-lg font-medium text-ink transition-colors">
          {formatDate(entry.date)}
        </h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-accent hover:text-accent/80 transition-colors"
            aria-label="Edit entry"
          >
            <Edit size={18} strokeWidth={1.5} />
          </button>
        )}
      </div>

      <div className="space-y-6">
        <EntrySection
          icon={<BookOpen size={18} className="text-accent" strokeWidth={1.5} />}
          title="Learning"
          content={entry.learning}
        />

        <EntrySection
          icon={<Sparkles size={18} className="text-accent" strokeWidth={1.5} />}
          title="Joy"
          content={entry.enjoyment}
        />
      </div>
    </div>
  );
}

function EntrySection({
  icon,
  title,
  content
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-ink/90 journal-text transition-colors">
        {icon}
        <span>{title}</span>
      </div>
      <p className="text-ink/80 journal-text whitespace-pre-wrap transition-colors pl-7">
        {content}
      </p>
    </div>
  );
}