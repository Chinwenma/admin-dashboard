"use server"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { DepartmentFormData } from "../departments/new/page";
// import { ProductFormData } from "../admin/products/new/page";

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
