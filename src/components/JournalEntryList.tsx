'use client';

type JournalEntry = {
  id: string;
  content: string;
  createdAt: string;
};

export function JournalEntryList() {
  const entries: JournalEntry[] = [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Entries</h2>
      {entries.map((entry) => (
        <div key={entry.id} className="border rounded p-4">
          <div className="text-sm text-gray-500">
            {new Date(entry.createdAt).toLocaleDateString()}
          </div>
          <div className="mt-2">{entry.content}</div>
        </div>
      ))}
    </div>
  );
}
