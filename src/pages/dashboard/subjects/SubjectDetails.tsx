import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dataService } from '../../../services/dataService';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, BookOpen, Users, Loader2 } from 'lucide-react';

export default function SubjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchSubject();
  }, [id]);

  const fetchSubject = async () => {
    try {
      const data = await dataService.getSubject(id!);
      setSubject(data);
    } catch (error) {
      console.error('Error fetching subject:', error);
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

  if (!subject) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Subject not found.</p>
        <Button variant="ghost" onClick={() => navigate('/dashboard/subjects')} className="mt-4">
          Back to List
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button 
        onClick={() => navigate('/dashboard/subjects')}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Subjects
      </button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{subject.name}</h1>
            <p className="text-slate-500">Subject Details & Assigned Faculty</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2" title="Assigned Teachers">
          <div className="mt-4 space-y-4">
            {subject.staff && subject.staff.length > 0 ? (
              subject.staff.map((teacher: any) => (
                <div key={teacher.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{teacher.name}</p>
                      <p className="text-xs text-slate-500">{teacher.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/dashboard/staff/${teacher.id}`)}>
                    View Profile
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center py-8">No teachers assigned to this subject yet.</p>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Subject Info">
            <div className="space-y-4 mt-2">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject ID</label>
                <p className="text-sm font-mono text-slate-600 mt-1">{subject.id}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Created At</label>
                <p className="text-sm text-slate-600 mt-1">{new Date(subject.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
