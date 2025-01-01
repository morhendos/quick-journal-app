import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MonthlyData, WorkItem, ProjectItem } from '@/types/monthly';

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
      // Validate the imported data structure
      if (typeof importedData !== 'object' || !importedData) {
        throw new Error('Invalid data format');
      }

      let dataToImport: MonthlyData[];

      // Check if it's the new format with version and metadata
      if ('version' in importedData && 'data' in importedData) {
        const typedData = importedData as ExportFormat;
        dataToImport = typedData.data;
      } else if (Array.isArray(importedData)) {
        // Handle legacy format (direct array)
        dataToImport = importedData;
      } else {
        throw new Error('Unrecognized data format');
      }

      // Validate the structure of each monthly review
      const isValidMonthlyData = (data: unknown): data is MonthlyData => {
        if (typeof data !== 'object' || !data) return false;
        const d = data as any;
        return (
          typeof d.month === 'string' &&
          Array.isArray(d.workItems) &&
          (!d.projectItems || Array.isArray(d.projectItems))
        );
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
    exportData,
    importData
  };
}