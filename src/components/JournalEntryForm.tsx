'use client';

import { useState } from 'react';

export function JournalEntryForm() {
  const [entry, setEntry] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement MongoDB integration
    setEntry('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your journal entry..."
        className="w-full min-h-[200px] p-2 border rounded"
      />
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Save Entry
      </button>
    </form>
  );
}
