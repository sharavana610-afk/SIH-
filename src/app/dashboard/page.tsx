"use client";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import BadgeCard from "@/components/BadgeCard";
import ModuleCard from "@/components/ModuleCard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-cyan-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-100/30 to-cyan-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-100/30 to-emerald-100/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <div className="relative px-6 lg:px-8 pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Hero with better typography and spacing */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-emerald-200/50 mb-6 shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-emerald-800">Welcome back to learning</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-400 to-emerald-500 bg-clip-text text-transparent mb-6 leading-tight">
              Student Dashboard
            </h1>
            <p className="text-slate-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Track your progress, earn badges, and explore engaging learning modules designed just for you
            </p>
          </div>

          {/* Enhanced Profile and Badge Cards Section */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            <div className="group transform hover:scale-[1.02] transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-cyan-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <ProfileCard />
              </div>
            </div>
            
            <div className="group transform hover:scale-[1.02] transition-all duration-500 hover:-translate-y-2" style={{transitionDelay: '50ms'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-emerald-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <BadgeCard />
              </div>
            </div>
            
            {/* Enhanced Quick Stats Card */}
            <div className="group transform hover:scale-[1.02] transition-all duration-500 hover:-translate-y-2 hidden xl:block" style={{transitionDelay: '100ms'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/20 to-cyan-300/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-200/50 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center h-full flex flex-col justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-3 text-lg">Quick Stats</h3>
                  <p className="text-slate-600 mb-4">More insights coming soon</p>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-2 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">75% Progress</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Learning Modules Section */}
          <section className="space-y-10">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-cyan-200/50 mb-6 shadow-sm">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-cyan-800">Interactive Learning</span>
              </div>
              
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
                Learning Modules
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                Interactive content designed to make learning fun, engaging, and memorable
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Comic Module */}
              <div className="group transform hover:scale-[1.02] transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-emerald-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <ModuleCard
                      type="comic"
                      title="Super Tree Saves the Day"
                      desc="A comic about how trees clean the air."
                    />
                  </div>
                </div>
              </div>
              
              {/* Game Module */}
              <div className="group transform hover:scale-[1.02] transition-all duration-500 hover:-translate-y-2" style={{transitionDelay: '50ms'}}>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <ModuleCard
                      type="game"
                      title="Eco Run"
                      desc="Collect water drops, avoid plastic waste!"
                    />
                  </div>
                </div>
              </div>
              
              {/* Quiz Module */}
              <div className="group transform hover:scale-[1.02] transition-all duration-500 hover:-translate-y-2 sm:col-span-2 lg:col-span-1" style={{transitionDelay: '100ms'}}>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <ModuleCard
                      type="quiz"
                      title="Climate Change Basics"
                      desc="Test your knowledge with fun questions."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Call to Action Section */}
            <div className="mt-16 text-center">
              <div className="relative max-w-3xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-cyan-400/10 rounded-3xl blur-2xl"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-emerald-200/50 p-10 shadow-xl">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl">🚀</span>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
                    Ready to Learn More?
                  </h3>
                  <p className="text-slate-600 mb-8 text-lg leading-relaxed max-w-xl mx-auto">
                    Explore additional modules and challenge yourself with new topics designed to expand your knowledge
                  </p>
                  
                  <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-400 text-white font-bold rounded-2xl hover:from-emerald-700 hover:to-cyan-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                    <span>Discover More</span>
                    <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                  
                  <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-slate-500">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                      Interactive Content
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                      Progress Tracking
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                      Achievement Badges
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}