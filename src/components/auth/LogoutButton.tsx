'use client';

import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <button
      className="flex items-center gap-2 text-sm text-ink/70 hover:text-ink
        transition-colors duration-200 journal-text"
    >
      <LogOut size={18} strokeWidth={1.5} />
      <span>Sign Out</span>
    </button>
  );
}