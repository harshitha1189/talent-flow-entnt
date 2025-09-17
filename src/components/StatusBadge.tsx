// src/components/StatusBadge.tsx
"use client";

import { JobStatus } from "@/types/job";

interface StatusBadgeProps {
  status: JobStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = (status: JobStatus) => {
    switch (status) {
      case "Open":
        return "bg-green-500/20 text-green-400";
      case "Closed":
        return "bg-gray-500/20 text-gray-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles(
        status
      )}`}
    >
      {status}
    </span>
  );
}
