"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between rounded-2xl border border-emerald-100/50 p-4 bg-white/80 backdrop-blur-md shadow-lg shadow-emerald-50/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100/30">
      {/* Logo Section */}
      <Link 
        href="/" 
        className="flex items-center gap-3 font-bold text-lg group transition-all duration-300 hover:scale-105"
      >
        <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md group-hover:shadow-lg group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all duration-300">
          <Leaf className="h-5 w-5 text-white" />
        </div>
        <span className="bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent">
          GreenSpark
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        {/* Community Link */}
        <Link 
          href="/community" 
          className="relative text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors duration-300 group"
        >
          Community
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Auth Buttons Container */}
        <div className="flex items-center gap-3">
          {/* Sign In Button */}
          <Link
            href="/auth/signin"
            className="relative px-4 py-2 text-sm font-medium text-gray-700 rounded-xl border border-gray-200 hover:border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50/70 transition-all duration-300 group overflow-hidden"
          >
            <span className="relative z-10">Sign In</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          {/* Sign Up Button */}
          <Link
            href="/auth/signup"
            className="relative px-4 py-2 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-md hover:shadow-lg hover:shadow-emerald-200/50 transition-all duration-300 transform hover:scale-105 group overflow-hidden"
          >
            <span className="relative z-10">Sign Up</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </nav>
  );
}