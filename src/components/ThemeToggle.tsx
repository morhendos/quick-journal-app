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
      className="
        px-3 sm:px-4
        py-2 
        rounded-lg
        bg-paper paper-texture journal-shadow 
        border border-accent/20
        hover:scale-102 active:scale-98 
        transition-all duration-200
        flex items-center gap-2
        text-ink/90 journal-text journal-button
        text-xs sm:text-sm
      "
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={16} className="text-accent" strokeWidth={1.5} />
      ) : (
        <Moon size={16} className="text-accent" strokeWidth={1.5} />
      )}
      <span className="font-medium">
        {theme === 'dark' ? 'Light' : 'Dark'}
        <span className="hidden sm:inline"> Mode</span>
      </span>
    </button>
  );
}
