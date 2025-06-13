import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthPage = () => {
   const { login, register } = useAuth();
const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
      }
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    }
  };



  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: ''
    });
  };


  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-black via-black to-purple-900/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl shadow-purple-500/10 border border-gray-800/50 p-8 my-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xl font-bold bg-white bg-clip-text text-transparent">VirtuLink</span>
          <p className="text-gray-400">{isLogin ? "Welcome back" : "Create your account"}</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Full Name - only shown in signup */}
          {!isLogin && (
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}

          {/* Email */}
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
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Type - only shown in signup */}
          {!isLogin && (
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                Account Type
              </label>
              <select
                id="type"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                required={!isLogin}
              >
                <option value="" className="text-gray-500">Select account type</option>
                <option value="attendee">Attendee</option>
                <option value="host">Host</option>
              </select>
            </div>
          )}

          {/* Password */}
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              {isLogin && (
                <a
                  href="/forgot-password"
                  className="text-xs text-purple-400 hover:text-purple-300 hover:underline focus:outline-none"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 pr-10"
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none transition-colors"
              style={{ top: isLogin ? '24px' : '32px' }}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Confirm Password - only shown in signup */}
          {!isLogin && (
            <div className="relative">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 pr-10"
                placeholder="Confirm your password"
                required={!isLogin}
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none transition-colors"
                style={{ top: '32px' }}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            {isLogin ? "Log In" : "Create Account"}
          </button>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="px-4 text-sm text-gray-400 bg-gray-900/80">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full py-3 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 focus:outline-none flex items-center justify-center space-x-3"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>{isLogin ? "Log in" : "Sign up"} with Google</span>
          </button>
        </div>

        {/* Toggle between login/signup */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={toggleAuthMode}
              className="text-purple-400 hover:text-purple-300 hover:underline transition-colors focus:outline-none"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;