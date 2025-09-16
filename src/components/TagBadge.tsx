interface TagBadgeProps {
  tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
  const getTagColor = (tag: string) => {
    const colors = {
      'Engineering': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Remote': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Product': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'Design': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      'Analytics': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      'Full-time': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Marketing': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'Frontend': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
      'Sales': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'Testing': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
    return (
      colors[tag as keyof typeof colors] ||
      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    );
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getTagColor(
        tag
      )}`}
    >
      {tag}
    </span>
  );
}
