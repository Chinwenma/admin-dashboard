"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import slugifyWithUniqueSuffix from "@/lib/slugify";
// import { useRouter } from "next/navigation";

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
import { Stethoscope, Upload } from "lucide-react"; // ✅ Upload imported
import { createDepartment } from "../../actions/create";
import { Textarea } from "@/components/ui/textarea";
import { getImageAuth } from "@/lib/imageKit";

export interface DepartmentFormData {
  name: string;
  slug: string;
  image: string;
  description: string;
}

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_KEY!;

export default function AddNewDepartmentPage() {
  const [formData, setFormData] = useState<DepartmentFormData>({
    name: "",
    slug: "",
    image: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [errors, setErrors] = useState<Partial<DepartmentFormData>>({});
  // const router = useRouter();

  // Auto-generate slug with unique suffix
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
    const newErrors: Partial<DepartmentFormData> = {};
    if (!formData.name.trim()) newErrors.name = "Title is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Image is required";
    return newErrors;
  };

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof DepartmentFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle form submit
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
      await createDepartment(formData);
      toast.success("Department created successfully");
      setFormData({
        name: "",
        slug: "",
        image: "",
        description: "",
      });
      // Optionally navigate after creation
      // router.push("/departments");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Image upload handlers
  const onImageUploadStart = () => {
    setIsImageUploading(true);
  };

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

  // Optional: dummy authenticator
  // const getImageAuth = () => ({
  //   token: "",
  //   expire: 0,
  //   signature: "",
  // });

  const canSave =
    !isSubmitting &&
    !isImageUploading &&
    formData.name.trim() &&
    formData.description.trim() &&
    formData.image;

  return (
    <main className="flex-1 mb-20 overflow-y-auto px-6 py-6 space-y-8">
      <ToastContainer />

      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          Add New Department
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
              Department Information
            </CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit} noValidate>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Department Name */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                  Department Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter Department name"
                  className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </div>

              <Input id="slug" type="hidden" name="slug" value={formData.slug} />

              {/* Description */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
                  Description
                </Label>
                <Textarea
                  placeholder="Enter department description..."
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">{errors.description}</span>
                )}
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium">Image</label>
                <Upload size={20} className="text-teal-500" />

                <ImageKitProvider
                  publicKey={publicKey}
                  urlEndpoint={urlEndpoint}
                  authenticator={getImageAuth}
                >
                  <IKUpload
                    folder="/matrix-hospital/departments/images"
                    onSuccess={onImageUploadSuccess}
                    onUploadStart={onImageUploadStart}
                    onError={onImageUploadError}
                    className="mt-1 w-full"
                  />
                </ImageKitProvider>

                {isImageUploading && (
                  <p className="text-teal-600 text-sm mt-1">Uploading image, please wait...</p>
                )}

                {formData.image && (
                  <div className="mt-2">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="h-20 w-20 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {errors.image && <span className="text-red-500 text-sm">{errors.image}</span>}
              </div>
            </CardContent>

            <CardFooter className="flex justify-end space-x-4">
              <Button
                type="submit"
                disabled={!canSave}
                className={`bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all font-medium shadow-sm ${
                  !canSave ? "opacity-50 cursor-not-allowed hover:bg-teal-600 shadow-none" : ""
                }`}
              >
                {isSubmitting ? "Saving..." : "Save Department"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </main>
  );
}
