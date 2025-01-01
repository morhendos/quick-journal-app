'use client';

import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/layout/PageHeader';
import { MonthlyWorkList } from '@/components/monthly/MonthlyWorkList';
import { MonthlyProjectsList } from '@/components/monthly/MonthlyProjectsList';
import { MonthlyLearningList } from '@/components/monthly/MonthlyLearningList';

export default function MonthlyReview() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <main className="container mx-auto h-screen px-3 py-4 sm:px-4 sm:py-12 max-w-6xl relative flex flex-col">
        <PageHeader />
        
        <div className="flex-1 min-h-0 space-y-8">
          <div className="space-y-8">
            <Section>
              <MonthlyWorkList />
            </Section>

            <Section>
              <MonthlyProjectsList />
            </Section>

            <Section>
              <MonthlyLearningList />
            </Section>
          </div>
        </div>
      </main>
    </div>
  );
}