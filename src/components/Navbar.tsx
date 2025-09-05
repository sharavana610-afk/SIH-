"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between rounded-2xl border p-3 bg-white/70 backdrop-blur shadow-sm">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Leaf className="h-6 w-6 text-emerald-600" />
        <span>GreenSpark</span>
      </Link>
      <div className="flex items-center gap-3 text-sm">
        <Link href="/community" className="hover:text-emerald-700">
          Community
        </Link>
        <Link
          href="/auth/signin"
          className="rounded-lg border px-3 py-1.5 hover:bg-emerald-50"
        >
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-white hover:bg-emerald-700"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
