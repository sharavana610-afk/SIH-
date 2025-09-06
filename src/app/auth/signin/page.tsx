"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getUser } from "@/lib/storage";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = getUser();
    if (!user) {
      alert("No account found. Please sign up first!");
      return router.push("/auth/signup");
    }
    if (user.email !== email) {
      return alert("Email not found. Try again or sign up.");
    }
    // ✅ password is not really checked here (for demo only)
    router.push("/dashboard");
  };

  return (
    <main className="space-y-10">
      <Navbar />
      <form
        onSubmit={submit}
        className="mx-auto max-w-md space-y-5 rounded-2xl border p-6 bg-white/70 shadow-sm"
      >
        <h2 className="text-2xl font-bold">Sign In</h2>
        <input
          className="w-full rounded-xl border p-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded-xl border p-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-600 py-3 text-white hover:bg-emerald-700"
        >
          Sign In
        </button>
      </form>
    </main>
  );
}
