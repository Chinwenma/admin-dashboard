// app/components/PatientTableClient.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Edit } from "lucide-react";
import ConfirmDelete from "./ConfirmDelete";

interface Patient {
  id: number;
  slug: string;
  name: string;
  email: string | null;
  phone: string | null;
  gender: string;
  dateOfBirth: Date;
  address: string | null;
}

interface Props {
  patients: Patient[];
}

export default function PatientTableClient({ patients }: Props) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>DOB</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell>{patient.name}</TableCell>
            <TableCell>{patient.email ?? "-"}</TableCell>
            <TableCell>{patient.gender}</TableCell>
            <TableCell>{patient.dateOfBirth.toDateString()}</TableCell>
            <TableCell className="text-right space-x-2">
              <Link href={`/admin/patients/${patient.slug}/edit`}>
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4 text-green-500" />
                </Button>
              </Link>
  <ConfirmDelete
                  title="Delete patient"
                  message={`This will permanently delete ${patient.name}.`}
                  busyText="Deleting..."
                  id={patient.slug}
                  module="patient"
                ></ConfirmDelete>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
