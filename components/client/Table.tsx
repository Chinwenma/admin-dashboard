// components/dashboard/RecentUsersTable.tsx
"use client";

import { motion } from "framer-motion";

interface User {
  id: string;
  email: string;
  createdAt: Date;
}

interface RecentUsersTableProps {
  users: User[];
}

export default function RecentUsersTable({ users }: RecentUsersTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Recent Users
      </h2>
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-4 py-3 text-gray-700 dark:text-gray-300">Email</th>
              <th className="px-4 py-3 text-gray-700 dark:text-gray-300">Joined At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
              
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {user.email}
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
