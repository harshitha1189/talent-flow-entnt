'use client';

import React from 'react';
import { Plus, Trash2, Type, CheckSquare, Square, FileText, Hash, Upload } from 'lucide-react';
import { Assessment, AssessmentSection, AssessmentQuestion } from '@/types/assessment';
import { motion, AnimatePresence } from 'framer-motion';

interface AssessmentBuilderProps {
  assessment: Assessment;
  onAssessmentChange: (assessment: Assessment) => void;
}

const questionTypes = [
  { id: 'single-choice', label: 'Single Choice', icon: Square },
  { id: 'multi-choice', label: 'Multi Choice', icon: CheckSquare },
  { id: 'short-text', label: 'Short Text', icon: Type },
  { id: 'long-text', label: 'Long Text', icon: FileText },
  { id: 'numeric', label: 'Numeric', icon: Hash },
  { id: 'file-upload', label: 'File Upload', icon: Upload },
];

export default function AssessmentBuilder({ assessment, onAssessmentChange }: AssessmentBuilderProps) {
  const addSection = () => {
    const newSection: AssessmentSection = {
      id: `section_${Date.now()}`,
      title: `Section ${assessment.sections.length + 1}`,
      questions: [],
    };
    onAssessmentChange({ ...assessment, sections: [...assessment.sections, newSection] });
  };

  const addQuestion = (sectionId: string, type: AssessmentQuestion['type']) => {
    const newQuestion: AssessmentQuestion = {
      id: `question_${Date.now()}`,
      type,
      text: '',
      required: false,
      ...(type === 'single-choice' || type === 'multi-choice' ? { options: [''] } : {}),
    };

    onAssessmentChange({
      ...assessment,
      sections: assessment.sections.map(section =>
        section.id === sectionId
          ? { ...section, questions: [...section.questions, newQuestion] }
          : section
      ),
    });
  };

  const updateSection = (sectionId: string, updates: Partial<AssessmentSection>) => {
    onAssessmentChange({
      ...assessment,
      sections: assessment.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      ),
    });
  };

  const updateQuestion = (sectionId: string, questionId: string, updates: Partial<AssessmentQuestion>) => {
    onAssessmentChange({
      ...assessment,
      sections: assessment.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map(q =>
                q.id === questionId ? { ...q, ...updates } : q
              ),
            }
          : section
      ),
    });
  };

  const deleteSection = (sectionId: string) => {
    onAssessmentChange({
      ...assessment,
      sections: assessment.sections.filter(section => section.id !== sectionId),
    });
  };

  const deleteQuestion = (sectionId: string, questionId: string) => {
    onAssessmentChange({
      ...assessment,
      sections: assessment.sections.map(section =>
        section.id === sectionId
          ? { ...section, questions: section.questions.filter(q => q.id !== questionId) }
          : section
      ),
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 border rounded-lg shadow p-4 space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Assessment Title
        </label>
        <input
          type="text"
          value={assessment.title}
          onChange={(e) => onAssessmentChange({ ...assessment, title: e.target.value })}
          className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          placeholder="Enter assessment title..."
        />
      </div>

      {/* Sections */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sections</h3>
          <button
            onClick={addSection}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md"
          >
            <Plus className="w-4 h-4" /> Add Section
          </button>
        </div>

        {assessment.sections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-4 mb-4"
          >
            <div className="flex justify-between items-center mb-3">
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSection(section.id, { title: e.target.value })}
                className="text-lg font-medium w-full px-2 py-1 dark:bg-gray-800 dark:text-white border rounded-md"
                placeholder="Section title..."
              />
              <button
                onClick={() => deleteSection(section.id)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Question Types */}
            <div className="flex flex-wrap gap-2 mb-3">
              {questionTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => addQuestion(section.id, type.id as AssessmentQuestion['type'])}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-md"
                  >
                    <Icon className="w-3 h-3" />
                    {type.label}
                  </button>
                );
              })}
            </div>

            {/* Questions */}
            <AnimatePresence>
              {section.questions.map((q) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="border rounded-md p-3 mb-2 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <textarea
                      value={q.text}
                      onChange={(e) => updateQuestion(section.id, q.id, { text: e.target.value })}
                      className="w-full px-2 py-1 text-sm border rounded-md dark:bg-gray-800 dark:text-white"
                      placeholder="Enter your question..."
                    />
                    <button
                      onClick={() => deleteQuestion(section.id, q.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <input
                        type="checkbox"
                        checked={q.required}
                        onChange={(e) => updateQuestion(section.id, q.id, { required: e.target.checked })}
                      />
                      Required
                    </label>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
