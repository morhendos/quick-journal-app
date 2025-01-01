import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useSelectedDate() {
  const searchParams = useSearchParams();
  
  const getSelectedDate = useCallback(() => {
    const dateParam = searchParams.get('date');
    if (dateParam && isValidDate(dateParam)) {
      return dateParam;
    }
    return new Date().toISOString().split('T')[0];
  }, [searchParams]);

  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  };

  const isToday = useCallback((date: string) => {
    const today = new Date().toISOString().split('T')[0];
    return date === today;
  }, []);

  return {
    selectedDate: getSelectedDate(),
    isToday
  };
}
