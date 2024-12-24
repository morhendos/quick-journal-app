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
      className="fixed bottom-8 right-8 px-6 py-3 rounded-lg
        bg-paper paper-texture shadow-lg border border-accent/20
        hover:scale-105 active:scale-95 transition-all duration-200
        flex items-center gap-3 text-ink/90 journal-text"
      aria-label="Toggle theme"
    >
      <span className="text-2xl">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
      <span className="font-medium">
        {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
      </span>
    </button>
  );
}
