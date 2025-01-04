import { SectionKey } from '@/types/monthly';

export interface MonthlySection {
  key: SectionKey;
  title: string;
  placeholder: string;
  emptyMessage: string;
}

export const MONTHLY_SECTIONS: MonthlySection[] = [
  {
    key: 'work',
    title: 'Work I Got Done',
    placeholder: 'Enter a work accomplishment...',
    emptyMessage: 'Start adding your accomplishments for this month',
  },
  {
    key: 'projects',
    title: 'Projects',
    placeholder: 'Enter a project update...',
    emptyMessage: 'Start adding your project updates for this month',
  },
  {
    key: 'learning',
    title: 'Learning & Growth',
    placeholder: 'Enter something you learned...',
    emptyMessage: 'Start adding what you learned this month',
  },
  {
    key: 'health',
    title: 'Health & Wellness',
    placeholder: 'Enter a health or wellness update...',
    emptyMessage: 'Start adding your health and wellness updates',
  },
  {
    key: 'lifeEvents',
    title: 'Life Events',
    placeholder: 'Enter a significant life event...',
    emptyMessage: 'Start adding significant events from this month',
  },
  {
    key: 'learningsToRemember',
    title: 'Learnings to Remember',
    placeholder: 'Enter an important learning...',
    emptyMessage: 'Start adding important learnings to remember',
  },
  {
    key: 'hopes',
    title: 'Hopes for Next Month',
    placeholder: 'Enter your hope for next month...',
    emptyMessage: 'Start adding your hopes for next month',
  },
];