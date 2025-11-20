"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateDepartmentAction } from "@/app/(dashboard)/admin/actions/update";

interface Department {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
}

export default function EditDepartmentForm({
  item,
  slug,
}: {
  item: Department;
  slug: string;
}) {
  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard/admin/departments"
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Department
          </h2>
        </div>

        {/* Form */}
        <form
          action={updateDepartmentAction.bind(null, slug)}
          className="space-y-6"
        //   encType="multipart/form-data"
        >
          <div>
            <Label htmlFor="name">Department Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={item.name}
              required
              className="mt-1"
            />
          </div>

          {/* Hidden slug */}
          <Input type="hidden" name="slug" defaultValue={item.slug} />

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={item.description ?? ""}
              rows={4}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="image">Image</Label>
            <div className="flex items-center gap-2 mt-1">
              <Upload size={20} className="text-gray-500" />
              <Input type="file" name="image" accept="image/*" />
            </div>

            {item.image && (
              <div className="mt-4">
                <p className="text-sm text-slate-500">Current Image:</p>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={150}
                  height={100}
                  className="rounded-md object-cover mt-1"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit">Update Department</Button>
            <Link href="/admin/departments">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
