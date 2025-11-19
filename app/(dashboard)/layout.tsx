import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import ClientSideBar from "@/components/client/ClientSideBar";
import UserNav from "@/components/ui/doctor-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard layout",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <ClientSideBar />
        </aside>

        {/* Main Area */}
        <main className="flex-1 flex flex-col bg-gray-50">
          <UserNav />
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
