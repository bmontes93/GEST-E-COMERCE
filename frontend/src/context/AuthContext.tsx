import { createContext, useContext, useState, type ReactNode } from 'react';
import { api } from '../lib/api';

type UserRole = 'client' | 'provider' | 'admin';

interface User {
    id: number;
    email: string;
    name: string;
    role: UserRole;
    businessName?: string;
}

interface AuthContextType {
  role: UserRole;
  user: User | null;
  login: (email: string, pass: string) => Promise<User>;
  socialLogin: (provider: string, email: string, name: string, social_id: string, avatarUrl?: string) => Promise<User>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('gest_user');
    if (storedUser) {
         try {
             return JSON.parse(storedUser);
         } catch (err) {
             console.error("Failed to parse user session", err);
             localStorage.removeItem('gest_user');
         }
    }
    return null;
  });

  const [role, setRole] = useState<UserRole>(() => {
      if (user) return user.role;
      return 'client';
  });

  const isLoading = false; // Synchronous init means no loading state needed

  const login = async (email: string, pass: string) => {
    try {
        const data = await api.post<User>('/api/auth/login', { email, password: pass });

        const loggedUser: User = {
            id: data.id,
            email: data.email,
            name: data.name,
            role: data.role as UserRole,
            businessName: data.businessName
        };

        setUser(loggedUser);
        setRole(loggedUser.role);
        localStorage.setItem('gest_user', JSON.stringify(loggedUser));
        return loggedUser;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
  };

  const socialLogin = async (provider: string, email: string, name: string, social_id: string, avatarUrl?: string) => {
      try {
          const data = await api.post<User>('/api/auth/social-login', { 
              provider, 
              email, 
              name, 
              social_id,
              avatarUrl
          });

          const loggedUser: User = {
              id: data.id,
              email: data.email,
              name: data.name,
              role: data.role as UserRole,
              businessName: data.businessName
          };

          setUser(loggedUser);
          setRole(loggedUser.role);
          localStorage.setItem('gest_user', JSON.stringify(loggedUser));
          return loggedUser;
      } catch (error) {
          console.error("Social Login error:", error);
          throw error;
      }
  };

  const logout = () => {
      setUser(null);
      setRole('client');
      localStorage.removeItem('gest_user');
      window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ role, user, login, socialLogin, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
