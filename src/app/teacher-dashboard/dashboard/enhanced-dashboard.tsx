"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Activity,
  Calendar,
  Bell,
  Search,
  Filter,
  Download,
  Clock,
  ChevronRight,
  Target,
  Award,
  BookOpen,
  MessageSquare,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star,
  Trophy,
  ChevronLeft,
  DollarSign,
  UserCheck,
  TrendingDown,
  Calendar as CalendarIcon,
  Timer,
  Zap
} from 'lucide-react';
import TeacherNavbar from '@/components/TeacherNavbar';

// Enhanced mock data with more comprehensive information
const mockData = {
  stats: [
    { title: "Total Students", value: "1,247", change: "+12%", trend: "up", icon: Users, color: "emerald", bgGradient: "from-emerald-500 to-emerald-600" },
    { title: "Course Completion", value: "89.2%", change: "+5.3%", trend: "up", icon: Target, color: "blue", bgGradient: "from-blue-500 to-blue-600" },
    { title: "Active Sessions", value: "432", change: "-2.1%", trend: "down", icon: Activity, color: "purple", bgGradient: "from-purple-500 to-purple-600" },
    { title: "Monthly Revenue", value: "₹84,350", change: "+18.2%", trend: "up", icon: DollarSign, color: "orange", bgGradient: "from-orange-500 to-orange-600" }
  ],
  
  recentActivities: [
    { id: 1, student: "Arjun Sharma", action: "Completed Environmental Science Module", time: "2 hours ago", status: "success", avatar: "AS" },
    { id: 2, student: "Priya Patel", action: "Submitted Project on Renewable Energy", time: "4 hours ago", status: "pending", avatar: "PP" },
    { id: 3, student: "Rahul Kumar", action: "Started Climate Change Course", time: "6 hours ago", status: "info", avatar: "RK" },
    { id: 4, student: "Ananya Singh", action: "Achieved Gold Badge in Sustainability", time: "8 hours ago", status: "success", avatar: "AS" },
    { id: 5, student: "Vikram Reddy", action: "Missed Assignment Deadline", time: "1 day ago", status: "error", avatar: "VR" },
    { id: 6, student: "Meera Sharma", action: "Completed Quiz with 95% Score", time: "1 day ago", status: "success", avatar: "MS" }
  ],

  chartData: {
    monthlyProgress: [
      { month: "Jan", students: 180, completion: 78, revenue: 25000 },
      { month: "Feb", students: 240, completion: 82, revenue: 32000 },
      { month: "Mar", students: 320, completion: 75, revenue: 28000 },
      { month: "Apr", students: 280, completion: 88, revenue: 45000 },
      { month: "May", students: 450, completion: 92, revenue: 52000 },
      { month: "Jun", students: 380, completion: 85, revenue: 48000 }
    ],
    subjectDistribution: [
      { subject: "Environmental Science", percentage: 35, students: 437, color: "emerald" },
      { subject: "Climate Change", percentage: 28, students: 349, color: "blue" },
      { subject: "Renewable Energy", percentage: 22, students: 274, color: "purple" },
      { subject: "Sustainability", percentage: 15, students: 187, color: "orange" }
    ],
    weeklyActivity: [
      { day: "Mon", value: 85 },
      { day: "Tue", value: 92 },
      { day: "Wed", value: 78 },
      { day: "Thu", value: 95 },
      { day: "Fri", value: 88 },
      { day: "Sat", value: 76 },
      { day: "Sun", value: 82 }
    ]
  }
};

// Calendar component
const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === new Date().getDate() && 
                     currentDate.getMonth() === new Date().getMonth() && 
                     currentDate.getFullYear() === new Date().getFullYear();
      const isSelected = day === selectedDate.getDate() && 
                        currentDate.getMonth() === selectedDate.getMonth() && 
                        currentDate.getFullYear() === selectedDate.getFullYear();
      
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          className={`h-8 w-8 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-emerald-100 hover:text-emerald-700 ${
            isToday ? 'bg-emerald-600 text-white shadow-md' : 
            isSelected ? 'bg-emerald-100 text-emerald-700' :
            'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Calendar</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <span className="text-sm font-medium text-slate-700 min-w-[120px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button 
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-slate-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
      
      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <div className="flex-1">
            <div className="text-sm font-medium text-emerald-800">Quiz Day</div>
            <div className="text-xs text-emerald-600">Environmental Science</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="flex-1">
            <div className="text-sm font-medium text-blue-800">Workshop</div>
            <div className="text-xs text-blue-600">Sustainability Methods</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Pie Chart Component
const PieChart = () => {
  const data = mockData.chartData.subjectDistribution;
  const total = data.reduce((sum, item) => sum + item.percentage, 0);
  
  let currentAngle = 0;
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  const createPath = (percentage: number) => {
    const angle = (percentage / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    const startX = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
    const startY = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
    const endX = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
    const endY = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const pathData = [
      "M", centerX, centerY,
      "L", startX, startY,
      "A", radius, radius, 0, largeArcFlag, 1, endX, endY,
      "Z"
    ].join(" ");
    
    currentAngle += angle;
    return pathData;
  };

  const getColor = (colorName: string) => {
    const colors = {
      emerald: "#10b981",
      blue: "#3b82f6",
      purple: "#8b5cf6",
      orange: "#f97316"
    };
    return colors[colorName as keyof typeof colors] || "#10b981";
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Course Distribution</h3>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg width="200" height="200" className="transform -rotate-90">
            {data.map((item, index) => {
              currentAngle = data.slice(0, index).reduce((sum, d) => sum + (d.percentage / total) * 360, 0);
              return (
                <path
                  key={item.subject}
                  d={createPath(item.percentage)}
                  fill={getColor(item.color)}
                  className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                />
              );
            })}
            <circle
              cx={centerX}
              cy={centerY}
              r={35}
              fill="white"
              className="drop-shadow-sm"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">1,247</div>
              <div className="text-xs text-slate-500">Students</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.subject} className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getColor(item.color) }}
            ></div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-700">{item.subject}</span>
                <span className="text-sm text-slate-600">{item.percentage}%</span>
              </div>
              <div className="text-xs text-slate-500">{item.students} students</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Bar Chart Component
const BarChart = () => {
  const data = mockData.chartData.monthlyProgress;
  const maxValue = Math.max(...data.map(d => Math.max(d.students, d.completion)));

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Monthly Trends</h3>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Completion %</span>
          </div>
        </div>
      </div>
      
      <div className="relative h-64">
        <div className="flex items-end justify-between h-full gap-2">
          {data.map((item, index) => (
            <div key={item.month} className="flex-1 flex items-end gap-1">
              <div className="relative flex-1 group">
                <div 
                  className="bg-emerald-500 rounded-t-lg transition-all duration-300 hover:bg-emerald-600 cursor-pointer"
                  style={{ height: `${(item.students / maxValue) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.students}
                  </div>
                </div>
              </div>
              <div className="relative flex-1 group">
                <div 
                  className="bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600 cursor-pointer"
                  style={{ height: `${(item.completion / 100) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.completion}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          {data.map((item) => (
            <div key={item.month} className="text-sm text-slate-600 text-center flex-1">
              {item.month}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Line Chart Component
const LineChart = () => {
  const data = mockData.chartData.weeklyActivity;
  const maxValue = Math.max(...data.map(d => d.value));
  
  const createPath = () => {
    const width = 300;
    const height = 150;
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((item.value / maxValue) * height);
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Weekly Activity</h3>
        <div className="flex items-center gap-2 text-sm text-emerald-600">
          <TrendingUp className="w-4 h-4" />
          <span>+12% this week</span>
        </div>
      </div>
      
      <div className="relative">
        <svg width="100%" height="180" viewBox="0 0 300 180" className="overflow-visible">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((line) => (
            <line
              key={line}
              x1="0"
              y1={150 - (line / 100) * 150}
              x2="300"
              y2={150 - (line / 100) * 150}
              stroke="#f1f5f9"
              strokeWidth="1"
            />
          ))}
          
          {/* Area under the line */}
          <path
            d={`${createPath()} L 300,150 L 0,150 Z`}
            fill="url(#lineGradient)"
          />
          
          {/* Main line */}
          <path
            d={createPath()}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))'
            }}
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 300;
            const y = 150 - ((item.value / maxValue) * 150);
            return (
              <g key={item.day}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="white"
                  stroke="#10b981"
                  strokeWidth="3"
                  className="hover:r-6 transition-all duration-200 cursor-pointer"
                />
                <text
                  x={x}
                  y="170"
                  textAnchor="middle"
                  className="text-xs fill-slate-600"
                >
                  {item.day}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  // Live clock update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <TeacherNavbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section with Enhanced Clock */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Enhanced Dashboard</h1>
            <p className="text-slate-600">Advanced analytics and monitoring for your teaching performance</p>
          </div>
          
          {/* Enhanced Digital Clock */}
          <div className="mt-4 lg:mt-0">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold tracking-wider">{formatTime(currentTime)}</div>
                  <div className="text-emerald-100 text-sm">{formatDate(currentTime)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockData.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`flex items-center text-sm font-bold px-2 py-1 rounded-full ${
                    stat.trend === 'up' 
                      ? 'text-emerald-700 bg-emerald-100' 
                      : 'text-red-700 bg-red-100'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.title}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Line Chart */}
          <div className="lg:col-span-1">
            <LineChart />
          </div>
          
          {/* Bar Chart */}
          <div className="lg:col-span-1">
            <BarChart />
          </div>
          
          {/* Pie Chart */}
          <div className="lg:col-span-1">
            <PieChart />
          </div>
        </div>

        {/* Calendar and Activities Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Enhanced Calendar */}
          <CalendarWidget />
          
          {/* Recent Activities with Enhanced Design */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Recent Activities</h3>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Filter className="w-4 h-4 text-slate-600" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {mockData.recentActivities.map((activity) => (
                <div key={activity.id} className="p-4 border-b border-slate-50 hover:bg-slate-25 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-800">{activity.student}</div>
                      <div className="text-sm text-slate-600 mb-1">{activity.action}</div>
                      <div className="text-xs text-slate-400">{activity.time}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(activity.status)}
                      <button className="p-1 hover:bg-slate-100 rounded transition-colors opacity-0 group-hover:opacity-100">
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-slate-100">
              <button className="w-full text-center text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
                View All Activities
              </button>
            </div>
          </div>
        </div>

        {/* Performance Metrics and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Performance Summary */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Performance Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-emerald-800">Active Students</span>
                </div>
                <span className="text-2xl font-bold text-emerald-700">89%</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Completion Rate</span>
                </div>
                <span className="text-2xl font-bold text-blue-700">92%</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-800">Avg. Rating</span>
                </div>
                <span className="text-2xl font-bold text-purple-700">4.8</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors group">
                <div className="p-2 bg-emerald-500 rounded-lg group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-emerald-800">Create New Course</span>
                <ChevronRight className="w-4 h-4 text-emerald-600 ml-auto" />
              </button>
              
              <button className="w-full flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
                <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-blue-800">Manage Students</span>
                <ChevronRight className="w-4 h-4 text-blue-600 ml-auto" />
              </button>
              
              <button className="w-full flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group">
                <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-purple-800">View Reports</span>
                <ChevronRight className="w-4 h-4 text-purple-600 ml-auto" />
              </button>
            </div>
          </div>

          {/* System Notifications */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800">Notifications</h3>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 bg-emerald-50 rounded-xl border-l-4 border-emerald-500">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-emerald-800">Assignment Completed</span>
                </div>
                <p className="text-sm text-emerald-700">15 students completed today's environmental quiz</p>
                <span className="text-xs text-emerald-600 mt-1 block">2 minutes ago</span>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-800">Deadline Alert</span>
                </div>
                <p className="text-sm text-orange-700">Project submission deadline in 2 days</p>
                <span className="text-xs text-orange-600 mt-1 block">1 hour ago</span>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">New Message</span>
                </div>
                <p className="text-sm text-blue-700">Parent-teacher meeting scheduled for tomorrow</p>
                <span className="text-xs text-blue-600 mt-1 block">3 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
