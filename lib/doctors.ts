export interface Doctor {
  name: string;
  slug: string;
  image: string;
  department: string;
   departmentId?: string;
  email: string;
  phone: string;
  hospital: string;
}  
  
  
 export const doctors: Doctor[] =[
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
