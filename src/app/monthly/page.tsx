'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { MonthlyHeader } from '@/components/monthly/MonthlyHeader';
import { MONTHLY_SECTIONS } from '@/config/monthlyReview';
import { GenericMonthlyList } from '@/components/monthly/GenericMonthlyList';

interface SectionContainerProps {
  className?: string;
  children: React.ReactNode;
}

function SectionContainer({ children, className = '' }: SectionContainerProps) {
  return (
    <div className={`paper-texture bg-paper rounded-lg p-4 sm:p-8 journal-shadow transition-colors duration-200 flex flex-col min-h-0 ${className}`}>
      <div className="flex-1 min-h-0 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default function MonthlyReview() {
  return (
    <div className="h-full bg-background transition-colors duration-200 flex flex-col overflow-hidden">
      <main className="container mx-auto flex-1 px-3 py-4 sm:px-4 sm:py-12 max-w-6xl flex flex-col overflow-hidden">
        <div className="flex-none">
          <PageHeader />
        </div>
        
        <div className="mb-8">
          <MonthlyHeader />
        </div>
        
        <div className="flex-1 overflow-auto min-h-0">
          <div className="space-y-8">
            {MONTHLY_SECTIONS.map(({ key }) => (
              <SectionContainer key={key}>
                <GenericMonthlyList sectionKey={key} />
              </SectionContainer>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}