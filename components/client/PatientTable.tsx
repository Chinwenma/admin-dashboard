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
import Link from "next/link";
import { Eye, Edit, Trash2 } from "lucide-react";

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
  const handleDelete = (id: number) => {
    // TODO: call API or server action to delete
    console.log("Delete patient", id);
  };

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

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Patient</AlertDialogTitle>
                  </AlertDialogHeader>
                  <p>Are you sure you want to delete {patient.name}?</p>
                  <AlertDialogFooter>
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
  );
}
