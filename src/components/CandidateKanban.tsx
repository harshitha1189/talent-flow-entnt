'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Candidate } from '@/types/candidate';

interface CandidateKanbanProps {
  candidate: Candidate;
  onStageChange?: (stage: Candidate['stage'], label: string) => void;
}

// ✅ stages aligned with Candidate['stage'] lowercase values
const stages = [
  { key: 'applied' as const, label: 'Application Received', color: 'text-green-400' },
  { key: 'screen' as const, label: 'Screening Interview', color: 'text-yellow-400' },
  { key: 'tech' as const, label: 'Technical Assessment', color: 'text-orange-400' },
  { key: 'offer' as const, label: 'Offer Sent', color: 'text-blue-400' },
  { key: 'hired' as const, label: 'Hired', color: 'text-green-500' },
  { key: 'rejected' as const, label: 'Rejected', color: 'text-red-500' },
];

export default function CandidateKanban({ candidate, onStageChange }: CandidateKanbanProps) {
  const [today, setToday] = useState<string>("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  // ✅ consistent lowercase checks
  const getColumnForStage = () => {
    if (candidate.stage === 'applied') return 0;
    if (candidate.stage === 'screen') return 1;
    if (candidate.stage === 'tech') return 2;
    if (candidate.stage === 'offer') return 3;
    if (candidate.stage === 'hired') return 4;
    if (candidate.stage === 'rejected') return 5;
    return 0;
  };

  const currentColumn = getColumnForStage();

  const getStageStyles = (stage: Candidate['stage']) => {
    switch (stage) {
      case 'applied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'screen':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'tech':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'offer':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'hired':
        return 'bg-green-200 text-green-900 dark:bg-green-900/30 dark:text-green-400';
      case 'rejected':
        return 'bg-red-200 text-red-900 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Candidate Stages</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {stages.map((stage, index) => (
          <div
            key={`${stage.key}-${index}`}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 min-h-[200px]"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className={`font-medium ${stage.color}`}>{stage.label}</h4>
            </div>

            {currentColumn === index && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                layoutId="candidate-card"
                className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                    {candidate.name}
                  </h5>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStageStyles(
                      candidate.stage
                    )}`}
                  >
                    {candidate.stage}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{candidate.role}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {today || "--"}
                </p>

                {onStageChange && (
                  <div className="mt-3 flex gap-1">
                    {/* ← Previous */}
                    {index > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const prevStage = stages[index - 1];
                          onStageChange(prevStage.key, prevStage.label);
                        }}
                        className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                      >
                        ←
                      </motion.button>
                    )}

                    {/* → Next */}
                    {index < stages.length - 1 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const nextStage = stages[index + 1];
                          onStageChange(nextStage.key, nextStage.label);
                        }}
                        className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        →
                      </motion.button>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
