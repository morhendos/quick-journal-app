'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type JournalEntry = {
  id: string;
  content: string;
  createdAt: string;
};

export function JournalEntryList() {
  // TODO: Implement entry fetching
  const entries: JournalEntry[] = [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Entries</h2>
      {entries.map((entry) => (
        <Card key={entry.id}>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">
              {new Date(entry.createdAt).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>{entry.content}</CardContent>
        </Card>
      ))}
    </div>
  );
}
