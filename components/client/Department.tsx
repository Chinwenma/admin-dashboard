"use client";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface Department {
  id: number;
  name: string;
  image: string | null;
  description: string | null;
}

export default function DepartmentTable({
  departments,
}: {
  departments: Department[];
}) {
  return (
    <div className="w-full">
      {/* Header + Add button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Departments
        </h2>
        <Link href="/admin/departments/new" passHref>
          <Button
            className="bg-black text-white dark:bg-white dark:text-black hover:opacity-80"
            onClick={() => (window.location.href = "/admin/departments/new")}
          >
            + Add New Department
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {departments.map((dept) => (
            <TableRow key={dept.id}>
              <TableCell>{dept.name}</TableCell>

              <TableCell>
                {dept.image ? (
                  <Image
                    src={dept.image}
                    width={50}
                    height={50}
                    alt={dept.name}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center text-xs text-gray-500">
                    No Image
                  </div>
                )}
              </TableCell>

              <TableCell>{dept.description || "No description"}</TableCell>

              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="ghost">
                  <Pencil className="w-4 h-4 text-green-500" />
                </Button>

                <Button size="sm" variant="ghost" className="text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
