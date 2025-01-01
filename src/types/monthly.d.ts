export interface BaseItem {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlyData {
  month: string;
  workItems: BaseItem[];
  projectItems: BaseItem[];
  healthItems: BaseItem[];
  lifeEventItems: BaseItem[];
  learningToRememberItems: BaseItem[];
  hopeItems: BaseItem[];
}