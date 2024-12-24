'use client';

import { useEffect, useState } from 'react';
import { JournalEntry } from '@/types';
import { getEntries } from '@/lib/storage';

export function JournalEntryList() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    setEntries(getEntries().sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  }, []);

  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-2">No entries yet</p>
        <p className="text-sm text-gray-400">Start your journaling journey today!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
      {entries.map((entry) => (
        <div 
          key={entry.id} 
          className="border border-gray-200 rounded-lg p-5 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="text-sm font-medium text-gray-500 mb-4">
            {new Date(entry.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Learning:</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{entry.learning}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Enjoyment:</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{entry.enjoyment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
