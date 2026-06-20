"use client";
// import AccountLayout from "@/components/account/AccountLayout";

// export default function AccountPage() {
//   return <AccountLayout />;
// }
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import SettingsList from "@/components/account/SettingsList";
import ProfileCard from "@/components/account/ProfileCard";
import GradientButton from "@/components/ui/GradientButton";
import EditProfile from "@/components/account/EditProfile";
import ReferEarn from "@/components/account/ReferEarn";
import LanguageSelectorPage from "@/components/account/LanguageSelectorModal";
import MyWallet from "@/components/account/MyWallet";
import MyReviews from "@/components/account/MyReviews";
import MyCoupon from "@/components/account/MyCoupon";
import Payment from "@/components/account/Payment";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { House, Wrench, ClipboardList, UserRound } from "lucide-react";
export default function AccountContent() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState("default");
  const [profile, setProfile] = useState<any>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    setActiveView("default");
  }, [searchParams]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://app.tasprocompany.in/api/customers/profile",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.status) {
        setProfile(res.data.data);
      }
    } catch (error) {
      console.log("Profile fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case "editProfile":
        return (
          <EditProfile
            setActiveView={setActiveView}
            profile={profile}
            fetchProfile={fetchProfile}
          />
        );
      case "refer":
        return <ReferEarn setActiveView={setActiveView} />;
      case "language":
        return <LanguageSelectorPage setActiveView={setActiveView} />;
      case "wallet":
        return <MyWallet setActiveView={setActiveView} />;
      case "reviews":
        return <MyReviews setActiveView={setActiveView} />;
      case "coupon":
        return <MyCoupon setActiveView={setActiveView} />;
      case "payment":
        return <Payment setActiveView={setActiveView} />;
      default:
        return <SettingsList setActiveView={setActiveView} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please Login to View Account
          </h2>
          <a
            href="/login"
            className="text-orange-600 font-medium hover:underline"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

return (
  <div className="w-full bg-white dark:bg-gray-900 pb-24">
    {/* Content */}
    <div className="flex flex-col-reverse lg:flex-row">
      <div className="w-full lg:flex-1">{renderContent()}</div>

      {activeView === "default" && (
        <div className="w-full lg:w-[390px] px-10">
          <ProfileCard profile={profile} />
        </div>
      )}
    </div>

    {/* Logout Button */}
    {activeView === "default" && (
      <div className="md:mt-10 flex justify-start lg:ml-12">
        <GradientButton
          text="Logout"
          width="w-full max-w-[390px]"
          textClassName="text-[20px] font-medium"
        />
      </div>
    )}

    {/* Mobile Bottom Navigation */}
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50 md:hidden">
      <div className="grid grid-cols-4 h-16">
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <House className="w-5 h-5" />
          <span className="text-[11px] mt-1 font-medium">Home</span>
        </Link>

        <Link
          href="/my-booking?tab=amc"
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <Wrench className="w-5 h-5" />
          <span className="text-[11px] mt-1 font-medium">AMC Services</span>
        </Link>

        <Link
          href="/my-booking?tab=home"
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <ClipboardList className="w-5 h-5" />
          <span className="text-[11px] mt-1 font-medium">Booking</span>
        </Link>

        <Link
          href="/account"
          className="flex flex-col items-center justify-center text-orange-500"
        >
          <UserRound className="w-5 h-5" />
          <span className="text-[11px] mt-1 font-medium">Account</span>
        </Link>
      </div>
    </div>
  </div>
);
}

