// app/admin/departments/page.tsx (SERVER COMPONENT)

import DepartmentTable from "@/components/client/Department";
import prisma from "@/lib/prisma";

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Department Management</h1>

      <DepartmentTable departments={departments} />
    </div>
  );
}
