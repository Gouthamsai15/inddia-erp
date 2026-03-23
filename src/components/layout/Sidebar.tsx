import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  BookOpen, 
  Calendar, 
  Briefcase, 
  CreditCard, 
  Truck, 
  UserPlus,
  GraduationCap,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { SidebarItem } from './SidebarItem';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { role } = useAuthStore();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/home', roles: ['admin', 'staff', 'student'] },
    { icon: GraduationCap, label: 'Students', path: '/dashboard/students', roles: ['admin', 'staff'] },
    { icon: UserSquare2, label: 'Staff', path: '/dashboard/staff', roles: ['admin'] },
    { icon: BookOpen, label: 'Subjects', path: '/dashboard/subjects', roles: ['admin', 'staff'] },
    { icon: Calendar, label: 'Timetable', path: '/dashboard/timetable', roles: ['admin', 'staff', 'student'] },
    { icon: Briefcase, label: 'HR / Employees', path: '/dashboard/employees', roles: ['admin'] },
    { icon: CreditCard, label: 'Accounts / Fees', path: '/dashboard/fees', roles: ['admin', 'student'] },
    { icon: Truck, label: 'Transport', path: '/dashboard/vehicles', roles: ['admin'] },
    { icon: UserPlus, label: 'Admission', path: '/dashboard/applicants', roles: ['admin'] },
  ];

  const filteredItems = menuItems.filter(item => role && item.roles.includes(role));

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-[260px] bg-white border-r border-slate-200 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">INDDIA ERP</h1>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1 block">
                {role || 'User'} Panel
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {filteredItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Version</p>
            <p className="text-sm font-bold text-slate-900 mt-1">v1.0.4 Foundation</p>
          </div>
        </div>
      </aside>
    </>
  );
}
