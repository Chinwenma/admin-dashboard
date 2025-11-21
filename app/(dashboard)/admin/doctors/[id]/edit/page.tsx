import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Upload } from "lucide-react";
import { updateDoctorAction } from "../../../actions/update";
// import { isObjectId } from "@/lib/slugify";

type Props = { params: Promise<{ id: string }> };
export default async function EditDoctorPage({ params }: Props) {
  const { id: slug } = await params;
  if (!slug) return notFound();
  // const where = isObjectId(slug) ? { id: slug } : { slug };
   const doctor = await prisma.doctor.findUnique({
    where: { slug: (await params).id },
  });
  if (!doctor) return notFound();

  const departments = await prisma.department.findMany();

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/admin/doctors"
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Edit Doctor</h2>
        </div>

        {/* Form */}
        <form
          action={updateDoctorAction.bind(null, doctor.slug)}
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={doctor.name}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Slug */}
          <input type="hidden" name="slug" defaultValue={doctor.slug} />

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={doctor.email}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              defaultValue={doctor.phone}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Department</label>
            <select
              name="departmentId"
              defaultValue={doctor.departmentId?.toString() ?? ""}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Profile Image</label>
            <div className="flex items-center gap-4">
              {doctor.image && (
                <Image
                  src={doctor.image}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              )}
              <label className="flex items-center gap-2 cursor-pointer text-gray-500 border rounded-md px-3 py-1 hover:bg-gray-100">
                <Upload size={20} />
                <span>Choose file</span>
                <input type="file" name="image" className="hidden" />
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all font-medium shadow-sm"
            >
              Update Doctor
            </button>
            <Link
              href="/admin/doctors"
              className="rounded-xl border px-4 py-2 hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
