"use client";

import React, { useState } from "react";
import Sidebar from "@/components/ui/doctor-sidebar";
import Header from "@/components/ui/doctor-header";
import UserNav from "@/components/ui/doctor-nav";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import {
  Settings,
  Bell,
  User,
  Mail,
  Phone,
  Lock,
  Save,
} from "lucide-react";

export default function DoctorSettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState("Dr. Sarah Adams");
  const [email, setEmail] = useState("sarah.adams@example.com");
  const [phone, setPhone] = useState("+1 (555) 111-2222");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    app: true,
  });

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 mb-20 overflow-y-auto px-6 py-6 space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Settings className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              Account Settings
            </h1>
            <Button
              onClick={handleSave}
              className="bg-black text-white dark:bg-white dark:text-black hover:opacity-80"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>

          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <User className="h-5 w-5" /> Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Bell className="h-5 w-5" /> Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Email Notifications
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive appointment updates and reports via email.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(v) =>
                      setNotifications((prev) => ({ ...prev, email: v }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      SMS Notifications
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Get instant text alerts for new appointments.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(v) =>
                      setNotifications((prev) => ({ ...prev, sms: v }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      In-App Notifications
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Enable alerts inside the Doctor Portal.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.app}
                    onCheckedChange={(v) =>
                      setNotifications((prev) => ({ ...prev, app: v }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Security */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Lock className="h-5 w-5" /> Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage your password and secure your account.
                </p>
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => alert("Password reset coming soon!")}
                >
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </main>

        {/* Mobile Navigation */}
        <UserNav />
      </div>
    </div>
  );
}
