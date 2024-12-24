'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed bottom-6 right-6 p-4 rounded-lg
        paper-texture bg-paper journal-shadow
        hover:scale-105 transition-all duration-200
        flex items-center gap-2 text-ink journal-text"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <>
          <span className="text-xl">☀️</span>
          <span className="mr-1">Light Mode</span>
        </>
      ) : (
        <>
          <span className="text-xl">🌙</span>
          <span className="mr-1">Dark Mode</span>
        </>
      )}
    </button>
  );
}
