"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getUser } from "@/lib/storage";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = getUser();
    if (!user) {
      alert("No account found. Please sign up first!");
      setIsLoading(false);
      return router.push("/auth/signup");
    }
    if (user.email !== email) {
      setIsLoading(false);
      return alert("Email not found. Try again or sign up.");
    }
    // ✅ password is not really checked here (for demo only)
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      <Navbar />
      
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div 
              className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: '#10B981' }}
            >
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold" style={{ color: '#0F172A' }}>
              Welcome Back
            </h1>
            <p className="mt-2" style={{ color: '#64748B' }}>
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-6">
            <div 
              className="rounded-2xl p-8 shadow-lg border"
              style={{ 
                backgroundColor: '#FFFFFF',
                borderColor: '#E2E8F0'
              }}
            >
              {/* Email Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium"
                  style={{ color: '#334155' }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                    style={{ color: '#94A3B8' }}
                  />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    style={{ 
                      backgroundColor: '#FFFFFF',
                      borderColor: '#CBD5E1'
                    }}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2 mt-6">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium"
                  style={{ color: '#334155' }}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                    style={{ color: '#94A3B8' }}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    style={{ 
                      backgroundColor: '#FFFFFF',
                      borderColor: '#CBD5E1'
                    }}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" style={{ color: '#94A3B8' }} />
                    ) : (
                      <Eye className="w-4 h-4" style={{ color: '#94A3B8' }} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full mt-8 py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:-translate-y-0.5"
                style={{ 
                  backgroundColor: '#10B981'
                }}
                onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = '#059669')}
                onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = '#10B981')}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </div>

            {/* Footer Links */}
            <div className="text-center space-y-4">
              <p style={{ color: '#64748B' }} className="text-sm">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => router.push("/auth/signup")}
                  className="font-medium hover:underline transition-colors"
                  style={{ color: '#10B981' }}
                >
                  Sign up here
                </button>
              </p>
              
              <button
                type="button"
                className="text-sm hover:underline transition-colors"
                style={{ color: '#64748B' }}
              >
                Forgot your password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}