'use client';

import { motion } from 'framer-motion';
import { Candidate } from '@/types/candidate';

interface StatusBadgeProps {
  stage?: string;
}

const stageLabels: Record<string, string> = {
  applied: 'Applied',
  screen: 'Screening',
  screening: 'Screening',
  tech: 'Technical',
  technical: 'Technical',
  offer: 'Offered',
  offered: 'Offered',
  hired: 'Hired',
  rejected: 'Rejected',
  interviewing: 'Interviewing',
};

const StatusBadge = ({ stage }: StatusBadgeProps) => {
  if (!stage) return null;
  const normalized = stage.toLowerCase().replace(/\s+/g, '');
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${
        normalized === 'applied'
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
          : normalized === 'screen' || normalized === 'screening'
          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
          : normalized === 'tech' || normalized === 'technical'
          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
          : normalized === 'offer' || normalized === 'offered'
          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
          : normalized === 'hired'
          ? 'bg-green-200 text-green-900 dark:bg-green-900/40 dark:text-green-300'
          : normalized === 'rejected'
          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          : normalized === 'interviewing'
          ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      }`}
    >
      {stageLabels[normalized] ?? stage}
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Stage</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Applied Date</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
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
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {candidate.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {candidate.role}
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
