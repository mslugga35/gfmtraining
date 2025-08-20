import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to access your GFMTF dashboard</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <SignIn 
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
            signUpUrl="/sign-up"
          />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Need help? Contact{" "}
            <a href="mailto:support@gfmtf.com" className="text-red-400 hover:text-red-300">
              support@gfmtf.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}