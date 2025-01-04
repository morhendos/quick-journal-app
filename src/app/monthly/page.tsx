'use client';

import { useCallback, useEffect, useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { MonthlyHeader } from '@/components/monthly/MonthlyHeader';
import { MONTHLY_SECTIONS } from '@/config/monthlyReview';
import { GenericMonthlyList } from '@/components/monthly/GenericMonthlyList';
import { cn } from '@/lib/utils';

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
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);

  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement;
    setIsHeaderCompact(target.scrollTop > 20);
  }, []);

  useEffect(() => {
    const contentArea = document.getElementById('monthly-content');
    if (contentArea) {
      contentArea.addEventListener('scroll', handleScroll);
      return () => contentArea.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Fixed header section */}
      <div 
        className={cn(
          "w-full flex-none bg-background z-10 transition-all duration-300",
          isHeaderCompact ? "shadow-md" : ""
        )}
      >
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <div className={cn(
            "transition-all duration-300",
            isHeaderCompact ? "py-2" : "py-4 sm:pt-12"
          )}>
            <PageHeader />
          </div>
          <div className={cn(
            "transition-all duration-300 transform-gpu",
            isHeaderCompact 
              ? "scale-90 opacity-0 -mt-8 h-0 overflow-hidden" 
              : "mt-8 mb-8 opacity-100"
          )}>
            <MonthlyHeader />
          </div>
        </div>
      </div>
      
      {/* Scrollable content section */}
      <div id="monthly-content" className="flex-1 overflow-auto">
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

      {/* Floating compact header */}
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 bg-background/80 backdrop-blur-sm transition-all duration-300 transform-gpu shadow-md",
          isHeaderCompact ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <div className="container mx-auto px-3 py-2 sm:px-4 max-w-6xl">
          <MonthlyHeader compact />
        </div>
      </div>
    </div>
  );
}