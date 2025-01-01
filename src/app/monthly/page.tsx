'use client';

import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/layout/PageHeader';
import { MonthlyWorkList } from '@/components/monthly/MonthlyWorkList';
import { MonthlyProjectsList } from '@/components/monthly/MonthlyProjectsList';
import { MonthlyLearningList } from '@/components/monthly/MonthlyLearningList';

export default function MonthlyReview() {
  return (
    <div className="h-screen bg-background transition-colors duration-200 flex flex-col">
      <main className="container mx-auto flex-1 px-3 py-4 sm:px-4 sm:py-12 max-w-6xl flex flex-col">
        <div className="flex-none">
          <PageHeader />
        </div>
        
        <div className="flex-1 overflow-auto min-h-0">
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