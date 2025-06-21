
export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="mb-6 text-center">
        <h2 className="text-3xl text-gray-900 font-medium">Check your email</h2>
        <p className="text-slate-600">
          We've sent a verification link to your email address. Please click the
          link to verify your account.
        </p>
      </div>
      <div className="text-center text-gray-600">
        <p>
          Didn't receive the email? Check your spam folder or contact support.
        </p>
      </div>
    </div>
  );
}
