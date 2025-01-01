import { JournalEntry } from '@/types/journal';

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatShortDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const isToday = (date: string): boolean => {
  const today = new Date().toISOString().split('T')[0];
  return date === today;
};

export const getWeekStart = (dateStr: string): string => {
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  
  // Get the day of week (0 = Sunday, 1 = Monday, etc.)
  const day = date.getDay();
  
  // Calculate days to subtract to get to Monday (or previous Monday if it's Sunday)
  const daysToSubtract = day === 0 ? 6 : day - 1;
  
  // Create a new date for the start of the week
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - daysToSubtract);
  
  // Return in YYYY-MM-DD format
  return weekStart.toISOString().split('T')[0];
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

export const getWeekRange = (weekStart: string): string => {
  const start = new Date(weekStart);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  
  return `${formatShortDate(start.toISOString())} - ${formatShortDate(end.toISOString())}`;
};