'use client';

import { MonthlyProvider } from '@/contexts/MonthlyContext';

export default function MonthlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MonthlyProvider>
      {children}
    </MonthlyProvider>
  );
}