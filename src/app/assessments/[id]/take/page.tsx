'use client';

import { useParams } from 'next/navigation';
import { sampleAssessments } from '@/data/assessments';
import AssessmentForm from '@/components/AssessmentForm';

export default function TakeAssessmentPage() {
 
  const params = useParams() as { id: string };
  const id = params.id;

  const assessment = sampleAssessments.find(a => a.id === id);

  if (!assessment) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Assessment not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <AssessmentForm assessment={assessment} />
    </div>
  );
}
