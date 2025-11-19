"use client";

import React, { useState } from "react";
import Sidebar from "@/components/ui/patient-sidebar";
import Header from "@/components/ui/patient-header";
import UserNav from "@/components/ui/patient-nav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function EditPatientPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock existing patient data (prefilled)
  const [formData, setFormData] = useState({
    name: "John Doe",
    age: "32",
    ailment: "Flu",
    gender: "Male",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Patient Info:", formData);
    // Later: integrate API or database update
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 mb-25 overflow-y-auto px-6 py-6 space-y-8">
          {/* Heading */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Edit Patient
            </h1>
          </div>

          {/* Edit Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="max-w-2xl mx-auto bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Update Patient Information
                </CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-transparent border-gray-300 dark:border-gray-700"
                      required
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="age"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Age
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      className="bg-transparent border-gray-300 dark:border-gray-700"
                      required
                    />
                  </div>

                  {/* Ailment */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="ailment"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Ailment / Condition
                    </Label>
                    <Input
                      id="ailment"
                      name="ailment"
                      type="text"
                      value={formData.ailment}
                      onChange={handleChange}
                      className="bg-transparent border-gray-300 dark:border-gray-700"
                      required
                    />
                  </div>

                  {/* Gender (Shadcn Select) */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="gender"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Gender
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, gender: value }))
                      }
                      value={formData.gender}
                    >
                      <SelectTrigger
                        id="gender"
                        className="w-full border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100"
                      >
                        <span>{formData.gender || "Select gender"}</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-black text-white dark:bg-white dark:text-black hover:opacity-80"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </main>

        {/* Mobile Bottom Navigation */}
        <UserNav />
      </div>
    </div>
  );
}
