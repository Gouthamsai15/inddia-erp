import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../../../services/dataService';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { 
  Plus, 
  Eye, 
  Edit2, 
  Trash2, 
  GraduationCap, 
  X, 
  Loader2,
  User,
  Users,
  Phone,
  Mail,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../utils/cn';

export default function StudentList() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    student: {
      name: '',
      school_id: '',
      class: '',
      section: '',
      password: ''
    },
    parent: {
      name: '',
      email: '',
      phone: '',
      password: ''
    }
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await dataService.getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await dataService.addStudent(formData.student, formData.parent);
      setIsModalOpen(false);
      setFormData({
        student: { name: '', school_id: '', class: '', section: '', password: '' },
        parent: { name: '', email: '', phone: '', password: '' }
      });
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (student: any) => {
    if (!confirm(`Are you sure you want to delete ${student.name}? This will also delete their parent account.`)) return;
    try {
      await dataService.deleteStudent(
        student.id, 
        student.user_id, 
        student.parents.id, 
        student.parents.user_id
      );
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Directory</h1>
          <p className="text-slate-500">Manage student profiles and parent relationships</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Add Student
        </Button>
      </div>

      <Card className="overflow-hidden border-none shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Class/Sec</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Parent Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">School ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    No students found.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-700">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 font-medium">{student.class}-{student.section}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{student.parents?.name || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                        {student.users?.school_id}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => navigate(`/dashboard/students/${student.id}`)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(student)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Student Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 my-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Enroll New Student</h2>
                  <p className="text-sm text-slate-500">Fill in both student and parent details to create accounts.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleAddStudent} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Student Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <GraduationCap className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">Student Details</h3>
                    </div>
                    <Input
                      label="Student Name"
                      placeholder="Full Name"
                      value={formData.student.name}
                      onChange={(e) => setFormData({...formData, student: {...formData.student, name: e.target.value}})}
                      required
                    />
                    <Input
                      label="School ID"
                      placeholder="e.g. SCH-2026-001"
                      value={formData.student.school_id}
                      onChange={(e) => setFormData({...formData, student: {...formData.student, school_id: e.target.value}})}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Class"
                        placeholder="e.g. 10"
                        value={formData.student.class}
                        onChange={(e) => setFormData({...formData, student: {...formData.student, class: e.target.value}})}
                        required
                      />
                      <Input
                        label="Section"
                        placeholder="e.g. A"
                        value={formData.student.section}
                        onChange={(e) => setFormData({...formData, student: {...formData.student, section: e.target.value}})}
                        required
                      />
                    </div>
                    <Input
                      label="Login Password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.student.password}
                      onChange={(e) => setFormData({...formData, student: {...formData.student, password: e.target.value}})}
                      required
                    />
                  </div>

                  {/* Parent Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <Users className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">Parent Details</h3>
                    </div>
                    <Input
                      label="Parent Name"
                      placeholder="Guardian Name"
                      value={formData.parent.name}
                      onChange={(e) => setFormData({...formData, parent: {...formData.parent, name: e.target.value}})}
                      required
                    />
                    <Input
                      label="Parent Email"
                      type="email"
                      placeholder="parent@email.com"
                      value={formData.parent.email}
                      onChange={(e) => setFormData({...formData, parent: {...formData.parent, email: e.target.value}})}
                      required
                    />
                    <Input
                      label="Phone Number"
                      placeholder="+91 98765 43210"
                      value={formData.parent.phone}
                      onChange={(e) => setFormData({...formData, parent: {...formData.parent, phone: e.target.value}})}
                      required
                    />
                    <Input
                      label="Login Password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.parent.password}
                      onChange={(e) => setFormData({...formData, parent: {...formData.parent, password: e.target.value}})}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-slate-100">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="flex-1" 
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    isLoading={submitting}
                  >
                    Complete Enrollment
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
