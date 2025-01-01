'use client';

import { Section } from '@/components/common/Section';

export default function MonthlyReview() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <main className="container mx-auto h-screen px-3 py-4 sm:px-4 sm:py-12 max-w-6xl relative flex flex-col">
        <Section title="Monthly Review">
          <div className="p-4 text-ink/70">
            Monthly review content will go here...
          </div>
        </Section>
      </main>
    </div>
  );
}