
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBooking } from "@/context/BookingContext";
import { OTPVerificationModal } from "@/components/OTPVerificationModal";
import { CreditCard, Smartphone, Banknote, Lock, Wallet, ArrowLeft } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

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

  const paymentMethods = [
  {
    id: 1,
    payment_type: "ONLINE",
  },
  {
    id: 2,
    payment_type: "COD",
  },
];
// const [paymentMethods, setPaymentMethods] = useState<any[]>([]);



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
     payment_type: "ONLINE",
     gst_name: "",
     gst_no: "",
     pan_name: "",
     pan_no: "",
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
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
       },
     },
   );

   if (res.data?.status) {
  clearCart();

  localStorage.removeItem("bookingDateTime");
  localStorage.removeItem("selectedAddress");

  // alert("Booking Created Successfully!");
  // router.push("/order-confirmation");
  await Swal.fire({
    icon: "success",
    title: "Success!",
    text: "Booking Created Successfully!",
    confirmButtonColor: "#f97316",
    confirmButtonText: "OK",
  });

  router.push("/order-confirmation");
}
  } catch (error: any) {
    console.log("BOOKING API ERROR:", error?.response?.data || error);
    console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
    // alert("Booking failed");
    Swal.fire({
      icon: "error",
      title: "Booking Failed",
      text:
        error?.response?.data?.message ||
        "Something went wrong. Please try again.",
      confirmButtonColor: "#f97316",
    });
  }
};

const handleRazorpayPayment = async () => {
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
    payment_type: "ONLINE",
    gst_name: "",
    gst_no: "",
    pan_name: "",
    pan_no: "",
    service_category_id: Number(
      cartItems[0]?.service_category_id || cartItems[0]?.serviceCategoryId || 1,
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
    console.log(res.data);

    const order = res.data.data;

    // 2. Open Razorpay Checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // MUST NOT BE NULL
      amount: order.amount,
      currency: order.currency,
      name: "TasPro",
      description: "Service Booking",
      order_id: order.razorpay_order_id,

      handler: async function (payment: any) {
        console.log("PAYMENT SUCCESS:", payment);

        // 3. After success → create booking
        await createBooking("ONLINE");

        router.push("/order-confirmation");
      },

      theme: {
        color: "#F97316",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  } catch (error: any) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Payment Failed",
      text:
        error?.response?.data?.message ||
        "Razorpay payment failed. Please try again.",
      confirmButtonColor: "#f97316",
    });
  }
};

const handlePayNow = (paymentMethod?: string) => {
  const method = paymentMethod || selectedPayment;

  console.log("SELECTED METHOD:", method);

 if (!method) {
   Swal.fire({
     icon: "warning",
     title: "Payment Method Required",
     text: "Please select a payment method.",
     confirmButtonColor: "#f97316",
   });
   return;
 }

  createBooking(method);
};
 const handleOTPVerify = async (otp: string) => {
   await Swal.fire({
     icon: "success",
     title: "Payment Successful",
     text: "Your booking has been confirmed.",
     confirmButtonColor: "#f97316",
   });

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

      <main className="max-w-7xl mx-auto px-0  lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <h1 className="text-lg md:text-2xl font-semibold mb-6 sm:block hidden">
              Checkout
            </h1>
            <div className="relative flex items-center justify-center sm:hidden pb-4 border-b bg-white">
              <button onClick={() => router.back()} className="absolute left-1">
                <ArrowLeft size={24} />
              </button>

              <h1 className="text-[18px] font-semibold">
                Select Payment Method
              </h1>
            </div>
            <p className="text-[#777] text-[14px] leading-2">
              Choose your preferred payment method to complete your booking. We
              ensure all transactions are safe and encrypted for your security.
            </p>

            <div className="bg-white border-none sm:border rounded-xl md:p-6">
              <div className="hidden sm:flex justify-between items-center mb-4">
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

                      <h3 className="text-sm lg:text-xl font-semibold text-black break-words">
                        {method.payment_type === "ONLINE"
                          ? "Online Payment"
                          : "Cash on Delivery"}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full border-2 flex md:hidden items-center justify-center shrink-0 ${
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
                      className={`w-7 h-7 rounded-full border-2 hidden md:flex items-center justify-center ${
                        selectedPayment === method.payment_type
                          ? "border-orange-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedPayment === method.payment_type && (
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* MOBILE ONLY */}
          <div className="sm:hidden  pb-28">
            {/* GST */}
            <h2 className="font-semibold text-[16px] mb-4">
              Need GST in bill?
            </h2>

            <div className="bg-white border rounded-[20px] p-4">
              <input
                type="text"
                placeholder="GST Name"
                className="w-full placeholder:text-[14px] h-12 border bg-gray-50 rounded-xl px-4 mb-4"
              />

              <input
                type="text"
                placeholder="GST Number"
                className="w-full h-12 border bg-gray-50 rounded-xl px-4"
              />
            </div>

            {/* Secure Checkout */}
            <div className="flex items-center justify-center gap-2 mt-6 text-[#777]">
              <Lock size={18} />
              <span className="text-sm">Safe & secure checkout</span>
            </div>

            {/* Payment Logos */}
            <div className="flex justify-between gap-3 mt-4">
              <img src="\Group 7.png" className="h-10 border rounded-md p-2" />
              <img src="\Group 6.png" className="h-10 border rounded-md p-2" />
              <img src="/paypal.png" className="h-10 border rounded-md p-2" />
              <img src="/apple pay.svg" className="h-10 border rounded-md p-2" />
              <img src="/Group (2).png" className="h-10 border rounded-md p-2" />
            </div>

            {/* Green Banner */}
            <div className="my-6 mb-10 bg-[#F4FBF4] border border-[#E2F0E2] rounded-2xl p-4 flex gap-3">
              <img src="/tick.png" alt="" className="w-5 h-5 mt-1 shrink-0" />

              <p className="text-[14px] font-semibold text-[#333]">
                Easy Cancellation/Returns, Background Verified Service Provide.
              </p>
            </div>
          </div>

          {/* MOBILE STICKY FOOTER */}
          <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t z-50">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="border rounded-lg px-3 py-1 text-sm font-medium">
                  {cartItems.length} Item
                </div>

                <div>
                  <span className="text-[12px] font-bold">₹{finalAmount}</span>

                  <span className="ml-2 text-gray-400 line-through text-xs">
                    ₹{totalMRP}
                  </span>
                </div>
              </div>

              <button
                disabled={!selectedPayment}
                onClick={() => {
if (selectedPayment === "ONLINE") {
  handleRazorpayPayment();
} else {
  createBooking("COD");
}                }}
                className={`py-2 px-6 text-sm rounded-full text-white font-semibold
        ${
          selectedPayment
            ? "bg-orange-500 "
            : "bg-orange-300 cursor-not-allowed"
        }`}
              >
                Continue
              </button>
            </div>
          </div>
          {/* RIGHT SIDE SUMMARY */}
          <div>
            <div className="bg-white sm:block hidden border rounded-xl p-6">
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
                  handleRazorpayPayment();
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

              <div className="hidden sm:flex items-center gap-3">
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
            <div className="hidden sm:flex justify-center items-center mx-auto gap-3 w-[100%] py-4">
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
