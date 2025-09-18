'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { sampleAssessments } from '@/data/assessments';
import { Assessment, AssessmentQuestion } from '@/types/assessment';

export default function TakeAssessmentPage() {
  const params = useParams();
  const id = (params?.id as string) || '';

  // Find matching assessment
  const assessment: Assessment | undefined = sampleAssessments.find(
    (a) => a.id === id
  );

  // Flatten questions across all sections
  const allQuestions: AssessmentQuestion[] = assessment
    ? assessment.sections.flatMap((s) => s.questions)
    : [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!assessment) {
    return <div className="p-6">❌ Assessment not found</div>;
  }

  const question = allQuestions[currentQuestion];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSubmitted(true);
      console.log('Submitted answers:', answers);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-green-600">✅ Submitted!</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Thank you for completing the assessment.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        {assessment.title}
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-medium">
          Q{currentQuestion + 1}. {question.text}
        </h2>

        {/* Render inputs depending on question type */}
        <div className="space-y-2">
          {(question.options ?? []).map((opt: string) => (
            <label
              key={opt}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                value={opt}
                checked={answers[question.id] === opt}
                onChange={() => handleAnswer(opt)}
              />
              {opt}
            </label>
          ))}

          {question.type === 'short-text' && (
            <input
              type="text"
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
            />
          )}

          {question.type === 'long-text' && (
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
              rows={4}
            />
          )}

          {question.type === 'numeric' && (
            <input
              type="number"
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
            />
          )}
        </div>

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {currentQuestion < allQuestions.length - 1 ? 'Next' : 'Submit'}
        </button>
      </div>
    </div>
  );
}
