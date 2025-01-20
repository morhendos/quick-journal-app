'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarDays, BookOpen, CreditCard } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      <Link
        href="/"
        className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent
          ${pathname === '/' ? 'text-accent' : 'text-ink/70'}`}
      >
        <BookOpen size={18} strokeWidth={1.5} />
        <span>Daily Journal</span>
      </Link>
      <Link
        href="/monthly"
        className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent
          ${pathname === '/monthly' ? 'text-accent' : 'text-ink/70'}`}
      >
        <CalendarDays size={18} strokeWidth={1.5} />
        <span>Monthly Review</span>
      </Link>
      <Link
        href="/subscriptions"
        className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent
          ${pathname === '/subscriptions' ? 'text-accent' : 'text-ink/70'}`}
      >
        <CreditCard size={18} strokeWidth={1.5} />
        <span>Subscriptions</span>
      </Link>
    </nav>
  );
}