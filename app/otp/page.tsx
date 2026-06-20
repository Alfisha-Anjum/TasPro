"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Clock, Shield } from "lucide-react";
import OTPVerification from "@/components/OTPVerification";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
function OTPVerificationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const phone = searchParams?.get("phone") || "";
  const isSignUp = searchParams?.get("signup") === "true";

  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (otp: string) => {
    setIsLoading(true);

    try {
      const res = await axios.post(
        "https://app.tasprocompany.in/api/customers/verify-otp",
        {
          country_id: 1, // or dynamic if needed
          mobile: phone,
          otp: Number(otp),
        },
      );

     if (res.data.status) {
       const token = res.data.token;
       const user = res.data.data;

       localStorage.setItem("token", token);
       localStorage.setItem("customer_id", String(user.id));

       // ✅ profile already completed
       if (user?.first_name && user.first_name.trim() !== "") {
         login({
           phone: user.mobile,
           firstName: user.first_name,
           email: user.email,
           alternateNumber: user.alt_mobile,
           gender: user.gender,
           profileImage: user.profile,
           profileCompleted: true,
           contactVerified: true,
         });

         router.push("/");
         return;
       }

       // ❌ profile not completed
       router.push(`/complete-profile-step-1?phone=${user.mobile}`);
     } else {
       alert(res.data.message || "OTP verification failed");
     }
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    // Simulate resending OTP
    console.log(`Resending OTP to ${phone}`);
    // In a real app, you would call an API to resend OTP
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl w-full flex flex-col md:flex-row rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-xl">
          {/* Left Side - White */}
          <div className="w-full md:w-1/2 bg-white p-5 sm:p-6 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                OTP Verification!
              </h1>
              <p className="text-gray-600">Enter the code sent to {phone}</p>
            </div>

            <div className="space-y-6">
              <OTPVerification
                phoneNumber={phone}
                onVerify={handleVerify}
                onResend={handleResend}
                onBack={handleBack}
              />
            </div>
          </div>

          {/* Right Side - Orange BG with Image */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 flex-col items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Welcome to TASPRO Company
              </h2>
              <p className="text-orange-100 max-w-xs sm:max-w-md">
                Join thousands of satisfied customers who trust us for their
                home service needs.
              </p>
            </div>
            <div className="relative z-10 mt-8">
              <img
                src="/heroimage.jpg"
                alt="Professional technician"
                className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 object-cover rounded-full border-4 border-white shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OTPVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPVerificationPageContent />
    </Suspense>
  );
}
