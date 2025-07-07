import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

const AuthPage = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    username:'',
    email: '',
    role: 'attendee' as UserRole, // Default role
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'role' ? value as UserRole : value
    }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const validateForm = () => {
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match!");
        return false;
      }
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
      }
    }
    if (!formData.email.includes('@')) {
      toast.error("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log('formdata',formData);
      if (isLogin) {
        await login(formData.email, formData.password ,navigate);
      } else {
        // Remove confirmPassword before sending to backend
        const { confirmPassword, username, ...registrationData } = formData;
       const res= await register(registrationData);
       console.log(res,'after sub ')
       if (res.data) {
         navigate('/verify-otp', { state: { email: formData.email } });
       }
      }
      // Redirect is handled in AuthContext after successful auth
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      username:'',
      email: '',
      role: 'attendee', // Set a default valid role
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-black via-black to-purple-900/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl shadow-purple-500/10 border border-gray-800/50 p-8 my-8">
        <div className="text-center mb-8">
          <span className="text-xl font-bold bg-white bg-clip-text text-transparent">VirtuLink</span>
          <p className="text-gray-400">
            {isLogin ? "Welcome back" : "Create your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field - only for registration */}
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Role Selection - only for registration */}
          {!isLogin && (
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                Account Type
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                required={!isLogin}
              >
                <option value="attendee">Attendee</option>
                <option value="host">Host</option>
                {/* Admin option typically not available for self-registration */}
              </select>
            </div>
          )}

          {/* Password Field */}
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              {isLogin && (
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs text-purple-400 hover:text-purple-300 focus:outline-none"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 pr-10"
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none transition-colors"
              style={{ top: isLogin ? '24px' : '32px' }}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm Password - only for registration */}
          {!isLogin && (
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 pr-10"
                placeholder="Confirm your password"
                required={!isLogin}
                minLength={6}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none transition-colors"
                style={{ top: '32px' }}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <span className="animate-spin mr-2">↻</span>
            ) : null}
            {isLogin ? "Log In" : "Create Account"}
          </button>

          {/* Auth Mode Toggle */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="text-purple-400 hover:text-purple-300 hover:underline transition-colors focus:outline-none"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;