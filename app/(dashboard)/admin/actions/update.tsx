"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { isObjectId } from "@/lib/slugify";
import ImageKit from "imagekit";
import prisma from "@/lib/prisma";
// import { isObjectId } from "@/lib/slugify";

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