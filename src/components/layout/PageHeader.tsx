/**
 * Main page header with title and description
 */
export function PageHeader() {
  return (
    <div className="text-center mb-16 animate-fade-in">
      <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
        Daily Journal
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Capture your daily moments of growth and joy. Every reflection is a step toward mindfulness.
      </p>
    </div>
  );
}
