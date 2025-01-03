'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type MonthlyContextType = {
  selectedDate: Date;
  monthOffset: number;
  setMonthOffset: (offset: number) => void;
  isCurrentMonth: boolean;
};

const MonthlyContext = createContext<MonthlyContextType | null>(null);

export function MonthlyProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update selected date when month offset changes
  useEffect(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    // Set to first day of month
    date.setDate(1);
    setSelectedDate(date);
  }, [monthOffset]);

  const value = {
    selectedDate,
    monthOffset,
    setMonthOffset,
    isCurrentMonth: monthOffset === 0
  };

  if (!mounted) {
    return null;
  }

  return (
    <MonthlyContext.Provider value={value}>
      {children}
    </MonthlyContext.Provider>
  );
}

export function useMonthlyContext() {
  const context = useContext(MonthlyContext);
  if (!context) {
    throw new Error('useMonthlyContext must be used within a MonthlyProvider');
  }
  return context;
}