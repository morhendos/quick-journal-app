'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Book, CreditCard, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

interface PageHeaderProps {
  onEntriesUpdate?: () => void;
}

const NAV_ITEMS = [
  { href: '/', label: 'Journal', icon: Book },
  { href: '/monthly', label: 'Monthly', icon: Calendar },
  { href: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
];

export function PageHeader({ onEntriesUpdate }: PageHeaderProps) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="flex items-center justify-between gap-4 flex-wrap">
      <nav className="flex items-center gap-2 flex-wrap">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href}>
              <button
                className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors 
                  ${isActive ? 'bg-accent/10 text-accent hover:bg-accent/15' : 'hover:bg-accent/10'}`}
                onClick={onEntriesUpdate}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span>{label}</span>
              </button>
            </Link>
          );
        })}
      </nav>

      <button
        className="flex items-center gap-2 py-2 px-3 rounded-md transition-colors hover:bg-accent/10"
        onClick={handleSignOut}
      >
        <LogOut size={18} strokeWidth={1.5} />
        <span>Sign Out</span>
      </button>
    </header>
  );
}