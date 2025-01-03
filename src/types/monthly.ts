export interface BaseItem {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export type SectionKey =
  | 'work'
  | 'projects'
  | 'learning'
  | 'health'
  | 'lifeEvents'
  | 'learningsToRemember'
  | 'hopes';

// Maps section keys to storage keys
export type StorageKeyMap = {
  work: 'workItems';
  projects: 'projectItems';
  learning: 'learningItems';
  health: 'healthItems';
  lifeEvents: 'lifeEventItems';
  learningsToRemember: 'learningToRememberItems';
  hopes: 'hopeItems';
};

export type ItemsKey = StorageKeyMap[SectionKey];

export interface MonthlyData {
  month: string;
  workItems: BaseItem[];
  projectItems: BaseItem[];
  learningItems: BaseItem[];
  healthItems: BaseItem[];
  lifeEventItems: BaseItem[];
  learningToRememberItems: BaseItem[];
  hopeItems: BaseItem[];
}

export interface MonthlyStorageMethods {
  getSelectedMonthData: () => MonthlyData;
  exportData: () => void;
  importData: (importedData: unknown) => Promise<void>;
  
  // Work items
  addWorkItem: (text: string) => BaseItem;
  updateWorkItem: (id: string, text: string) => void;
  deleteWorkItem: (id: string) => void;
  
  // Project items
  addProjectItem: (text: string) => BaseItem;
  updateProjectItem: (id: string, text: string) => void;
  deleteProjectItem: (id: string) => void;
  
  // Learning items
  addLearningItem: (text: string) => BaseItem;
  updateLearningItem: (id: string, text: string) => void;
  deleteLearningItem: (id: string) => void;
  
  // Health items
  addHealthItem: (text: string) => BaseItem;
  updateHealthItem: (id: string, text: string) => void;
  deleteHealthItem: (id: string) => void;
  
  // Life events
  addLifeEventItem: (text: string) => BaseItem;
  updateLifeEventItem: (id: string, text: string) => void;
  deleteLifeEventItem: (id: string) => void;
  
  // Learnings to remember
  addLearningToRememberItem: (text: string) => BaseItem;
  updateLearningToRememberItem: (id: string, text: string) => void;
  deleteLearningToRememberItem: (id: string) => void;
  
  // Hope items
  addHopeItem: (text: string) => BaseItem;
  updateHopeItem: (id: string, text: string) => void;
  deleteHopeItem: (id: string) => void;
}

export interface ExportFormat {
  version: string;
  exportDate: string;
  data: MonthlyData[];
}