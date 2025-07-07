import { axiosInstance } from "../config/axios";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { env } from "../config/env"
import { IUser } from "../types/index";

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData extends LoginData {
    name: string;
    username?: string;
}

interface OtpData {
    email: string;
    otp: string;
}

interface forgetPasswordData {
    email: string
}

interface UpdateProfileData {
    firstName?: string;
    lastName?: string;
    bio?: string;
}

export const AuthService = {
    login: async (data: LoginData) => {
        try {
            const response = await axiosInstance.post("/auth/login", data, { withCredentials: true });
            return { data: response.data, error: null };
        } catch (error: unknown) {
            const err = error as AxiosError<{ error: string }>;
            const errorMessage = err.response?.data?.error || "Login failed. Please try again.";
            toast.error(errorMessage);
            return { data: null, error: errorMessage };
        }
    },

    register: async (data: RegisterData) => {
        try {
            const response = await axiosInstance.post("/auth/register", data, { withCredentials: true });
            return { data: response.data, error: null };
        } catch (error: unknown) {
            const err = error as AxiosError<{ error: string }>;
            const errorMessage = err.response?.data?.error || "Registration failed. Please try again.";
            toast.error(errorMessage)
            return { data: null, error: errorMessage };
        }
    },

    googleAuthLogin: async (id_token: string): Promise<{
        data: {
            user: Partial<IUser>;
            message: string;
            token: string;
        } | null, error: string | null
    }> => {
        try {
            const response = await axiosInstance.post<{
                user: Partial<IUser>;
                message: string;
                token: string;
            }>("/auth/google-auth", { id_token }, { withCredentials: true });
            return { data: response.data, error: null };
        } catch (error: unknown) {
            const err = error as AxiosError<{ error: string }>;
            const errorMessage = err.response?.data?.error || "Google authentication failed. Please try again.";
            return { data: null, error: errorMessage };
        }
    },

    otpVerificationService: async (data: OtpData) => {
        try {
            const response = await axiosInstance.post<{ message: string, user: IUser, token: string }>("/auth/otp", data);
            return { data: response.data, error: null };
        } catch (error: unknown) {
            const err = error as AxiosError<{ error: string }>;
            const errorMessage = err.response?.data?.error || "OTP validation failed. Please try again.";
            toast.error(errorMessage)
            return { data: null, error: errorMessage };
        }
    },
    forgetPasswordService: async (data: forgetPasswordData): Promise<{
        data: {
            status: number;
            message: string
        } | null, error: string | null
    }> => {
        try {
            const response = await axiosInstance.post<{
                status: number;
                message: string
            }>("/auth/forgot-password", data);
            return { data: response.data, error: null };
        } catch (error: unknown) {
            const err = error as AxiosError<{ error: string }>;
            const errorMessage = err.response?.data?.error || "ForgetPassword Service failed. Please try again.";
            return { data: null, error: errorMessage };
        }
    },

    fetchUser: async () => {
        try {
            const response = await axiosInstance.get("/auth/me");
            return { data: response.data, error: null };
        } catch (error) {
            return { data: null, error: (error as Error).message };
        }
    },

    logout: async () => {
        console.log("Logout called");
        try {
            await axiosInstance.post("/auth/logout", {},
                { withCredentials: true }
            );
            return { error: null };
        } catch (error) {
            console.log("Logout error: ", error);
            return { error: (error as Error).message };
        }
    },

    refreshToken: async () => {
        const baseURL = env.API_URL;
        try {
            const response = await axios.post(`${baseURL}/auth/refresh-token`, {}, {
                withCredentials: true
            });
            return { data: response.data, error: null };
        } catch (error) {
            return { data: null, error: (error as Error).message };
        }
    },
    resetPasswordService: async (data: { password: string, confirmPassword: string }, token: string) => {
        try {
            const response = await axiosInstance.post("/auth/reset-password", { ...data, token });
            return { data: response.data, error: null };
        } catch (error) {
            const err = error as AxiosError<{ error: string }>;
            const errorMessage = err.response?.data?.error || "Reset password failed. Please try again.";
            toast.error(errorMessage)
            return { data: null, error: errorMessage };
        }
    },
    updateUserProfile: async (id: string, data: UpdateProfileData) => {
        try {
            const response = await axiosInstance.put(`/auth/profile/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export const useAuthService = () => AuthService;
