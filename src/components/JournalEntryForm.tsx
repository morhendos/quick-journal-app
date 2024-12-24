'use client';

import { useState, useEffect } from 'react';
import { saveEntry, getTodayEntry } from '@/lib/storage';

export function JournalEntryForm() {
  const [learning, setLearning] = useState('');
  const [enjoyment, setEnjoyment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setMounted(true);
    const todayEntry = getTodayEntry();
    if (todayEntry) {
      setLearning(todayEntry.learning);
      setEnjoyment(todayEntry.enjoyment);
      setSubmitted(true);
    }
  }, []);

  // Don't render anything until after mounting to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    saveEntry({
      date: new Date().toISOString().split('T')[0],
      learning,
      enjoyment
    });

    setSubmitted(true);
    setIsEditing(false);
  };

  if (submitted && !isEditing) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium text-green-800 mb-2">✨ Today's Entry</h3>
          <p className="text-green-700">You've completed today's reflection.</p>
        </div>
        
        <div className="space-y-4 mb-4">
          <div>
            <h4 className="text-sm font-medium text-green-800">Learning:</h4>
            <p className="text-green-700 mt-1">{learning}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-green-800">Enjoyment:</h4>
            <p className="text-green-700 mt-1">{enjoyment}</p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Edit Today's Entry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What did you learn today?
        </label>
        <textarea
          value={learning}
          onChange={(e) => setLearning(e.target.value)}
          required
          placeholder="Share something new you learned today..."
          className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What did you enjoy today?
        </label>
        <textarea
          value={enjoyment}
          onChange={(e) => setEnjoyment(e.target.value)}
          required
          placeholder="Share something that brought you joy today..."
          className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex gap-4">
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              const todayEntry = getTodayEntry();
              if (todayEntry) {
                setLearning(todayEntry.learning);
                setEnjoyment(todayEntry.enjoyment);
              }
              setIsEditing(false);
            }}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Cancel
          </button>
        )}
        <button 
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          {isEditing ? 'Save Changes' : 'Save Entry'}
        </button>
      </div>
    </form>
  );
}
