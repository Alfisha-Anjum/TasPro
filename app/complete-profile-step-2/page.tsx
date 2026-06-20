"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, User, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const CompleteProfileStep2 = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteProfileStep2Content />
    </Suspense>
  );
};

function CompleteProfileStep2Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateUserProfile } = useAuth();
  const phone = searchParams?.get("phone") || "";
  const firstName = searchParams?.get("firstName") || "";
  const lastName = searchParams?.get("lastName") || "";
  const email = searchParams?.get("email") || "";

  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    if (!gender.trim()) {
      newErrors.gender = "Gender is required";
    }

    if (!location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateFields()) {
      // Update user profile with gender and location
      const profileData = {
        gender,
        location,
        profileCompleted: true,
        emailVerified: true, // Mark email as verified after completing full profile
      };

      // Update user profile in context
      updateUserProfile(profileData);

      // Profile completion complete - redirect to home
      router.push("/");
    }
  };

  return (
    <div className="lg:min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="max-w-4xl w-full flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-xl">
          {/* Left Side - White */}
          <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                Complete your Profile!
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Additional details to personalize your experience
              </p>
            </div>

            <div className="space-y-6">
              {/* Gender Selection */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
                  Gender *
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {["Male", "Female", "Other"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setGender(option)}
                      className={`py-3 px-4 rounded-lg border transition-colors ${
                        gender === option
                          ? "border-orange-500 bg-orange-50 text-orange-700"
                          : "border-gray-300 hover:border-orange-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                )}
              </div>

              {/* Location Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your city or locality"
                    className={`bg-white w-full pl-10 pr-4 py-3 border ${errors.location ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                )}
              </div>

              <button
                onClick={handleContinue}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Continue to Home
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side - Orange BG with Image */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 flex-col items-center justify-center p-12 relative overflow-hidden">
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
}

export default CompleteProfileStep2;
