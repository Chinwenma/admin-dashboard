// app/components/PatientTableServer.tsx
import PatientTableClient from "@/components/client/PatientTable";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function PatientTableServer() {
  const patients = await prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <PatientTableClient patients={patients} />;
}
