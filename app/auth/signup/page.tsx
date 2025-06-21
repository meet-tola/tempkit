import type { Metadata } from "next";
import Image from "next/image";
import { SignUpForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-1 px-4 from-blue-50 via-white to-purple-50">
      <div className="flex flex-col justify-center items-center mb-6 text-center">
        <div className="mb-4">
          <Image 
            src="/tem.png" 
            alt="Logo" 
            width={100} 
            height={100} 
            priority 
          />
        </div>  
        <h2 className="text-3xl text-gray-900 font-medium">
          Create an account
        </h2>
        <p className="text-slate-600">
          Join thousands of creatives streamlining their workflow
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
