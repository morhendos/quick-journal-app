import { JournalEntryForm } from '@/components/forms/JournalEntryForm';
import { WeekView } from '@/components/WeekView';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ViewToggle } from '@/components/ViewToggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-ink/90 journal-heading">
            Quick Journal
          </h1>
          <div className="flex gap-4 items-center">
            <ViewToggle />
            <ThemeToggle />
          </div>
        </div>
        
        <WeekView />
        
        <div className="bg-paper rounded-lg p-6 journal-shadow">
          <JournalEntryForm />
        </div>
      </div>
    </main>
  );
}
