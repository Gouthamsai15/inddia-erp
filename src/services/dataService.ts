import { supabase } from './supabaseClient';
import { UserProfile, UserRole } from '../types';

export const dataService = {
  // SUBJECTS
  async getSubjects() {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('name');
    if (error) throw error;
    return data;
  },

  async getSubject(id: string) {
    const { data, error } = await supabase
      .from('subjects')
      .select('*, staff(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async addSubject(name: string) {
    const { data, error } = await supabase
      .from('subjects')
      .insert([{ name }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateSubject(id: string, name: string) {
    const { data, error } = await supabase
      .from('subjects')
      .update({ name })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteSubject(id: string) {
    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // STAFF
  async getStaff() {
    const { data, error } = await supabase
      .from('staff')
      .select('*, users(*), subjects(name)')
      .order('name');
    if (error) throw error;
    return data;
  },

  async getStaffMember(id: string) {
    const { data, error } = await supabase
      .from('staff')
      .select('*, users(*), subjects(name)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async addStaff(staffData: any) {
    // Note: In a real app, you'd use a service role key to create auth users.
    // Here we simulate the process by creating the user profile first.
    // The user would then need to sign up or be invited.
    // For this ERP, we'll assume the admin creates the profile and the user logs in.
    
    // 1. Create User Profile (assuming auth is handled separately or using a placeholder ID if auth.admin is unavailable)
    // For the sake of this demo, we'll use a random UUID if we can't create auth user directly.
    // Ideally, this would be an Edge Function call.
    
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([{
        id: crypto.randomUUID(), // Placeholder until real auth is integrated
        name: staffData.name,
        email: staffData.email,
        role: staffData.role
      }])
      .select()
      .single();
    
    if (userError) throw userError;

    const { data, error } = await supabase
      .from('staff')
      .insert([{
        user_id: userData.id,
        name: staffData.name,
        role: staffData.role,
        subject_id: staffData.subject_id,
        is_class_coordinator: staffData.is_class_coordinator,
        assigned_class: staffData.assigned_class,
        assigned_section: staffData.assigned_section
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteStaff(id: string, userId: string) {
    const { error: staffError } = await supabase
      .from('staff')
      .delete()
      .eq('id', id);
    if (staffError) throw staffError;

    const { error: userError } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);
    if (userError) throw userError;
  },

  // STUDENTS & PARENTS
  async getStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('*, users(*), parents(*)')
      .order('name');
    if (error) throw error;
    return data;
  },

  async getStudent(id: string) {
    const { data, error } = await supabase
      .from('students')
      .select('*, users(*), parents(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async addStudent(studentData: any, parentData: any) {
    // 1. Create Parent User Profile
    const { data: parentUserData, error: pUserError } = await supabase
      .from('users')
      .insert([{
        id: crypto.randomUUID(),
        name: parentData.name,
        email: parentData.email,
        role: 'student' // Parents are often treated as students/viewers in simple ERPs or have a specific role
      }])
      .select()
      .single();
    if (pUserError) throw pUserError;

    // 2. Create Parent Profile
    const { data: parentProfile, error: pProfileError } = await supabase
      .from('parents')
      .insert([{
        user_id: parentUserData.id,
        name: parentData.name,
        email: parentData.email,
        phone: parentData.phone
      }])
      .select()
      .single();
    if (pProfileError) throw pProfileError;

    // 3. Create Student User Profile
    const { data: studentUserData, error: sUserError } = await supabase
      .from('users')
      .insert([{
        id: crypto.randomUUID(),
        name: studentData.name,
        school_id: studentData.school_id,
        role: 'student'
      }])
      .select()
      .single();
    if (sUserError) throw sUserError;

    // 4. Create Student Profile
    const { data: studentProfile, error: sProfileError } = await supabase
      .from('students')
      .insert([{
        user_id: studentUserData.id,
        name: studentData.name,
        class: studentData.class,
        section: studentData.section,
        parent_id: parentProfile.id
      }])
      .select()
      .single();
    if (sProfileError) throw sProfileError;

    return studentProfile;
  },

  async deleteStudent(id: string, userId: string, parentId: string, parentUserId: string) {
    // Delete Student
    await supabase.from('students').delete().eq('id', id);
    await supabase.from('users').delete().eq('id', userId);
    
    // Delete Parent
    await supabase.from('parents').delete().eq('id', parentId);
    await supabase.from('users').delete().eq('id', parentUserId);
  }
};
