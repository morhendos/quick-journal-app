import { JournalEntryForm } from '@/components/JournalEntryForm';
import { JournalEntryList } from '@/components/JournalEntryList';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Quick Journal</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <JournalEntryForm />
        <JournalEntryList />
      </div>
    </main>
  );
}
