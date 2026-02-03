import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UsersIcon, TrendingUpIcon, CalendarIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import { dummyDashboardData } from '../../assets/assets';
import { getDashboardStats } from '../../services/api';
import { useAuth } from '@clerk/clerk-react';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import { dateFormat } from '../../lib/dateFormat';
import { getImageUrl } from '../../lib/imageUtils';

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: 0,
    totalUser: 0
  });
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = await getToken();
        const response = await getDashboardStats(token);
        if (response.success) {
          setDashboardData(response.stats);
        }
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings,
      icon: ChartLineIcon,
      trend: "+12.5%", // Keep static for now
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20"
    },
    {
      title: "Total Revenue",
      value: currency + dashboardData.totalRevenue,
      icon: CircleDollarSignIcon,
      trend: "+8.2%", // Keep static
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20"
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows,
      icon: PlayCircleIcon,
      trend: "Now Playing",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/20"
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser,
      icon: UsersIcon,
      trend: "+5.4%", // Keep static
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      borderColor: "border-orange-400/20"
    },
  ];

  return !loading ? (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Dashboard</h1>
          <p className="text-gray-400 mt-1">Example overview of your cinema performance</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
          <CalendarIcon className="w-4 h-4" />
          <span>Last 30 Days</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className={`relative overflow-hidden p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${card.borderColor} bg-[#1a1a1a]/40 group`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${card.bgColor} ${card.color}`}>
                <TrendingUpIcon className="w-3 h-3" />
                {card.trend}
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm font-medium">{card.title}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{card.value}</h3>
            </div>

            {/* Decoration */}
            <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-[40px] opacity-20 ${card.bgColor}`}></div>
          </div>
        ))}
      </div>

      {/* Active Shows Section */}

    </div>
  ) : <Loading />
}

export default Dashboard