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
      className="flex items-center gap-2 text-sm text-ink/70 hover:text-ink
        transition-colors duration-200 journal-text"
    >
      <LogOut size={18} strokeWidth={1.5} />
      <span>Sign Out</span>
    </button>
  );
}