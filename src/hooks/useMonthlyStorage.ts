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

  const deleteWorkItem = (id: string) => isDecember2024 ? deleteItem('workItems', id) : null;
  const deleteProjectItem = (id: string) => isDecember2024 ? deleteItem('projectItems', id) : null;
  const deleteLearningItem = (id: string) => isDecember2024 ? deleteItem('learningItems', id) : null;
  const deleteHealthItem = (id: string) => isDecember2024 ? deleteItem('healthItems', id) : null;
  const deleteLifeEventItem = (id: string) => isDecember2024 ? deleteItem('lifeEventItems', id) : null;
  const deleteLearningToRememberItem = (id: string) => isDecember2024 ? deleteItem('learningToRememberItems', id) : null;
  const deleteHopeItem = (id: string) => isDecember2024 ? deleteItem('hopeItems', id) : null;

  function addItem<K extends keyof MonthlyData>(itemType: K, text: string): BaseItem | null {
    if (!isDecember2024) return null;
    
    const newItem: BaseItem = {
      id: Date.now().toString(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    updateSelectedMonth(current => ({
      ...current,
      [itemType]: [newItem, ...((current[itemType] as BaseItem[]) || [])]
    }));

    return newItem;
  }

  function updateItem<K extends keyof MonthlyData>(itemType: K, id: string, text: string) {
    if (!isDecember2024) return null;
    
    updateSelectedMonth(current => ({
      ...current,
      [itemType]: ((current[itemType] as BaseItem[]) || []).map(item =>
        item.id === id
          ? { ...item, text: text.trim(), updatedAt: new Date().toISOString() }
          : item
      )
    }));
  }

  function deleteItem<K extends keyof MonthlyData>(itemType: K, id: string) {
    if (!isDecember2024) return null;
    
    updateSelectedMonth(current => ({
      ...current,
      [itemType]: ((current[itemType] as BaseItem[]) || []).filter(item => item.id !== id)
    }));
  }

  const exportData = () => {
    const exportData: ExportFormat = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      data: monthlyReviews
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportName = `monthly_reviews_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
  };

  const importData = async (importedData: unknown) => {
    try {
      if (typeof importedData !== 'object' || !importedData) {
        throw new Error('Invalid data format');
      }

      let dataToImport: MonthlyData[];

      if ('version' in importedData && 'data' in importedData) {
        const typedData = importedData as ExportFormat;
        dataToImport = typedData.data;
      } else if (Array.isArray(importedData)) {
        dataToImport = importedData;
      } else {
        throw new Error('Unrecognized data format');
      }

      const isValidMonthlyData = (data: unknown): data is MonthlyData => {
        if (typeof data !== 'object' || !data) return false;
        const d = data as any;
        return typeof d.month === 'string';
      };

      if (!Array.isArray(dataToImport) || !dataToImport.every(isValidMonthlyData)) {
        throw new Error('Invalid data structure');
      }

      setMonthlyReviews(dataToImport);

    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  };

  return {
    getSelectedMonthData,
    addWorkItem,
    updateWorkItem,
    deleteWorkItem,
    addProjectItem,
    updateProjectItem,
    deleteProjectItem,
    addLearningItem,
    updateLearningItem,
    deleteLearningItem,
    addHealthItem,
    updateHealthItem,
    deleteHealthItem,
    addLifeEventItem,
    updateLifeEventItem,
    deleteLifeEventItem,
    addLearningToRememberItem,
    updateLearningToRememberItem,
    deleteLearningToRememberItem,
    addHopeItem,
    updateHopeItem,
    deleteHopeItem,
    exportData,
    importData
  };
}