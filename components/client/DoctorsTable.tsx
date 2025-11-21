"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, Pencil} from "lucide-react";
import Image from "next/image";
import ConfirmDelete from "./ConfirmDelete";

interface Doctor {
  id: number;
  slug: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  department: { name: string };
}

export default function DoctorTable({ doctors }: { doctors: Doctor[] }) {
  return (
    <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle>All Doctors</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>
                  {doctor.image ? (
                    <Image
                      src={doctor.image}
                      width={180}
                      height={180}
                      alt={doctor.name}
                      className="rounded-md object-cover w-10 h-10"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </TableCell>
                <TableCell>{doctor.department?.name}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.phone}</TableCell>

                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Link href={`/admin/doctors/${doctor.slug}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-4 w-4 text-green-600" />
                    </Button>
                  </Link>
 <ConfirmDelete
                  title="Delete docor"
                  message={`This will permanently delete “${doctor}.name}.`}
                  busyText="Deleting..."
                  id={doctor.slug}
                  module="doctor"
                ></ConfirmDelete>
                 
                </TableCell>
              </TableRow>
            ))}

            {doctors.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  No doctors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
