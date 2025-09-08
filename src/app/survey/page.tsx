"use client";
// src/app/survey/page.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/storage";
import { School, MapPin, Leaf, ChevronDown, CheckCircle } from "lucide-react";

export default function SurveyPage() {
  const router = useRouter();
  const user = getUser();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [field, setField] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!name.trim()) {
      newErrors.name = `Please enter your ${user?.stage === "school" ? "school" : "college"} name`;
    }
    if (!location.trim()) {
      newErrors.location = "Please enter your location";
    }
    if (!field) {
      newErrors.field = "Please select a field of conservation";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const surveyData = {
      stage: user?.stage,
      schoolLevel: user?.schoolLevel,
      name,
      location,
      field,
    };

    localStorage.setItem("surveyData", JSON.stringify(surveyData));

    if (user?.stage === "school") {
      if (user.schoolLevel === "primary") {
        router.push("/dashboard/school/primary");
      } else if (user.schoolLevel === "secondary") {
        router.push("/dashboard/school/secondary");
      } else if (user.schoolLevel === "higher") {
        router.push("/dashboard/school/higher");
      }
    } else if (user?.stage === "college") {
      router.push("/dashboard/college");
    } else {
      router.push("/dashboard");
    }
  };

  const conservationOptions = [
    { value: "wildlife", label: "Wildlife Conservation" },
    { value: "forests", label: "Forest Conservation" },
    { value: "oceans", label: "Ocean & Marine Life" },
    { value: "climate", label: "Climate Change" },
    { value: "water", label: "Water Conservation" },
    { value: "renewable", label: "Renewable Energy" },
    { value: "sustainable_agriculture", label: "Sustainable Agriculture" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ backgroundColor: '#ECFDF5' }}
            >
              <School className="w-8 h-8" style={{ color: '#059669' }} />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#0F172A' }}>
              {user?.stage === "school" ? "School Information" : "College Information"}
            </h1>
            <p className="text-lg" style={{ color: '#64748B' }}>
              Tell us about your institution and conservation interests
            </p>
          </div>

          {/* Form Card */}
          <div 
            className="rounded-2xl shadow-lg p-8"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}
          >
            <div className="space-y-6">
              {/* Institution Name */}
              <div>
                <label className="flex items-center text-sm font-semibold mb-3" style={{ color: '#334155' }}>
                  <School className="w-4 h-4 mr-2" style={{ color: '#059669' }} />
                  {user?.stage === "school" ? "School Name" : "College Name"}
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none text-slate-900 placeholder-slate-400 focus:ring-2 ${
                    errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'focus:ring-opacity-20'
                  }`}
                  style={{ 
                    borderColor: errors.name ? '#F87171' : '#E2E8F0',
                  }}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors(prev => ({ ...prev, name: '' }));
                    }
                  }}
                  placeholder={`Enter your ${user?.stage === "school" ? "school" : "college"} name`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center text-sm font-semibold mb-3" style={{ color: '#334155' }}>
                  <MapPin className="w-4 h-4 mr-2" style={{ color: '#059669' }} />
                  Location
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg border-2 text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                    errors.location ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'focus:ring-opacity-20'
                  }`}
                  style={{
                    borderColor: errors.location ? '#F87171' : '#E2E8F0',
                    // focusBorderColor and focusRingColor are not valid CSS properties for inline styles
                  }}
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (errors.location) {
                      setErrors(prev => ({ ...prev, location: '' }));
                    }
                  }}
                  placeholder="Enter your city, state/province, country"
                />
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                )}
              </div>

              {/* Field of Conservation */}
              <div>
                <label className="flex items-center text-sm font-semibold mb-3" style={{ color: '#334155' }}>
                  <Leaf className="w-4 h-4 mr-2" style={{ color: '#059669' }} />
                  Interested Field of Conservation
                </label>
                <div className="relative">
                  <select
                    className={`w-full px-4 py-3 pr-10 rounded-lg border-2 appearance-none transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.field ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'focus:ring-opacity-20'
                    }`}
                    style={{
                      borderColor: errors.field ? '#F87171' : '#E2E8F0',
                      backgroundColor: '#FFFFFF',
                      color: field ? '#0F172A' : '#94A3B8',
                    }}
                    value={field}
                    onChange={(e) => {
                      setField(e.target.value);
                      if (errors.field) {
                        setErrors(prev => ({ ...prev, field: '' }));
                      }
                    }}
                  >
                    <option value="">Choose your area of interest</option>
                    {conservationOptions.map((option) => (
                      <option key={option.value} value={option.value} style={{ color: '#0F172A' }}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    style={{ color: '#94A3B8' }}
                  />
                </div>
                {errors.field && (
                  <p className="mt-2 text-sm text-red-600">{errors.field}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid #E2E8F0' }}>
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center px-6 py-4 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-opacity-20"
                style={{
                  backgroundColor: '#059669',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#047857';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#059669';
                }}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Complete Survey
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm" style={{ color: '#94A3B8' }}>
              Your information helps us create personalized conservation content
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}