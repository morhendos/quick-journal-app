# Journal App Components

## UI Components

### `IconButton`
A reusable button component for icon-based actions.

```typescript
interface IconButtonProps {
  icon: LucideIcon;     // Lucide icon component
  size?: number;        // Icon size in pixels (default: 20)
  strokeWidth?: number; // Icon stroke width (default: 1.5)
  className?: string;   // Additional CSS classes
  // ... extends HTML button props
}
```

Features:
- Consistent styling across the app
- Paper texture and shadow effects
- Hover and active states
- Accessibility support

## Settings Components

### `HeaderControls`
Manages the header control buttons (export, import, theme).

Features:
- Theme toggle with system preference support
- Journal export functionality
- Journal import with validation
- Toast notifications for user feedback

Usage:
```tsx
<HeaderControls />
```

## Layout Components

### `PageHeader`
Main header component containing the app title and controls.

Features:
- Responsive layout
- Balanced design with fixed-width containers
- Animated fade-in effect

Usage:
```tsx
<PageHeader />
```

## Best Practices

### Component Guidelines
1. Use 'use client' directive for components using hooks or browser APIs
2. Maintain consistent styling using shared components
3. Handle loading and error states appropriately
4. Include proper accessibility attributes

### State Management
1. Use local state for UI-specific state
2. Leverage localStorage for data persistence
3. implement proper error boundaries

### Styling
1. Use Tailwind utilities consistently
2. Follow the established design system
3. Maintain responsive design principles
