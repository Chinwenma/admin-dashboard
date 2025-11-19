"use client";

import React, { useState } from "react";
import Sidebar from "@/components/ui/doctor-sidebar";
import Header from "@/components/ui/doctor-header";
import UserNav from "@/components/ui/doctor-nav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Stethoscope, Users, CalendarDays, Activity } from "lucide-react";

export default function DoctorDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock stats data
  const stats = [
    { title: "Total Doctors", value: "142", icon: Users },
    { title: "Active Consultations", value: "37", icon: Stethoscope },
    { title: "Appointments Today", value: "24", icon: CalendarDays },
    { title: "Pending Reports", value: "8", icon: Activity },
  ];

  // Mock recent activities
  const activities = [
    { id: 1, doctor: "Dr. Sarah Adams", action: "Completed a consultation", time: "2 hrs ago" },
    { id: 2, doctor: "Dr. Michael Chen", action: "Updated patient records", time: "3 hrs ago" },
    { id: 3, doctor: "Dr. Jane Doe", action: "Scheduled new appointment", time: "5 hrs ago" },
    { id: 4, doctor: "Dr. Ahmed Ali", action: "Submitted lab report", time: "6 hrs ago" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 mb-20 overflow-y-auto px-6 py-6 space-y-8">
          {/* Heading */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Doctor Dashboard
            </h1>
            <Button className="bg-black text-white dark:bg-white dark:text-black hover:opacity-80">
              Add New Doctor
            </Button>
          </div>

          {/* Stats Section */}
          <div className="space-y-6">
            {/* Mobile 2x2 layout */}
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

            {/* Desktop layout: grid */}
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

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Recent Activities
            </h2>
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      Doctor
                    </th>
                    <th className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      Action
                    </th>
                    <th className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr
                      key={activity.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100 font-medium">
                        {activity.doctor}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        {activity.action}
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                        {activity.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

        </main>

        {/* Mobile Bottom Navigation */}
        <UserNav />
      </div>
    </div>
  );
}
