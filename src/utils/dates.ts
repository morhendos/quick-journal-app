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

export function getWeekBounds(weekOffset: number = 0) {
  try {
    // Start with current date in local timezone
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate target date based on week offset
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + (weekOffset * 7));
    
    // Calculate Monday of the week
    const currentDay = targetDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

    const monday = new Date(targetDate);
    monday.setDate(targetDate.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    console.log('Week bounds:', { 
      weekOffset,
      monday: monday.toISOString(),
      sunday: sunday.toISOString(),
      mondayLocal: getLocalISOString(monday),
      sundayLocal: getLocalISOString(sunday)
    });

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
    today.setHours(23, 59, 59, 999); // End of today
    return date > today;
  } catch {
    return false;
  }
}

export function getWeekDays(weekOffset: number = 0) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + (weekOffset * 7)); // Move weeks back/forward
    
    const days: Date[] = [];
    const currentDay = targetDate.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(targetDate);
      date.setDate(targetDate.getDate() + mondayOffset + i);
      date.setHours(0, 0, 0, 0); // Start of day
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

export function getWeekRange(weekOffset: number = 0) {
  const { monday, sunday } = getWeekBounds(weekOffset);
  return {
    start: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(monday),
    end: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(sunday),
    month: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(monday),
    year: new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(monday)
  };
}