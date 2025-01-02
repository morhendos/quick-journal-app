'use client';

import { JournalEntryForm } from '@/components/forms/JournalEntryForm';
import { EntryList } from '@/components/entries/EntryList';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/common/Section';
import { WeeklyOverview } from '@/components/overview/WeeklyOverview';
import { useRef } from 'react';
import { DateProvider } from '@/contexts/DateContext';
import { formatDate, isToday } from '@/utils/dates';
import { useDateContext } from '@/contexts/DateContext';

function JournalContent() {
  const updateCounterRef = useRef(0);
  const { selectedDate } = useDateContext();

  const handleEntriesUpdate = () => {
    updateCounterRef.current += 1;
  };

  const sectionTitle = isToday(selectedDate)
    ? 'Entry for Today'
    : formatDate(selectedDate);

  return (
    <div className="min-h-screen bg-background transition-colors duration-200 overflow-hidden">
      <main className="container mx-auto h-screen px-3 py-4 sm:px-4 sm:py-12 max-w-6xl relative flex flex-col">
        <PageHeader onEntriesUpdate={handleEntriesUpdate} />
        
        <div className="mt-6 mb-8">
          <WeeklyOverview key={updateCounterRef.current} />
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-2 flex-1 min-h-0">
          <Section 
            title={sectionTitle}
            className="order-1 lg:order-2"
          >
            <JournalEntryForm key={updateCounterRef.current} />
          </Section>

          <Section title="Previous Entries" className="order-2 lg:order-1">
            <EntryList key={updateCounterRef.current} />
          </Section>
        </div>
      </main>
    </div>
  );
}