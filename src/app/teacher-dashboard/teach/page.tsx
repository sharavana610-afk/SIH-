"use client";

import React from 'react';
import { 
  BookOpen, 
  Users, 
  Upload, 
  Calendar,
  CheckCircle,
  Play,
  FileText,
  Target,
  Clock,
  BarChart3
} from 'lucide-react';
import Navbar from '@/components/TeacherNavbar';

export default function TeachPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Teach & Manage</h1>
          <p className="text-slate-600 text-lg">Assign and manage eco-learning modules</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <button className="bg-white p-4 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all hover:border-emerald-200">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Assign Lesson</h3>
            <p className="text-sm text-slate-600">Quick assignment</p>
          </button>
          
          <button className="bg-white p-4 rounded-2xl border border-blue-100 hover:shadow-lg transition-all hover:border-blue-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Upload Resource</h3>
            <p className="text-sm text-slate-600">Add materials</p>
          </button>
          
          <button className="bg-white p-4 rounded-2xl border border-purple-100 hover:shadow-lg transition-all hover:border-purple-200">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Schedule Project</h3>
            <p className="text-sm text-slate-600">Plan activities</p>
          </button>
          
          <button className="bg-white p-4 rounded-2xl border border-orange-100 hover:shadow-lg transition-all hover:border-orange-200">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">View Progress</h3>
            <p className="text-sm text-slate-600">Track completion</p>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lesson Library */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Lesson Library (NEP 2020 Aligned)</h2>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
                Add New Lesson
              </button>
            </div>

            {/* Grade Level Tabs */}
            <div className="flex space-x-1 mb-6 bg-slate-100 rounded-xl p-1">
              <button className="flex-1 py-2 px-4 bg-white rounded-lg shadow-sm font-medium text-slate-800">Primary</button>
              <button className="flex-1 py-2 px-4 rounded-lg font-medium text-slate-600 hover:text-slate-800">Secondary</button>
              <button className="flex-1 py-2 px-4 rounded-lg font-medium text-slate-600 hover:text-slate-800">Higher Sec</button>
            </div>

            {/* Primary Lessons */}
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-2xl p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
                      <BookOpen className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Super Tree Adventures</h3>
                      <p className="text-sm text-slate-600">Interactive comic about forest conservation</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">Assign</button>
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">Preview</button>
                  </div>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>15 min • Primary Level</span>
                  <span className="mx-2">•</span>
                  <span>Ready to assign</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Plant Care Basics</h3>
                      <p className="text-sm text-slate-600">Hands-on gardening and plant adoption</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">Assign</button>
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">Preview</button>
                  </div>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>20 min • Primary Level</span>
                  <span className="mx-2">•</span>
                  <span>Ready to assign</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                      <Play className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Waste Sorting Game</h3>
                      <p className="text-sm text-slate-600">Interactive game on waste management</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">Assign</button>
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">Preview</button>
                  </div>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>10 min • Primary Level</span>
                  <span className="mx-2">•</span>
                  <span>Ready to assign</span>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Panel */}
          <div className="space-y-6">
            {/* Current Assignments */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Active Assignments</h3>
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-800">No active assignments</h4>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">Ready</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Create your first assignment</p>
                  <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                    + Create Assignment
                  </button>
                </div>

                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-800">Upload Resources</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">Available</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">Add learning materials</p>
                  <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                    + Upload Content
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Resources */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Upload Resources</h3>
              <div className="space-y-3">
                <button className="w-full p-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-emerald-300 transition-colors">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">Upload Worksheet</p>
                </button>
                <button className="w-full p-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-300 transition-colors">
                  <Play className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">Upload Video</p>
                </button>
                <button className="w-full p-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-purple-300 transition-colors">
                  <FileText className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">Upload Article</p>
                </button>
              </div>
            </div>

            {/* Scheduled Projects */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Scheduled Projects</h3>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                  <h4 className="font-medium text-slate-800 mb-1">Biodiversity Survey</h4>
                  <p className="text-sm text-slate-600">Sept 25 - Oct 5</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <h4 className="font-medium text-slate-800 mb-1">Energy Audit Challenge</h4>
                  <p className="text-sm text-slate-600">Oct 10 - Oct 20</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
