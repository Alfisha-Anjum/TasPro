"use client";

import { useState, useEffect, useRef } from "react";
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
  
  X,
  ArrowLeft,
  UserRound,
  ClipboardList,
  Wrench,
  House,
  PlusCircle,
 
} from "lucide-react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { CalendarClock } from "lucide-react";
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
import Link from "next/link";
import { AccountSidebar } from "@/components/account";
import Breadcrumb from "@/components/account/Breadcrumb";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  AssignmentTurnedIn,
  SupportAgent,
  PersonAdd,
  Verified,
} from "@mui/icons-material";

import {
  Info,
  Clock3,
  XCircle,
  Download,
} from "lucide-react";


const iconMap: Record<string, JSX.Element> = {
  "assignment-turned-in": <AssignmentTurnedIn fontSize="small" />,
  "support-agent": <SupportAgent fontSize="small" />,
  "person-add": <PersonAdd fontSize="small" />,
  verified: <Verified fontSize="small" />,
  "event-repeat": <CalendarClock fontSize="small" />,
};
// import { AddNewAddressModal } from "@/components/booking-flow/AddNewAddressModal";

const MyBookingContent = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
const [showMenu, setShowMenu] = useState(false);

  // const activeTabs = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<
    "pending" | "rejected" | "completed"
  >("pending");
  const bookingType = (searchParams?.get("tab") ?? "home") as "home" | "amc";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [trackingData, setTrackingData] = useState<any[]>([]);
  const [showTracking, setShowTracking] = useState(false);
  const [showAMCDetailsPage, setShowAMCDetailsPage] = useState(false);
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
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  // AMC Specific States
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [showAlternateModal, setShowAlternateModal] = useState(false);
  const [alternateNumber, setAlternateNumber] = useState("");
  const [savingAlternate, setSavingAlternate] = useState(false);
  const [showAMCDetailsModal, setShowAMCDetailsModal] = useState(false);
  const [selectedAMC, setSelectedAMC] = useState<any>(null);
  const [openSections, setOpenSections] = useState<string[]>([
    "billing",
    "schedule",
    "billingStatus",
  ]);

  const BASE_URL = "https://app.tasprocompany.in/api";

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const [showOffers, setShowOffers] = useState(false);

  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const trackingInfo = bookingDetails?.tracking_info;

  const [customerAddress, setCustomerAddress] = useState<any>(null);
const trackingSteps = bookingDetails?.tracking_info?.tracking_steps || [];
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  const currentStep =
    trackingInfo?.tracking_steps?.find(
      (step: any) => step.id === trackingInfo.current_status_id,
    ) || trackingInfo?.tracking_steps?.[0];

  // Progress badge
  const badgeText =
    currentStep?.status === "completed"
      ? "COMPLETED"
      : currentStep?.status === "in_progress"
        ? "IN PROGRESS"
        : currentStep?.status?.toUpperCase() || "PENDING";
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://app.tasprocompany.in/api/customers/customer-bookings?page=1",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      console.log("Bookings API:", response.data);

      if (response.data?.data?.data) {
        setBookings(response.data.data.data);
      }
    } catch (error) {
      console.error("Booking fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
   fetchBookings();
   fetchCustomerAddress();
 }, []);

   const fetchCustomerAddress = async () => {
    const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${BASE_URL}/customers/customer-addresses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.status && res.data.data.length > 0) {
      setCustomerAddress(res.data.data[0]);

      setAlternateNumber(
        res.data.data[0].alt_contact_number || ""
      );
    }
  } catch (error) {
    console.log(error);
  }
};


const handleSaveAlternateNumber = async () => {
  if (alternateNumber.length !== 10) {
    toast.error("Enter a valid mobile number");
    return;
  }

  if (!customerAddress) {
    toast.error("Customer address not found");
    return;
  }

  try {
    setSavingAlternate(true);
const token = localStorage.getItem("token");

 const payload = {
   full_name: customerAddress.full_name,
   contact_number: customerAddress.contact_number,
   alt_contact_number: alternateNumber,
   postal_code: customerAddress.postal_code,
   latitude: customerAddress.latitude,
   longitude: customerAddress.longitude,
   state_name: customerAddress.state.name,
   city_name: customerAddress.city.name.replace("Unknown Type: ", ""),
   house_number: customerAddress.house_number,
   street: customerAddress.street,
   type: customerAddress.type,
   is_active: customerAddress.is_active,
 };

 console.log("Payload:", payload);

 const response = await axios.put(
   `${BASE_URL}/customers/customer-addresses/${customerAddress.id}`,
   payload,
   {
     headers: {
       Authorization: `Bearer ${token}`,
       Accept: "application/json",
       "Content-Type": "application/json",
     },
   },
 );

 await fetchCustomerAddress();

console.log("Updated Address:", customerAddress);

 console.log("Response:", response.data);
    // Update local state
    setCustomerAddress((prev: any) => ({
      ...prev,
      alt_contact_number: alternateNumber,
    }));

    // Update booking UI
    setBookingDetails((prev: any) => ({
      ...prev,
      customer_details: {
        ...prev.customer_details,
        alt_mobile: alternateNumber,
      },
    }));

    toast.success("Alternate number updated");

    setShowAlternateModal(false);
  } catch (error: any) {
    console.log(error.response?.data);
    toast.error(error.response?.data?.message || "Unable to update");
  } finally {
    setSavingAlternate(false);
  }
};
  const cancelBooking = async (bookingId: number, data: any) => {
    const token = localStorage.getItem("token");

    const payload = {
      cancel_reason_id: Number(data.cancel_reason_id),
      cancel_reason: data.cancel_reason,
    };

    console.log("Sending payload:", payload);

    const res = await axios.put(
      `https://app.tasprocompany.in/api/customers/cancel-booking/${bookingId}/`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );

    return res.data;
  };

  // import axios from "axios";

  const rescheduleBooking = async ({
    booking_id,
    slot_id,
    date,
    customer_notes,
  }: {
    booking_id: number;
    slot_id: number;
    date: string;
    customer_notes: string;
  }) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "https://app.tasprocompany.in/api/customers/bookings-reschedule",
      {
        booking_id,
        slot_id,
        date,
        customer_notes,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  };

const handleReschedule = async (data: {
  slot_id: number;
  date: string;
  customer_notes: string;
}) => {
  if (!selectedBooking) return;

  try {
    const result = await rescheduleBooking({
      booking_id: selectedBooking.booking_id || selectedBooking.id,
      slot_id: data.slot_id,
      date: data.date,
      customer_notes: data.customer_notes,
    });

    if (result.status) {
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: result.message || "Booking rescheduled successfully.",
        confirmButtonColor: "#f97316",
      });

      setShowRescheduleModal(false);

      await fetchBookings();

      // if you have booking details api
      // await fetchBookingDetails(selectedBooking.id);
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: result.message || "Unable to reschedule booking.",
        confirmButtonColor: "#f97316",
      });
    }
  } catch (error: any) {
    console.log("API ERROR", error?.response?.data);

    if (
      error?.response?.status === 401 ||
      error?.response?.data?.message === "Unauthenticated."
    ) {
      localStorage.removeItem("token");

      await Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Please login again.",
        confirmButtonColor: "#f97316",
      });

      router.push("/login");
      return;
    }

    Swal.fire({
      icon: "error",
      title: "Oops!",
      text:
        error?.response?.data?.message ||
        "Something went wrong while rescheduling your booking.",
      confirmButtonColor: "#f97316",
    });
  }
};

  // import axios from "axios";
const handleTrackDetails = async (bookingId: number) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${BASE_URL}/customers/customer-bookings/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    console.log("Track Details:", res.data);

    // Save complete booking details
    setBookingDetails(res.data.data);

    // Or if you only want tracking steps
    setTrackingData(res.data.data?.tracking_info?.tracking_steps || []);

    setShowTracking(true);
  } catch (err: any) {
    console.log(err.response?.data || err.message);
  }
};

// const trackingSteps = bookingDetails?.tracking_info?.tracking_steps || [];

const currentIndex = trackingSteps.findIndex(
  (step: any) => step.status === "in_progress",
);

const timeline = trackingSteps.map((step: any, index: number) => ({
  ...step,
  completed: step.status === "completed",
  current: step.status === "in_progress",
  pending: step.status === "pending",
}));

  const [amcBookings, setAmcBookings] = useState([
    {
      id: "AMC-001",
      title: "AC Repair",
      subtitle: "AMC & Packages",
      planType: "Corporate",
      duration: "1 Month Plan",
      price: 200,
      originalPrice: 320,
      status: "Running",
      nextSchedule: "Tue, 12-March-2024",
      technicianImage: "/ac.png",
      equipment: [
        {
          sn: 1,
          make: "Samsung",
          serial: "SAM-001",
          model: "AR12",
          age: "2 Yrs",
          image: "/placeholder.jpg",
        },
        {
          sn: 2,
          make: "LG",
          serial: "LG-882",
          model: "LG-Split",
          age: "1 Yr",
          image: "/placeholder.jpg",
        },
      ],
      billing: {
        items: ["Split AC", "Window AC", "Cassette AC"],
        total: 520,
        paid: 200,
        balance: 320,
      },
      schedule: [
        { status: "Completed", date: "12-Feb-2024", details: "Service 1" },
        { status: "Upcoming", date: "12-Mar-2024", details: "Service 2" },
        { status: "Pending", date: "12-Apr-2024", details: "Service 3" },
      ],
    },
    {
      id: "AMC-002",
      title: "Plumbing AMC",
      subtitle: "AMC & Packages",
      planType: "Home",
      duration: "1 Year Plan",
      price: 1200,
      originalPrice: 1500,
      status: "Running",
      nextSchedule: "Fri, 15-March-2024",
      technicianImage: "/ac.png",
      equipment: [],
      billing: {
        items: ["Pipes", "Taps"],
        total: 1200,
        paid: 1200,
        balance: 0,
      },
      schedule: [],
    },
  ]);
  // const [showCancelledSuccess, setShowCancelledSuccess] = useState(false);

  const successBookingCancel = () => {
    setShowCancelledSuccess(true);
  };

  useEffect(() => {
    setShowBookingDetailsPage(false);
    setShowAMCDetailsPage(false);
    setShowChatBot(false);
    setSelectedBooking(null);
    setSelectedAMC(null);
  }, [searchParams]);
  const handleRescheduleContinue = async (
    date: string,
    time: string,
    notes: string,
  ) => {
    if (!selectedBooking) return;

    try {
      const token = localStorage.getItem("token");

      const slotMap: Record<string, number> = {
        "09:00 AM - 11:00 AM": 1,
        "11:00 AM - 01:00 PM": 2,
        "01:00 PM - 03:00 PM": 3,
        "03:00 PM - 05:00 PM": 4,
        "05:00 PM - 07:00 PM": 5,
      };

      const payload = {
        booking_id: selectedBooking.booking_id || selectedBooking.id,
        booking_detail_id:
          selectedBooking.booking_detail_id || selectedBooking.bookingDetailId,
        slot_id: slotMap[time] || 5,
        date,
        customer_notes: notes || "Need to reschedule due to personal reasons.",
      };

      const response = await axios.post(
        "https://app.tasprocompany.in/api/customers/bookings-reschedule",
        payload,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Reschedule success:", response.data);

      setSelectedBooking((prev: any) => ({
        ...prev,
        date,
        time,
        notes,
      }));

      setShowRescheduleModal(false);
      fetchBookings();
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error(
        "Reschedule booking failed:",
        error.response?.data || error.message,
      );
    }
  };

  const handleOpenChat = (booking: any) => {
    setSelectedChatBooking(booking);
    setShowChatBot(true);
    setShowBookingDetailsPage(false);
    setShowAMCDetailsPage(false);
  };
  // Define TypeScript interfaces
  interface BaseBooking {
    id: string;
    service: string;
    serviceImage: string;
    date: string;
    time: string;
    status: string;
    amount: number;
    address: string;
  }

  interface PendingBooking extends BaseBooking {
    technician: string;
    technicianRating: number;
  }

  interface RejectedBooking extends BaseBooking {
    reason: string;
  }

  interface CompletedBooking extends BaseBooking {
    rating?: number;
    review?: string;
  }

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((item) => item !== section)
        : [...prev, section],
    );
  };

  // Mock booking data
  // const bookings = {
  //   pending: [
  //     {
  //       id: "BK-001",
  //       service: "AC Repair Service",
  //       serviceImage: "/service-ac.jpg",
  //       date: "15 Feb 2024",
  //       time: "10:00 AM - 12:00 PM",
  //       status: "Pending",
  //       amount: 1299,
  //       address: "123 Main Street, Raipur",
  //       technician: "Raj Kumar",
  //       technicianRating: 4.8,
  //     } as PendingBooking,
  //     {
  //       id: "BK-002",
  //       service: "Plumbing Service",
  //       serviceImage: "/service-plumbing.jpg",
  //       date: "18 Feb 2024",
  //       time: "2:00 PM - 4:00 PM",
  //       status: "Pending",
  //       amount: 899,
  //       address: "456 Park Avenue, Raipur",
  //       technician: "Amit Sharma",
  //       technicianRating: 4.9,
  //     } as PendingBooking,
  //   ],
  //   rejected: [
  //     {
  //       id: "BK-003",
  //       service: "Electrician Service",
  //       serviceImage: "/service-electrician.jpg",
  //       date: "10 Feb 2024",
  //       time: "11:00 AM - 1:00 PM",
  //       status: "Rejected",
  //       amount: 1599,
  //       address: "789 Oak Street, Raipur",
  //       reason: "Technician unavailable for selected slot",
  //     } as RejectedBooking,
  //   ],
  //   completed: [
  //     {
  //       id: "BK-004",
  //       service: "Home Cleaning",
  //       serviceImage: "/service-cleaning.jpg",
  //       date: "01 Feb 2024",
  //       time: "9:00 AM - 11:00 AM",
  //       status: "Completed",
  //       amount: 2499,
  //       address: "321 Elm Road, Raipur",
  //       rating: 5,
  //       review: "Excellent service! Technician was professional and thorough.",
  //     } as CompletedBooking,
  //     {
  //       id: "BK-005",
  //       service: "Appliance Repair",
  //       serviceImage: "/service-appliance.jpg",
  //       date: "25 Jan 2024",
  //       time: "3:00 PM - 5:00 PM",
  //       status: "Completed",
  //       amount: 1899,
  //       address: "654 Pine Street, Raipur",
  //       rating: 4,
  //       review: "Good service, completed on time.",
  //     } as CompletedBooking,
  //   ],
  // };
  // const filteredBookings =
  //   bookings?.filter((booking) => {
  //     if (activeTab === "pending")
  //       return booking.status?.toLowerCase() === "pending";

  //     if (activeTab === "completed")
  //       return booking.status?.toLowerCase() === "completed";

  //     if (activeTab === "rejected")
  //       return booking.status?.toLowerCase() === "rejected";

  //     return true;
  //   }) || [];

  const handleSubmitReview = () => {
    const data = {
      rating,
      review,
    };

    console.log(data);

    // API call yaha kar sakte ho
  };

  const fetchBookingDetails = async (bookingId: number) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${BASE_URL}/customers/customer-bookings/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data?.status) {
        setBookingDetails(res.data.data);
        setShowBookingDetailsPage(true);
      }
    } catch (error) {
      console.error("Booking Details Error", error);
    }
  };

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
      {/* <Header /> */}
      <div className="max-w-7xl mx-auto sm:px-2 md:px-4 lg:px-8 py-3">
        {/* <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
          <Link className="hover:text-orange-500 cursor-pointer" href="/">
            Home
          </Link>
          |<span className="text-orange-500 font-medium">Profile</span>
        </div> */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "My Booking", href: "/my-booking" },
          ]}
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
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  <span>My Schedule</span>
                </a>
                <a
                  href="/my-booking"
                  className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-600 rounded-lg font-medium"
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
          <div
            className={`relative w-full flex items-center md:hidden ${
              showBookingDetailsPage && selectedBooking
                ? "justify-between"
                : "justify-center"
            }`}
          >
            <button
              onClick={() => router.push("/my-booking")}
              className={`text-black dark:text-white hover:text-orange-500 transition ${
                showBookingDetailsPage && selectedBooking
                  ? ""
                  : "absolute left-0"
              }`}
            >
              <ArrowLeft size={20} />
            </button>

            {/* Center Title */}
            <p className="text-center font-medium">My Bookings</p>
            {showBookingDetailsPage && selectedBooking && (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="rounded-full p-1"
                >
                  <Info className="w-5 h-5 text-black" />
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                    {/* Reschedule */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        setShowRescheduleModal(true);
                        setShowMenu(false);
                      }}
                      className="flex items-center gap-2 w-full px-5 py-3 hover:bg-gray-50 transition"
                    >
                      <Clock3 className="w-5 h-5 text-black" />
                      <span className="text-[12px] font-medium">
                        Reschedule
                      </span>
                    </button>

                    <hr />

                    {/* Cancel */}
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        setShowCancelModal(true);
                      }}
                      className="flex items-center gap-2 w-full px-5 py-3 hover:bg-gray-50 transition"
                    >
                      <XCircle className="w-5 h-5 text-red-500 fill-red-500" />
                      <span className="text-[12px] font-medium text-red-500">
                        Cancel Booking
                      </span>
                    </button>

                    <hr />

                    {/* Download */}
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        handleDownloadInvoice();
                      }}
                      className="flex items-center gap-2 w-full px-5 py-3 hover:bg-gray-50 transition"
                    >
                      <Download className="w-5 h-5 text-blue-500" />
                      <span className="text-[12px] font-medium">
                        Download Invoice
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Main Content */}
          {showChatBot ? (
            <div className="flex-1 flex justify-center items-start  ">
              <ChatBotPanel
                booking={selectedChatBooking}
                onClose={() => {
                  setShowChatBot(false);
                  setSelectedChatBooking(null);
                }}
              />
            </div>
          ) : (
            <>
              {!showAMCDetailsPage && !showBookingDetailsPage && (
                <div className="flex-1">
                  {/* Top Level Tabs */}

                  <div className=" mb-1">
                    <div className="">
                      <nav className="flex ">
                        <button
                          onClick={() => router.push("/my-booking?tab=home")}
                          className={`px-4 sm:px-6 font-medium text-sm sm:text-base lg:text-lg border-b-2 transition-colors ${
                            bookingType === "home"
                              ? "border-[#FF6A00] dark:border-gray-600 text-[#FF6A00]"
                              : "border-transparent text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          Home Services
                        </button>
                        <button
                          onClick={() => router.push("/my-booking?tab=amc")}
                          className={`px-4 sm:px-6 font-medium text-sm sm:text-base lg:text-lg border-b-2 dark:border-gray-600 transition-colors ${
                            bookingType === "amc"
                              ? "border-[#FF6A00] dark:border-gray-600 text-[#FF6A00]"
                              : "border-transparent text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          AMC & Packages
                        </button>
                      </nav>
                    </div>
                  </div>

                  {bookingType === "home" &&
                  !showAMCDetailsPage &&
                  !showBookingDetailsPage ? (
                    <>
                      {/* Status Tabs */}
                      <div className=" ">
                        <div className="">
                          <div className="flex gap-2 sm:gap-3 px-2 sm:px-4 py-3 flex-wrap sm:flex-nowrap overflow-x-auto">
                            {[
                              { id: "pending", label: "Pending" },
                              { id: "rejected", label: "Rejected" },
                              { id: "completed", label: "Completed" },
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-4 sm:px-5 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all ${
                                  activeTab === tab.id
                                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                                    : "border border-orange-300 text-orange-500 hover:bg-orange-50"
                                }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Booking Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 sm:gap-5 md:gap-6 lg:gap-7">
                        {(bookings || [])?.filter((booking) => {
                          const status = booking.status?.toLowerCase();

                          if (activeTab === "pending")
                            return status === "pending";
                          if (activeTab === "completed")
                            return status === "completed";
                          if (activeTab === "rejected")
                            return status === "rejected";

                          return true;
                        }).length > 0 ? (
                          (bookings || [])
                            .filter((booking) => {
                              const status = booking.status?.toLowerCase();

                              if (activeTab === "pending")
                                return status === "pending";
                              if (activeTab === "completed")
                                return status === "completed";
                              if (activeTab === "rejected")
                                return status === "rejected";

                              return true;
                            })
                            .map((booking) => (
                              <BookingCard
                                key={booking.id}
                                service={booking.title}
                                subtitle={booking.subtitle}
                                rating={booking.rating}
                                reviews={Number(
                                  String(booking.reviews).replace(/,/g, ""),
                                )}
                                date={booking.date}
                                time={booking.time}
                                status={booking.status}
                                serviceImage={booking.image || "/ac.png"}
                                isCompleted={
                                  booking.status?.toLowerCase() === "completed"
                                }
                                onChat={() => handleOpenChat(booking)}
                                onViewDetails={() => {
                                  setSelectedBooking(booking);
                                  fetchBookingDetails(booking.id);
                                }}
                              />
                            ))
                        ) : (
                          <div className="bg-white rounded-[20px] shadow-sm p-6 sm:p-12 text-center md:col-span-2">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                              No {activeTab} bookings
                            </h3>
                            <p className="text-gray-500 mb-6">
                              {activeTab === "pending"
                                ? "You don't have any pending bookings at the moment."
                                : activeTab === "rejected"
                                  ? "You don't have any rejected bookings."
                                  : "You haven't completed any bookings yet."}
                            </p>
                            <a
                              href="/services"
                              className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                              Browse Services
                            </a>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Status Filters for AMC */}
                      {/* Status Tabs for AMC (Same as Home UI) */}
                      <div className="">
                        <div>
                          <div className="flex gap-2 sm:gap-3 px-2 sm:px-4 py-3 flex-wrap sm:flex-nowrap overflow-x-auto">
                            {[
                              { id: "pending", label: "Pending" },
                              { id: "rejected", label: "Rejected" },
                              { id: "completed", label: "Completed" },
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                className={`px-4 sm:px-5 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all ${
                                  tab.id === "pending" // (ya state laga dena agar chaho)
                                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                                    : "border border-orange-300 text-orange-500 hover:bg-orange-50"
                                }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* AMC Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full sm:gap-5 md:gap-6 lg:gap-7">
                        {amcBookings.length > 0 ? (
                          amcBookings.map((item) => (
                            <div
                              key={item.id}
                              className="bg-white rounded-2xl shadow-md p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all cursor-pointer"
                              onClick={() => {
                                setSelectedAMC(item);
                                setShowAMCDetailsPage(true);
                              }}
                            >
                              {/* Top Section */}
                              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
                                <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">
                                  {/* Profile Image */}
                                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                    <img
                                      src={item.technicianImage}
                                      alt="Technician"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>

                                  {/* Text Info */}
                                  <div>
                                    <h3 className="font-semibold text-gray-900 text-[clamp(14px,1.4vw,18px)] leading-tight">
                                      {item.title}
                                    </h3>
                                    <p className="text-gray-500 text-[clamp(12px,1.2vw,14px)]">
                                      {item.subtitle}
                                    </p>

                                    <p className="text-gray-500 mt-1 text-[clamp(12px,1.2vw,14px)]">
                                      Type: {item.planType}
                                    </p>

                                    <p className="text-green-600 font-medium mt-1 text-[clamp(12px,1.2vw,14px)]">
                                      {item.duration}
                                    </p>
                                  </div>
                                </div>

                                {/* Status */}
                                <div className="flex flex-row sm:flex-col justify-between sm:justify-start gap-3 sm:gap-5 items-start sm:items-center w-full sm:w-auto">
                                  <span className="bg-green-100 text-green-700 text-[clamp(11px,1vw,13px)] px-2 sm:px-3 py-1 rounded-md font-medium">
                                    {item.status}
                                  </span>
                                  <div className="mt-2 font-semibold text-gray-900 text-[clamp(13px,1.3vw,16px)]">
                                    ₹{item.price}
                                    <span className="text-gray-400 line-through ml-2 text-[clamp(11px,1vw,13px)]">
                                      ₹{item.originalPrice}
                                    </span>
                                  </div>
                                </div>

                                {/* Price */}
                              </div>

                              {/* Upcoming Schedule */}
                              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 my-4 sm:my-5">
                                <p className="text-[clamp(12px,1.2vw,14px)] text-gray-600">
                                  Upcoming Schedule:
                                </p>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                                  <span className="text-red-500 font-medium text-[clamp(12px,1.2vw,14px)]">
                                    {item.nextSchedule}
                                  </span>
                                </div>
                              </div>

                              {/* Buttons */}
                              <div className="flex sm:flex-row gap-3 mt-3 sm:mt-4">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedBooking({
                                      ...item,
                                      service: item.title,
                                      date: item.nextSchedule,
                                      time: "10:00 AM",
                                    });
                                    setShowRescheduleModal(true);
                                  }}
                                  className="flex-1 border border-orange-500 text-orange-500 py-2 sm:py-3 rounded-xl font-medium text-[clamp(12px,1.2vw,14px)] hover:bg-orange-50"
                                >
                                  Re-Schedule
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowComplaintModal(true);
                                  }}
                                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 sm:py-3 rounded-xl font-medium text-[clamp(12px,1.2vw,14px)]"
                                >
                                  Raise Complaint
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-full bg-white rounded-xl shadow-sm p-6 sm:p-12 text-center">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                              No AMC Packages Found
                            </h3>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              {showBookingDetailsPage && selectedBooking && (
                <div className="bg-[#f6f7f9] min-h-screen w-full max-w-full overflow-x-hidden rounded-2xl sm:px-2 lg:px-8">
                  {/* Back */}
                  {/* <button
                onClick={() => setShowBookingDetailsPage(false)}
                className="mb-4 text-orange-600 font-medium"
              >
                ← Back
              </button> */}

                  <div className="flex flex-col lg:flex-row w-full max-w-[1100px] gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 mx-auto">
                    <div className="sm:space-y-6 w-full lg:max-w-sm min-w-0">
                      {/* SERVICE CARD */}
                      {/* <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border flex flex-row gap-3 sm:gap-4 items-start">
                        <img
                          src={"/ac.png"}
                          className="w-20 h-20 rounded-lg object-cover"
                        />

                        <div className="flex flex-col sm:flex-row w-full justify-between gap-2 sm:gap-3 min-w-0">
                          <div className="min-w-0 flex-1">
                            <h2 className="font-bold text-[clamp(14px,1.5vw,18px)]">
                              {bookingDetails?.service_details?.title}
                            </h2>

                            {bookingDetails?.service_details?.items?.map(
                              (item: any, index: number) => (
                                <div key={index} className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    {item.subtitle}
                                  </p>

                                  <p className="text-orange-600 font-bold">
                                    ₹{item.price}
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                          <div className="flex gap-2 sm:gap-3 sm:justify-center p-1 sm:p-2 flex-shrink-0">
                            <img
                              src={
                                bookingDetails?.service_details?.items?.[0]
                                  ?.image
                                  ? bookingDetails.service_details.items[0]
                                      .image
                                  : "/ac.png"
                              }
                              alt="chat"
                              className="w-5 h-5 cursor-pointer"
                              onClick={() => handleOpenChat(selectedBooking)}
                            />
                            <img
                              src="/call.png"
                              alt="call"
                              className="w-5 h-5 cursor-pointer"
                              // onClick={onCall}
                            />
                          </div>
                        </div>
                      </div> */}
                      {/* SERVICE CARD */}
                      <div className="bg-white rounded-2xl shadow-sm border p-4">
                        {/* Mobile Layout */}
                        {/* Mobile Only */}

                        <div className="block sm:hidden">
                          <div className="flex justify-between items-start py-4">
                            <h2 className="font-semibold text-[15px] text-gray-900">
                              {bookingDetails?.service_details?.title}
                            </h2>

                            <button className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                              <img
                                src="/call.png"
                                alt="call"
                                className="w-4 h-4 cursor-pointer"
                              />
                            </button>
                          </div>

                          <hr className="py-2" />

                          {bookingDetails?.service_details?.items?.map(
                            (item: any, index: number) => (
                              <div
                                key={index}
                                className="flex justify-between items-end"
                              >
                                <div>
                                  <p className="text-xs text-gray-500">
                                    {item.subtitle}
                                  </p>

                                  <p className="text-orange-500 font-bold text-[16px] mt-1">
                                    ₹{item.price}
                                  </p>
                                </div>

                                <p className="text-sm text-gray-500">
                                  Qty: <span className="text-gray-700">1</span>
                                </p>
                              </div>
                            ),
                          )}
                        </div>

                        {/* Desktop Layout (Existing Design) */}
                        <div className="hidden sm:flex flex-row gap-4 items-start">
                          <img
                            src="/ac.png"
                            className="w-20 h-20 rounded-lg object-cover"
                          />

                          <div className="flex flex-row w-full justify-between gap-3">
                            <div className="flex-1">
                              <h2 className="font-bold text-[clamp(14px,1.5vw,18px)]">
                                {bookingDetails?.service_details?.title}
                              </h2>

                              {bookingDetails?.service_details?.items?.map(
                                (item: any, index: number) => (
                                  <div key={index} className="mt-2">
                                    <p className="text-sm text-gray-500">
                                      {item.subtitle}
                                    </p>
                                    <p className="text-orange-600 font-bold">
                                      ₹{item.price}
                                    </p>
                                  </div>
                                ),
                              )}
                            </div>

                            <div className="flex gap-3 p-2">
                              <img
                                src={
                                  bookingDetails?.service_details?.items?.[0]
                                    ?.image || "/ac.png"
                                }
                                alt="chat"
                                className="w-5 h-5 cursor-pointer"
                                onClick={() => handleOpenChat(selectedBooking)}
                              />

                              <img
                                src="/call.png"
                                alt="call"
                                className="w-5 h-5 cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white border rounded-xl shadow-sm mt-4">
                        <div className="block sm:hidden p-4 ">
                          <div className="flex justify-between items-center">
                            <div>
                              <span
                                className={`inline-block text-[10px] font-semibold px-2 py-1 rounded
            ${
              currentStep?.status === "completed"
                ? "bg-green-100 text-green-700"
                : currentStep?.status === "in_progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
            }`}
                              >
                                {badgeText}
                              </span>

                              <h3
                                className={`mt-2 font-bold text-sm ${
                                  currentStep?.status === "completed"
                                    ? "text-green-600"
                                    : currentStep?.status === "in_progress"
                                      ? "text-yellow-600"
                                      : "text-gray-700"
                                }`}
                              >
                                {currentStep?.title}
                              </h3>

                              <p className="text-gray-500 text-sm mt-1">
                                Current Status
                              </p>
                            </div>

                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                currentStep?.status === "completed"
                                  ? "bg-green-500"
                                  : currentStep?.status === "in_progress"
                                    ? "bg-yellow-500"
                                    : "bg-gray-400"
                              }`}
                            >
                              <span className="text-white text-base">
                                {currentStep?.status === "completed"
                                  ? "✓"
                                  : "•"}
                              </span>
                            </div>
                          </div>

                          <hr className="mt-4 mb-2" />
                          <div className="flex justify-end">
                            <button
                              onClick={() =>
                                handleTrackDetails(
                                  selectedBooking?.booking_id ||
                                    selectedBooking?.id,
                                )
                              }
                              className="text-blue-500 font-medium text-sm "
                            >
                              Track Details →
                            </button>
                          </div>
                        </div>
                      </div>
                      {showTracking && (
                        <div className="fixed inset-0 bottom-0 my-20 z-50 flex items-end bg-black/40">
                          <div className="w-full bg-white rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto animate-slide-up ">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                              <button onClick={() => setShowTracking(false)}>
                                ←
                              </button>

                              <h2 className="text-xl font-bold flex-1 text-center">
                                Track Order
                              </h2>
                            </div>

                            {/* Timeline */}
                            <div className="space-y-7">
                              {trackingSteps.map((item: any, index: number) => {
                                const completed = item.status === "completed";
                                const active = item.status === "in_progress";
                                const pending = item.status === "pending";

                                return (
                                  <div key={item.id} className="flex gap-4">
                                    {/* LEFT SIDE */}
                                    <div className="flex flex-col items-center">
                                      <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center z-10
            ${
              completed
                ? "bg-green-500 text-white"
                : active
                  ? "bg-green-100 border-2 border-green-500"
                  : "border-2 border-gray-300 bg-white text-gray-400"
            }`}
                                      >
                                        {completed ? (
                                          <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                            viewBox="0 0 24 24"
                                          >
                                            <path d="M5 13l4 4L19 7" />
                                          </svg>
                                        ) : active ? (
                                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        ) : null}
                                      </div>

                                      {index !== trackingSteps.length - 1 && (
                                        <div
                                          className={`w-[3px] h-28 ${
                                            completed || active
                                              ? "bg-green-500"
                                              : "bg-gray-300"
                                          }`}
                                        />
                                      )}
                                    </div>

                                    {/* CARD */}
                                    <div
                                      className={`flex-1 h-28 rounded-3xl p-5 shadow-md transition-all
          ${
            active
              ? "bg-green-50 border-2 border-green-500"
              : "bg-white border border-gray-200"
          }`}
                                    >
                                      <div className="flex gap-4">
                                        <div
                                          className={`w-10 h-10 rounded-2xl flex items-center justify-center
              ${
                completed || active
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-400"
              }`}
                                        >
                                          {iconMap[item.icon]}
                                        </div>

                                        <div>
                                          <h3
                                            className={`font-bold text-sm ${
                                              pending
                                                ? "text-gray-400"
                                                : "text-black"
                                            }`}
                                          >
                                            {item.title}
                                          </h3>

                                          <p
                                            className={`text-sm ${
                                              pending
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                            }`}
                                          >
                                            {item.time || "In a while"}
                                          </p>
                                        </div>
                                      </div>
                                      <p
                                        className={`mt-2 text-xs ${
                                          pending
                                            ? "text-gray-400"
                                            : "text-gray-600"
                                        }`}
                                      >
                                        {item.desc}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                      {/* COUPONS */}

                      <div
                        onClick={() => setShowOffers(!showOffers)}
                        className="bg-white rounded-xl p-5 shadow-sm border hidden sm:flex justify-between items-center cursor-pointer"
                      >
                        <span className="text-gray-600 font-medium text-[clamp(14px,1.5vw,18px)]">
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
                      <div className="bg-white rounded-xl p-5 shadow-sm border relative mt-4">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-[clamp(14px,1.5vw,18px)]">
                            Customer Details
                          </h3>
                          {/* 
                          <button
                            onClick={() => setShowSelectAddressModal(true)}
                            className="text-orange-500 hover:text-orange-600 transition"
                          >
                            <Pencil className="w-4 h-4 fill-orange-500 stroke-orange-500" />
                          </button> */}
                        </div>

                        <p className="font-medium">
                          {bookingDetails?.customer_details?.name || "Customer"}
                        </p>

                        <p className="text-sm text-gray-600 leading-6 mt-2">
                          {bookingDetails?.customer_details?.address}
                        </p>

                        <p className="text-sm text-gray-600 mt-3">
                          C.N. : {bookingDetails?.customer_details?.phone}
                        </p>
                        {bookingDetails?.customer_details?.alt_mobile ? (
                          <p className="text-sm text-gray-600 mt-2">
                            Alternate No. :{" "}
                            {bookingDetails.customer_details.alt_mobile}
                          </p>
                        ) : null}

                        <button
                          onClick={() => {
                            setAlternateNumber(
                              bookingDetails?.customer_details?.alt_mobile ||
                                "",
                            );
                            setShowAlternateModal(true);
                          }}
                          className="mt-3 flex items-center gap-2 text-[#1E88E5] text-sm font-medium"
                        >
                          <PlusCircle className="w-4 h-4" />
                          {bookingDetails?.customer_details?.alt_mobile
                            ? "Edit Alternate Number"
                            : "Add Alternate Number"}
                        </button>
                        {/* <div className="mt-4 flex gap-3">
                          <input
                            placeholder="Apply Coupon"
                            className="bg-white border rounded-lg px-3 py-2 flex-1 min-w-0"
                          />
                          <button className="bg-orange-500 text-white px-4 py-2 rounded-xl whitespace-nowrap">
                            Apply
                          </button>
                        </div> */}
                        {showAlternateModal && (
                          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
                            <div className="relative bg-white rounded-3xl w-full max-w-md p-6">
                              <button
                                onClick={() => setShowAlternateModal(false)}
                                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-orange-500 text-white"
                              >
                                ✕
                              </button>

                              <h2 className="text-3xl font-bold text-center">
                                Add Alternate Number
                              </h2>

                              <p className="text-center text-gray-500 mt-3">
                                Enter an alternate phone number for service
                                communication.
                              </p>

                              <div className="mt-8">
                                <label className="font-semibold">
                                  Alternate Phone Number
                                </label>

                                <input
                                  type="tel"
                                  maxLength={10}
                                  value={alternateNumber}
                                  onChange={(e) =>
                                    setAlternateNumber(
                                      e.target.value.replace(/\D/g, ""),
                                    )
                                  }
                                  placeholder="e.g. 9876543210"
                                  className="mt-2 w-full border rounded-xl px-4 py-4"
                                />
                              </div>

                              <button
                                onClick={handleSaveAlternateNumber}
                                disabled={savingAlternate}
                                className="mt-8 w-full rounded-full bg-orange-500 text-white font-semibold py-4"
                              >
                                {savingAlternate ? "Saving..." : "Save Number"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="hidden bg-white rounded-xl p-4 sm:p-5 shadow-sm border relative">
                        <h2 className="text-[clamp(14px,1.5vw,18px)] font-bold text-start">
                          Rate Your Experience
                        </h2>

                        {/* Stars */}
                        <div className="flex justify-center gap-2 mt-5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="transition hover:scale-110"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={star <= rating ? "#f97316" : "none"}
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke={star <= rating ? "#f97316" : "#d4d4d8"}
                                className="w-8 h-8"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.386a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.98 20.562a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557L3.04 10.407a.562.562 0 01.321-1.01l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"
                                />
                              </svg>
                            </button>
                          ))}
                        </div>

                        {/* Review Box */}
                        <textarea
                          placeholder="Write your feedback here..."
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          rows={3}
                          className="w-full mt-5 rounded-xl border border-gray-300 p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-orange-400"
                        />

                        {/* Button */}
                        <button
                          onClick={handleSubmitReview}
                          className="w-full text-[clamp(14px,1.5vw,18px)] mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition"
                        >
                          Submit Review
                        </button>
                      </div>

                      <div className="sm:block hidden bg-white rounded-xl p-4 sm:p-5 shadow-sm border mt-4">
                        <h2 className="text-[clamp(14px,1.5vw,18px)] font-semibold text-gray-900">
                          GST Details
                        </h2>

                        <div className="mt-4 space-y-2">
                          <div className="flex text-sm justify-between">
                            <span className="text-sm text-gray-500">
                              GST Number
                            </span>

                            <span className="text-gray-900 text-end text-sm">
                              {bookingDetails?.gst_details?.gst_number}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500"></span>

                            <span className="text-gray-900 text-end text-sm">
                              {bookingDetails?.gst_details?.gst_name || "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* SERVICE PROVIDER */}

                      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                        <h3 className="font-semibold text-[clamp(14px,1.5vw,18px)] p-3">
                          Payment Details
                        </h3>
                        <div className="space-y-3 bg-white  p-5 rounded-xl text-sm border shadow-sm">
                          <div className="flex justify-between border-b pb-3">
                            <span>Item Total</span>
                            <span>
                              ₹{bookingDetails?.payment_summary?.item_total}
                            </span>
                          </div>

                          <div className="flex justify-between border-b pb-3 text-gray-500">
                            <span>Item Discount</span>
                            <span>
                              ₹{bookingDetails?.payment_summary?.item_discount}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>Taxes and Fees</span>
                            <span>
                              ₹{bookingDetails?.payment_summary?.taxes_and_fees}
                            </span>
                          </div>

                          <div className="flex justify-between font-bold border-t pt-2">
                            <span>Total</span>
                            <span>
                              ₹{bookingDetails?.payment_summary?.total}
                            </span>
                          </div>
                        </div>

                        {/* BUTTONS */}
                        <button
                          onClick={() => setShowRescheduleModal(true)}
                          className="hidden md:block w-full mt-5 border border-orange-500 text-orange-500 py-2 rounded-full"
                        >
                          Reschedule
                        </button>

                        <button
                          onClick={() => {
                            setShowCancelModal(true);
                          }}
                          className="hidden md:block w-full mt-3 bg-orange-500 text-white py-3 rounded-full shadow-md"
                        >
                          Cancel Booking
                        </button>
                      </div>

                      <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border mt-4">
                        <h3 className="text-[clamp(14px,1.5vw,18px)] font-semibold">
                          Payment Method
                        </h3>
                        <p className="text-[clamp(12px,1.2vw,16px)]">
                          {bookingDetails?.payment_method}
                        </p>
                      </div>

                      <div className="sm:block hidden bg-white rounded-xl font-bold p-4 sm:p-5 md:p-6 shadow-sm border">
                        {/* Heading */}
                        <h3 className="font-semibold text-[clamp(14px,1.5vw,18px)] text-gray-800 mb-4">
                          Service Provider
                        </h3>

                        {/* Provider Row */}
                        <div className="flex items-center justify-between">
                          {/* Left Side */}
                          <div className="flex items-center gap-3">
                            <img
                              src="/provider.jpg"
                              alt="provider"
                              className="w-12 h-12 rounded-full object-cover border"
                            />

                            <div>
                              <p className="font-medium text-[clamp(14px,1.5vw,18px)] text-gray-800">
                                {bookingDetails?.service_provider?.name?.trim() ||
                                  "Not Assigned"}
                              </p>
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <MapPin size={14} />
                                {bookingDetails?.service_provider?.location?.trim() ||
                                  "-"}
                              </p>
                            </div>
                          </div>

                          {/* Right Side Icons */}
                          <div className="flex gap-2 sm:gap-3 sm:justify-center p-1 sm:p-2 flex-shrink-0">
                            <img
                              src="/chat.png"
                              alt="chat"
                              className="w-5 h-5 cursor-pointer"
                              onClick={() => handleOpenChat(selectedBooking)}
                            />
                            <img
                              src="/call.png"
                              alt="call"
                              className="w-5 h-5 cursor-pointer"
                              // onClick={onCall}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SECTION */}

                    <div className=" shadow-sm h-fit w-full lg:flex-1 min-w-0 lg:sticky lg:top-24 sm:px-0 gap-5">
                      <div className=" sm:block hidden mb-4">
                        <div className=" flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-[clamp(14px,1.5vw,18px)] text-gray-800 dark:text-gray-200 text-lg">
                            Advance Payment Summary
                          </h3>
                          <span className="text-orange-500 text-lg">🧾</span>
                        </div>

                        {/* Card */}
                        <div className="bg-[#fafafa] rounded-xl space-y-4 p-4 sm:p-5">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Item Total</span>
                            <span className="font-medium text-gray-800">
                              ₹
                              {
                                bookingDetails?.advance_payment_summary
                                  ?.item_total
                              }
                            </span>
                          </div>

                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Item Discount</span>
                            <span className="font-medium text-gray-800">
                              ₹
                              {
                                bookingDetails?.advance_payment_summary
                                  ?.item_discount
                              }
                            </span>
                          </div>

                          <div className="border-t border-gray-200"></div>

                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Taxes and Fees</span>
                            <span className="font-medium text-gray-800">
                              ₹
                              {
                                bookingDetails?.advance_payment_summary
                                  ?.taxes_and_fees
                              }
                            </span>
                          </div>

                          <div className="border-t border-gray-200"></div>

                          <div className="flex justify-between font-semibold text-gray-900">
                            <span>Total</span>
                            <span>
                              ₹
                              {
                                bookingDetails?.advance_payment_summary
                                  ?.total_balance
                              }
                            </span>
                          </div>

                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Advance Payment</span>
                            <span className="font-medium text-gray-800">
                              ₹
                              {
                                bookingDetails?.advance_payment_summary
                                  ?.advance_payment
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Header */}

                      {/* SUPPORT */}
                      <div className="bg-white text-[clamp(14px,1.5vw,18px)] rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-red flex flex-col mb-4 cursor-pointer hover:shadow-md transition-all">
                        <p>Contact Support</p>
                        <div className="flex justify-between items-center gap-3">
                          {/* Icon */}
                          <div className="flex items-center gap-2 py-2">
                            <div className="w-9 h-9 bg-orange-50 rounded-full flex items-center justify-center">
                              <span className="text-orange-500 text-sm">
                                🏠
                              </span>
                            </div>

                            {/* Text */}
                            <span className="text-gray-800 font-medium">
                              Help Center
                            </span>
                          </div>

                          <span className="text-orange-500 text-lg">›</span>
                        </div>
                      </div>

                      {/* WORK STATUS */}
                      <div className="bg-white rounded-xl shadow-sm border">
                        {/* Mobile Layout */}

                        {/* Desktop Layout (Existing) */}
                        <div className="hidden sm:block p-5">
                          <h3 className="font-semibold mb-3">Work Status</h3>

                          <ul className="space-y-3 text-sm">
                            {bookingDetails?.tracking_info?.tracking_steps?.map(
                              (step: any) => (
                                <li
                                  key={step.id}
                                  className={
                                    step.status === "completed"
                                      ? "text-green-600"
                                      : "text-gray-400"
                                  }
                                >
                                  {step.status === "completed" ? "✔" : "○"}{" "}
                                  {step.title}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {showAMCDetailsPage && selectedAMC && (
                <div className="bg-[#f8f8f8] rounded-2xl ">
                  <div className="flex flex-col md:flex-row justify-between gap-4 sm:gap-6 md:gap-10 items-start w-full">
                    {/* LEFT COLUMN */}
                    <div className="space-y-5 w-full md:w-[65%]">
                      {/* AMC Billing Details */}
                      <div className="flex-1">
                        {/* Billing Card */}
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                          {/* Header */}
                          <div
                            onClick={() => toggleSection("billing")}
                            className="bg-gray-200 px-4 py-3 flex justify-between items-center cursor-pointer"
                          >
                            <h3 className="font-semibold text-gray-800">
                              AMC Billing Details
                            </h3>
                            <span
                              className={`text-gray-600 text-sm transition-transform ${
                                openSections.includes("billing")
                                  ? "rotate-180"
                                  : ""
                              }`}
                            >
                              ▼
                            </span>
                          </div>

                          {/* Items */}
                          <div
                            className={`transition-all duration-300 overflow-hidden ${
                              openSections.includes("billing")
                                ? "max-h-[500px] opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="p-4 space-y-4">
                              {selectedAMC.billing?.items.map(
                                (item: string, idx: number) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between items-start text-xs sm:text-sm md:text-base"
                                  >
                                    {/* Left */}
                                    <div className="flex gap-2">
                                      <span
                                        onClick={() => setShowSplitModal(true)}
                                        className="text-blue-600 font-medium cursor-pointer hover:underline"
                                      >
                                        {item}
                                      </span>
                                      <span className="text-gray-500">
                                        Preventive(1.5 Ton * 2)
                                      </span>
                                    </div>

                                    {/* Price */}
                                    <span className="font-medium text-gray-900">
                                      ₹200
                                    </span>
                                  </div>
                                ),
                              )}

                              {/* Totals */}
                              <div className="pt-4 border-t space-y-2 text-sm">
                                <div className="flex justify-between font-semibold text-gray-900">
                                  <span>Total Amount</span>
                                  <span>₹{selectedAMC.billing?.total}</span>
                                </div>

                                <div className="flex justify-between text-gray-700">
                                  <span>Paid</span>
                                  <span>₹{selectedAMC.billing?.paid}</span>
                                </div>

                                <div className="flex justify-between text-gray-400">
                                  <span>Balance Amount</span>
                                  <span>{selectedAMC.billing?.balance}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AMC Schedule */}

                      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm w-full">
                        {/* Header */}
                        <div
                          onClick={() => toggleSection("schedule")}
                          className="bg-gray-200 px-4 py-3 flex justify-between items-center cursor-pointer"
                        >
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                            AMC Schedule
                          </h3>

                          <span
                            className={`text-gray-600 text-sm transition-transform duration-300 ${
                              openSections.includes("schedule")
                                ? "rotate-180"
                                : ""
                            }`}
                          >
                            ▼
                          </span>
                        </div>

                        {/* Body */}
                        <div
                          className={`transition-all duration-300 ease-in-out ${
                            openSections.includes("schedule")
                              ? "max-h-[500px] opacity-100"
                              : "max-h-0 opacity-0"
                          } overflow-hidden`}
                        >
                          <div className="px-3 sm:px-4 py-4">
                            {/* Heading */}
                            <div className="flex justify-between text-xs sm:text-sm md:text-base font-semibold text-[#333] mb-3">
                              <span>Status</span>
                              <span>Upcoming Date</span>
                              <span>Details</span>
                            </div>

                            {/* Data */}
                            <div className="space-y-3">
                              {selectedAMC.schedule.map(
                                (sch: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between px-2 sm:px-3 text-xs sm:text-sm md:text-base items-start"
                                  >
                                    <span
                                      className={`${
                                        sch.status === "Completed"
                                          ? "text-green-600"
                                          : sch.status === "Upcoming"
                                            ? "text-[#ff5a3c]"
                                            : "text-[#9a9a9a]"
                                      }`}
                                    >
                                      {sch.status}
                                    </span>

                                    <span
                                      className={`${
                                        sch.status === "Upcoming"
                                          ? "text-[#ff5a3c]"
                                          : "text-[#8a8a8a]"
                                      }`}
                                    >
                                      {sch.date}
                                    </span>

                                    <span className="text-[#222] text-xs">
                                      {idx === 0 ? "◉" : idx === 1 ? "▦" : ""}
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Billing Status */}
                      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div
                          onClick={() => toggleSection("billingStatus")}
                          className="bg-gray-200 px-4 py-3 flex justify-between items-center cursor-pointer"
                        >
                          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-[#222]">
                            Billing Status
                          </h3>
                          <span
                            className={`text-black text-xs transition-transform ${
                              openSections.includes("billingStatus")
                                ? "rotate-180"
                                : ""
                            }`}
                          >
                            ▼
                          </span>
                        </div>

                        <div
                          className={`transition-all duration-300 overflow-hidden ${
                            openSections.includes("billingStatus")
                              ? "max-h-[500px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="px-4 py-4">
                            <div className="flex justify-between text-xs sm:text-sm md:text-base font-semibold text-[#333] mb-4">
                              <span>Period</span>
                              <span>Billing Date.</span>
                              <span>AMT</span>
                              <span>Status</span>
                            </div>

                            <div className="space-y-4 text-sm sm:text-base">
                              <div className="flex justify-between items-center">
                                <span className="text-[#555]">Q1</span>
                                <span className="text-[#777]">12/12/23</span>
                                <span className="text-[#555]">₹990</span>
                                <span className="text-green-600 flex items-center gap-1">
                                  Paid <span className="text-[10px]">🧾</span>
                                </span>
                              </div>

                              <div className="grid grid-cols-[60px_1fr_50px_56px] items-center">
                                <span className="text-[#555]">Q2</span>
                                <span className="text-[#bbb]"></span>
                                <span className="text-[#bbb]"></span>
                                <span className="text-[#bbb]"></span>
                              </div>

                              <div className="grid grid-cols-[60px_1fr_50px_56px] items-center">
                                <span className="text-[#555]">Q3</span>
                                <span className="text-[#bbb]"></span>
                                <span className="text-[#bbb]"></span>
                                <span className="text-[#bbb]"></span>
                              </div>

                              <div className="grid grid-cols-[60px_1fr_50px_56px] items-center">
                                <span className="text-[#555]">Q4</span>
                                <span className="text-[#bbb]"></span>
                                <span className="text-[#bbb]"></span>
                                <span className="text-[#bbb]"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* RIGHT COLUMN */}
                    <div className="w-full md:w-[35%] bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <p className="text-xs sm:text-sm text-[#a0a0a0]">
                          Ref: TAS/AMC2223/000222
                        </p>
                        <span className="bg-[#e6f3e6] text-green-700 text-xs px-3 py-1 rounded-md font-medium">
                          Running
                        </span>
                      </div>

                      <div className="space-y-3 mb-5">
                        <div className="flex justify-between items-center gap-3 text-sm">
                          <span className="text-[#444] min-w-[82px]">
                            Start Date:
                          </span>
                          <div>
                            <span className="text-orange-500">📅</span>
                            <span className="text-orange-700 text-sm sm:text-base font-medium">
                              Tuesday, 12 March 2024
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center gap-3 text-sm">
                          <span className="text-[#444] min-w-[82px]">
                            End Date:
                          </span>
                          <div>
                            <span className="text-orange-500">📅</span>
                            <span className="text-orange-700 text-sm sm:text-base font-medium">
                              Tuesday, 11 March 2025
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h3 className="font-semibold text-[#333] mb-3">
                          Shipping Details
                        </h3>

                        <div className="space-y-2 text-[14px] text-[#555] leading-6">
                          <p className="font-semibold text-[#222]">
                            Mr. Tikesh Dewangan
                          </p>
                          <p>
                            Office No. 201, atlantis corporate park, ring road
                            <br />
                            No.1 Telibandha, Raipur
                          </p>
                          <p>C.N.: +91 9644430161</p>
                        </div>
                      </div>

                      <div className="space-y-5 max-w-[260px]">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBooking({
                              ...selectedAMC,
                              service: selectedAMC.title,
                              date: selectedAMC.nextSchedule,
                              time: "10:00 AM",
                            });
                            setShowRescheduleModal(true);
                          }}
                          className="w-full h-[44px] rounded-full border border-orange-600 text-orange-600 bg-white font-medium text-sm hover:bg-orange-50 transition-colors"
                        >
                          Re-schedule
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowComplaintModal(true);
                          }}
                          className="w-full h-[44px] rounded-full bg-orange-500 from-[#ff5a36] to-[#f9ab2d] text-white font-medium text-sm "
                        >
                          Raise Complaint
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
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
              pathname?.startsWith("/my-booking") && bookingType === "amc"
                ? "text-orange-500"
                : "text-gray-500"
            }`}
          >
            <Wrench className="w-5 h-5" />
            <span className="text-[11px] mt-1 font-medium">AMC Services</span>
          </Link>

          <Link
            href="/my-booking?tab=home"
            className={`flex flex-col items-center justify-center ${
              pathname?.startsWith("/my-booking") && bookingType !== "amc"
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
      <SelectDateTimeModal
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        showLocation={true}
        location={selectedBooking?.address}
        serviceId={
          selectedBooking?.service_id ||
          selectedBooking?.booking_detail?.service_id
        }
        onContinue={(date, time, customer_notes, slot_id) =>
          handleReschedule({
            slot_id: slot_id || 0,
            date,
            customer_notes,
          })
        }
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
          onConfirm={async (data) => {
            try {
              if (!data) return;

              const payload = {
                cancel_reason_id: data.cancel_reason_id,
                cancel_reason: data.cancel_reason,
              };

              const result = await cancelBooking(selectedBooking.id, payload);

              setBookings((prev) =>
                prev.map((item) =>
                  item.id === selectedBooking.id
                    ? { ...item, status: "Cancelled" }
                    : item,
                ),
              );

              setShowCancelModal(false);
              setShowCancelledSuccess(true);
            } catch (error: any) {
              console.error(
                "Cancel booking failed:",
                error.response?.data || error.message,
              );
            }
          }}
        />
      )}
      {showCancelledSuccess && (
        <BookingCancelledModal
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
      {showEquipmentModal && selectedAMC && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowEquipmentModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Split AC (1.5 Ton *2)
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">S.N</th>
                      <th className="px-6 py-3">Make</th>
                      <th className="px-6 py-3">Serial No.</th>
                      <th className="px-6 py-3">Model No.</th>
                      <th className="px-6 py-3">Age</th>
                      <th className="px-6 py-3">Images</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAMC.equipment &&
                    selectedAMC.equipment.length > 0 ? (
                      selectedAMC.equipment.map((eq: any, idx: number) => (
                        <tr
                          key={idx}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="px-6 py-4">{eq.sn}</td>
                          <td className="px-6 py-4">{eq.make}</td>
                          <td className="px-6 py-4">{eq.serial}</td>
                          <td className="px-6 py-4">{eq.model}</td>
                          <td className="px-6 py-4">{eq.age}</td>
                          <td className="px-6 py-4">
                            <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden">
                              {/* Placeholder for image */}
                              <div className="w-full h-full bg-gray-300"></div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          No equipment details available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* MODAL 2: Raise Complaint */}
      {showComplaintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-sm p-6 relative shadow-xl">
            <button
              onClick={() => setShowComplaintModal(false)}
              className="absolute -top-3 -right-3 w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Please Call the Below Number
              </h3>
              <p className="text-2xl font-bold text-orange-600 flex items-center justify-center gap-2">
                <Phone className="w-6 h-6" />
                +1 555 6337275
              </p>
            </div>
          </div>
        </div>
      )}
      {/* <Footer / */}
    </div>
  );
};;

export default MyBookingContent;
