'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const roles = [
  { id: 'frontend', title: 'Frontend Developer', icon: '🎨' },
  { id: 'backend', title: 'Backend Engineer', icon: '⚙️' },
  { id: 'ux', title: 'UX Designer', icon: '✏️' },
  { id: 'pm', title: 'Product Manager', icon: '🚀' },
];

export default function AssessmentsLanding() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create a New Assessment
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Select a job role to start building a tailored assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roles.map((role) => (
          <motion.div
            key={role.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm"
          >
            <div className="text-3xl mb-4">{role.icon}</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {role.title}
            </h3>
            <Link
              href={`/assessments/builder?role=${role.id}`}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              Start Building →
            </Link>
          </motion.div>
        ))}
      </div>

      <div>
        <Link
          href="/assessments/builder"
          className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
        >
          Or, create a new role from scratch
        </Link>
      </div>
    </div>
  );
}
