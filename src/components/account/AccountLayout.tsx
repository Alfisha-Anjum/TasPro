"use client";

import React, { useState } from "react";
// import { AccountSidebar } from "./AccountSidebar";

import Footer from "../Footer";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import PremiumAddressModal from "./PremiumAddressModal";
import PremiumAddressListModal from "./PremiumAddressListModal";
import {
  Check,
  Plus,
  Trash2,
  ChevronRight,
  Camera,
  Coins,
  X,
  Copy,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  Share2,
  ChevronDown,
  Navigation,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Header from "../Header";
import AccountSidebar from "./AccountSidebar";

type Address = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  label: string;
  isDefault: boolean;
};

export const AccountLayout: React.FC<{ initial?: string }> = ({
  initial = "main",
}) => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<string>(
    initial === "address" ? "address" : "main",
  );
  const [dark, setDark] = useState(false);
  const [notification, setNotification] = useState(true);

  // Edit Profile state
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [gender, setGender] = useState("I am male");

  // Language state
  const [language, setLanguage] = useState({
    code: "US",
    name: "English",
    flag: "🇺🇸",
  });
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const languages = [
    { code: "US", name: "English", flag: "🇺🇸" },
    { code: "CN", name: "中国人", flag: "🇨🇳" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
    { code: "DE", name: "Deutsch", flag: "🇩🇪" },
    { code: "SA", name: "عربي", flag: "🇸🇦" },
    { code: "RU", name: "Русский", flag: "🇷🇺" },
    { code: "IT", name: "Italiano", flag: "🇮🇹" },
    { code: "PK", name: "اردو", flag: "🇵🇰" },
  ];

  // Refer flow
  const [referModalOpen, setReferModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [coins, setCoins] = useState(1200);

  // Address flow
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "123 Main Street, Sector 15",
      city: "Raipur",
      state: "Chhattisgarh",
      pincode: "492001",
      label: "Home",
      isDefault: true,
    },
  ]);
  const [addressListOpen, setAddressListOpen] = useState(true);
  const [addAddressOpen, setAddAddressOpen] = useState(false);

  // Bank flow
  const [banks, setBanks] = useState<any[]>([]);
  const [removeConfirm, setRemoveConfirm] = useState<{
    open: boolean;
    id?: string;
  }>({ open: false });

  const handleAddAddress = (addr: Address) => {
    setAddresses((s) => [addr, ...s]);
    setAddAddressOpen(false);
  };

  const handleRemoveBank = (id?: string) => {
    if (!id) return;
    setBanks((b) => b.filter((x) => x.id !== id));
    setRemoveConfirm({ open: false });
  };

  const handleLogout = () => {
    logout();
    toast({ title: "Logged out successfully" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* <Header /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span
            className="hover:text-orange-500 cursor-pointer"
            onClick={() => setStep("main")}
          >
            Home
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-orange-500 font-medium">Profile</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <AccountSidebar />
          </div>

          <div className="flex-1">
            {/* Main Card */}
            {step === "main" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[12px] shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                  <div className="grid gap-3">
                    <button
                      onClick={() => setStep("edit")}
                      className="w-full text-left px-4 py-3 rounded-[12px] border border-gray-100 hover:shadow"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setStep("address")}
                      className="w-full text-left px-4 py-3 rounded-[12px] border border-gray-100 hover:shadow"
                    >
                      Saved Address
                    </button>
                    <button
                      onClick={() => setStep("wallet")}
                      className="w-full text-left px-4 py-3 rounded-[12px] border border-gray-100 hover:shadow"
                    >
                      My Wallet
                    </button>
                    <button
                      onClick={() => setStep("language")}
                      className="w-full text-left px-4 py-3 rounded-[12px] border border-gray-100 hover:shadow"
                    >
                      Change Language
                    </button>
                    <div className="flex items-center justify-between px-4 py-3 rounded-[12px] border border-gray-100">
                      <span>Notification Setting (Toggle)</span>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notification}
                          onChange={() => setNotification((v) => !v)}
                          className="sr-only"
                        />
                        <span
                          className={`w-11 h-6 flex items-center bg-gray-200 rounded-full p-1 ${notification ? "bg-orange-400" : ""}`}
                        ></span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 rounded-[12px] border border-gray-100">
                      <span>Dark Mode (Toggle)</span>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={dark}
                          onChange={() => setDark((v) => !v)}
                          className="sr-only"
                        />
                        <span
                          className={`w-11 h-6 flex items-center bg-gray-200 rounded-full p-1 ${dark ? "bg-orange-400" : ""}`}
                        ></span>
                      </label>
                    </div>

                    <button
                      onClick={() => setStep("activity")}
                      className="w-full text-left px-4 py-3 rounded-[12px] border border-gray-100 hover:shadow"
                    >
                      My Activity
                    </button>
                    <button
                      onClick={() => setStep("rating")}
                      className="w-full text-left px-4 py-3 rounded-[12px] border border-gray-100 hover:shadow"
                    >
                      My Rating & Reviews
                    </button>
                    <button
                      onClick={() => setStep("coupon")}
                      className="w-full text-left px-4 py-3 rounded-[12px] border border-gray-100 hover:shadow"
                    >
                      My Coupon
                    </button>
                    <button
                      onClick={() => setStep("refer")}
                      className="w-full text-left px-4 py-3 rounded-[12px] border border-gray-100 hover:shadow"
                    >
                      Refer & Earn
                    </button>
                    <button
                      onClick={() => setStep("bank")}
                      className="w-full text-left px-4 py-3 rounded-[12px] border border-gray-100 hover:shadow"
                    >
                      Bank Account
                    </button>

                    <div className="pt-4">
                      <button
                        onClick={handleLogout}
                        className="w-full h-11 rounded-[12px] border border-orange-400 text-orange-600"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[12px] shadow-sm p-6 md:p-8">
                  {/* Header: Home | Profile */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <span
                      className="hover:text-orange-500 cursor-pointer"
                      onClick={() => setStep("main")}
                    >
                      Home
                    </span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-orange-500 font-medium">Profile</span>
                  </div>

                  {/* User Info Section */}
                  <div className="border-b border-gray-100 pb-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">David</h2>
                  </div>

                  <div className="space-y-6">
                    {/* User details */}
                    <div>
                      <div className="text-lg font-semibold text-gray-800">
                        Daniyal Austin
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        danialaustin007@gmail.com
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => setStep("bookings")}
                        className="px-6 py-2.5 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors shadow-sm"
                      >
                        My Bookings
                      </button>
                      <button
                        onClick={() => setStep("help")}
                        className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      >
                        Help Center
                      </button>
                    </div>

                    {/* Optional: additional info from image? The image only shows these */}
                  </div>
                </div>
              </div>
            )}

            {/* Edit Profile */}
            {step === "edit" && (
              <div className="w-full max-w-[480px] mx-auto">
                <div className="bg-white rounded-[16px] shadow-sm p-10">
                  {/* Profile Image */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="w-[110px] h-[110px] rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-sm">
                        <img
                          src="https://github.com/shadcn.png"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button className="absolute bottom-1 right-1 bg-white rounded-full p-2 shadow-md border border-gray-100 hover:bg-gray-50 transition-colors">
                        <Camera className="w-4 h-4 text-orange-500" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* First Name */}
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={first}
                        onChange={(e) => setFirst(e.target.value)}
                        className="w-full border-b border-gray-200 focus:border-[#FF6A00] outline-none py-2 text-black text-base transition-colors placeholder-gray-300"
                        placeholder="Enter first name"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={last}
                        onChange={(e) => setLast(e.target.value)}
                        className="w-full border-b border-gray-200 focus:border-[#FF6A00] outline-none py-2 text-black text-base transition-colors placeholder-gray-300"
                        placeholder="Enter last name"
                      />
                    </div>

                    {/* Gender */}
                    <div className="space-y-3">
                      <label className="text-xs text-gray-500 font-medium">
                        Select Gender
                      </label>
                      <div className="flex flex-col gap-3">
                        {["I am male", "I am female", "Rather not to say"].map(
                          (label) => (
                            <label
                              key={label}
                              className="flex items-center gap-3 cursor-pointer group"
                            >
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${gender === label ? "border-[#FF6A00]" : "border-gray-300 group-hover:border-gray-400"}`}
                              >
                                {gender === label && (
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF6A00]" />
                                )}
                              </div>
                              <input
                                type="radio"
                                name="gender"
                                className="hidden"
                                checked={gender === label}
                                onChange={() => setGender(label)}
                              />
                              <span
                                className={`text-sm ${gender === label ? "text-black" : "text-gray-600"}`}
                              >
                                {label}
                              </span>
                            </label>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue="+91 98765 43210"
                        className="w-full border-b border-gray-200 focus:border-[#FF6A00] outline-none py-2 text-black text-base transition-colors"
                      />
                    </div>

                    {/* Save Button */}
                    <div className="mt-8">
                      <button
                        className="w-full h-12 rounded-full text-white font-semibold text-base shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all transform active:scale-[0.99]"
                        style={{
                          background:
                            "linear-gradient(90deg, #FF6A00 0%, #FF8E53 100%)",
                        }}
                        onClick={() => setStep("main")}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Address */}
            {step === "address" && (
              <div className="bg-white rounded-[12px] shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Saved Addresses</h2>
                  <button
                    onClick={() => setAddressListOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg"
                  >
                    <Plus className="w-4 h-4" /> Manage Addresses
                  </button>
                </div>

                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`p-4 rounded-[12px] border ${address.isDefault ? "border-orange-500" : "border-gray-200"}`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                              <Check className="w-4 h-4 text-orange-600" />
                            </div>
                            <div className="font-medium">{address.name}</div>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {address.label}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mt-2">
                            <div>{address.address}</div>
                            <div>
                              {address.city}, {address.state} -{" "}
                              {address.pincode}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          {!address.isDefault && (
                            <button
                              onClick={() =>
                                setAddresses(
                                  addresses.map((a) => ({
                                    ...a,
                                    isDefault: a.id === address.id,
                                  })),
                                )
                              }
                              className="text-orange-600"
                            >
                              Set as Default
                            </button>
                          )}
                          <button className="text-blue-600">Edit</button>
                          <button
                            onClick={() =>
                              setAddresses(
                                addresses.filter((a) => a.id !== address.id),
                              )
                            }
                            className="text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Language Section */}
            {step === "language" && (
              <div className="bg-white rounded-[16px] shadow-sm p-8 min-h-[400px]">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-xl font-bold">Change Language</h2>
                  <button
                    onClick={() => setStep("main")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="max-w-[390px] mx-auto relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Language
                  </label>

                  {/* Dropdown Trigger */}
                  <button
                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                    className="w-full h-[56px] px-4 rounded-[12px] border border-[#FF7A00] flex items-center justify-between bg-white transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[20px] leading-none">
                        {language.flag}
                      </span>
                      <span className="font-medium text-[#333333]">
                        {language.name}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#666666] transition-transform duration-300 ${langDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {langDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setLangDropdownOpen(false)}
                      />
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.12)] py-3 z-20 animate-in fade-in zoom-in-95 duration-200">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang);
                              setLangDropdownOpen(false);
                            }}
                            className="w-[calc(100%-16px)] mx-2 h-[44px] px-4 flex items-center gap-3 hover:bg-[#F5F5F5] rounded-[8px] transition-colors"
                          >
                            <span className="text-[20px] leading-none">
                              {lang.flag}
                            </span>
                            <span className="text-sm text-[#444] font-medium">
                              {lang.name}
                            </span>
                            {language.code === lang.code && (
                              <Check className="w-4 h-4 text-[#FF7A00] ml-auto" />
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Refer Section */}
            {step === "refer" && (
              <div className="bg-white rounded-[16px] shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold">Refer & Earn</h2>
                  <button
                    onClick={() => setStep("main")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-col xl:flex-row gap-[60px]">
                  {/* Left Side - Terms */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-6">
                      Terms & Conditions
                    </h3>
                    <ol className="list-decimal pl-5 space-y-4 text-[#4B5563] text-[14px] leading-[1.8]">
                      <li>
                        Refer a friend and earn coins when they complete their
                        first service.
                      </li>
                      <li>
                        Coins can be redeemed for discounts on future services.
                      </li>
                      <li>
                        Minimum service value for referral eligibility is ₹500.
                      </li>
                      <li>
                        Referral bonus is credited within 24 hours of service
                        completion.
                      </li>
                      <li>
                        Coins are valid for 1 year from the date of credit.
                      </li>
                      <li>You can refer up to 50 friends per year.</li>
                      <li>
                        Self-referrals are not allowed and will lead to account
                        suspension.
                      </li>
                      <li>
                        TAS Pro reserves the right to modify or end the referral
                        program.
                      </li>
                      <li>
                        Coins cannot be transferred to other accounts or
                        exchanged for cash.
                      </li>
                      <li>
                        Referral code must be applied at the time of booking.
                      </li>
                      <li>
                        Cancelled bookings do not qualify for referral rewards.
                      </li>
                      <li>
                        In case of disputes, TAS Pro decision will be final.
                      </li>
                    </ol>
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col items-center gap-10 min-w-[350px] lg:min-w-[390px]">
                    {/* Premium Card */}
                    <div className="bg-[#0B0F2F] rounded-[24px] p-8 w-full text-center shadow-lg">
                      <h3 className="text-[#FF8A00] font-medium mb-6">
                        Refer a Friend & Earn Coins
                      </h3>

                      <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FFA63D] flex items-center justify-center mb-3 shadow-lg shadow-orange-500/30">
                          <Coins className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-white text-[32px] font-bold leading-tight">
                          {coins}
                        </div>
                        <div className="text-[#A0A3BD] text-sm">Your Coins</div>
                      </div>

                      <button
                        onClick={() => setRedeemOpen(true)}
                        className="w-full max-w-[200px] h-10 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FFA63D] text-white font-medium shadow-[0_4px_14px_rgba(255,106,0,0.4)] hover:scale-105 transition-transform duration-200"
                      >
                        Redeem
                      </button>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex flex-col items-center w-full">
                      <div className="w-full max-w-[280px] aspect-video relative mb-6 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src="/refer-illustration.png"
                          alt="Referral Illustration"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement!.innerHTML =
                              '<div class="text-gray-300 text-sm">Illustration</div>';
                          }}
                        />
                      </div>

                      <button
                        onClick={() => setReferModalOpen(true)}
                        className="w-[260px] h-12 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FFA63D] text-white font-bold shadow-[0_4px_20px_rgba(255,106,0,0.3)] hover:shadow-[0_6px_25px_rgba(255,106,0,0.4)] transition-all transform hover:-translate-y-0.5"
                      >
                        Refer a Friend
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bank */}
            {step === "bank" && (
              <div className="bg-white rounded-[12px] shadow-sm p-6 max-w-2xl">
                <h2 className="text-xl font-bold mb-4">Bank Accounts</h2>
                <div className="space-y-3">
                  {banks.length === 0 && (
                    <div className="text-gray-500">No bank accounts added.</div>
                  )}
                  {banks.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 border rounded-[12px] flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium">{b.bankName}</div>
                        <div className="text-sm text-gray-500">
                          {b.accountNumber}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setRemoveConfirm({ open: true, id: b.id })
                          }
                          className="text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  <div>
                    <h3 className="text-sm font-medium mb-2">Add Bank</h3>
                    <div className="grid gap-2 md:grid-cols-2">
                      <Input placeholder="Bank Name" />
                      <Input placeholder="Account Type" />
                      <Input placeholder="IFSC" />
                      <Input placeholder="Account Number" />
                      <Input placeholder="Re-enter Account Number" />
                      <div>
                        <Button
                          onClick={() =>
                            setBanks([
                              ...banks,
                              {
                                id: Date.now().toString(),
                                bankName: "Demo Bank",
                                accountNumber: "XXXXXX",
                              },
                            ])
                          }
                        >
                          Activate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address List Modal */}
      <PremiumAddressListModal
        isOpen={addressListOpen}
        onClose={() => setAddressListOpen(false)}
        onAddressSelect={(address) => {
          console.log("Selected address:", address);
          setAddressListOpen(false);
        }}
        onAddNewAddress={() => {
          setAddressListOpen(false);
          setAddAddressOpen(true);
        }}
        currentAddresses={addresses}
      />

      {/* Add Address Modal */}
      <PremiumAddressModal
        isOpen={addAddressOpen}
        onClose={() => setAddAddressOpen(false)}
        onSave={handleAddAddress}
      />

      {/* Main Refer Modal */}
      {referModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setReferModalOpen(false)}
          />
          <div className="relative bg-white rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setReferModalOpen(false)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors shadow-sm z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-[#0B0F2F] rounded-[20px] p-10 flex flex-col items-center text-center relative overflow-hidden">
              {/* Background Glow Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-500/20 blur-[50px] rounded-full pointer-events-none" />

              <h3 className="text-xl font-bold mb-8 bg-gradient-to-r from-[#FF7A00] to-[#FFA500] bg-clip-text text-transparent relative z-10">
                Refer a Friend & Earn Coins
              </h3>

              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FFA500] flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30 relative z-10 animate-bounce duration-&lsqb;3000ms&rsqb;">
                <Coins className="w-12 h-12 text-white" />
              </div>

              <div className="text-white text-[48px] font-bold leading-none mb-2 relative z-10">
                {coins}
              </div>
              <div className="text-gray-400 text-sm font-medium mb-8 relative z-10">
                Your Coins
              </div>

              <button
                onClick={() => {
                  setReferModalOpen(false);
                  setRedeemOpen(true);
                }}
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFA500] text-white font-bold shadow-[0_0_20px_rgba(255,122,0,0.4)] hover:shadow-[0_0_30px_rgba(255,122,0,0.6)] hover:scale-105 transition-all duration-300 relative z-10"
              >
                Redeem
              </button>

              <button
                onClick={() => {
                  setReferModalOpen(false);
                  setShareModalOpen(true);
                }}
                className="mt-4 text-white/80 hover:text-white font-medium text-sm transition-colors relative z-10 flex items-center gap-2"
              >
                Refer a Friend <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Redeem Modal */}
      {redeemOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setRedeemOpen(false)}
          />
          <div className="relative bg-white rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-sm p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Redeem Coins</h3>
              <button
                onClick={() => setRedeemOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-gray-600">
                <span>Total Coins</span>
                <span className="font-medium text-gray-900">{coins}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>14 Coin</span>
                <span className="font-medium text-gray-900">₹1</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Service Fee</span>
                <span className="font-medium text-gray-900">₹00</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between items-center font-bold text-lg">
                <span className="text-gray-900">Total</span>
                <span className="text-[#FF7A00]">
                  ₹{Math.floor(coins / 14)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setRedeemOpen(false);
                setSuccessOpen(true);
              }}
              className="w-full h-12 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFA500] text-white font-bold shadow-[0_4px_15px_rgba(255,122,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,122,0,0.4)] hover:scale-[1.02] transition-all duration-300"
            >
              Redeem Coins
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShareModalOpen(false)}
          />
          <div className="relative bg-white rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-sm p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Share</h3>
              <button
                onClick={() => setShareModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-3 mb-8">
              <span className="flex-1 text-sm text-gray-600 truncate font-medium">
                https://taspro.in/ref/john123
              </span>
              <button className="text-orange-500 hover:text-orange-600 p-1">
                <Copy className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                    <img
                      src={`https://i.pravatar.cc/150?u=${i + 10}`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">
                    User {i}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center px-2">
              <button className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-[#1DA1F2]/10 flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-[#E4405F]/10 flex items-center justify-center text-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Success"
      >
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold">Successfully Redeem Coins</h3>
          <p className="text-sm text-gray-600 mt-2">
            Your coins were successfully redeemed.
          </p>
          <div className="mt-4">
            <Button onClick={() => setSuccessOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>

      {/* Remove bank confirm */}
      <Modal
        open={removeConfirm.open}
        onClose={() => setRemoveConfirm({ open: false })}
        title="Confirm Remove"
      >
        <div className="space-y-4">
          <p>Are you sure you want to remove this bank?</p>
          <div className="flex gap-2">
            <button
              onClick={() => setRemoveConfirm({ open: false })}
              className="h-11 rounded-[12px] px-4 border w-full"
            >
              Cancel
            </button>
            <Button onClick={() => handleRemoveBank(removeConfirm.id)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      {/* <Footer /> */}
    </div>
  );
};

export default AccountLayout;
