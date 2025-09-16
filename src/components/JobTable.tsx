
'use client';

import { Eye, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import StatusBadge from './StatusBadge';
import TagBadge from './TagBadge';
import { Job } from '@/types/job';

interface JobTableProps {
  jobs: Job[];
  onView: (job: Job) => void;
  onEdit: (job: Job) => void;
}

export default function JobTable({ jobs, onView, onEdit }: JobTableProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table className="w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tags</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {jobs.map((job, index) => (
              <motion.tr
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{job.title}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={job.status} /></td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">{job.tags.map((tag, i) => <TagBadge key={i} tag={tag} />)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => onView(job)} className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      <Eye className="h-4 w-4" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => onEdit(job)} className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                      <Pencil className="h-4 w-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 'use client';

// import { Eye, Pencil } from 'lucide-react';
// import { motion } from 'framer-motion';
// import StatusBadge from './StatusBadge';
// import TagBadge from './TagBadge';
// import { Job } from '@/types/job';

// interface JobTableProps {
//   jobs: Job[];
//   onView: (job: Job) => void;
//   onEdit: (job: Job) => void;
// }

// export default function JobTable({ jobs, onView, onEdit }: JobTableProps) {
//   return (
//     <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//           <thead className="bg-gray-50 dark:bg-gray-800">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 Job Title
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 Tags
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
//             {jobs.map((job, index) => (
//               <motion.tr
//                 key={job.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//               >
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900 dark:text-white">
//                     {job.title}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <StatusBadge status={job.status} />
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex flex-wrap gap-1">
//                     {job.tags.map((tag, tagIndex) => (
//                       <TagBadge key={tagIndex} tag={tag} />
//                     ))}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <div className="flex justify-end gap-2">
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => onView(job)}
//                       className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//                       title="View job"
//                     >
//                       <Eye className="h-4 w-4" />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => onEdit(job)}
//                       className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
//                       title="Edit job"
//                     >
//                       <Pencil className="h-4 w-4" />
//                     </motion.button>
//                   </div>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
