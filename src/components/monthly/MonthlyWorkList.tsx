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
    setWorkItems(currentData.workItems);
    setMounted(true);
  }, [getCurrentMonthData]);

  const handleAddItem = () => {
    if (newItem.trim()) {
      const item = addWorkItem(newItem);
      setWorkItems(prev => [...prev, item]);
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

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, mode: 'add' | 'edit') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      mode === 'add' ? handleAddItem() : handleSaveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      mode === 'add' ? setIsAdding(false) : handleCancelEdit();
      setNewItem('');
    }
  };

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-ink/90">Work I Got Done</h3>
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
        <h3 className="text-lg font-semibold text-ink/90">Work I Got Done</h3>
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

      {/* Add new item form */}
      {isAdding && (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, 'add')}
            placeholder="Enter an accomplishment..."
            className="flex-1 p-2 rounded-md bg-paper
              border border-accent/20
              focus:outline-none focus:border-accent/40
              placeholder:text-muted/40 text-ink/90
              transition-colors duration-200"
            autoFocus
          />
          <button
            onClick={handleAddItem}
            disabled={!newItem.trim()}
            className="p-2 text-accent hover:bg-accent/10 rounded-md transition-colors"
          >
            <Check size={20} />
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setNewItem('');
            }}
            className="p-2 text-ink/70 hover:text-ink/90 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Items list */}
      <ul className="space-y-3">
        {workItems.map(item => (
          <li
            key={item.id}
            className="group flex items-center gap-3 p-3 rounded-md bg-paper/50 hover:bg-paper transition-colors"
          >
            <Circle 
              size={14} 
              className="flex-shrink-0 text-accent/70" 
              fill="currentColor" 
              strokeWidth={0}
            />
            
            {editingId === item.id ? (
              <div className="flex gap-2 flex-1">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, 'edit')}
                    className="w-full min-h-[36px] p-1.5 rounded-md bg-paper
                      border border-accent/20 
                      focus:outline-none focus:border-accent/40
                      text-ink/90 leading-relaxed transition-colors duration-200"
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleSaveEdit}
                  disabled={!editText.trim()}
                  className="p-1 text-accent hover:bg-accent/10 rounded-md transition-colors"
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-1 text-ink/70 hover:text-ink/90 rounded-md transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <>
                <div 
                  onClick={() => handleStartEdit(item)}
                  className="flex-1 min-h-[36px] p-1.5 rounded-md border border-transparent
                    hover:bg-paper/80 cursor-pointer transition-colors duration-200 flex items-center"
                >
                  <span className="text-ink/80 leading-relaxed">{item.text}</span>
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

      {/* Empty state */}
      {workItems.length === 0 && !isAdding && (
        <div className="text-center py-8 text-ink/50 bg-paper/50 rounded-md">
          Start adding your accomplishments for this month
        </div>
      )}
    </div>
  );
}