// import { PrismaClient, Department } from "@prisma/client";
// import { doctors } from "./doctors"; 
// const prisma = new PrismaClient();

// async function main() {
//   console.log("🌱 Seeding departments and doctors...");

//   const departmentNames = [...new Set(doctors.map((d) => d.department))];

//   const departments: Department[] = [];
//   for (const name of departmentNames) {
//     const slug = name.toLowerCase().replace(/\s+/g, "-");
//     let department = await prisma.department.findUnique({ where: { slug } });
//     if (!department) {
//       department = await prisma.department.create({
//         data: {
//           name,
//           slug,
//           image: `/assets/${slug}.jpg`,
//           description: `${name} department.`,
//         },
//       });
//     }
//     departments.push(department);
//   }

//   const doctorsToInsert = doctors.map((doc) => {
//     const department = departments.find((d) => d.name === doc.department);
//     if (!department) throw new Error(`Department not found for ${doc.name}`);

//     return {
//       name: doc.name,
//       slug: doc.slug,
//       image: doc.image,
//       email: doc.email,
//       phone: doc.phone,
//       hospital: doc.hospital,
//       departmentId: department.id,
//     };
//   });

//   await prisma.doctor.createMany({
//     data: doctorsToInsert,
//     skipDuplicates: true,
//   });

//   console.log(`✅ Inserted ${doctorsToInsert.length} doctors successfully!`);
// }

// main()
//   .catch((e) => {
//     console.error("❌ Error seeding data:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Departments data
const departments = [
  {
    name: "Cardiology",
    slug: "cardiology",
    image: "/assets/hospital6.jpg",
    description: "Heart-related treatments and cardiovascular care",
  },
  {
    name: "Neurology",
    slug: "neurology",
    image: "/assets/hospital5.jpg",
    description: "Brain, nerves, and neurological disorder care",
  },
  {
    name: "Pediatrics",
    slug: "pediatrics",
    image: "/assets/hospital4.jpg",
    description: "Medical care for infants, children, and adolescents",
  },
  {
    name: "Orthopedics",
    slug: "orthopedics",
    image: "/assets/hospital3.jpg",
    description: "Bone, joint, and musculoskeletal treatments",
  },
  {
    name: "Gynecology",
    slug: "gynecology",
    image: "/assets/hospital2.jpg",
    description: "Women’s health, pregnancy, and reproductive care",
  },
  {
    name: "Emergency",
    slug: "emergency",
    image: "/assets/hospital1.jpg",
    description: "24/7 rapid response and critical care",
  },
];

// Doctors data
const doctors = [
  {
    name: "Dr. Sarah Adams",
    slug: "dr-sarah-adams",
    image: "/assets/doctor1.jpg",
    department: "Cardiology",
    email: "sarah.adams@example.com",
    phone: "+1 (555) 111-2222",
    hospital: "General Hospital",
  },
  {
    name: "Dr. Michael Chen",
    slug: "dr-michael-chen",
    image: "/assets/doctor2.jpg",
    department: "Neurology",
    email: "michael.chen@example.com",
    phone: "+1 (555) 333-4444",
    hospital: "City Medical Center",
  },
  {
    name: "Dr. Jane Doe",
    slug: "dr-jane-doe",
    image: "/assets/doctor3.jpg",
    department: "Pediatrics",
    email: "jane.doe@example.com",
    phone: "+1 (555) 555-6666",
    hospital: "Children’s Clinic",
  },
];

async function main() {
  console.log("🌱 Seeding departments...");

  const createdDepartments = [];
  for (const d of departments) {
    const department = await prisma.department.upsert({
      where: { slug: d.slug },
      update: {},
      create: d,
    });
    createdDepartments.push(department);
  }

  console.log("🌱 Seeding doctors...");

  for (const doc of doctors) {
    const department = createdDepartments.find((dep) => dep.name === doc.department);
    if (!department) throw new Error(`Department not found for ${doc.name}`);

    await prisma.doctor.upsert({
      where: { slug: doc.slug },
      update: {},
      create: {
        name: doc.name,
        slug: doc.slug,
        image: doc.image,
        email: doc.email,
        phone: doc.phone,
        departmentId: department.id,
      },
    });
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
