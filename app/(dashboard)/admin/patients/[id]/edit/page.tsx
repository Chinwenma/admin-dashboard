
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
// import { isObjectId } from "@/lib/slugify";
import EditPatientForm from "@/components/client/EditPatient";

type Props = { params: Promise<{ id: string }> };

export default async function EditPatientPage({ params }: Props) {
  const { id: slug } = await params;

  if (!slug) return notFound();

//   const where = isObjectId(slug) ? { id: slug } : { slug };

  const item = await prisma.patient.findFirst({ where : {slug } });

  if (!item) return notFound();

  return (
    <div>
      <EditPatientForm item={item} slug={slug} />
    </div>
  );
}
