'use client';

import { useState } from 'react';
import { saveEntry, hasEntryForToday } from '@/lib/storage';

export function JournalEntryForm() {
  const [learning, setLearning] = useState('');
  const [enjoyment, setEnjoyment] = useState('');
  const [submitted, setSubmitted] = useState(hasEntryForToday());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    saveEntry({
      date: new Date().toISOString().split('T')[0],
      learning,
      enjoyment
    });

    setLearning('');
    setEnjoyment('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-4 bg-green-50 rounded">
        <p className="text-green-800">Thanks for your entry today! Come back tomorrow.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 font-medium">What did you learn today?</label>
        <textarea
          value={learning}
          onChange={(e) => setLearning(e.target.value)}
          required
          className="w-full min-h-[100px] p-2 border rounded"
        />
      </div>
      
      <div>
        <label className="block mb-2 font-medium">What did you enjoy today?</label>
        <textarea
          value={enjoyment}
          onChange={(e) => setEnjoyment(e.target.value)}
          required
          className="w-full min-h-[100px] p-2 border rounded"
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Save Today's Entry
      </button>
    </form>
  );
}
