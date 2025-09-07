"use client";

import React from 'react';
import { 
  Trophy, 
  Star, 
  Award, 
  Users,
  Calendar,
  Download,
  TrendingUp,
  Globe,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import Navbar from '@/components/TeacherNavbar';

export default function CompetitionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Competitions & Recognition</h1>
          <p className="text-slate-600 text-lg">Celebrate achievements & engage with wider ecosystem</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-orange-600">5</span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Active Competitions</h3>
            <p className="text-sm text-slate-600">Currently participating</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-yellow-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-yellow-600">3rd</span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">National Ranking</h3>
            <p className="text-sm text-slate-600">Eco Innovation Challenge</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">0</span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Eco-Heroes</h3>
            <p className="text-sm text-slate-600">Students nominated</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">--%</span>
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Green School Progress</h3>
            <p className="text-sm text-slate-600">Towards certification</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Inter-School Competitions */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Inter-School Competitions</h2>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors">
                Register New
              </button>
            </div>

            <div className="space-y-4">
              {/* Active Competition */}
              <div className="border border-orange-200 rounded-2xl p-4 bg-orange-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                      <Trophy className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Eco Innovation Challenge 2025</h3>
                      <p className="text-sm text-slate-600">National level innovation competition</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-orange-200 text-orange-800 rounded-lg text-sm font-medium">
                    Participating
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-slate-600">Current Rank</p>
                    <p className="font-bold text-orange-600">3rd Nationally</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Participants</p>
                    <p className="font-bold text-slate-800">15 students</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Deadline</p>
                    <p className="font-bold text-slate-800">Oct 30, 2025</p>
                  </div>
                </div>
                <button className="text-sm text-orange-600 font-medium hover:text-orange-700">
                  View Details & Progress →
                </button>
              </div>

              {/* Available Competition */}
              <div className="border border-slate-200 rounded-2xl p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Green Quiz Championship</h3>
                      <p className="text-sm text-slate-600">Inter-school environmental quiz competition</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                    Register
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-slate-600">Level</p>
                    <p className="font-bold text-slate-800">District</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Prize Pool</p>
                    <p className="font-bold text-slate-800">₹50,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Registration</p>
                    <p className="font-bold text-slate-800">Till Oct 15</p>
                  </div>
                </div>
              </div>

              {/* Another Competition */}
              <div className="border border-slate-200 rounded-2xl p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Climate Action Hackathon</h3>
                      <p className="text-sm text-slate-600">48-hour climate solution development</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                    Register
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-slate-600">Level</p>
                    <p className="font-bold text-slate-800">State</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Team Size</p>
                    <p className="font-bold text-slate-800">3-5 students</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Date</p>
                    <p className="font-bold text-slate-800">Nov 10-12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard Standings */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Leaderboard Standings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Class Level</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-bold">1st</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">School Level</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-bold">2nd</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">District Level</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-bold">5th</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">National Level</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-bold">3rd</span>
                </div>
              </div>
            </div>

            {/* Eco-Hero Nominations */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Eco-Hero Nominations</h3>
                <button className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-sm">
                  Nominate
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-800">No nominations yet</h4>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-lg">Pending</span>
                  </div>
                  <p className="text-sm text-slate-600">Student nominations will appear here</p>
                </div>
                
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-800">No approved nominations</h4>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-lg">None</span>
                  </div>
                  <p className="text-sm text-slate-600">Approved nominations will appear here</p>
                </div>
              </div>
            </div>

            {/* Green School Progress */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Green School of the Year</h3>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Overall Progress</span>
                  <span className="text-sm font-bold text-green-600">78%</span>
                </div>
                <div className="w-full bg-green-100 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full w-3/4"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Environmental Education</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Waste Management</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Energy Conservation</span>
                  <Clock className="w-4 h-4 text-orange-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Water Management</span>
                  <Clock className="w-4 h-4 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Certificates & Downloads */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Certificates & Reports</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
                  <span className="text-sm font-medium text-slate-800">Generate Participation Certificates</span>
                  <Download className="w-4 h-4 text-blue-600" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition-shadow">
                  <span className="text-sm font-medium text-slate-800">Excellence Certificates</span>
                  <Download className="w-4 h-4 text-green-600" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition-shadow">
                  <span className="text-sm font-medium text-slate-800">Impact Report (PDF)</span>
                  <Download className="w-4 h-4 text-purple-600" />
                </button>
              </div>
            </div>

            {/* NGO/CSR Integration */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">NGO/CSR Campaigns</h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h4 className="font-medium text-slate-800 mb-1">Green Earth Foundation</h4>
                  <p className="text-sm text-slate-600 mb-2">City cleanup drive participation</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-600">Impact: 250kg waste collected</span>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg">Active</span>
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-medium text-slate-800 mb-1">Water Warriors NGO</h4>
                  <p className="text-sm text-slate-600 mb-2">Water conservation awareness</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600">Impact: 500+ families reached</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
