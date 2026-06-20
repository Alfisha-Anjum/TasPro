"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Camera, User, Mail, Phone, Check, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const CompleteProfileStep1 = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteProfileContent />
    </Suspense>
  );
};

function CompleteProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const phone = searchParams?.get("phone") || "";

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const firstNameRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setIsUploading(true);
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    }
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!gender.trim()) {
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerify = () => {
    if (validateFields()) {
      setIsVerified(true);
    }
  };

  
  const handleContinue = async () => {
    if (!validateFields()) return;

    if (!isVerified) {
      alert("Please verify your details first");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const customerId = localStorage.getItem("customer_id");

      if (!token) {
        alert("User not authenticated. Please login again.");
        router.push("/login");
        return;
      }

      const formData = new FormData();

      formData.append("first_name", firstName);
      formData.append("email", email);
      formData.append("mobile", phone);
      formData.append("alt_mobile", alternateNumber);
      formData.append("gender", gender);
      formData.append("customer_id", customerId || "");

      if (profileImage && profileImage.startsWith("data:")) {
        const res = await fetch(profileImage);
        const blob = await res.blob();
        formData.append("profile", blob, "profile.jpg");
      }

      const response = await axios.post(
        "https://app.tasprocompany.in/api/customers/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

    if (response.data?.status) {
      const updated = response.data.data || {};

      login({
        phone: updated.mobile || phone,
        firstName: updated.first_name || firstName,
        lastName: updated.last_name || "",
        email: updated.email || email,
        alternateNumber: updated.alt_mobile || alternateNumber,
        gender: updated.gender || gender,
        profileImage:
          updated.profile_url ||
          updated.profile ||
          profileImage ||
          "/profile.png",
        profileCompleted: true,
        contactVerified: true,
      });

      router.push("/");
    } else {
      const message = response.data?.message || "";

      if (
        message.toLowerCase().includes("mobile") ||
        message.toLowerCase().includes("already") ||
        message.toLowerCase().includes("exists")
      ) {
        login({
          phone,
          firstName,
          email,
          alternateNumber,
          gender,
          profileImage,
          profileCompleted: true,
          contactVerified: true,
        });

        router.push("/");
        return;
      }

      alert(message || "Profile update failed");
    }
    } catch (error: any) {
      console.error(error);

      const message = error?.response?.data?.message || "";

      if (
        message.toLowerCase().includes("mobile") ||
        message.toLowerCase().includes("already") ||
        message.toLowerCase().includes("exists")
      ) {
        login({
          phone,
          firstName,
          email,
          alternateNumber,
          gender,
          profileImage,
          profileCompleted: true,
          contactVerified: true,
        });

        router.push("/");
        return;
      }

      alert(message || "Something went wrong while updating profile");
    }
  };

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  return (
    <div className="lg:min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
        <div className="max-w-4xl w-full flex flex-col md:flex-row rounded-xl sm:rounded-2xl overflow-hidden md:shadow-xl bg-white">
          <div className="w-full md:w-1/2 bg-white p-4 sm:p-6 md:p-10 lg:p-12 flex flex-col justify-center">
            <div className="mb-5 sm:mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                Complete your Profile!
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Fill your details to continue
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gray-200 border-2 border-dashed flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                    )}
                  </div>

                  <label className="absolute bottom-0 right-0 bg-orange-500 p-1.5 sm:p-2 rounded-full cursor-pointer">
                    <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  {isUploading ? "Uploading..." : "Upload profile photo"}
                </p>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    ref={firstNameRef}
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className={`bg-white w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className={`bg-white w-full pl-10 pr-4 py-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type="text"
                    value={phone}
                    disabled
                    className="bg-white w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                  />
                  <Check className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <p className="text-[11px] sm:text-xs text-green-600 mt-1">
                  Contact number verified
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alternate Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type="text"
                    value={alternateNumber}
                    onChange={(e) => setAlternateNumber(e.target.value)}
                    placeholder="Enter alternate number"
                    className="bg-white w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

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
                      className={`py-2.5 sm:py-3 px-2 sm:px-4 text-sm sm:text-base rounded-lg border ${
                        gender === option
                          ? "border-orange-500 bg-orange-50 text-orange-700"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.gender && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500">
                    {errors.gender}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleVerify}
                  disabled={isVerified}
                  className={`flex-1 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-lg flex items-center justify-center gap-2 ${
                    isVerified
                      ? "bg-green-500 text-white"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  {isVerified ? (
                    <>
                      <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-green-500" />{" "}
                      Verified
                    </>
                  ) : (
                    "Verify"
                  )}
                </button>

                <button
                  onClick={handleContinue}
                  disabled={!isVerified}
                  className={`flex-1 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-lg flex items-center justify-center gap-2 ${
                    isVerified
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 flex-col items-center justify-center p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>

            <div className="relative z-10 text-center text-white">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Welcome to TASPRO Company
              </h2>
              <p className="text-sm lg:text-base text-orange-100 max-w-md">
                Join thousands of satisfied customers who trust us for their
                home service needs.
              </p>
            </div>

            <div className="relative z-10 mt-8">
              <img
                src="/heroimage.jpg"
                alt="Professional technician"
                className="w-44 h-44 lg:w-64 lg:h-64 object-cover rounded-full border-4 border-white shadow-xl"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CompleteProfileStep1;
