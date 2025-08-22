import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-red-600 hover:bg-red-700',
            footerActionLink: 'text-red-600 hover:text-red-700'
          }
        }}
      />
    </div>
  );
}