"use client";

import Link from "next/link";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";

import { motion } from "framer-motion";
import {
  Eye,
  Pencil,
  Trash2,
  // User,
  // Stethoscope,
  // Mail,
  // Phone,
  // Hospital,
} from "lucide-react";
import { doctors } from "@/lib/doctors";

// interface Doctor {
//   id: number;
//   name: string;
//   department: string;
//   email: string;
//   phone: string;
//   hospital: string;
// }

export default function DoctorManagementPage() {
 
  return (
    <div>
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
                    <TableHead className="text-gray-700 dark:text-gray-300">
                      Name
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300">
                      Specialty
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300">
                      Email
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300">
                      Phone
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300">
                      Hospital
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map((doctor) => (
                    <TableRow
                      key={doctor.name}
                      className="border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-900/50"
                    >
                      <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                        {doctor.name}
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {doctor.department}
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
                          className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {/* Edit Doctor */}
                        <Link href={`/admin/doctors/edit/${doctor.name}`}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                          >
                            <Pencil className="h-4 w-4 text-green-500" />
                          </Button>
                        </Link>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
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
    </div>
  );
}
