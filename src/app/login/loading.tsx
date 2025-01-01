import { Section } from '@/components/common/Section'

export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <main className="container mx-auto h-screen px-3 py-4 sm:px-4 sm:py-12 max-w-6xl relative flex items-center justify-center">
        <Section title="" className="min-w-[450px]">
          <div className="w-full max-w-md mx-auto animate-pulse">
            <div className="h-12 w-32 bg-accent/10 rounded-lg mx-auto mb-8" />
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="h-5 w-24 bg-accent/10 rounded mb-2" />
                  <div className="h-10 w-full bg-accent/10 rounded" />
                </div>

                <div>
                  <div className="h-5 w-24 bg-accent/10 rounded mb-2" />
                  <div className="h-10 w-full bg-accent/10 rounded" />
                </div>
              </div>

              <div className="h-12 w-full bg-accent/10 rounded" />
              <div className="h-5 w-48 bg-accent/10 rounded mx-auto" />
            </div>
          </div>
        </Section>
      </main>
    </div>
  )
}