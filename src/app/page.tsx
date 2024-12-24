import { JournalEntryForm } from '@/components/JournalEntryForm';
import { JournalEntryList } from '@/components/JournalEntryList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Daily Journal</h1>
          <p className="text-gray-600">Reflect on your learnings and joys, one day at a time</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Today's Entry</h2>
            <JournalEntryForm />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Previous Entries</h2>
            <JournalEntryList />
          </div>
        </div>
      </main>
    </div>
  );
}
