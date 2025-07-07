// User role types
export type UserRole = 'attendee' | 'host' | 'admin';

// User interface
export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  bio: string;
  createdAt?: string;
  updatedAt?: string;
  // Add other fields as needed
}
export interface IUser {
  _id: string;
  username: string;
  name?: string; // Made optional as it might be split into first/last
  firstName?: string; // Add this
  lastName?: string; // Add this
  email: string;
  password: string;
  status: "active" | "blocked";
  role: "attendee" | "host" | "admin";
  bio?: string; // Make bio optional if it's not always present
  gid?:string;
  wallet?:string;
  profilePicture?: string; // This was already here, but let's confirm if 'avatar' is a separate field or just an alias
  avatar?: string; // Add this if 'avatar' is distinct from 'profilePicture'
  createdAt: Date;
  updatedAt: Date;
}

// Authentication context type
// types/auth.ts
export interface AuthContextType {
  user: User | null;
  loading: boolean;  // Required property
  login: (email: string, password: string,navigate: (path: string) => void) => Promise<{ data: any; error: string | null }>;
  register: (userData: RegisterData) => Promise<{ data: any; error: string | null }>;
  logout: (navigate: (path: string) => void) => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

// Form data types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username?: string;
  email: string;
  role: UserRole;
  password: string;
  confirmPassword?: string; // Only for frontend validation
  name: string; // Add name field
}

// API response types
export interface AuthResponse {
  user: User;
  token: string;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string>;
}

// Protected route props
export interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children?: React.ReactNode;
}

// Profile update type
export interface ProfileUpdateData {
  username?: string;
  email?: string;
  password?: string;
  currentPassword?: string; // For password changes
}

export interface DecodedToken {
  id: string;
  username: string;
  role: string;
}