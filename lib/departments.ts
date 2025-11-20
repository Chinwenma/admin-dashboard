export interface Department {
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const departments: Department[] = [
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
