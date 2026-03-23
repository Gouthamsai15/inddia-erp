import { create } from 'zustand';
import { AuthState, UserProfile, UserRole } from '../types';

interface AuthStore extends AuthState {
  setUser: (user: UserProfile | null) => void;
  setRole: (role: UserRole | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  role: null,
  loading: true,
  initialized: false,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  setLoading: (loading) => set({ loading }),
  setInitialized: (initialized) => set({ initialized }),
  logout: () => set({ user: null, role: null, loading: false }),
}));
