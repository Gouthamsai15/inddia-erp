import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { supabase, isSupabaseConfigured } from './services/supabaseClient';
import { authService } from './services/authService';
import { Button } from './components/ui/Button';
import { ShieldAlert, ExternalLink } from 'lucide-react';

// Pages
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import DashboardHome from './pages/dashboard/Home';

// Layouts & Protection
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { RoleProtectedRoute } from './components/layout/RoleProtectedRoute';

function ConfigRequired() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Configuration Required</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          INDDIA ERP requires a Supabase connection to handle authentication and data storage. 
          Please set your environment variables in the AI Studio Secrets panel.
        </p>
        
        <div className="space-y-3 text-left bg-slate-50 p-4 rounded-xl border border-slate-100 mb-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Required Variables:</p>
          <code className="block text-xs text-indigo-600 font-mono">VITE_SUPABASE_URL</code>
          <code className="block text-xs text-indigo-600 font-mono">VITE_SUPABASE_ANON_KEY</code>
        </div>

        <div className="flex flex-col gap-3">
          <a 
            href="https://supabase.com/dashboard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full" rightIcon={<ExternalLink className="w-4 h-4" />}>
              Open Supabase Dashboard
            </Button>
          </a>
          <Button variant="ghost" onClick={() => window.location.reload()}>
            I've set the keys, reload app
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { setUser, setRole, setLoading, setInitialized } = useAuthStore();

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      setInitialized(true);
      return;
    }

    // Check active session on mount
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const profile = await authService.getUserProfile(session.user.id);
          if (profile) {
            setUser(profile);
            setRole(profile.role);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const profile = await authService.getUserProfile(session.user.id);
        if (profile) {
          setUser(profile);
          setRole(profile.role);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setRole(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setRole, setLoading, setInitialized]);

  if (!isSupabaseConfigured) {
    return <ConfigRequired />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<DashboardHome />} />
          
          {/* Admin & Staff Only */}
          <Route path="students" element={<RoleProtectedRoute allowedRoles={['admin', 'staff']}><div className="p-8">Students Page</div></RoleProtectedRoute>} />
          <Route path="subjects" element={<RoleProtectedRoute allowedRoles={['admin', 'staff']}><div className="p-8">Subjects Page</div></RoleProtectedRoute>} />
          
          {/* Admin Only */}
          <Route path="staff" element={<RoleProtectedRoute allowedRoles={['admin']}><div className="p-8">Staff Management Page</div></RoleProtectedRoute>} />
          <Route path="employees" element={<RoleProtectedRoute allowedRoles={['admin']}><div className="p-8">HR / Employees Page</div></RoleProtectedRoute>} />
          <Route path="vehicles" element={<RoleProtectedRoute allowedRoles={['admin']}><div className="p-8">Transport Page</div></RoleProtectedRoute>} />
          <Route path="applicants" element={<RoleProtectedRoute allowedRoles={['admin']}><div className="p-8">Admission Page</div></RoleProtectedRoute>} />
          
          {/* Shared Routes */}
          <Route path="timetable" element={<div className="p-8">Timetable Page</div>} />
          <Route path="attendance" element={<div className="p-8">Attendance Page</div>} />
          <Route path="results" element={<div className="p-8">Results Page</div>} />
          <Route path="fees" element={<RoleProtectedRoute allowedRoles={['admin', 'student']}><div className="p-8">Fees Page</div></RoleProtectedRoute>} />
          
          <Route path="*" element={<div className="p-8 text-center text-slate-500">Page under construction</div>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
