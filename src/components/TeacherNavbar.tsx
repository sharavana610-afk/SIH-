"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  Trophy,
  Leaf,
  LogOut,
  User,
  Settings,
  Edit,
  Camera,
  ArrowLeft,
  Bell
} from "lucide-react";

export default function TeacherNavbar() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const navigation = [
    {
      name: "Dashboard",
      href: "/teacher-dashboard/dashboard",
      icon: Home,
      current: pathname === "/teacher-dashboard/dashboard"
    },
    {
      name: "Teach",
      href: "/teacher-dashboard/teach", 
      icon: BookOpen,
      current: pathname === "/teacher-dashboard/teach"
    },
    {
      name: "Monitor & Engage",
      href: "/teacher-dashboard/monitor",
      icon: BarChart3,
      current: pathname === "/teacher-dashboard/monitor"
    },
    {
      name: "Competitions",
      href: "/teacher-dashboard/competitions",
      icon: Trophy,
      current: pathname === "/teacher-dashboard/competitions"
    }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Back to Main Site + Logo */}
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all duration-300 group"
              title="Back to Main Website"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Main Site</span>
            </Link>
            
            <div className="w-px h-6 bg-slate-200"></div>
            
            <Link 
              href="/teacher-dashboard" 
              className="flex items-center gap-3 font-bold text-lg group transition-all duration-300 hover:scale-105"
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md group-hover:shadow-lg group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all duration-300">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent">
                GreenSpark Teacher
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                    ${item.current 
                      ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 mr-2 ${item.current ? 'text-emerald-600' : 'text-slate-500'}`} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Enhanced User Menu */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <button className="p-2 text-slate-600 hover:text-emerald-700 rounded-xl hover:bg-emerald-50 transition-all duration-300 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50 transition-all duration-300 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center group-hover:from-emerald-200 group-hover:to-emerald-300 transition-all duration-300">
                  <span className="text-sm font-bold text-emerald-700">T</span>
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800">Teacher</p>
                  <p className="text-xs text-slate-500">Educator</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50">
                  {/* Profile Header */}
                  <div className="px-4 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-emerald-700">T</span>
                        </div>
                        <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-colors">
                          <Camera className="w-3 h-3" />
                        </button>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">Teacher Profile</p>
                        <p className="text-sm text-slate-500">teacher@greenspark.edu</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">Edit Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                      <Edit className="w-4 h-4" />
                      <span className="text-sm font-medium">Edit Name</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                      <Camera className="w-4 h-4" />
                      <span className="text-sm font-medium">Change Avatar</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-medium">Settings</span>
                    </button>
                  </div>

                  {/* Sign Out */}
                  <div className="border-t border-slate-100 pt-2">
                    <Link 
                      href="/auth/signin"
                      className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Sign Out</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay to close dropdown */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </nav>
  );
}
