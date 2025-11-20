
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
// import { isObjectId } from "@/lib/slugify";
import EditDepartmentForm from "@/components/client/EditDepartment";

type Props = { params: Promise<{ id: string }> };

export default async function EditDepartmentPage({ params }: Props) {
  const { id: slug } = await params;

  if (!slug) return notFound();

//   const where = isObjectId(slug) ? { id: slug } : { slug };

  const item = await prisma.department.findFirst({ where : {slug } });

  if (!item) return notFound();

  return (
    <div>
      <EditDepartmentForm item={item} slug={slug} />
    </div>
  );
}
