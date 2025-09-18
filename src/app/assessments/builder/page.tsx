'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

import { Assessment } from '@/types/assessment';
import AssessmentBuilder from '@/components/AssessmentBuilder';
import AssessmentPreview from '@/components/AssessmentPreview';
import { sampleAssessments } from '@/data/assessments';

export default function AssessmentBuilderPage() {
  const [assessment, setAssessment] = useState<Assessment>(sampleAssessments[0]);

  // Load saved assessment from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('current_assessment');
    if (saved) {
      try {
        setAssessment(JSON.parse(saved));
      } catch (err) {
        console.error('Error loading assessment:', err);
      }
    }
  }, []);

  // Save assessment changes to localStorage
  useEffect(() => {
    localStorage.setItem('current_assessment', JSON.stringify(assessment));
  }, [assessment]);

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 space-y-2"
      >
        {/* 🔙 Back Button */}
        <Link
          href="/assessments"
          className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Assessment Builder
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Build and preview technical assessments
          </p>
        </div>
      </motion.div>

      {/* Builder + Preview grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Builder */}
        <AssessmentBuilder
          assessment={assessment}
          onAssessmentChange={setAssessment}
        />

        {/* Right: Preview */}
        <AssessmentPreview assessment={assessment} />
      </div>
    </div>
  );
}
