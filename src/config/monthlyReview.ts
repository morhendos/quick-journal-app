import { MonthlyWorkList } from '@/components/monthly/MonthlyWorkList';
import { MonthlyProjectsList } from '@/components/monthly/MonthlyProjectsList';
import { MonthlyLearningList } from '@/components/monthly/MonthlyLearningList';
import { MonthlyHealthList } from '@/components/monthly/MonthlyHealthList';
import { MonthlyLifeEventsList } from '@/components/monthly/MonthlyLifeEventsList';
import { MonthlyLearningsToRememberList } from '@/components/monthly/MonthlyLearningsToRememberList';
import { MonthlyHopesList } from '@/components/monthly/MonthlyHopesList';

export const MONTHLY_SECTIONS = [
  {
    key: 'work',
    title: 'Work I Got Done',
    component: MonthlyWorkList,
    placeholder: 'Enter a work accomplishment...',
    emptyMessage: 'Start adding your accomplishments for this month',
  },
  {
    key: 'projects',
    title: 'Projects',
    component: MonthlyProjectsList,
    placeholder: 'Enter a project update...',
    emptyMessage: 'Start adding your project updates for this month',
  },
  {
    key: 'learning',
    title: 'Learning & Growth',
    component: MonthlyLearningList,
    placeholder: 'Enter something you learned...',
    emptyMessage: 'Start adding what you learned this month',
  },
  {
    key: 'health',
    title: 'Health & Wellness',
    component: MonthlyHealthList,
    placeholder: 'Enter a health or wellness update...',
    emptyMessage: 'Start adding your health and wellness updates',
  },
  {
    key: 'lifeEvents',
    title: 'Life Events',
    component: MonthlyLifeEventsList,
    placeholder: 'Enter a significant life event...',
    emptyMessage: 'Start adding significant events from this month',
  },
  {
    key: 'learningsToRemember',
    title: 'Learnings to Remember',
    component: MonthlyLearningsToRememberList,
    placeholder: 'Enter an important learning...',
    emptyMessage: 'Start adding important learnings to remember',
  },
  {
    key: 'hopes',
    title: 'Hopes for Next Month',
    component: MonthlyHopesList,
    placeholder: 'Enter your hope for next month...',
    emptyMessage: 'Start adding your hopes for next month',
  },
] as const;

export type MonthlySection = typeof MONTHLY_SECTIONS[number];