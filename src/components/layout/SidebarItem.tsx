import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  onClick?: () => void;
}

export function SidebarItem({ icon: Icon, label, path, onClick }: SidebarItemProps) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) => cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group',
        isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
      )}
    >
      <Icon className={cn(
        'w-5 h-5 transition-colors',
        'group-hover:text-indigo-600',
        '[[aria-current="page"]_&]:text-white'
      )} />
      <span>{label}</span>
    </NavLink>
  );
}
