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
        fixed sm:bottom-8 sm:right-8 
        bottom-4 right-4
        px-3 sm:px-6 
        py-2 sm:py-3 
        rounded-lg
        bg-paper paper-texture journal-shadow 
        border border-accent/20
        hover:scale-102 active:scale-98 
        transition-all duration-200
        flex items-center gap-2 sm:gap-3 
        text-ink/90 journal-text journal-button
        text-xs sm:text-base
      "
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={16} className="text-accent sm:size-5" strokeWidth={1.5} />
      ) : (
        <Moon size={16} className="text-accent sm:size-5" strokeWidth={1.5} />
      )}
      <span className="font-medium">
        {theme === 'dark' ? 'Light' : 'Dark'}
        <span className="hidden sm:inline"> Mode</span>
      </span>
    </button>
  );
}
