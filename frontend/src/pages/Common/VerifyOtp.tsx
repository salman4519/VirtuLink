import {  useRef, useState } from 'react';
// import api from "../../services/api";
import { zodResolver } from "@hookform/resolvers/zod"
import useAuthStore from "../../store/authStore"
import { AuthService } from "../../services/auth.service"
import { toast } from "sonner"
// import { Loader2 } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { OtpSchema } from "../../schemas/authSchema"
import { z } from "zod"




const VerifyOtpPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation();
  const navigate = useNavigate()

      const form = useForm<z.infer<typeof OtpSchema>>({
        resolver: zodResolver(OtpSchema),
        defaultValues: {
            otp: "",
        },
    })
  const {setState} = useAuthStore()

   const onSubmit = async (data: z.infer<typeof OtpSchema>) => {
        setIsLoading(true)
        console.log('OTP submission data:', data);
        const email = location.state?.email as string
        console.log('Email for OTP:', email);

        try {
            const response = await AuthService.otpVerificationService({ otp: data.otp, email })
            
            if (response.data?.message) {
                setState({isLoading: false, isAuthenticated: false, user: response?.data?.user, accessToken: response?.data?.token})
                navigate('/auth')
            } else if (response.error) {
                toast.error(response.error);
            } 
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
                setError(error.message);
            } else {
                toast.error("An unexpected error occurred.");
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false)
        }
    }
  

  const [error, setError] = useState('');

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, onChange: (...event: any[]) => void) => {
    const { value } = e.target;
    if (!/^\d?$/.test(value)) return;

    const newOtpValue = form.getValues('otp').split('');
    newOtpValue[index] = value;
    onChange(newOtpValue.join(''));

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const paste = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = Array(6).fill('');
    paste.forEach((char, idx) => {
      if (idx < 6 && /^\d$/.test(char)) {
        newOtp[idx] = char;
      }
    });
    onChange(newOtp.join(''));

    const nextIndex = paste.findIndex((_, i) => i === paste.length - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number, onChange: (...event: any[]) => void) => {
    if (e.key === 'Backspace' && !form.getValues('otp')[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();

      const newOtpValue = form.getValues('otp').split('');
      newOtpValue[index - 1] = '';
      onChange(newOtpValue.join(''));
    }
  };

 


  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-black via-black to-purple-900/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl shadow-purple-500/10 border border-gray-800/50 p-8 my-8">
        <div className="text-center mb-8">
          <span className="text-xl font-bold bg-white bg-clip-text text-transparent">VirtuLink</span>
          <p className="text-gray-400 mt-2">Enter the 6-digit OTP sent to your email</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-between gap-2">
            <Controller
                name="otp"
                control={form.control}
                render={({ field: { onChange, value } }) => (
                    <>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputsRef.current[index] = el; }}
                                type="text"
                                maxLength={1}
                                value={value[index] || ''}
                                onChange={(e) => handleChange(e, index, onChange)}
                                onPaste={(e) => handlePaste(e, onChange)}
                                onKeyDown={(e) => handleKeyDown(e, index, onChange)}
                                className="w-12 h-14 text-center text-xl font-semibold bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all duration-200"
                            />
                        ))}
                    </>
                )}
            />
          </div>

          {form.formState.errors.otp && <p className="text-red-400 text-sm text-center">{form.formState.errors.otp.message}</p>}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {isLoading && <p className="text-purple-300 text-sm text-center">Verifying...</p>}

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
