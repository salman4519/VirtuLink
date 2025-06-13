import { createContext, useContext,type ReactNode, useState, useEffect } from 'react';
import { getCurrentUser, login as loginService, register as registerService, logout as logoutService } from '../services/auth.service';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginService({ email, password });
    setUser(response.user);
  };

  const register = async (userData: any) => {
    const response = await registerService(userData);
    setUser(response.user);
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};