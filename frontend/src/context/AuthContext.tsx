import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from '../services/auth.service'
import { User, AuthContextType,  RegisterData } from '../types';
import { toast } from 'sonner';
import { useAuthStore } from '../store/authStore'; // Import useAuthStore


const AuthContext  = createContext<AuthContextType | null>(null);

// context/AuthContext.tsx
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setLocalUser] = useState<User | null>(null); // Renamed to setLocalUser to avoid conflict
  const { setUser: setAuthStoreUser } = useAuthStore(); // Get setUser from AuthStore
  const [loading, setLoading] = useState(true); // Initialize loading state
  //const navigate = useNavigate();

  useEffect(() => {
    // Check for existing auth state
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setLocalUser(parsedUser);
        setAuthStoreUser(parsedUser); // Also set user in AuthStore
      } catch (error) {
        console.error('Failed to parse user data', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false); // Set loading to false after initialization
  }, []);

  const login = async (email: string, password: string,navigate: (path: string) => void) => {
    setLoading(true);
    try {
      const response = await AuthService.login({ email, password });

      if (response.data) {
        setLocalUser(response.data.user);
        setAuthStoreUser(response.data.user); // Also set user in AuthStore
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        navigate(`/${response.data.user.role}/profile`);
      } else if (response.error) {
        toast.error(response.error);
      }

      return response;

    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      const response = await AuthService.register(userData);
      console.log(response,'res[')
      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = (navigate: (path: string) => void) => {
    setLocalUser(null);
    setAuthStoreUser({}); // Clear user in AuthStore
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const updateProfile = async (_userData: Partial<User>) => {
    setLoading(true);
    try {
      if (!user) throw new Error('Not authenticated');
      console.warn("updateProfile functionality is not yet implemented in AuthService.", _userData);
      // const updatedUser = await AuthService.updateProfile(user.id, userData, token);
      // setUser(updatedUser);
      // localStorage.setItem('user', JSON.stringify(updatedUser));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        user: user, // Use local user state
        loading, // Make sure to include loading here
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};