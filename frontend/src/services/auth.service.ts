import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api/auth';

interface UserData {
  fullName?: string;
  email: string;
  type?: string;
  password: string;
  confirmPassword?: string;
}

export const register = async (userData: UserData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      fullName: userData.fullName,
      email: userData.email,
      type: userData.type,
      password: userData.password
    });

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Registration successful!');
    }

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    toast.error(message);
    throw error;
  }
};

export const login = async (userData: Omit<UserData, 'fullName' | 'type' | 'confirmPassword'>) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: userData.email,
      password: userData.password
    });

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Login successful!');
    }

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    toast.error(message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  toast.success('Logged out successfully!');
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    toast.error(message);
    throw error;
  }
};