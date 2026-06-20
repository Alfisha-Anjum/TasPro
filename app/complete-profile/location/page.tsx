"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, User, ArrowRight } from "lucide-react";

const CompleteProfileLocationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteProfileLocationPageContent />
    </Suspense>
  );
};

function CompleteProfileLocationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams?.get("phone") || "";
  const firstName = searchParams?.get("firstName") || "";
  const lastName = searchParams?.get("lastName") || "";
  const email = searchParams?.get("email") || "";

  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    // Redirect to new profile step 2 page
    router.push(`/complete-profile-step-2?phone=${phone}&firstName=${firstName}&lastName=${lastName}&email=${email}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="max-w-4xl w-full flex rounded-2xl overflow-hidden shadow-xl">
          {/* Left Side - White */}
          <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Update Required</h1>
              <p className="text-gray-600">Please complete your profile using the new form</p>
            </div>
            
            <div className="space-y-6">
              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Gender *</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Male', 'Female', 'Other'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setGender(option)}
                      className={`py-3 px-4 rounded-lg border transition-colors ${
                        gender === option
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 hover:border-orange-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Location Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your city or locality"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
              
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Go to New Form
                <ArrowRight className="w-5 h-5" />
              </button>
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

export default CompleteProfileLocationPage;