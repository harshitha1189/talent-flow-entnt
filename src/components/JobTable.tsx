'use client';

import { Eye, Pencil, Archive, ArchiveRestore } from 'lucide-react';
import { motion } from 'framer-motion';
import StatusBadge from './StatusBadge';
import TagBadge from './TagBadge';
import { Job } from '@/types/job';
import { Dispatch, SetStateAction } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

export interface JobTableProps {
  jobs: Job[];
  setJobs: Dispatch<SetStateAction<Job[]>>;  
  onView?: (job: Job) => void;
  onEdit?: (job: Job) => void;
  onArchiveToggle?: (job: Job) => Promise<boolean>;
  onReorder?: (fromOrder: number, toOrder: number) => Promise<boolean>;
}


const noop = async () => true;

export default function JobTable({
  jobs,
  setJobs,
  onView,
  onEdit,
  onArchiveToggle = noop,
  onReorder = async () => true,
}: JobTableProps) {
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const fromIndex = result.source.index;
    const toIndex = result.destination.index;
    if (fromIndex === toIndex) return;

    const oldJobs = [...jobs];
    const updatedJobs = [...jobs];

    // optimistic reorder
    const [moved] = updatedJobs.splice(fromIndex, 1);
    updatedJobs.splice(toIndex, 0, moved);
    setJobs(updatedJobs);

    try {
      const success = await onReorder(moved.order, updatedJobs[toIndex].order);
      if (!success) throw new Error('Reorder failed');
    } catch (err) {
      console.error('Rollback reorder due to API error:', err);
      setJobs(oldJobs);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden w-full">
      <div className="overflow-x-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="jobs">
            {(provided) => (
              <table
                className="w-full table-auto divide-y divide-gray-200 dark:divide-gray-700"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {jobs.map((job, index) => (
                    <Draggable key={job.id} draggableId={job.id} index={index}>
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          {/* Job Title */}
                          <motion.td
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {job.title}
                            </span>
                          </motion.td>

                          {/* Status (Open / Closed / Archived) */}
                          <motion.td
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            <StatusBadge status={job.status} />

                          </motion.td>

                          {/* Tags */}
                          <motion.td
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-6 py-4"
                          >
                            <div className="flex flex-wrap gap-1">
                              {job.tags.map((tag, i) => (
                                <TagBadge key={i} tag={tag} />
                              ))}
                            </div>
                          </motion.td>

                          {/* Actions */}
                          <motion.td
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-6 py-4 whitespace-nowrap text-right"
                          >
                            <div className="flex justify-end gap-2">
                              {/* View */}
                              {onView && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => onView(job)}
                                  className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                  title="View Job"
                                >
                                  <Eye className="h-4 w-4" />
                                </motion.button>
                              )}

                              {/* Edit */}
                              {onEdit && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => onEdit(job)}
                                  className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                                  title="Edit Job"
                                >
                                  <Pencil className="h-4 w-4" />
                                </motion.button>
                              )}

                              {/* Archive / Unarchive */}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onArchiveToggle(job)}
                                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                title={job.archived ? 'Unarchive Job' : 'Archive Job'}
                              >
                                {job.archived ? (
                                  <ArchiveRestore className="h-4 w-4" />
                                ) : (
                                  <Archive className="h-4 w-4" />
                                )}
                              </motion.button>
                            </div>
                          </motion.td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
