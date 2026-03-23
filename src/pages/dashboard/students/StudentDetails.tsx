import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dataService } from '../../../services/dataService';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { 
  ArrowLeft, 
  GraduationCap, 
  User, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Loader2, 
  Calendar,
  Shield,
  CreditCard
} from 'lucide-react';

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const data = await dataService.getStudent(id!);
      setStudent(data);
    } catch (error) {
      console.error('Error fetching student:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Student not found.</p>
        <Button variant="ghost" onClick={() => navigate('/dashboard/students')} className="mt-4">
          Back to Directory
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button 
        onClick={() => navigate('/dashboard/students')}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Directory
      </button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <GraduationCap className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{student.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                Class {student.class}-{student.section}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                ID: {student.users?.school_id}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Student Info */}
          <Card title="Academic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Class</p>
                  <p className="text-sm font-medium text-slate-700 mt-1">Grade {student.class}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <Shield className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Section</p>
                  <p className="text-sm font-medium text-slate-700 mt-1">Section {student.section}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Enrollment Date</p>
                  <p className="text-sm font-medium text-slate-700 mt-1">{new Date(student.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <CreditCard className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fee Status</p>
                  <p className="text-sm font-medium text-emerald-600 mt-1">Up to Date</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Parent Info */}
          <Card title="Parent / Guardian Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Guardian Name</p>
                  <p className="text-sm font-medium text-slate-700 mt-1">{student.parents?.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <Phone className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Number</p>
                  <p className="text-sm font-medium text-slate-700 mt-1">{student.parents?.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-sm font-medium text-slate-700 mt-1">{student.parents?.email}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Quick Summary">
            <div className="space-y-4 mt-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-xs font-bold text-slate-400 uppercase">Attendance</span>
                <span className="text-sm font-bold text-emerald-600">94%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-xs font-bold text-slate-400 uppercase">Average Grade</span>
                <span className="text-sm font-bold text-indigo-600">A-</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-xs font-bold text-slate-400 uppercase">Conduct</span>
                <span className="text-sm font-bold text-blue-600">Excellent</span>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900 text-white border-none">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">System IDs</h3>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Student UUID</p>
                <p className="text-xs font-mono text-slate-300 break-all">{student.id}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Parent UUID</p>
                <p className="text-xs font-mono text-slate-300 break-all">{student.parent_id}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
