import { JournalEntry } from '@/types/journal';

// Sample journal entries for demonstration
export const sampleEntries: JournalEntry[] = [
  {
    id: (Date.now() - 172800000).toString(), // 2 days ago
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    learning: "Explored the principles of serverless architecture and its impact on scalability. Started implementing AWS Lambda functions for our microservices architecture. The cost-effectiveness and automatic scaling capabilities are particularly impressive.",
    enjoyment: "Had an engaging architecture review session where the team provided valuable feedback on the new design patterns. The collaborative problem-solving really highlighted the strength of our team dynamics."
  },
  {
    id: (Date.now() - 86400000).toString(), // 1 day ago
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    learning: "Deep-dived into React Server Components and their integration with Next.js 14. The streaming capabilities and improved initial load performance are game-changing for our user experience metrics.",
    enjoyment: "Successfully deployed a major feature with zero downtime. The automated test suite we built last sprint really paid off - caught several edge cases before they reached production."
  }
];