// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   const patients = [
//     {
//       slug: "john-doe",
//       name: "John Doe",
//       email: "john@example.com",
//       phone: "+2348012345678",
//       gender: "MALE",
//       dateOfBirth: new Date("1990-01-01"),
//       address: "123 Main Street",
//     },
//     {
//       slug: "jane-smith",
//       name: "Jane Smith",
//       email: "jane@example.com",
//       phone: "+2348098765432",
//       gender: "FEMALE",
//       dateOfBirth: new Date("1985-05-15"),
//       address: "456 Elm Avenue",
//     },
//     {
//       slug: "alice-johnson",
//       name: "Alice Johnson",
//       email: "alice@example.com",
//       phone: "+2348023456789",
//       gender: "FEMALE",
//       dateOfBirth: new Date("1992-07-20"),
//       address: "789 Oak Lane",
//     },
//     {
//       slug: "bob-williams",
//       name: "Bob Williams",
//       email: "bob@example.com",
//       phone: "+2348034567890",
//       gender: "MALE",
//       dateOfBirth: new Date("1988-09-10"),
//       address: "321 Pine Road",
//     },
//     {
//       slug: "mary-brown",
//       name: "Mary Brown",
//       email: "mary@example.com",
//       phone: "+2348045678901",
//       gender: "FEMALE",
//       dateOfBirth: new Date("1995-12-25"),
//       address: "654 Maple Street",
//     },
//   ];

//   for (const patient of patients) {
//     await prisma.patient.create({ data: patient });
//   }

//   console.log("✅ Seeded 5 patients");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@hospital.com"; // your admin email
  const plainPassword = "Admin123!";  // choose a strong password

  // Hash the password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Create admin user
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      isActive: true,
    },
  });

  console.log("Admin user created:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
