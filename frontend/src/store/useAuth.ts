import { create } from 'zustand';
import api from '@/lib/api';

interface AuthState {
    user: any | null;
    token: string | null;
    login: (credentials: any) => Promise<void>;
    logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        const { access_token, user } = response.data;
        localStorage.setItem('token', access_token);
        set({ user, token: access_token });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },
}));
