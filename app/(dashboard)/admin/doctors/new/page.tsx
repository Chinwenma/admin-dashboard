"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { getImageAuth } from "@/lib/imageKit";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import slugifyWithUniqueSuffix from "@/lib/slugify";

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
import { Stethoscope, Upload } from "lucide-react";
import { createDoctor } from "../../actions/create";
export interface DoctorFormData {
  name: string;
  slug: string;
  image: string;
  phone: string;
  departmentId: string;
  email: string;
}
interface Department {
  id: string;
  name: string;
}
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_KEY!;

export default function AddNewDoctorPage() {
  const [formData, setFormData] = useState<DoctorFormData>({
    name: "",
    email: "",
    departmentId: "",
    phone: "",
    slug: "",
    image: "",
  });
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const [errors, setErrors] = useState<Partial<DoctorFormData>>({});
  // const router = useRouter();

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await fetch("/api/departments");
        const data: Department[] = await res.json();
        setDepartments(data);
      } catch (error) {
        toast.error("failed to load departments");
      } finally {
        setLoadingDepartments(false);
      }
    }
    fetchDepartments();
  }, []);
  useEffect(() => {
    if (formData.name) {
      setFormData((prev) => ({
        ...prev,
        slug: slugifyWithUniqueSuffix(formData.name),
      }));
    }
  }, [formData.name]);

  // Validation
  const validateForm = () => {
    const newErrors: Partial<DoctorFormData> = {};
    if (!formData.name.trim()) newErrors.name = "name is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.departmentId.trim())
      newErrors.departmentId = "Department is required";
    if (!formData.image.trim()) newErrors.image = "Image is required";
    return newErrors;
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof DoctorFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

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
      await createDoctor(formData);
      toast.success("Doctor created successfully");
      setFormData({
        name: "",
        slug: "",
        image: "",
        email: "",
        phone: "",
        departmentId: "",
      });
      // Optionally navigate after creation
      // router.push("/departments");
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Image upload handlers
  const onImageUploadStart = () => setIsImageUploading(true);
  const onImageUploadSuccess = (res: any) => {
    setFormData((prev) => ({ ...prev, image: res.url }));
    toast.success("Image uploaded successfully");
    setIsImageUploading(false);
  };

  const onImageUploadError = (err: any) => {
    console.error(err);
    toast.error("Image upload failed");
    setIsImageUploading(false);
  };

  const canSave =
    !isSubmitting &&
    !isImageUploading &&
    formData.name.trim() &&
    formData.email &&
    formData.phone &&
    formData.departmentId.trim() &&
    formData.image;
  return (
    <main className="flex-1 mb-20 overflow-y-auto px-6 py-6 space-y-8">
      <ToastContainer />

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

          <form onSubmit={handleSubmit} noValidate>
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
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Dr. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>
              <Input
                id="slug"
                type="hidden"
                name="slug"
                value={formData.slug}
              />
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
               <div>
            <label className="block text-gray-700 font-medium mb-2">
Department            </label>
            {loadingDepartments ? (
              <p className="text-gray-500 text-sm">Loading departments...</p>
            ) : (
              <select
              id="departmentId"
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.departmentId ? "border-red-500" : ""
                }`}
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            )}
            {errors.departmentId && (
              <span className="text-red-500 text-sm">{errors.departmentId}</span>
            )}
          </div>

              {/* Specialty */}
              {/* <div className="flex flex-col space-y-2">
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
              </div> */}

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
              {/* <div className="flex flex-col space-y-2">
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
              </div> */}

              {/* Hospital */}
              {/* <div className="flex flex-col space-y-2">
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
              </div> */}


               <div>
            <label className="block text-sm font-medium">Main Image</label>
            <Upload size={20} className="text-teal-500" />
            <ImageKitProvider
              publicKey={publicKey}
              urlEndpoint={urlEndpoint}
              authenticator={getImageAuth}
            >
              <IKUpload
                folder="/matrix-shop/products/main"
                onUploadStart={onImageUploadStart}
                onSuccess={onImageUploadSuccess}
                onError={onImageUploadError}
                className="mt-1 w-full"
              />
            </ImageKitProvider>
            {isImageUploading && (
              <p className="text-teal-600 text-sm mt-1">Uploading image...</p>
            )}
            {formData.image && (
              <div className="mt-2">
                <Image
                  src={formData.image}
                  alt="Main Preview"
                  width={100}
                  height={100}
                  className="h-20 w-20 object-cover"
                />
              </div>
            )}
          </div>
            </CardContent>

            <CardFooter className="flex justify-end space-x-4">
              <Button
                type="submit"
                disabled={!canSave}
                className={` bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all ${
                  !canSave ? "opacity-70 cursor-not-allowed hover:bg-black shadow-none" : "" }`}
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
