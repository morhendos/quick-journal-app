'use client';

import { useState } from 'react';
import { Check, Plus, X, Pencil } from 'lucide-react';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { WorkItem } from '@/types/monthly';

export function MonthlyWorkList() {
  const {
    getCurrentMonthData,
    addWorkItem,
    updateWorkItem,
    deleteWorkItem
  } = useMonthlyStorage();

  const [newItem, setNewItem] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const currentMonthData = getCurrentMonthData();
  const workItems = currentMonthData.workItems;

  const handleAddItem = () => {
    if (newItem.trim()) {
      addWorkItem(newItem);
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
      setEditingId(null);
      setEditText('');
    }
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
      <ul className="space-y-2">
        {workItems.map(item => (
          <li
            key={item.id}
            className="group flex items-start gap-3 p-3 rounded-md bg-paper/50 hover:bg-paper transition-colors"
          >
            {editingId === item.id ? (
              <div className="flex gap-2 flex-1">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, 'edit')}
                  className="flex-1 p-1 rounded-md bg-paper
                    border border-accent/20
                    focus:outline-none focus:border-accent/40
                    text-ink/90 transition-colors duration-200"
                  autoFocus
                />
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
                <span className="flex-1 text-ink/80">{item.text}</span>
                <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                  <button
                    onClick={() => handleStartEdit(item)}
                    className="p-1 text-ink/40 hover:text-ink/70 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteWorkItem(item.id)}
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