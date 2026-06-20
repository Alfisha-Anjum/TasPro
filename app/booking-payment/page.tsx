
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";
import { OTPVerificationModal } from "@/components/OTPVerificationModal";
import { CreditCard, Smartphone, Banknote, Lock } from "lucide-react";
import axios from "axios";

export default function PaymentPage() {
  const router = useRouter();
 const { cartItems, clearCart } = useBooking();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [step, setStep] = useState<"options" | "card" | "otp">("options");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  // const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0); 

//   const paymentMethods = [
//   {
//     id: 1,
//     payment_type: "ONLINE",
//   },
//   {
//     id: 2,
//     payment_type: "COD",
//   },
// ];
const [paymentMethods, setPaymentMethods] = useState<any[]>([]);



const createBooking = async (paymentMethod: string) => {
    console.log("CREATE BOOKING CALLED");
    
  try {
    const token = localStorage.getItem("token");
    const bookingDateTime = JSON.parse(
      localStorage.getItem("bookingDateTime") || "{}",
    );
    const selectedAddress = JSON.parse(
      localStorage.getItem("selectedAddress") || "{}",
    );

    const payload = {
      date: bookingDateTime.date,
      slot_id: Number(bookingDateTime.slotId || 1),
      customer_notes: bookingDateTime.notes?.trim() || "Need urgent service",
      address_id: String(selectedAddress?.id || 1),
      payment_type: paymentMethod,
      gst_no: "22AAAAA0000A1Z5",
      pan_no: "ABCDE1234F",
      service_category_id: Number(
        cartItems[0]?.service_category_id ||
          cartItems[0]?.serviceCategoryId ||
          1,
      ),
      service_id: Number(
        cartItems[0]?.service_id || cartItems[0]?.serviceId || 1,
      ),
      razorpay_payment_id: "",
      state_name: "Chhattisgarh",
      city_name: "Raipur",
    };

    const res = await axios.post(
      "https://app.tasprocompany.in/api/customers/customer-bookings",
      payload,
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

   if (res.data?.status) {
  clearCart();

  localStorage.removeItem("bookingDateTime");
  localStorage.removeItem("selectedAddress");

  alert("Booking Created Successfully!");
  router.push("/order-confirmation");
}
  } catch (error: any) {
    console.log("BOOKING API ERROR:", error?.response?.data || error);
    alert("Booking failed");
  }
};
const handlePayNow = (paymentMethod?: string) => {
  const method = paymentMethod || selectedPayment;

  console.log("SELECTED METHOD:", method);

  if (!method) {
    alert("Please select payment method");
    return;
  }

  createBooking(method);
};
  const handleOTPVerify = (otp: string) => {
    alert("Payment successful! Booking confirmed.");
    router.push("/booking-confirmation");
  };

  const totalMRP = cartItems.reduce(
    (sum: number, item: any) =>
      sum +
      (item.originalPrice || item.price || item.discountedPrice || 0) *
        (item.quantity || 1),
    0,
  );

  const totalAmount = cartItems.reduce(
    (sum: number, item: any) =>
      sum + (item.price || item.discountedPrice || 0) * (item.quantity || 1),
    0,
  );

  const totalDiscount = totalMRP - totalAmount;

  const couponDiscount = 50;

  const finalAmount = totalAmount - couponDiscount;

  return (
    <div className="min-h-screen ">
      {/* <Header /> */}

      <main className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <h1 className="text-lg md:text-2xl font-semibold mb-6">Checkout</h1>
            <div className="bg-white border rounded-xl p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-700">Payment Option</h2>
                <button className="border border-orange-500 text-orange-500 px-4 w-32 py-1 rounded-md text-sm">
                  Pay ₹{totalAmount}
                </button>
              </div>

              {/* <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setSelectedPayment(method.id);

                      if (method.id === "card") {
                        router.push("/card-details");
                      } else {
                        handlePayNow(method.id);
                      }
                    }}
                    className="w-full flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={method.img}
                        alt={method.label}
                        className="w-6 h-6 object-contain"
                      />
                      <div className="text-left">
                        <span className="font-medium block">
                          {method.label}
                        </span>
                        <span className="text-sm text-gray-500">
                          {method.sub}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border ${
                        selectedPayment === method.id
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-400"
                      }`}
                    ></div>
                  </button>
                ))}
              </div> */}
              <div className="mt-6 space-y-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => {
                      console.log(method);
                      setSelectedPayment(method.payment_type);
                    }}
                    className="bg-white border border-gray-200 rounded-2xl p-3 md:px-6 md:py-7 flex items-center justify-between cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-3 md:gap-5 flex-1 min-w-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0">
                        {method.payment_type === "ONLINE" ? (
                          <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-gray-500" />
                        ) : (
                          <Banknote className="w-6 h-6 md:w-8 md:h-8 text-gray-500" />
                        )}
                      </div>

                      <h3 className="text-sm md:text-xl font-semibold text-black break-words">
                        {method.payment_type === "ONLINE"
                          ? "Online Payment"
                          : "Cash on Delivery"}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 md:w-10 md:h-10 rounded-full border-2 flex md:hidden items-center justify-center shrink-0 ${
                        selectedPayment === method.payment_type
                          ? "border-orange-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedPayment === method.payment_type && (
                        <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-orange-500" />
                      )}
                    </div>

                    <div
                      className={`w-10 h-10 rounded-full border-2 hidden md:flex items-center justify-center ${
                        selectedPayment === method.payment_type
                          ? "border-orange-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedPayment === method.payment_type && (
                        <div className="w-5 h-5 rounded-full bg-orange-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE SUMMARY */}
          <div>
            <div className="bg-white border rounded-xl p-6">
              <h2 className="font-semibold mb-4">Amount Summary</h2>

              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Total Item ({cartItems.length})</span>
                  <span>₹{totalMRP.toFixed(0)}</span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Total Discount</span>
                  <span>₹{totalDiscount.toFixed(0)}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>₹{couponDiscount}</span>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between font-semibold text-lg mb-4">
                <span>Total Amount</span>
                <span>₹{finalAmount}</span>
              </div>

              <button
                disabled={!selectedPayment}
                onClick={() => {
                  if (selectedPayment === "ONLINE") {
                    // Razorpay
                  } else {
                    createBooking("COD");
                  }
                }}
                className={`w-full py-4 rounded-full text-white font-semibold ${
                  selectedPayment ? "bg-orange-500" : "bg-gray-300"
                }`}
              >
                Pay ₹{finalAmount}
              </button>

              <div className="flex items-center gap-3">
                <p className="text-xs text-gray-500 text-center mt-3">
                  🔒 Safe & secure checkout
                </p>

                <img
                  src="/grp.png"
                  alt="Payment Methods"
                  className="w-40 mt-4"
                />
              </div>
            </div>
            <div className="flex justify-center items-center mx-auto gap-3 w-[100%] py-4">
              <img src="/tick.png" alt="Payment Methods" className="w-8 h-6" />
              <p className="text-sm font-bold text-[#666666] w-3/4">
                Easy Cancellation/Returns, Background Verified Service Provide.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* OTP Modal */}
      <OTPVerificationModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onConfirm={handleOTPVerify}
      />

      {/* <Footer /> */}
    </div>
  );
}
