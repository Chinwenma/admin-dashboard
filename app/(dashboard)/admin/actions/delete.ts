"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
function isRecordNotFound(e: any) {
  return e?.code === "P2025";
}

export async function deleteDepartment(slug: string) {
  if (!slug) return;
  try {
    await prisma.department.delete({ where: { slug } });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/admin/departments");
  revalidatePath(`/admin/departments/${slug}`);

  // revalidatePath("/");
}


export async function deleteDoctor(slug: string) {
  if (!slug) return;

  try {
    await prisma.doctor.delete({ where: {slug} });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/admin/doctors");

}

export async function deletePatient(slug: string) {
  if (!slug) return;
  try {
    await prisma.patient.delete({ where: { slug } });
  } catch (e: any) {
    if (!isRecordNotFound(e)) throw e;
  }
  revalidatePath("/admin/patients");
  revalidatePath(`/admin/patients/${slug}`);

  // revalidatePath("/");
}
