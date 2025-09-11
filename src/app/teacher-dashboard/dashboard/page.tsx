"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Activity,
  Calendar,
  Clock,
  Bell,
  Search,
  Filter,
  Download,
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
  Calendar as CalendarIcon,
  X
} from 'lucide-react';
import TeacherNavbar from '@/components/TeacherNavbar';

// Comprehensive API Configuration with Backend Connectivity
const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

// Enhanced API endpoints with versioning
const apiEndpoints = {
  stats: `${apiConfig.baseURL}/v1/dashboard/stats`,
  activities: `${apiConfig.baseURL}/v1/dashboard/activities`, 
  chartData: `${apiConfig.baseURL}/v1/dashboard/charts`,
  events: `${apiConfig.baseURL}/v1/dashboard/events`,
  students: `${apiConfig.baseURL}/v1/dashboard/students`,
  notifications: `${apiConfig.baseURL}/v1/dashboard/notifications`,
  auth: `${apiConfig.baseURL}/v1/auth`,
  upload: `${apiConfig.baseURL}/v1/upload`
};

// Enhanced API Helper with retry logic and error handling
const apiHelper = {
  // Generic API call with retry logic
  makeRequest: async (url: string, options: RequestInit = {}) => {
    const defaultOptions: RequestInit = {
      headers: {
        ...apiConfig.headers,
        'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') || '' : ''}`,
        ...options.headers,
      },
      signal: AbortSignal.timeout(apiConfig.timeout),
    };

    for (let attempt = 1; attempt <= apiConfig.retries; attempt++) {
      try {
        const response = await fetch(url, { ...defaultOptions, ...options });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
      } catch (error) {
        console.log(`API attempt ${attempt} failed:`, error);
        
        if (attempt === apiConfig.retries) {
          throw error;
        }
        
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  },

  // Dashboard statistics
  fetchStats: async () => {
    try {
      return await apiHelper.makeRequest(apiEndpoints.stats);
    } catch (error) {
      console.log('Stats API not available, using mock data');
      return mockData.stats;
    }
  },

  // Paginated activities with filtering
  fetchActivities: async (page = 1, limit = 10, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...Object.fromEntries(
          Object.entries(filters).map(([key, value]) => [key, String(value)])
        )
      });
      return await apiHelper.makeRequest(`${apiEndpoints.activities}?${queryParams}`);
    } catch (error) {
      console.log('Activities API not available, using mock data');
      return {
        data: mockData.recentActivities.slice((page - 1) * limit, page * limit),
        pagination: {
          total: mockData.recentActivities.length,
          page,
          limit,
          pages: Math.ceil(mockData.recentActivities.length / limit)
        }
      };
    }
  },

  // Chart data with caching
  fetchChartData: async (type = 'monthly', period = 'current') => {
    try {
      const cacheKey = `chartData_${type}_${period}`;
      
      if (typeof window !== 'undefined') {
        const cached = sessionStorage.getItem(cacheKey);
        
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          // Cache for 5 minutes
          if (Date.now() - timestamp < 5 * 60 * 1000) {
            return data;
          }
        }
      }

      const result = await apiHelper.makeRequest(`${apiEndpoints.chartData}/${type}?period=${period}`);
      
      // Cache the result
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(cacheKey, JSON.stringify({
          data: result,
          timestamp: Date.now()
        }));
      }
      
      return result;
    } catch (error) {
      console.log('Chart data API not available, using mock data');
      return mockData.chartData;
    }
  },

  // Event management with optimistic updates
  manageEvents: async (action: string, eventData: any = null) => {
    try {
      const method = action === 'create' ? 'POST' : action === 'update' ? 'PUT' : 'DELETE';
      return await apiHelper.makeRequest(apiEndpoints.events, {
        method,
        body: eventData ? JSON.stringify(eventData) : undefined
      });
    } catch (error) {
      console.log('Events API not available, using local storage fallback');
      
      if (typeof window !== 'undefined') {
        // Local storage fallback for demo
        const events = JSON.parse(localStorage.getItem('dashboard_events') || '[]');
        
        switch (action) {
          case 'create':
            events.push({ ...eventData, id: Date.now() });
            break;
          case 'update':
            const updateIndex = events.findIndex((e: any) => e.id === eventData.id);
            if (updateIndex !== -1) events[updateIndex] = eventData;
            break;
          case 'delete':
            const deleteIndex = events.findIndex((e: any) => e.id === eventData.id);
            if (deleteIndex !== -1) events.splice(deleteIndex, 1);
            break;
        }
        
        localStorage.setItem('dashboard_events', JSON.stringify(events));
      }
      
      return { success: true, data: eventData };
    }
  },

  // Real-time data updates with reconnection logic
  subscribeToUpdates: (callback: (data: any) => void) => {
    if (typeof window === 'undefined') return { close: () => {} };
    
    let ws: WebSocket | null = null;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;

    const connect = () => {
      try {
        ws = new WebSocket('ws://localhost:8080/dashboard-updates');
        
        ws.onopen = () => {
          console.log('WebSocket connected');
          reconnectAttempts = 0;
        };
        
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            callback(data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };
        
        ws.onclose = () => {
          if (reconnectAttempts < maxReconnectAttempts) {
            reconnectAttempts++;
            console.log(`WebSocket reconnecting... (${reconnectAttempts}/${maxReconnectAttempts})`);
            setTimeout(connect, Math.pow(2, reconnectAttempts) * 1000);
          }
        };
        
        ws.onerror = (error) => {
          console.log('WebSocket error:', error);
        };
        
      } catch (error) {
        console.log('WebSocket not available, using polling fallback');
        
        // Polling fallback every 30 seconds
        const interval = setInterval(async () => {
          try {
            const data = await apiHelper.fetchStats();
            callback({ type: 'stats_update', data });
          } catch (error) {
            console.log('Polling update failed');
          }
        }, 30000);
        
        return { close: () => clearInterval(interval) };
      }
    };

    connect();
    return { close: () => ws?.close() };
  },

  // Health check for API status
  checkHealth: async () => {
    try {
      const response = await fetch(`${apiConfig.baseURL}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};

// Mock data with realistic backend structure
const mockData = {
  stats: [
    { 
      id: 'total-students',
      title: "Total Students", 
      value: "1,247", 
      change: "+12%", 
      trend: "up", 
      icon: Users, 
      color: "emerald", 
      bgGradient: "from-emerald-500 to-emerald-600",
      description: "Active enrolled students"
    },
    { 
      id: 'course-completion',
      title: "Course Completion", 
      value: "89.2%", 
      change: "+5.3%", 
      trend: "up", 
      icon: Target, 
      color: "blue", 
      bgGradient: "from-blue-500 to-blue-600",
      description: "Average completion rate"
    },
    { 
      id: 'active-sessions',
      title: "Active Sessions", 
      value: "432", 
      change: "-2.1%", 
      trend: "down", 
      icon: Activity, 
      color: "purple", 
      bgGradient: "from-purple-500 to-purple-600",
      description: "Currently active learning sessions"
    },
    { 
      id: 'monthly-revenue',
      title: "Monthly Revenue", 
      value: "₹84,350", 
      change: "+18.2%", 
      trend: "up", 
      icon: DollarSign, 
      color: "orange", 
      bgGradient: "from-orange-500 to-orange-600",
      description: "Revenue generated this month"
    }
  ],
  
  recentActivities: [
    { 
      id: 1, 
      student: "Arjun Sharma", 
      action: "Completed Environmental Science Module", 
      time: "2 hours ago", 
      status: "success", 
      avatar: "AS",
      score: 95,
      course: "Environmental Science"
    },
    { 
      id: 2, 
      student: "Priya Patel", 
      action: "Submitted Project on Renewable Energy", 
      time: "4 hours ago", 
      status: "pending", 
      avatar: "PP",
      score: null,
      course: "Renewable Energy"
    },
    { 
      id: 3, 
      student: "Rahul Kumar", 
      action: "Started Climate Change Course", 
      time: "6 hours ago", 
      status: "info", 
      avatar: "RK",
      score: null,
      course: "Climate Change"
    },
    { 
      id: 4, 
      student: "Ananya Singh", 
      action: "Achieved Gold Badge in Sustainability", 
      time: "8 hours ago", 
      status: "success", 
      avatar: "AS",
      score: 98,
      course: "Sustainability"
    },
    { 
      id: 5, 
      student: "Vikram Reddy", 
      action: "Missed Assignment Deadline", 
      time: "1 day ago", 
      status: "error", 
      avatar: "VR",
      score: 0,
      course: "Environmental Science"
    },
    { 
      id: 6, 
      student: "Meera Sharma", 
      action: "Completed Quiz with Excellent Score", 
      time: "1 day ago", 
      status: "success", 
      avatar: "MS",
      score: 97,
      course: "Climate Change"
    }
  ],

  // Dynamic chart data that can be fetched from API
  chartData: {
    monthlyProgress: [
      { month: "Jan", students: 180, completion: 78, revenue: 25000, period: "2025-01" },
      { month: "Feb", students: 240, completion: 82, revenue: 32000, period: "2025-02" },
      { month: "Mar", students: 320, completion: 75, revenue: 28000, period: "2025-03" },
      { month: "Apr", students: 280, completion: 88, revenue: 45000, period: "2025-04" },
      { month: "May", students: 450, completion: 92, revenue: 52000, period: "2025-05" },
      { month: "Jun", students: 380, completion: 85, revenue: 48000, period: "2025-06" }
    ],
    subjectDistribution: [
      { 
        subject: "Environmental Science", 
        percentage: 35, 
        students: 437, 
        color: "emerald",
        growth: "+12%",
        status: "growing"
      },
      { 
        subject: "Climate Change", 
        percentage: 28, 
        students: 349, 
        color: "blue",
        growth: "+8%",
        status: "growing"
      },
      { 
        subject: "Renewable Energy", 
        percentage: 22, 
        students: 274, 
        color: "purple",
        growth: "+15%",
        status: "growing"
      },
      { 
        subject: "Sustainability", 
        percentage: 15, 
        students: 187, 
        color: "orange",
        growth: "+20%",
        status: "growing"
      }
    ],
    weeklyActivity: [
      { day: "Mon", value: 85, date: "2025-09-08", activities: 23 },
      { day: "Tue", value: 92, date: "2025-09-09", activities: 28 },
      { day: "Wed", value: 78, date: "2025-09-10", activities: 19 },
      { day: "Thu", value: 95, date: "2025-09-11", activities: 31 },
      { day: "Fri", value: 88, date: "2025-09-12", activities: 25 },
      { day: "Sat", value: 76, date: "2025-09-13", activities: 18 },
      { day: "Sun", value: 82, date: "2025-09-14", activities: 21 }
    ]
  }
};

// Custom Clock Component with your provided design
const AnalogDigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  // Only calculate rotations on client side
  const getRotations = () => {
    if (!isClient) return { secondRotation: 0, minuteRotation: 0, hourRotation: 0 };
    
    const seconds = currentTime.getSeconds();
    const minutes = currentTime.getMinutes();
    const hours = currentTime.getHours() % 12;

    return {
      secondRotation: seconds * 6 - 90, // -90 to start from 12 o'clock
      minuteRotation: minutes * 6 - 90,
      hourRotation: (hours * 30) + (minutes * 0.5) - 90
    };
  };

  const { secondRotation, minuteRotation, hourRotation } = getRotations();
  const dateString = isClient ? `${currentTime.getDate()} . ${months[currentTime.getMonth()]}` : "Loading...";
  const dayString = isClient ? days[currentTime.getDay()] : "Loading...";
  const timeString = isClient ? formatTime(currentTime) : "Loading...";

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Clock...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-80 h-80 mx-auto">
      <style jsx>{`
        .clock-container {
          position: relative;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: #111;
          box-shadow: 0 0 25px 3px rgba(0,0,0,0.5), 0 0 10px rgba(0,0,0,0.8) inset;
          z-index: 1;
        }
        
        .clock-analog {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: #fff;
          margin: 20px;
          box-shadow: 0 0 25px 3px rgba(0,0,0,0.3) inset;
          z-index: 2;
        }
        
        .clock-digital {
          position: absolute;
          z-index: 10;
          height: 284px;
          width: 144px;
          background: #090909;
          left: 18px;
          top: 18px;
          border-radius: 140px 0 0 140px;
          box-shadow: 5px 0 15px rgba(0,0,0,0.5);
        }
        
        .clock-digital::after {
          content: '';
          position: absolute;
          border: 10px solid #10b981;
          border-right: none;
          height: 250px;
          width: 120px;
          border-radius: 140px 0 0 140px;
          left: 15px;
          top: 15px;
        }
        
        .time, .date, .day {
          position: absolute;
          background: #111;
          color: #fff;
          padding: 4px 12px;
          border-radius: 20px;
          box-shadow: 0 0 10px rgba(0,0,0,0.8) inset;
          font-family: 'BenchNine', sans-serif;
          right: 15px;
          z-index: 11;
        }
        
        .time {
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          font-weight: 400;
        }
        
        .date {
          top: 80px;
          font-size: 12px;
        }
        
        .day {
          bottom: 80px;
          font-size: 12px;
        }
        
        .hand {
          position: absolute;
          background: #000;
          transform-origin: bottom center;
          border-radius: 2px;
          z-index: 5;
        }
        
        .hour-hand {
          width: 4px;
          height: 60px;
          left: calc(50% - 2px);
          top: calc(50% - 60px);
          background: #333;
        }
        
        .minute-hand {
          width: 3px;
          height: 80px;
          left: calc(50% - 1.5px);
          top: calc(50% - 80px);
          background: #666;
        }
        
        .second-hand {
          width: 1px;
          height: 90px;
          left: calc(50% - 0.5px);
          top: calc(50% - 90px);
          background: #10b981;
        }
        
        .center-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #10b981;
          border-radius: 50%;
          left: calc(50% - 6px);
          top: calc(50% - 6px);
          z-index: 15;
        }
        
        .hour-marker {
          position: absolute;
          width: 2px;
          height: 20px;
          background: #333;
          left: calc(50% - 1px);
          top: 10px;
          transform-origin: center 130px;
          z-index: 3;
        }
      `}</style>
      
      <div className="clock-container">
        <div className="clock-analog">
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="hour-marker"
              style={{ transform: `rotate(${i * 30}deg)` }}
            />
          ))}
          
          {/* Clock hands */}
          <div
            className="hand hour-hand"
            style={{ transform: `rotate(${hourRotation}deg)` }}
          />
          <div
            className="hand minute-hand"
            style={{ transform: `rotate(${minuteRotation}deg)` }}
          />
          <div
            className="hand second-hand"
            style={{ transform: `rotate(${secondRotation}deg)` }}
          />
          <div className="center-dot" />
        </div>
        
        <div className="clock-digital">
          <div className="time">{timeString}</div>
          <div className="date">{dateString}</div>
          <div className="day">{dayString}</div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Calendar Component with Event Management
const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Environmental Quiz",
      date: "2025-09-15",
      time: "10:00 AM",
      type: "quiz",
      color: "emerald"
    },
    {
      id: 2,
      title: "Sustainability Workshop",
      date: "2025-09-18",
      time: "2:00 PM",
      type: "workshop",
      color: "blue"
    },
    {
      id: 3,
      title: "Tree Plantation Drive",
      date: "2025-09-22",
      time: "9:00 AM",
      type: "activity",
      color: "green"
    }
  ]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'quiz'
  });

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const hasEvent = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.some(event => event.date === dateStr);
  };

  const addEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event = {
        id: Date.now(),
        ...newEvent,
        color: newEvent.type === 'quiz' ? 'emerald' : newEvent.type === 'workshop' ? 'blue' : 'green'
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', date: '', time: '', type: 'quiz' });
      setShowAddEvent(false);
    }
  };

  const removeEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
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
      const eventExists = hasEvent(day);
      
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          className={`h-8 w-8 rounded-lg text-sm font-medium transition-all duration-200 relative ${
            isToday ? 'bg-emerald-600 text-white shadow-md' : 
            isSelected ? 'bg-emerald-100 text-emerald-700' :
            'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {day}
          {eventExists && (
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
          )}
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
        <h3 className="text-lg font-semibold text-slate-800">Calendar & Events</h3>
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
      
      <div className="grid grid-cols-7 gap-1 mb-6">
        {renderCalendarDays()}
      </div>
      
      {/* Events List */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-slate-800">Upcoming Events</h4>
          <button
            onClick={() => setShowAddEvent(true)}
            className="p-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-600 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {events.slice(0, 3).map((event) => (
          <div key={event.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
            <div className={`w-2 h-2 rounded-full ${
              event.color === 'emerald' ? 'bg-emerald-500' :
              event.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'
            }`}></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-800">{event.title}</div>
              <div className="text-xs text-slate-600">{event.date} at {event.time}</div>
            </div>
            <button
              onClick={() => removeEvent(event.id)}
              className="p-1 hover:bg-red-100 text-red-500 rounded transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Add New Event</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter event title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="quiz">Quiz</option>
                  <option value="workshop">Workshop</option>
                  <option value="activity">Activity</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddEvent(false)}
                className="flex-1 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addEvent}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Line Chart Component

// Enhanced Bar Chart Component with Backend Integration and Smooth Animations
function CustomBarChart() {
  const [chartData, setChartData] = useState(mockData.chartData.monthlyProgress);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const maxValue = Math.max(...chartData.map(d => Math.max(d.students, d.completion)));

  // Enhanced API function with error handling and loading states
  const fetchMonthlyData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiEndpoints.chartData + '/monthly', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setChartData(data);
      return data;
    } catch (error) {
      console.log('Using mock data - API not available:', error);
      setError('Using demo data - API connection failed');
      setChartData(mockData.chartData.monthlyProgress);
      return mockData.chartData.monthlyProgress;
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    fetchMonthlyData();
    const interval = setInterval(fetchMonthlyData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Custom tooltip component for better UX
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-lg">
          <p className="font-semibold text-slate-800 mb-2">{`${label} 2025`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey === 'students' ? 'Students' : 'Completion'}: ${entry.value}${entry.dataKey === 'completion' ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-[480px] flex flex-col hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-slate-800">Monthly Trends</h3>
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-500 border-t-transparent"></div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {error && (
            <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
              Demo Mode
            </span>
          )}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-600">Students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-600">Completion %</span>
          </div>
          <button 
            onClick={fetchMonthlyData}
            disabled={loading}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors duration-200 disabled:opacity-50"
            title="Refresh data"
          >
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent mx-auto mb-2"></div>
              <p className="text-sm text-slate-600">Loading chart data...</p>
            </div>
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f1f5f9" 
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              domain={[0, maxValue * 1.1]} 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
            />
            <Bar 
              dataKey="students" 
              fill="url(#studentsGradient)" 
              radius={[4, 4, 0, 0]}
              animationDuration={800}
              animationBegin={0}
            />
            <Bar 
              dataKey="completion" 
              fill="url(#completionGradient)" 
              radius={[4, 4, 0, 0]}
              animationDuration={800}
              animationBegin={200}
            />
            <defs>
              <linearGradient id="studentsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.9}/>
                <stop offset="100%" stopColor="#059669" stopOpacity={0.7}/>
              </linearGradient>
              <linearGradient id="completionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9}/>
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0.7}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Enhanced metrics with animations */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 group">
            <div className="text-2xl font-bold text-emerald-600 group-hover:scale-110 transition-transform duration-300">
              {chartData.reduce((sum, item) => sum + item.students, 0).toLocaleString()}
            </div>
            <div className="text-xs text-emerald-700 font-medium">Total Students</div>
            <div className="text-xs text-emerald-600 mt-1">
              +{Math.round((chartData[chartData.length-1]?.students || 0) - (chartData[chartData.length-2]?.students || 0))} this month
            </div>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group">
            <div className="text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">
              {Math.round(chartData.reduce((sum, item) => sum + item.completion, 0) / chartData.length)}%
            </div>
            <div className="text-xs text-blue-700 font-medium">Avg Completion</div>
            <div className="text-xs text-blue-600 mt-1">
              +{Math.round((chartData[chartData.length-1]?.completion || 0) - (chartData[chartData.length-2]?.completion || 0))}% improvement
            </div>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 group">
            <div className="text-2xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">
              ₹{Math.round(chartData.reduce((sum, item) => sum + (item.revenue || 0), 0) / 1000)}K
            </div>
            <div className="text-xs text-purple-700 font-medium">Total Revenue</div>
            <div className="text-xs text-purple-600 mt-1">
              +₹{Math.round(((chartData[chartData.length-1]?.revenue || 0) - (chartData[chartData.length-2]?.revenue || 0)) / 1000)}K growth
            </div>
          </div>
        </div>
        
        {/* API Status Indicator */}
        <div className="mt-4 flex items-center justify-center">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
            error 
              ? 'bg-orange-50 text-orange-700 border border-orange-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              error ? 'bg-orange-500' : 'bg-green-500 animate-pulse'
            }`}></div>
            {error ? 'Demo Mode Active' : 'Live Data Connected'}
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Line Chart Component with Recharts and Backend Integration
const LineChart = () => {
  const [data, setData] = useState(mockData.chartData.weeklyActivity);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected' | 'loading'>('loading');
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [growthRate, setGrowthRate] = useState(0);
  
  // Enhanced data fetching with error handling
  const fetchWeeklyData = async () => {
    setIsLoading(true);
    try {
      const response = await apiHelper.fetchChartData('weekly', 'current');
      if (response && response.weeklyActivity) {
        setData(response.weeklyActivity);
        setApiStatus('connected');
        
        // Calculate growth rate
        const current = response.weeklyActivity;
        if (current.length >= 2) {
          const recent = current[current.length - 1].value;
          const previous = current[current.length - 2].value;
          const rate = ((recent - previous) / previous * 100);
          setGrowthRate(rate);
        }
      }
    } catch (error) {
      console.log('API error, using mock data');
      setApiStatus('disconnected');
      
      // Calculate mock growth rate
      if (data.length >= 2) {
        const recent = data[data.length - 1].value;
        const previous = data[data.length - 2].value;
        const rate = ((recent - previous) / previous * 100);
        setGrowthRate(rate);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh functionality
  useEffect(() => {
    fetchWeeklyData();
    
    const interval = setInterval(fetchWeeklyData, 35000); // Refresh every 35 seconds
    return () => clearInterval(interval);
  }, []);

  // Custom tooltip for data points
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200 min-w-[160px]">
          <p className="text-sm font-semibold text-slate-800 mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">Activity Score:</span>
              <span className="text-sm font-bold text-emerald-600">{data.value}</span>
            </div>
            {data.activities && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Total Activities:</span>
                <span className="text-sm font-semibold text-blue-600">{data.activities}</span>
              </div>
            )}
            {data.engagement && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Engagement:</span>
                <span className="text-sm font-semibold text-purple-600">{data.engagement}%</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const maxValue = Math.max(...data.map(d => d.value));
  const avgValue = Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length);
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-[480px] flex flex-col relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-transparent pointer-events-none" />
      
      {/* Header with API Status */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-slate-800">Weekly Activity Trends</h3>
          {isLoading && (
            <div className="flex items-center gap-2 text-emerald-600">
              <div className="w-4 h-4 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
              <span className="text-xs">Updating...</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* API Status Indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              apiStatus === 'connected' ? 'bg-emerald-500' : 
              apiStatus === 'disconnected' ? 'bg-orange-500' : 'bg-gray-400'
            }`} />
            <span className="text-xs text-slate-500">
              {apiStatus === 'connected' ? 'Live' : apiStatus === 'disconnected' ? 'Demo' : 'Loading'}
            </span>
          </div>
          
          {/* Growth Indicator */}
          <div className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full ${
            growthRate >= 0 
              ? 'text-emerald-600 bg-emerald-50' 
              : 'text-red-600 bg-red-50'
          }`}>
            {growthRate >= 0 ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
            <span className="font-medium">{Math.abs(growthRate).toFixed(1)}% this week</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Recharts Line Chart */}
      <div className="flex-1 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <div style={{ width: '100%', height: '250px' }}>
            {/* Custom SVG Chart with Smooth Animations */}
            <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
              <defs>
                <linearGradient id="lineChartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.6"/>
                  <stop offset="30%" stopColor="#10b981" stopOpacity="0.4"/>
                  <stop offset="70%" stopColor="#10b981" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="lineStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#059669"/>
                  <stop offset="50%" stopColor="#10b981"/>
                  <stop offset="100%" stopColor="#34d399"/>
                </linearGradient>
                <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map((line) => (
                <line
                  key={line}
                  x1="40"
                  y1={170 - (line / 100) * 140}
                  x2="380"
                  y2={170 - (line / 100) * 140}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                  strokeDasharray={line === 0 ? "none" : "3,3"}
                  opacity="0.7"
                />
              ))}
              
              {/* Y-axis labels */}
              {[0, 25, 50, 75, 100].map((value) => (
                <text
                  key={value}
                  x="30"
                  y={175 - (value / 100) * 140}
                  textAnchor="end"
                  className="text-xs fill-slate-400 font-medium"
                >
                  {Math.round((value / 100) * maxValue)}
                </text>
              ))}
              
              {/* Create path for line and area */}
              {(() => {
                const points = data.map((item, index) => {
                  const x = 40 + (index / (data.length - 1)) * 340;
                  const y = 170 - ((item.value / maxValue) * 140);
                  return { x, y, data: item };
                });
                
                const linePath = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
                const areaPath = `${linePath} L ${points[points.length - 1].x},170 L 40,170 Z`;
                
                return (
                  <>
                    {/* Area under the line */}
                    <path
                      d={areaPath}
                      fill="url(#lineChartGradient)"
                      style={{
                        animation: 'drawArea 1.5s ease-out forwards',
                        opacity: 0
                      }}
                    />
                    
                    {/* Main line */}
                    <path
                      d={linePath}
                      fill="none"
                      stroke="url(#lineStroke)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#lineGlow)"
                      style={{
                        strokeDasharray: '1000',
                        strokeDashoffset: '1000',
                        animation: 'drawLine 2s ease-out forwards 0.5s'
                      }}
                    />
                    
                    {/* Data points */}
                    {points.map((point, index) => (
                      <g key={index}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="6"
                          fill="white"
                          stroke="#10b981"
                          strokeWidth="3"
                          className="hover:r-8 transition-all duration-300 cursor-pointer"
                          style={{ 
                            filter: 'drop-shadow(0 2px 8px rgba(16, 185, 129, 0.4))',
                            animation: `fadeInPoint 0.8s ease-out forwards ${0.1 * index + 1}s`,
                            opacity: 0
                          }}
                          onMouseEnter={() => setSelectedPoint(point.data)}
                          onMouseLeave={() => setSelectedPoint(null)}
                        />
                        
                        {/* X-axis labels */}
                        <text
                          x={point.x}
                          y="190"
                          textAnchor="middle"
                          className="text-xs fill-slate-600 font-medium"
                        >
                          {point.data.day}
                        </text>
                      </g>
                    ))}
                  </>
                );
              })()}
            </svg>
          </div>
        </ResponsiveContainer>
      </div>
      
      {/* Enhanced Metrics */}
      <div className="mt-4 pt-4 border-t border-slate-100 relative z-10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-xl font-bold text-emerald-600 animate-pulse">
              {avgValue}
            </div>
            <div className="text-xs text-slate-500 font-medium">Average Score</div>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-bold text-blue-600">
              {maxValue}
            </div>
            <div className="text-xs text-slate-500 font-medium">Peak Activity</div>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-bold text-purple-600">
              {data.reduce((sum: number, item: any) => sum + (item.activities || 0), 0)}
            </div>
            <div className="text-xs text-slate-500 font-medium">Total Activities</div>
          </div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes drawArea {
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeInPoint {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// Course Distribution Chart with Clean Design
function CourseDistributionChart() {
  const [chartData, setChartData] = useState(mockData.chartData.subjectDistribution);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const totalStudents = chartData.reduce((sum: any, item: any) => sum + item.students, 0);
  
  // API fetch function
  const fetchCourseData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiConfig.baseURL}/v1/courses/distribution`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch course data`);
      }
      
      const data = await response.json();
      setChartData(data.courses || mockData.chartData.subjectDistribution);
    } catch (error) {
      console.log('API not available, using mock data:', error);
      setError('Using demo data');
      setChartData(mockData.chartData.subjectDistribution);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh data
  useEffect(() => {
    fetchCourseData();
    const interval = setInterval(fetchCourseData, 60000);
    return () => clearInterval(interval);
  }, []);
  
  // Colors for pie segments
  const getColor = (index: number) => {
    const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#06b6d4"];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-100 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Course Distribution</h3>
          <p className="text-sm sm:text-base text-slate-600">Overview of student enrollment across all courses</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {error && (
            <span className="text-xs text-orange-600 bg-orange-50 px-2 sm:px-3 py-1 rounded-full border border-orange-200">
              Demo Mode
            </span>
          )}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 bg-blue-50 px-3 sm:px-4 py-2 rounded-full border border-blue-100">
            <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium">Live Data</span>
          </div>
          <button 
            onClick={fetchCourseData}
            disabled={loading}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh data"
          >
            <svg className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-600 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Main Content - Mobile Responsive */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
        
        {/* Donut Chart Section - Responsive Size */}
        <div className="flex justify-center w-full order-1 lg:order-none">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-emerald-500 border-t-transparent"></div>
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={chartData.map((item: any, index: number) => ({
                        name: item.subject,
                        value: item.percentage,
                        students: item.students,
                        fill: getColor(index)
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={3}
                      startAngle={0}
                      endAngle={360}
                      paddingAngle={2}
                    >
                      {chartData.map((entry: any, index: number) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={getColor(index)}
                          stroke="#ffffff"
                          strokeWidth={3}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl border border-slate-200 max-w-xs">
                              <p className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{data.name}</p>
                              <p className="text-2xl sm:text-3xl font-black mb-2" style={{ color: data.fill }}>
                                {data.value}%
                              </p>
                              <p className="text-sm sm:text-base text-slate-600">
                                {data.students.toLocaleString()} students enrolled
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
                
                {/* Center Content - Responsive */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center bg-white/95 backdrop-blur-sm rounded-full p-4 sm:p-6 lg:p-8 shadow-xl border-2 border-slate-200">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 mb-1 sm:mb-2">
                      {totalStudents.toLocaleString()}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-slate-500 font-semibold mb-2 sm:mb-3">Total Students</div>
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm sm:text-base lg:text-lg font-black text-emerald-600">+12.5%</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Legend Section - Mobile Optimized */}
        <div className="space-y-4 sm:space-y-6 w-full order-2 lg:order-none">
          <h4 className="text-lg sm:text-xl font-bold text-slate-700">Course Breakdown</h4>
          
          {/* Legend Items - Responsive */}
          <div className="space-y-3 sm:space-y-4">
            {chartData.map((item: any, index: number) => (
              <div key={item.subject} className="flex items-center justify-between p-4 sm:p-5 lg:p-6 rounded-xl lg:rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 transition-all duration-300 border border-slate-200 shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                  <div 
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full shadow-lg border-2 sm:border-3 border-white"
                    style={{ backgroundColor: getColor(index) }}
                  ></div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm sm:text-base lg:text-lg leading-tight">
                      {item.subject}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 mt-1">
                      {item.students.toLocaleString()} students enrolled
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black" style={{ color: getColor(index) }}>
                    {item.percentage}%
                  </div>
                  <div className="text-xs sm:text-sm text-emerald-600 font-bold">
                    {item.growth || '+8%'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary Stats - Mobile Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-slate-200">
            <div className="text-center p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 rounded-xl lg:rounded-2xl border-2 border-emerald-300 shadow-lg">
              <div className="text-2xl sm:text-2xl lg:text-3xl font-black text-emerald-700">{chartData.length}</div>
              <div className="text-xs sm:text-sm text-slate-700 font-semibold">Active Courses</div>
            </div>
            <div className="text-center p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-xl lg:rounded-2xl border-2 border-blue-300 shadow-lg">
              <div className="text-2xl sm:text-2xl lg:text-3xl font-black text-blue-700">89.2%</div>
              <div className="text-xs sm:text-sm text-slate-700 font-semibold">Avg Completion</div>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Action Button - Responsive */}
      <div className="flex justify-center mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-slate-200">
        <button className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl lg:rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 group">
          <span className="text-sm sm:text-base lg:text-lg font-bold">View Detailed Analytics</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-all duration-300" />
        </button>
      </div>
    </div>
  );
}

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
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Enhanced Dashboard</h1>
            <p className="text-slate-600">Advanced analytics and monitoring for your teaching performance</p>
          </div>
        </div>

        {/* Enhanced Analog-Digital Clock Widget with Video Banner */}
        <div className="mb-8 relative z-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Video Banner */}
            <div className="relative h-32 overflow-hidden">
              <video 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.7)' }}
              >
                <source src="/clock banner.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/50 to-teal-600/50"></div>
              <div className="absolute top-4 left-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Nature's Clock</h3>
                </div>
              </div>
            </div>
            
            {/* Clock Content */}
            <div className="p-6 relative z-0">
              <div className="flex justify-center">
                <AnalogDigitalClock />
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">1,247</div>
                    <div className="text-sm text-slate-600">Active Students</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">89</div>
                    <div className="text-sm text-slate-600">Today's Submissions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">23</div>
                    <div className="text-sm text-slate-600">Pending Reviews</div>
                  </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Line Chart */}
          <div className="lg:col-span-1 h-full">
            <LineChart />
          </div>
          
          {/* Bar Chart */}
          <div className="lg:col-span-1 h-full">
            <CustomBarChart />
          </div>
        </div>

        {/* Additional Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Student Engagement Widget */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Student Engagement</h3>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Daily Logins</span>
                <span className="text-lg font-bold text-emerald-600">847</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Avg. Session</span>
                <span className="text-lg font-bold text-blue-600">42m</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Course Progress</span>
                <span className="text-lg font-bold text-purple-600">78%</span>
              </div>
              
              <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Assignment Status Widget */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Assignment Status</h3>
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <span className="text-sm font-medium text-emerald-800">Completed</span>
                <span className="text-lg font-bold text-emerald-600">156</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-sm font-medium text-orange-800">Pending</span>
                <span className="text-lg font-bold text-orange-600">43</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-red-800">Overdue</span>
                <span className="text-lg font-bold text-red-600">12</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics Widget */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Performance</h3>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Trophy className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">4.8</div>
                <div className="text-sm text-slate-600">Average Rating</div>
                <div className="flex justify-center mt-2">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Course Quality</span>
                  <span className="text-emerald-600 font-medium">95%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{width: '95%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Student Satisfaction</span>
                  <span className="text-blue-600 font-medium">89%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '89%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Widget */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Quick Stats</h3>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                <div className="text-2xl font-bold text-emerald-600">32</div>
                <div className="text-xs text-emerald-700">Active Courses</div>
              </div>
              
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">145</div>
                <div className="text-xs text-blue-700">Certificates</div>
              </div>
              
              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-xs text-purple-700">Success Rate</div>
              </div>
              
              <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">4.2k</div>
                <div className="text-xs text-orange-700">Total Views</div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar and Activities Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Enhanced Calendar */}
          <div className="lg:col-span-1">
            <CalendarWidget />
          </div>
          
          {/* Recent Activities with Enhanced Design */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm h-full">
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
                {mockData.recentActivities.slice(0, 5).map((activity) => (
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

          {/* Learning Progress & Insights Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm h-full">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">Learning Insights</h3>
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Weekly Progress */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-slate-700">Weekly Progress</span>
                    <span className="text-sm text-emerald-600 font-semibold">+12%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full w-4/5 relative">
                      <div className="absolute right-0 top-0 w-3 h-3 bg-emerald-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">80% of weekly goal achieved</div>
                </div>

                {/* Top Performing Courses */}
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Top Performing Courses</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Environmental Science", score: 95, color: "emerald" },
                      { name: "Climate Change", score: 89, color: "blue" },
                      { name: "Renewable Energy", score: 87, color: "purple" }
                    ].map((course, index) => (
                      <div key={course.name} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          course.color === 'emerald' ? 'bg-emerald-500' :
                          course.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-700">{course.name}</span>
                            <span className="text-sm font-semibold text-emerald-600">{course.score}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Student Milestones */}
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Recent Milestones</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                      <Trophy className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="text-sm font-medium text-emerald-800">50 Courses Completed</div>
                        <div className="text-xs text-emerald-600">This month</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Star className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="text-sm font-medium text-blue-800">Excellence Badge</div>
                        <div className="text-xs text-blue-600">Top 10% performance</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors group">
                      <BookOpen className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                      <div className="text-xs text-emerald-700 font-medium">New Course</div>
                    </button>
                    
                    <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
                      <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                      <div className="text-xs text-blue-700 font-medium">Students</div>
                    </button>
                  </div>
                </div>
              </div>
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

        {/* Course Distribution Chart - Full Width */}
        <div className="mt-8">
          <CourseDistributionChart />
        </div>
      </div>
    </div>
  );
}
