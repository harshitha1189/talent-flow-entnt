'use client';

import { motion } from 'framer-motion';
import { Briefcase, Users, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/' },
  { id: 'candidates', label: 'Candidates', icon: Users, href: '/candidates' },
  { id: 'assessments', label: 'Assessments', icon: BarChart3, href: '/assessments' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;

    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">TalentFlow</h2>
      </div>

      <nav className="px-4 space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.id} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
