"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  UserPlus,
  Users,
  CalendarDays,
  BarChart3,
  Settings,
} from "lucide-react";

export default function UserNav() {
  const pathname = usePathname();

  // 👇 Use same pages as your sidebar
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Doctors", href: "/for-doctors/doc-management", icon: Users },
    { name: "Schedules", href: "/for-doctors/schedules", icon: CalendarDays },
    { name: "Settings", href: "/for-doctors/setting", icon: Settings },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center 
                 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800
                 py-3 rounded-t-2xl shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.25)] lg:hidden"
    >
      {navItems.map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          href={href}
          className={`flex flex-col items-center text-[10px] font-medium tracking-wide transition-colors ${
            isActive(href)
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          }`}
        >
          <div
            className={`flex items-center justify-center w-11 h-11 rounded-2xl mb-1 transition-all duration-300 border
              ${
                isActive(href)
                  ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                  : "bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800"
              }`}
          >
            <Icon className="w-5 h-5" />
          </div>
          {name}
        </Link>
      ))}
    </nav>
  );
}
