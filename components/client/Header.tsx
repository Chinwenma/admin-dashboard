'use client';

import { useState } from "react";
import Header from "../ui/doctor-header";

export default function Nav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <Header setSidebarOpen={setSidebarOpen} />
    </div>
  );
}
