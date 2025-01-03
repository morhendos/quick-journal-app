'use client';

import { BaseItem } from '@/types/monthly';
import { EditableList } from '../common/EditableList';
import { useMonthlyContext } from '@/contexts/MonthlyContext';

interface MonthlyListProps {
  title: string;
  items: BaseItem[];
  addItem?: (text: string) => void;
  updateItem?: (id: string, text: string) => void;
  deleteItem?: (id: string) => void;
  emptyMessage: string;
  placeholder?: string;
}

export function MonthlyList({
  title,
  items,
  addItem,
  updateItem,
  deleteItem,
  emptyMessage,
  placeholder
}: MonthlyListProps) {
  const { selectedDate } = useMonthlyContext();
  const isDecember2024 = selectedDate.getMonth() === 11 && selectedDate.getFullYear() === 2024;

  return (
    <div className="space-y-4">
      <h3 className="text-lg sm:text-xl font-medium text-ink/90 journal-heading">
        {title}
      </h3>
      <EditableList
        items={items}
        addItem={isDecember2024 ? addItem : undefined}
        updateItem={isDecember2024 ? updateItem : undefined}
        deleteItem={isDecember2024 ? deleteItem : undefined}
        emptyMessage={emptyMessage}
        placeholder={placeholder}
      />
    </div>
  );
}