"use client";

import React, { useState } from "react";
import Link from "next/link";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Eye, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PatientManagementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);

  // Mock patient data
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", age: 32, gender: "Male", ailment: "Flu" },
    { id: 2, name: "Jane Smith", age: 45, gender: "Female", ailment: "Asthma" },
    { id: 3, name: "Alex Johnson", age: 29, gender: "Male", ailment: "Back Pain" },
    { id: 4, name: "Olivia Brown", age: 37, gender: "Female", ailment: "Allergy" },
  ]);

  const handleView = (patient: any) => {
    setSelectedPatient(patient);
    setViewOpen(true);
  };

  const handleDelete = (id: number) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  return (
 

        <main className="flex-1 mb-25 overflow-y-auto px-6 py-6 space-y-8">
          {/* Page Heading */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Patient Management
            </h1>
            <Button className="bg-black text-white dark:bg-white dark:text-black hover:opacity-80">
              + Add New Patient
            </Button>
          </div>

          {/* Patients Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  All Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-700 dark:text-gray-300">
                        Name
                      </TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">
                        Age
                      </TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">
                        Gender
                      </TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">
                        Ailment
                      </TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow
                        key={patient.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      >
                        <TableCell className="text-gray-900 dark:text-gray-100">
                          {patient.name}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100">
                          {patient.age}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100">
                          {patient.gender}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100">
                          {patient.ailment}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          {/* View */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleView(patient)}
                          >
                            <Eye className="h-4 w-4 text-blue-500" />
                          </Button>

                          {/* Edit */}
<Link href={`/for-patient/edit-patients`}>
  <Button size="sm" variant="ghost">
    <Edit className="h-4 w-4 text-green-500" />
  </Button>
</Link>

                          {/* Delete */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="dark:bg-black">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
                                  Delete Patient
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <p className="text-gray-700 dark:text-gray-300">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold">
                                  {patient.name}
                                </span>
                                ?
                              </p>
                              <AlertDialogFooter className="pt-4">
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(patient.id)}
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

  );
}
