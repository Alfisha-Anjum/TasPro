"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname, useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Search,
  MapPin,
  User,
  ChevronDown,
  Phone,
  Mic,
  CircleUserRound,
  Bell,
  Heart,
  House,
  ClipboardList,
  Wrench,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const { user, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [currentCity, setCurrentCity] = useState("Raipur");
  const pathname = usePathname();
  const searchParams = useSearchParams();
 const [activeTab, setActiveTab] = useState<string | null>(null);

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  useEffect(() => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    setActiveTab(params.get("tab"));
  }
}, []);

  const fetchStates = async () => {
  try {
    const res = await axios.get(
      "https://app.tasprocompany.in/api/states",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    setStates(res.data?.data || []);
  } catch (error) {
    console.log(error);
  }
};
const fetchCities = async (stateId: number) => {
  const res = await axios.get("https://app.tasprocompany.in/api/cities", {
    params: {
      state_id: stateId,
    },
  });

  setCities(res.data?.data || []);
};

  const getProfileImage = (img?: string | null) => {
    if (!img) return "/profile.png";

    if (img.startsWith("http") || img.startsWith("/")) {
      return img;
    }

    return `https://taskpro.itmingo.com/storage/customers/${img}`;
  };
  console.log("USER:", user);
useEffect(() => {
  const savedLocation = localStorage.getItem("selected_location");

  if (savedLocation) {
    const location = JSON.parse(savedLocation);
    setCurrentCity(location.city);
  }
}, []);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await axios.get("https://app.tasprocompany.in/api/customers/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      // ✅ Clear everything no matter what
      localStorage.removeItem("token");
      localStorage.removeItem("customer_id");

      // If you stored user object
      localStorage.removeItem("user");

      // ✅ Clear context (VERY IMPORTANT)
      // login(null); // or logout() if you have it

      // ✅ Redirect
      window.location.href = "/login";
    }
  };
const handleCitySelect = (city: any) => {
  const locationData = {
    city: city.name,
    city_id: city.id,
    state: selectedState.name,
    state_id: selectedState.id,
  };

  localStorage.setItem("selected_location", JSON.stringify(locationData));

  setCurrentCity(city.name);

  window.dispatchEvent(
    new CustomEvent("location-changed", {
      detail: locationData,
    }),
  );

  setShowLocationModal(false);
  setSelectedState(null);
};



  return (
    <header className="sticky top-0 z-20 bg-[#fafafa] border-b border-gray-200">
      <div className="w-full xl:w-[90%] mx-auto px-4 sm:px-5">
        {/* MOBILE HEADER */}
        <div className="md:hidden py-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Hey! {user?.firstName || "User"}
              </h2>

              <div
                onClick={() => {
                  setShowLocationModal(true);
                  fetchStates();
                }}
                className="flex items-center gap-1 mt-1 text-sm cursor-pointer"
              >
                <MapPin className="w-5 h-5 text-orange-500 fill-orange-500" />
                <span className="text-gray-700">{currentCity}</span>
                <span className="text-gray-400">,</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div className="flex items-center gap-5">
              <Link href="/wishlist">
                <Heart className="w-5 h-5 sm:w-8 sm:h-8 text-black" />
              </Link>

              <Link href="/notifications" className="relative">
                <Bell className="w-5 h-5 sm:w-8 sm:h-8 text-black fill-black" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  15
                </span>
              </Link>
            </div>
          </div>
          <div className="mt-2 border border-orange-500 rounded-xl px-4 py-2 flex items-center gap-3 bg-white">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder='Search for "AC Repair"'
              className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400"
            />
          </div>
          {/* MOBILE BOTTOM NAV */}
          <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50 md:hidden">
            <div className="grid grid-cols-4 h-16">
              <Link
                href="/"
                className={`flex flex-col items-center justify-center ${
                  pathname === "/" ? "text-orange-500" : "text-gray-500"
                }`}
              >
                <House className="w-5 h-5" />
                <span className="text-[11px] mt-1 font-medium">Home</span>
              </Link>

              <Link
                href="/my-booking?tab=amc"
                className={`flex flex-col items-center justify-center ${
                  pathname?.startsWith("/my-booking") && activeTab === "amc"
                    ? "text-orange-500"
                    : "text-gray-500"
                }`}
              >
                <Wrench className="w-5 h-5" />
                <span className="text-[11px] mt-1 font-medium">
                  AMC Services
                </span>
              </Link>

              <Link
                href="/my-booking?tab=home"
                className={`flex flex-col items-center justify-center ${
                  pathname?.startsWith("/my-booking") && activeTab !== "amc"
                    ? "text-orange-500"
                    : "text-gray-500"
                }`}
              >
                <ClipboardList className="w-5 h-5" />
                <span className="text-[11px] mt-1 font-medium">Booking</span>
              </Link>

              <Link
                href="/account"
                className={`flex flex-col items-center justify-center ${
                  pathname === "/account" ? "text-orange-500" : "text-gray-500"
                }`}
              >
                <UserRound className="w-5 h-5" />
                <span className="text-[11px] mt-1 font-medium">Account</span>
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP HEADER */}
        <div className="hidden md:flex items-center justify-between h-20 gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 w-40">
            <Link href="/">
              <img src="/tas.logo.png" alt="TAS Company" />
            </Link>
          </div>

          {/* Location + Search */}
          <div className="flex justify-between items-center lg:px-0 px-3 border rounded-full overflow-hidden bg-gray-50 w-full md:max-w-sm lg:max-w-xl">
            <div
              onClick={() => {
                console.log("Location clicked");
                setShowLocationModal(true);
                fetchStates();
              }}
              className="flex items-center gap-2 px-4 py-2 md:border-r text-sm cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="text-gray-700 truncate max-w-[90px]">
                {currentCity}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            <div className="hidden lg:flex items-center flex-1 px-4">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder='Search for "AC Repair"...'
                className="flex-1 bg-transparent outline-none text-xs px-2"
              />
              <Mic className="w-4 h-4 text-gray-600 cursor-pointer" />
            </div>
          </div>

          <div className="xl:flex items-center gap-2 hidden">
            <Phone className="w-4 h-4 text-orange-500" />
            <span className="text-gray-700 font-medium">7447-0000-45</span>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/wishlist">
              <Heart className="w-6 h-6 text-black" />
            </Link>

            <Link href="/notifications" className="relative">
              <Bell className="w-6 h-6 text-black" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                15
              </span>
            </Link>
          </div>

          {/* Login */}
          {!isClient ? null : user ? (
            <div className="relative group flex items-center gap-2 cursor-pointer">
              {/* Avatar */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 bg-gray-200">
                <img
                  src={getProfileImage(user?.profileImage)}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Name (desktop only) */}
              <span className="hidden lg:text-base text-[10px] md:inline text-gray-700 font-medium">
                {user.firstName || "Login"}
              </span>

              <ChevronDown className="w-4 h-4 text-gray-500" />

              {/* Dropdown */}
              <div className="absolute right-0 top-10 w-52 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
                <div className="px-4 py-3 border-b">
                  <p className="font-medium text-gray-900">
                    {user.firstName && user.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user.firstName || "User"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {user.email || user.phone}
                  </p>
                </div>

                <Link
                  href="/my-booking"
                  className="block px-4 py-2 text-sm hover:bg-orange-50"
                >
                  My Booking
                </Link>

                <Link
                  href="/schedule"
                  className="block px-4 py-2 text-sm hover:bg-orange-50"
                >
                  My Schedule
                </Link>

                <Link
                  href="/account"
                  className="block px-4 py-2 text-sm hover:bg-orange-50"
                >
                  Account
                </Link>

                <hr className="my-2" />

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-orange-50"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 sm:gap-2 cursor-pointer"
            >
              <div className="bg-gray-200 p-1.5 sm:p-2 rounded-full">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <span className="hidden sm:inline text-gray-700">Login</span>
            </Link>
          )}
        </div>
      </div>
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-end">
          <div className="bg-white w-full rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-xl font-semibold">
                {selectedState ? "Select City" : "Select State"}
              </h2>

              <button
                onClick={() => {
                  setShowLocationModal(false);
                  setSelectedState(null);
                }}
              >
                ✕
              </button>
            </div>

            {!selectedState
              ? states.map((state) => (
                  <div
                    key={state.id}
                    onClick={() => {
                      setSelectedState(state);
                      fetchCities(state.id);
                    }}
                    className="p-5 border-b cursor-pointer hover:bg-gray-50"
                  >
                    {state.name}
                  </div>
                ))
              : cities.map((city) => (
                  <div
                    key={city.id}
                    onClick={() => handleCitySelect(city)}
                    className="p-5 border-b cursor-pointer hover:bg-gray-50"
                  >
                    {city.name}
                  </div>
                ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
