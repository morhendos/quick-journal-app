'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, Plus, X, Pencil, Circle } from 'lucide-react';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { ProjectItem } from '@/types/monthly';

export function MonthlyProjectsList() {
  const {
    getCurrentMonthData,
    addProjectItem,
    updateProjectItem,
    deleteProjectItem
  } = useMonthlyStorage();

  const [mounted, setMounted] = useState(false);
  const [projectItems, setProjectItems] = useState<ProjectItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  
  const newTextareaRef = useRef<HTMLTextAreaElement>(null);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to adjust textarea height
  const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const currentData = getCurrentMonthData();
    setProjectItems(currentData.projectItems || []);
    setMounted(true);
  }, [getCurrentMonthData]);

  // Adjust height when content changes
  useEffect(() => {
    adjustTextareaHeight(newTextareaRef.current);
  }, [newItem]);

  useEffect(() => {
    adjustTextareaHeight(editTextareaRef.current);
  }, [editText]);

  const handleAddItem = () => {
    if (newItem.trim()) {
      const item = addProjectItem(newItem);
      setProjectItems(prev => [item, ...prev]);
      setNewItem('');
      setIsAdding(false);
    }
  };

  const handleStartEdit = (item: ProjectItem) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const handleSaveEdit = () => {
    if (editingId && editText.trim()) {
      updateProjectItem(editingId, editText);
      setProjectItems(prev =>
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      e.preventDefault();
      if (editingId) {
        handleSaveEdit();
      } else {
        handleAddItem();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (editingId) {
        setEditingId(null);
        setEditText('');
      } else {
        setIsAdding(false);
        setNewItem('');
      }
    }
  };

  const handleDeleteItem = (id: string) => {
    deleteProjectItem(id);
    setProjectItems(prev => prev.filter(item => item.id !== id));
  };

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-ink/90">Projects I've Moved Forward</h3>
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
        <h3 className="text-lg font-semibold text-ink/90">Projects I've Moved Forward</h3>
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
          <textarea
            ref={newTextareaRef}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter project progress..."
            className="flex-1 p-2 rounded-md bg-paper
              border border-accent/20
              focus:outline-none focus:border-accent/40
              placeholder:text-muted/40 text-ink/90
              transition-colors duration-200 resize-none
              min-h-[60px] overflow-hidden"
            autoFocus
          />
          <div className="flex flex-col gap-2">
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

      {/* Items list */}
      <ul className="space-y-3">
        {projectItems.map(item => (
          <li
            key={item.id}
            className="group flex items-start gap-3 p-3 rounded-md bg-paper/50 hover:bg-paper transition-colors"
          >
            <Circle 
              size={14} 
              className="flex-shrink-0 mt-1.5 text-accent/70" 
              fill="currentColor" 
              strokeWidth={0}
            />
            
            {editingId === item.id ? (
              <div className="flex gap-2 flex-1">
                <textarea
                  ref={editTextareaRef}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full p-1.5 rounded-md bg-paper
                    border border-accent/20
                    focus:outline-none focus:border-accent/40
                    text-ink/90 leading-relaxed transition-colors duration-200
                    resize-none min-h-[36px] overflow-hidden"
                  autoFocus
                />
                <div className="flex flex-col gap-2">
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
                  className="flex-1 p-1.5 rounded-md border border-transparent
                    hover:bg-paper/80 cursor-pointer transition-colors duration-200
                    whitespace-pre-wrap"
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
      {projectItems.length === 0 && !isAdding && (
        <div className="text-center py-8 text-ink/50 bg-paper/50 rounded-md">
          Start adding your project progress for this month
        </div>
      )}
    </div>
  );
}