"use client";

import React, { useState } from "react";
import Sidebar from "@/components/ui/doctor-sidebar";
import Header from "@/components/ui/doctor-header";
import UserNav from "@/components/ui/doctor-nav";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  User,
  Stethoscope,
  Building,
} from "lucide-react";

interface Schedule {
  id: number;
  doctor: string;
  specialty: string;
  patient: string;
  date: string;
  time: string;
  location: string;
  status: "Upcoming" | "Completed" | "Cancelled";
}

export default function DoctorSchedulesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock Data
  const [schedules] = useState<Schedule[]>([
    {
      id: 1,
      doctor: "Dr. Sarah Adams",
      specialty: "Cardiology",
      patient: "John Doe",
      date: "2025-11-05",
      time: "10:00 AM",
      location: "Room 201 - General Hospital",
      status: "Upcoming",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Neurology",
      patient: "Jane Smith",
      date: "2025-11-04",
      time: "2:30 PM",
      location: "Neuro Ward - City Medical Center",
      status: "Completed",
    },
    {
      id: 3,
      doctor: "Dr. Jane Doe",
      specialty: "Pediatrics",
      patient: "Tommy Wilson",
      date: "2025-11-06",
      time: "9:00 AM",
      location: "Children’s Clinic - Room 3",
      status: "Upcoming",
    },
    {
      id: 4,
      doctor: "Dr. Ahmed Ali",
      specialty: "Orthopedics",
      patient: "Mary Johnson",
      date: "2025-11-01",
      time: "11:30 AM",
      location: "Orthopedic Unit - Room 105",
      status: "Cancelled",
    },
  ]);

  const getBadgeVariant = (status: Schedule["status"]) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "Completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 mb-20 overflow-y-auto px-6 py-6 space-y-8">
          {/* Heading */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              Doctor Schedules
            </h1>
            <Button
              className="bg-black text-white dark:bg-white dark:text-black hover:opacity-80"
              onClick={() => alert("Add Schedule coming soon")}
            >
              + Add Schedule
            </Button>
          </div>

          {/* Schedule Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 dark:border-gray-800">
                      <TableHead className="text-gray-700 dark:text-gray-300">Doctor</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Specialty</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Patient</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Time</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Location</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((schedule) => (
                      <TableRow
                        key={schedule.id}
                        className="border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-900/50 transition"
                      >
                        <TableCell className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          {schedule.doctor}
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-gray-500" />
                          {schedule.specialty}
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300">{schedule.patient}</TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300">{schedule.date}</TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          {schedule.time}
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          {schedule.location}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            className={`rounded-full px-3 py-1 text-xs font-medium ${getBadgeVariant(
                              schedule.status
                            )}`}
                          >
                            {schedule.status}
                          </Badge>
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
