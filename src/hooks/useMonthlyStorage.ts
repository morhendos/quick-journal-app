import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MonthlyData, BaseItem } from '@/types/monthly';
import { useMonthlyContext } from '@/contexts/MonthlyContext';

const STORAGE_KEY = 'monthly_reviews';

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export interface ExportFormat {
  version: string;
  exportDate: string;
  data: MonthlyData[];
}

export function useMonthlyStorage() {
  const [monthlyReviews, setMonthlyReviews] = useLocalStorage<MonthlyData[]>(STORAGE_KEY, []);
  const { selectedDate } = useMonthlyContext();

  const getSelectedMonthData = (): MonthlyData => {
    const selectedMonthKey = getMonthKey(selectedDate);
    return (
      monthlyReviews.find(review => review.month === selectedMonthKey) || 
      { 
        month: selectedMonthKey, 
        workItems: [], 
        projectItems: [],
        learningItems: [],
        healthItems: [],
        lifeEventItems: [],
        learningToRememberItems: [],
        hopeItems: []
      }
    );
  };

  const updateSelectedMonth = (updater: (data: MonthlyData) => MonthlyData) => {
    const selectedMonthKey = getMonthKey(selectedDate);
    setMonthlyReviews(prev => {
      const otherMonths = prev.filter(review => review.month !== selectedMonthKey);
      const updatedData = updater(getSelectedMonthData());
      return [...otherMonths, updatedData].sort((a, b) => b.month.localeCompare(a.month));
    });
  };

  const isDecember2024 = selectedDate.getMonth() === 11 && selectedDate.getFullYear() === 2024;

  const addWorkItem = (text: string) => isDecember2024 ? addItem('workItems', text) : null;
  const addProjectItem = (text: string) => isDecember2024 ? addItem('projectItems', text) : null;
  const addLearningItem = (text: string) => isDecember2024 ? addItem('learningItems', text) : null;
  const addHealthItem = (text: string) => isDecember2024 ? addItem('healthItems', text) : null;
  const addLifeEventItem = (text: string) => isDecember2024 ? addItem('lifeEventItems', text) : null;
  const addLearningToRememberItem = (text: string) => isDecember2024 ? addItem('learningToRememberItems', text) : null;
  const addHopeItem = (text: string) => isDecember2024 ? addItem('hopeItems', text) : null;

  const updateWorkItem = (id: string, text: string) => isDecember2024 ? updateItem('workItems', id, text) : null;
  const updateProjectItem = (id: string, text: string) => isDecember2024 ? updateItem('projectItems', id, text) : null;
  const updateLearningItem = (id: string, text: string) => isDecember2024 ? updateItem('learningItems', id, text) : null;
  const updateHealthItem = (id: string, text: string) => isDecember2024 ? updateItem('healthItems', id, text) : null;
  const updateLifeEventItem = (id: string, text: string) => isDecember2024 ? updateItem('lifeEventItems', id, text) : null;
  const updateLearningToRememberItem = (id: string, text: string) => isDecember2024 ? updateItem('learningToRememberItems', id, text) : null;
  const updateHopeItem = (id: string, text: string) => isDecember2024 ? updateItem('hopeItems', id, text) : null;