'use client';

import { Suspense } from 'react';
import { WeeklyPlanView } from '@/components/weekly/WeeklyPlanView';

export default function WeeklyPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64">Loading...</div>}>
      <WeeklyPlanView />
    </Suspense>
  );
}
