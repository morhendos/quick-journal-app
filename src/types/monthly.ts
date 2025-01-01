export interface BaseItem {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkItem extends BaseItem {}
export interface ProjectItem extends BaseItem {}
export interface LearningItem extends BaseItem {}