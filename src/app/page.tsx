import { JournalEntryForm } from '@/components/JournalEntryForm';
import { JournalEntryList } from '@/components/JournalEntryList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Daily Journal
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Capture your daily moments of growth and joy. Every reflection is a step toward mindfulness.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="glass-effect rounded-2xl shadow-xl p-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                ✏️
              </span>
              Today's Entry
            </h2>
            <JournalEntryForm />
          </div>

          <div className="glass-effect rounded-2xl shadow-xl p-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center">
              <span className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">
                📚
              </span>
              Previous Entries
            </h2>
            <JournalEntryList />
          </div>
        </div>
      </main>
    </div>
  );
}
