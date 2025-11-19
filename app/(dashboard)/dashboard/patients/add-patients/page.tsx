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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddPatientPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    ailment: "",
    gender: "",
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
    console.log("Patient Added:", formData);
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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Add New Patient
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="max-w-2xl mx-auto bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter patient's name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-transparent border-gray-300 dark:border-gray-700"
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-gray-700 dark:text-gray-300">
                      Age
                    </Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="Enter patient's age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      className="bg-transparent border-gray-300 dark:border-gray-700"
                    />
                  </div>

                  {/* Ailment */}
                  <div className="space-y-2">
                    <Label htmlFor="ailment" className="text-gray-700 dark:text-gray-300">
                      Ailment / Condition
                    </Label>
                    <Input
                      id="ailment"
                      name="ailment"
                      type="text"
                      placeholder="Enter patient's ailment"
                      value={formData.ailment}
                      onChange={handleChange}
                      required
                      className="bg-transparent border-gray-300 dark:border-gray-700"
                    />
                  </div>

                  {/* Gender (shadcn select) */}
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-gray-700 dark:text-gray-300">
                      Gender
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                    >
                      <SelectTrigger className="w-full bg-transparent border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
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
                      Add Patient
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
