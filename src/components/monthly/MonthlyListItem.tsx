'use client';

import { Circle, X } from 'lucide-react';
import { BaseItem } from '@/types/monthly';
import { AutoResizeTextarea } from '@/components/common/AutoResizeTextarea';
import { ActionButtons } from './MonthlyListButtons';
import { cn } from '@/lib/utils';

interface MonthlyListItemProps<T extends BaseItem> {
  item: T;
  editingId: string | null;
  editText: string;
  setEditText: (text: string) => void;
  onStartEdit?: (item: T) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete?: (id: string) => void;
}

export function MonthlyListItem<T extends BaseItem>({
  item,
  editingId,
  editText,
  setEditText,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete
}: MonthlyListItemProps<T>) {
  const isEditing = editingId === item.id;

  return (
    <li className="group flex items-start gap-3 p-3 rounded-md bg-paper/50 hover:bg-paper transition-colors">
      <Circle 
        size={14} 
        className="flex-shrink-0 mt-2.5 text-accent/70"
        fill="currentColor" 
        strokeWidth={0}
      />
      
      {isEditing ? (
        <div className="flex gap-2 flex-1">
          <AutoResizeTextarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onSave={onSaveEdit}
            onCancel={onCancelEdit}
            className="w-full"
            autoFocus
          />
          <ActionButtons
            onSave={onSaveEdit}
            onCancel={onCancelEdit}
            disabled={!editText.trim()}
            size="small"
          />
        </div>
      ) : (
        <>
          <div 
            onClick={onStartEdit ? () => onStartEdit(item) : undefined}
            className={cn(
              "flex-1 px-2 py-1.5 rounded-md border border-transparent whitespace-pre-wrap",
              onStartEdit && "hover:bg-paper/80 cursor-pointer transition-colors duration-200"
            )}
          >
            <span className="text-ink/80 leading-normal">{item.text}</span>
          </div>
          {onDelete && (
            <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
              <button
                onClick={() => onDelete(item.id)}
                className="p-1 text-ink/40 hover:text-ink/70 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </li>
  );
}