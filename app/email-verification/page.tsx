"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Mail, Shield, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function EmailVerificationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateUserProfile } = useAuth();
  const phone = searchParams?.get("phone") || "";
  const firstName = searchParams?.get("firstName") || "";
  const lastName = searchParams?.get("lastName") || "";
  const email = searchParams?.get("email") || "";

  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);

  const handleVerify = async () => {
    if (!verificationCode) {
      alert("Please enter the verification code");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to verify email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user profile to mark email as verified
      updateUserProfile({
        emailVerified: true
      });
      
      // Navigate to complete profile step 2
      router.push(`/complete-profile-step-2?phone=${phone}&firstName=${firstName}&lastName=${lastName}&email=${email}`);
    } catch (error) {
      console.error('Email verification failed:', error);
      alert('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendDisabled(true);
    
    // Simulate resending verification code
    console.log(`Resending verification code to ${email}`);
    
    // Re-enable resend button after 30 seconds
    setTimeout(() => {
      setResendDisabled(false);
    }, 30000);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="max-w-4xl w-full flex rounded-2xl overflow-hidden shadow-xl">
          {/* Left Side - White */}
          <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
            <div className="mb-8">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Email Verification!</h1>
              <p className="text-gray-600">Enter the code sent to {email}</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
              
              <button
                onClick={handleVerify}
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Verify Email'}
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <p className="text-gray-600">
                  Didn't receive the code?{" "}
                  <button
                    onClick={handleResendCode}
                    disabled={resendDisabled}
                    className={`font-medium ${
                      resendDisabled 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-orange-600 hover:underline'
                    }`}
                  >
                    Resend Code
                  </button>
                  {resendDisabled && (
                    <span className="text-gray-500 ml-2">(30s)</span>
                  )}
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Side - Orange BG with Image */}
          <div className="w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 flex flex-col items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Welcome to TASPRO Company</h2>
              <p className="text-orange-100 max-w-md">
                Join thousands of satisfied customers who trust us for their home service needs.
              </p>
            </div>
            <div className="relative z-10 mt-8">
              <img 
                src="/heroimage.jpg" 
                alt="Professional technician" 
                className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-xl"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerificationPageContent />
    </Suspense>
  );
}