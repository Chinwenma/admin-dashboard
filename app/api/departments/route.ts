import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { name: "asc" }, 
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(departments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch departments" }, { status: 500 });
  }
}
