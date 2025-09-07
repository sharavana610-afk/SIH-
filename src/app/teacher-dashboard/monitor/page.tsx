"use client";

import React from 'react';
import { 
  Users, 
  BarChart3, 
  CheckCircle, 
  Download,
  Search,
  Filter,
  Award,
  Target,
  TrendingUp,
  FileText,
  Image,
  Calendar
} from 'lucide-react';
import Navbar from '@/components/TeacherNavbar';

export default function MonitorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Monitor & Engage</h1>
          <p className="text-slate-600 text-lg">Evaluate student actions & encourage teamwork</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search students, projects, or activities..."
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <button className="flex items-center px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50">
            <Filter className="w-5 h-5 mr-2 text-slate-600" />
            Filter
          </button>
          <button className="flex items-center px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">
            <Download className="w-5 h-5 mr-2" />
            Generate Report
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Student Profiles */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Student Profiles</h2>
            
            <div className="space-y-4">
              {/* No Students Message */}
              <div className="border border-slate-200 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">No Students Enrolled</h3>
                <p className="text-slate-600 mb-4">Add students to your class to start monitoring their progress</p>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Add Students
                </button>
              </div>
            </div>
          </div>

          {/* Class Analytics & Submissions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Class Analytics */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Class Analytics Dashboard</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-emerald-800">Lesson Progress</span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-600">--%</p>
                  <p className="text-xs text-slate-600">Completion rate</p>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-800">Quiz Scores</span>
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">--%</p>
                  <p className="text-xs text-slate-600">Average performance</p>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-800">Participation</span>
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600">--%</p>
                  <p className="text-xs text-slate-600">Active students</p>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-orange-800">Submissions</span>
                    <FileText className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold text-orange-600">0</p>
                  <p className="text-xs text-slate-600">Pending reviews</p>
                </div>
              </div>
            </div>

            {/* Pending Submissions */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Pending Approvals</h3>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                  8 pending
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center">
                    <Image className="w-5 h-5 text-slate-400 mr-3" />
                    <div>
                      <p className="font-medium text-slate-800">Eco-Art Submission</p>
                      <p className="text-sm text-slate-600">No submissions pending</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm">Approve</button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm">Reject</button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-slate-400 mr-3" />
                    <div>
                      <p className="font-medium text-slate-800">Project Report</p>
                      <p className="text-sm text-slate-600">Priya Reddy • Water conservation study</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm">Approve</button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm">Reject</button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center">
                    <Image className="w-5 h-5 text-slate-400 mr-3" />
                    <div>
                      <p className="font-medium text-slate-800">Real-world Action</p>
                      <p className="text-sm text-slate-600">Rahul Kumar • Community cleanup photos</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm">Approve</button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm">Reject</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Eco-Clubs Management */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Eco-Clubs</h3>
                <button className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-sm">
                  Create New Club
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-800">Green Warriors</h4>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg">Active</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">12 members • Current project: School garden</p>
                  <button className="text-sm text-emerald-600 font-medium">Manage Club</button>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-800">Water Protectors</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">Active</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">8 members • Current project: Rain water harvesting</p>
                  <button className="text-sm text-blue-600 font-medium">Manage Club</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
