import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MonthlyData, WorkItem, ProjectItem } from '@/types/monthly';

const STORAGE_KEY = 'monthly_reviews';

export function useMonthlyStorage() {
  const [monthlyReviews, setMonthlyReviews] = useLocalStorage<MonthlyData[]>(STORAGE_KEY, []);

  const getCurrentMonth = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const getCurrentMonthData = (): MonthlyData => {
    const currentMonth = getCurrentMonth();
    return (
      monthlyReviews.find(review => review.month === currentMonth) || 
      { month: currentMonth, workItems: [], projectItems: [] }
    );
  };

  const updateCurrentMonth = (updater: (data: MonthlyData) => MonthlyData) => {
    const currentMonth = getCurrentMonth();
    setMonthlyReviews(prev => {
      const otherMonths = prev.filter(review => review.month !== currentMonth);
      const updatedData = updater(getCurrentMonthData());
      return [...otherMonths, updatedData].sort((a, b) => b.month.localeCompare(a.month));
    });
  };

  const addWorkItem = (text: string): WorkItem => {
    const newItem: WorkItem = {
      id: Date.now().toString(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    updateCurrentMonth(current => ({
      ...current,
      workItems: [newItem, ...current.workItems]
    }));

    return newItem;
  };

  const addProjectItem = (text: string): ProjectItem => {
    const newItem: ProjectItem = {
      id: Date.now().toString(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    updateCurrentMonth(current => ({
      ...current,
      projectItems: [newItem, ...(current.projectItems || [])]
    }));

    return newItem;
  };

  const updateWorkItem = (id: string, text: string) => {
    updateCurrentMonth(current => ({
      ...current,
      workItems: current.workItems.map(item =>
        item.id === id
          ? { ...item, text: text.trim(), updatedAt: new Date().toISOString() }
          : item
      )
    }));
  };

  const updateProjectItem = (id: string, text: string) => {
    updateCurrentMonth(current => ({
      ...current,
      projectItems: (current.projectItems || []).map(item =>
        item.id === id
          ? { ...item, text: text.trim(), updatedAt: new Date().toISOString() }
          : item
      )
    }));
  };

  const deleteWorkItem = (id: string) => {
    updateCurrentMonth(current => ({
      ...current,
      workItems: current.workItems.filter(item => item.id !== id)
    }));
  };

  const deleteProjectItem = (id: string) => {
    updateCurrentMonth(current => ({
      ...current,
      projectItems: (current.projectItems || []).filter(item => item.id !== id)
    }));
  };

  return {
    getCurrentMonthData,
    addWorkItem,
    updateWorkItem,
    deleteWorkItem,
    addProjectItem,
    updateProjectItem,
    deleteProjectItem
  };
}