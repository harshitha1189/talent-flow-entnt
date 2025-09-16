'use client';

import { motion } from 'framer-motion';
import { Candidate } from '@/types/candidate';

interface StatusBadgeProps {
  stage: Candidate['stage'];
}

const StatusBadge = ({ stage }: StatusBadgeProps) => {
  const getStageStyles = (stage: Candidate['stage']) => {
    switch (stage) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Interviewing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Offered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Hired':
        return 'bg-green-200 text-green-900 dark:bg-green-900/40 dark:text-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStageStyles(stage)}`}>
      {stage}
    </span>
  );
};

interface CandidateTableProps {
  candidates: Candidate[];
  onView: (id: string) => void;
}

export default function CandidateTable({ candidates, onView }: CandidateTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
              Stage
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
              Applied Date
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {candidates.map((candidate) => (
            <motion.tr
              key={candidate.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {candidate.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {candidate.role}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {candidate.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge stage={candidate.stage} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {candidate.appliedDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onView(candidate.id)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 font-medium"
                  aria-label={`View ${candidate.name}'s profile`}
                >
                  View
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
