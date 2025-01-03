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

export type ItemsKey = `${SectionKey}Items`;

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

export interface ItemActions {
  add: (text: string) => BaseItem;
  update: (id: string, text: string) => void;
  delete: (id: string) => void;
}

export interface ExportFormat {
  version: string;
  exportDate: string;
  data: MonthlyData[];
}