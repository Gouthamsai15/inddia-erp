import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, ShieldCheck, UserCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Login() {
  const [loginType, setLoginType] = useState<'staff' | 'student'>('staff');
  const [identifier, setIdentifier] = useState(''); // Email or School ID
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setUser, setRole } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let email = identifier;
      console.log('INDDIA ERP: Attempting login for:', identifier);

      // Handle Student Login: Convert School ID to Email
      if (loginType === 'student') {
        console.log('INDDIA ERP: Fetching email for school ID:', identifier);
        const fetchedEmail = await authService.getEmailBySchoolId(identifier);
        if (!fetchedEmail) {
          throw new Error('Invalid School ID. Please contact your administrator.');
        }
        email = fetchedEmail;
      }

      // Supabase Auth Login
      console.log('INDDIA ERP: Signing in with Supabase Auth...');
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error('INDDIA ERP: Auth error:', authError);
        throw authError;
      }

      if (data.user) {
        console.log('INDDIA ERP: Auth success, fetching profile for user:', data.user.id);
        const profile = await authService.getUserProfile(data.user.id);
        if (profile) {
          console.log('INDDIA ERP: Profile found, navigating to dashboard...');
          setUser(profile);
          setRole(profile.role);
          navigate('/dashboard');
        } else {
          console.warn('INDDIA ERP: Profile not found in users table.');
          throw new Error('User profile not found.');
        }
      }
    } catch (err: any) {
      console.error('INDDIA ERP: Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 mb-4">
            <GraduationCap className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">INDDIA ERP</h1>
          <p className="text-slate-500 mt-2">Sign in to access your dashboard</p>
        </div>

        <Card className="p-0 border-none shadow-xl shadow-slate-200/50">
          <div className="p-1 bg-slate-100 rounded-t-xl flex">
            <button
              onClick={() => setLoginType('staff')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all rounded-lg',
                loginType === 'staff' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              )}
            >
              <ShieldCheck className="w-4 h-4" />
              Staff Login
            </button>
            <button
              onClick={() => setLoginType('student')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all rounded-lg',
                loginType === 'student' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              )}
            >
              <UserCircle className="w-4 h-4" />
              Student Login
            </button>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.form
                key={loginType}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLogin}
                className="space-y-5"
              >
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <Input
                  label={loginType === 'staff' ? 'Email Address' : 'School ID'}
                  placeholder={loginType === 'staff' ? 'admin@inddiaerp.com' : 'SCH-2026-001'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-xs text-slate-600 font-medium">Remember me</span>
                  </label>
                  <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot password?</a>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-bold"
                  isLoading={loading}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Sign In
                </Button>
              </motion.form>
            </AnimatePresence>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Default Admin: <span className="font-bold text-slate-700">admin@inddiaerp.com</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">Password: admin123</p>
        </div>
      </motion.div>
    </div>
  );
}
