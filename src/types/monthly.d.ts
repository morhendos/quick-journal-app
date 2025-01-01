export interface MonthlyItem {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlyData {
  month: string;
  workItems: MonthlyItem[];
  projectItems: MonthlyItem[];
  healthItems: MonthlyItem[];
  lifeEventItems: MonthlyItem[];
  learningToRememberItems: MonthlyItem[];
  hopeItems: MonthlyItem[];
}