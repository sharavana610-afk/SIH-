"use client";

import React, { useState, useEffect } from 'react';
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

// API-ready data structure - replace with actual API calls
const apiEndpoints = {
  stats: '/api/dashboard/stats',
  activities: '/api/dashboard/activities', 
  chartData: '/api/dashboard/charts',
  events: '/api/dashboard/events',
  students: '/api/dashboard/students',
  notifications: '/api/dashboard/notifications'
};

// Backend Integration Helper Functions
const apiHelper = {
  // Fetch dashboard statistics
  fetchStats: async () => {
    try {
      const response = await fetch(apiEndpoints.stats);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Stats API not available, using mock data');
      return mockData.stats;
    }
  },

  // Fetch recent activities with pagination
  fetchActivities: async (page = 1, limit = 10) => {
    try {
      const response = await fetch(`${apiEndpoints.activities}?page=${page}&limit=${limit}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Activities API not available, using mock data');
      return mockData.recentActivities;
    }
  },

  // Fetch chart data for different time periods
  fetchChartData: async (type = 'monthly', period = 'current') => {
    try {
      const response = await fetch(`${apiEndpoints.chartData}/${type}?period=${period}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Chart data API not available, using mock data');
      return mockData.chartData;
    }
  },

  // Create, update, or delete calendar events
  manageEvents: async (action, eventData = null) => {
    try {
      const method = action === 'create' ? 'POST' : action === 'update' ? 'PUT' : 'DELETE';
      const response = await fetch(apiEndpoints.events, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: eventData ? JSON.stringify(eventData) : undefined
      });
      return await response.json();
    } catch (error) {
      console.log('Events API not available, using local storage');
      return { success: false, error: 'API not connected' };
    }
  },

  // Real-time data updates using WebSocket or Server-Sent Events
  subscribeToUpdates: (callback) => {
    try {
      // WebSocket connection for real-time updates
      const ws = new WebSocket('ws://localhost:8080/dashboard-updates');
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        callback(data);
      };
      return ws;
    } catch (error) {
      console.log('WebSocket not available, using polling');
      // Fallback to polling every 30 seconds
      return setInterval(() => {
        apiHelper.fetchStats().then(callback);
      }, 30000);
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

  useEffect(() => {
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

  const getRotations = () => {
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
  const dateString = `${currentTime.getDate()} . ${months[currentTime.getMonth()]}`;
  const dayString = days[currentTime.getDay()];
  const timeString = formatTime(currentTime);

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

// Enhanced Pie Chart Component
// Enhanced Pie Chart Component with Backend Integration
const PieChart = () => {
  const data = mockData.chartData.subjectDistribution;
  const total = data.reduce((sum, item) => sum + item.percentage, 0);
  const totalStudents = data.reduce((sum, item) => sum + item.students, 0);
  
  // This function will be replaced with actual API call
  const fetchSubjectData = async () => {
    try {
      const response = await fetch(apiEndpoints.chartData + '/subjects');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Using mock data - replace with actual API');
      return mockData.chartData.subjectDistribution;
    }
  };
  
  let currentAngle = 0;
  const radius = 110;
  const centerX = 140;
  const centerY = 140;

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
      blue: "#059669", 
      purple: "#047857",
      orange: "#065f46",
      green: "#22c55e",
      red: "#16a34a",
      yellow: "#15803d",
      pink: "#166534"
    };
    return colors[colorName as keyof typeof colors] || "#10b981";
  };

  const getDarkerColor = (colorName: string) => {
    const colors = {
      emerald: "#059669",
      blue: "#047857",
      purple: "#065f46", 
      orange: "#064e3b",
      green: "#16a34a",
      red: "#15803d",
      yellow: "#166534",
      pink: "#14532d"
    };
    return colors[colorName as keyof typeof colors] || "#059669";
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-[480px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Course Distribution</h3>
        <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          <BarChart3 className="w-4 h-4" />
          <span className="font-medium">Live Data</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-center mb-4 flex-1">
          <div className="relative">
          <svg width="280" height="280" className="transform -rotate-90">
            <defs>
              {data.map((item) => (
                <linearGradient key={`gradient-${item.subject}`} id={`gradient-${item.subject}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={getColor(item.color)} />
                  <stop offset="100%" stopColor={getDarkerColor(item.color)} />
                </linearGradient>
              ))}
            </defs>
            
            {/* Outer ring shadow */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius + 5}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="8"
            />
            
            {data.map((item, index) => {
              currentAngle = data.slice(0, index).reduce((sum, d) => sum + (d.percentage / total) * 360, 0);
              return (
                <path
                  key={item.subject}
                  d={createPath(item.percentage)}
                  fill={`url(#gradient-${item.subject})`}
                  className="hover:opacity-90 transition-all duration-300 cursor-pointer hover:scale-105"
                  style={{
                    filter: 'drop-shadow(0 4px 12px rgba(16, 185, 129, 0.25))',
                    transformOrigin: `${centerX}px ${centerY}px`
                  }}
                >
                  <title>{`${item.subject}: ${item.percentage}% (${item.students} students) - ${item.growth || 'N/A'} growth`}</title>
                </path>
              );
            })}
            
            {/* Inner circle with gradient */}
            <circle
              cx={centerX}
              cy={centerY}
              r={50}
              fill="white"
              stroke="#10b981"
              strokeWidth="3"
              className="drop-shadow-lg"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800">{totalStudents.toLocaleString()}</div>
              <div className="text-sm text-slate-500 font-medium">Total Students</div>
              <div className="text-sm text-emerald-600 font-bold">+15% growth</div>
            </div>
          </div>
        </div>
        
        {/* Enhanced legend */}
        <div className="space-y-3">
        {data.map((item) => (
          <div key={item.subject} className="group hover:bg-slate-50 p-3 rounded-lg transition-colors duration-200 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div 
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{ backgroundColor: getColor(item.color) }}
                ></div>
                <div 
                  className="absolute inset-0 w-4 h-4 rounded-full animate-pulse opacity-0 group-hover:opacity-30"
                  style={{ backgroundColor: getColor(item.color) }}
                ></div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{item.subject}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-600">{item.percentage}%</span>
                    {item.growth && (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.status === 'growing' 
                          ? 'text-emerald-700 bg-emerald-100 border border-emerald-200' 
                          : 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                      }`}>
                        {item.growth}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">{item.students.toLocaleString()} students</span>
                  <div className="w-20 bg-emerald-100 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 to-emerald-600"
                      style={{ 
                        width: `${item.percentage}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      
      {/* Summary metrics */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-emerald-600">
              {data.length}
            </div>
            <div className="text-xs text-slate-500">Active Courses</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {Math.round(data.reduce((sum, item) => sum + parseFloat(item.growth?.replace('%', '') || '0'), 0) / data.length)}%
            </div>
            <div className="text-xs text-slate-500">Avg Growth</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Bar Chart Component with Backend Integration
const BarChart = () => {
  const data = mockData.chartData.monthlyProgress;
  const maxValue = Math.max(...data.map(d => Math.max(d.students, d.completion)));

  // This function will be replaced with actual API call
  const fetchMonthlyData = async () => {
    try {
      const response = await fetch(apiEndpoints.chartData + '/monthly');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Using mock data - replace with actual API');
      return mockData.chartData.monthlyProgress;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-[480px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Monthly Trends</h3>
        <div className="flex gap-4">
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
      
      <div className="relative flex-1">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400 -ml-8">
          <span>{maxValue}</span>
          <span>{Math.round(maxValue * 0.75)}</span>
          <span>{Math.round(maxValue * 0.5)}</span>
          <span>{Math.round(maxValue * 0.25)}</span>
          <span>0</span>
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0">
          {[0, 25, 50, 75, 100].map((line) => (
            <div
              key={line}
              className="absolute w-full border-t border-slate-100"
              style={{ top: `${100 - line}%` }}
            />
          ))}
        </div>
        
        {/* Bars */}
        <div className="relative h-full flex items-end justify-between gap-4 px-2">
          {data.map((item, index) => (
            <div key={item.period || item.month} className="flex-1 flex flex-col items-center gap-2">
              {/* Student bar */}
              <div className="w-full flex gap-1">
                <div className="relative flex-1 group">
                  <div 
                    className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all duration-500 hover:from-emerald-600 hover:to-emerald-500 cursor-pointer shadow-sm"
                    style={{ height: `${(item.students / maxValue) * 100}%`, minHeight: '4px' }}
                  >
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-10">
                      Students: {item.students}
                    </div>
                  </div>
                </div>
                
                {/* Completion percentage bar */}
                <div className="relative flex-1 group">
                  <div 
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-blue-500 cursor-pointer shadow-sm"
                    style={{ height: `${(item.completion / 100) * 100}%`, minHeight: '4px' }}
                  >
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-10">
                      Completion: {item.completion}%
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Month label */}
              <div className="text-xs text-slate-600 font-medium mt-2 text-center">
                {item.month}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional metrics */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-emerald-600">
              {data.reduce((sum, item) => sum + item.students, 0).toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">Total Students</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {Math.round(data.reduce((sum, item) => sum + item.completion, 0) / data.length)}%
            </div>
            <div className="text-xs text-slate-500">Avg Completion</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">
              ${data.reduce((sum, item) => sum + (item.revenue || 0), 0).toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">Total Revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Line Chart Component with Backend Integration
const LineChart = () => {
  const data = mockData.chartData.weeklyActivity;
  const maxValue = Math.max(...data.map(d => d.value));
  
  // This function will be replaced with actual API call
  const fetchWeeklyData = async () => {
    try {
      const response = await fetch(apiEndpoints.chartData + '/weekly');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Using mock data - replace with actual API');
      return mockData.chartData.weeklyActivity;
    }
  };
  
  const createPath = () => {
    const width = 300;
    const height = 150;
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((item.value / maxValue) * 150);
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  const createAreaPath = () => {
    const basePath = createPath();
    return `${basePath} L 300,150 L 0,150 Z`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-[480px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Weekly Activity</h3>
        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          <TrendingUp className="w-4 h-4" />
          <span className="font-medium">+12% this week</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <svg width="100%" height="180" viewBox="0 0 300 180" className="overflow-visible flex-1">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4"/>
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Y-axis labels */}
          {[0, 25, 50, 75, 100].map((value) => (
            <text
              key={value}
              x="-10"
              y={155 - (value / 100) * 150}
              textAnchor="end"
              className="text-xs fill-slate-400"
            >
              {Math.round((value / 100) * maxValue)}
            </text>
          ))}
          
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
              strokeDasharray={line === 0 ? "none" : "2,2"}
            />
          ))}
          
          {/* Area under the line */}
          <path
            d={createAreaPath()}
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
            filter="url(#glow)"
          />
          
          {/* Data points with enhanced interactivity */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 300;
            const y = 150 - ((item.value / maxValue) * 150);
            return (
              <g key={item.date || item.day}>
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="white"
                  stroke="#10b981"
                  strokeWidth="3"
                  className="hover:r-7 transition-all duration-200 cursor-pointer shadow-lg"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))' }}
                >
                  <title>{`${item.day}: ${item.value}${item.activities ? ` (${item.activities} activities)` : ''}`}</title>
                </circle>
                <text
                  x={x}
                  y="175"
                  textAnchor="middle"
                  className="text-xs fill-slate-600 font-medium"
                >
                  {item.day}
                </text>
              </g>
            );
          })}
        </svg>
        
        {/* Additional metrics */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-emerald-600">
                {Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length)}
              </div>
              <div className="text-xs text-slate-500">Average Activity</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">
                {Math.max(...data.map(d => d.value))}
              </div>
              <div className="text-xs text-slate-500">Peak Activity</div>
            </div>
          </div>
        </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Line Chart */}
          <div className="lg:col-span-1 h-full">
            <LineChart />
          </div>
          
          {/* Bar Chart */}
          <div className="lg:col-span-1 h-full">
            <BarChart />
          </div>
          
          {/* Pie Chart */}
          <div className="lg:col-span-1 h-full">
            <PieChart />
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
      </div>
    </div>
  );
}
