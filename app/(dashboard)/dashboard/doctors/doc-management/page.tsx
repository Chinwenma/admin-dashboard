"use client";

import Link from "next/link";
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
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Button
} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import {
  Eye,
  Pencil,
  Trash2,
  User,
  Stethoscope,
  Mail,
  Phone,
  Hospital,
} from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  hospital: string;
}

export default function DoctorManagementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  // Mock data
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 1,
      name: "Dr. Sarah Adams",
      specialty: "Cardiology",
      email: "sarah.adams@example.com",
      phone: "+1 (555) 111-2222",
      hospital: "General Hospital",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      email: "michael.chen@example.com",
      phone: "+1 (555) 333-4444",
      hospital: "City Medical Center",
    },
    {
      id: 3,
      name: "Dr. Jane Doe",
      specialty: "Pediatrics",
      email: "jane.doe@example.com",
      phone: "+1 (555) 555-6666",
      hospital: "Children’s Clinic",
    },
  ]);

  const handleView = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setViewOpen(true);
  };

  const handleDelete = (id: number) => {
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 mb-20 overflow-y-auto px-6 py-6 space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              Doctor Management
            </h1>
            <Button
              className="bg-black text-white dark:bg-white dark:text-black hover:opacity-80"
              onClick={() => (window.location.href = "/for-doctors/add-new-doc")}
            >
              + Add New Doctor
            </Button>
          </div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  All Doctors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 dark:border-gray-800">
                      <TableHead className="text-gray-700 dark:text-gray-300">Name</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Specialty</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Email</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Phone</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Hospital</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {doctors.map((doctor) => (
                      <TableRow
                        key={doctor.id}
                        className="border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-900/50"
                      >
                        <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                          {doctor.name}
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300">
                          {doctor.specialty}
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300">
                          {doctor.email}
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300">
                          {doctor.phone}
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300">
                          {doctor.hospital}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(doctor)}
                            className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {/* Edit Doctor */}
<Link href={`/for-doctors/edit-doctor`}>
  <Button
    size="sm"
    variant="ghost"
    className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
  >
    <Pencil className="h-4 w-4 text-green-500" />
  </Button>
</Link>


                          {/* Delete Confirmation */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
                                  Delete Doctor
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-700 dark:text-gray-300">
                                  Are you sure you want to remove <b>{doctor.name}</b> from the
                                  system? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="text-gray-700 dark:text-gray-300">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(doctor.id)}
                                  className="bg-red-600 text-white hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </main>

        {/* Doctor Details Dialog */}
        <Dialog open={viewOpen} onOpenChange={setViewOpen}>
          <DialogContent className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Doctor Details
              </DialogTitle>
              <DialogDescription className="text-gray-700 dark:text-gray-300">
                Detailed information about {selectedDoctor?.name}.
              </DialogDescription>
            </DialogHeader>

            {selectedDoctor && (
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <User className="h-4 w-4 text-gray-500" /> {selectedDoctor.name}
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Stethoscope className="h-4 w-4 text-gray-500" /> {selectedDoctor.specialty}
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Mail className="h-4 w-4 text-gray-500" /> {selectedDoctor.email}
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Phone className="h-4 w-4 text-gray-500" /> {selectedDoctor.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Hospital className="h-4 w-4 text-gray-500" /> {selectedDoctor.hospital}
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setViewOpen(false)}
                className="bg-black text-white dark:bg-white dark:text-black hover:opacity-80"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Mobile Bottom Navigation */}
        <UserNav />
      </div>
    </div>
  );
}
