import { useJournalStorage } from '@/lib/storage';
import { Calendar } from 'lucide-react';

export function WeeklyOverview() {
  const { entries } = useJournalStorage();
  
  const getDaysOfWeek = () => {
    const today = new Date();
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - today.getDay() + i);
      days.push(date);
    }
    
    return days;
  };

  const hasEntryForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return entries.some(entry => entry.date === dateStr);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toISOString().split('T')[0] === today.toISOString().split('T')[0];
  };

  const weekDays = getDaysOfWeek();

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-medium text-ink/90 journal-text flex items-center gap-2.5">
        <Calendar size={18} className="text-accent" strokeWidth={1.5} />
        <span>Week Overview</span>
      </h3>
      
      <div className="flex gap-2 items-center">
        {weekDays.map((date, index) => (
          <div
            key={index}
            className={`
              w-8 h-8 rounded-md flex items-center justify-center text-xs
              transition-colors duration-200
              ${hasEntryForDate(date) ? 'bg-accent/20 text-accent' : 'bg-paper text-ink/50'}
              ${isToday(date) ? 'ring-2 ring-accent' : ''}
            `}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}