'use client';

import React from 'react';
import {
  Assessment,
  AssessmentSection,
  AssessmentQuestion,
} from '@/types/assessment';
import { motion } from 'framer-motion';

interface AssessmentPreviewProps {
  assessment: Assessment;
}

export default function AssessmentPreview({
  assessment,
}: AssessmentPreviewProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Live Preview
      </h2>

      {assessment.sections.length === 0 && (
        <div className="text-gray-500 dark:text-gray-400 text-center py-10">
          No sections yet. Add some from the builder.
        </div>
      )}

      {assessment.sections.map((section: AssessmentSection) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
            {section.title}
          </h3>
          <div className="space-y-4">
            {section.questions.map((q: AssessmentQuestion) => (
              <div key={q.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {q.text}{' '}
                  {q.required && <span className="text-red-500">*</span>}
                </label>

                {/* Render preview depending on type */}
                {q.type === 'single-choice' && (
                  <div>
                    {(q.options ?? []).map((opt: string, idx: number) => (
                      <label key={idx} className="flex items-center gap-2">
                        <input type="radio" name={q.id} disabled />
                        <span className="text-sm">
                          {opt || `Option ${idx + 1}`}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {q.type === 'multi-choice' && (
                  <div>
                    {(q.options ?? []).map((opt: string, idx: number) => (
                      <label key={idx} className="flex items-center gap-2">
                        <input type="checkbox" disabled />
                        <span className="text-sm">
                          {opt || `Option ${idx + 1}`}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {q.type === 'short-text' && (
                  <input
                    type="text"
                    disabled
                    placeholder={`Short answer...${
                      q.validation?.maxLength
                        ? ` (max ${q.validation.maxLength} chars)`
                        : ''
                    }`}
                    maxLength={q.validation?.maxLength}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                  />
                )}

                {q.type === 'long-text' && (
                  <textarea
                    disabled
                    rows={3}
                    placeholder={`Long answer...${
                      q.validation?.maxLength
                        ? ` (max ${q.validation.maxLength} chars)`
                        : ''
                    }`}
                    maxLength={q.validation?.maxLength}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                  />
                )}

                {q.type === 'numeric' && (
                  <input
                    type="number"
                    disabled
                    placeholder={`Enter number${
                      q.validation?.min !== undefined ||
                      q.validation?.max !== undefined
                        ? ` (${q.validation?.min ?? '-'}–${
                            q.validation?.max ?? '-'
                          })`
                        : ''
                    }`}
                    min={q.validation?.min}
                    max={q.validation?.max}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                  />
                )}

                {q.type === 'file-upload' && (
                  <input
                    type="file"
                    disabled
                    className="block w-full text-sm text-gray-500 dark:text-gray-400"
                  />
                )}

                {/* Validation Hints */}
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 space-y-1">
                  {q.required && <p>⚠️ This question is required</p>}
                  {q.type === 'numeric' &&
                    (q.validation?.min !== undefined ||
                      q.validation?.max !== undefined) && (
                      <p>
                        Range: {q.validation?.min ?? '-'} to{' '}
                        {q.validation?.max ?? '-'}
                      </p>
                    )}
                  {(q.type === 'short-text' || q.type === 'long-text') &&
                    q.validation?.maxLength && (
                      <p>Max length: {q.validation.maxLength} characters</p>
                    )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
