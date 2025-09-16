interface StatusBadgeProps {
  status: 'Open' | 'Closed';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isOpen = status === 'Open';
  
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isOpen
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      }`}
    >
      {status}
    </span>
  );
}
