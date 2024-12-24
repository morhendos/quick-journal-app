# Daily Journal App

A simple, beautiful journaling application that helps users track their daily learnings and enjoyable moments.

## Features

- Daily journal entries with focus on learning and enjoyment
- Clean, modern UI with animations and responsive design
- Local storage persistence
- Edit functionality for today's entry
- Chronological entry list

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Local Storage for data persistence

## Project Structure

```
└── src/
    ├── app/              # Next.js app router files
    ├── components/       # React components
    │   ├── journal/     # Journal-specific components
    │   └── layout/      # Layout components
    ├── hooks/           # Custom React hooks
    ├── lib/             # Utility functions and services
    └── types/           # TypeScript type definitions
```

## Getting Started

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
- **Hooks**: Custom hooks for shared stateful logic
- **Storage**: Local storage service for data persistence

## Future Enhancements

- MongoDB integration for data persistence
- User authentication
- Rich text editor
- Export functionality
- Search and filtering
- Tags and categories
