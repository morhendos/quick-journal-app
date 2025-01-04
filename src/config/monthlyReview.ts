import { SectionKey } from "@/types/monthly";

export interface MonthlySection {
  key: SectionKey;
  title: string;
  placeholder: string;
  emptyMessage: string;
}

export const MONTHLY_SECTIONS: MonthlySection[] = [
  {
    key: "work",
    title: "Work I got done",
    placeholder: "Enter a work accomplishment...",
    emptyMessage: "Start adding your accomplishments for this month",
  },
  {
    key: "projects",
    title: "Projects I’ve moved forward",
    placeholder: "Enter a project update...",
    emptyMessage: "Start adding your project updates for this month",
  },
  {
    key: "learning",
    title: "Personal learning I’ve been working on",
    placeholder: "Enter something you learned...",
    emptyMessage: "Start adding what you learned this month",
  },
  {
    key: "health",
    title: "Health and fitness challenges I’ve been doing",
    placeholder: "Enter a health or wellness update...",
    emptyMessage: "Start adding your health and wellness updates",
  },
  {
    key: "lifeEvents",
    title: "Other big life events (some of them unexpected)",
    placeholder: "Enter a significant life event...",
    emptyMessage: "Start adding significant events from this month",
  },
  {
    key: "learningsToRemember",
    title: "Things I’ve learned and want to remember",
    placeholder: "Enter an important learning...",
    emptyMessage: "Start adding important learnings to remember",
  },
  {
    key: "hopes",
    title: "Hopes for the next month",
    placeholder: "Enter your hope for next month...",
    emptyMessage: "Start adding your hopes for next month",
  },
];
