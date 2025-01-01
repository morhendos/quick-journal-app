'use client';

import { Section } from '@/components/common/Section';
import { PageHeader } from '@/components/layout/PageHeader';
import { MonthlyWorkList } from '@/components/monthly/MonthlyWorkList';
import { MonthlyProjectsList } from '@/components/monthly/MonthlyProjectsList';
import { MonthlyLearningList } from '@/components/monthly/MonthlyLearningList';
import { MonthlyHealthList } from '@/components/monthly/MonthlyHealthList';
import { MonthlyLifeEventsList } from '@/components/monthly/MonthlyLifeEventsList';
import { MonthlyLearningsToRememberList } from '@/components/monthly/MonthlyLearningsToRememberList';
import { MonthlyHopesList } from '@/components/monthly/MonthlyHopesList';

export default function MonthlyReview() {
  return (
    <div className="h-full bg-background transition-colors duration-200 flex flex-col overflow-hidden">
      <main className="container mx-auto flex-1 px-3 py-4 sm:px-4 sm:py-12 max-w-6xl flex flex-col overflow-hidden">
        <div className="flex-none">
          <PageHeader />
        </div>
        
        <div className="flex-1 overflow-auto min-h-0">
          <div className="space-y-8">
            <Section title="Work">
              <MonthlyWorkList />
            </Section>

            <Section title="Projects">
              <MonthlyProjectsList />
            </Section>
            
            <Section title="Learning">
              <MonthlyLearningList />
            </Section>

            <Section title="Health">
              <MonthlyHealthList />
            </Section>

            <Section title="Life Events">
              <MonthlyLifeEventsList />
            </Section>

            <Section title="Learnings to Remember">
              <MonthlyLearningsToRememberList />
            </Section>

            <Section title="Hopes & Dreams">
              <MonthlyHopesList />
            </Section>
          </div>
        </div>
      </main>
    </div>
  );
}