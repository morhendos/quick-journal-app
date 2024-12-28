'use client';

import { JournalEntryForm } from '@/components/forms/JournalEntryForm';
import { EntryList } from '@/components/entries/EntryList';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/common/Section';
import { useState } from 'react';

export default function Home() {
  const [updateCounter, setUpdateCounter] = useState(0);

  const handleEntriesUpdate = () => {
    setUpdateCounter(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-200 overflow-hidden">
      <main className="container mx-auto h-screen px-3 py-4 sm:px-4 sm:py-12 max-w-6xl relative flex flex-col">
        <PageHeader onEntriesUpdate={handleEntriesUpdate} />

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-2 flex-1 min-h-0">
          <Section title="Today's Entry" className="order-1 lg:order-2">
            <JournalEntryForm key={updateCounter} />
          </Section>

          <Section title="Previous Entries" className="order-2 lg:order-1">
            <EntryList key={updateCounter} />
          </Section>
        </div>
      </main>
    </div>
  );
}