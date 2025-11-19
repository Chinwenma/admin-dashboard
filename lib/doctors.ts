export interface Doctor {
  id: number;
  name: string;
  department: string;
  email: string;
  phone: string;
  hospital: string;
}  
  
  
 export const doctors: Doctor[] =[
    {
      id: 1,
      name: "Dr. Sarah Adams",
      department: "Cardiology",
      email: "sarah.adams@example.com",
      phone: "+1 (555) 111-2222",
      hospital: "General Hospital",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      department: "Neurology",
      email: "michael.chen@example.com",
      phone: "+1 (555) 333-4444",
      hospital: "City Medical Center",
    },
    {
      id: 3,
      name: "Dr. Jane Doe",
      department: "Pediatrics",
      email: "jane.doe@example.com",
      phone: "+1 (555) 555-6666",
      hospital: "Children’s Clinic",
    },
  ];
