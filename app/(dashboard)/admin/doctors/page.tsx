import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DoctorTable from "@/components/client/DoctorsTable";

export default async function DoctorManagementPage() {
  const doctors = await prisma.doctor.findMany({
    include: {
      department: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <main className="px-6 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Doctor Management</h1>

        <Link href="/admin/doctors/new">
          <Button className="bg-black text-white">+ Add New Doctor</Button>
        </Link>
      </div>

      <DoctorTable doctors={doctors} />
    </main>
  );
}
