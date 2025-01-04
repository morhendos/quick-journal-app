import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MonthlyData, BaseItem, ItemsKey, ExportFormat, MonthlyStorageMethods } from '@/types/monthly';
import { useMonthlyContext } from '@/contexts/MonthlyContext';

const STORAGE_KEY = 'monthly_reviews';

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function ensureArrayField<T>(value: T[] | undefined | null): T[] {
  if (Array.isArray(value)) return value;
  return [];
}

export function useMonthlyStorage(): MonthlyStorageMethods {
  const [monthlyReviews, setMonthlyReviews] = useLocalStorage<MonthlyData[]>(STORAGE_KEY, []);
  const { selectedDate } = useMonthlyContext();
  const selectedMonthKey = getMonthKey(selectedDate);
  
  const getSelectedMonthData = (): MonthlyData => {
    const currentMonth = monthlyReviews.find(review => review.month === selectedMonthKey);
    if (currentMonth) {
      // Ensure all array fields exist
      return {
        month: currentMonth.month,
        workItems: ensureArrayField(currentMonth.workItems),
        projectItems: ensureArrayField(currentMonth.projectItems),
        learningItems: ensureArrayField(currentMonth.learningItems),
        healthItems: ensureArrayField(currentMonth.healthItems),
        lifeEventItems: ensureArrayField(currentMonth.lifeEventItems),
        learningToRememberItems: ensureArrayField(currentMonth.learningToRememberItems),
        hopeItems: ensureArrayField(currentMonth.hopeItems)
      };
    }
    
    // Return new empty month data
    return { 
      month: selectedMonthKey, 
      workItems: [], 
      projectItems: [],
      learningItems: [],
      healthItems: [],
      lifeEventItems: [],
      learningToRememberItems: [],
      hopeItems: []
    };
  };

  const updateSelectedMonth = (updater: (data: MonthlyData) => MonthlyData) => {
    setMonthlyReviews(prev => {
      const otherMonths = prev.filter(review => review.month !== selectedMonthKey);
      const updatedData = updater(getSelectedMonthData());

      // Ensure all arrays exist before saving
      const validatedData: MonthlyData = {
        ...updatedData,
        workItems: ensureArrayField(updatedData.workItems),
        projectItems: ensureArrayField(updatedData.projectItems),
        learningItems: ensureArrayField(updatedData.learningItems),
        healthItems: ensureArrayField(updatedData.healthItems),
        lifeEventItems: ensureArrayField(updatedData.lifeEventItems),
        learningToRememberItems: ensureArrayField(updatedData.learningToRememberItems),
        hopeItems: ensureArrayField(updatedData.hopeItems)
      };

      return [...otherMonths, validatedData].sort((a, b) => b.month.localeCompare(a.month));
    });
  };

  function addItem(itemType: ItemsKey, text: string): BaseItem {
    const newItem: BaseItem = {
      id: Date.now().toString(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    updateSelectedMonth(current => ({
      ...current,
      [itemType]: [newItem, ...ensureArrayField(current[itemType] as BaseItem[])]
    }));

    return newItem;
  }

  function updateItem(itemType: ItemsKey, id: string, text: string): void {
    updateSelectedMonth(current => ({
      ...current,
      [itemType]: ensureArrayField(current[itemType] as BaseItem[]).map(item =>
        item.id === id
          ? { ...item, text: text.trim(), updatedAt: new Date().toISOString() }
          : item
      )
    }));
  }

  function deleteItem(itemType: ItemsKey, id: string): void {
    updateSelectedMonth(current => ({
      ...current,
      [itemType]: ensureArrayField(current[itemType] as BaseItem[]).filter(item => item.id !== id)
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

      // Validate and ensure arrays exist in imported data
      const validatedData = dataToImport.map((month): MonthlyData => ({
        month: month.month,
        workItems: ensureArrayField(month.workItems),
        projectItems: ensureArrayField(month.projectItems),
        learningItems: ensureArrayField(month.learningItems),
        healthItems: ensureArrayField(month.healthItems),
        lifeEventItems: ensureArrayField(month.lifeEventItems),
        learningToRememberItems: ensureArrayField(month.learningToRememberItems),
        hopeItems: ensureArrayField(month.hopeItems)
      }));

      setMonthlyReviews(validatedData);

    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  };

  return {
    getSelectedMonthData,
    // Work items
    addWorkItem: (text: string) => addItem('workItems', text),
    updateWorkItem: (id: string, text: string) => updateItem('workItems', id, text),
    deleteWorkItem: (id: string) => deleteItem('workItems', id),
    // Project items
    addProjectItem: (text: string) => addItem('projectItems', text),
    updateProjectItem: (id: string, text: string) => updateItem('projectItems', id, text),
    deleteProjectItem: (id: string) => deleteItem('projectItems', id),
    // Learning items
    addLearningItem: (text: string) => addItem('learningItems', text),
    updateLearningItem: (id: string, text: string) => updateItem('learningItems', id, text),
    deleteLearningItem: (id: string) => deleteItem('learningItems', id),
    // Health items
    addHealthItem: (text: string) => addItem('healthItems', text),
    updateHealthItem: (id: string, text: string) => updateItem('healthItems', id, text),
    deleteHealthItem: (id: string) => deleteItem('healthItems', id),
    // Life events
    addLifeEventItem: (text: string) => addItem('lifeEventItems', text),
    updateLifeEventItem: (id: string, text: string) => updateItem('lifeEventItems', id, text),
    deleteLifeEventItem: (id: string) => deleteItem('lifeEventItems', id),
    // Learnings to remember
    addLearningToRememberItem: (text: string) => addItem('learningToRememberItems', text),
    updateLearningToRememberItem: (id: string, text: string) => updateItem('learningToRememberItems', id, text),
    deleteLearningToRememberItem: (id: string) => deleteItem('learningToRememberItems', id),
    // Hope items
    addHopeItem: (text: string) => addItem('hopeItems', text),
    updateHopeItem: (id: string, text: string) => updateItem('hopeItems', id, text),
    deleteHopeItem: (id: string) => deleteItem('hopeItems', id),
    // Data import/export
    exportData,
    importData
  };
}