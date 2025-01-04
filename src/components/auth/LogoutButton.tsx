'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const handleSignOut = async () => {
    try {
      await signOut({ 
        callbackUrl: '/login',
        redirect: true
      });
    } catch (error) {
      console.error('Error signing out:', error);
      window.location.href = '/login';
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center text-sm text-ink/70 hover:text-ink
        transition-colors duration-200 journal-text whitespace-nowrap"
    >
      <LogOut className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
      <span className="ml-1 sm:ml-2">Sign Out</span>
    </button>
  );
}