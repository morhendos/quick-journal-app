# Daily Journal App

A simple, beautiful journaling application that helps users track their daily learnings and enjoyable moments.

## Features

- Daily journal entries with focus on learning and enjoyment
- Clean, modern UI with animations and responsive design
- Local storage persistence
- Data export and import functionality
- Dark/light theme support
- Edit functionality for today's entry
- Chronological entry list

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Lucide Icons
- Local Storage for data persistence

## Project Structure

```
└── src/
    ├── app/              # Next.js app router files
    ├── components/       # React components
    │   ├── journal/     # Journal-specific components
    │   ├── settings/    # Settings and controls
    │   ├── layout/      # Layout components
    │   └── ui/          # Shared UI components
    ├── hooks/           # Custom React hooks
    ├── lib/             # Utility functions and services
    └── types/           # TypeScript type definitions
```

## Development

1. Clone the repository:
```bash
git clone https://github.com/morhendos/quick-journal-app.git
```

2. Install dependencies:
```bash
cd quick-journal-app
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Code Organization

- **Components**: Each component is self-contained with its own styles and logic
- **Types**: Strong TypeScript typing for better development experience
- **Utilities**: Shared functions for data management
- **Storage**: Local storage service with import/export capabilities

## Data Management

### Export Format
```json
{
  "version": "1.0.0",
  "timestamp": "2024-12-25T12:00:00.000Z",
  "entries": [
    {
      "id": "1703505600000",
      "date": "2024-12-25",
      "learning": "...",
      "enjoyment": "..."
    }
  ]
}
```

### Local Storage
- Key: `journal_entries`
- Format: Array of JournalEntry objects
- Sorted by date in descending order

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## Future Enhancements

- MongoDB integration for data persistence
- User authentication
- Rich text editor
- Search and filtering
- Tags and categories
