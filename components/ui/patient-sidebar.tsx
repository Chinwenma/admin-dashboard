"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Users,
  UserPlus,
  Edit,
  Calendar,
  X,
  User,
  LogOut,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Mock user data
  const user = {
    name: "John Doe",
    email: "johndoe@email.com",
  };

  const firstLetter = user.name.charAt(0).toUpperCase();

  const sidebarItems = [
    { name: "Dashboard", icon: Home, href: "/for-patient/dashboard" },
    { name: "Add Patient", icon: UserPlus, href: "/for-patient/add-patients" },
    { name: "Edit Patient", icon: Edit, href: "/for-patient/edit-patients" },
    { name: "Appointments", icon: Calendar, href: "/for-patient/appointments" },
    { name: "Patients Management", icon: Users, href: "/for-patient/patient-managment" },
    { name: "Switch to Doctor", icon: Users, href: "/for-doctors/dashboard" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  const handleLogout = () => {
    // You can clear auth tokens or session here
    router.push("/for-patient/logout");
  };

  return (
    <>
      {/* Background Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-30 w-[85%] sm:w-[70%] md:w-[60%] lg:w-64 transform
           bg-white dark:bg-black border-r border-gray-300 dark:border-gray-800
           transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-lg flex flex-col`}
      >
        {/* Logo + Close */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-lg tracking-wide">
              patient Portal
            </span>
          </div>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {sidebarItems.map(({ name, icon: Icon, href }) => (
            <Link
              key={name}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center px-3 py-2 rounded-md transition-all duration-150
                ${
                  isActive(href)
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900"
                }`}
            >
              <Icon className="w-5 h-5 mr-2" /> {name}
            </Link>
          ))}
        </nav>

        {/* User Info + Logout */}
        <div className="hidden lg:flex border-t border-gray-300 dark:border-gray-800 px-4 py-4 items-center justify-between">
          {/* Avatar */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-lg">
              {firstLetter}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {user.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>

          {/* Logout (with confirmation) */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
                <LogOut className="w-4 h-4" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dark:bg-black">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                <AlertDialogDescription>
                  You’ll be redirected to the logout page and your session will end.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Log Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </aside>
    </>
  );
}
