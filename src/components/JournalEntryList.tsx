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
    return <p className="text-gray-500">No entries yet. Start journaling!</p>;
  }

  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <div key={entry.id} className="border rounded p-4">
          <div className="text-sm text-gray-500 mb-4">
            {new Date(entry.date).toLocaleDateString()}
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Learning:</h3>
              <p className="mt-1">{entry.learning}</p>
            </div>
            
            <div>
              <h3 className="font-medium">Enjoyment:</h3>
              <p className="mt-1">{entry.enjoyment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
