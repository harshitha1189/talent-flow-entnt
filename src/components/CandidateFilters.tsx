'use client';

import { useState } from 'react';

interface CandidateFiltersProps {
  onSearch: (query: string) => void;
  onSort: (value: string) => void;
  onExport: () => void;
  onStageChange: (stage: string) => void; 
}

export default function CandidateFilters({
  onSearch,
  onSort,
  onExport,
  onStageChange,
}: CandidateFiltersProps) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const tabs = ['all', 'Applied', 'Interviewing', 'Hired', 'Rejected'];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
      {/* Tabs */}
      <div className="flex gap-2 mb-2 sm:mb-0">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              onStageChange(tab);
            }}
            className={`px-3 py-1 text-sm rounded-full ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
            }`}
          >
            {tab === 'all' ? 'All Candidates' : tab}
          </button>
        ))}
      </div>

      {/* Search + Sort + Export */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search by name, email, or keyword..."
          className="px-3 py-1 text-sm rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />

        <select
          onChange={(e) => onSort(e.target.value)}
          className="px-3 py-1 text-sm rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="lastUpdated">Sort By: Last Updated</option>
          <option value="appliedDate">Applied Date</option>
          <option value="name">Name</option>
        </select>

        <button
          onClick={onExport}
          className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Export to CSV
        </button>
      </div>
    </div>
  );
}
