'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils';
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
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'gap-2',
                  isActive && 'bg-accent/10 text-accent hover:bg-accent/15'
                )}
                onClick={onEntriesUpdate}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span>{label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={handleSignOut}
      >
        <LogOut size={18} strokeWidth={1.5} />
        <span>Sign Out</span>
      </Button>
    </header>
  );
}