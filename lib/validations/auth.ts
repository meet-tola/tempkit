import { z } from "zod"

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export const onboardingSchema = z.object({
  role: z.string().min(1, "Please select your role"),
  roleOther: z.string().optional(),
  documentTypes: z.array(z.string()).min(1, "Please select at least one document type"),
})

export const userUpdateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.string().min(1, "Role is required"),
  roleOther: z.string().optional(),
  documentTypes: z.array(z.string()).min(1, "Please select at least one document type"),
})

export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
export type OnboardingInput = z.infer<typeof onboardingSchema>
export type UserUpdateInput = z.infer<typeof userUpdateSchema>
