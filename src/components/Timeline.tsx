'use client';

import { motion } from 'framer-motion';
import { FileText, Mic, Code, CheckCircle } from 'lucide-react';
import { TimelineEvent } from '@/types/candidate';

interface TimelineProps {
  events: TimelineEvent[];
}

const getEventIcon = (label: string) => {
  if (label.includes('Application')) return FileText;
  if (label.includes('Interview')) return Mic;
  if (label.includes('Assessment')) return Code;
  if (label.includes('Offer')) return CheckCircle;
  return FileText;
};

const getEventColor = (label: string) => {
  if (label.includes('Application'))
    return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
  if (label.includes('Interview'))
    return 'text-purple-500 bg-purple-100 dark:bg-purple-900/30';
  if (label.includes('Assessment'))
    return 'text-orange-500 bg-orange-100 dark:bg-orange-900/30';
  if (label.includes('Offer'))
    return 'text-green-500 bg-green-100 dark:bg-green-900/30';
  return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
};

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => {
        const Icon = getEventIcon(event.label);
        const colorClasses = getEventColor(event.label);
        const isLast = index === events.length - 1;

        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-start"
          >
            {/* Timeline line */}
            {!isLast && (
              <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200 dark:bg-gray-600" />
            )}

            {/* Icon */}
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${colorClasses}`}
            >
              <Icon className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="ml-4 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {event.label}
                </h4>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {event.date}
                </time>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
