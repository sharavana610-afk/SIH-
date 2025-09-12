"use client";
//greenspark/src/app/auth/signup/page.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import EducationStagePicker, { EducationStage, SchoolLevel } from "../../../components/EducationStagePicker";
import { saveUser } from "../../../lib/storage";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState<EducationStage | undefined>();
  const [level, setLevel] = useState<SchoolLevel | undefined>();
  const [course, setCourse] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleStage = (s: EducationStage, l?: SchoolLevel, c?: string) => {
    setStage(s);
    setLevel(l);
    setCourse(c);
    // Clear stage error when user selects something
    if (errors.stage) {
      setErrors(prev => ({ ...prev, stage: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!stage) newErrors.stage = "Please select your education stage";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;
  setIsLoading(true);

  try {
    // 1. Check if user already exists
    const checkRes = await fetch(`/api/users?email=${email}`);
    const checkData = await checkRes.json();
    if (checkData.exists) {
      setErrors({ email: "Email already registered" });
      setIsLoading(false);
      return;
    }

    // 2. Create new user
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      setErrors({ email: err.error || "Signup failed" });
      return;
    }

    // Save locally (simulate DB login)
    saveUser({
      name,
      email,
      stage: stage!,
       schoolLevel: level,
      collegeCourse: course,
      xp: 1200,
      badges: ["Eco Beginner", "Tree Planter"],
    });

    router.push("/survey");
  } catch (error) {
    console.error("Signup failed:", error);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-slate-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              Welcome to GreenSpark!
            </h1>
            <p className="text-lg text-slate-600 max-w-md mx-auto">
              Create your account and start your educational journey with us
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-8">
              <form onSubmit={submit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                    Full Name <span className="text-emerald-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      className={`w-full rounded-xl border-2 p-4 pl-12 text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                        errors.name 
                          ? 'border-red-300 bg-red-50/50' 
                          : 'border-slate-200 bg-white focus:border-emerald-400'
                      }`}
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                      }}
                    />
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  {errors.name && <p className="text-sm text-red-500 ml-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                    Email Address <span className="text-emerald-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      className={`w-full rounded-xl border-2 p-4 pl-12 text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                        errors.email 
                          ? 'border-red-300 bg-red-50/50' 
                          : 'border-slate-200 bg-white focus:border-emerald-400'
                      }`}
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                      }}
                    />
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {errors.email && <p className="text-sm text-red-500 ml-1">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                    Password <span className="text-emerald-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      className={`w-full rounded-xl border-2 p-4 pl-12 text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                        errors.password 
                          ? 'border-red-300 bg-red-50/50' 
                          : 'border-slate-200 bg-white focus:border-emerald-400'
                      }`}
                      placeholder="Create a secure password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                      }}
                    />
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  {errors.password && <p className="text-sm text-red-500 ml-1">{errors.password}</p>}
                  {password && password.length < 6 && !errors.password && (
                    <p className="text-sm text-slate-500 ml-1">Password strength: Weak</p>
                  )}
                </div>

                {/* Education Stage */}
                <div className={`space-y-2 p-4 rounded-xl transition-all duration-200 ${
                  errors.stage ? 'bg-red-50/50 border border-red-200' : 'bg-slate-50'
                }`}>
                  <label className="block text-sm font-semibold text-slate-700">
                    Education Stage <span className="text-emerald-500">*</span>
                  </label>
                  <EducationStagePicker onChange={handleStage} />
                  {errors.stage && <p className="text-sm text-red-500 ml-1">{errors.stage}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 py-4 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-emerald-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Continue to Survey</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Additional Info */}
                <div className="text-center pt-4">
                  <p className="text-sm text-slate-500">
                    Already have an account?{' '}
                    <button 
                      type="button"
                      className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
                      onClick={() => router.push('/login')}
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </form>
            </div>

            {/* Bottom Accent */}
            <div className="h-2 bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500"></div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure & Protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Quick Setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No Spam Promise</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
