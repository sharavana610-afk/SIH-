"use client";

import React from 'react';
import { 
  Home, 
  Target, 
  Star, 
  TrendingUp, 
  Bell, 
  Users, 
  Award,
  Calendar,
  CheckCircle,
  Trophy
} from 'lucide-react';
import Navbar from '@/components/TeacherNavbar';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Dashboard Overview</h1>
          <p className="text-slate-600 text-lg">Quick overview of class & school eco-progress</p>
        </div>

        {/* Class Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-2xl font-bold text-emerald-600">--</span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Average Eco-Points</h3>
            <p className="text-sm text-slate-600">Class performance metrics</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">--</span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Badges Earned</h3>
            <p className="text-sm text-slate-600">Student achievements</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">--</span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Active Streaks</h3>
            <p className="text-sm text-slate-600">Learning consistency</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-orange-600">--</span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Enrolled Students</h3>
            <p className="text-sm text-slate-600">Active participants</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Tasks */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 text-emerald-600 mr-3" />
              <h2 className="text-xl font-bold text-slate-800">Upcoming Tasks & Deadlines</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                <div>
                  <p className="font-medium text-slate-800">Plastic-Free Week Challenge</p>
                  <p className="text-sm text-slate-600">Due: Sept 15, 2025</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-slate-800">Water Conservation Quiz</p>
                  <p className="text-sm text-slate-600">Due: Sept 20, 2025</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-purple-50 rounded-xl border border-purple-100">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-slate-800">Biodiversity Mapping Project</p>
                  <p className="text-sm text-slate-600">Due: Sept 25, 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Eco-Hero of the Week */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center mb-6">
              <Star className="w-6 h-6 text-yellow-600 mr-3" />
              <h2 className="text-xl font-bold text-slate-800">Eco-Hero of the Week</h2>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="text-3xl text-white" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">No nominations yet</h3>
              <p className="text-slate-600 mb-4">Nominate outstanding students</p>
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                <p className="text-sm text-slate-700">
                  Select exceptional students who demonstrate environmental leadership and initiative in your class.
                </p>
                <button className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors">
                  Nominate Student
                </button>
              </div>
            </div>
          </div>

          {/* School Leaderboard */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center mb-6">
              <Trophy className="w-6 h-6 text-orange-600 mr-3" />
              <h2 className="text-xl font-bold text-slate-800">School Leaderboard</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  <span className="font-medium text-slate-800">Your Class</span>
                </div>
                <span className="font-bold text-yellow-600">-- pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">--</span>
                  <span className="font-medium text-slate-800">School Average</span>
                </div>
                <span className="font-bold text-gray-600">-- pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">--</span>
                  <span className="font-medium text-slate-800">District Rank</span>
                </div>
                <span className="font-bold text-emerald-600">-- pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="mt-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center mb-6">
            <Bell className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-slate-800">Notifications</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">NGO Partnership Opportunity</h4>
                  <p className="text-sm text-slate-600 mb-2">Green Earth Foundation is organizing a city-wide cleanup drive next month.</p>
                  <span className="text-xs text-blue-600 font-medium">2 hours ago</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Inter-School Competition</h4>
                  <p className="text-sm text-slate-600 mb-2">Registration open for "Eco Innovation Challenge 2025" - deadline Sept 30.</p>
                  <span className="text-xs text-green-600 font-medium">5 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
