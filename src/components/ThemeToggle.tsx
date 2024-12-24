'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

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
        bg-paper paper-texture journal-shadow border border-accent/20
        hover:scale-102 active:scale-98 transition-all duration-200
        flex items-center gap-3 text-ink/90 journal-text journal-button"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-accent" strokeWidth={1.5} />
      ) : (
        <Moon size={20} className="text-accent" strokeWidth={1.5} />
      )}
      <span className="font-medium">
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}