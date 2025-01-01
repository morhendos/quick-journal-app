export function getLocalISOString(date: Date) {
  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date provided');
    }
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return ''; // Return empty string for error cases
  }
}

export function getWeekBounds() {
  try {
    const today = new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { monday, sunday };
  } catch (error) {
    console.error('Error calculating week bounds:', error);
    const fallback = new Date();
    return { monday: fallback, sunday: fallback };
  }
}

export function isToday(dateStr: string) {
  try {
    if (!dateStr) return false;
    const today = new Date();
    return dateStr === getLocalISOString(today);
  } catch {
    return false;
  }
}

export function isFutureDate(date: Date) {
  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return false;
    }
    const today = new Date();
    const todayStr = getLocalISOString(today);
    const dateStr = getLocalISOString(date);
    return dateStr > todayStr;
  } catch {
    return false;
  }
}

export function getCurrentWeekDays() {
  try {
    const today = new Date();
    const days: Date[] = [];
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + mondayOffset + i);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date calculation');
      }
      days.push(date);
    }
    
    return days;
  } catch (error) {
    console.error('Error calculating week days:', error);
    return Array(7).fill(new Date()); // Fallback to today's date
  }
}

export function formatShortDate(dateStr: string) {
  try {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting short date:', error);
    return '';
  }
}

export function formatDate(dateStr: string) {
  try {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}