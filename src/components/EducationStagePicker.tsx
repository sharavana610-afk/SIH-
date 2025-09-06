"use client";
import { useState } from "react";
import { School, GraduationCap, UserCheck, BookOpen, User, Check } from "lucide-react";

export type EducationStage = "school" | "college" | "teacher";
export type SchoolLevel = "primary" | "secondary" | "higher";

export default function EducationStagePicker({
  onChange,
}: {
  onChange: (
    stage: EducationStage,
    level?: SchoolLevel,
    courseOrSubject?: string
  ) => void;
}) {
  const [stage, setStage] = useState<EducationStage | "">("");
  const [level, setLevel] = useState<SchoolLevel | "">("");
  const [course, setCourse] = useState("");

  const stageOptions = [
    {
      id: "school" as EducationStage,
      title: "School Student",
      description: "Primary to Higher Secondary",
      icon: School,
      gradient: "from-emerald-50 to-emerald-100"
    },
    {
      id: "college" as EducationStage,
      title: "College Student", 
      description: "Undergraduate & Graduate",
      icon: GraduationCap,
      gradient: "from-cyan-50 to-cyan-100"
    },
    {
      id: "teacher" as EducationStage,
      title: "Educator",
      description: "Teacher & Instructor",
      icon: UserCheck,
      gradient: "from-slate-50 to-slate-100"
    }
  ];

  const levelOptions = [
    {
      id: "primary" as SchoolLevel,
      title: "Primary School",
      description: "Classes 1-5",
      color: "emerald"
    },
    {
      id: "secondary" as SchoolLevel,
      title: "Secondary School", 
      description: "Classes 6-10",
      color: "cyan"
    },
    {
      id: "higher" as SchoolLevel,
      title: "Higher Secondary",
      description: "Classes 11-12", 
      color: "slate"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-3xl shadow-xl border border-slate-200/50">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-2xl mb-4">
          <BookOpen className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Choose Your Education Path</h2>
        <p className="text-slate-600 max-w-md mx-auto">Select your current educational level to receive personalized learning content and recommendations</p>
      </div>

      {/* Stage Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stageOptions.map((option) => {
          const IconComponent = option.icon;
          const isSelected = stage === option.id;
          
          return (
            <button
              key={option.id}
              type="button"
              className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                isSelected
                  ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-lg shadow-emerald-200/50"
                  : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white"
              }`}
              onClick={() => {
                setStage(option.id);
                setLevel("");
                setCourse("");
                onChange(option.id);
              }}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`p-3 rounded-xl ${
                  isSelected 
                    ? "bg-emerald-500 text-white" 
                    : "bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-600"
                } transition-all duration-300`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${
                    isSelected ? "text-emerald-800" : "text-slate-800"
                  }`}>
                    {option.title}
                  </h3>
                  <p className={`text-sm ${
                    isSelected ? "text-emerald-600" : "text-slate-500"
                  }`}>
                    {option.description}
                  </p>
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* School Level Selection */}
      {stage === "school" && (
        <div className="animate-in slide-in-from-top-4 duration-500 bg-gradient-to-r from-slate-50 to-emerald-50 rounded-2xl p-6 border border-slate-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <School className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Select Your School Level</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {levelOptions.map((option) => {
              const isSelected = level === option.id;
              const colorMap = {
                emerald: {
                  border: "border-emerald-400",
                  bg: "bg-gradient-to-br from-emerald-50 to-emerald-100",
                  shadow: "shadow-emerald-200/50",
                  text: "text-emerald-800",
                  subtext: "text-emerald-600"
                },
                cyan: {
                  border: "border-cyan-400", 
                  bg: "bg-gradient-to-br from-cyan-50 to-cyan-100",
                  shadow: "shadow-cyan-200/50",
                  text: "text-cyan-800",
                  subtext: "text-cyan-600"
                },
                slate: {
                  border: "border-slate-400",
                  bg: "bg-gradient-to-br from-slate-50 to-slate-100", 
                  shadow: "shadow-slate-200/50",
                  text: "text-slate-800",
                  subtext: "text-slate-600"
                }
              };
              
              const colors = colorMap[option.color as keyof typeof colorMap];
              
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                    isSelected
                      ? `${colors.border} ${colors.bg} shadow-md ${colors.shadow}`
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                  onClick={() => {
                    setLevel(option.id);
                    onChange("school", option.id);
                  }}
                >
                  <div className="text-center space-y-2">
                    <h4 className={`font-medium ${
                      isSelected ? colors.text : "text-slate-700"
                    }`}>
                      {option.title}
                    </h4>
                    <p className={`text-sm ${
                      isSelected ? colors.subtext : "text-slate-500"
                    }`}>
                      {option.description}
                    </p>
                  </div>
                  
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="w-2 h-2 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* College Course Input */}
      {stage === "college" && (
        <div className="animate-in slide-in-from-top-4 duration-500 bg-gradient-to-r from-slate-50 to-cyan-50 rounded-2xl p-6 border border-slate-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <GraduationCap className="w-5 h-5 text-cyan-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Enter Your Course Details</h3>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., BSc Biology, BTech Computer Science, MBA Finance"
              className="w-full p-4 pr-12 rounded-xl border-2 border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100 transition-all duration-300 text-base"
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                onChange("college", undefined, e.target.value);
              }}
            />
            {course && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <User className="w-4 h-4 text-slate-400" />
            <p className="text-sm text-slate-500">Enter your degree program and specialization</p>
          </div>
        </div>
      )}

      {/* Teacher Subject Input */}
      {stage === "teacher" && (
        <div className="animate-in slide-in-from-top-4 duration-500 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-200 rounded-lg">
              <UserCheck className="w-5 h-5 text-slate-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Enter Your Teaching Subject</h3>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., Mathematics, English Literature, Physics, History"
              className="w-full p-4 pr-12 rounded-xl border-2 border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all duration-300 text-base"
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                onChange("teacher", undefined, e.target.value);
              }}
            />
            {course && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <p className="text-sm text-slate-500">Specify your teaching subject or area of expertise</p>
          </div>
        </div>
      )}
    </div>
  );
}