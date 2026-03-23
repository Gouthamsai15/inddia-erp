import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../types';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function RoleProtectedRoute({ children, allowedRoles }: RoleProtectedRouteProps) {
  const { role } = useAuthStore();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return <>{children}</>;
}
