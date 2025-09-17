// src/pages/jobspage.tsx
'use client';

import { useEffect, useState } from 'react';
import JobTable from '@/components/JobTable';
import { Job } from '@/types/job';
import Modal from '@/components/Modal';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({ title: '', company: '', status: 'Open' });

  // Load jobs
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/jobs?page=1&pageSize=${ITEMS_PER_PAGE}`);
        if (!res.ok) throw new Error('Failed to load jobs');
        const data = await res.json();
        setJobs(data.items);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Archive toggle
  async function handleArchiveToggle(job: Job): Promise<boolean> {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archived: !job.archived }),
      });
      if (!res.ok) return false;
      const updated = await res.json();
      setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, ...updated } : j)));
      return true;
    } catch {
      return false;
    }
  }

  // Reorder
  async function handleReorder(fromOrder: number, toOrder: number): Promise<boolean> {
    try {
      const job = jobs.find((j) => j.order === fromOrder);
      if (!job) return false;
      const res = await fetch(`/api/jobs/${job.id}/reorder`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromOrder, toOrder }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  // Open modal for new job
  function handleNewJob() {
    setEditingJob(null);
    setFormData({ title: '', company: '', status: 'Open' });
    setIsModalOpen(true);
  }

  // Open modal for edit
  function handleEdit(job: Job) {
    setEditingJob(job);
    setFormData({ title: job.title, company: job.company ?? '', status: job.status });
    setIsModalOpen(true);
  }

  // Save (POST or PATCH)
  async function handleSave() {
    try {
      if (!formData.title.trim()) return;

      if (editingJob) {
        // PATCH
        const res = await fetch(`/api/jobs/${editingJob.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to update');
        const updated = await res.json();
        setJobs((prev) => prev.map((j) => (j.id === editingJob.id ? { ...j, ...updated } : j)));
      } else {
        // POST
        const res = await fetch(`/api/jobs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to create');
        const created = await res.json();
        setJobs((prev) => [...prev, created]);
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  }

  if (loading) return <p className="p-6">Loading jobs...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Jobs</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNewJob}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Job
        </motion.button>
      </div>

      <JobTable
        jobs={jobs}
        setJobs={setJobs}
        onEdit={handleEdit}
        onArchiveToggle={handleArchiveToggle}
        onReorder={handleReorder}
      />

      {/* Modal for new/edit job */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingJob ? `Edit Job: ${editingJob.title}` : 'Create New Job'}
      >
        <div className="space-y-4">
          <input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Job title"
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Company"
            className="w-full px-3 py-2 border rounded-md"
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {editingJob ? 'Save' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
