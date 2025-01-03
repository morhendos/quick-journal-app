# Daily Journal App

A modern, minimalist journaling application that helps users track their daily learnings and enjoyable moments, with monthly reviews. Focus on what matters with a clean interface and intuitive data management.

## Features

### Core Functionality
- Daily journal entries with learning and enjoyment sections
- Monthly reviews with multiple categories
- Edit functionality with optional empty entries to remove them
- Chronological entry list with weekly view
- Interactive week overview with multi-week navigation
- Local storage for data persistence
- User authentication (email/password)

### Navigation
- Weekly calendar with entry indicators
- Past weeks navigation with date range display
- Current week quick access
- Monthly review navigation with month selection
- Prevention of future entries

### Monthly Reviews
- Work accomplishments tracking
- Project updates and progress
- Learning and personal growth
- Health and wellness monitoring
- Life events documentation
- Future hopes and aspirations
- Import/export functionality

### Data Management
- Export journal and monthly reviews to JSON with metadata
- Import entries with smart merging
- Data validation and error handling
- Secure user data isolation

### User Experience
- Clean, modern UI with animations
- Dark/light theme support
- Responsive design for all devices
- Consistent paper-like styling
- Loading states with skeleton UI
- Client-side form validation

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: Local Storage (MongoDB planned)
- **Auth**: NextAuth.js with Credentials provider
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

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your settings
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/              # Next.js app router files
│   ├── api/         # API routes
│   ├── auth/        # Authentication pages
│   ├── monthly/     # Monthly review pages
│   └── login/       # Login page
├── components/       # React components
│   ├── auth/        # Authentication components
│   ├── journal/     # Journal components
│   ├── monthly/     # Monthly review components
│   ├── overview/    # Overview components
│   ├── settings/    # Settings components
│   ├── layout/      # Layout components
│   └── ui/          # Shared UI components
├── contexts/        # React contexts
├── config/          # Configuration files
├── hooks/           # Custom React hooks
├── lib/             # Utilities and configurations
│   ├── auth/        # Authentication utilities
│   └── storage/     # Storage utilities
└── types/           # TypeScript types
```

## Data Management

### Journal Export Format
```json
{
  "version": "1.0.0",
  "timestamp": "2024-12-25T12:00:00.000Z",
  "userId": "user123",
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

### Monthly Review Export Format
```json
{
  "version": "1.0",
  "exportDate": "2024-12-25T12:00:00.000Z",
  "data": [
    {
      "month": "2024-12",
      "workItems": [],
      "projectItems": [],
      "learningItems": [],
      "healthItems": [],
      "lifeEventItems": [],
      "learningToRememberItems": [],
      "hopeItems": []
    }
  ]
}
```

### Import Features
- Validates data structure and content
- Merges with existing entries
- Newer entries take precedence
- Supports both current and legacy formats
- User data isolation
- Array validation for monthly reviews

## Development Guidelines

### Component Development
1. Use 'use client' directive for client components
2. Follow existing style patterns
3. Include proper TypeScript types
4. Add JSDoc documentation
5. Implement loading states
6. Handle errors gracefully
7. Use shared components for consistency

### Code Organization
1. Use config files for feature configuration
2. Implement factory patterns for similar functionality
3. Create shared hooks for common logic
4. Extract UI components for reusability
5. Follow DRY and SOLID principles

### Styling Guidelines
1. Use Tailwind utility classes
2. Follow the paper-like design system
3. Ensure dark mode compatibility
4. Maintain responsive design
5. Add loading skeletons for better UX

### Authentication Guidelines
1. Always wrap useSearchParams with Suspense
2. Implement proper loading states
3. Handle auth errors gracefully
4. Use form validation
5. Add appropriate security headers

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

## Testing

1. Run the test suite:
```bash
npm test
```

2. Local development testing:
```bash
npm run dev
npm run build # Ensure production build works
```

## Environment Variables

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
NODE_ENV=development
```

## Planned Features

- [x] User authentication
- [x] Interactive week overview
- [x] Multi-week navigation
- [x] Monthly reviews
- [ ] MongoDB integration
- [ ] Rich text editor
- [ ] Search and filtering
- [ ] Tags and categories
- [ ] Data analytics
- [ ] Export to different formats

## Troubleshooting

### Common Issues
1. Build errors with useSearchParams
   - Wrap components using useSearchParams in Suspense
   - Add loading states

2. Authentication errors
   - Check environment variables
   - Ensure proper NextAuth configuration

3. Monthly review storage issues
   - Clear localStorage if data becomes corrupted
   - Check array initialization in monthly data

## License

MIT License - See LICENSE file for details