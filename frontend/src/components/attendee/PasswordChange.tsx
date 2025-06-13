import React, { useState, ChangeEvent, FormEvent } from 'react';

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ErrorState {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface Message {
  text: string;
  type: 'success' | 'error' | '';
}

const PasswordChange: React.FC = () => {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<Message>({ text: '', type: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ErrorState]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: ErrorState = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage({ text: 'Password changed successfully!', type: 'success' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ text: 'Failed to change password. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

 return (
    <div className="rounded-lg p-4 sm:p-6 transition-all duration-300 bg-gradient-to-br from-[#12121A] to-[#0A0A0F] border border-[rgba(138,43,226,0.1)] hover:border-[rgba(138,43,226,0.3)] hover:shadow-[0_5px_15px_rgba(138,43,226,0.2)]">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Change Password</h2>

      {message.text && (
        <div className={`mb-3 sm:mb-4 p-2 sm:p-3 rounded-md ${message.type === 'success' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Input fields */}
        {['currentPassword', 'newPassword', 'confirmPassword'].map(field => (
          <div key={field}>
            <label htmlFor={field} className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
              {field === 'currentPassword' ? 'Current Password' : 
               field === 'newPassword' ? 'New Password' : 'Confirm New Password'}
            </label>
            <input
              type="password"
              id={field}
              name={field}
              value={passwordData[field as keyof PasswordData]}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-md bg-[#1E1E2A] text-white border ${
                errors[field as keyof ErrorState] ? 'border-red-500' : 'border-[#3A3A4A]'
              } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-sm sm:text-base`}
            />
            {errors[field as keyof ErrorState] && (
              <p className="mt-1 text-xs sm:text-sm text-red-400">{errors[field as keyof ErrorState]}</p>
            )}
          </div>
        ))}

        <div className="pt-1 sm:pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md font-medium text-white transition-all duration-200 text-sm sm:text-base ${
              isSubmitting ? 'bg-purple-800 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg'
            }`}
          >
            {isSubmitting ? 'Changing Password...' : 'Change Password'}
          </button>
        </div>
      </form>

      <div className="mt-4 sm:mt-6 text-xs text-gray-400">
        <p>Password requirements:</p>
        <ul className="list-disc pl-4 sm:pl-5 mt-1 space-y-0.5 sm:space-y-1">
          <li>At least 8 characters long</li>
          <li>Should contain a mix of letters, numbers, and symbols</li>
          <li>Should be different from your previous passwords</li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordChange;
