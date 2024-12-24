'use client';

import { useEffect, useState } from 'react';
import { JournalEntry } from '@/types';
import { getEntries } from '@/lib/storage';

export function JournalEntryList() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEntries(getEntries().sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  }, []);

  if (!mounted) return null;

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
          <span className="text-2xl">📝</span>
        </div>
        <p className="text-gray-600 font-medium mb-1">Your Journal Awaits</p>
        <p className="text-sm text-gray-500">Start your journaling journey today!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
      {entries.map((entry, index) => (
        <div 
          key={entry.id} 
          className="hover-lift rounded-xl border border-gray-100 overflow-hidden animate-slide-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
            <time className="text-sm font-medium text-gray-500">
              {new Date(entry.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          
          <div className="p-5 space-y-4 bg-white">
            <div>
              <h3 className="text-sm font-medium text-gray-900 flex items-center mb-2">
                <span className="mr-2">💡</span> Learning
              </h3>
              <p className="text-gray-600 whitespace-pre-wrap">{entry.learning}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 flex items-center mb-2">
                <span className="mr-2">🌟</span> Enjoyment
              </h3>
              <p className="text-gray-600 whitespace-pre-wrap">{entry.enjoyment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
