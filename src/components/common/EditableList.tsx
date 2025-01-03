'use client';

import { useState } from 'react';
import { Button } from './Button';
import { cn } from '@/lib/utils';
import { Plus, X, Pen, Check } from 'lucide-react';
import { BaseItem } from '@/types/monthly';

interface EditableListProps {
  items: BaseItem[];
  addItem?: (text: string) => void;
  updateItem?: (id: string, text: string) => void;
  deleteItem?: (id: string) => void;
  emptyMessage?: string;
  placeholder?: string;
}

interface EditableItemProps {
  item: BaseItem;
  onUpdate?: (id: string, text: string) => void;
  onDelete?: (id: string) => void;
}

function EditableItem({ item, onUpdate, onDelete }: EditableItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.text);

  const handleUpdate = () => {
    const trimmedText = editedText.trim();
    if (trimmedText && trimmedText !== item.text && onUpdate) {
      onUpdate(item.id, trimmedText);
    } else {
      setEditedText(item.text); // Reset to original if empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUpdate();
    } else if (e.key === 'Escape') {
      setEditedText(item.text);
      setIsEditing(false);
    }
  };

  return (
    <div className="group relative flex items-start gap-3 p-2 rounded-md hover:bg-paper/50 transition-colors">
      <div className="flex-1">
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={handleKeyDown}
            className="w-full p-1 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-accent/30 rounded"
            rows={1}
            autoFocus
          />
        ) : (
          <p className="whitespace-pre-wrap text-sm sm:text-base text-ink/90 journal-text">
            {item.text}
          </p>
        )}
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {onUpdate && (
          <button
            onClick={() => {
              if (isEditing) {
                handleUpdate();
              } else {
                setIsEditing(true);
              }
            }}
            className={cn(
              'p-1 text-ink/50 hover:text-ink rounded-md transition-colors',
              'hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/30'
            )}
            aria-label={isEditing ? 'Save' : 'Edit'}
          >
            {isEditing ? (
              <Check size={16} strokeWidth={1.5} />
            ) : (
              <Pen size={16} strokeWidth={1.5} />
            )}
          </button>
        )}
        
        {onDelete && (
          <button
            onClick={() => onDelete(item.id)}
            className={cn(
              'p-1 text-ink/50 hover:text-red-500 rounded-md transition-colors',
              'hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500/30'
            )}
            aria-label="Delete"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  );
}

export function EditableList({
  items,
  addItem,
  updateItem,
  deleteItem,
  emptyMessage = 'No items yet',
  placeholder = 'Add new item...'
}: EditableListProps) {
  const [newItemText, setNewItemText] = useState('');
  
  const handleAdd = () => {
    const trimmedText = newItemText.trim();
    if (trimmedText && addItem) {
      addItem(trimmedText);
      setNewItemText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      {items.length > 0 ? (
        <div className="space-y-1">
          {items.map((item) => (
            <EditableItem
              key={item.id}
              item={item}
              onUpdate={updateItem}
              onDelete={deleteItem}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm sm:text-base text-ink/50 journal-text">
          {emptyMessage}
        </p>
      )}

      {addItem && (
        <div className="flex items-start gap-2 mt-4">
          <textarea
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              'flex-1 p-2 min-h-[40px] resize-none rounded-md border border-accent/10',
              'bg-transparent text-sm sm:text-base journal-text placeholder:text-ink/30',
              'focus:outline-none focus:ring-2 focus:ring-accent/30'
            )}
            rows={1}
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={handleAdd}
            disabled={!newItemText.trim()}
            aria-label="Add item"
          >
            <Plus size={20} strokeWidth={1.5} />
          </Button>
        </div>
      )}
    </div>
  );
}