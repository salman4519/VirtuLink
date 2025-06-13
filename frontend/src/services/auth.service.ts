import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

interface UserData {
  username?: string;
  email: string;
  role?: string;
  password: string;
  confirmPassword?: string;
}

export const register = async (userData: UserData) => {
  const response = await axios.post(`${API_URL}/register`, {
    username: userData.username,
    email: userData.email,
    role: userData.role || "attendee" ,
    password: userData.password
  });
  return response.data;
};

export const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};