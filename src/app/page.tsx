import { JournalEntryForm } from '@/components/JournalEntryForm';
import { JournalEntryList } from '@/components/JournalEntryList';
import { PageHeader } from '@/components/layout/PageHeader';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <main className="container mx-auto px-4 py-12 max-w-6xl relative">
        <PageHeader />

        <div className="grid gap-8 lg:grid-cols-2 mb-20">
          <Section title="Previous Entries">
            <JournalEntryList />
          </Section>

          <Section title="Today's Entry">
            <JournalEntryForm />
          </Section>
        </div>

        <ThemeToggle />
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="paper-texture bg-paper rounded-lg p-8 journal-shadow transition-colors duration-200">
      <h2 className="journal-heading text-2xl font-semibold text-ink mb-8 text-center transition-colors">
        {title}
      </h2>
      {children}
    </div>
  );
}