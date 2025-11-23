"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updatePatientAction } from "@/app/(dashboard)/admin/actions/update";

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

export default function EditPatientForm({
  item,
  slug,
}: {
  item: Patient;
  slug: string;
}) {
  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/admin/patients"
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </Link>
          <h2 className="text-2xl font-bold text-gray-800">Edit Patient</h2>
        </div>

        {/* Form */}
        <form
          action={updatePatientAction.bind(null, slug)}
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={item.name}
              required
              className="mt-1"
            />
          </div>

          {/* Slug (hidden) */}
          <Input type="hidden" name="slug" defaultValue={item.slug} />

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={item.email ?? ""}
              required
              className="mt-1"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={item.phone ?? ""}
              required
              className="mt-1"
            />
          </div>

          {/* Gender */}
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Input
              id="gender"
              name="gender"
              defaultValue={item.gender}
              required
              className="mt-1"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              defaultValue={item.dateOfBirth.toISOString().split("T")[0]} // ISO-8601 for input type date
              required
              className="mt-1"
            />
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              defaultValue={item.address ?? ""}
              rows={3}
              className="mt-1"
            />
          </div>

          {/* Submit / Cancel */}
          <div className="flex justify-end gap-2">
            <Button type="submit">Update Patient</Button>
            <Link href="/admin/patients">
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
