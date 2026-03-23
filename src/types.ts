export type UserRole = 'admin' | 'staff' | 'student' | 'parent';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  school_id?: string;
  created_at: string;
}

export interface AuthState {
  user: UserProfile | null;
  role: UserRole | null;
  loading: boolean;
  initialized: boolean;
}
