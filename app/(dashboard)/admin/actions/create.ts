/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { DepartmentFormData } from "../departments/new/page";
import { DoctorFormData } from "../doctors/new/page";


/**
 * Creates a new category with the provided form data
 * @param formData - The data for the new announcement containing title, slug, date, image, description, and details
 * @returns Promise<void>
 */
export async function createDepartment(formData: DepartmentFormData) {
  const { name, slug, image, description } = formData;
  await prisma.department.create({
    data: {
      name,
      slug,
      image,
      description,
    },
  });
  revalidatePath("/dashboard/admin/departments");
}


/**
 * Creates a new category with the provided form data
 * @param formData 
 * @returns Promise<void>
 */
export async function createDoctor(formData: DoctorFormData) {
  const {
    name,
    slug,
    image,
    phone,
    email,
    departmentId,
  } = formData;

  try {
    await prisma.doctor.create({
      data: {
        name,
        slug,
        image,
        email,
        phone,
        departmentId: Number(departmentId),
      },
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to create doctor: ${error.message}`);
  }

  revalidatePath("/admin/doctors");
}
