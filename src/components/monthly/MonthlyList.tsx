'use client';

import { Plus } from 'lucide-react';
import { BaseItem } from '@/types/monthly';
import { AutoResizeTextarea } from '@/components/common/AutoResizeTextarea';
import { useMonthlyList } from '@/hooks/useMonthlyList';
import { ActionButtons, HeaderButton } from './MonthlyListButtons';
import { MonthlyListItem } from './MonthlyListItem';
import { cn } from '@/lib/utils';

interface MonthlyListProps<T extends BaseItem> {
  title: string;
  items: T[];
  addItem?: (text: string) => T;
  updateItem?: (id: string, text: string) => void;
  deleteItem?: (id: string) => void;
  emptyMessage: string;
  placeholder?: string;
}

export function MonthlyList<T extends BaseItem>({
  title,
  items = [],
  addItem,
  updateItem,
  deleteItem,
  emptyMessage,
  placeholder
}: MonthlyListProps<T>) {
  const {
    mounted,
    newItem,
    setNewItem,
    isAdding,
    startAdding,
    cancelAdding,
    editingId,
    editText,
    setEditText,
    startEditing,
    cancelEditing
  } = useMonthlyList();

  const handleAddItem = () => {
    if (newItem.trim() && addItem) {
      addItem(newItem);
      setNewItem('');
      cancelAdding();
    }
  };

  const handleSaveEdit = () => {
    if (editingId && editText.trim() && updateItem) {
      updateItem(editingId, editText);
      cancelEditing();
    }
  };

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-ink/90 journal-heading truncate pr-2">{title}</h2>
        </div>
        <div className="text-center py-6 sm:py-8 text-ink/50 bg-paper/50 rounded-md text-sm sm:text-base">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-ink/90 journal-heading truncate pr-2">{title}</h2>
        {!isAdding && addItem && (
          <HeaderButton onClick={startAdding} className="shrink-0">
            <Plus size={16} className="sm:mr-1" />
            <span className="hidden sm:inline">Add Item</span>
          </HeaderButton>
        )}
      </div>

      {isAdding && addItem && (
        <div className="flex gap-2 mb-4">
          <AutoResizeTextarea
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onSave={handleAddItem}
            onCancel={cancelAdding}
            placeholder={placeholder}
            className="flex-1 text-sm sm:text-base"
            autoFocus
          />
          <div className="shrink-0">
            <ActionButtons
              onSave={handleAddItem}
              onCancel={cancelAdding}
              disabled={!newItem.trim()}
            />
          </div>
        </div>
      )}

      <ul className="space-y-2 sm:space-y-3">
        {items.map(item => (
          <MonthlyListItem
            key={item.id}
            item={item}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            onStartEdit={updateItem ? startEditing : undefined}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={cancelEditing}
            onDelete={deleteItem}
          />
        ))}
      </ul>

      {items.length === 0 && !isAdding && (
        <div className="text-center py-6 sm:py-8 text-ink/50 bg-paper/50 rounded-md text-sm sm:text-base">
          {emptyMessage}
        </div>
      )}
    </div>
  );
}