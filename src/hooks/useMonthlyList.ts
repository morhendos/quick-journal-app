import { useState, useEffect } from 'react';
import { BaseItem } from '@/types/monthly';

export interface MonthlyListActions<T extends BaseItem> {
  addItem?: (text: string) => T | null;
  updateItem?: (id: string, text: string) => void;
  deleteItem?: (id: string) => void;
}

export function useMonthlyList() {
  const [mounted, setMounted] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const startAdding = () => setIsAdding(true);
  
  const cancelAdding = () => {
    setIsAdding(false);
    setNewItem('');
  };

  const startEditing = (item: BaseItem) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  return {
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
  };
}