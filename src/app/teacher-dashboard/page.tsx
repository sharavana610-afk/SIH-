"use client";

import React from 'react';
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  Trophy, 
  Users, 
  Calendar, 
  Target,
  Award,
  TrendingUp,
  Bell,
  Star,
  CheckCircle,
  ChevronRight,
  Globe,
  Zap,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/TeacherNavbar';

export default function TeacherDashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      {/* Video Hero Section */}
      <section className="relative h-96 rounded-2xl mx-4 lg:mx-8 mt-6 mb-16 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/teacher background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Clean Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Teacher Dashboard
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Empower your students with interactive environmental education
          </p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2 text-center">NEP 2020</h3>
            <p className="text-sm text-slate-600 text-center">Policy Compliant</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2 text-center">UN SDGs</h3>
            <p className="text-sm text-slate-600 text-center">Global Standards</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2 text-center">Multi-Level</h3>
            <p className="text-sm text-slate-600 text-center">All Grades</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2 text-center">Real-Time</h3>
            <p className="text-sm text-slate-600 text-center">Analytics</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link
            href="/teacher-dashboard/teach"
            className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Start Teaching
          </Link>
          <Link
            href="/teacher-dashboard/monitor"
            className="inline-flex items-center px-6 py-3 border-2 border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Monitor Progress
          </Link>
        </div>
      </section>      {/* Enhanced Platform Modules Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-emerald-100 text-emerald-800 rounded-full font-semibold mb-6">
            <Award className="w-5 h-5 mr-2" />
            Certified Educational Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Platform Modules</h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Advanced educational technology platform designed to revolutionize environmental education delivery, 
            featuring comprehensive analytics, adaptive learning pathways, and real-time student engagement tracking
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Dashboard Module */}
          <Link href="/teacher-dashboard/dashboard" className="group block">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-emerald-100 hover:shadow-2xl hover:shadow-emerald-100/20 transition-all duration-500 hover:-translate-y-2 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-teal-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 group-hover:rotate-6 transition-transform duration-300">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Analytics Dashboard</h2>
                    <p className="text-emerald-600 font-medium">Comprehensive progress monitoring</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                    <div className="flex items-center mb-2">
                      <Target className="w-5 h-5 text-emerald-600 mr-2" />
                      <span className="text-sm font-semibold text-emerald-800">Class Metrics</span>
                    </div>
                    <p className="text-xs text-slate-600">Performance analytics</p>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                    <div className="flex items-center mb-2">
                      <Award className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm font-semibold text-blue-800">Recognition</span>
                    </div>
                    <p className="text-xs text-slate-600">Achievement tracking</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-3" />
                    <span>Real-time progress monitoring</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-3" />
                    <span>School-wide performance analytics</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-3" />
                    <span>Government compliance reporting</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Teaching Module */}
          <Link href="/teacher-dashboard/teach" className="group block">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 hover:shadow-2xl hover:shadow-blue-100/20 transition-all duration-500 hover:-translate-y-2 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 group-hover:rotate-6 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Content Management</h2>
                    <p className="text-blue-600 font-medium">NEP 2020 aligned curriculum</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-100 text-center">
                    <span className="text-sm font-semibold text-yellow-800 block">Primary</span>
                    <span className="text-xs text-slate-600">Classes 1-5</span>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 text-center">
                    <span className="text-sm font-semibold text-blue-800 block">Secondary</span>
                    <span className="text-xs text-slate-600">Classes 6-10</span>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3 border border-purple-100 text-center">
                    <span className="text-sm font-semibold text-purple-800 block">Higher Sec</span>
                    <span className="text-xs text-slate-600">Classes 11-12</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-3" />
                    <span>Digital curriculum library</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-3" />
                    <span>Assignment management system</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-3" />
                    <span>Resource upload & distribution</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Monitoring Module */}
          <Link href="/teacher-dashboard/monitor" className="group block">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-purple-100 hover:shadow-2xl hover:shadow-purple-100/20 transition-all duration-500 hover:-translate-y-2 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 group-hover:rotate-6 transition-transform duration-300">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Student Engagement</h2>
                    <p className="text-purple-600 font-medium">Comprehensive monitoring tools</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-purple-600 mr-2" />
                      <span className="text-sm font-semibold text-purple-800">Student Data</span>
                    </div>
                    <p className="text-xs text-slate-600">Profile management</p>
                  </div>
                  <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-5 h-5 text-pink-600 mr-2" />
                      <span className="text-sm font-semibold text-pink-800">Analytics</span>
                    </div>
                    <p className="text-xs text-slate-600">Performance insights</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-3" />
                    <span>Submission review workflow</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-3" />
                    <span>Community project management</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-3" />
                    <span>Automated report generation</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Recognition Module */}
          <Link href="/teacher-dashboard/competitions" className="group block">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-orange-100 hover:shadow-2xl hover:shadow-orange-100/20 transition-all duration-500 hover:-translate-y-2 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-red-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4 group-hover:rotate-6 transition-transform duration-300">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Recognition System</h2>
                    <p className="text-orange-600 font-medium">National competition platform</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                    <div className="flex items-center mb-2">
                      <Star className="w-5 h-5 text-orange-600 mr-2" />
                      <span className="text-sm font-semibold text-orange-800">Competitions</span>
                    </div>
                    <p className="text-xs text-slate-600">National level events</p>
                  </div>
                  <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                    <div className="flex items-center mb-2">
                      <Globe className="w-5 h-5 text-red-600 mr-2" />
                      <span className="text-sm font-semibold text-red-800">Certification</span>
                    </div>
                    <p className="text-xs text-slate-600">Government verified</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-orange-500 mr-3" />
                    <span>Multi-tier competition system</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-orange-500 mr-3" />
                    <span>Digital certificate generation</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-orange-500 mr-3" />
                    <span>NGO partnership integration</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Government Compliance Section */}
        <div className="mt-16 bg-gradient-to-r from-slate-50 to-emerald-50 rounded-3xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Government Initiative
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Aligned with National Education Framework
            </h3>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              This platform ensures full compliance with NEP 2020 guidelines and supports India's commitment to UN Sustainable Development Goals through comprehensive environmental education.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-emerald-100 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">NEP 2020 Compliance</h4>
              <p className="text-sm text-slate-600">Fully aligned with National Education Policy guidelines and frameworks</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-blue-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">UN SDG Aligned</h4>
              <p className="text-sm text-slate-600">Supports Sustainable Development Goals 4, 13, 14, and 15</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-purple-100 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Quality Assured</h4>
              <p className="text-sm text-slate-600">Government approved content and assessment methodologies</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
