import { JournalEntryForm } from '@/components/JournalEntryForm';
import { JournalEntryList } from '@/components/JournalEntryList';
import { PageHeader } from '@/components/layout/PageHeader';
import { ThemeToggle } from '@/components/ThemeToggle';

/**
 * Main page component that renders the journal application
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="container mx-auto px-4 py-12 max-w-6xl relative">
        <PageHeader />

        <div className="grid gap-8 lg:grid-cols-2 mb-20">
          <Section title="Today's Entry">
            <JournalEntryForm />
          </Section>

          <Section title="Previous Entries">
            <JournalEntryList />
          </Section>
        </div>

        <ThemeToggle />
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="paper-texture bg-paper rounded-lg p-8 journal-shadow">
      <h2 className="journal-heading text-2xl font-semibold text-ink mb-8 text-center">
        {title}
      </h2>
      {children}
    </div>
  );
}
