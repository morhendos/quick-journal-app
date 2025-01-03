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

export type StorageMethodPrefix = 'add' | 'update' | 'delete';
export type StorageMethod = `${StorageMethodPrefix}${Capitalize<SectionKey>}Item`;

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

export interface ItemOperations {
  add: (text: string) => BaseItem;
  update: (id: string, text: string) => void;
  delete: (id: string) => void;
}

export interface ExportFormat {
  version: string;
  exportDate: string;
  data: MonthlyData[];
}

// Helper type to get strongly-typed storage methods
export type MonthlyStorageMethods = {
  getSelectedMonthData: () => MonthlyData;
  exportData: () => void;
  importData: (importedData: unknown) => Promise<void>;
} & {
  [K in StorageMethod]: K extends `add${string}Item` 
    ? (text: string) => BaseItem
    : K extends `update${string}Item`
    ? (id: string, text: string) => void
    : (id: string) => void
};