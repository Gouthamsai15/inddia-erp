import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, initialized } = useAuthStore();
  const location = useLocation();

  console.log('INDDIA ERP: ProtectedRoute state:', { initialized, loading, user: !!user });

  if (!initialized || loading) {
    console.log('INDDIA ERP: ProtectedRoute showing spinner...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">Verifying Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('INDDIA ERP: ProtectedRoute redirecting to login...');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('INDDIA ERP: ProtectedRoute rendering children...');
  return <>{children}</>;
}
