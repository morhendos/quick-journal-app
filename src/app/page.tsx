import { JournalEntryForm } from '@/components/JournalEntryForm';
import { JournalEntryList } from '@/components/JournalEntryList';
import { PageHeader } from '@/components/layout/PageHeader';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <main className="container mx-auto px-3 py-4 sm:px-4 sm:py-12 max-w-6xl relative">
        <PageHeader />

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-2 mb-16">
          <Section title="Today's Entry" className="order-1 lg:order-2">
            <JournalEntryForm />
          </Section>

          <Section title="Previous Entries" className="order-2 lg:order-1">
            <JournalEntryList />
          </Section>
        </div>

        <ThemeToggle />
      </main>
    </div>
  );
}

function Section({ 
  title, 
  children,
  className 
}: { 
  title: string; 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`paper-texture bg-paper rounded-lg p-4 sm:p-8 journal-shadow transition-colors duration-200 ${className}`}>
      <h2 className="journal-heading text-xl sm:text-2xl font-semibold text-ink mb-6 text-center transition-colors">
        {title}
      </h2>
      {children}
    </div>
  );
}