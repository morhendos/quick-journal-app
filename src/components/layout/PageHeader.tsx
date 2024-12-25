import { ThemeToggle } from '../ThemeToggle';

export function PageHeader() {
  return (
    <div className="mb-16 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div className="flex-1"></div> {/* Spacer */}
        <h1 className="journal-heading text-5xl font-bold text-ink tracking-tight flex-grow text-center">
          Daily Journal
        </h1>
        <div className="flex-1 flex justify-end">
          <ThemeToggle />
        </div>
      </div>
      <p className="text-muted text-lg max-w-2xl mx-auto journal-text leading-relaxed text-center">
        Capture your daily moments of growth and joy. Every reflection is a step toward mindfulness.
      </p>
    </div>
  );
}
