'use client';

import { useState, useEffect } from 'react';
import { Check, Plus, X, Pencil, Circle } from 'lucide-react';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { WorkItem } from '@/types/monthly';

export function MonthlyWorkList() {
  const {
    getCurrentMonthData,
    addWorkItem,
    updateWorkItem,
    deleteWorkItem
  } = useMonthlyStorage();

  const [mounted, setMounted] = useState(false);
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const currentData = getCurrentMonthData();
    // Reverse the initial array so newest items are on top
    setWorkItems(currentData.workItems.reverse());
    setMounted(true);
  }, [getCurrentMonthData]);

  const handleAddItem = () => {
    if (newItem.trim()) {
      const item = addWorkItem(newItem);
      // Add new item at the beginning of the array
      setWorkItems(prev => [item, ...prev]);
      setNewItem('');
      setIsAdding(false);
    }
  };

  const handleStartEdit = (item: WorkItem) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const handleSaveEdit = () => {
    if (editingId && editText.trim()) {
      updateWorkItem(editingId, editText);
      setWorkItems(prev =>
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
    deleteWorkItem(id);
    setWorkItems(prev => prev.filter(item => item.id !== id));
  };

  // ... rest of the component remains the same ...
}