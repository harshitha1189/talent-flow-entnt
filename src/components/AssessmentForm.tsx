'use client';

import { useState } from 'react';
import { Assessment } from '@/types/assessment';

interface AssessmentFormProps {
  assessment: Assessment;
}

export default function AssessmentForm({ assessment }: AssessmentFormProps) {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: '' })); // clear error on change
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    assessment.sections.forEach((section) => {
      section.questions.forEach((q) => {
        const value = responses[q.id];

        if (q.required && !value) {
          newErrors[q.id] = 'This field is required';
        }

        if (q.type === 'numeric' && value) {
          const num = parseFloat(value);
          if (isNaN(num)) {
            newErrors[q.id] = 'Please enter a valid number';
          }
          if (q.validation?.min !== undefined && num < q.validation.min) {
            newErrors[q.id] = `Must be at least ${q.validation.min}`;
          }
          if (q.validation?.max !== undefined && num > q.validation.max) {
            newErrors[q.id] = `Must be at most ${q.validation.max}`;
          }
        }

        if ((q.type === 'short-text' || q.type === 'long-text') && value) {
          if (q.validation?.maxLength && value.length > q.validation.maxLength) {
            newErrors[q.id] = `Must be ${q.validation.maxLength} characters or less`;
          }
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('✅ Responses:', responses);
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {assessment.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {assessment.description}
      </p>

      {assessment.sections.map((section) => (
        <div key={section.id} className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {section.title}
          </h2>

          <div className="space-y-4">
            {section.questions.map((q) => (
              <div key={q.id}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {q.text} {q.required && <span className="text-red-500">*</span>}
                </label>

                {/* Render based on question type */}
                {q.type === 'short-text' && (
                  <input
                    type="text"
                    value={responses[q.id] || ''}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                  />
                )}

                {q.type === 'long-text' && (
                  <textarea
                    value={responses[q.id] || ''}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                    rows={4}
                  />
                )}

                {q.type === 'single-choice' && (
                  <div className="space-y-2">
                    {q.options?.map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={q.id}
                          value={opt}
                          checked={responses[q.id] === opt}
                          onChange={(e) => handleChange(q.id, e.target.value)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}

                {q.type === 'multi-choice' && (
                  <div className="space-y-2">
                    {q.options?.map((opt) => (
                      <label key={opt} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={opt}
                          checked={(responses[q.id]?.split(',') || []).includes(opt)}
                          onChange={(e) => {
                            const current = responses[q.id]?.split(',') || [];
                            if (e.target.checked) {
                              handleChange(q.id, [...current, opt].join(','));
                            } else {
                              handleChange(
                                q.id,
                                current.filter((v) => v !== opt).join(',')
                              );
                            }
                          }}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}

                {q.type === 'numeric' && (
                  <input
                    type="number"
                    value={responses[q.id] || ''}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                  />
                )}

                {q.type === 'file-upload' && (
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleChange(q.id, e.target.files[0].name);
                      }
                    }}
                  />
                )}

                {/* Error message */}
                {errors[q.id] && (
                  <p className="text-sm text-red-500 mt-1">{errors[q.id]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Submit
      </button>
    </div>
  );
}
