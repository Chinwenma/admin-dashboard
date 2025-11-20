"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, UserPlus, Calendar, Users } from "lucide-react";

export default function UserNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard/dashboard", icon: LayoutGrid },
    { name: "Doctors", href: "/dashboard/doctors", icon: UserPlus },
    { name: "Patients", href: "/dashboard/patients", icon: Users },
    { name: "Departments", href: "/dashboard/appointments", icon: Calendar },
    { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { name: "Settings", href: "/dashboard/appointments", icon: Calendar },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 gap-2 bg-white dark:bg-black py-3 rounded-t-3xl border-t border-gray-300 dark:border-gray-800 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.3)] lg:hidden">
      {navItems.map(({ name, href, icon: Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={name}
            href={href}
            className={`flex flex-col items-center text-[10px] font-medium tracking-wide transition-colors ${
              active
                ? "text-black dark:text-white"
                : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <div
              className={`flex items-center justify-center w-11 h-11 rounded-2xl mb-1 transition-all duration-300 border border-gray-300 dark:border-gray-700 ${
                active
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-md shadow-gray-600/30 dark:shadow-white/10"
                  : "bg-gray-100 dark:bg-gray-900"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            {name.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
