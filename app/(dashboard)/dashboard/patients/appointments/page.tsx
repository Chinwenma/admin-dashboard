"use client";

import React, { useState } from "react";
import Sidebar from "@/components/ui/patient-sidebar";
import Header from "@/components/ui/patient-header";
import UserNav from "@/components/ui/patient-nav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function PatientAppointmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      date: "Nov 5, 2025",
      time: "10:00 AM",
      doctor: "Dr. Jane Smith",
      dept: "Cardiology",
      status: "Upcoming",
    },
    {
      id: 2,
      date: "Oct 28, 2025",
      time: "2:30 PM",
      doctor: "Dr. Alex Johnson",
      dept: "Dermatology",
      status: "Completed",
    },
    {
      id: 3,
      date: "Nov 10, 2025",
      time: "1:00 PM",
      doctor: "Dr. Olivia Brown",
      dept: "Neurology",
      status: "Pending",
    },
    {
      id: 4,
      date: "Oct 20, 2025",
      time: "3:00 PM",
      doctor: "Dr. John Miller",
      dept: "Orthopedics",
      status: "Cancelled",
    },
  ];

  // Function to get badge color and icon by status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Upcoming":
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
            <CalendarDays className="h-3 w-3 mr-1" /> {status}
          </Badge>
        );
      case "Completed":
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" /> {status}
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="h-3 w-3 mr-1" /> {status}
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200">
            <XCircle className="h-3 w-3 mr-1" /> {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 mb-25 overflow-y-auto px-6 py-6 space-y-8">
          {/* Heading */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Appointments
            </h1>
            <Button className="bg-black text-white dark:bg-white dark:text-black hover:opacity-80">
              + New Appointment
            </Button>
          </div>

          {/* Appointments Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Appointment List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-700 dark:text-gray-300">
                        Date
                      </TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">
                        Time
                      </TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">
                        Doctor
                      </TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">
                        Department
                      </TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">
                        Status
                      </TableHead>
                      <TableHead className="text-right text-gray-700 dark:text-gray-300">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appt) => (
                      <TableRow
                        key={appt.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      >
                        <TableCell className="text-gray-900 dark:text-gray-100">
                          {appt.date}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100">
                          {appt.time}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100">
                          {appt.doctor}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100">
                          {appt.dept}
                        </TableCell>
                        <TableCell>{getStatusBadge(appt.status)}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-sm"
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-sm text-red-600 dark:text-red-400"
                          >
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </main>

        {/* Mobile Bottom Navigation */}
        <UserNav />
      </div>
    </div>
  );
}
