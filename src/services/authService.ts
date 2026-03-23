import { supabase } from './supabaseClient';
import { UserProfile } from '../types';

export const authService = {
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    console.log('INDDIA ERP: authService.getUserProfile starting for:', userId);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('INDDIA ERP: authService.getUserProfile error:', error);
        return null;
      }

      console.log('INDDIA ERP: authService.getUserProfile success:', data?.name);
      return data as UserProfile;
    } catch (err) {
      console.error('INDDIA ERP: authService.getUserProfile catch error:', err);
      return null;
    }
  },

  async getEmailBySchoolId(schoolId: string): Promise<string | null> {
    console.log('INDDIA ERP: authService.getEmailBySchoolId starting for:', schoolId);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('school_id', schoolId)
        .single();

      if (error) {
        console.error('INDDIA ERP: authService.getEmailBySchoolId error:', error);
        return null;
      }

      console.log('INDDIA ERP: authService.getEmailBySchoolId success:', data?.email);
      return data?.email || null;
    } catch (err) {
      console.error('INDDIA ERP: authService.getEmailBySchoolId catch error:', err);
      return null;
    }
  },

  async signOut() {
    await supabase.auth.signOut();
  }
};
