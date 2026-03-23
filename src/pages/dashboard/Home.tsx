import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../../components/ui/Card';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp,
  Calendar,
  Clock,
  Bell,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

export default function DashboardHome() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const stats = [
    { 
      label: 'Total Students', 
      value: '1,284', 
      icon: GraduationCap, 
      color: 'bg-blue-500', 
      trend: '+12%', 
      isPositive: true,
      path: '/dashboard/students'
    },
    { 
      label: 'Total Teachers', 
      value: '86', 
      icon: Users, 
      color: 'bg-indigo-500', 
      trend: '+2%', 
      isPositive: true,
      path: '/dashboard/staff'
    },
    { 
      label: 'Total Classes', 
      value: '24', 
      icon: BookOpen, 
      color: 'bg-emerald-500', 
      trend: '0%', 
      isPositive: true,
      path: '/dashboard/subjects'
    },
    { 
      label: 'Fees Collected', 
      value: '₹4.2M', 
      icon: CreditCard, 
      color: 'bg-orange-500', 
      trend: '+1.5%', 
      isPositive: true,
      path: '/dashboard/fees'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name}!</h1>
          <p className="text-slate-500">Here's a summary of your institution's performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 flex items-center gap-2 text-sm font-bold text-slate-600 shadow-sm">
            <Calendar className="w-4 h-4 text-indigo-600" />
            March 23, 2026
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => navigate(stat.path)}
            className="cursor-pointer group"
          >
            <Card className="p-6 hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg', stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={cn(
                  'flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg',
                  stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                )}>
                  {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 group-hover:text-indigo-600 transition-colors">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2" title="Recent Activity" subtitle="Latest updates from across the institution">
          <div className="space-y-6 mt-4">
            {[
              { type: 'attendance', title: 'Attendance Marked', desc: 'Class 10-A attendance marked by Mr. Sharma', time: '10 mins ago', color: 'bg-blue-100 text-blue-600' },
              { type: 'result', title: 'Results Published', desc: 'Mid-term results for Mathematics published', time: '2 hours ago', color: 'bg-indigo-100 text-indigo-600' },
              { type: 'fee', title: 'Fee Payment', desc: 'Fee payment received for Student ID: SCH-001', time: '4 hours ago', color: 'bg-orange-100 text-orange-600' },
              { type: 'user', title: 'New Student Added', desc: 'Aarav Patel joined Class 8-B', time: 'Yesterday', color: 'bg-emerald-100 text-emerald-600' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 group cursor-default">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110", item.color)}>
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1 border-b border-slate-50 pb-4 last:border-none">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card title="Quick Actions">
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { label: 'Add Student', icon: GraduationCap, path: '/dashboard/students' },
                { label: 'Attendance', icon: Clock, path: '/dashboard/attendance' },
                { label: 'Fee Receipt', icon: CreditCard, path: '/dashboard/fees' },
                { label: 'New Result', icon: BookOpen, path: '/dashboard/results' },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-indigo-600 hover:text-white transition-all group shadow-sm hover:shadow-indigo-200"
                >
                  <action.icon className="w-6 h-6 text-slate-400 group-hover:text-white mb-2 transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-center">{action.label}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="bg-indigo-600 text-white border-none shadow-lg shadow-indigo-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <h3 className="text-lg font-bold mb-2 relative z-10">System Status</h3>
            <p className="text-indigo-100 text-sm mb-4 relative z-10">All systems are operational. Last backup was 4 hours ago.</p>
            <div className="flex items-center gap-2 relative z-10">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Live & Secure</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
