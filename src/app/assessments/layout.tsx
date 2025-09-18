// app/assessments/layout.tsx
'use client';

import Sidebar from '@/components/Sidebar';

export default function AssessmentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
