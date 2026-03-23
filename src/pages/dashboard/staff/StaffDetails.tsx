import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dataService } from '../../../services/dataService';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, UserSquare2, Mail, Shield, Book, MapPin, Loader2, CheckCircle2 } from 'lucide-react';

export default function StaffDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      const data = await dataService.getStaffMember(id!);
      setMember(data);
    } catch (error) {
      console.error('Error fetching staff member:', error);
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

  if (!member) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Staff member not found.</p>
        <Button variant="ghost" onClick={() => navigate('/dashboard/staff')} className="mt-4">
          Back to List
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button 
        onClick={() => navigate('/dashboard/staff')}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Staff
      </button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600 font-bold text-2xl shadow-inner">
            {member.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{member.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                {member.role}
              </span>
              {member.is_class_coordinator && (
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Class Coordinator
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card title="Professional Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-sm font-medium text-slate-700 mt-1">{member.users?.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <Book className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Subject</p>
                  <p className="text-sm font-medium text-slate-700 mt-1">{member.subjects?.name || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Class</p>
                  <p className="text-sm font-medium text-slate-700 mt-1">
                    {member.assigned_class ? `Class ${member.assigned_class}-${member.assigned_section}` : 'Not Assigned'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <Shield className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Access</p>
                  <p className="text-sm font-medium text-slate-700 mt-1">Full Portal Access</p>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Academic Responsibilities">
            <div className="mt-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <p className="text-sm text-indigo-700 leading-relaxed">
                As a {member.role === 'admin' ? 'Administrator' : 'Teacher'}, {member.name} is responsible for 
                {member.role === 'admin' ? ' overall system administration, staff management, and institutional oversight.' : ` delivering the ${member.subjects?.name || 'academic'} curriculum and maintaining student performance records.`}
                {member.is_class_coordinator && ` Additionally, as a Class Coordinator, they oversee the daily operations of Class ${member.assigned_class}-${member.assigned_section}.`}
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Account Details">
            <div className="space-y-4 mt-2">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Staff ID</label>
                <p className="text-sm font-mono text-slate-600 mt-1">{member.id}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">User ID</label>
                <p className="text-sm font-mono text-slate-600 mt-1">{member.user_id}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Joined Date</label>
                <p className="text-sm text-slate-600 mt-1">{new Date(member.users?.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
