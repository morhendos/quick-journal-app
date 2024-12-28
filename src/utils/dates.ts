import { JournalEntry } from '@/types/journal';

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const isToday = (date: string): boolean => {
  const today = new Date().toISOString().split('T')[0];
  return date === today;
};

export const getWeekStart = (date: string): string => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff)).toISOString().split('T')[0];
};

export const groupEntriesByWeek = (entries: JournalEntry[]): Record<string, JournalEntry[]> => {
  return entries.reduce((groups, entry) => {
    const weekStart = getWeekStart(entry.date);
    return {
      ...groups,
      [weekStart]: [...(groups[weekStart] || []), entry]
    };
  }, {} as Record<string, JournalEntry[]>);
};