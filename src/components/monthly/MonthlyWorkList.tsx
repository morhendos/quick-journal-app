'use client';

import { useState, useEffect } from 'react';
import { Check, Plus, X, Pencil, Circle } from 'lucide-react';
import { useMonthlyStorage } from '@/hooks/useMonthlyStorage';
import { WorkItem } from '@/types/monthly';

export function MonthlyWorkList() {
  // ... state and handlers remain the same ...

  return (
    <div className="space-y-4">
      {/* ... header and add form remain the same ... */}

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
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, 'edit')}
                  className="flex-1 p-1.5 rounded-md bg-paper
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
                <div 
                  onClick={() => handleStartEdit(item)}
                  className="flex-1 min-h-[36px] p-1.5 rounded-md border border-transparent
                    hover:bg-paper/80 cursor-pointer transition-colors duration-200"
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

      {/* ... empty state remains the same ... */}
    </div>
  );
}