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

  if (!mounted) return null;

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
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 animate-fade-in shadow-inner">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-emerald-100 rounded-full mb-3">
            <span className="text-2xl">✨</span>
          </div>
          <h3 className="text-xl font-semibold text-emerald-900 mb-2">Today's Reflections</h3>
          <p className="text-emerald-700 text-sm">Your thoughts have been captured.</p>
        </div>
        
        <div className="space-y-6 mb-6">
          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-emerald-800 mb-2 flex items-center">
              <span className="mr-2">💡</span> Learning
            </h4>
            <p className="text-emerald-900 whitespace-pre-wrap">{learning}</p>
          </div>
          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-emerald-800 mb-2 flex items-center">
              <span className="mr-2">🌟</span> Enjoyment
            </h4>
            <p className="text-emerald-900 whitespace-pre-wrap">{enjoyment}</p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 focus-ring transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <span className="group-hover:scale-105 transition-transform">✏️</span>
          Edit Entry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <span className="mr-2">💡</span> What did you learn today?
        </label>
        <textarea
          value={learning}
          onChange={(e) => setLearning(e.target.value)}
          required
          placeholder="Share something new you learned today..."
          className="w-full min-h-[120px] p-4 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white bg-opacity-70 backdrop-blur-sm"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <span className="mr-2">🌟</span> What did you enjoy today?
        </label>
        <textarea
          value={enjoyment}
          onChange={(e) => setEnjoyment(e.target.value)}
          required
          placeholder="Share something that brought you joy today..."
          className="w-full min-h-[120px] p-4 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white bg-opacity-70 backdrop-blur-sm"
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
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 focus-ring transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span className="group-hover:scale-105 transition-transform">❌</span>
            Cancel
          </button>
        )}
        <button 
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus-ring transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <span className="group-hover:scale-105 transition-transform">
            {isEditing ? '✨' : '📝'}
          </span>
          {isEditing ? 'Save Changes' : 'Save Entry'}
        </button>
      </div>
    </form>
  );
}
