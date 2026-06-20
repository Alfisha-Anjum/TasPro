"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, ArrowRight } from "lucide-react";

const SignupPage = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const handleSendOTP = () => {
    // Validate phone number
    if (phone.length === 10) {
      // Navigate to OTP verification page with signup flag
      router.push(`/otp?phone=${phone}&signup=true`);
    } else {
      alert("Please enter a valid 10-digit phone number");
    }
  };

  return (
    <div className="md:min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="max-w-4xl w-full flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-xl">
          {/* Left Side - White */}
          <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                Create Your Account
              </h1>
              <p className="text-gray-600">
                Join us today to enjoy our services
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              <button
                onClick={handleSendOTP}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Send OTP
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-orange-600 font-medium hover:underline"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Orange BG with Image */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 flex flex-col items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Welcome to TASPRO Company
              </h2>
              <p className="text-orange-100 max-w-md">
                Join thousands of satisfied customers who trust us for their
                home service needs.
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

export default SignupPage;
