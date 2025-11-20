"use client";

import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";

export default function AddNewDoctorPage() {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    specialty: "",
    phone: "",
    licenseNumber: "",
    hospital: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Doctor Data Submitted:", formData);
    // TODO: integrate API call here
  };

  return (
  

        <main className="flex-1 mb-20 overflow-y-auto px-6 py-6 space-y-8">
          {/* Page Title */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              Add New Doctor
            </h1>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Doctor Information
                </CardTitle>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Dr. John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="doctor@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* Specialty */}
                  <div className="flex flex-col space-y-2">
                    <Label
                      htmlFor="specialty"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Specialty
                    </Label>
                    <Input
                      id="specialty"
                      name="specialty"
                      placeholder="Cardiology"
                      value={formData.specialty}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* License Number */}
                  <div className="flex flex-col space-y-2">
                    <Label
                      htmlFor="licenseNumber"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      License Number
                    </Label>
                    <Input
                      id="licenseNumber"
                      name="licenseNumber"
                      placeholder="DOC-123456"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* Hospital */}
                  <div className="flex flex-col space-y-2">
                    <Label
                      htmlFor="hospital"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Hospital / Clinic
                    </Label>
                    <Input
                      id="hospital"
                      name="hospital"
                      placeholder="General Hospital"
                      value={formData.hospital}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end space-x-4">
                  <Button
                    type="submit"
                    className="bg-black text-white dark:bg-white dark:text-black hover:opacity-80"
                  >
                    Add Doctor
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </main>

  );
}
