import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from "../../services/api";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email: string })?.email;

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];
    paste.forEach((char, idx) => {
      if (idx < 6 && /^\d$/.test(char)) {
        newOtp[idx] = char;
      }
    });
    setOtp(newOtp);

    // Focus next empty
    const nextIndex = paste.findIndex((_, i) => i === paste.length - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Enter the full 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/verify-otp', { email, otp: fullOtp });

      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Navigate based on role
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'host') navigate('/host/dashboard');
      else navigate('/attendee/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-black via-black to-purple-900/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl shadow-purple-500/10 border border-gray-800/50 p-8 my-8">
        <div className="text-center mb-8">
          <span className="text-xl font-bold bg-white bg-clip-text text-transparent">VirtuLink</span>
          <p className="text-gray-400 mt-2">Enter the 6-digit OTP sent to your email</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
            inputsRef.current[index] = el;  // Correct ref assignment
          }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onPaste={handlePaste}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 text-center text-xl font-semibold bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all duration-200"
              />
            ))}
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {loading && <p className="text-purple-300 text-sm text-center">Verifying...</p>}

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            Verify & Continue
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Didn't receive the code?{' '}
          <button
            onClick={() => alert('Resend OTP logic here')}
            className="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
