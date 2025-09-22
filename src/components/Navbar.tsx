"use client";

import Link from "next/link";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between rounded-2xl border border-emerald-100/50 p-3 sm:p-4 bg-white/80 backdrop-blur-md shadow-lg shadow-emerald-50/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100/30">
        {/* Logo Section */}
        <Link 
          href="/" 
          className="flex items-center gap-2 sm:gap-3 font-bold text-base sm:text-lg group transition-all duration-300 hover:scale-105"
          onClick={closeMenu}
        >
          <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md group-hover:shadow-lg group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all duration-300">
            <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent">
            JeevanJadd
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
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

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/70 transition-all duration-300"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-md shadow-2xl z-50 transform transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-emerald-100/50">
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-lg group transition-all duration-300"
            onClick={closeMenu}
          >
            <div className="p-1.5 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent">
              JeevanJadd
            </span>
          </Link>
          
          <button
            onClick={closeMenu}
            className="p-2 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/70 transition-all duration-300"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="p-4 space-y-4">
          {/* Community Link */}
          <Link 
            href="/community" 
            className="block py-3 px-4 text-base font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/70 rounded-xl transition-all duration-300"
            onClick={closeMenu}
          >
            Community
          </Link>

          {/* Mobile Auth Buttons */}
          <div className="space-y-3 pt-4 border-t border-emerald-100/50">
            {/* Sign In Button */}
            <Link
              href="/auth/signin"
              className="block w-full py-3 px-4 text-center text-base font-medium text-gray-700 rounded-xl border border-gray-200 hover:border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50/70 transition-all duration-300"
              onClick={closeMenu}
            >
              Sign In
            </Link>

            {/* Sign Up Button */}
            <Link
              href="/auth/signup"
              className="block w-full py-3 px-4 text-center text-base font-medium text-white rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-md hover:shadow-lg hover:shadow-emerald-200/50 transition-all duration-300"
              onClick={closeMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}