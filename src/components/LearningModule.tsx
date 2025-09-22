"use client";
import { useEffect, useState } from "react";
import { BookOpen, Gamepad2, Brain, Play, CheckCircle, Clock, Users } from "lucide-react";

// Define the structure of a learning module
interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: "comic" | "game" | "quiz";
  enrolled: boolean;
  progress: number; // 0 - 100
}

export default function LearningModulesComponent() {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [loading, setLoading] = useState(false);

  // Get appropriate icon for module type
  const getModuleIcon = (type: string) => {
    switch (type) {
      case "comic": return BookOpen;
      case "game": return Gamepad2;
      case "quiz": return Brain;
      default: return BookOpen;
    }
  };

  // Get type-specific styling
  const getTypeColor = (type: string) => {
    switch (type) {
      case "comic": return "from-emerald-500 to-cyan-400";
      case "game": return "from-cyan-400 to-emerald-500";
      case "quiz": return "from-emerald-600 to-emerald-400";
      default: return "from-emerald-500 to-cyan-400";
    }
  };

  // Fetch all learning modules (GET)
  const fetchModules = async () => {
    setLoading(true);
    try {
      // Replace with your FastAPI endpoint later
      // const res = await fetch("http://localhost:8000/api/modules");
      // const data = await res.json();
      // setModules(data);

      // Placeholder data for now
      setModules([
        {
          id: "1",
          title: "Eco Explorers Comic",
          description: "Learn about Earth through a fun comic story.",
          type: "comic",
          enrolled: false,
          progress: 0,
        },
        {
          id: "2",
          title: "Recycling Challenge",
          description: "Interactive game about recycling waste correctly.",
          type: "game",
          enrolled: true,
          progress: 40,
        },
        {
          id: "3",
          title: "Climate Quiz Master",
          description: "Test your knowledge about climate change and solutions.",
          type: "quiz",
          enrolled: true,
          progress: 75,
        },
      ]);
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setLoading(false);
    }
  };

  // Enroll in a module (POST)
  const enrollModule = async (moduleId: string) => {
    try {
      // Replace with FastAPI POST request
      // await fetch(`http://localhost:8000/api/modules/${moduleId}/enroll`, { method: "POST" });

      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId ? { ...m, enrolled: true, progress: 0 } : m
        )
      );
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  // Update progress (PUT)
  const updateProgress = async (moduleId: string, newProgress: number) => {
    try {
      // Replace with FastAPI PUT request
      // await fetch(`http://localhost:8000/api/modules/${moduleId}/progress`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ progress: newProgress }),
      // });

      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId ? { ...m, progress: newProgress } : m
        )
      );
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-xl flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Learning Modules</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="animate-pulse space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2 mt-2"></div>
                  </div>
                </div>
                <div className="h-20 bg-slate-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Learning Modules</h2>
            <p className="text-slate-500 text-sm mt-1">
              Discover interactive learning experiences
            </p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{modules.filter(m => m.enrolled).length} Enrolled</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{modules.length} Available</span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {!loading && modules.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No modules available</h3>
          <p className="text-slate-500">Check back soon for new learning content!</p>
        </div>
      )}

      {/* Modules Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const IconComponent = getModuleIcon(module.type);
          const isComplete = module.progress === 100;
          
          return (
            <div
              key={module.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className={`relative h-24 bg-gradient-to-r ${getTypeColor(module.type)} p-6`}>
                <div className="flex items-center justify-between h-full">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-white/80 text-xs font-medium uppercase tracking-wider">
                        {module.type}
                      </span>
                    </div>
                  </div>
                  
                  {module.enrolled && (
                    <div className="text-white/90">
                      {isComplete ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <div className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
                          {module.progress}%
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {module.description}
                  </p>
                </div>

                {/* Progress Section */}
                {module.enrolled && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Progress</span>
                      <span className="text-emerald-600 font-bold">{module.progress}%</span>
                    </div>
                    
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                    
                    {isComplete && (
                      <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completed!</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2">
                  {!module.enrolled ? (
                    <button
                      onClick={() => enrollModule(module.id)}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" />
                        <span>Start Learning</span>
                      </div>
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() =>
                            updateProgress(module.id, Math.min(module.progress + 10, 100))
                          }
                          disabled={isComplete}
                          className="flex items-center justify-center gap-2 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          <span>+10%</span>
                        </button>
                        
                        <button className="flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-medium rounded-lg transition-all text-sm">
                          <Play className="w-3 h-3" />
                          <span>Continue</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Summary */}
      {modules.length > 0 && (
        <div className="bg-gradient-to-r from-slate-50 to-emerald-50/50 rounded-2xl p-6 border border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {modules.filter(m => m.enrolled).length}
              </div>
              <div className="text-sm text-slate-600">Modules Enrolled</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {modules.filter(m => m.progress === 100).length}
              </div>
              <div className="text-sm text-slate-600">Completed</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {Math.round(
                  modules.reduce((acc, m) => acc + (m.enrolled ? m.progress : 0), 0) / 
                  Math.max(modules.filter(m => m.enrolled).length, 1)
                )}%
              </div>
              <div className="text-sm text-slate-600">Average Progress</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}