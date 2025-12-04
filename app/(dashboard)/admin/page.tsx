// app/dashboard/page.tsx
import UserNav from "@/components/ui/doctor-nav";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardHome() {
  // Fetch counts from the database
  const [doctorCount, departmentCount, userCount, patientCount] = await Promise.all([
    prisma.doctor.count(),
    prisma.department.count(),
    prisma.user.count(),
    prisma.patient.count() 
  ]);

  // Fetch recent users
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 1,
  });

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Welcome to the Admin Dashboard</h2>

      {/* Top Cards with Counts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Link
          href="/admin/paitents"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition flex flex-col items-center justify-center"
        >
          <span className="text-3xl font-bold">📦</span>
          <span className="mt-2 font-medium text-gray-700">Patients</span>
          <span className="mt-1 text-teal-600 font-bold text-lg">{patientCount}</span>
        </Link>

        <Link
          href="admin/departments"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition flex flex-col items-center justify-center"
        >
          <span className="text-3xl font-bold">📂</span>
          <span className="mt-2 font-medium text-gray-700">Departments</span>
          <span className="mt-1 text-teal-600 font-bold text-lg">{departmentCount}</span>
        </Link>

        <Link
          href="admin/doctors"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition flex flex-col items-center justify-center"
        >
          <span className="text-3xl font-bold">🛒</span>
          <span className="mt-2 font-medium text-gray-700">Doctors</span>
          <span className="mt-1 text-teal-600 font-bold text-lg">{doctorCount}</span>
        </Link>

        <Link
          href="/admin/users"
          className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition flex flex-col items-center justify-center"
        >
          <span className="text-3xl font-bold">👥</span>
          <span className="mt-2 font-medium text-gray-700">Users</span>
          <span className="mt-1 text-teal-600 font-bold text-lg">{userCount}</span>
        </Link>
      </div>

      {/* Users Table */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Recent Users</h3>

        {users.length === 0 ? (
          <p>No users registered yet.</p>
        ) : (
          <table className="w-full table-auto border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border-b">Avatar</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                {/* <th className="px-4 py-2 border-b">Role</th> */}
                <th className="px-4 py-2 border-b">Joined</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                 
                  <td className="px-4 py-2 ">{user.email}</td>
                  {/* <td className="px-4 py-2 border-b">{user.role}</td> */}
                  <td className="px-4 py-2">
                    {user.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      className="text-teal-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
              <UserNav />

    </section>
  );
}
