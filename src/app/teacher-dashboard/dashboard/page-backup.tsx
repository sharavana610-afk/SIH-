'use client'

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Activity,
  TrendingUp,
  BarChart3,
  Clock,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Eye,
  MessageSquare,
  Star,
  Award,
  Target,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Play,
  Pause,
  SkipForward,
  Volume2,
  Maximize2,
  Settings
} from 'lucide-react';
import TeacherNavbar from '@/components/TeacherNavbar';

// Mock data structure
const mockData = {
  chartData: {
    courseDistribution: [
      { subject: 'Mathematics', percentage: 35, students: 450, color: 'emerald', growth: '+12%', status: 'growing' },
      { subject: 'Science', percentage: 25, students: 320, color: 'cyan', growth: '+8%', status: 'growing' },
      { subject: 'English', percentage: 20, students: 260, color: 'purple', growth: '+5%', status: 'stable' },
      { subject: 'History', percentage: 12, students: 150, color: 'amber', growth: '+3%', status: 'stable' },
      { subject: 'Art', percentage: 8, students: 100, color: 'red', growth: '+2%', status: 'growing' }
    ],
    weeklyActivity: [
      { day: 'Mon', value: 65, activities: 12 },
      { day: 'Tue', value: 78, activities: 15 },
      { day: 'Wed', value: 52, activities: 10 },
      { day: 'Thu', value: 90, activities: 18 },
      { day: 'Fri', value: 88, activities: 17 },
      { day: 'Sat', value: 45, activities: 8 },
      { day: 'Sun', value: 30, activities: 5 }
    ],
    monthlyProgress: [
      { month: 'Jan', students: 280, completion: 85 },
      { month: 'Feb', students: 320, completion: 88 },
      { month: 'Mar', students: 350, completion: 92 },
      { month: 'Apr', students: 420, completion: 89 },
      { month: 'May', students: 480, completion: 94 },
      { month: 'Jun', students: 520, completion: 96 }
    ]
  }
};

// Simple PieChart component
const PieChart = () => {
  const data = mockData.chartData.courseDistribution;
  const totalStudents = data.reduce((sum, course) => sum + course.students, 0);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-[480px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Course Distribution</h3>
        <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          <BarChart3 className="w-4 h-4" />
          <span className="font-medium">Live Data</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-slate-800">{totalStudents.toLocaleString()}</div>
          <div className="text-sm text-slate-500">Total Students</div>
          <div className="text-sm text-emerald-600 font-bold">+15% growth</div>
        </div>
        
        <div className="w-full space-y-3">
          {data.map((item, index) => (
            <div key={item.subject} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                <span className="font-medium">{item.subject}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{item.percentage}%</div>
                <div className="text-sm text-slate-500">{item.students} students</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple BarChart component
const BarChart = () => {
  const data = mockData.chartData.monthlyProgress;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-[480px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Monthly Trends</h3>
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
          <TrendingUp className="w-4 h-4" />
          <span className="font-medium">Growing</span>
        </div>
      </div>
      
      <div className="flex-1 flex items-end justify-between gap-4">
        {data.map((item, index) => (
          <div key={item.month} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-slate-100 rounded-lg relative h-40">
              <div 
                className="bg-emerald-500 rounded-lg absolute bottom-0 w-full transition-all duration-500"
                style={{ height: `${(item.completion / 100) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm font-medium">{item.month}</div>
            <div className="text-xs text-slate-500">{item.completion}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple LineChart component
const LineChart = () => {
  const data = mockData.chartData.weeklyActivity;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-[480px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Weekly Activity</h3>
        <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
          <Activity className="w-4 h-4" />
          <span className="font-medium">Active</span>
        </div>
      </div>
      
      <div className="flex-1 flex items-end justify-between gap-4">
        {data.map((item, index) => (
          <div key={item.day} className="flex flex-col items-center">
            <div className="h-32 w-8 bg-slate-100 rounded-lg relative">
              <div 
                className="bg-purple-500 rounded-lg absolute bottom-0 w-full transition-all duration-500"
                style={{ height: `${item.value}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm font-medium">{item.day}</div>
            <div className="text-xs text-slate-500">{item.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Clock component
const AnalogDigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="text-center">
        <div className="text-3xl font-bold text-slate-800">
          {currentTime.toLocaleTimeString()}
        </div>
        <div className="text-sm text-slate-500">
          {currentTime.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

// Calendar widget
const CalendarWidget = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Upcoming Events</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
          <Calendar className="w-5 h-5 text-blue-600" />
          <div>
            <div className="font-medium">Math Quiz</div>
            <div className="text-sm text-slate-500">Today, 2:00 PM</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
          <BookOpen className="w-5 h-5 text-green-600" />
          <div>
            <div className="font-medium">Science Lab</div>
            <div className="text-sm text-slate-500">Tomorrow, 10:00 AM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <TeacherNavbar />
      
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Teacher Dashboard</h1>
          <p className="text-slate-600">Monitor your classes and student progress</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+12%</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">1,280</div>
            <div className="text-slate-600">Total Students</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-100">
                <BookOpen className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+8%</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">45</div>
            <div className="text-slate-600">Active Courses</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+15%</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">94%</div>
            <div className="text-slate-600">Completion Rate</div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-amber-100">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+20%</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">4.8</div>
            <div className="text-slate-600">Average Rating</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <LineChart />
          <BarChart />
          <PieChart />
        </div>

        {/* Additional Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CalendarWidget />
          <AnalogDigitalClock />
        </div>
      </div>
    </div>
  );
}
