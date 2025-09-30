'use client';

import { Suspense } from 'react';
import { WeeklyPlanView } from '@/components/weekly/WeeklyPlanView';
import { PageHeader } from '@/components/layout/PageHeader';

export default function WeeklyPage() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-200 overflow-hidden">
      <main className="container mx-auto h-screen px-3 py-4 sm:px-4 sm:py-12 max-w-6xl relative flex flex-col">
        <PageHeader />
        
        <Suspense fallback={
          <div className="flex justify-center items-center h-64">
            <div className="text-ink">Loading...</div>
          </div>
        }>
          <WeeklyPlanView />
        </Suspense>
      </main>
    </div>
  );
}
