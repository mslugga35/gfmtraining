import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join GFMTF</h1>
          <p className="text-gray-400">Create your account to start training</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-red-600 hover:bg-red-700 text-sm normal-case",
                card: "shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
                formFieldInput: "border-gray-300 focus:border-red-500 focus:ring-red-500",
                footerActionLink: "text-red-600 hover:text-red-700"
              }
            }}
            redirectUrl="/dashboard"
            signInUrl="/sign-in"
          />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-red-400 hover:text-red-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-red-400 hover:text-red-300">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}