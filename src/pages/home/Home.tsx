import { Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Button } from '../../components/ui/Button';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  BarChart3,
  Globe
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-100">
              <Globe className="w-3 h-3" />
              The Future of School Management
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Empower Your Institution with <br />
              <span className="text-indigo-600">INDDIA ERP</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
              A complete, production-ready ERP foundation built for modern educational institutions. 
              Manage staff, students, attendance, fees, and results in one unified platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="h-14 px-8 text-lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Launch Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Comprehensive Solutions</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Everything you need to run a modern school efficiently and transparently.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: 'Secure Auth', desc: 'Multi-role login system for admin, staff, and students with strict access controls.' },
              { icon: Users, title: 'User Management', desc: 'Centralized control for staff and student profiles, including parent associations.' },
              { icon: BookOpen, title: 'Academic Tracking', desc: 'Manage subjects, syllabus, and academic progress with ease.' },
              { icon: Calendar, title: 'Smart Timetable', desc: 'Automated scheduling and timetable management for all classes and sections.' },
              { icon: CheckCircle2, title: 'Attendance System', desc: 'Real-time attendance tracking for students with automated reporting.' },
              { icon: BarChart3, title: 'Result Analytics', desc: 'Comprehensive examination management and detailed result analytics.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
              Ready to modernize your school?
            </h2>
            <p className="text-indigo-100/70 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Join hundreds of institutions using INDDIA ERP to streamline their operations and focus on what matters most: education.
            </p>
            <Link to="/login" className="relative z-10">
              <Button size="lg" variant="primary" className="bg-white text-slate-900 hover:bg-slate-100 border-none h-14 px-10 text-lg">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-top border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">INDDIA ERP</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 INDDIA ERP. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function GraduationCap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
