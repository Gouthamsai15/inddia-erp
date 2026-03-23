import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { LogOut, User, Menu, Bell, Search } from 'lucide-react';
import { authService } from '../../services/authService';
import { cn } from '../../utils/cn';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.signOut();
    logout();
    navigate('/login');
  };

  return (
    <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 w-full">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Mobile Toggle & Search */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl w-64 lg:w-80 group focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none text-sm text-slate-600 w-full placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right: User Info & Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider mt-1 inline-block px-2 py-0.5 rounded-md",
                  user.role === 'admin' ? "bg-red-50 text-red-600" : "bg-indigo-50 text-indigo-600"
                )}>
                  {user.role}
                </span>
              </div>
              
              <div className="group relative">
                <button className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center border-2 border-white shadow-sm hover:ring-2 hover:ring-indigo-500 transition-all overflow-hidden">
                  <User className="w-5 h-5 text-indigo-600" />
                </button>
                
                {/* Simple Dropdown on Hover/Click could go here */}
              </div>

              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout} 
                className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
