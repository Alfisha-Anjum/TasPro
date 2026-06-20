"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useBooking } from "@/context/BookingContext";

import SuccessCard from "@/components/SuccessCard";
import CustomerDetails from "@/components/CustomerDetails";
import CouponCard from "@/components/CouponCard";
import AmountSummary from "@/components/AmountSummary";
import DeepCleaningServices from "@/components/DeepCleaningServices";
import GradientButton2 from "@/components/ui/GradientButton2";
import { SelectAddressModal } from "@/components/booking-flow/SelectAddressModal";
import AddNewAddressModal from "@/components/AddNewAddressModal";

export default function OrderConfirmation() {
const { selectedAddress, setSelectedAddress, cartItems } = useBooking();

  const [addresses, setAddresses] = useState<any[]>([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const displayAddress = selectedAddress || addresses[0];
const totalAmount = cartItems.reduce(
  (sum: number, item: any) =>
    sum + (item.price || item.discountedPrice || 0) * (item.quantity || 1),
  0,
);

const totalMRP = cartItems.reduce(
  (sum: number, item: any) =>
    sum +
    (item.originalPrice || item.price || item.discountedPrice || 0) *
      (item.quantity || 1),
  0,
);

const totalDiscount = totalMRP - totalAmount;
  const getCustomerAddresses = async (token: string) => {
    const res = await axios.get(
      "https://app.tasprocompany.in/api/customers/customer-addresses",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    return res.data;
  };

  const fetchAddresses = async () => {
    if (!token) return;

    try {
      const res = await getCustomerAddresses(token);
      setAddresses(res.data || []);
    } catch (error: any) {
      console.log("GET ADDRESS ERROR:", error.response?.data || error);
    }
  };

  const addCustomerAddress = async (token: string, formData: any) => {
    const cleanPhone = (value: string) => {
      const digits = value
        .replace(/\D/g, "")
        .replace(/^91/, "")
        .replace(/^0/, "");

      return `+91 ${digits}`;
    };

    const altRaw = formData.alternateNumber || formData.altPhone || "";
    const altDigits = altRaw
      .replace(/\D/g, "")
      .replace(/^91/, "")
      .replace(/^0/, "");

    const payload: any = {
      full_name: formData.fullName || formData.name || "",
      contact_number: cleanPhone(
        formData.contactNumber || formData.phone || "",
      ),
      postal_code: formData.postalCode || formData.pincode || "",

      latitude: formData.latitude || 21.2514,
      longitude: formData.longitude || 81.6296,

      country_id: 1,
      state_id: 1,
      city_id: 1,

      state_name: formData.state_name || formData.state || "Chhattisgarh",
      city_name: formData.city_name || formData.city || "Raipur",

      house_number: formData.houseNo || "",
      street: formData.street || formData.location || formData.address || "",

      type: "Home",
      is_active: 1,
    };

    payload.alt_contact_number =
      altDigits.length === 10 ? `+91 ${altDigits}` : payload.contact_number;

    const res = await axios.post(
      "https://app.tasprocompany.in/api/customers/customer-addresses",
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

  useEffect(() => {
    fetchAddresses();
  }, [token]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="w-full">
        <div className="w-full max-w-7xl justify-between mx-auto flex flex-col gap-10 lg:flex-row px-2 md:px-10">
          <div className="flex flex-col">
            <div className="max-w-full sm:text-left text-center">
              <h1 className="text-xl md:text-2xl font-semibold mb-3 text-[#1B1B1B] dark:text-white">
                Thanks for giving us opportunity to serve you better
              </h1>

              <p className="text-base lg:text-lg text-[#848484] mb-3 dark:text-gray-400">
                Service Delivery by Fri, 26-jan-2024
              </p>

              <a className="text-base lg:text-lg text-blue-600 font-semibold cursor-pointer dark:text-blue-400">
                Track & Manage Order
              </a>
            </div>

            <SuccessCard />

            <CustomerDetails
              address={displayAddress}
              onChangeAddress={() => setShowAddressModal(true)}
            />

            <div className="w-full flex items-start gap-4 bg-white border border-[#E1E1E1] rounded-xl p-4">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img src="/fi.png" className="w-6 h-6 lg:w-8 lg:h-8" />
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm lg:text-lg font-semibold text-[#666666]">
                  Service providers require OTPs for avail Service
                </p>
                <p className="text-xs lg:text-base text-[#898989]">
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                  amet...
                </p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[400px] flex flex-col gap-5">
            <CouponCard />
            <AmountSummary
              totalItems={cartItems.length}
              totalMRP={totalMRP}
              totalDiscount={totalDiscount}
              couponDiscount={50}
              totalAmount={totalAmount}
            />

            <div className="hidden md:block flex justify-center mt-6">
              <Link href="/" className="w-full">
                <GradientButton2
                  text="Back to Home"
                  width="w-full"
                  className="text-base lg:text-lg font-medium"
                />
              </Link>
            </div>
          </div>
        </div>

        <DeepCleaningServices title="You might be also interested in" />
        <div className="block md:hidden flex justify-center mt-6">
          <Link href="/" className="w-full">
            <GradientButton2
              text="Back to Home"
              width="w-full"
              className="text-base lg:text-lg font-medium"
            />
          </Link>
        </div>
      </main>

      <SelectAddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        addresses={addresses}
        onContinue={(address) => {
          setSelectedAddress(address);
          setShowAddressModal(false);
        }}
        onAddNew={() => {
          setEditingAddress(null);
          setShowAddressModal(false);
          setShowAddNewAddressModal(true);
        }}
      />

      <AddNewAddressModal
        isOpen={showAddNewAddressModal}
        onClose={() => {
          setShowAddNewAddressModal(false);
          setEditingAddress(null);
        }}
        onSave={async (newAddress) => {
          if (!token) return;

          try {
            await addCustomerAddress(token, newAddress);
            await fetchAddresses();

            setShowAddNewAddressModal(false);
            setEditingAddress(null);
            setShowAddressModal(true);
          } catch (error: any) {
            console.log("ADD ADDRESS ERROR:", error.response?.data || error);
          }
        }}
      />
    </div>
  );
}
