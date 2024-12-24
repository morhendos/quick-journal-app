import { JournalEntryForm } from '@/components/JournalEntryForm';
import { JournalEntryList } from '@/components/JournalEntryList';
import { PageHeader } from '@/components/layout/PageHeader';

/**
 * Main page component that renders the journal application
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <PageHeader />

        <div className="grid gap-8 lg:grid-cols-2">
          <Section 
            title="Today's Entry"
            icon="✏️"
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          >
            <JournalEntryForm />
          </Section>

          <Section 
            title="Previous Entries"
            icon="📚"
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
          >
            <JournalEntryList />
          </Section>
        </div>
      </main>
    </div>
  );
}

type SectionProps = {
  title: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  children: React.ReactNode;
};

/**
 * Section component for main content areas
 */
function Section({ title, icon, iconBg, iconColor, children }: SectionProps) {
  return (
    <div className="glass-effect rounded-2xl shadow-xl p-8 animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center">
        <span className={`${iconBg} ${iconColor} p-2 rounded-lg mr-3`}>
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}
