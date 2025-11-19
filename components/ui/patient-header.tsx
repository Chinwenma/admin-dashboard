"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Moon,
  Sun,
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

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fullName = "Patient";
  const firstName = fullName.split(" ")[0];
  const userEmail = "patient@example.com";
  const userInitial = firstName.charAt(0).toUpperCase();

  const handleLogout = () => {
    router.push("/for-patient/logout");
  };

  return (
    <header className="sticky top-0 z-20 flex items-center h-15 px-1 sm:px-6 bg-white dark:bg-black border-b border-gray-300 dark:border-gray-700 shadow-sm transition-colors">
      <div className="flex w-full items-center justify-between">
        {/* Sidebar toggle */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6 text-black dark:text-white" />
        </button>

        <div className="flex items-center gap-4 ml-auto">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-white" />
            ) : (
              <Moon className="h-5 w-5 text-black" />
            )}
          </button>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center space-x-2 focus:outline-none cursor-pointer"
            >
              <div className="w-9 h-9 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-medium">
                {userInitial}
              </div>
              <span className="hidden sm:block text-sm font-medium text-black dark:text-white">
                {firstName}
              </span>
              <ChevronDown className="hidden sm:block h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-black border border-gray-300/50 dark:border-gray-700/50 rounded-lg shadow-lg z-30 p-3">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-black dark:text-white">
                    {fullName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userEmail}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-col gap-1 mt-2">
                  <button className="flex items-center w-full px-4 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 text-black dark:text-white">
                    <User className="h-4 w-4 mr-2" /> Profile
                  </button>

                  <button className="flex items-center w-full px-4 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 text-black dark:text-white">
                    <Settings className="h-4 w-4 mr-2" /> Settings
                  </button>

                  {/* Logout with confirmation */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="flex items-center w-full px-4 py-2 text-sm rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                        <LogOut className="h-4 w-4 mr-2" /> Logout
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="dark:bg-black p-6 rounded-xl border border-gray-300 dark:border-gray-700">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to log out?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will end your current session and redirect you to
                          the logout page.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="w-full sm:w-auto">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleLogout}
                          className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
                        >
                          Log Out
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
