'use client';

import { useState, useEffect } from 'react';
import { Check, Plus, X, Circle } from 'lucide-react';
import { BaseItem } from '@/types/monthly';
import { AutoResizeTextarea } from '@/components/common/AutoResizeTextarea';

interface MonthlyListProps<T extends BaseItem> {
  title: string;
  items: T[];
  addItem: (text: string) => T;
  updateItem: (id: string, text: string) => void;
  deleteItem: (id: string) => void;
  emptyMessage: string;
  placeholder: string;
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
  const [mounted, setMounted] = useState(false);
  const [listItems, setListItems] = useState<T[]>(items);
  const [newItem, setNewItem] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    if (JSON.stringify(items) !== JSON.stringify(listItems)) {
      setListItems(items);
    }
  }, [items]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddItem = () => {
    if (newItem.trim()) {
      const item = addItem(newItem);
      setListItems(prev => [item, ...prev]);
      setNewItem('');
      setIsAdding(false);
    }
  };

  const handleStartEdit = (item: T) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const handleSaveEdit = () => {
    if (editingId && editText.trim()) {
      updateItem(editingId, editText);
      setListItems(prev =>
        prev.map(item =>
          item.id === editingId
            ? { ...item, text: editText.trim(), updatedAt: new Date().toISOString() }
            : item
        )
      );
      setEditingId(null);
      setEditText('');
    }
  };

  const handleDeleteItem = (id: string) => {
    deleteItem(id);
    setListItems(prev => prev.filter(item => item.id !== id));
  };

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-ink/90">{title}</h3>
        </div>
        <div className="text-center py-8 text-ink/50 bg-paper/50 rounded-md">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-ink/90">{title}</h3>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-sm text-ink/70 hover:text-accent transition-colors"
          >
            <Plus size={16} />
            <span>Add Item</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="flex gap-2 mb-4">
          <AutoResizeTextarea
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onSave={handleAddItem}
            onCancel={() => {
              setIsAdding(false);
              setNewItem('');
            }}
            placeholder={placeholder}
            className="flex-1"
            autoFocus
          />
          <div className="flex flex-row gap-2">
            <button
              onClick={handleAddItem}
              disabled={!newItem.trim()}
              className="p-2 text-accent hover:bg-accent/10 rounded-md transition-colors"
              title="Save (⌘+Enter)"
            >
              <Check size={20} />
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewItem('');
              }}
              className="p-2 text-ink/70 hover:text-ink/90 rounded-md transition-colors"
              title="Cancel (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <ul className="space-y-3">
        {(listItems || []).map(item => (
          <li
            key={item.id}
            className="group flex items-start gap-3 p-3 rounded-md bg-paper/50 hover:bg-paper transition-colors"
          >
            <Circle 
              size={14} 
              className="flex-shrink-0 mt-2.5 text-accent/70"
              fill="currentColor" 
              strokeWidth={0}
            />
            
            {editingId === item.id ? (
              <div className="flex gap-2 flex-1">
                <AutoResizeTextarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onSave={handleSaveEdit}
                  onCancel={() => {
                    setEditingId(null);
                    setEditText('');
                  }}
                  className="w-full"
                  autoFocus
                />
                <div className="flex flex-row gap-2">
                  <button
                    onClick={handleSaveEdit}
                    disabled={!editText.trim()}
                    className="p-1 text-accent hover:bg-accent/10 rounded-md transition-colors"
                    title="Save (⌘+Enter)"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditText('');
                    }}
                    className="p-1 text-ink/70 hover:text-ink/90 rounded-md transition-colors"
                    title="Cancel (Esc)"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div 
                  onClick={() => handleStartEdit(item)}
                  className="flex-1 px-2 py-1.5 rounded-md border border-transparent
                    hover:bg-paper/80 cursor-pointer transition-colors duration-200
                    whitespace-pre-wrap"
                >
                  <span className="text-ink/80 leading-normal">{item.text}</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1 text-ink/40 hover:text-ink/70 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {listItems.length === 0 && !isAdding && (
        <div className="text-center py-8 text-ink/50 bg-paper/50 rounded-md">
          {emptyMessage}
        </div>
      )}
    </div>
  );
}