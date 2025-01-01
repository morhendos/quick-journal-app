export interface WorkItem {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlyData {
  workItems: WorkItem[];
  month: string; // Format: 'YYYY-MM'
}
