"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import GradientButton2 from "@/components/ui/GradientButton2";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

export default function EditProfile({
  setActiveView,
  profile,
  fetchProfile,
}: {
  setActiveView: (view: string) => void;
  profile: any;
  fetchProfile: () => void;
}) {
  const getImageUrl = (img?: string) => {
    if (!img) return "/img/profileimg.png";

    if (img.startsWith("http") || img.startsWith("/")) {
      return img;
    }

    return `https://taskpro.itmingo.com/${img}`;
  };
  const [gender, setGender] = useState(profile?.gender || "Male");
  const { login } = useAuth();
  const [preview, setPreview] = useState(
    profile?.profile_url || "/img/profileimg.png",
  );
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const customerId = localStorage.getItem("customer_id");

      const form = e.currentTarget;
      const formData = new FormData();

      formData.append("customer_id", customerId || "");
      formData.append("first_name", String(form.firstName.value));
      formData.append("last_name", String(form.lastName.value));
      formData.append("mobile", String(form.phone.value));
      formData.append("gender", gender);

      if (profileFile) {
        formData.append("profile", profileFile);
      }

      const res = await axios.post(
        "https://app.tasprocompany.in/api/customers/update-profile",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.status) {
        await fetchProfile();

        const profileRes = await axios.get(
          "https://app.tasprocompany.in/api/customers/profile",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const updated = profileRes.data.data;

        login({
          phone: updated.mobile,
          firstName: updated.first_name,
          lastName: updated.last_name,
          email: updated.email,
          alternateNumber: updated.alt_mobile,
          gender: updated.gender,
          profileImage: updated.profile_url,
          profileCompleted: true,
          contactVerified: true,
        });

      await Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      setActiveView("default");
      } else {
       await Swal.fire({
         icon: "error",
         title: "Update Failed",
         text: res.data.message || "Profile update failed",
       });
      }
    } catch (error: any) {
      console.log("Update profile error:", error?.response?.data || error);

     await Swal.fire({
       icon: "error",
       title: "Oops!",
       text:
         error?.response?.data?.message ||
         error?.response?.data?.error ||
         "Something went wrong",
     });
    }
  };

  return (
    <div className="w-full max-w-[390px] md:ml-12 mx-auto md:mx-0 flex flex-col items-center md:items-start">
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="w-full flex justify-between items-center mb-6 md:hidden">
          <button
            type="button"
            onClick={() => setActiveView("default")}
            className="text-black dark:text-white font-medium flex items-center gap-2 hover:text-orange-500 transition"
          >
            <ArrowLeft size={20} />
            Edit Profile
          </button>

          <button
            type="submit"
            disabled={loading}
            className="font-semibold bg-gradient-to-r from-[#FEC12D] to-[#FF552C] bg-clip-text text-transparent"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="flex justify-center md:justify-start mb-10">
          <div className="relative">
            <Image
              src={preview}
              alt="profile"
              width={150}
              height={150}
              className="w-[150px] h-[150px] rounded-full object-cover overflow-hidden"
            />

            <label htmlFor="profileUpload">
              <div className="absolute bottom-1 right-1 bg-white w-7 h-7 flex items-center justify-center rounded-full cursor-pointer shadow">
                <Image
                  src="/icons/edit.png"
                  alt="edit"
                  width={16}
                  height={16}
                />
              </div>
            </label>

            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setProfileFile(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </div>
        </div>

        <div>
          <label className="text-[14px] md:text-[16px] font-semibold text-black dark:text-white">
            First Name
          </label>
          <input
            name="firstName"
            defaultValue={profile?.first_name || ""}
            className="w-full text-[14px] md:text-[16px] border-b border-orange-400 bg-white dark:bg-gray-100 outline-none p-2 text-black dark:text-gray-700 dark:rounded-lg"
          />
        </div>

        <div>
          <label className="text-[14px] md:text-[16px] font-semibold text-black dark:text-white">
            Last Name
          </label>
          <input
            name="lastName"
            defaultValue={profile?.last_name || ""}
            className="w-full text-[14px] md:text-[16px] border-b border-orange-400 bg-white dark:bg-gray-100 outline-none p-2 text-black dark:text-gray-700 dark:rounded-lg"
          />
        </div>

        <div>
          <p className="text-[14px] md:text-[16px] font-semibold mb-2 text-black dark:text-white">
            Select gender
          </p>

          <div className="flex flex-col gap-4">
            {["Male", "Female", "Other"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-3 text-[14px] md:text-[16px] cursor-pointer group"
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={() => setGender(g)}
                  className="hidden"
                />

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                    gender === g
                      ? "bg-gradient-to-r from-[#FEC12D] to-[#FF552C]"
                      : "border-2 border-gray-400 group-hover:border-orange-400"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-200 ${
                      gender === g ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>

                <span className="text-black dark:text-gray-200">
                  {g === "Male"
                    ? "I am male"
                    : g === "Female"
                      ? "I am female"
                      : "Rather not to say"}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[14px] md:text-[16px] font-semibold text-black dark:text-white">
            Phone Number
          </label>
          <input
            name="phone"
            defaultValue={profile?.mobile || ""}
            className="w-full text-[14px] md:text-[16px] border-b border-orange-400 bg-white dark:bg-gray-100 outline-none p-2 text-black dark:text-gray-700 mb-4 dark:rounded-lg"
          />
        </div>

        <div className="hidden md:block">
          <GradientButton2
            text={loading ? "Saving..." : "Save"}
            width="w-full"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
