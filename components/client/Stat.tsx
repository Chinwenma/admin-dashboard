/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Stat {
  title: string;
  value: number;
  icon: any;
}

interface StatsCardsProps {
  stats: Stat[];
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="space-y-6">
      {/* Mobile layout */}
      <div className="flex flex-wrap gap-4 sm:hidden">
        {stats.slice(0, 2).map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="w-[calc(50%-0.5rem)]"
          >
            <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-200 h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.title}
                </CardTitle>
                <item.icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {item.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {stats.slice(2, 4).map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i + 2) * 0.1 }}
            className="w-[calc(50%-0.5rem)]"
          >
            <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-200 h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.title}
                </CardTitle>
                <item.icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {item.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.title}
                </CardTitle>
                <item.icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {item.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
