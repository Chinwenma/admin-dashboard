"use client";

// import { useState } from "react";
import Link from "next/link";
import { usePathname,} from "next/navigation";
import {
  Home,
  // UserPlus,
  Users,
  // CalendarDays,
  // Settings,
  LogOut,
  // Pen,
  Stethoscope,
  X,
} from "lucide-react";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();

  const basePath = "/admin";

  const sidebarItems = [
    { name: "Dashboard", icon: Home, href: `${basePath}` },
    {
      name: "Doctor Management",
      icon: Users,
      href: `${basePath}/doctors`,
    },
    {
      name: "Patient Management",
      icon: Users,
      href: `${basePath}/patients`,
    },
    {
      name: "Appointments",
      icon: Users,
      href: `${basePath}/appointments`,
    },
    {
      name: "Departments",
      icon: Users,
      href: `${basePath}/departments`,
    },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  
  const user = {
    name: "John Doe",
    email: "johndoe@email.com",
  };

  const firstLetter = user.name.charAt(0).toUpperCase();
  return (
    <>
      {/* Background overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-30 
        w-[85%] sm:w-[70%] md:w-[60%] lg:w-64
        transform bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800
        transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0 shadow-xl flex flex-col`}
      >
        {/* Logo + Close */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-lg tracking-wide">
              Admin
            </span>
          </div>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-6 space-y-1 overflow-y-auto flex-1">
          {sidebarItems.map(({ name, icon: Icon, href }) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center px-3 py-6 rounded-md transition-all duration-150 ${
                isActive(href)
                  ? "bg-gray-100 dark:bg-gray-900 text-black dark:text-white font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="w-5 h-5 mr-2" /> {name}
            </Link>
          ))}

      
        </nav>

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
          <button className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}
