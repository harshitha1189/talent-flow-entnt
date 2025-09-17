'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import CandidateTable from '@/components/CandidateTable';
import CandidateFilters from '@/components/CandidateFilters';
import Pagination from '@/components/Pagination';

import { candidates } from '@/data/candidates';
import { Candidate } from '@/types/candidate';

// --- Types
type SortBy = 'lastUpdated' | 'appliedDate' | 'name';

// --- CSV Export Helper
function exportToCSV(data: Candidate[]) {
  const headers = ['Name', 'Email', 'Stage', 'Role', 'Applied Date'];
  const rows = data.map((c) => [c.name, c.email, c.stage, c.role, c.appliedDate]);
  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

  const link = document.createElement('a');
  link.href = encodeURI(csvContent);
  link.download = 'candidates.csv';
  link.click();
}

export default function CandidatesPage() {
  const router = useRouter();

  // Filters
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('lastUpdated');
  const [stage, setStage] = useState<'all' | Candidate['stage']>('all');

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Add Candidate modal
  const [showForm, setShowForm] = useState(false);

  // --- Filtering (normalized stage comparison)
 
  function normalizeStage(stage: string) {
    return stage.toLowerCase().replace(/\s+/g, '');
  }

  let filtered = candidates.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());

    const matchStage =
      stage === 'all' ||
      normalizeStage(c.stage) === normalizeStage(stage);

    return matchSearch && matchStage;
  });

  // --- Sorting
  if (sortBy === 'appliedDate') {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
    );
  } else if (sortBy === 'name') {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'lastUpdated') {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
    );
  }

  // --- Pagination slice
  const total = filtered.length;
  const totalPages = Math.ceil(total / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginated = filtered.slice(start, end);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="flex-1 p-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Candidates</h1>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" /> Add Candidate
              </button>
            </div>

            {/* Filters */}
            <CandidateFilters
              onSearch={setSearch}
              onSort={(val) => setSortBy(val as SortBy)}
              onExport={() => exportToCSV(filtered)}
              onStageChange={(val) => {
                setStage(val as 'all' | Candidate['stage']);
                setPage(1);
              }}
            />

            {/* Table */}
            <CandidateTable
              candidates={paginated}
              onView={(id) => router.push(`/candidates/${id}`)}
            />

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={total}
              itemsPerPage={rowsPerPage}
              onPageChange={setPage}
            />
          </motion.div>
        </main>
      </div>

      {/* --- Modal Form --- */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Candidate
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Example Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter candidate name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter candidate email"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Role</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter role"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Stage</label>
                <select className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option>Applied</option>
                  <option>Interviewing</option>
                  <option>Hired</option>
                  <option>Rejected</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Candidate
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
