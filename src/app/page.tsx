'use client';

import { JournalEntryForm } from '@/components/forms/JournalEntryForm';
import { EntryList } from '@/components/entries/EntryList';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/common/Section';
import { WeeklyOverview } from '@/components/overview/WeeklyOverview';
import { useState } from 'react';

function getLocalISOString(date: Date) {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().split('T')[0];
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return getLocalISOString(today);
  });
  const [updateCounter, setUpdateCounter] = useState(0);

  const handleEntriesUpdate = () => {
    setUpdateCounter(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-200 overflow-hidden">
      <main className="container mx-auto h-screen px-3 py-4 sm:px-4 sm:py-12 max-w-6xl relative flex flex-col">
        <PageHeader onEntriesUpdate={handleEntriesUpdate} />
        
        <div className="mt-6 mb-8">
          <WeeklyOverview 
            key={updateCounter} 
            selectedDate={selectedDate} 
            onDateSelect={setSelectedDate}
          />
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-2 flex-1 min-h-0">
          <Section 
            title={selectedDate === getLocalISOString(new Date()) 
              ? "Today's Entry" 
              : `Entry for ${new Date(selectedDate).toLocaleDateString()}`} 
            className="order-1 lg:order-2"
          >
            <JournalEntryForm 
              key={`${updateCounter}-${selectedDate}`} 
              selectedDate={selectedDate} 
            />
          </Section>

          <Section title="Previous Entries" className="order-2 lg:order-1">
            <EntryList key={updateCounter} />
          </Section>
        </div>
      </main>
    </div>
  );
}