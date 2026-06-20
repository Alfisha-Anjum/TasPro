"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";
import { CheckCircle, MapPin, Phone, Calendar } from "lucide-react";

export default function BookingConfirmation() {
  const router = useRouter();
  const { cartItems, selectedAddress } = useBooking();

  // if (cartItems.length === 0) {
  //   return (
  //     <div className="min-h-screen bg-gray-50">
  //       <Header />
  //       <main className="max-w-7xl mx-auto px-4 py-16 text-center">
  //         <h1 className="text-3xl font-bold text-gray-900 mb-4">
  //           No Active Booking
  //         </h1>
  //         <button
  //           onClick={() => router.push("/services")}
  //           style={{ backgroundColor: "#FF6B00" }}
  //           className="text-white font-bold px-8 py-3 rounded-lg hover:opacity-90"
  //         >
  //           Browse Services
  //         </button>
  //       </main>
  //       <Footer />
  //     </div>
  //   );
  // }

  const bookingId =
    "TAS" + Math.random().toString(36).substring(2, 11).toUpperCase();
  const bookingDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Card */}
        <div className="bg-white rounded-xl shadow-md p-8 text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600 mb-4">
            Your service booking has been successfully confirmed. Our technician
            will arrive at the scheduled time.
          </p>

          <div
            style={{ backgroundColor: "#FFF4E6" }}
            className="p-4 rounded-lg border-2 border-orange-500 mb-6"
          >
            <p className="text-sm text-gray-700 mb-1">Booking ID</p>
            <p className="text-2xl font-bold text-orange-600">{bookingId}</p>
          </div>
        </div>

        {/* Booking Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Booking Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Booking Summary
            </h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between pb-3 border-b border-gray-200"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.subService}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.serviceName}
                      {item.capacity && ` • ${item.capacity}`}
                    </p>
                  </div>
                  <p className="font-bold text-gray-900">₹{item.price}</p>
                </div>
              ))}

              <div className="pt-3 border-t-2 border-gray-300 flex justify-between font-bold">
                <span className="text-gray-900">Total Amount</span>
                <span style={{ color: "#FF6B00" }}>₹{totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Service Details
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Booking Date</p>
                  <p className="font-semibold text-gray-900">{bookingDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Scheduled Time</p>
                  <p className="font-semibold text-gray-900">
                    9:00 AM - 12:00 PM
                  </p>
                </div>
              </div>

              {selectedAddress && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Service Location</p>
                    <p className="font-semibold text-gray-900">
                      {selectedAddress.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedAddress.city}, {selectedAddress.state}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Support</p>
                  <p className="font-semibold text-gray-900">1800-123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">What's Next?</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div
                style={{ backgroundColor: "#FF6B00" }}
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
              >
                1
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Technician Assignment
                </p>
                <p className="text-sm text-gray-600">
                  We will assign a verified technician within 1 hour
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                style={{ backgroundColor: "#FF6B00" }}
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
              >
                2
              </div>
              <div>
                <p className="font-semibold text-gray-900">Live Tracking</p>
                <p className="text-sm text-gray-600">
                  Track your technician in real-time on our app
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                style={{ backgroundColor: "#FF6B00" }}
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
              >
                3
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Service Completion
                </p>
                <p className="text-sm text-gray-600">
                  Pay remaining amount after service completion
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push("/my-booking")}
            style={{ backgroundColor: "#FF6B00" }}
            className="text-white font-bold px-12 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            View Booking Details
          </button>

          <button
            onClick={() => router.push("/services")}
            className="border-2 border-orange-600 text-orange-600 font-bold px-12 py-3 rounded-lg hover:bg-orange-50 transition-colors"
          >
            Book Another Service
          </button>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

import { Clock } from "lucide-react";
