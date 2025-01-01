'use client';

import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/layout/PageHeader';

export default function MonthlyReview() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <main className="container mx-auto h-screen px-3 py-4 sm:px-4 sm:py-12 max-w-6xl relative flex flex-col">
        <PageHeader />
        
        <div className="flex-1 min-h-0">
          <Section title="Monthly Overview">
            <div className="p-4 text-ink/70">
              Monthly review content will go here...
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}