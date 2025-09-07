import React from 'react';
import { TreePine, Gamepad2, BookOpen, Users, Award, Target , Zap, Globe, Star, ChevronRight, Play, CheckCircle } from 'lucide-react';

// 
import Navbar from '@/components/Navbar';
export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                Revolutionizing Environmental Education
              </div>
              
             <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight">
                <span className="block text-black">Learn Green,</span>
                <span className="block text-black">Play Bold —</span>
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                 GreenSpark
                   </span>
              </h1>

              
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                Interactive environmental learning platform combining <strong>comics, games, and real-world activities</strong> for Indian school students across all levels.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/auth/signup"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Start Your Eco Journey
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/auth/signin"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-200 text-emerald-700 rounded-2xl font-semibold text-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Sign In
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-100 p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Target className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Age-Tailored</h3>
                        <p className="text-sm text-slate-600">Primary to Higher Secondary</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Comics</h3>
                        <p className="text-sm text-slate-600">Engaging storytelling</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Gamepad2 className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Games</h3>
                        <p className="text-sm text-slate-600">Interactive simulations</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Award className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Rewards</h3>
                        <p className="text-sm text-slate-600">Badges & Leaderboards</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-emerald-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Community Driven</span>
                    <div className="flex items-center space-x-1 text-emerald-600 font-semibold">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Eco-Actions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section id="curriculum" className="px-6 py-20 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Curriculum Design by <span className="text-emerald-600">Student Category</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Age-appropriate environmental education tailored for Indian school students across three distinct learning levels.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Primary Students */}
            <div className="group bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 border border-yellow-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center mr-4">
                  <TreePine className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Primary</h3>
                  <p className="text-yellow-600 font-medium">Classes 1-5</p>
                </div>
              </div>
              
              <p className="text-slate-600 mb-6">Create awareness and spark curiosity about nature through joyful, colorful storytelling.</p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Comics</h4>
                    <p className="text-sm text-slate-600">&quot;Super Tree Saves the Day&quot;, &quot;Plastic Monster vs. Eco Kids&quot;</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Games</h4>
                    <p className="text-sm text-slate-600">Waste sorting, virtual tree-planting, &quot;Eco Run&quot;</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Activities</h4>
                    <p className="text-sm text-slate-600">Craft from waste, &quot;Adopt a Plant&quot; projects</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Students */}
            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Secondary</h3>
                  <p className="text-blue-600 font-medium">Classes 6-10</p>
                </div>
              </div>
              
              <p className="text-slate-600 mb-6">Build scientific understanding and foster responsibility through real-time eco actions.</p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Comics</h4>
                    <p className="text-sm text-slate-600">&quot;Carbon Detective&quot;, &quot;Water Warriors&quot;</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Games</h4>
                    <p className="text-sm text-slate-600">Sustainable city builder, climate change quizzes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Activities</h4>
                    <p className="text-sm text-slate-600">Recycling drives, water usage measurement</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Higher Secondary Students */}
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Higher Secondary</h3>
                  <p className="text-purple-600 font-medium">Classes 11-12</p>
                </div>
              </div>
              
              <p className="text-slate-600 mb-6">Deepen scientific knowledge and encourage community action through advanced projects.</p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Comics</h4>
                    <p className="text-sm text-slate-600">&quot;The Last Forest&quot;, &quot;Climate 2050&quot;</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Games</h4>
                    <p className="text-sm text-slate-600">&quot;Survival Earth&quot;, energy simulations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-800">Activities</h4>
                    <p className="text-sm text-slate-600">Water quality testing, biodiversity mapping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Cross-Level <span className="text-emerald-600">Features</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Gamified learning system that promotes environmental literacy and sustainable practices across all age groups.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300 hover:border-emerald-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Eco-Points System</h3>
              <p className="text-slate-600 text-sm">Earn points for completing activities, quizzes, and real eco-friendly actions.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">School Competitions</h3>
              <p className="text-slate-600 text-sm">&quot;Green School of the Year&quot; recognition and inter-school challenges.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300 hover:border-purple-200">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Digital Badges</h3>
              <p className="text-slate-600 text-sm">Collect achievement badges and climb leaderboards with fellow students.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-all duration-300 hover:border-orange-200">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Community Action</h3>
              <p className="text-slate-600 text-sm">Partner with NGOs for tree-planting and waste management drives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="px-6 py-20 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">Expected Impact</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-12">
            Transforming environmental education to build a generation of eco-conscious leaders aligned with NEP 2020 and UN SDGs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Environmental Literacy</h3>
              <p className="opacity-90">Build comprehensive understanding across all age groups with scientifically accurate content.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Habit Formation</h3>
              <p className="opacity-90">Encourage sustainable practices and eco-friendly behaviors in daily life.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Student-Led Initiatives</h3>
              <p className="opacity-90">Promote community leadership and environmental activism in schools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Ready to Spark the <span className="text-emerald-600">Green Revolution?</span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning, playing, and making a difference with GreenSpark&apos;s interactive environmental education platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/signup"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Learning Today
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/auth/signin"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-200 text-emerald-700 rounded-2xl font-semibold text-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
            >
              Sign In to Continue
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}