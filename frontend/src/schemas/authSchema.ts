import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().min(1, { message: "Please enter your email" }).email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one digit")
        .regex(
            /[^a-zA-Z0-9]/,
            "Password must contain at least one special character"
        ),
})

export const registerSchema = z
    .object({
        email: z.string().min(1, { message: "Please enter your email" }).email({ message: "Invalid email address" }),
        name: z
            .string()
            .min(3, "Name must be at least 3 characters long")
            .max(20, "Name must be at most 20 characters long")
            .regex(/^[A-Za-z]+(?: [A-Za-z]+)?$/, "Name must contain only alphabets and a single space between words"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")

            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[0-9]/, "Password must contain at least one digit")
            .regex(
                /[^a-zA-Z0-9]/,
                "Password must contain at least one special character"
            ),
    })
    .strict();

export const OtpSchema = z.object({
    otp: z.string()
        .regex(/^\d{6}$/, { message: "OTP must be exactly 6 digits." }),
})

export const forgetPasswordSchema = z.object({
    email: z.string().min(1, { message: "Please enter your email" }).email({ message: "Invalid email address" }),
})

export const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one digit")
        .regex(
            /[^a-zA-Z0-9]/,
            "Password must contain at least one special character"
        ),
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
})

export const profileSchema = z.object({
    name: z.string().min(1, "First name is required").max(50, "First name cannot exceed 50 characters").optional(),
    lastName: z.string().min(1, "Last name is required").max(50, "Last name cannot exceed 50 characters").optional(),
    bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
});