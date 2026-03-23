import { supabase } from './supabaseClient';
import { UserProfile } from '../types';

export const authService = {
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data as UserProfile;
  },

  async getEmailBySchoolId(schoolId: string): Promise<string | null> {
    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('school_id', schoolId)
      .single();

    if (error) {
      console.error('Error fetching email by school ID:', error);
      return null;
    }

    return data?.email || null;
  },

  async signOut() {
    await supabase.auth.signOut();
  }
};
