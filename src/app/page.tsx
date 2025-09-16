'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import JobTable from '@/components/JobTable';
import Pagination from '@/components/Pagination';
import Modal from '@/components/Modal';
import { jobs as initialJobs } from '@/data/jobs';
import { Job, FilterState } from '@/types/job';

const ITEMS_PER_PAGE = 5;

export default function JobsPage() {
  const [filters, setFilters] = useState<FilterState>({ search: '', status: '', tags: '' });
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'new'>('new');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialJobs.forEach(j => j.tags.forEach(tag => tags.add(tag)));
    return [...tags].sort();
  }, []);

  const filteredJobs = useMemo(() => {
    return initialJobs.filter(j => {
      const matchesSearch = !filters.search || j.title.toLowerCase().includes(filters.search.toLowerCase()) || j.company?.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = !filters.status || j.status === filters.status;
      const matchesTags = !filters.tags || j.tags.includes(filters.tags);
      return matchesSearch && matchesStatus && matchesTags;
    });
  }, [filters]);

  const paginatedJobs = filteredJobs.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
       <TopBar />

        <main className="flex-1 p-6 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Jobs Board</h1>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setSelectedJob(null); setModalType('new'); setIsModalOpen(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
                <Plus className="w-4 h-4" /> New Job
              </motion.button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border dark:border-gray-700 flex flex-col lg:flex-row gap-4">
              <input value={filters.search} onChange={(e) => setFilters(p => ({ ...p, search: e.target.value }))} placeholder="Search by job title, company..." className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
              <select value={filters.status} onChange={(e) => setFilters(p => ({ ...p, status: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600">
                <option value="">Filter by Status</option><option value="Open">Open</option><option value="Closed">Closed</option>
              </select>
              <select value={filters.tags} onChange={(e) => setFilters(p => ({ ...p, tags: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600">
                <option value="">Filter by Tags</option>{allTags.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <JobTable jobs={paginatedJobs} onView={(j) => { setSelectedJob(j); setModalType('view'); setIsModalOpen(true); }} onEdit={(j) => { setSelectedJob(j); setModalType('edit'); setIsModalOpen(true); }} />

            {filteredJobs.length > 0 && <Pagination currentPage={page} totalPages={totalPages} totalItems={filteredJobs.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setPage} />}
          </motion.div>
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalType === 'new' ? 'Create New Job' : modalType === 'edit' ? 'Edit Job' : `View Job: ${selectedJob?.title}`}>
        <div className="space-y-4">{modalType === 'view' && selectedJob ? (<><p><strong>Job Title:</strong> {selectedJob.title}</p><p><strong>Company:</strong> {selectedJob.company}</p><p><strong>Status:</strong> {selectedJob.status}</p><p><strong>Tags:</strong> {selectedJob.tags.join(', ')}</p></>) : (<><input defaultValue={selectedJob?.title || ''} placeholder="Job title" className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600" /><input defaultValue={selectedJob?.company || ''} placeholder="Company" className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600" /><select defaultValue={selectedJob?.status || 'Open'} className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"><option value="Open">Open</option><option value="Closed">Closed</option></select><textarea placeholder="Description" className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600" /><div className="flex justify-end gap-2"><button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md dark:border-gray-600">Cancel</button><button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-md">{modalType === 'new' ? 'Create' : 'Save'}</button></div></>)}</div>
      </Modal>
    </div>
  );
}



