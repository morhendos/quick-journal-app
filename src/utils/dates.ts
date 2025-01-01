export function getLocalISOString(date: Date) {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().split('T')[0];
}

export function getWeekBounds() {
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
}

export function isToday(dateStr: string) {
  const today = new Date();
  return dateStr === getLocalISOString(today);
}

export function isFutureDate(date: Date) {
  const today = new Date();
  const todayStr = getLocalISOString(today);
  const dateStr = getLocalISOString(date);
  return dateStr > todayStr;
}

export function getCurrentWeekDays() {
  const today = new Date();
  const days = [];
  const currentDay = today.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + mondayOffset + i);
    days.push(date);
  }
  
  return days;
}