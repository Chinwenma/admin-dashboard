// app/components/PatientTableServer.tsx
import PatientTableClient from "@/components/client/PatientTable";
import { Button } from "@/components/ui/button";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function PatientTableServer() {
  const patients = await prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="px-6 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Patient Management</h1>

        <Link href="/admin/patients/new">
          <Button className="bg-black text-white">+ Add New Patient</Button>
        </Link>
      </div>
      <PatientTableClient patients={patients} />
    </main>
  );
}
