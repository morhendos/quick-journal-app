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
    <div className={`paper-texture bg-paper rounded-lg p-4 sm:p-8 journal-shadow transition-colors duration-200 flex flex-col ${className}`}>
      {children}
    </div>
  );
}

export default function MonthlyReview() {
  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Fixed header section */}
      <div className="w-full flex-none bg-background z-10">
        <div className="container mx-auto px-3 py-4 sm:px-4 sm:pt-12 max-w-6xl">
          <PageHeader />
          <div className="mt-8 mb-8">
            <MonthlyHeader />
          </div>
        </div>
      </div>
      
      {/* Scrollable content section */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-3 pb-4 sm:px-4 sm:pb-12 max-w-6xl">
          <div className="space-y-8">
            {MONTHLY_SECTIONS.map(({ key }) => (
              <SectionContainer key={key}>
                <GenericMonthlyList sectionKey={key} />
              </SectionContainer>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}