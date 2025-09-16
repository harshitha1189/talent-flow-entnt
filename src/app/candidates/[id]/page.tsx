'use client';

import { useState } from 'react';
import { use } from 'react'; // ✅ unwrap params
import { motion } from 'framer-motion';
import { Mail, FileText, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { candidates } from '@/data/candidates';
import { Candidate } from '@/types/candidate';
import CandidateKanban from '@/components/CandidateKanban';
import Timeline from '@/components/Timeline';

export default function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [candidate, setCandidate] = useState<Candidate | null>(
    candidates.find((c) => c.id === id) || null
  );

  if (!candidate) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[400px] text-center"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Candidate Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The candidate you’re looking for doesn’t exist or has been removed.
        </p>
        <Link
          href="/candidates"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Candidates
        </Link>
      </motion.div>
    );
  }

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  // ✅ handle both stage & timeline update
  const handleStageChange = (newStage: Candidate['stage'], label: string) => {
    setCandidate((prev) => {
      if (!prev) return null;

      const newEvent = {
        id: Date.now().toString(),
        label,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };

      return {
        ...prev,
        stage: newStage,
        timeline: [...prev.timeline, newEvent],
      };
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/candidates"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{candidate.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {candidate.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      const img = e.currentTarget;
                      img.style.display = 'none';

                      const fallback = img.nextElementSibling as HTMLElement | null;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full flex items-center justify-center text-xl font-semibold text-gray-600 dark:text-gray-300 ${
                    candidate.avatar ? 'hidden' : 'flex'
                  }`}
                >
                  {getInitials(candidate.name)}
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {candidate.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-1">Applied for {candidate.role}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Application ID: {candidate.applicationId}
              </p>
            </div>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Resume
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`mailto:${candidate.email}`}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Kanban Board */}
        <div className="lg:col-span-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <CandidateKanban candidate={candidate} onStageChange={handleStageChange} />
          </motion.div>
        </div>
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Timeline</h3>
        <Timeline events={candidate.timeline} />
      </motion.div>
    </motion.div>
  );
}
