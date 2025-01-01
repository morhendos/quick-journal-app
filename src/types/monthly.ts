export interface BaseItem {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkItem extends BaseItem {}
export interface ProjectItem extends BaseItem {}
export interface LearningItem extends BaseItem {}
export interface HealthItem extends BaseItem {}
export interface LifeEventItem extends BaseItem {}
export interface LearningToRememberItem extends BaseItem {}
export interface HopeItem extends BaseItem {}

export interface MonthlyData {
  month: string;
  workItems: WorkItem[];
  projectItems: ProjectItem[];
  learningItems: LearningItem[];
  healthItems: HealthItem[];
  lifeEventItems: LifeEventItem[];
  learningToRememberItems: LearningToRememberItem[];
  hopeItems: HopeItem[];
}