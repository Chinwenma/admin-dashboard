"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ImageKit from "imagekit";
import prisma from "@/lib/prisma";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_KEY ?? "",
  privateKey: process.env.PRIVATE_KEY ?? "",
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT ?? "",
});

export async function updateDepartmentAction(
  oldSlug: string,
  formData: FormData
) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  

  if (!name) {
    throw new Error("Name is required.");
  }
  if (!slug) {
    throw new Error("Slug is required.");
  }
  
  const existingDepartment = await prisma.department.findUnique({
    where: { slug },
  });
  if (!existingDepartment) {
    throw new Error("Department not found.");
  }
  let imageUrl = existingDepartment.image;
  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      // Upload new image image
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: `Department-image-${slug}-${Date.now()}.${imageFile.name
          .split(".")
          .pop()}`,
        folder: "/matrix-hospital/departments/images",
      });
      imageUrl = uploadResponse.url;

      // Delete old image image from ImageKit
      if (existingDepartment.image) {
        const fileId = existingDepartment.image
          .split("/")
          .pop()
          ?.split(".")[0];
        if (fileId) {
          try {
            await imagekit.deleteFile(fileId);
          } catch (error: any) {
            console.error(`Failed to delete old image image: ${error.message}`);
          }
        }
      }
    } catch (error: any) {
      throw new Error(`Failed to upload image image: ${error.message}`);
    }
  }

  await prisma.department.update({
    where: { slug: oldSlug },
    data: {
      name,
      slug,
      image: imageUrl,
      description,
    },
  });
  revalidatePath("/admin/departments");
  revalidatePath(`/admin/departments/${slug}`);
//   revalidatePath("/");
  redirect("/admin/departments");
}


export async function updateDoctorAction(slugOrId: string, formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const departmentId = Number(formData.get("departmentId") || 0);

  if (!name || !slug || !email || !phone || !departmentId) {
    throw new Error("All fields are required");
  }

  // Determine if slugOrId is numeric (id) or text (slug)
  const isId = !isNaN(Number(slugOrId));
  const where = isId ? { id: Number(slugOrId) } : { slug: slugOrId };

  const existingDoctor = await prisma.doctor.findUnique({ where });
  if (!existingDoctor) throw new Error("Doctor not found");

  // If slug changed, ensure unique
  if (slug !== existingDoctor.slug) {
    const slugExists = await prisma.doctor.findUnique({ where: { slug } });
    if (slugExists) throw new Error("Slug already exists");
  }

  // Process Image Upload
  let imageUrl = existingDoctor.image;
  const imageFile = formData.get("image");

  if (imageFile instanceof File && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: `doctor-${slug}-${Date.now()}.${imageFile.name.split(".").pop()}`,
      folder: "/matrix-hospital/doctor/images",
    });
    imageUrl = uploadResponse.url;
  }

  // Update Database
  await prisma.doctor.update({
    where,
    data: {
      name,
      slug,
      email,
      phone,
      departmentId,
      image: imageUrl,
    },
  });

  revalidatePath("/admin/doctors");  // correct path
  redirect("/admin/doctors");
}

export async function updatePatientAction(
  oldSlug: string,
  formData: FormData
) {const name = String(formData.get("name") ?? "").trim();
const slug = String(formData.get("slug") ?? "").trim();
const email = String(formData.get("email") ?? "").trim();
const phone = String(formData.get("phone") ?? "").trim();
const gender = String(formData.get("gender") ?? "").trim();
const dateOfBirth = String(formData.get("dateOfBirth") ?? "").trim();
const address = String(formData.get("address") ?? "").trim();


  

 if (!name) throw new Error("Name is required.");
if (!slug) throw new Error("Slug is required.");
if (!email) throw new Error("Email is required.");
if (!phone) throw new Error("Phone number is required.");
if (!gender) throw new Error("Gender is required.");
if (!dateOfBirth) throw new Error("Date of birth is required.");
if (!address) throw new Error("Address is required.");
 
await prisma.patient.update({
  where: { slug: oldSlug },
  data: {
    name,
    slug,
    email,
    phone,
    gender,
    dateOfBirth: new Date(dateOfBirth), // convert string to Date
    address,
  },
});
  revalidatePath("/admin/patients");
  revalidatePath(`/admin/patients/${slug}`);
//   revalidatePath("/");
  redirect("/admin/patients");
}
