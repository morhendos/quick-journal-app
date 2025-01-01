'use client';

import { useState } from 'react';
import { Check, Plus, X } from 'lucide-react';

interface WorkItem {
  id: string;
  text: string;
}

export function MonthlyWorkList() {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddItem = () => {
    if (newItem.trim()) {
      setWorkItems(prev => [...prev, { id: Date.now().toString(), text: newItem.trim() }]);
      setNewItem('');
      setIsAdding(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setWorkItems(prev => prev.filter(item => item.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddItem();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
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
            onKeyDown={handleKeyPress}
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
            <span className="flex-1 text-ink/80">{item.text}</span>
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="opacity-0 group-hover:opacity-100 p-1 text-ink/40 hover:text-ink/70 transition-all"
            >
              <X size={16} />
            </button>
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
