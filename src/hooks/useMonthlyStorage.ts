import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MonthlyData } from '@/types/monthly';

const STORAGE_KEY = 'monthly_reviews';

export interface ExportFormat {
  version: string;
  exportDate: string;
  data: MonthlyData[];
}

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
      { 
        month: currentMonth, 
        workItems: [], 
        projectItems: [],
        healthItems: [],
        lifeEventItems: [],
        learningToRememberItems: [],
        hopeItems: []
      }
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

  const addWorkItem = (text: string) => addItem('workItems', text);
  const addProjectItem = (text: string) => addItem('projectItems', text);
  const addHealthItem = (text: string) => addItem('healthItems', text);
  const addLifeEventItem = (text: string) => addItem('lifeEventItems', text);
  const addLearningToRememberItem = (text: string) => addItem('learningToRememberItems', text);
  const addHopeItem = (text: string) => addItem('hopeItems', text);

  const updateWorkItem = (id: string, text: string) => updateItem('workItems', id, text);
  const updateProjectItem = (id: string, text: string) => updateItem('projectItems', id, text);
  const updateHealthItem = (id: string, text: string) => updateItem('healthItems', id, text);
  const updateLifeEventItem = (id: string, text: string) => updateItem('lifeEventItems', id, text);
  const updateLearningToRememberItem = (id: string, text: string) => updateItem('learningToRememberItems', id, text);
  const updateHopeItem = (id: string, text: string) => updateItem('hopeItems', id, text);

  const deleteWorkItem = (id: string) => deleteItem('workItems', id);
  const deleteProjectItem = (id: string) => deleteItem('projectItems', id);
  const deleteHealthItem = (id: string) => deleteItem('healthItems', id);
  const deleteLifeEventItem = (id: string) => deleteItem('lifeEventItems', id);
  const deleteLearningToRememberItem = (id: string) => deleteItem('learningToRememberItems', id);
  const deleteHopeItem = (id: string) => deleteItem('hopeItems', id);

  function addItem(itemType: keyof MonthlyData, text: string) {
    const newItem = {
      id: Date.now().toString(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    updateCurrentMonth(current => ({
      ...current,
      [itemType]: [newItem, ...(current[itemType] || [])]
    }));

    return newItem;
  }

  function updateItem(itemType: keyof MonthlyData, id: string, text: string) {
    updateCurrentMonth(current => ({
      ...current,
      [itemType]: (current[itemType] || []).map(item =>
        item.id === id
          ? { ...item, text: text.trim(), updatedAt: new Date().toISOString() }
          : item
      )
    }));
  }

  function deleteItem(itemType: keyof MonthlyData, id: string) {
    updateCurrentMonth(current => ({
      ...current,
      [itemType]: (current[itemType] || []).filter(item => item.id !== id)
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
    getCurrentMonthData,
    addWorkItem,
    updateWorkItem,
    deleteWorkItem,
    addProjectItem,
    updateProjectItem,
    deleteProjectItem,
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