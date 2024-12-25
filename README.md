# Daily Journal App

A modern, minimalist journaling application that helps users track their daily learnings and enjoyable moments. Focus on what matters with a clean interface and intuitive data management.

## Features

### Core Functionality
- Daily journal entries with learning and enjoyment sections
- Edit functionality for today's entry
- Chronological entry list with weekly view
- Local storage for data persistence

### Data Management
- Export journal to JSON with metadata
- Import entries with smart merging
- Data validation and error handling

### User Experience
- Clean, modern UI with animations
- Dark/light theme support
- Responsive design for all devices
- Consistent paper-like styling

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: Local Storage (MongoDB planned)
- **Component Library**: Custom components with shadcn/ui influences

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

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/              # Next.js app router files
├── components/       # React components
│   ├── journal/     # Journal components
│   ├── settings/    # Settings components
│   ├── layout/      # Layout components
│   └── ui/          # Shared UI components
├── hooks/           # Custom React hooks
├── lib/             # Utilities
└── types/           # TypeScript types
```

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
      "learning": "What I learned today...",
      "enjoyment": "What brought me joy..."
    }
  ]
}
```

### Import Features
- Validates data structure and content
- Merges with existing entries
- Newer entries take precedence
- Supports both current and legacy formats

## Development Guidelines

### Component Development
1. Use 'use client' directive for client components
2. Follow existing style patterns
3. Include proper TypeScript types
4. Add JSDoc documentation

### Styling Guidelines
1. Use Tailwind utility classes
2. Follow the paper-like design system
3. Ensure dark mode compatibility
4. Maintain responsive design

## Contributing

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git commit -m "Description of changes"
```

3. Push and create a pull request

## Planned Features

- MongoDB integration
- User authentication
- Rich text editor
- Search and filtering
- Tags and categories
- Data analytics
- Export to different formats

## License

MIT License - See LICENSE file for details
