"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/ui/patient-sidebar";
import Header from "@/components/ui/patient-header";
import UserNav from "@/components/ui/patient-nav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CalendarDays, UserPlus, Activity, Stethoscope } from "lucide-react";

export default function PatientDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data
  const stats = [
    {
      title: "Total Patients",
      value: "128",
      icon: UserPlus,
    },
    {
      title: "Upcoming Appointments",
      value: "6",
      icon: CalendarDays,
    },
    {
      title: "Active Consultations",
      value: "3",
      icon: Stethoscope,
    },
    {
      title: "Pending Reports",
      value: "4",
      icon: Activity,
    },
  ];

  const appointments = [
    {
      date: "Nov 3, 2025",
      time: "10:30 AM",
      doctor: "Dr. Jane Smith",
      dept: "Cardiology",
    },
    {
      date: "Nov 5, 2025",
      time: "01:00 PM",
      doctor: "Dr. Alex Johnson",
      dept: "Neurology",
    },
    {
      date: "Nov 8, 2025",
      time: "09:00 AM",
      doctor: "Dr. Olivia Brown",
      dept: "Dermatology",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 mb-25 overflow-y-auto px-6 py-6 space-y-8">
          {/* Dashboard Heading */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Patient Dashboard
            </h1>
            <Button className="bg-black text-white dark:bg-white dark:text-black hover:opacity-80">
              New Appointment
            </Button>
          </div>

          {/* Summary Cards */}
          {/* Summary Cards */}
          <div className="space-y-6">
            {/* Mobile layout: flex 2x2 */}
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

            {/* Desktop layout: grid 4 columns */}
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

          {/* Upcoming Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Upcoming Appointments
            </h2>
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      Date
                    </th>
                    <th className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      Time
                    </th>
                    <th className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      Doctor
                    </th>
                    <th className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      Department
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                        {appt.date}
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                        {appt.time}
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                        {appt.doctor}
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                        {appt.dept}
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
