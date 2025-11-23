"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import slugifyWithUniqueSuffix from "@/lib/slugify";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPatient } from "../../actions/create";

export interface PatientFormData {
  name: string;
  slug: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string; // string in form, converted to Date in server
  address: string;
}

export default function AddPatientPage() {
  const [formData, setFormData] = useState<PatientFormData>({
    name: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    slug: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<PatientFormData>>({});

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name) {
      setFormData((prev) => ({
        ...prev,
        slug: slugifyWithUniqueSuffix(formData.name),
      }));
    }
  }, [formData.name]);

  // Form validation
  const validateForm = () => {
    const newErrors: Partial<PatientFormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (
      !formData.dateOfBirth.trim() ||
      isNaN(new Date(formData.dateOfBirth).getTime())
    )
      newErrors.dateOfBirth = "Valid date of birth is required";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required";
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof PatientFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await createPatient(formData); // server converts dateOfBirth to Date
      toast.success("Patient created successfully");
      setFormData({
        name: "",
        slug: "",
        email: "",
        gender: "",
        phone: "",
        dateOfBirth: "",
        address: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Can save check
  const canSave =
    !isSubmitting &&
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.dateOfBirth.trim() &&
    formData.address.trim() &&
    formData.gender.trim();

  return (
    <main className="flex-1 mb-25 overflow-y-auto px-6 py-6 space-y-8">
      <ToastContainer />

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
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-gray-700 dark:text-gray-300">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-gray-300 dark:border-gray-700"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter patient's email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-gray-300 dark:border-gray-700"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter patient's phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-gray-300 dark:border-gray-700"
                />
              </div>

              {/* Gender */}
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

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-700 dark:text-gray-300">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter patient's address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-gray-300 dark:border-gray-700"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  disabled={!canSave}
                  className={`bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all font-medium shadow-sm ${
                    !canSave ? "opacity-50 cursor-not-allowed hover:bg-teal-600 shadow-none" : ""
                  }`}
                >
                  {isSubmitting ? "Saving..." : "Add Patient"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
