
"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  Calendar,
  Package,
  User,
  ChevronRight,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Star,
  IndianRupee,
  Filter,
  Search,
  Info,
  X,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Pencil } from "lucide-react";
// import SelectAddressModal from "@/components/SelectAddressModal";
import BookingDetailsModal from "@/components/BookingDetailsModal";
import RescheduleModal from "@/components/RescheduleModal";
import CancelBookingModal from "@/components/CancelBookingModal";
import BookingCancelledModal from "@/components/BookingCancelledModal";
import BookingSuccessModal from "@/components/BookingSuccessModal";
import BookingCard from "@/components/BookingCard";
import Header from "@/components/Header";
// import { Footer } from "react-day-picker";
import Footer from "@/components/Footer";
import SplitACModal from "@/components/SplitACModal";
import ChatBotPanel from "@/components/ChatBotPanel";
import { SelectAddressModal } from "@/components/booking-flow/SelectAddressModal";
import AddNewAddressModal from "@/components/AddNewAddressModal";
import { SelectDateTimeModal } from "@/components/booking-flow/SelectDateTimeModal";
import Breadcrumb from "@/components/account/Breadcrumb";
import { AccountSidebar } from "@/components/account";
import Link from "next/link";
import LayoutContainer from "@/components/LayoutContainer";
import router from "next/dist/shared/lib/router/router";
// import { AddNewAddressModal } from "@/components/booking-flow/AddNewAddressModal";

const MySchedulePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const refresh = searchParams?.get("refresh");
  const [activeTab, setActiveTab] = useState<
    "pending" | "rejected" | "completed"
  >("pending");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSplitModal, setShowSplitModal] = useState(false);

  const [showChatBot, setShowChatBot] = useState(false);
  const [selectedChatBooking, setSelectedChatBooking] = useState<any>(null);
  // const [showCancelledSuccess, setShowCancelledSuccess] = useState(false);
  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCancelledSuccess, setShowCancelledSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showBookingDetailsPage, setShowBookingDetailsPage] = useState(false);
  const [showSelectAddressModal, setShowSelectAddressModal] = useState(false);
  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);
  const [showOffers, setShowOffers] = useState(false);

  const successBookingCancel = () => {
    setShowCancelledSuccess(true);
  };

  const handleRescheduleContinue = (
    date: string,
    time: string,
    notes: string,
  ) => {
    setSelectedBooking((prev: any) => ({
      ...prev,
      date,
      time,
      notes,
    }));

    setShowRescheduleModal(false); // close modal after continue
  };

 useEffect(() => {
   setShowBookingDetailsPage(false);
   setShowChatBot(false);
   setSelectedBooking(null);
 }, []);

  const handleOpenChat = (booking: any) => {
    setSelectedChatBooking(booking);
    setShowChatBot(true);
    setShowBookingDetailsPage(false);
    // setShowAMCDetailsPage(false);
  };
  // Define TypeScript interfaces
  interface Schedule {
    id: string;
    service: string;
    type: string;
    status: "Pending" | "Completed" | "Running" | "Rejected";
    date: string;
    time: string;
    rating: number;
    reviews?: number;
    serviceImage?: string;
    address?: string;
    technician?: string;
    itemTotal?: number;
    discount?: number;
    taxes?: number;
  }

  // Mock booking data
  const schedules = [
    {
      id: "BK-001",
      service: "AC Repair Service",
      type: "Less / No Cooling",
      status: "Pending",
      date: "15 Feb 2024",
      time: "10:00 AM - 12:00 PM",
      rating: 4.8,
      reviews: 3287,
      serviceImage: "/ac.png",
      address: "123 Main Street, Raipur",
      technician: "Raj Kumar",
      itemTotal: 1299,
      discount: 100,
      taxes: 49,
    },
    {
      id: "BK-002",
      service: "Plumbing Service",
      type: "Pipe Leakage Repair",
      status: "Pending",
      date: "18 Feb 2024",
      time: "2:00 PM - 4:00 PM",
      rating: 4.9,
      reviews: 3287,
      serviceImage: "/service-plumbing.jpg",
      address: "456 Park Avenue, Raipur",
      technician: "Amit Sharma",
      itemTotal: 899,
      discount: 100,
      taxes: 49,
    },
    {
      id: "BK-003",
      service: "Electrician Service",
      type: "Wiring & Switch Repair",
      status: "Pending",
      date: "10 Feb 2024",
      time: "11:00 AM - 1:00 PM",
      rating: 4.8,
      reviews: 3287,
      serviceImage: "/service-electrician.jpg",
      address: "789 Oak Street, Raipur",
      technician: "Technician unavailable",
      itemTotal: 1599,
      discount: 100,
      taxes: 49,
    },
    {
      id: "BK-004",
      service: "Home Cleaning",
      type: "Full Home Deep Cleaning",
      status: "Completed",
      date: "01 Feb 2024",
      time: "9:00 AM - 11:00 AM",
      rating: 5,
      reviews: 3287,
      serviceImage: "/service-cleaning.jpg",
      address: "321 Elm Road, Raipur",
      technician: "Cleaning Expert",
      itemTotal: 2499,
      discount: 100,
      taxes: 49,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        {/* Mobile */}
        <div className="block sm:hidden w-full">{children}</div>

        {/* sm and above */}
        <div className="hidden sm:block">
          <LayoutContainer>{children}</LayoutContainer>
        </div>
      </>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please Login to View Bookings
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
    <div className="min-h-screen dark:bg-gray-900">
      <ResponsiveContainer>
        {/* <Header /> */}
        <div className="max-w-7xl mx-auto md:px-4 lg:px-8 py-3">
          {/* <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-500 cursor-pointer">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
      
        
          |<span className="text-orange-500 font-medium">Profile</span>
        </div> */}
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "My Schedule" }]}
          />
          <div className="flex flex-col md:flex-row gap-5 md:gap-10 w-full mx-auto">
            {/* Sidebar */}
            {/* <div
            className={`${sidebarOpen ? "block" : "hidden"} md:block md:w-64`}
          >
            <div className="bg-white rounded-xl shadow-xl p-6">
              <nav className="space-y-2">
                <a
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </a>
                <a
                  href="/schedule"
                  className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  <span>My Schedule</span>
                </a>
                <a
                  href="/my-booking"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700  rounded-lg font-medium"
                >
                  <Package className="w-5 h-5" />
                  <span>Bookings</span>
                </a>
                <a
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>Account</span>
                </a>
              </nav>
            </div>
          </div> */}
            <AccountSidebar />
            <div className="w-full flex justify-between items-center md:hidden">
              {/* Back */}
              <button
                onClick={() => router.back()}
                className="text-black dark:text-white font-medium flex items-center gap-2 hover:text-orange-500 transition"
              >
                <ArrowLeft size={20} />
                My Schedule
              </button>
            </div>

            {!showBookingDetailsPage && (
              <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl gap-6">
                {schedules.map((schedule) => (
                  <BookingCard
                    key={schedule.id}
                    service={schedule.service}
                    subtitle={`Booking ID: ${schedule.id} | ₹${schedule.itemTotal}`}
                    rating={schedule.rating}
                    reviews={schedule.reviews || 0}
                    date={schedule.date}
                    time={schedule.time}
                    status={
                      schedule.status as "Pending" | "Completed" | "Cancelled"
                    }
                    // onChat={() => handleOpenChat(schedule)}
                    onViewDetails={() => {
                      setSelectedBooking(schedule);
                      setShowBookingDetailsPage(true);
                    }}
                    // onReschedule={() => {
                    //   setSelectedBooking(schedule);
                    //   setShowRescheduleModal(true);
                    // }}
                  />
                ))}
              </div>
            )}

            {/* Main Content */}

            {showBookingDetailsPage && selectedBooking && (
              <div className="bg-[#f6f7f9] min-h-screen mx-auto w-[90%] rounded-2xl">
                {/* Back */}
                {/* <button
                onClick={() => setShowBookingDetailsPage(false)}
                className="mb-4 text-orange-600 font-medium"
              >
                ← Back
              </button> */}

                <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-6 lg:gap-10">
                  {/* LEFT SECTION */}
                  <div className="w-full lg:w-[75%] space-y-6">
                    {/* SERVICE CARD */}
                    <div className="bg-white flex flex-col w-full justify-between border shadow-sm rounded-xl p-3 md:p-5">
                      <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-3">
                        <div className="flex gap-4 w-full">
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={selectedBooking.serviceImage}
                              alt={selectedBooking.service}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/service-ac.jpg";
                              }}
                            />
                          </div>

                          <div className="flex flex-col sm:items-end items-start w-full sm:w-auto mt-2 sm:mt-0">
                            <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                              {selectedBooking.service}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {selectedBooking.type}
                            </p>

                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                              <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                              <span>{selectedBooking.rating}</span>
                              <span className="text-gray-400 whitespace-nowrap">
                                | {selectedBooking.reviews} reviews
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-md font-medium">
                            {selectedBooking.status}
                          </span>
                        </div>
                      </div>

                      <div className="py-2">
                        <div className="border-t border-gray-100 my-4"></div>

                        <div className="flex justify-between text-[clamp(11px,1vw,13px)] text-gray-600">
                          <span className="text-gray-400 whitespace-nowrap">
                            Date & Time
                          </span>
                          <span className="font-medium text-gray-800 text-right whitespace-nowrap">
                            {selectedBooking.date} | {selectedBooking.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* COUPONS */}
                    <div
                      onClick={() => setShowOffers(!showOffers)}
                      className="bg-white rounded-xl p-5 shadow-sm border flex justify-between items-center cursor-pointer"
                    >
                      <span className="text-gray-600 font-medium">
                        Coupons & Offers
                      </span>

                      <span className="text-sm text-orange-500">
                        {showOffers ? "▲" : "▼"}
                      </span>
                    </div>

                    {/* Offers List */}
                    {showOffers && (
                      <div className="bg-white border rounded-xl p-4 shadow-sm space-y-3">
                        <div className="border rounded-lg p-3">
                          <p className="font-semibold text-sm">SAVE20</p>
                          <p className="text-xs text-gray-500">
                            Get 20% off on first order
                          </p>
                        </div>

                        <div className="border rounded-lg p-3">
                          <p className="font-semibold text-sm">FREESHIP</p>
                          <p className="text-xs text-gray-500">
                            Free delivery on orders above ₹999
                          </p>
                        </div>

                        <div className="border rounded-lg p-3">
                          <p className="font-semibold text-sm">WELCOME10</p>
                          <p className="text-xs text-gray-500">
                            Extra ₹100 off for new users
                          </p>
                        </div>
                      </div>
                    )}

                    {/* CUSTOMER DETAILS */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border relative">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold">Customer Details</h3>

                        <button
                          onClick={() => setShowSelectAddressModal(true)}
                          className="text-orange-500 hover:text-orange-600 transition"
                        >
                          <Pencil className="w-4 h-4 fill-orange-500 stroke-orange-500" />
                        </button>
                      </div>

                      <p className="font-medium">
                        {selectedBooking.customerName || "Tikesh Dewangan"}
                      </p>

                      <p className="text-sm text-gray-600 leading-6 mt-2">
                        {selectedBooking.address}
                      </p>

                      <p className="text-sm text-gray-600 mt-3">
                        C.N. :{" "}
                        {selectedBooking.customerPhone || "+91 9876543210"}
                      </p>

                      {/* <div className="mt-4 flex gap-3">
                        <input
                          placeholder="Apply Coupon"
                          className="bg-white border rounded-lg px-3 py-2 w-full"
                        />
                        <button className="bg-orange-500 text-white px-4 rounded-lg">
                          Apply
                        </button>
                      </div> */}
                    </div>
                    {/* SERVICE PROVIDER */}

                    {/* ADVANCE SUMMARY */}

                    {/* SUPPORT */}
                    <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col  cursor-pointer hover:shadow-md transition-all">
                      <p>Contact Support</p>
                      <div className="flex justify-between items-center gap-3">
                        {/* Icon */}
                        <div className="flex items-center gap-2 py-2">
                          <div className="w-9 h-9 bg-orange-50 rounded-full flex items-center justify-center">
                            <span className="text-orange-500 text-sm">🏠</span>
                          </div>

                          {/* Text */}
                          <span className="text-gray-800 font-medium">
                            Help Center
                          </span>
                        </div>

                        <span className="text-orange-500 text-lg">›</span>
                      </div>

                      {/* Arrow */}
                    </div>

                    {/* WORK STATUS */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border">
                      <h3 className="font-semibold mb-3">Work Status</h3>

                      <ul className="space-y-3 text-sm">
                        <li className="text-green-600">✔ Order Confirmed</li>
                        <li className="text-gray-400">○ Shipped</li>
                        <li className="text-gray-400">○ Out for Delivery</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => setShowRescheduleModal(true)}
                      className="w-full mt-5 border bg-orange-500 text-white py-2 rounded-full"
                    >
                      Reschedule
                    </button>
                  </div>

                  {/* RIGHT SECTION */}
                  <div className="shadow-sm h-fit w-full lg:w-[25%] lg:sticky lg:top-24 order-2 lg:order-none">
                    <h3 className="font-semibold mb-4 dark:text-white">
                      Payment Summary
                    </h3>

                    <div className="space-y-3 bg-white  p-5 rounded-xl text-sm border shadow-sm">
                      <div className="flex justify-between border-b pb-3">
                        <span>Item Total</span>
                        <span>₹{selectedBooking.amount}</span>
                      </div>

                      <div className="flex justify-between border-b pb-3 text-gray-500">
                        <span>Item Discount</span>
                        <span>-₹200</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Taxes and Fees</span>
                        <span>₹49</span>
                      </div>

                      <div className="flex justify-between font-bold border-t pt-2">
                        <span>Total</span>
                        <span>₹548</span>
                      </div>
                    </div>

                    {/* BUTTONS */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <SelectDateTimeModal
          isOpen={showRescheduleModal}
          onClose={() => setShowRescheduleModal(false)}
          onContinue={handleRescheduleContinue}
          showLocation={true}
          location={selectedBooking?.address}
        />

        {showSelectAddressModal && (
          <SelectAddressModal
            isOpen={showSelectAddressModal}
            onClose={() => setShowSelectAddressModal(false)}
            onContinue={(address) => {
              // setSelectedAddress(address);
              setShowSelectAddressModal(false);
              // setShowTCModal(true);
            }}
            onAddNew={() => {
              setShowSelectAddressModal(false); // close current
              setShowAddNewAddressModal(true); // open new one
            }}
            addresses={[]}
          />
        )}

        <AddNewAddressModal
          isOpen={showAddNewAddressModal}
          onClose={() => setShowAddNewAddressModal(false)}
          onSave={(newAddress) => {
            console.log(newAddress);

            // optional: save selected address
            // setShoSelectedAddress(newAddress);

            // close add address modal
            setShowAddNewAddressModal(false);

            // ✅ directly open Terms & Conditions
            // setShowTCModal(true);
          }}
        />

        {showCancelModal && selectedBooking && (
          <CancelBookingModal
            booking={selectedBooking}
            onClose={() => setShowCancelModal(false)}
            onConfirm={(data) => {
              console.log("Cancel data:", data);

              setShowCancelModal(false);
              successBookingCancel();
            }}
          />
        )}

        {showCancelledSuccess && (
          <BookingCancelledModal
            // booking={selectedBooking}
            onClose={() => {
              setShowCancelledSuccess(false);
              setShowBookingDetailsPage(false);
            }}
          />
        )}

        <SplitACModal
          isOpen={showSplitModal}
          onClose={() => setShowSplitModal(false)}
        />
        {/* Modals */}

        {/* MODAL 1: Equipment Details */}

        {/* MODAL 2: Raise Complaint */}

        {/* <Footer /> */}
      </ResponsiveContainer>
    </div>
  );
};

export default MySchedulePage;
