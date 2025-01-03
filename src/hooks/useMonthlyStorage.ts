import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MonthlyData, BaseItem, ItemsKey, ItemActions, ExportFormat } from '@/types/monthly';
import { useMonthlyContext } from '@/contexts/MonthlyContext';

const STORAGE_KEY = 'monthly_reviews';

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function useMonthlyStorage() {
  const [monthlyReviews, setMonthlyReviews] = useLocalStorage<MonthlyData[]>(STORAGE_KEY, []);
  const { selectedDate } = useMonthlyContext();
  const selectedMonthKey = getMonthKey(selectedDate);
  
  const getSelectedMonthData = (): MonthlyData => {
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
    setMonthlyReviews(prev => {
      const otherMonths = prev.filter(review => review.month !== selectedMonthKey);
      const updatedData = updater(getSelectedMonthData());
      return [...otherMonths, updatedData].sort((a, b) => b.month.localeCompare(a.month));
    });
  };

  function createItemActions(itemType: ItemsKey): ItemActions {
    return {
      add: (text: string) => {
        const newItem: BaseItem = {
          id: Date.now().toString(),
          text: text.trim(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        updateSelectedMonth(current => ({
          ...current,
          [itemType]: [newItem, ...(current[itemType] as BaseItem[])]
        }));

        return newItem;
      },

      update: (id: string, text: string) => {
        updateSelectedMonth(current => ({
          ...current,
          [itemType]: (current[itemType] as BaseItem[]).map(item =>
            item.id === id
              ? { ...item, text: text.trim(), updatedAt: new Date().toISOString() }
              : item
          )
        }));
      },

      delete: (id: string) => {
        updateSelectedMonth(current => ({
          ...current,
          [itemType]: (current[itemType] as BaseItem[]).filter(item => item.id !== id)
        }));
      }
    };
  }

  // Create actions for each item type
  const workActions = createItemActions('workItems');
  const projectActions = createItemActions('projectItems');
  const learningActions = createItemActions('learningItems');
  const healthActions = createItemActions('healthItems');
  const lifeEventActions = createItemActions('lifeEventItems');
  const learningToRememberActions = createItemActions('learningToRememberItems');
  const hopeActions = createItemActions('hopeItems');

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
    // Work items
    addWorkItem: workActions.add,
    updateWorkItem: workActions.update,
    deleteWorkItem: workActions.delete,
    // Project items
    addProjectItem: projectActions.add,
    updateProjectItem: projectActions.update,
    deleteProjectItem: projectActions.delete,
    // Learning items
    addLearningItem: learningActions.add,
    updateLearningItem: learningActions.update,
    deleteLearningItem: learningActions.delete,
    // Health items
    addHealthItem: healthActions.add,
    updateHealthItem: healthActions.update,
    deleteHealthItem: healthActions.delete,
    // Life events
    addLifeEventItem: lifeEventActions.add,
    updateLifeEventItem: lifeEventActions.update,
    deleteLifeEventItem: lifeEventActions.delete,
    // Learnings to remember
    addLearningToRememberItem: learningToRememberActions.add,
    updateLearningToRememberItem: learningToRememberActions.update,
    deleteLearningToRememberItem: learningToRememberActions.delete,
    // Hope items
    addHopeItem: hopeActions.add,
    updateHopeItem: hopeActions.update,
    deleteHopeItem: hopeActions.delete,
    // Data import/export
    exportData,
    importData
  };
}