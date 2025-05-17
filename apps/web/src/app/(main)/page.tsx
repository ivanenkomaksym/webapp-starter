import Link from 'next/link';
import { topicsConfig } from '@/lib/topics-config';

function MainPage() {
  return (
    <main className="flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Generative Consultant</h1>
      <p className="mb-8 text-center text-base text-muted-foreground max-w-md">
        Accelerate your workflow with AI-powered tools for email writing, market research, content creation, and more. Select a topic to get started.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {topicsConfig.map((topic) => (
          <Link
            key={topic.id}
            href={`/${topic.id}`}
            className="rounded-xl border border-border bg-background p-8 flex flex-col items-center justify-center text-center transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <span className="text-lg font-medium mb-2">{topic.label}</span>
            <span className="text-sm text-muted-foreground">{topic.description}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default MainPage; 