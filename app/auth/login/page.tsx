import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-1 px-4 from-blue-50 via-white to-purple-50">
      <div className="flex flex-col justify-center items-center mb-6 text-center">
        <div className="mb-4">
          <Image src="/tem.png" alt="Logo" width={100} height={100} priority />
        </div>
        <h2 className="text-3xl text-gray-900 font-medium">Welcome Back</h2>
        <p className="text-slate-600">
          Join thousands of creatives streamlining their workflow
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
